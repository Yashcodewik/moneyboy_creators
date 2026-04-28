"use client";
import { useRef, useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { FiAtSign, FiImage, FiVideo } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { MdUpload } from "react-icons/md";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { apiPostWithMultiForm, apiPost, getApiByParams, getApiWithOutQuery, } from "@/utils/endpoints/common";
import { API_CREATE_POST, API_GET_MY_SUBSCRIPTION, API_SEARCH_TAG_USERS, API_TAG_USERS_TO_POST, } from "@/utils/api/APIConstant";
import { IoSearch } from "react-icons/io5";
import { BadgeCheck, CalendarDays, CircleAlert, CircleX, Minus, Plus, Smile, X, } from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDecryptedSession } from "@/libs/useDecryptedSession";
import VideoRecorder from "../common/VideoRecorder";
import { showSuccess, showError, showQuestion } from "@/utils/alert";
import { fetchFeedPosts, resetFeedPosts } from "@/redux/other/feedPostsSlice";
import { useAppDispatch } from "@/redux/store";
import Modal from "../Modal";
import { useQueryClient } from "@tanstack/react-query";
import { fetchFollowerCounts } from "@/redux/other/followActions";
import { useWaveCanvas } from "@/hooks/useWaveCanvas";
import { useDeviceType } from "@/hooks/useDeviceType";

const accessContentMap = {
  subscriber: {
    text: "Only visible to your subscribers",
    tooltip: "This content will be visible only to your subscribers. If you tag other MoneyBoys, they must approve it before it goes live and it will also appear on their profiles.",
  },
  pay_per_view: {
    text: "Sell this content in your store",
    tooltip: "This content will be available for sale in your store and in the marketplace. If you tag other MoneyBoys, you can split earnings and the content will appear in all participating creators’ stores.",
  },
  free: {
    text: "Public content to get discovered and grow",
    tooltip: "This content will appear in the feed and help you grow your audience. Tagged MoneyBoys must approve it before publishing and it will appear on their profiles too.",
  },
};

type FeedParams = { show: boolean; onClose: () => void };
type TagUser = {
  _id: string;
  displayName: string;
  userName: string;
  profile?: string;
};
type TaggedUserWithShare = TagUser & {
  percentage: number;
  isCreator?: boolean;
  manuallySet?: boolean;
};
type AccessType = "free" | "subscriber" | "pay_per_view";
type MediaPreview = { url: string; type: "image" | "video" };

const PostSchema = Yup.object({
  text: Yup.string()
    .max(300, "Maximum 300 characters allowed")
    .when("accessType", {
      is: (val: string) => val === "pay_per_view" || val === "subscriber",
      then: (schema) =>
        schema
          .required("Post text is required")
          .min(3, "Text must be at least 3 characters"),
      otherwise: (schema) => schema.notRequired(),
    }),

  accessType: Yup.string().required("Access type is required"),

  price: Yup.number()
    .typeError("Price must be a number")
    .when("accessType", {
      is: "pay_per_view",
      then: (s) =>
        s
          .required("Price is required")
          .positive("Price must be greater than 0"),
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
  const [activeTool, setActiveTool] = useState<
    "image" | "video" | "poll" | null
  >(null);
  const [isScheduled, setIsScheduled] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);
  const [showRecorder, setShowRecorder] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const [mediaPreviews, setMediaPreviews] = useState<MediaPreview[]>([]);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [creatorManuallySet, setCreatorManuallySet] = useState(false);
  const creatorManuallySetRef = useRef(false);
  const [shareOnX, setShareOnX] = useState(false);
  const [tagSearch, setTagSearch] = useState("");
  const [tagUsers, setTagUsers] = useState<TagUser[]>([]);
  const [selectedTagUsers, setSelectedTagUsers] = useState<
    TaggedUserWithShare[]
  >([]);
  const [creatorPercentage, setCreatorPercentage] = useState<number>(0);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const emojiBtnRef = useRef<HTMLButtonElement>(null);
  const dobWrapperRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useDeviceType();
  const hasMedia = mediaPreviews.length > 0;
  const imageCount = mediaPreviews.filter((m) => m.type === "image").length;
  const videoCount = mediaPreviews.filter((m) => m.type === "video").length;


  const creator = {
    name: session?.user?.displayName,
    username: session?.user?.userName,
    profile: session?.user?.profile,
  };

  const removeCollaborator = (id: string) => {
    if (id === "creator") return;
    setSelectedTagUsers((prev) => prev.filter((user) => user._id !== id));
  };

  const waveCanvasRef = useWaveCanvas(uploadProgress);

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
    creatorManuallySetRef.current = creatorManuallySet;
  }, [creatorManuallySet]);

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

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") confirmClose();
    };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, []);

  useEffect(() => {
    if (!show || session?.user?.role !== 2) return;

    const checkSubscription = async () => {
      const res = await getApiWithOutQuery({ url: API_GET_MY_SUBSCRIPTION });
      console.log("Subscription API response:", res); // ← check this in console
      const isSet = res?.success && res?.data?.monthlyPrice > 0;
      setHasSubscription(!!isSet);
    };
    checkSubscription();
  }, [show]);

  useEffect(() => {
    if (isMobile) {
      setShowEmoji(false);
    }
  }, [isMobile]);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    if (isMobile) return;
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
        start + emojiData.emoji.length,
      );
    });

    setShowEmoji(false);
  };

  const searchTagUsers = (q: string) => {
    setTagSearch(q);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      if (!q.trim()) {
        setTagUsers([]);
        return;
      }
      const res = await getApiByParams({
        url: API_SEARCH_TAG_USERS,
        params: `?q=${q}`,
      });
      if (res?.success) setTagUsers(res.users || []);
    }, 400);
  };

  const toggleTagUser = (user: TagUser) => {
    setSelectedTagUsers((prev) => {
      const exists = prev.find((u) => u._id === user._id);
      let updated: TaggedUserWithShare[];

      if (exists) {
        updated = prev.filter((u) => u._id !== user._id);
      } else {
        if (prev.length >= 5) {
          showError("Maximum 5 creators allowed");
          return prev;
        }
        updated = [...prev, { ...user, percentage: 5, manuallySet: false }];
      }

      const totalUsers = updated.length + 1;

      let creatorShare = 0;

      // ✅ if only 2 → 50-50
      if (totalUsers === 2) {
        creatorShare = 50;
      } else {
        // ✅ more than 2 → creator gets higher but dynamic
        creatorShare = Math.max(40, 100 - (totalUsers - 1) * 20);
      }

      const remaining = 100 - creatorShare;

      const rawShare = updated.length > 0 ? remaining / updated.length : 0;
      const equalShare = Math.max(5, Math.round(rawShare / 5) * 5);

      let distributed = 0;

      const updatedUsers = updated.map((u, index) => {
        let val = equalShare;

        if (index === updated.length - 1) {
          val = Math.max(5, 100 - (creatorShare + distributed));
        }

        distributed += val;

        return {
          ...u,
          percentage: val,
          manuallySet: false,
        };
      });

      setCreatorPercentage(creatorShare);
      creatorPercentageRef.current = creatorShare;

      setCreatorManuallySet(false);
      creatorManuallySetRef.current = false;

      return updatedUsers;
    });
  };

  const selectedTagUsersRef = useRef(selectedTagUsers);
  const creatorPercentageRef = useRef(creatorPercentage);

  // Keep refs in sync with state
  useEffect(() => {
    selectedTagUsersRef.current = selectedTagUsers;
  }, [selectedTagUsers]);

  useEffect(() => {
    creatorPercentageRef.current = creatorPercentage;
  }, [creatorPercentage]);

  const updateUserPercentage = (changedId: string, inputValue: number) => {
    // ✅ Force multiples of 5 only
    const value = Math.round(inputValue / 5) * 5;
    const totalUsers = selectedTagUsers.length + 1; // including creator

    // each other must have at least 5
    const maxAllowed = 100 - (totalUsers - 1) * 5;

    const safeValue = Math.max(5, Math.min(maxAllowed, value));

    let creator = {
      _id: "creator",
      percentage: creatorPercentage,
      locked: true,
    };

    let others = selectedTagUsers.map((u) => ({
      _id: u._id,
      percentage: u.percentage,
      locked: u._id === changedId ? true : u.manuallySet || false,
    }));

    // =========================
    // 👉 CREATOR UPDATED
    // =========================
    if (changedId === "creator") {
      creator.percentage = safeValue;

      const remaining = 100 - safeValue;
      const split = others.length > 0 ? remaining / others.length : 0;

      let distributed = 0;

      const updatedOthers = others.map((u, index) => {
        let val = Math.round(split / 5) * 5;

        if (index === others.length - 1) {
          // ✅ Fix rounding difference
          val = Math.max(5, 100 - (safeValue + distributed));
        }

        distributed += val;

        return {
          ...u,
          percentage: val,
          locked: false,
        };
      });

      setCreatorPercentage(safeValue);

      setSelectedTagUsers((prev) =>
        prev.map((u) => {
          const found = updatedOthers.find((f) => f._id === u._id);
          return {
            ...u,
            percentage: found?.percentage || 0,
            manuallySet: false,
          };
        }),
      );

      return;
    }

    // =========================
    // 👉 USER UPDATED
    // =========================
    others = others.map((u) =>
      u._id === changedId ? { ...u, percentage: safeValue, locked: true } : u,
    );

    const lockedTotal =
      creator.percentage +
      others.filter((u) => u.locked).reduce((sum, u) => sum + u.percentage, 0);

    const unlocked = others.filter((u) => !u.locked);

    const remaining = 100 - lockedTotal;
    const split = unlocked.length > 0 ? remaining / unlocked.length : 0;

    let distributed = 0;

    const finalOthers = others.map((u, index) => {
      if (u.locked) return u;

      let val = Math.round(split / 5) * 5;

      if (index === others.length - 1) {
        const remainingForLast =
          100 -
          (creator.percentage +
            others
              .filter((x) => x.locked)
              .reduce((s, x) => s + x.percentage, 0) +
            distributed);

        val = Math.max(5, remainingForLast);
      }

      distributed += val;

      return {
        ...u,
        percentage: val,
      };
    });

    setSelectedTagUsers((prev) =>
      prev.map((u) => {
        const found = finalOthers.find((f) => f._id === u._id);
        return {
          ...u,
          percentage: found?.percentage || 0,
          manuallySet: found?.locked || false,
        };
      }),
    );
  };

  const handleAccessTypeChange = (type: AccessType) => {
    setAccessType(type);
    setIsScheduled(false);
    formik.setFieldValue("accessType", type);
    formik.setFieldValue("isScheduled", false);
    formik.setFieldValue("scheduledAt", "");
  };

  const removeMedia = (index: number) => {
    URL.revokeObjectURL(mediaPreviews[index].url);
    setMediaPreviews((prev) => prev.filter((_, i) => i !== index));
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
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
        type: (file.type.startsWith("video") ? "video" : "image") as
          | "image"
          | "video",
      })),
    ]);

    e.target.value = "";
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const allowedTypes = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/quicktime", // .mov
    ];

    const validFiles = files.filter((file) =>
      allowedTypes.includes(file.type)
    );

    if (validFiles.length !== files.length) {
      showError("Allowed formats: MP4, WEBM, OGG, MOV");
      return;
    }
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
      if (
        values.accessType === "subscriber" &&
        session?.user?.role === 2 &&
        hasSubscription === false // ← use fetched value, null means still loading
      ) {
        const goToPricing = await showQuestion(
          `<p>You must set your subscription price before uploading subscriber content.</p>
     <p>Please go to <strong>Edit Profile → Pricing Settings</strong> to configure your pricing.</p>`,
          "Go to Pricing Settings",
          "Cancel",
          true,
        );
        if (goToPricing)
          window.location.href = "/creator-edit-profile?tab=pricing";
        setIsSubmitting(false);
        return;
      }

      try {
        if (selectedTagUsers.length > 0) {
          if (selectedTagUsers.length > 5) {
            showError("You can tag maximum 5 creators");
            return;
          }

          if (values.accessType === "pay_per_view") {
            const invalidUser = selectedTagUsers.find(
              (u) => !u.percentage || u.percentage <= 0,
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
              0,
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
        formData.append("shareOnX", shareOnX ? "true" : "false");
        if (values.accessType === "pay_per_view") {
          formData.append("price", values.price);
        }
        if (values.isScheduled && values.scheduledAt) {
          formData.append("scheduledAt", values.scheduledAt);
        }

        mediaFiles.forEach((file) => formData.append("mediaFiles", file));

        const finalMediaType = mediaFiles.some((f) =>
          f.type.startsWith("video"),
        )
          ? "video"
          : "photo";
        formData.append("mediaType", finalMediaType);

        setUploadProgress(1);


        const res = await apiPostWithMultiForm({
          url: API_CREATE_POST,
          values: formData,
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );

            setTimeout(() => {
              setUploadProgress((prev) => {
                if (percent > prev) return percent;
                return prev;
              });
            }, 50);
          },
        });
        if (!res?.success) {
          // ← Catch the backend subscription error and show custom popup
          if (res?.message?.toLowerCase().includes("subscription")) {
            const goToPricing = await showQuestion(
              `<p>You must set your subscription price before uploading subscriber content.</p>
       <p>Please go to <strong>Edit Profile → Pricing Settings</strong> to configure your pricing.</p>`,
              "Go to Pricing Settings",
              "Cancel",
              true,
            );
            if (goToPricing)
              window.location.href = "/creator-edit-profile?tab=pricing";
            return;
          }
          showError(res?.message || "Failed to create post");
          return;
        }

        queryClient.invalidateQueries({
          queryKey: ["creator-posts"],
          exact: false,
        });

        queryClient.invalidateQueries({
          queryKey: ["creator-profile"],
        });

        dispatch(fetchFollowerCounts());

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

          // ✅ ADD HERE
          dispatch(resetFeedPosts());
          await dispatch(
            fetchFeedPosts({
              userId: (session?.user as any)?.id,
              page: 1,
              limit: 10,
            })
          );
        }
        if (selectedTagUsers.length === 0) {
          dispatch(resetFeedPosts());
          await dispatch(
            fetchFeedPosts({
              userId: (session?.user as any)?.id,
              page: 1,
              limit: 10,
            })
          );
        }


        showSuccess("Post created successfully");

        if (shareOnX) {
          const postPublicId = res?.post?.publicId;

          let postUrl = "";

          if (values.accessType === "subscriber") {
            postUrl = `${window.location.origin}/${creator.username}?from=x`;
          } else {
            const postPublicId = res?.post?.publicId;

            postUrl = postPublicId
              ? `${window.location.origin}/post?publicId=${postPublicId}&from=x`
              : `${window.location.origin}/${creator.username}`;
          }

          const shareText = values.text
            ? values.text.substring(0, 200)
            : "Check out my latest post!";

          const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${encodeURIComponent(postUrl)}`;

          window.open(
            tweetUrl,
            "_blank",
            "width=550,height=420,noopener,noreferrer"
          );
        }

        onClose();
      } catch (error) {
        console.error(error);
        showError("An error occurred while creating post");
      } finally {
        setTimeout(() => {
          setUploadProgress(0);
        }, 1500); // 👈 keep visible for 1.5 sec

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
      "Continue Editing",
    );

    if (leave) onClose();
  };

  const totalPercentage =
    Number(creatorPercentage || 0) +
    selectedTagUsers.reduce((sum, u) => sum + Number(u.percentage || 0), 0);

  const difference = Number((100 - totalPercentage).toFixed(2));
  return (
    <>
      <Modal size="lg" show={show} title="Create New Post" onClose={confirmClose}>
        <div className="modal_containt post-modal">
          <form
            className="space"
            onClick={(e) => e.stopPropagation()}
            onSubmit={formik.handleSubmit}
          >
            {/* <div className="modal_head">
              <h3 className="title">Create New Post</h3>
              <button type="button" className="close-btn" onClick={confirmClose}>
                <CgClose size={22} />
              </button>
            </div> */}
            <div className="input-wrap">
              <div className="label-input textarea one mb-5">
                <textarea
                  ref={textareaRef}
                  rows={4}
                  placeholder="Compose new post..."
                  name="text"
                  value={formik.values.text}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) e.stopPropagation();
                  }}
                />
              </div>
              <span className="right">
                <button
                  type="button"
                  ref={emojiBtnRef}
                  className="emoji-btn"
                  onClick={() => {
                    if (isMobile) return; // 🚫 stop on mobile
                    setShowEmoji((prev) => !prev);
                  }}
                >
                  {" "}
                  <Smile
                    size={20}
                    stroke="black"
                    strokeWidth={1}
                    fill="#fece26"
                  />
                </button>
                {formik.values.text.length}/300
                {showEmoji && !isMobile && (
                  <div ref={emojiRef} className="emoji-picker-wrapper">
                    <EmojiPicker
                      onEmojiClick={handleEmojiClick}
                      autoFocusSearch={false}
                      skinTonesDisabled
                      previewConfig={{ showPreview: false }}
                      height={320}
                      width={320}
                    />
                  </div>
                )}
              </span>
            </div>
            {formik.touched.text && formik.errors.text && (
              <span className="error-message">{formik.errors.text}</span>
            )}
            <div className="select_wrap">
              <label className="radio_wrap">
                <input
                  type="radio"
                  name="access"
                  checked={accessType === "subscriber"}
                  onChange={() => handleAccessTypeChange("subscriber")}
                />{" "}
                Only for Subscribers
              </label>
              <label className="radio_wrap">
                <input
                  type="radio"
                  name="access"
                  checked={accessType === "pay_per_view"}
                  onChange={() => handleAccessTypeChange("pay_per_view")}
                />{" "}
                Pay per View
              </label>
              <label className="radio_wrap">
                <input
                  type="radio"
                  name="access"
                  checked={accessType === "free"}
                  onChange={() => handleAccessTypeChange("free")}
                />{" "}
                Free for Everyone
              </label>
            </div>
            {/* <div className="warningtext">
              <CircleAlert size={18} className="svgicons" /> Lorem Ipsum is simply
              dummy text of the printing and typesetting industry.
            </div> */}

            <div className="warningtext">
              <span>{accessContentMap[accessType].text}</span>
              <div className="btntooltip_wrapper">
                <button
                  className="info-btn"
                  data-tooltip={accessContentMap[accessType].tooltip}
                >
                  <CircleAlert size={16} className="svgicons info-icon" />
                </button>
              </div>
            </div>

            {accessType === "pay_per_view" && (
              <div>
                <label>Price($)</label>
                <input
                  className="form-input"
                  type="text"
                  name="price"
                  placeholder="10.99 *"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.price && formik.errors.price && (
                  <div className="error-message">{formik.errors.price}</div>
                )}
              </div>
            )}

            {(accessType === "pay_per_view" || accessType === "subscriber") && (
              <div className="flex items-center gap-10">
                <div>
                  <label>Schedule?</label>
                  <div className="toggleGroup">
                    <input type="checkbox" id="on-off-switch" className="checkbox" name="isScheduled" checked={isScheduled} onChange={() => { const newVal = !isScheduled; setIsScheduled(newVal); formik.setFieldValue("isScheduled", newVal); if (!newVal) formik.setFieldValue("scheduledAt", ""); }} />
                    <label htmlFor="on-off-switch" className="label" />
                    <div className="onoffswitch" aria-hidden="true"> <div className="onoffswitchLabel">
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
                      {isMobile ? (
                        <>
                          {!formik.values.scheduledAt && (<span className="mobail_placeholder">DD/MM/YYYY</span>)}
                          <input type="date" className="form-input" value={formik.values.scheduledAt ? new Date(formik.values.scheduledAt).toISOString().split("T")[0] : ""} min={new Date().toISOString().split("T")[0]} onChange={(e) => { const value = e.target.value; if (!value) { formik.setFieldValue("scheduledAt", ""); return; } const date = new Date(value); if (isNaN(date.getTime())) return; formik.setFieldValue("scheduledAt", date.toISOString()); }} style={{ color: formik.values.scheduledAt ? "inherit" : "transparent", }} />
                        </>
                      ) : (
                        <>
                          <input type="text" name="scheduledAt" placeholder="Schedule Date (DD/MM/YYYY) *" className="form-input" value={formik.values.scheduledAt ? new Date(formik.values.scheduledAt).toLocaleDateString("en-GB") : ""} readOnly onClick={() => setActiveField("schedule")} />
                          {activeField === "schedule" && (
                            <div className="calendar_show">
                              <DatePicker inline selected={formik.values.scheduledAt ? new Date(formik.values.scheduledAt) : null} minDate={new Date()} onChange={(date: Date | null) => { if (!date || isNaN(date.getTime())) { formik.setFieldValue("scheduledAt", ""); return; } formik.setFieldValue("scheduledAt", date.toISOString()); setActiveField(null); }} />
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    {formik.touched.scheduledAt && formik.errors.scheduledAt && (<div className="error-message">{formik.errors.scheduledAt}</div>)}
                  </div>
                )}
              </div>
            )}

            <div className="upload-wrapper">
              {mediaPreviews.map((media, index) => (
                <div className="img_wrap" key={index}>
                  {media.type === "image" ? (
                    <img src={media.url} className="img-fluid upldimg" alt={`preview-${index}`} />
                  ) : (
                    <video src={media.url} className="img-fluid upldimg" />
                  )}
                  <button type="button" className="btn-danger" onClick={() => removeMedia(index)}> <CircleX size={16} /></button>
                </div>
              ))}
            </div>
            {formik.touched.hasMedia && formik.errors.hasMedia && (
              <div className="error-message">{formik.errors.hasMedia}</div>
            )}

            {collaborators.length > 0 && (
              <div className="moneyboy-post__header scrollbar">
                {collaborators.map((user) => (
                  <div className="profile-card upl_card" key={user._id}>
                    <div className="profile-card__main">
                      <div className="profile-card__avatar-settings uplview_user upload-wrapper">
                        <div className="profile-card__avatar img_wrap">
                          {user.profile ? (
                            <img src={user.profile} alt={user.displayName} className="img-fluid" />
                          ) : (
                            <NoProfileSVG />
                          )}
                          <button type="button" className="btn-danger" onClick={() => removeCollaborator(user._id)}><CircleX size={14} /></button>
                        </div>
                      </div>
                      <div className="profile-card__info">
                        <div className="profile-card__name">{user.displayName}</div>
                        <div className="profile-card__username">@{user.userName}</div>
                      </div>
                      <div className="right_box">
                        {accessType === "free" && (<span className="btn-primary">Free</span>)}
                        {accessType === "subscriber" && (<span className="btn-primary">Subscriber</span>)}
                        {accessType === "pay_per_view" && (
                          <div className="quantity">
                            <button type="button" className="qty-btn" onClick={() => { const current = user.percentage || 0; const newVal = Math.max(5, current - 5); updateUserPercentage(user.isCreator ? "creator" : user._id, newVal,); }}>
                              <Minus size={16} />
                            </button>

                            <input
                              type="text"
                              className="form-input text-center"
                              value={`${user.percentage || 0}%`}
                              disabled
                            />

                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() => {
                                const current = user.percentage || 0;
                                const newVal = Math.min(100, current + 5);
                                updateUserPercentage(
                                  user.isCreator ? "creator" : user._id,
                                  newVal,
                                );
                              }}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          // <input
                          //   type="number"
                          //   placeholder="Add Percentage"
                          //   className="form-input"
                          //   value={user.percentage || ""}
                          //   onChange={(e) => {
                          //     const value = Number(e.target.value);
                          //     updateUserPercentage(
                          //       user.isCreator ? "creator" : user._id,
                          //       value,
                          //     );
                          //   }}
                          // />
                        )}
                      </div>
                      {/* <button
                        type="button"
                        className="btn-danger"
                        onClick={() => removeCollaborator(user._id)}
                      >
                        <CircleX size={16} />
                      </button> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {accessType === "pay_per_view" && collaborators.length > 0 && (
              <div className="text-right">
                {difference !== 0 && (
                  <span className="error-message">
                    {difference > 0
                      ? `${difference}% remaining`
                      : `${Math.abs(difference)}% exceeded`}
                  </span>
                )}
              </div>
            )}

            <input
              type="file"
              ref={thumbnailInputRef}
              hidden
              accept="image/*"
            />

            {activeTool === "video" && (
              <div className="flex items-center gap-10">
                <button
                  type="button"
                  className="btn-grey btnicons gap-10"
                  onClick={() => setShowRecorder(true)}
                >
                  {" "}
                  <FiVideo size={16} /> <span>Start recording</span>
                </button>
                <button
                  type="button"
                  className="btn-grey btnicons gap-10"
                  onClick={() => videoInputRef.current?.click()}
                >
                  {" "}
                  <MdUpload size={16} /> <span>Upload video</span>
                </button>
                <input
                  type="file"
                  ref={videoInputRef}
                  hidden
                  accept="video/mp4,video/webm,video/ogg,video/quicktime"
                  multiple
                  onChange={handleVideoChange}
                />
              </div>
            )}

            {activeTool === "poll" && (
              <div className="duration_wraping">
                <label className="orange">Poll Duration - 7 days</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Question"
                />
                <label className="pollanw selected">Option 1</label>
                <label className="pollanw">Option 2</label>
                <Link href="#" className="clear">
                  {" "}
                  Clear Polls
                </Link>
              </div>
            )}

            <input
              type="file"
              hidden
              ref={imageInputRef}
              accept=".png,.jpeg,.jpg,.wbjpg,.mp4"
              multiple
              onChange={handleImageChange}
            />
            <div className="actions tooltip_wrapper">
              <ul>
                <li>
                  <button
                    type="button"
                    className="cate-back-btn active-down-effect btn_icons"
                    data-tooltip="Add Content"
                    onClick={() => {
                      setActiveTool("image");
                      imageInputRef.current?.click();
                    }}
                  >
                    {" "}
                    <FiImage size={20} />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="cate-back-btn active-down-effect btn_icons"
                    data-tooltip="Add Video"
                    onClick={() => setActiveTool("video")}
                  >
                    {" "}
                    <FiVideo size={20} />
                  </button>
                </li>
                <li>
                  <div className="hline" />
                </li>
                <li className="icontext_wrap">
                  <button
                    type="button"
                    className="cate-back-btn active-down-effect btn_icons"
                    data-tooltip="Tag someone"
                    disabled={!hasMedia}
                    onClick={() => setShowTagModal(true)}
                  >
                    <FiAtSign size={20} />
                  </button>
                  <p>Tag</p>
                </li>
              </ul>
              <div className="right">
                <ul>
                  <li>
                    <button
                      type="button"
                      className={`cate-back-btn active-down-effect btn_icons ${shareOnX ? "active" : ""
                        }`}
                      data-tooltip={
                        !hasMedia ? "Add media to share on X" : "Share on X"
                      }
                      disabled={!hasMedia}
                      onClick={() => setShareOnX((prev) => !prev)}
                    >
                      <FaXTwitter size={20} />
                    </button>
                  </li>
                </ul>
                <button type="submit" data-tooltip={!hasMedia ? "Add media to post" : "Publish post"} className={[uploadProgress > 0 ? "upload-btn" : "premium-btn active-down-effect",].filter(Boolean).join(" ")}
                  disabled={!hasMedia || (accessType === "pay_per_view" && selectedTagUsers.length > 0 && totalPercentage !== 100)}>
                  {uploadProgress > 0 && (<canvas className="wave-canvas" ref={waveCanvasRef} />)}
                  <span className="btn-content">
                    {uploadProgress > 0 ? (
                      <>
                        <span className="progress-text">{uploadProgress >= 100 ? "Processing..." : `${uploadProgress}%`}</span>
                        {/* <span className="progress-bar"><span className="progress-fill" style={{ width: `${uploadProgress}%` }}/></span> */}
                      </>
                    ) : (
                      <span>{isSubmitting ? "Posting..." : "Post"}</span>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
      {showTagModal && (
        <Modal
          size="lg"
          show={show}
          title="Tag Other Creators"
          onClose={() => setShowTagModal(false)}
        >
          <div className="modal_containt creators-modal">
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
            <div className="moneyboy-post__header scrollbar">
              <div className="profile-card">
                {tagUsers.map((user) => {
                  const selected = selectedTagUsers.some(
                    (u) => u._id === user._id,
                  );
                  return (
                    <label
                      key={user._id}
                      className={`profile-card__main radio-card ${selected ? "active" : ""}`}
                    >
                      <div className="profile-card__avatar-settings">
                        <div className="profile-card__avatar">
                          {user.profile ? (
                            <img src={user.profile} alt={user.displayName} />
                          ) : (
                            <NoProfileSVG />
                          )}
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
                      <div className="radio-indicator">
                        <input
                          type="checkbox"
                          name="tagUser"
                          checked={selected}
                          onChange={() => toggleTagUser(user)}
                        />
                        <span className="checkmark"></span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="actions creators-footer justify-end">
              <button
                type="button"
                className="premium-btn"
                onClick={() => setShowTagModal(false)}
              >
                <span>Tag user</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
      {showRecorder && (
        <VideoRecorder
          onClose={() => setShowRecorder(false)}
          onRecorded={(file: File) => {
            if (videoCount >= 3) {
              showError("Maximum 3 videos allowed"); return;
            }
            setMediaFiles((prev) => [...prev, file]);
            setMediaPreviews((prev) => [
              ...prev,
              { url: URL.createObjectURL(file), type: "video" },
            ]);
          }}
        />
      )}
    </>
  );
};

export default AddFeedModal;
