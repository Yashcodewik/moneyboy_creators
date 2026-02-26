"use client";
import { useRef, useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { FiAtSign, FiImage, FiVideo } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { MdUpload } from "react-icons/md";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { apiPostWithMultiForm, apiPost, getApiByParams, } from "@/utils/endpoints/common";
import { API_CREATE_POST, API_SEARCH_TAG_USERS, API_TAG_USERS_TO_POST, } from "@/utils/api/APIConstant";
import { IoSearch } from "react-icons/io5";
import { BadgeCheck, CalendarDays, CircleX, Smile } from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDecryptedSession } from "@/libs/useDecryptedSession";
import VideoRecorder from "../common/VideoRecorder";
import { showSuccess, showError, showQuestion } from "@/utils/alert";

type FeedParams = { show: boolean; onClose: () => void; };
type TagUser = { _id: string; displayName: string; userName: string; profile?: string; };
type TaggedUserWithShare = TagUser & { percentage: number; isCreator?: boolean; };
type AccessType = "free" | "subscriber" | "pay_per_view";
type MediaPreview = { url: string; type: "image" | "video"; };

const PostSchema = Yup.object({
  text: Yup.string()
    .max(300, "Maximum 300 characters allowed")
    .when("accessType", {
      is: (val: string) => val === "pay_per_view" || val === "subscriber",
      then: (schema) => schema.required("Post text is required").min(3, "Text must be at least 3 characters"),
      otherwise: (schema) => schema.notRequired(),
    }),

  accessType: Yup.string().required("Access type is required"),

  price: Yup.number()
    .typeError("Price must be a number")
    .when("accessType", {
      is: "pay_per_view",
      then: (s) =>
        s.required("Price is required").positive("Price must be greater than 0"),
      otherwise: (s) => s.notRequired(),
    }),

  isScheduled: Yup.boolean(),

  scheduledAt: Yup.string().when(["isScheduled", "accessType"], {
    is: (isScheduled: boolean, accessType: string) =>
      isScheduled &&
      (accessType === "pay_per_view" || accessType === "subscriber"),
    then: (s) => s.required("Schedule date is required"),
    otherwise: (s) => s.notRequired(),
  }),

  hasMedia: Yup.boolean().oneOf([true], "At least one media file is required"),
});

const NoProfileSVG = () => (
  <div className="noprofile">
    <svg width="40" height="40" viewBox="0 0 66 54" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path className="animate-m" d="M65.4257 49.6477L64.1198 52.8674C64.0994 52.917 64.076 52.9665 64.0527 53.0132C63.6359 53.8294 62.6681 54.2083 61.8081 53.8848C61.7673 53.8731 61.7265 53.8556 61.6886 53.8381L60.2311 53.1764L57.9515 52.1416C57.0945 51.7509 56.3482 51.1446 55.8002 50.3779C48.1132 39.6156 42.1971 28.3066 38.0271 16.454C37.8551 16.1304 37.5287 15.9555 37.1993 15.9555C36.9631 15.9555 36.7241 16.0459 36.5375 16.2325L28.4395 24.3596C28.1684 24.6307 27.8099 24.7678 27.4542 24.7678C27.4076 24.7678 27.3609 24.7648 27.3143 24.7619C27.2239 24.7503 27.1307 24.7328 27.0432 24.7065C26.8217 24.6366 26.6118 24.5112 26.4427 24.3276C23.1676 20.8193 20.6053 17.1799 18.3097 15.7369C18.1698 15.6495 18.0153 15.6057 17.8608 15.6057C17.5634 15.6057 17.2719 15.7602 17.1029 16.0313C14.1572 20.7377 11.0702 24.8873 7.75721 28.1157C7.31121 28.5471 6.74277 28.8299 6.13061 28.9115L3.0013 29.3254L1.94022 29.4683L1.66912 29.5033C0.946189 29.5994 0.296133 29.0602 0.258237 28.3314L0.00754237 23.5493C-0.0274383 22.8701 0.191188 22.2025 0.610956 21.669C1.51171 20.5293 2.39789 19.3545 3.26512 18.152C5.90032 14.3304 9.52956 8.36475 13.1253 1.39631C13.548 0.498477 14.4283 0 15.3291 0C15.8479 0 16.3727 0.163246 16.8187 0.513052L27.3799 8.76557L39.285 0.521797C39.6931 0.206971 40.1711 0.0583046 40.6434 0.0583046C41.4683 0.0583046 42.2729 0.510134 42.6635 1.32052C50.16 18.2735 55.0282 34.2072 63.6378 47.3439C63.9584 47.8336 64.0197 48.4487 63.8039 48.9851L65.4257 49.6477Z" fill="url(#paint0_linear_4470_53804)" />
      <defs>
        <linearGradient id="paint0_linear_4470_53804" x1="0" y1="27" x2="66" y2="27" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDAB0A" />
          <stop offset="0.4" stopColor="#FECE26" />
          <stop offset="1" stopColor="#FE990B" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const AddFeedModal = ({ show, onClose }: FeedParams) => {
  const { session } = useDecryptedSession();
  const [accessType, setAccessType] = useState<AccessType>("free");
  const [activeTool, setActiveTool] = useState<"image" | "video" | "poll" | null>(null);
  const [isScheduled, setIsScheduled] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [showRecorder, setShowRecorder] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [mediaPreviews, setMediaPreviews] = useState<MediaPreview[]>([]);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const [tagSearch, setTagSearch] = useState("");
  const [tagUsers, setTagUsers] = useState<TagUser[]>([]);
  const [selectedTagUsers, setSelectedTagUsers] = useState<TaggedUserWithShare[]>([]);
  const [creatorPercentage, setCreatorPercentage] = useState<number>(0);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const emojiBtnRef = useRef<HTMLButtonElement>(null);
  const dobWrapperRef = useRef<HTMLDivElement | null>(null);

  const hasMedia = mediaPreviews.length > 0;
  const imageCount = mediaPreviews.filter((m) => m.type === "image").length;
  const videoCount = mediaPreviews.filter((m) => m.type === "video").length;

  const creator = {
    name: session?.user?.displayName,
    username: session?.user?.userName,
    profile: session?.user?.profile,
  };

  useEffect(() => {
    formik.setFieldValue("hasMedia", mediaFiles.length > 0, false);
  }, [mediaFiles]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dobWrapperRef.current &&
        !dobWrapperRef.current.contains(event.target as Node)
      ) {
        setActiveField(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        emojiRef.current &&
        !emojiRef.current.contains(target) &&
        !emojiBtnRef.current?.contains(target)
      ) {
        setShowEmoji(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    return () => {
      mediaPreviews.forEach((m) => URL.revokeObjectURL(m.url));
    };
  }, [mediaPreviews]);

  useEffect(()=>{
    const esc = (e:KeyboardEvent)=>{
      if(e.key === "Escape") confirmClose();
    };
    document.addEventListener("keydown", esc);
    return ()=>document.removeEventListener("keydown", esc);
   },[]);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText =
      formik.values.text.slice(0, start) +
      emojiData.emoji +
      formik.values.text.slice(end);

    formik.setFieldValue("text", newText);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + emojiData.emoji.length,
        start + emojiData.emoji.length
      );
    });

    setShowEmoji(false);
  };
  
  const searchTagUsers = (q: string) => {
    setTagSearch(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      if (!q.trim()) { setTagUsers([]); return; }
      const res = await getApiByParams({ url: API_SEARCH_TAG_USERS, params: `?q=${q}` });
      if (res?.success) setTagUsers(res.users || []);
    }, 400);
  };

  const toggleTagUser = (user: TagUser) => {
    setSelectedTagUsers((prev) => {
      const exists = prev.find((u) => u._id === user._id);
      if (exists) return prev.filter((u) => u._id !== user._id);
      if (prev.length >= 5) {
        showError("Maximum 5 creators allowed");
        return prev;
      }
      return [...prev, { ...user, percentage: 0 }];
    });
  };

  const updateUserPercentage = (id: string, value: number) => {
    setSelectedTagUsers((prev) =>
      prev.map((u) => (u._id === id ? { ...u, percentage: value } : u))
    );
  };

  const handleAccessTypeChange = (type: AccessType) => {
    setAccessType(type);
    setIsScheduled(false);
    formik.setFieldValue("accessType", type);
    formik.setFieldValue("isScheduled", false);
    formik.setFieldValue("scheduledAt", "");
  };

  const removeMedia = (index:number)=>{
    URL.revokeObjectURL(mediaPreviews[index].url);
    setMediaPreviews(prev => prev.filter((_,i)=>i!==index));
    setMediaFiles(prev => prev.filter((_,i)=>i!==index));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = 10 - imageCount;
    if (remainingSlots <= 0) {
      showError("You can upload maximum 10 photos");
      return;
    }
    const selected = files.slice(0, remainingSlots);
    setMediaFiles((prev) => [...prev, ...selected]);
    setMediaPreviews((prev) => [
      ...prev,
      ...selected.map((file) => ({
        url: URL.createObjectURL(file),
        type: "image" as const,
      })),
    ]);
    e.target.value = "";
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = 3 - videoCount;
    if (remainingSlots <= 0) {
      showError("You can upload maximum 3 videos");
      return;
    }
    const selected = files.slice(0, remainingSlots);
    setMediaFiles((prev) => [...prev, ...selected]);
    setMediaPreviews((prev) => [
      ...prev,
      ...selected.map((file) => ({
        url: URL.createObjectURL(file),
        type: "video" as const,
      })),
    ]);
    e.target.value = "";
  };

  const formik = useFormik({
    initialValues: {
      text: "",
      accessType: "free",
      price: "",
      isScheduled: false,
      scheduledAt: "",
      hasMedia: false,
    },
    validationSchema: PostSchema,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: async (values) => {
      if (isSubmitting) return;
      setIsSubmitting(true);

      try {
        if (selectedTagUsers.length > 0) {
          if (selectedTagUsers.length > 5) {
            showError("You can tag maximum 5 creators");
            return;
          }

          if (values.accessType === "pay_per_view") {
            const invalidUser = selectedTagUsers.find(
              (u) => !u.percentage || u.percentage <= 0
            );
            if (invalidUser) {
              showError("Enter percentage for all tagged creators");
              return;
            }

            if (!creatorPercentage || creatorPercentage <= 0) {
              showError("Enter creator percentage");
              return;
            }

            const totalTaggedPercent = selectedTagUsers.reduce(
              (sum, u) => sum + Number(u.percentage),
              0
            );
            const total = totalTaggedPercent + Number(creatorPercentage);

            if (total !== 100) {
              showError("Total percentage must equal 100%");
              return;
            }
          }
        }

        if (mediaFiles.length < 1) {
          showError("At least 1 media file is required");
          return;
        }
        if (imageCount > 10) {
          showError("Maximum 10 photos allowed");
          return;
        }
        if (videoCount > 3) {
          showError("Maximum 3 videos allowed");
          return;
        }

        const formData = new FormData();
        formData.append("text", values.text);
        formData.append("accessType", values.accessType);
        formData.append("isScheduled", values.isScheduled ? "true" : "false");

        if (values.accessType === "pay_per_view") {
          formData.append("price", values.price);
        }
        if (values.isScheduled && values.scheduledAt) {
          formData.append("scheduledAt", values.scheduledAt);
        }

        mediaFiles.forEach((file) => formData.append("mediaFiles", file));

        const finalMediaType = mediaFiles.some((f) => f.type.startsWith("video"))
          ? "video"
          : "photo";
        formData.append("mediaType", finalMediaType);

        const res = await apiPostWithMultiForm({
          url: API_CREATE_POST,
          values: formData,
        });

        if (!res?.success) {
          showError(res?.message || "Failed to create post");
          return;
        }

        const postId = res?.post?._id || res?.postId;
        if (!postId) {
          showError("Post created but ID missing");
          return;
        }

        if (selectedTagUsers.length > 0) {
          const tagRes = await apiPost({
            url: API_TAG_USERS_TO_POST,
            values: {
              postId,
              creatorPercentage: Number(creatorPercentage || 0),
              taggedUsers: selectedTagUsers.map((u) => ({
                userId: u._id,
                percentage: Number(u.percentage),
              })),
            },
          });

          if (!tagRes?.success) {
            showError(tagRes?.message || "Tagging failed");
            return;
          }
        }

        showSuccess("Post created successfully");
        onClose();
      } catch (error) {
        console.error(error);
        showError("An error occurred while creating post");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const collaborators: (TaggedUserWithShare & { isCreator: boolean })[] =
    selectedTagUsers.length > 0
      ? [
        {
          _id: "creator",
          displayName: creator.name ?? "",
          userName: creator.username ?? "",
          profile: creator.profile,
          percentage: creatorPercentage,
          isCreator: true,
        },
        ...selectedTagUsers.map((u) => ({ ...u, isCreator: false })),
      ]
      : [];

const confirmClose = async () => {
  if (
    !formik.values.text &&
    mediaFiles.length === 0 &&
    selectedTagUsers.length === 0
  ) {
    onClose();
    return;
  }

  const leave = await showQuestion(
    "Are you sure you want to leave? Your changes will not be saved.",
    "Leave Without Saving",
    "Continue Editing"
  );

  if (leave) onClose();
}

  return (
    <>
      <div className={`modal ${show ? "show" : ""}`} role="dialog" aria-modal="true" onClick={confirmClose}>
        <form className="modal-wrap post-modal" onClick={(e) => e.stopPropagation()} onSubmit={formik.handleSubmit}>
          <div className="modal_head">
            <h3>New Post</h3>
            <button type="button" className="close-btn" onClick={confirmClose}><CgClose size={22} /></button>
          </div>
            <button type="button" className="close-btn" onClick={confirmClose}><CgClose size={22} /></button>

          <div className="input-wrap">
            <div className="label-input textarea one">
              <textarea ref={textareaRef} rows={4} placeholder="Compose new post..." name="text" value={formik.values.text} onChange={formik.handleChange} onBlur={formik.handleBlur} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) e.stopPropagation(); }} />
            </div>
            <span className="right">
              <button type="button" ref={emojiBtnRef} className="emoji-btn" onClick={() => setShowEmoji((prev) => !prev)}><Smile size={20} stroke="black" strokeWidth={1} fill="#fece26" /></button>
              {formik.values.text.length}/300
              {showEmoji && (
                <div ref={emojiRef} className="emoji-picker-wrapper">
                  <EmojiPicker onEmojiClick={handleEmojiClick} autoFocusSearch={false} skinTonesDisabled previewConfig={{ showPreview: false }} height={320} width={320} />
                </div>
              )}
            </span>
          </div>
          {formik.touched.text && formik.errors.text && (<span className="error-message">{formik.errors.text}</span>)}
          <div className="select_wrap">
            <label className="radio_wrap">
              <input type="radio" name="access" checked={accessType === "subscriber"} onChange={() => handleAccessTypeChange("subscriber")} /> Only for Subscribers
            </label>

            <label className="radio_wrap">
              <input type="radio" name="access" checked={accessType === "pay_per_view"} onChange={() => handleAccessTypeChange("pay_per_view")} /> Pay per View
            </label>

            <label className="radio_wrap">
              <input type="radio" name="access" checked={accessType === "free"} onChange={() => handleAccessTypeChange("free")} /> Free for Everyone
            </label>
          </div>

          {accessType === "pay_per_view" && (
            <div>
              <label>Price($)</label>
              <input className="form-input" type="text" name="price" placeholder="10.99 *" value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.price && formik.errors.price && (<div className="error-message">{formik.errors.price}</div>)}
            </div>
          )}

          {(accessType === "pay_per_view" || accessType === "subscriber") && (
            <div className="flex items-center gap-10">
              <div>
                <label>Schedule?</label>
                <div className="toggleGroup">
                  <input type="checkbox" id="on-off-switch" className="checkbox" name="isScheduled" checked={isScheduled} onChange={() => { const newVal = !isScheduled; setIsScheduled(newVal); formik.setFieldValue("isScheduled", newVal); if (!newVal) formik.setFieldValue("scheduledAt", ""); }} />
                  <label htmlFor="on-off-switch" className="label" />
                  <div className="onoffswitch" aria-hidden="true">
                    <div className="onoffswitchLabel">
                      <div className="onoffswitchInner" />
                      <div className="onoffswitchSwitch" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Date Picker */}
              {isScheduled && (
                <div className="mw-fit w-full">
                  <label>Schedule at</label>
                  <div className="label-input calendar-dropdown" ref={dobWrapperRef}>
                    <div className="input-placeholder-icon"><CalendarDays className="icons svg-icon" /></div>
                    <input type="text" name="scheduledAt" placeholder="Schedule Date (DD/MM/YYYY) *" className="form-input" value={formik.values.scheduledAt ? new Date(formik.values.scheduledAt).toLocaleDateString("en-GB") : ""} readOnly onFocus={() => setActiveField("schedule")} onBlur={formik.handleBlur} />
                    {activeField === "schedule" && (
                      <div className="calendar_show">
                        <DatePicker
                          inline
                          selected={
                            formik.values.scheduledAt
                              ? new Date(formik.values.scheduledAt)
                              : null
                          }
                          minDate={new Date()}
                          onChange={(date: Date | null) => {
                            if (!date) return;
                            formik.setFieldValue("scheduledAt", date.toISOString());
                            setActiveField(null);
                          }}
                        />
                      </div>
                    )}
                  </div>
                  {formik.touched.scheduledAt && formik.errors.scheduledAt && (
                    <div className="error-message">{formik.errors.scheduledAt}</div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="upload-wrapper">
            {mediaPreviews.map((media, index) => (
              <div className="img_wrap" key={index}>
                {media.type === "image" ? (
                  <img
                    src={media.url}
                    className="img-fluid upldimg"
                    alt={`preview-${index}`}
                  />
                ) : (
                  <video
                    src={media.url}
                    className="img-fluid upldimg"
                    controls
                  />
                )}
                <button
                  type="button"
                  className="btn-danger"
                  onClick={() => removeMedia(index)}
                >
                  <CircleX size={16} />
                </button>
              </div>
            ))}
          </div>
          {formik.touched.hasMedia && formik.errors.hasMedia && (
            <div className="error-message">{formik.errors.hasMedia}</div>
          )}

          {collaborators.length > 0 && (
            <div className="moneyboy-post__header">
              {collaborators.map((user) => (
                <div className="profile-card upl_card" key={user._id}>
                  <div className="profile-card__main">
                    <div className="profile-card__avatar-settings uplview_user">
                      <div className="profile-card__avatar">
                        {user.profile ? (
                          <img
                            src={user.profile}
                            alt={user.displayName}
                            className="img-fluid"
                          />
                        ) : (
                          <NoProfileSVG />
                        )}
                      </div>
                    </div>

                    <div className="profile-card__info">
                      <div className="profile-card__name">{user.displayName}</div>
                      <div className="profile-card__username">@{user.userName}</div>
                    </div>

                    <div className="right_box">
                      {accessType === "free" && <span>Free</span>}
                      {accessType === "subscriber" && <span>Subscriber</span>}
                      {accessType === "pay_per_view" && (
                        <input
                          type="number"
                          placeholder="Add User Percentage"
                          className="form-input"
                          value={user.percentage || ""}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            if (user.isCreator) {
                              setCreatorPercentage(value);
                            } else {
                              updateUserPercentage(user._id, value);
                            }
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <input type="file" ref={thumbnailInputRef} hidden accept="image/*" />

          {activeTool === "video" && (
            <div className="flex items-center gap-10">
              <button type="button" className="btn-grey btnicons gap-10" onClick={() => setShowRecorder(true)}> <FiVideo size={16} /> <span>Start recording</span></button>
              <button type="button" className="btn-grey btnicons gap-10" onClick={() => videoInputRef.current?.click()}> <MdUpload size={16} /> <span>Upload video</span></button>
              <input type="file" ref={videoInputRef} hidden accept="video/*" multiple onChange={handleVideoChange} />
            </div>
          )}

          {activeTool === "poll" && (
            <div className="duration_wraping">
              <label className="orange">Poll Duration - 7 days</label>
              <input className="form-input" type="text" placeholder="Question" />
              <label className="pollanw selected">Option 1</label>
              <label className="pollanw">Option 2</label>
              <Link href="#" className="clear"> Clear Polls</Link>
            </div>
          )}

          <input type="file" hidden ref={imageInputRef} accept="image/*" multiple onChange={handleImageChange} />

          <div className="actions tooltip_wrapper">
            <ul>
              <li>
                <button type="button" className="cate-back-btn active-down-effect btn_icons" data-tooltip="Add image" onClick={() => { setActiveTool("image"); imageInputRef.current?.click(); }}> <FiImage size={20} /></button>
              </li>
              <li>
                <button type="button" className="cate-back-btn active-down-effect btn_icons" data-tooltip="Add video" onClick={() => setActiveTool("video")}> <FiVideo size={20} /></button>
              </li>
              <li>
                <div className="hline" />
              </li>
              <li className="icontext_wrap">
                <button type="button" className="cate-back-btn active-down-effect btn_icons" data-tooltip="Tag someone" disabled={!hasMedia} onClick={() => setShowTagModal(true)}><FiAtSign size={20} /></button>
                <p>Tag</p>
              </li>
            </ul>
            <div className="right">
              <ul>
                <li>
                  <button type="button" className="cate-back-btn active-down-effect btn_icons" data-tooltip="Share on X" disabled={!hasMedia}><FaXTwitter size={20} /></button>
                </li>
              </ul>
              <button type="submit" data-tooltip={!hasMedia ? "Add media to post" : "Publish post"} className={`premium-btn active-down-effect ${isSubmitting ? "disabled" : ""}`} disabled={isSubmitting || !hasMedia}><span>{isSubmitting ? "Posting..." : "Post"}</span></button>
            </div>
          </div>
        </form>

        {showTagModal && (
          <div className="modal show" role="dialog" aria-modal="true" onClick={confirmClose}>
            <div className="modal-wrap creators-modal" onClick={(e) => e.stopPropagation()}>
              <button type="button" className="close-btn" onClick={() => setShowTagModal(false)}><CgClose size={22} /></button>
              <h3>Tag other creators</h3>
              <div className="label-input search_wrap">
                <div className="input-placeholder-icon"><IoSearch size={22} color="#716f6f" /></div>
                <input className="form-input" type="text" placeholder="Enter Keywords Here" value={tagSearch} onChange={(e) => searchTagUsers(e.target.value)} />
              </div>
              <div className="actions">
                <button type="button" className="premium-btn" onClick={() => setShowTagModal(false)}><span>Tag user</span></button>
              </div>
              <div className="moneyboy-post__header scrollbar">
                <div className="profile-card">
                  {tagUsers.map((user) => {
                    const selected = selectedTagUsers.some((u) => u._id === user._id);
                    return (
                      <div key={user._id} className="profile-card__main" onClick={() => toggleTagUser(user)}>
                        <div className="profile-card__avatar-settings">
                          <div className="profile-card__avatar">
                            {user.profile ? (<img src={user.profile} alt={user.displayName} className="img-fluid" />) : (<NoProfileSVG />)}
                          </div>
                        </div>
                        <div className="profile-card__info">
                          <div className="profile-card__name">{user.displayName}</div>
                          <div className="profile-card__username">@{user.userName}</div>
                        </div>
                        {selected && (<div className="rigth_info"><BadgeCheck size={22} /></div>)}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="creators-footer">
                <Link href="#" className="invite"></Link>
                <button className="cate-back-btn active-down-effect close" onClick={() => setShowTagModal(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showRecorder && (
        <VideoRecorder onClose={() => setShowRecorder(false)} onRecorded={(file: File) => { if (videoCount >= 3) { showError("Maximum 3 videos allowed"); return; } setMediaFiles((prev) => [...prev, file]); setMediaPreviews((prev) => [...prev, { url: URL.createObjectURL(file), type: "video" },]); }} />
      )}
    </>
  );
};

export default AddFeedModal;