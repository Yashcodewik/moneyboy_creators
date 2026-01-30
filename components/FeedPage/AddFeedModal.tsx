"use client";

import { useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { HiMenuAlt2 } from "react-icons/hi";
import { PiTextAaBold } from "react-icons/pi";
import { FiAtSign, FiImage, FiMic, FiVideo } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { TbCamera } from "react-icons/tb";
import { MdUpload } from "react-icons/md";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import ShowToast from "@/components/common/ShowToast";
import {
  apiPostWithMultiForm,
  apiPost,
  getApiByParams,
} from "@/utils/endpoints/common";
import {
  API_CREATE_POST,
  API_SEARCH_TAG_USERS,
  API_TAG_USERS_TO_POST,
} from "@/utils/api/APIConstant";
import { IoSearch } from "react-icons/io5";
import { Smile } from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

type feedParams = {
  show: boolean;
  onClose: () => void;
};

type TagUser = {
  _id: string;
  displayName: string;
  userName: string;
  avatar?: string;
};

const PostSchema = Yup.object({
  text: Yup.string().required().max(300),
  accessType: Yup.string().required(),
  price: Yup.number().when("accessType", {
    is: "pay_per_view",
    then: (s) => s.required().positive(),
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
});

const AddFeedModal = ({ show, onClose }: feedParams) => {
  const [accessType, setAccessType] = useState("free");
  const [activeTool, setActiveTool] = useState<
    "image" | "video" | "poll" | null
  >(null);
  const [isScheduled, setIsScheduled] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const [tagSearch, setTagSearch] = useState("");
  const [tagUsers, setTagUsers] = useState<TagUser[]>([]);
  const [selectedTagUsers, setSelectedTagUsers] = useState<TagUser[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const MEDIA_TYPE_MAP: Record<string, string> = {
    image: "photo",
    video: "video",
    recording: "recording",
  };

  const searchTagUsers = async (q: string) => {
    setTagSearch(q);
    if (!q.trim()) {
      setTagUsers([]);
      return;
    }

    const res = await getApiByParams({
      url: API_SEARCH_TAG_USERS,
      params: `?q=${q}`,
    });

    if (res?.success) {
      setTagUsers(res.users || []);
    }
  };

  const toggleTagUser = (user: TagUser) => {
    setSelectedTagUsers((prev) => {
      const exists = prev.find((u) => u._id === user._id);
      if (exists) return prev.filter((u) => u._id !== user._id);
      return [...prev, user];
    });
  };

  const formik = useFormik({
    initialValues: {
      text: "",
      accessType: "free",
      price: "",
      isScheduled: false,
      scheduledAt: "",
    },
    validationSchema: PostSchema,
    onSubmit: async (values) => {
      // Prevent multiple submissions
      if (isSubmitting) return;

      // Set loading state
      setIsSubmitting(true);

      try {
        const formData = new FormData();

        formData.append("text", values.text);
        formData.append("accessType", values.accessType);
        formData.append("isScheduled", String(values.isScheduled));

        if (values.accessType === "pay_per_view") {
          formData.append("price", values.price);
        }

        if (values.isScheduled && values.scheduledAt) {
          formData.append("scheduledAt", values.scheduledAt);
        }

        if (activeTool && MEDIA_TYPE_MAP[activeTool]) {
          formData.append("mediaType", MEDIA_TYPE_MAP[activeTool]);
        }

        if (imageInputRef.current?.files) {
          Array.from(imageInputRef.current.files).forEach((file) =>
            formData.append("mediaFiles", file),
          );
        }

        if (videoInputRef.current?.files) {
          Array.from(videoInputRef.current.files).forEach((file) =>
            formData.append("mediaFiles", file),
          );
        }

        if (thumbnailInputRef.current?.files?.[0]) {
          formData.append("thumbnail", thumbnailInputRef.current.files[0]);
        }

        const res = await apiPostWithMultiForm({
          url: API_CREATE_POST,
          values: formData,
        });

        if (res?.success) {
          if (selectedTagUsers.length > 0) {
            await apiPost({
              url: API_TAG_USERS_TO_POST,
              values: {
                postId: res.post?._id || res.postId,
                taggedUserIds: selectedTagUsers.map((u) => u._id),
              },
            });
          }

          ShowToast(res.message, "success");
          onClose();
        } else {
          ShowToast(res?.message || "Something went wrong", "error");
        }
      } catch (error) {
        ShowToast("An error occurred while creating post", "error");
        console.error("Post creation error:", error);
      } finally {
        // Re-enable the button
        setIsSubmitting(false);
      }
    },
  });

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    formik.setFieldValue("text", formik.values.text + emojiData.emoji);
    setShowEmojiPicker(false); // optional: close after selecting
  };
  return (
    <div
      className={`modal ${show ? "show" : ""} `}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="modal-wrap post-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal_head">
          <h3>New Post</h3>
          <button className="close-btn" onClick={onClose}>
            <CgClose size={22} />
          </button>
        </div>

        <div className="input-wrap">
          <div className="label-input textarea one">
            <textarea
              rows={4}
              placeholder="Compose new post..."
              name="text"
              value={formik.values.text}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <span className="right">
            <Smile size={20} stroke="black" strokeWidth={1} fill="#fece26" />{" "}
            {formik.values.text.length}/300
          </span>
          {formik.touched.text && formik.errors.text && (
            <span className="error-message">{formik.errors.text}</span>
          )}
        </div>

        <div className="select_wrap">
          <label className="radio_wrap">
            <input
              type="radio"
              name="access"
              checked={accessType === "subscriber"}
              onChange={() => {
                setAccessType("subscriber");
                setIsScheduled(false); // Reset to false when switching
                formik.setFieldValue("accessType", "subscriber");
                formik.setFieldValue("isScheduled", false);
                formik.setFieldValue("scheduledAt", "");
              }}
            />
            Only for Subscribers
          </label>

          <label className="radio_wrap">
            <input
              type="radio"
              name="access"
              checked={accessType === "pay_per_view"}
              onChange={() => {
                setAccessType("pay_per_view");
                setIsScheduled(false); // Reset to false when switching
                formik.setFieldValue("accessType", "pay_per_view");
                formik.setFieldValue("isScheduled", false);
                formik.setFieldValue("scheduledAt", "");
              }}
            />
            Pay per View
          </label>

          <label className="radio_wrap">
            <input
              type="radio"
              name="access"
              checked={accessType === "free"}
              onChange={() => {
                setAccessType("free");
                setIsScheduled(false); // Ensure it's false for free
                formik.setFieldValue("accessType", "free");
                formik.setFieldValue("isScheduled", false);
                formik.setFieldValue("scheduledAt", "");
              }}
            />
            Free for Everyone
          </label>
        </div>

        {accessType === "pay_per_view" && (
          <div>
            <label>Price</label>
            <input
              className="form-input"
              type="text"
              placeholder="10.99 *"
              value={formik.values.price}
              onChange={(e) => formik.setFieldValue("price", e.target.value)}
              onBlur={formik.handleBlur}
            />
            {formik.touched.price && formik.errors.price && (
              <div className="error-message">{formik.errors.price}</div>
            )}
          </div>
        )}

        {/* Only show scheduling for paid posts (pay_per_view or subscriber) */}
        {(accessType === "pay_per_view" || accessType === "subscriber") && (
          <div className="flex items-center gap-10">
            <div>
              <label>Schedule?</label>
              <div className="toggleGroup">
                <input
                  type="checkbox"
                  id="on-off-switch"
                  className="checkbox"
                  checked={isScheduled}
                  onChange={() => {
                    const newIsScheduled = !isScheduled;
                    setIsScheduled(newIsScheduled);
                    formik.setFieldValue("isScheduled", newIsScheduled);

                    // Clear scheduledAt when turning off scheduling
                    if (!newIsScheduled) {
                      formik.setFieldValue("scheduledAt", "");
                    }
                  }}
                />
                <label htmlFor="on-off-switch" className="label"></label>
                <div className="onoffswitch" aria-hidden="true">
                  <div className="onoffswitchLabel">
                    <div className="onoffswitchInner"></div>
                    <div className="onoffswitchSwitch"></div>
                  </div>
                </div>
              </div>
            </div>

            {isScheduled && (
              <div className="mw-fit w-full">
                <label>Schedule at</label>
                <input
                  className="form-input"
                  type="date"
                  value={formik.values.scheduledAt}
                  onChange={(e) =>
                    formik.setFieldValue("scheduledAt", e.target.value)
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.touched.scheduledAt && formik.errors.scheduledAt && (
                  <div className="error-message">
                    {formik.errors.scheduledAt}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* <div
          className="upload-wrapper"
          onClick={() => thumbnailInputRef.current?.click()}
        >
          <div className="img_wrap">
            <svg className="icons idshape size-45"></svg>
            <div className="imgicons">
              <TbCamera size="16" />
            </div>
          </div>

          <button
            type="button"
            className="btn-primary active-down-effect"
            onClick={(e) => {
              e.stopPropagation();
              thumbnailInputRef.current?.click();
            }}
          >
            <div className="imgicons">
              <TbCamera size="16" />
            </div>
            <span>Add thumbnail</span>
          </button>
        </div> */}

        <input type="file" ref={thumbnailInputRef} hidden accept="image/*" />

        {activeTool === "video" && (
          <div className="flex items-center gap-10">
            <button className="btn-grey btnicons gap-10">
              <FiVideo size="16" />
              <span>Start recording</span>
            </button>

            <button
              className="btn-grey btnicons gap-10"
              onClick={() => videoInputRef.current?.click()}
            >
              <MdUpload size="16" />
              <span>Upload video</span>
            </button>

            <input
              type="file"
              ref={videoInputRef}
              hidden
              accept="video/*"
              multiple
            />
          </div>
        )}

        {activeTool === "poll" && (
          <div className="duration_wraping">
            <label className="orange">Poll Duration - 7 days</label>
            <input className="form-input" type="text" placeholder="Question" />
            <label className="pollanw selected">Option 1</label>
            <label className="pollanw">Option 2</label>
            <Link href="#" className="clear">
              Clear Polls
            </Link>
          </div>
        )}

        <input
          type="file"
          hidden
          ref={imageInputRef}
          accept="image/*"
          multiple
        />

        <div className="actions">
          <button
            className="cate-back-btn active-down-effect btn_icons"
            onClick={() => {
              setActiveTool("image");
              imageInputRef.current?.click();
            }}
          >
            <FiImage size={20} />
          </button>

          <button
            className="cate-back-btn active-down-effect btn_icons"
            onClick={() => setActiveTool("video")}
          >
            <FiVideo size={20} />
          </button>

          {/* <button className="cate-back-btn active-down-effect btn_icons">
            <PiTextAaBold size={20} />
          </button>

          <button className="cate-back-btn active-down-effect btn_icons">
            <FiMic size={20} />
          </button>

          <button
            className="cate-back-btn active-down-effect btn_icons"
            onClick={() => setActiveTool("poll")}
          >
            <HiMenuAlt2 size={20} />
          </button> */}
          <div className="hline" />
          <div className="icontext_wrap">
            <button className="cate-back-btn active-down-effect btn_icons">
              <FiAtSign size={20} />
            </button>
            <p>Tag</p>
          </div>

          <div className="right">
            <button className="cate-back-btn active-down-effect btn_icons">
              <FaXTwitter size={20} />
            </button>
            <button
              className={`premium-btn active-down-effect ${isSubmitting ? "disabled" : ""}`}
              onClick={() => formik.handleSubmit()}
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? "Posting..." : "Post"}</span>
            </button>
          </div>
        </div>
      </div>

      {showTagModal && (
        <div
          className="modal show"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowTagModal(false)}
        >
          <div
            className="modal-wrap creators-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setShowTagModal(false)}
            >
              <CgClose size={22} />
            </button>

            <h3>Tag other creators</h3>

            <div className="label-input search_wrap">
              <div className="input-placeholder-icon">
                <IoSearch size={22} color="#716f6f" />
              </div>
              <input
                className="form-input"
                type="text"
                placeholder="Enter Keywords Here"
                value={tagSearch}
                onChange={(e) => searchTagUsers(e.target.value)}
              />
            </div>

            <div className="actions">
              <button
                className="premium-btn"
                onClick={() => setShowTagModal(false)}
              >
                <span>Tag user</span>
              </button>
              <button className="cate-back-btn active-down-effect">
                Release from
              </button>
            </div>

            {tagUsers.map((user) => {
              const selected = selectedTagUsers.some((u) => u._id === user._id);

              return (
                <div
                  key={user._id}
                  className="moneyboy-post__header"
                  onClick={() => toggleTagUser(user)}
                >
                  <div className="profile-card">
                    <div className="profile-card__main">
                      <div className="profile-card__avatar-settings">
                        <div className="profile-card__avatar">
                          <img
                            alt={user.displayName}
                            src={
                              user.avatar ||
                              "/images/profile-avatars/profile-avatar-1.png"
                            }
                          />
                        </div>
                      </div>
                      <div className="profile-card__info">
                        <div className="profile-card__name">
                          {user.displayName}
                        </div>
                        <div className="profile-card__username">
                          @{user.userName}
                        </div>
                      </div>
                      {selected && <span>✓</span>}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="creators-footer">
              <Link href="#" className="invite">
                + Invite New User
              </Link>
              <button
                className="cate-back-btn active-down-effect close"
                onClick={() => setShowTagModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFeedModal;

// import { CgClose } from "react-icons/cg";
// import { HiMenuAlt2 } from "react-icons/hi";
// import { PiTextAaBold } from "react-icons/pi";
// import { FiAtSign, FiImage, FiMic, FiVideo } from "react-icons/fi";
// import { FaXTwitter } from "react-icons/fa6";

// type feedParams = {
//   show: true;
//   onClose: () => void;
// };

// const AddFeedModal = ({ show, onClose }: feedParams) => {
//   return (
//     <div
//       className={`modal ${show ? "show" :""}`}
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="age-modal-title"
//     >
//       <div className="modal-wrap post-modal">
//         <div className="modal_head">
//           <h3>Poll Post</h3>
//           <button className="close-btn"><CgClose size={22}/></button>
//         </div>
//         <div className="input-wrap">
//           <div className="label-input textarea one">
//             <textarea
//               rows={4}
//               placeholder="Compose new post..."
//               name="Compose new post..."
//             />
//           </div>
//           <span className="right">0/300</span>
//         </div>
//         <div className="select_wrap">
//           <label className="radio_wrap">
//             <input type="radio" name="access" /> Only for Subscribers
//           </label>
//           <label className="radio_wrap">
//             <input type="radio" name="access" /> Pay per View
//           </label>
//           <label className="radio_wrap">
//             <input type="radio" name="access" checked /> Free for Everyone
//           </label>
//         </div>
//         <div className="">
//           <label>Price</label>
//           <input
//             className="form-input"
//             type="text"
//             placeholder="10.99 *"
//             name="firstName"
//           />
//         </div>
//         <div className="flex items-center gap-10">
//           <div>
//             <label>Schedule?</label>
//             <div className="toggleGroup">
//               <input
//                 type="checkbox"
//                 id="on-off-switch"
//                 className="checkbox"
//                 defaultChecked
//               />
//               <label htmlFor="on-off-switch" className="label"></label>
//               <div className="onoffswitch" aria-hidden="true">
//                 <div className="onoffswitchLabel">
//                   {" "}
//                   <div className="onoffswitchInner"></div>{" "}
//                   <div className="onoffswitchSwitch"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="mw-fit w-full">
//             <label>Schedule at</label>
//             <input
//               className="form-input"
//               type="date"
//               placeholder="10.99 *"
//               name="firstName"
//             />
//           </div>
//         </div>
//         {/* <div className="upload-wrapper">
//             <div className="img_wrap">
//               <svg className="icons idshape size-45"></svg>
//               <div className="imgicons"><TbCamera size="16" /></div>
//             </div>
//             <button className="btn-primary active-down-effect"><div className="imgicons"><TbCamera size="16" /></div><span>Add thumbnail</span></button>
//           </div> */}
//         {/* <div className="flex items-center gap-10">
//             <button className="btn-grey btnicons gap-10"><div className="imgicons"><FiVideo size="16" /></div><span>Start recording</span></button>
//             <button className="btn-grey btnicons gap-10"><div className="imgicons"><MdUpload size="16" /></div><span>Upload video</span></button>
//           </div>
//           <div className="upload-wrapper">
//             <button className="btn-primary active-down-effect"><div className="imgicons"><TbCamera size="16" /></div><span>Add thumbnail</span></button>
//           </div> */}
//         {/* <div className="duration_wraping">
//            <div className="">
//             <label className="orange">Poll Duration - 7 days</label>
//             <input className="form-input" type="text" placeholder="Question" name="firstName" disabled/>
//            </div>
//             <label className="pollanw selected">Poll Duration - 7 days</label>
//             <label className="pollanw">Poll Duration - 7 days</label>
//             <Link href="#" className="clear">Clear Polls</Link>
//           </div> */}
//         <div className="actions">
//           <button className="cate-back-btn active-down-effect btn_icons">
//             <FiImage size={20} />
//           </button>
//           <button className="cate-back-btn active-down-effect btn_icons">
//             <FiVideo size={20} />
//           </button>
//           <button className="cate-back-btn active-down-effect btn_icons">
//             <PiTextAaBold size={20} />
//           </button>
//           <button className="cate-back-btn active-down-effect btn_icons">
//             <FiMic size={20} />
//           </button>
//           <button className="cate-back-btn active-down-effect btn_icons">
//             <HiMenuAlt2 size={20} />
//           </button>
//           <button className="cate-back-btn active-down-effect btn_icons">
//             <FiAtSign size={20} />
//           </button>
//           <div className="right">
//             <button className="cate-back-btn active-down-effect btn_icons">
//               <FaXTwitter size={20} />
//             </button>
//             <button className="premium-btn active-down-effect">
//               <span>Post</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddFeedModal;
