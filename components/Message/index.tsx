"use client";
import React, { useEffect, useRef, useState } from "react";
import SideBar from "./SideBar";
import {
  CircleX,
  BadgeCheck,
  MessageCircleMore,
  Loader,
  Check,
  Send,
} from "lucide-react";
import "@/public/styles/small-components/small-components.css";
import { useDeviceType } from "@/hooks/useDeviceType";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useDecryptedSession } from "@/libs/useDecryptedSession";
import socket from "@/libs/socket";
import {
  apiPost,
  apiPostWithMultiForm,
  getApi,
  getApiByParams,
} from "@/utils/endpoints/common";
import { API_MESSAGE_CHAT_UPLOAD_MEDIA } from "@/utils/api/APIConstant";
import { useRouter, useSearchParams } from "next/navigation";
import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";
import toast from "react-hot-toast";
import ChatFeatures from "./ChatFeatures";
import Link from "next/link";
import NoProfileSvg from "../common/NoProfileSvg";
import { CgClose } from "react-icons/cg";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  deleteThread,
  fetchMessages,
  fetchSidebar,
  reportThread,
} from "@/redux/message/messageActions";
import {
  addSocketMessage,
  clearMessages,
  markMessagesReadFromSocket,
  setActiveThread,
  setThreadDetails,
  updatePPVStatus,
} from "@/redux/message/messageSlice";
import CustomAudioPlayer from "../common/CustomAudioPlayer";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { showError, showSuccess } from "@/utils/alert";

const MessagePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { session } = useDecryptedSession();
  const searchParams = useSearchParams();
  const threadPublicIdFromUrl = searchParams.get("threadId");
  const [activeUser, setActiveUser] = useState<any>(null);
  const [newComment, setNewComment] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLInputElement | null>(null);
  const emojiRef = useRef<HTMLDivElement | null>(null);
  const emojiButtonRef = useRef<HTMLButtonElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadType, setUploadType] = useState<"file" | "voice" | null>(null);
  const [uploadingMap, setUploadingMap] = useState<Record<string, boolean>>({});
  const [uploadProgressMap, setUploadProgressMap] = useState<
    Record<string, number>
  >({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTypingRef = useRef(false);
  const [searchText, setSearchText] = useState("");
  const [searchedMessages, setSearchedMessages] = useState<any[]>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reportMessage, setReportMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingStreamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingStartTimeRef = useRef<number | null>(null);
  const voiceTouchActiveRef = useRef(false);
  const voiceInteractionLockRef = useRef(false);
  const discardRecordingRef = useRef(false);
  const isUploadingVoiceRef = useRef(false);
  const isMobile = useDeviceType();

  const { isBlockedByYou, isBlockedByOther } = useAppSelector(
    (state) => state.message,
  );

  const dispatch = useAppDispatch();
  const { messages, chatList, activeThreadId } = useAppSelector(
    (state) => state.message,
  );

  useEffect(() => {
    dispatch(fetchSidebar());
  }, [dispatch]);

  // Socket connection
  useEffect(() => {
    console.log("🔌Socket connected:", socket.connected);
    console.log("🔌Socket ID:", socket.id);

    socket.on("connect", () => {
      console.log("✅ Socket CONNECTED with ID:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket DISCONNECTED");
    });

    socket.on("connect_error", (error) => {
      console.error("❌ Socket connection error:", error);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
    };
  }, []);

  useEffect(() => {
    if (!session?.user?.id) return;

    const onNewMessage = (msg: any) => dispatch(addSocketMessage(msg));
    const onRead = ({ readerId }: any) => {
      if (readerId !== session.user.id) {
        dispatch(markMessagesReadFromSocket(readerId));
      }
    };

    socket.on("newMessage", onNewMessage);
    socket.on("messagesRead", onRead);

    return () => {
      socket.off("newMessage", onNewMessage);
      socket.off("messagesRead", onRead);
    };
  }, [session?.user?.id, dispatch]);

  useEffect(() => {
    if (!session?.user?.id) return;

    socket.emit("heartbeat", session.user.id);

    const interval = setInterval(() => {
      socket.emit("heartbeat", session.user.id);
    }, 5000);

    return () => clearInterval(interval);
  }, [session?.user?.id]);

  useEffect(() => {
    const handler = (msg: any) => {
      console.log("🔥 SOCKET MESSAGE RECEIVED:", msg);
      dispatch(addSocketMessage(msg));
    };

    socket.on("newMessage", handler);

    return () => {
      socket.off("newMessage", handler);
    };
  }, [dispatch]);

  // Scroll to bottom whenever messages change or active thread changes.
  // Using a sentinel <div> at the bottom + scrollIntoView inside rAF
  // guarantees the DOM has fully painted before we scroll.
  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior, block: "end" });
    });
  };

  useEffect(() => {
    // Smooth scroll when a new message arrives
    scrollToBottom("smooth");
  }, [messages]);

  useEffect(() => {
    // Instant jump when switching to a different thread (no animation flash)
    scrollToBottom("instant");
  }, [activeThreadId]);

  useEffect(() => {
    const handler = ({ ppvId, status, deliveredMedia }: any) => {
      dispatch(updatePPVStatus({ ppvId, status, deliveredMedia }));
    };
    socket.on("ppvUpdated", handler);
    return () => {
      socket.off("ppvUpdated", handler);
    };
  }, [dispatch]);

  useEffect(() => {
    const handler = ({ readerId }: any) => {
      if (readerId === session?.user?.id) return;
      dispatch(markMessagesReadFromSocket(readerId));
    };

    socket.on("messagesRead", handler);

    return () => {
      socket.off("messagesRead", handler);
    };
  }, [dispatch, session?.user?.id]);

  useEffect(() => {
    if (!threadPublicIdFromUrl) return;
    dispatch(setActiveThread(threadPublicIdFromUrl));
  }, [threadPublicIdFromUrl, dispatch]);

  useEffect(() => {
    if (!activeThreadId || !session?.user?.id) return;

    socket.emit("markRead", {
      threadId: activeThreadId,
      userId: session.user.id,
    });
  }, [activeThreadId, session?.user?.id]);

  useEffect(() => {
    if (!activeThreadId) return;
    let isCancelled = false;

    setIsChatLoading(true);
    setActiveUser(null);
    dispatch(clearMessages());
    dispatch(setThreadDetails(null));

    (async () => {
      try {
        const [, threadRes] = await Promise.all([
          dispatch(fetchMessages(activeThreadId)),
          getApiByParams({
            url: "/messages/thread",
            params: activeThreadId,
          }),
        ]);

        if (isCancelled) return;

        console.log("THREAD DETAILS:", threadRes);

        dispatch(setThreadDetails(threadRes));
        setActiveUser(threadRes?.user || null);
      } catch (err) {
        if (isCancelled) return;
        console.error("THREAD DETAILS ERROR:", err);
      } finally {
        if (!isCancelled) {
          setIsChatLoading(false);
        }
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [activeThreadId, dispatch]);

  useEffect(() => {
    const handleTyping = ({ threadId, userId }: any) => {
      if (threadId === activeThreadId && userId !== session?.user?.id) {
        setIsOtherUserTyping(true);
      }
    };
    const handleStopTyping = ({ threadId, userId }: any) => {
      if (threadId === activeThreadId && userId !== session?.user?.id) {
        setIsOtherUserTyping(false);
      }
    };
    socket.on("userTyping", handleTyping);
    socket.on("userStopTyping", handleStopTyping);
    return () => {
      socket.off("userTyping", handleTyping);
      socket.off("userStopTyping", handleStopTyping);
    };
  }, [activeThreadId, session?.user?.id]);

  useEffect(() => {
    if (!activeThreadId) return;

    const joinRoom = () => {
      console.log("🚪 Joining thread room:", activeThreadId);
      socket.emit("joinThread", activeThreadId);
    };

    if (socket.connected) {
      joinRoom();
    }

    socket.on("connect", joinRoom);

    return () => {
      socket.off("connect", joinRoom);
    };
  }, [activeThreadId]);

  useEffect(() => {
    if (!session?.user?.id) return;

    const handleConnect = () => {
      socket.emit("connectUser", session.user.id);
      console.log("🔗 User connected to socket");
    };

    if (socket.connected) {
      handleConnect();
    }

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [session?.user?.id]);

const sendMessage = () => {
  if (!newComment.trim()) return;
  if (!activeThreadId || !session?.user?.id || !activeUser?.id) return;

  // 1. Build an optimistic message immediately
  const optimisticMsg = {
    _id: `temp-${Date.now()}`,           // temporary ID
    threadId: activeThreadId,
    senderId: {
      _id: session.user.id,
      profile: session.user.profile || null,
    },
    receiverId: activeUser.id,
    message: newComment,
    type: 1,
    isRead: false,
    createdAt: new Date().toISOString(),
  };

  // 2. Push it to Redux store instantly (no waiting for socket)
  dispatch(addSocketMessage(optimisticMsg));

  // 3. Clear input immediately
  setNewComment("");

  // 4. Emit to socket as before
  socket.emit("sendMessage", {
    threadId: activeThreadId,
    senderId: session.user.id,
    receiverId: activeUser.id,
    text: newComment,
  });
};

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart ?? newComment.length;
    const end = textarea.selectionEnd ?? newComment.length;

    const updatedText =
      newComment.substring(0, start) +
      emojiData.emoji +
      newComment.substring(end);

    setNewComment(updatedText);

    requestAnimationFrame(() => {
      textarea.focus();
      const cursor = start + emojiData.emoji.length;
      textarea.setSelectionRange(cursor, cursor);
    });
  };

  useEffect(() => {
    if (searchedMessages.length === 0) return;

    const firstMatchId = searchedMessages[0]._id;
    const element = messageRefs.current[firstMatchId];

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [searchedMessages]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        emojiRef.current &&
        !emojiRef.current.contains(target) &&
        !emojiButtonRef.current?.contains(target) &&
        !textareaRef.current?.contains(target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const desktopStyle: React.CSSProperties = {
    translate: "none",
    rotate: "none",
    scale: "none",
    transform: "translate(0px, 0px)",
    zIndex: 1000,
    width: "auto",
    display: "flex",
    opacity: 1,
    overflow: "visible",
  };

  const mobileStyle: React.CSSProperties = {
    translate: "none",
    rotate: "none",
    scale: "none",
    transform: isOpen ? "translateY(0)" : "translateY(100%)",
    zIndex: 1000,
    width: "100%",
    bottom: "25px",
    left: "0",
    display: "block",
    opacity: isOpen ? 1 : 0,
    position: "fixed",
    transition: "all 0.3s ease",
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const overlay = document.querySelector(".mobile-popup-overlay");
    if (!overlay) return;

    if (isOpen && !showReportModal && !showDeleteModal) {
      overlay.classList.add("active");
    } else {
      overlay.classList.remove("active");
    }

    return () => overlay.classList.remove("active");
  }, [isOpen, isMobile, showReportModal, showDeleteModal]);

  const formatDateLabel = (date: string) => {
    const messageDate = new Date(date);
    const today = new Date();

    const isToday = messageDate.toDateString() === today.toDateString();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isYesterday = messageDate.toDateString() === yesterday.toDateString();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";

    return messageDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!activeThreadId || !activeUser?.id) return;

    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      toast.error("Please select an image or video file");
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      toast.error("File must be less than 100MB");
      return;
    }

    setUploading(true);
    setUploadType("file");
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("threadId", activeThreadId);
      formData.append("receiverId", activeUser.id);

      const res = await apiPostWithMultiForm({
        url: API_MESSAGE_CHAT_UPLOAD_MEDIA,
        values: formData,
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return;
          const percent = Math.min(
            100,
            Math.round((progressEvent.loaded * 100) / progressEvent.total),
          );
          setUploadProgress(percent);
        },
      });

      if (!res || res.error) {
        toast.error(res?.error || "Upload failed");
      }

      socket.emit("mediaMessageUploaded", {
        threadId: activeThreadId,
        messageId: res._id,
      });

      if (res && !res.error) {
        dispatch(addSocketMessage(res));
      }
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      setUploadType(null);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const performSearch = async (value: string) => {
    if (!value.trim()) {
      setSearchedMessages([]);
      return;
    }

    const res = await getApi({
      url: `/messages/thread/search/${activeThreadId}`,
      page: 1,
      rowsPerPage: 50,
      searchText: value,
    });

    setSearchedMessages(res?.data || []);
  };

  const handleSearchChange = (value: string) => {
    setSearchText(value);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      performSearch(value);
    }, 500);
  };

  const highlightText = (text: string, search: string) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(
      regex,
      `<span style="
      background-color:#ffd54f;
      color:#000;
      padding:2px 4px;
      border-radius:4px;
    ">$1</span>`,
    );
  };

  const handleAcceptPPV = async (ppvId: string) => {
    try {
      await apiPost({ url: `subscription/accept/${ppvId}`, values: {} });
      toast.success("PPV accepted!");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to accept");
    }
  };

  const handleUploadPPVMedia = async (
    ppvId: string,
    files: FileList | null,
    requestType?: string,
  ) => {
    if (!files) return;
    if (!activeThreadId) return;

    const selectedFiles = Array.from(files);

    if (selectedFiles.length === 0) return;

    const normalizedRequestType = requestType?.toUpperCase();

    const hasInvalidFile = selectedFiles.some((file) => {
      if (normalizedRequestType === "PHOTO") {
        return !file.type.startsWith("image/");
      }

      if (normalizedRequestType === "VIDEO") {
        return !file.type.startsWith("video/");
      }

      return !file.type.startsWith("image/") && !file.type.startsWith("video/");
    });

    if (hasInvalidFile) {
      toast.error(
        normalizedRequestType === "PHOTO"
          ? "Please upload only image files"
          : normalizedRequestType === "VIDEO"
            ? "Please upload only video files"
            : "Please upload only image or video files",
      );
      return;
    }

    const hasOversizedFile = selectedFiles.some(
      (file) => file.size > 100 * 1024 * 1024,
    );

    if (hasOversizedFile) {
      toast.error("Each file must be less than 100MB");
      return;
    }

    setUploadingMap((prev) => ({ ...prev, [ppvId]: true }));
    setUploadProgressMap((prev) => ({ ...prev, [ppvId]: 0 }));

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await apiPostWithMultiForm({
        url: `subscription/upload-media/${ppvId}`,
        values: formData,
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return;
          const percent = Math.min(
            100,
            Math.round((progressEvent.loaded * 100) / progressEvent.total),
          );
          setUploadProgressMap((prev) => ({ ...prev, [ppvId]: percent }));
        },
      });

      if (res?.error) {
        toast.error(res.error || "Upload failed");
        return;
      }

      await dispatch(fetchMessages(activeThreadId));
      toast.success("Media uploaded");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploadingMap((prev) => ({ ...prev, [ppvId]: false }));
      setUploadProgressMap((prev) => ({ ...prev, [ppvId]: 0 }));
    }
  };

  const handleRejectPPV = async (ppvId: string, reason: string) => {
    try {
      await apiPost({
        url: `subscription/reject/${ppvId}`,
        values: { reason },
      });

      toast.success("PPV Rejected");
    } catch (err) {
      toast.error("Failed");
    }
  };

  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!activeThreadId) {
      toast.error("No active conversation");
      return;
    }

    if (!reportMessage.trim()) {
      toast.error("Please enter a reason");
      return;
    }

    const res: any = await dispatch(
      reportThread({
        threadPublicId: activeThreadId,
        message: reportMessage,
      }),
    );

    if (res.meta.requestStatus === "fulfilled") {
      toast.success(res.payload?.message || "Report submitted");
      setShowReportModal(false);
      setReportMessage("");
    } else {
      toast.error("Failed to submit report");
    }
  };

  const handleDelete = async () => {
    if (!activeThreadId) {
      toast.error("No active conversation");
      return;
    }
    await dispatch(deleteThread(activeThreadId));
    setIsOpen(false);
    setShowDeleteModal(false);
    showSuccess("Conversation deleted successfully");
    router.replace("/message");
  };

  const getSupportedAudioMimeType = () => {
    const mimeTypes = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/mp4",
      "audio/ogg;codecs=opus",
      "audio/ogg",
    ];

    for (const mimeType of mimeTypes) {
      if (
        typeof MediaRecorder !== "undefined" &&
        MediaRecorder.isTypeSupported(mimeType)
      ) {
        return mimeType;
      }
    }

    return "";
  };

  const stopRecordingTracks = () => {
    recordingStreamRef.current?.getTracks().forEach((track) => track.stop());
    recordingStreamRef.current = null;
  };

  const resetVoiceRecorder = () => {
    mediaRecorderRef.current = null;
    audioChunksRef.current = [];
    recordingStartTimeRef.current = null;
    discardRecordingRef.current = false;
    voiceInteractionLockRef.current = false;
    setIsRecording(false);
  };

  const uploadVoiceMessage = async (file: File) => {
    if (!activeThreadId || !activeUser?.id || isUploadingVoiceRef.current)
      return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("threadId", activeThreadId);
    formData.append("receiverId", activeUser.id);

    try {
      isUploadingVoiceRef.current = true;
      setUploading(true);
      setUploadType("voice");
      setUploadProgress(0);
      const res = await apiPostWithMultiForm({
        url: API_MESSAGE_CHAT_UPLOAD_MEDIA,
        values: formData,
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return;
          const percent = Math.min(
            100,
            Math.round((progressEvent.loaded * 100) / progressEvent.total),
          );
          setUploadProgress(percent);
        },
      });

      if (res && !res.error) {
        dispatch(addSocketMessage(res));
        socket.emit("mediaMessageUploaded", {
          threadId: activeThreadId,
          messageId: res._id,
        });
      } else {
        toast.error(res?.error || "Voice upload failed");
      }
    } catch (err) {
      console.error("Voice upload failed", err);
      toast.error("Voice upload failed");
    } finally {
      isUploadingVoiceRef.current = false;
      setUploading(false);
      setUploadType(null);
      setUploadProgress(0);
    }
  };

  const startRecording = async () => {
    if (
      isRecording ||
      voiceInteractionLockRef.current ||
      isUploadingVoiceRef.current ||
      !activeThreadId ||
      !activeUser?.id
    ) {
      return;
    }

    if (
      typeof window === "undefined" ||
      !navigator.mediaDevices?.getUserMedia ||
      typeof MediaRecorder === "undefined"
    ) {
      toast.error("Audio recording is not supported on this device");
      return;
    }

    try {
      voiceInteractionLockRef.current = true;

      if (navigator.permissions?.query) {
        const permission = await navigator.permissions.query({
          name: "microphone" as PermissionName,
        });

        if (permission.state === "denied") {
          toast.error("Microphone permission is blocked.");
          voiceInteractionLockRef.current = false;
          return;
        }
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordingStreamRef.current = stream;

      const mimeType = getSupportedAudioMimeType();
      const mediaRecorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      discardRecordingRef.current = false;
      recordingStartTimeRef.current = Date.now();

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onerror = () => {
        stopRecordingTracks();
        resetVoiceRecorder();
        toast.error("Recording failed");
      };

      mediaRecorder.onstop = async () => {
        const finalMimeType =
          mediaRecorder.mimeType || mimeType || "audio/webm";
        const duration = recordingStartTimeRef.current
          ? Date.now() - recordingStartTimeRef.current
          : 0;

        stopRecordingTracks();

        if (discardRecordingRef.current) {
          resetVoiceRecorder();
          return;
        }

        const extension = finalMimeType.includes("mp4")
          ? "mp4"
          : finalMimeType.includes("ogg")
            ? "ogg"
            : "webm";

        const audioBlob = new Blob(audioChunksRef.current, {
          type: finalMimeType,
        });

        if (audioBlob.size < 1000 || duration < 500) {
          resetVoiceRecorder();
          toast.error("Recording too short or no sound detected");
          return;
        }

        const file = new File(
          [audioBlob],
          `voice-message-${Date.now()}.${extension}`,
          {
            type: finalMimeType,
          },
        );

        resetVoiceRecorder();
        await uploadVoiceMessage(file);
      };

      mediaRecorder.start(250);
      setIsRecording(true);
    } catch (err: any) {
      stopRecordingTracks();
      resetVoiceRecorder();
      if (err.name === "NotAllowedError") {
        toast.error("Microphone permission denied");
      } else if (err.name === "NotFoundError") {
        toast.error("No microphone detected");
      } else {
        toast.error("Recording failed");
      }
    }
  };

  const stopRecording = (discard = false) => {
    const recorder = mediaRecorderRef.current;

    if (!recorder) {
      voiceInteractionLockRef.current = false;
      return;
    }

    discardRecordingRef.current = discard;

    if (recorder.state !== "inactive") {
      recorder.stop();
    } else {
      stopRecordingTracks();
      resetVoiceRecorder();
    }
  };

  const handleVoicePressStart = async (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    if ("touches" in event) {
      voiceTouchActiveRef.current = true;
    } else if (voiceTouchActiveRef.current) {
      return;
    }

    await startRecording();
  };

  const handleVoicePressEnd = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    if ("changedTouches" in event) {
      voiceTouchActiveRef.current = false;
    } else if (voiceTouchActiveRef.current) {
      return;
    }

    stopRecording();
  };

  useEffect(() => {
    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        discardRecordingRef.current = true;
        mediaRecorderRef.current.stop();
      }
      stopRecordingTracks();
      resetVoiceRecorder();
    };
  }, []);

  // ─── Helpers to collect all image URLs per message for PhotoProvider ───────

  /**
   * Returns all viewable image URLs in the current messages list.
   * Used to build the global images array for PhotoProvider so that
   * prev/next navigation works across ALL chat images.
   */
  const getAllChatImages = (): string[] => {
    const urls: string[] = [];
    messages.forEach((msg) => {
      // Direct chat image (type 3)
      if (msg.type === 3 && msg.mediaUrl) {
        urls.push(msg.mediaUrl);
      }
      // PPV delivered media photos
      if (
        msg.type === 5 &&
        msg.ppvRequestId?.status === "PAID" &&
        msg.ppvRequestId?.type === "PHOTO" &&
        msg.ppvRequestId?.deliveredMedia?.length
      ) {
        msg.ppvRequestId.deliveredMedia.forEach((url: string) => {
          urls.push(url);
        });
      }
      // PPV reference file photo (not paid)
      if (
        msg.type === 5 &&
        msg.ppvRequestId?.status !== "PAID" &&
        msg.ppvRequestId?.type === "PHOTO" &&
        msg.ppvRequestId?.referenceFile
      ) {
        urls.push(msg.ppvRequestId.referenceFile);
      }
    });
    return urls;
  };

  return (
    <>
      <PhotoProvider
        toolbarRender={({
          images,
          index,
          onIndexChange,
          onClose,
          rotate,
          onRotate,
          scale,
          onScale,
        }) => (
          <div className="toolbar_controller">
            <button
              className="btn_icons"
              onClick={() => index > 0 && onIndexChange(index - 1)}
              disabled={index === 0}
            >
              <ChevronLeft size={20} />
            </button>
            <span>
              {index + 1} / {images.length}
            </span>
            <button
              className="btn_icons"
              onClick={() =>
                index < images.length - 1 && onIndexChange(index + 1)
              }
              disabled={index === images.length - 1}
            >
              <ChevronRight size={20} />
            </button>
            <button className="btn_icons" onClick={() => onScale(scale + 0.2)}>
              <ZoomIn size={20} />
            </button>
            <button
              className="btn_icons"
              onClick={() => onScale(Math.max(0.5, scale - 0.2))}
            >
              <ZoomOut size={20} />
            </button>
            <button className="btn_icons" onClick={() => onRotate(rotate + 90)}>
              <RotateCw size={20} />
            </button>
            <button className="btn_icons" onClick={onClose}>
              {" "}
              <X size={20} />
            </button>
          </div>
        )}
      >
        <div className="moneyboy-2x-1x-layout-container">
          <div className="moneyboy-2x-1x-a-layout">
            <div className="msg-page-wrapper card">
              <div className="msg-page-container" msg-page-wrapper={true}>
                <SideBar
                  activeThreadId={activeThreadId}
                  onSelectChat={(thread: any) => {
                    setIsChatLoading(true);
                    dispatch(setActiveThread(thread.publicId));
                    router.replace(`/message?threadId=${thread.publicId}`);
                  }}
                />
                <div className="msg-chats-layout">
                  <div
                    className="msg-chats-rooms-container"
                    msg-chat-rooms-wrapper=""
                  >
                    <div
                      className="msg-chat-room-layout"
                      msg-chat-room=""
                      data-active=""
                    >
                      {!activeThreadId ? (
                        <div className="messages-empty">
                          <div className="messages-empty-card">
                            <div className="glow-ring"></div>
                            <div className="messages-empty-icon">
                              <MessageCircleMore size={32} color="#FFF" />
                              <span className="ping"></span>
                            </div>
                            <h3>Start a conversation</h3>
                            <p>
                              Select a creator from the left or discover new
                              ones to begin chatting.
                            </p>
                            <Link href={"/discover"}>
                              <button className="premium-btn active-down-effect">
                                <span>Find creators</span>
                              </button>
                            </Link>
                            <div className="floating-bubbles">
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                          </div>
                        </div>
                      ) : isChatLoading ? (
                        <div className="messages-empty">
                          <div className="messages-empty-card">
                            <div className="messages-empty-icon">
                              <Loader
                                size={28}
                                className="loader"
                                color="#FFF"
                              />
                            </div>
                            <h3>Loading chat</h3>
                            <p>
                              Please wait while we load the conversation
                              details.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="msg-chat-room-container">
                          {/* ── Header ── */}
                          <div className="chat-room-header-layout">
                            <div className="chat-room-header-container">
                              {/* Profile */}
                              <div className="chat-room-header-profile">
                                <div className="profile-card">
                                  <div
                                    className="profile-card__main"
                                    onClick={() => {
                                      if (!activeUser?.username) return;
                                      router.push(`/${activeUser.username}`);
                                    }}
                                  >
                                    <div className="profile-card__avatar-settings">
                                      <div className="profile-card__avatar">
                                        {activeUser?.profile ? (
                                          <img
                                            src={activeUser.profile}
                                            alt="Profile Avatar"
                                          />
                                        ) : (
                                          <NoProfileSvg />
                                        )}
                                      </div>
                                    </div>
                                    <div className="profile-card__info">
                                      <div className="profile-card__name-badge">
                                        <div className="profile-card__name">
                                          {activeUser?.displayName ||
                                            activeUser?.username ||
                                            ""}
                                        </div>
                                        <div className="profile-card__badge">
                                          <img
                                            src="/images/logo/profile-badge.png"
                                            alt="Profile Badge"
                                          />
                                        </div>
                                      </div>
                                      <div className="profile-card__username">
                                        @{activeUser?.username || ""}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="chat-room-header-btns">
                                <div
                                  className="btn-txt-gradient"
                                  onClick={() => {
                                    if (!activeUser?.username) return;
                                    router.push(`/${activeUser.username}`);
                                  }}
                                >
                                  <span>View Profile</span>
                                </div>

                                {/* More Options */}
                                <div className="rel-user-more-opts-wrapper">
                                  <button
                                    className="rel-user-more-opts-trigger-icon"
                                    aria-label="More options"
                                    onClick={toggleMenu}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="25"
                                      viewBox="0 0 24 25"
                                    >
                                      <path d="M5 10.5C3.9 10.5 3 11.4 3 12.5C3 13.6 3.9 14.5 5 14.5C6.1 14.5 7 13.6 7 12.5C7 11.4 6.1 10.5 5 10.5Z" />
                                      <path d="M12 10.5C10.9 10.5 10 11.4 10 12.5C10 13.6 10.9 14.5 12 14.5C13.1 14.5 14 13.6 14 12.5C14 11.4 13.1 10.5 12 10.5Z" />
                                      <path d="M19 10.5C17.9 10.5 17 11.4 17 12.5C17 13.6 17.9 14.5 19 14.5C20.1 14.5 21 13.6 21 12.5C21 11.4 20.1 10.5 19 10.5Z" />
                                    </svg>
                                  </button>

                                  {/* Popup */}
                                  {isOpen &&
                                    !showReportModal &&
                                    !showDeleteModal && (
                                      <div
                                        ref={dropdownRef}
                                        className="rel-users-more-opts-popup-wrapper"
                                        style={
                                          isMobile ? mobileStyle : desktopStyle
                                        }
                                      >
                                        <ChatFeatures
                                          threadPublicId={activeThreadId}
                                          onSearch={handleSearchChange}
                                          onReport={() =>
                                            setShowReportModal(true)
                                          }
                                          onDelete={() =>
                                            setShowDeleteModal(true)
                                          }
                                          onClose={() => setIsOpen(false)}
                                        />
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* ── Body ── */}
                          <div className="chat-room-body-layout">
                            {(isBlockedByYou || isBlockedByOther) && (
                              <div className="block_wrap">
                                <div className="icon block-icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                                      stroke="none"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M3.41016 22C3.41016 18.13 7.26015 15 12.0002 15C12.9602 15 13.8902 15.13 14.7602 15.37"
                                      stroke="none"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M22 18C22 18.32 21.96 18.63 21.88 18.93C21.79 19.33 21.63 19.72 21.42 20.06C20.73 21.22 19.46 22 18 22C16.97 22 16.04 21.61 15.34 20.97C15.04 20.71 14.78 20.4 14.58 20.06C14.21 19.46 14 18.75 14 18C14 16.92 14.43 15.93 15.13 15.21C15.86 14.46 16.88 14 18 14C19.18 14 20.25 14.51 20.97 15.33C21.61 16.04 22 16.98 22 18Z"
                                      stroke="none"
                                      strokeWidth="1.5"
                                      strokeMiterlimit="10"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M20.5 15.5001L15.5 20.5001"
                                      stroke="none"
                                      strokeWidth="1.5"
                                      strokeMiterlimit="10"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                                <span>
                                  {isBlockedByYou
                                    ? "You blocked this user"
                                    : "You cannot message this user"}
                                </span>
                              </div>
                            )}

                            <div
                              ref={chatBodyRef}
                              className="chat-room-body-container"
                            >
                              {messages.map((msg, index) => {
                                const currentDate = new Date(
                                  msg.createdAt,
                                ).toDateString();
                                const prevDate =
                                  index > 0
                                    ? new Date(
                                        messages[index - 1].createdAt,
                                      ).toDateString()
                                    : null;
                                const showDateDivider =
                                  currentDate !== prevDate;
                                const senderId =
                                  typeof msg.senderId === "object"
                                    ? msg.senderId._id
                                    : msg.senderId;
                                const isSender = senderId === session?.user?.id;
                                const isCreator =
                                  msg.ppvRequestId &&
                                  session?.user?.id ===
                                    (typeof msg.ppvRequestId.creatorId ===
                                    "object"
                                      ? msg.ppvRequestId.creatorId._id
                                      : msg.ppvRequestId.creatorId);

                                return (
                                  <React.Fragment key={msg._id}>
                                    {showDateDivider && (
                                      <div className="chat-date-divider">
                                        <span>
                                          {formatDateLabel(msg.createdAt)}
                                        </span>
                                      </div>
                                    )}

                                    <div
                                      ref={(el) => {
                                        messageRefs.current[msg._id] = el;
                                      }}
                                      className={`chat-msg-wrapper ${isSender ? "outcoming-message" : "incoming-message"}`}
                                    >
                                      <div className="chat-msg-profile">
                                        {typeof msg.senderId === "object" &&
                                        msg.senderId?.profile ? (
                                          <img
                                            src={msg.senderId.profile}
                                            alt="User"
                                          />
                                        ) : (
                                          <NoProfileSvg />
                                        )}
                                      </div>

                                      <div className="chat-msg-txt-wrapper">
                                        {/* ── TEXT (type 1) ── */}
                                        {msg.type === 1 && (
                                          <div className="chat-msg-txt">
                                            <p
                                              dangerouslySetInnerHTML={{
                                                __html: highlightText(
                                                  msg.message,
                                                  searchText,
                                                ),
                                              }}
                                            />
                                          </div>
                                        )}
                                        {msg.type === 3 && msg.mediaUrl && (
                                          <div className="chat-msg-image">
                                            <PhotoView src={msg.mediaUrl}>
                                              <img
                                                src={msg.mediaUrl}
                                                alt="chat-media"
                                                style={{ cursor: "zoom-in" }}
                                              />
                                            </PhotoView>
                                          </div>
                                        )}

                                        {/* ── VIDEO (type 2) ── */}
                                        {msg.type === 2 && msg.mediaUrl && (
                                          <div className="chat-msg-image">
                                            <Plyr
                                              source={{
                                                type: "video",
                                                sources: [
                                                  {
                                                    src: msg.mediaUrl,
                                                    type: "video/mp4",
                                                  },
                                                ],
                                              }}
                                              options={{
                                                controls: [
                                                  "play",
                                                  "progress",
                                                  "current-time",
                                                  "mute",
                                                  "volume",
                                                  "fullscreen",
                                                ],
                                              }}
                                            />
                                          </div>
                                        )}

                                        {/* ── AUDIO (type 4) ── */}
                                        {msg.type === 4 && msg.mediaUrl && (
                                          <div className="chat-msg-audio">
                                            <CustomAudioPlayer
                                              src={msg.mediaUrl}
                                            />
                                          </div>
                                        )}

                                        {/* ── Message meta (time + read receipt) ── */}
                                        <div className="chat-msg-details">
                                          <div className="chat-msg-time">
                                            <span>
                                              {new Date(
                                                msg.createdAt,
                                              ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                              })}
                                            </span>
                                          </div>
                                          {isSender && (
                                            <div className="chat-msg-check-icon">
                                              {msg.isRead ? (
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="16"
                                                  height="16"
                                                  viewBox="0 0 16 16"
                                                  fill="none"
                                                >
                                                  <path
                                                    d="M9.52585 5.53587L3.92585 11.0359C3.7856 11.1737 3.59685 11.2509 3.40023 11.2509C3.20361 11.2509 3.01485 11.1737 2.8746 11.0359L0.474602 8.67899C0.404304 8.60997 0.34829 8.52777 0.309758 8.4371C0.271226 8.34642 0.250931 8.24905 0.250031 8.15053C0.248215 7.95157 0.325511 7.76003 0.464915 7.61805C0.533941 7.54776 0.616137 7.49174 0.706811 7.45321C0.797485 7.41468 0.89486 7.39438 0.993377 7.39348C1.19234 7.39167 1.38388 7.46896 1.52585 7.60837L3.40085 9.44962L8.47523 4.46587C8.61712 4.32646 8.80858 4.24913 9.00748 4.25089C9.20639 4.25265 9.39645 4.33335 9.53585 4.47524C9.67526 4.61713 9.75258 4.80859 9.75083 5.0075C9.74907 5.2064 9.66837 5.39646 9.52648 5.53587H9.52585ZM15.5352 4.47337C15.4662 4.40283 15.3839 4.34662 15.293 4.30796C15.2022 4.2693 15.1046 4.24895 15.0059 4.24808C14.9072 4.24721 14.8093 4.26583 14.7178 4.30288C14.6263 4.33993 14.543 4.39468 14.4727 4.46399L9.40023 9.44962L8.90773 8.96587C8.76584 8.82646 8.57438 8.74913 8.37547 8.75089C8.17657 8.75265 7.98651 8.83335 7.8471 8.97524C7.7077 9.11713 7.63037 9.30859 7.63213 9.5075C7.63389 9.7064 7.71459 9.89646 7.85648 10.0359L8.8746 11.0359C9.01485 11.1737 9.20361 11.2509 9.40023 11.2509C9.59684 11.2509 9.7856 11.1737 9.92585 11.0359L15.5259 5.53587C15.5961 5.46684 15.6521 5.38465 15.6906 5.294C15.7291 5.20334 15.7493 5.10598 15.7502 5.0075C15.7511 4.90901 15.7325 4.81131 15.6957 4.71999C15.6588 4.62866 15.6043 4.5455 15.5352 4.47524V4.47337Z"
                                                    fill="none"
                                                  />
                                                </svg>
                                              ) : (
                                                <Check
                                                  size={14}
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth={2}
                                                  className="signal_check"
                                                />
                                              )}
                                            </div>
                                          )}
                                        </div>

                                        {/* ── PPV Request (type 5) ── */}
                                        {msg.type === 5 && msg.ppvRequestId && (
                                          <div className="ppvrequest_wrap">
                                            <button className="premium-btn active-down-effect ppvbtn">
                                              <span>PPV Request</span>
                                            </button>
                                            {/* STATUS MESSAGES */}
                                            {msg.ppvRequestId.status ===
                                              "REJECTED" && (
                                              <div className="warning_wrap danger">
                                                <CircleX size={20} /> PPV
                                                request rejected
                                              </div>
                                            )}

                                            {msg.ppvRequestId.status ===
                                              "ACCEPTED" && (
                                              <div className="warning_wrap success">
                                                <BadgeCheck size={20} /> Creator
                                                approved this request
                                              </div>
                                            )}

                                            {msg.ppvRequestId.status ===
                                              "PAID" && (
                                              <div className="warning_wrap success">
                                                <BadgeCheck size={20} /> PPV
                                                unlocked successfully
                                              </div>
                                            )}

                                            {/* UPLOAD BOX — CREATOR ONLY + PENDING */}
                                            {isCreator &&
                                              msg.ppvRequestId.status ===
                                                "PENDING" && (
                                                <div
                                                  className="upload-box"
                                                  onClick={() => {
                                                    if (
                                                      uploadingMap[
                                                        msg.ppvRequestId._id
                                                      ]
                                                    ) {
                                                      return;
                                                    }
                                                    document
                                                      .getElementById(
                                                        `upload-${msg.ppvRequestId._id}`,
                                                      )
                                                      ?.click();
                                                  }}
                                                >
                                                  <span className="text">
                                                    {uploadingMap[
                                                      msg.ppvRequestId._id
                                                    ]
                                                      ? `Uploading ${uploadProgressMap[msg.ppvRequestId._id] || 0}%`
                                                      : "Upload Media"}
                                                  </span>
                                                  <input
                                                    type="file"
                                                    multiple
                                                    hidden
                                                    accept={
                                                      msg.ppvRequestId.type ===
                                                      "PHOTO"
                                                        ? "image/*"
                                                        : msg.ppvRequestId
                                                              .type === "VIDEO"
                                                          ? "video/*"
                                                          : "image/*,video/*"
                                                    }
                                                    id={`upload-${msg.ppvRequestId._id}`}
                                                    disabled={
                                                      uploadingMap[
                                                        msg.ppvRequestId._id
                                                      ]
                                                    }
                                                    onChange={(e) => {
                                                      handleUploadPPVMedia(
                                                        msg.ppvRequestId._id,
                                                        e.target.files,
                                                        msg.ppvRequestId.type,
                                                      );
                                                      e.target.value = "";
                                                    }}
                                                  />
                                                </div>
                                              )}

                                            <div className="cont_wrap">
                                              <h3>Type</h3>
                                              <p>
                                                {msg.ppvRequestId.type.toLowerCase()}
                                              </p>
                                            </div>

                                            <div className="cont_wrap">
                                              <h3>Description</h3>
                                              <p>
                                                {msg.ppvRequestId.description}
                                              </p>
                                            </div>
                                            <div className="cont_wrap">
                                              <h3>
                                                {msg.ppvRequestId.status ===
                                                "PAID"
                                                  ? "Delivered Media"
                                                  : "Reference File"}
                                              </h3>

                                              <div className="upload-wrapper">
                                                {uploadingMap[
                                                  msg.ppvRequestId._id
                                                ] && (
                                                  <div className="img_wrap loadingtext">
                                                    {`Uploading ${uploadProgressMap[msg.ppvRequestId._id] || 0}%`
                                                      .split("")
                                                      .map((char, i) => (
                                                        <span
                                                          key={i}
                                                          style={{
                                                            animationDelay: `${(i + 1) * 0.1}s`,
                                                          }}
                                                        >
                                                          {char}
                                                        </span>
                                                      ))}
                                                  </div>
                                                )}
                                                {msg.ppvRequestId.status ===
                                                  "PAID" &&
                                                  msg.ppvRequestId.deliveredMedia?.map(
                                                    (
                                                      url: string,
                                                      i: number,
                                                    ) => (
                                                      <div
                                                        className="img_wrap"
                                                        key={i}
                                                      >
                                                        {msg.ppvRequestId
                                                          .type === "PHOTO" ? (
                                                          <PhotoView src={url}>
                                                            <img
                                                              src={url}
                                                              className="img-fluid upldimg"
                                                              alt="delivered"
                                                              style={{
                                                                cursor:
                                                                  "zoom-in",
                                                              }}
                                                            />
                                                          </PhotoView>
                                                        ) : (
                                                          <Plyr
                                                            source={{
                                                              type: "video",
                                                              sources: [
                                                                {
                                                                  src: url,
                                                                  type: "video/mp4",
                                                                },
                                                              ],
                                                            }}
                                                            options={{
                                                              controls: [
                                                                "play-large",
                                                                "play",
                                                                "progress",
                                                                "current-time",
                                                                "mute",
                                                                "volume",
                                                                "fullscreen",
                                                              ],
                                                            }}
                                                          />
                                                        )}
                                                      </div>
                                                    ),
                                                  )}

                                                {msg.ppvRequestId.status !==
                                                  "PAID" && (
                                                  <>
                                                    {msg.ppvRequestId
                                                      .referenceFile ? (
                                                      <>
                                                        {msg.ppvRequestId
                                                          .type === "PHOTO" && (
                                                          <div className="img_wrap">
                                                            <PhotoView
                                                              src={
                                                                msg.ppvRequestId
                                                                  .referenceFile
                                                              }
                                                            >
                                                              <img
                                                                src={
                                                                  msg
                                                                    .ppvRequestId
                                                                    .referenceFile
                                                                }
                                                                className="img-fluid upldimg"
                                                                alt="preview"
                                                                style={{
                                                                  cursor:
                                                                    "zoom-in",
                                                                }}
                                                              />
                                                            </PhotoView>
                                                          </div>
                                                        )}

                                                        {msg.ppvRequestId
                                                          .type === "VIDEO" && (
                                                          <div className="img_wrap">
                                                            <video
                                                              src={
                                                                msg.ppvRequestId
                                                                  .referenceFile
                                                              }
                                                              className="img-fluid upldimg"
                                                              controls
                                                            />
                                                          </div>
                                                        )}
                                                      </>
                                                    ) : (
                                                      /* No reference file placeholder */
                                                      <div className="noprofile">
                                                        <svg
                                                          width="40"
                                                          height="40"
                                                          viewBox="0 0 66 54"
                                                          fill="none"
                                                          xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                          <path
                                                            className="animate-m"
                                                            d="M65.4257 49.6477L64.1198 52.8674C64.0994 52.917 64.076 52.9665 64.0527 53.0132C63.6359 53.8294 62.6681 54.2083 61.8081 53.8848C61.7673 53.8731 61.7265 53.8556 61.6886 53.8381L60.2311 53.1764L57.9515 52.1416C57.0945 51.7509 56.3482 51.1446 55.8002 50.3779C48.1132 39.6156 42.1971 28.3066 38.0271 16.454C37.8551 16.1304 37.5287 15.9555 37.1993 15.9555C36.9631 15.9555 36.7241 16.0459 36.5375 16.2325L28.4395 24.3596C28.1684 24.6307 27.8099 24.7678 27.4542 24.7678C27.4076 24.7678 27.3609 24.7648 27.3143 24.7619C27.2239 24.7503 27.1307 24.7328 27.0432 24.7065C26.8217 24.6366 26.6118 24.5112 26.4427 24.3276C23.1676 20.8193 20.6053 17.1799 18.3097 15.7369C18.1698 15.6495 18.0153 15.6057 17.8608 15.6057C17.5634 15.6057 17.2719 15.7602 17.1029 16.0313C14.1572 20.7377 11.0702 24.8873 7.75721 28.1157C7.31121 28.5471 6.74277 28.8299 6.13061 28.9115L3.0013 29.3254L1.94022 29.4683L1.66912 29.5033C0.946189 29.5994 0.296133 29.0602 0.258237 28.3314L0.00754237 23.5493C-0.0274383 22.8701 0.191188 22.2025 0.610956 21.669C1.51171 20.5293 2.39789 19.3545 3.26512 18.152C5.90032 14.3304 9.52956 8.36475 13.1253 1.39631C13.548 0.498477 14.4283 0 15.3291 0C15.8479 0 16.3727 0.163246 16.8187 0.513052L27.3799 8.76557L39.285 0.521797C39.6931 0.206971 40.1711 0.0583046 40.6434 0.0583046C41.4683 0.0583046 42.2729 0.510134 42.6635 1.32052C50.16 18.2735 55.0282 34.2072 63.6378 47.3439C63.9584 47.8336 64.0197 48.4487 63.8039 48.9851L65.4257 49.6477Z"
                                                            fill="url(#paint0_linear_4470_53804)"
                                                          />
                                                          <defs>
                                                            <linearGradient
                                                              id="paint0_linear_4470_53804"
                                                              x1="0"
                                                              y1="27"
                                                              x2="66"
                                                              y2="27"
                                                              gradientUnits="userSpaceOnUse"
                                                            >
                                                              <stop stopColor="#FDAB0A" />
                                                              <stop
                                                                offset="0.4"
                                                                stopColor="#FECE26"
                                                              />
                                                              <stop
                                                                offset="1"
                                                                stopColor="#FE990B"
                                                              />
                                                            </linearGradient>
                                                          </defs>
                                                        </svg>
                                                      </div>
                                                    )}
                                                  </>
                                                )}
                                              </div>
                                            </div>

                                            {/* ACTIONS */}
                                            <div className="actions">
                                              <div>
                                                <p className="text-gradiant">
                                                  Amount
                                                </p>
                                                <button className="btn-txt-gradient">
                                                  <span>
                                                    ${msg.ppvRequestId.price}
                                                  </span>
                                                </button>
                                              </div>

                                              <div className="right">
                                                {/* CREATOR SIDE — PENDING */}
                                                {isCreator &&
                                                  msg.ppvRequestId.status ===
                                                    "PENDING" && (
                                                    <>
                                                      <button
                                                        className="btn-txt-gradient"
                                                        onClick={() => {
                                                          if (
                                                            !msg.ppvRequestId
                                                              .deliveredMedia
                                                              ?.length
                                                          ) {
                                                            showError(
                                                              "Please upload media first",
                                                            );
                                                            return;
                                                          }
                                                          handleAcceptPPV(
                                                            msg.ppvRequestId
                                                              ._id,
                                                          );
                                                        }}
                                                      >
                                                        <span>Accept</span>
                                                      </button>
                                                      <button
                                                        className="btn-txt-gradient"
                                                        onClick={() =>
                                                          handleRejectPPV(
                                                            msg.ppvRequestId
                                                              ._id,
                                                            "Not Interested",
                                                          )
                                                        }
                                                      >
                                                        <span>Decline</span>
                                                      </button>
                                                    </>
                                                  )}

                                                {/* CREATOR SIDE — MEDIA UPLOADED */}
                                                {isCreator &&
                                                  msg.ppvRequestId.status ===
                                                    "MEDIA_UPLOADED" && (
                                                    <button
                                                      className="btn-txt-gradient"
                                                      onClick={() =>
                                                        handleAcceptPPV(
                                                          msg.ppvRequestId._id,
                                                        )
                                                      }
                                                    >
                                                      <span>Send</span>
                                                    </button>
                                                  )}
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </React.Fragment>
                                );
                              })}

                              {/* Empty state */}
                              {messages.length === 0 && (
                                <div className="start-convo-wrapper">
                                  <div className="bg-gradient"></div>
                                  <div className="bg-bubble bubble1"></div>
                                  <div className="bg-bubble bubble2"></div>
                                  <div className="bg-bubble bubble3"></div>
                                  <div className="start-convo-card">
                                    <div className="start-icon">
                                      <MessageCircleMore size={26} />
                                    </div>
                                    <h2>Start the Conversation</h2>
                                    <p>
                                      Send your first message to{" "}
                                      <strong>
                                        {activeUser?.username || "user"}
                                      </strong>{" "}
                                      and kick things off.
                                    </p>
                                    <div className="start-actions">
                                      <button
                                        className="btn-primary"
                                        onClick={() =>
                                          textareaRef.current?.focus()
                                        }
                                      >
                                        Start chatting <Send size={22} />
                                      </button>
                                      <button
                                        className="hello-btn"
                                        onClick={() => {
                                          if (
                                            !activeThreadId ||
                                            !session?.user?.id ||
                                            !activeUser?.id
                                          )
                                            return;
                                          socket.emit("sendMessage", {
                                            threadId: activeThreadId,
                                            senderId: session.user.id,
                                            receiverId: activeUser.id,
                                            text: "👋 Hi there",
                                          });
                                        }}
                                      >
                                        👋 Say Hello
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Typing indicator */}
                              {isOtherUserTyping && (
                                <div className="chat-msg-typing-anim-elem">
                                  <div className="loading">
                                    <span className="loading__dot"></span>
                                    <span className="loading__dot"></span>
                                    <span className="loading__dot"></span>
                                  </div>
                                </div>
                              )}
                              {/* Scroll sentinel - always at the very bottom */}
                              <div
                                ref={messagesEndRef}
                                style={{ height: 1, flexShrink: 0 }}
                              />
                            </div>
                          </div>

                          {/* ── Footer ── */}
                          {messages.length > 0 &&
                            !isBlockedByOther &&
                            !isBlockedByYou && (
                              <div className="chat-room-footer-layout">
                                <div className="chat-room-footer-container">
                                  {/* File upload */}
                                  <div className="chat-file-upload-btn">
                                    <label>
                                      <input
                                        ref={fileInputRef}
                                        type="file"
                                        hidden
                                        accept="image/*,video/*"
                                        onChange={handleFileSelect}
                                        disabled={
                                          !activeThreadId || !activeUser?.id
                                        }
                                      />
                                      <span>
                                        {uploading ? (
                                          <span
                                            style={{
                                              display: "inline-flex",
                                              alignItems: "center",
                                              gap: "6px",
                                            }}
                                          >
                                            <Loader
                                              size={22}
                                              color="#ebebeb"
                                              className="loader imgupld"
                                            />
                                            <span
                                              style={{
                                                fontSize: "12px",
                                                lineHeight: 1,
                                              }}
                                            >
                                              {uploadType === "file"
                                                ? `${uploadProgress}%`
                                                : ""}
                                            </span>
                                          </span>
                                        ) : (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                          >
                                            <path
                                              d="M12.3297 12.1499L9.85969 14.6199C8.48969 15.9899 8.48969 18.1999 9.85969 19.5699C11.2297 20.9399 13.4397 20.9399 14.8097 19.5699L18.6997 15.6799C21.4297 12.9499 21.4297 8.50992 18.6997 5.77992C15.9697 3.04992 11.5297 3.04992 8.79969 5.77992L4.55969 10.0199C2.21969 12.3599 2.21969 16.1599 4.55969 18.5099"
                                              stroke="none"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                        )}
                                      </span>
                                    </label>
                                  </div>

                                  {/* Text input */}
                                  <div className="chat-msg-typing-input">
                                    <input
                                      ref={textareaRef}
                                      type="text"
                                      placeholder="Send a message..."
                                      value={newComment}
                                      onChange={(e) => {
                                        setNewComment(e.target.value);
                                        if (
                                          !activeThreadId ||
                                          !session?.user?.id
                                        )
                                          return;
                                        if (!isTypingRef.current) {
                                          socket.emit("typing", {
                                            threadId: activeThreadId,
                                            userId: session.user.id,
                                          });
                                          isTypingRef.current = true;
                                        }
                                        if (typingTimeoutRef.current) {
                                          clearTimeout(
                                            typingTimeoutRef.current,
                                          );
                                        }
                                        typingTimeoutRef.current = setTimeout(
                                          () => {
                                            socket.emit("stopTyping", {
                                              threadId: activeThreadId,
                                              userId: session.user.id,
                                            });
                                            isTypingRef.current = false;
                                          },
                                          1200,
                                        );
                                      }}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                          e.preventDefault();
                                          sendMessage();
                                        }
                                      }}
                                    />
                                  </div>

                                  {/* Action buttons */}
                                  <div className="chat-msg-action-btns">
                                    <button
                                      ref={emojiButtonRef}
                                      className="emojis-icon-btn"
                                      onClick={() =>
                                        setShowEmojiPicker((prev) => !prev)
                                      }
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="35"
                                        height="35"
                                        viewBox="0 0 35 35"
                                        fill="none"
                                      >
                                        <rect
                                          x="0.5"
                                          y="0.5"
                                          width="34"
                                          height="34"
                                          rx="17"
                                          stroke="none"
                                        />
                                        <path
                                          d="M15.1257 25.4173H19.8756C23.834 25.4173 25.4173 23.834 25.4173 19.8756V15.1257C25.4173 11.1673 23.834 9.58398 19.8756 9.58398H15.1257C11.1673 9.58398 9.58398 11.1673 9.58398 15.1257V19.8756C9.58398 23.834 11.1673 25.4173 15.1257 25.4173Z"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M20.2715 15.7188C20.9273 15.7188 21.459 15.1871 21.459 14.5312C21.459 13.8754 20.9273 13.3438 20.2715 13.3438C19.6156 13.3438 19.084 13.8754 19.084 14.5312C19.084 15.1871 19.6156 15.7188 20.2715 15.7188Z"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeMiterlimit="10"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M14.7285 15.7188C15.3844 15.7188 15.916 15.1871 15.916 14.5312C15.916 13.8754 15.3844 13.3438 14.7285 13.3438C14.0727 13.3438 13.541 13.8754 13.541 14.5312C13.541 15.1871 14.0727 15.7188 14.7285 15.7188Z"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeMiterlimit="10"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M14.65 18.5293H20.35C20.7458 18.5293 21.0625 18.846 21.0625 19.2418C21.0625 21.213 19.4713 22.8043 17.5 22.8043C15.5288 22.8043 13.9375 21.213 13.9375 19.2418C13.9375 18.846 14.2542 18.5293 14.65 18.5293Z"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeMiterlimit="10"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </button>

                                    {/* Voice recorder */}
                                    <button
                                      className={`voice-recorder-icon-btn ${isRecording ? "recording" : ""}`}
                                      type="button"
                                      onMouseDown={handleVoicePressStart}
                                      onMouseUp={handleVoicePressEnd}
                                      onMouseLeave={
                                        isRecording
                                          ? () => stopRecording()
                                          : undefined
                                      }
                                      onTouchStart={handleVoicePressStart}
                                      onTouchEnd={handleVoicePressEnd}
                                      onTouchCancel={() => stopRecording(true)}
                                      disabled={uploading}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="35"
                                        height="35"
                                        viewBox="0 0 35 35"
                                        fill="none"
                                      >
                                        <rect
                                          x="0.5"
                                          y="0.5"
                                          width="34"
                                          height="34"
                                          rx="17"
                                          stroke="none"
                                        />
                                        <path
                                          d="M11.4434 15.6387V16.9845C11.4434 20.3253 14.1588 23.0408 17.4996 23.0408C20.8404 23.0408 23.5559 20.3253 23.5559 16.9845V15.6387"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M17.5007 20.2715C19.2502 20.2715 20.6673 18.8544 20.6673 17.1048V12.7507C20.6673 11.0011 19.2502 9.58398 17.5007 9.58398C15.7511 9.58398 14.334 11.0011 14.334 12.7507V17.1048C14.334 18.8544 15.7511 20.2715 17.5007 20.2715Z"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M16.4004 13.0905C17.1129 12.8292 17.8887 12.8292 18.6012 13.0905"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M16.8672 14.7687C17.2868 14.6578 17.7222 14.6578 18.1418 14.7687"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M17.5 23.041V25.416"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </button>

                                    {/* Send button */}
                                    <button
                                      className="btn-txt-simple send-msg-btn"
                                      onClick={sendMessage}
                                    >
                                      <span>Send</span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path
                                          d="M7.39969 6.32015L15.8897 3.49015C19.6997 2.22015 21.7697 4.30015 20.5097 8.11015L17.6797 16.6002C15.7797 22.3102 12.6597 22.3102 10.7597 16.6002L9.91969 14.0802L7.39969 13.2402C1.68969 11.3402 1.68969 8.23015 7.39969 6.32015Z"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M10.1094 13.6505L13.6894 10.0605"
                                          stroke="none"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </button>

                                    {/* Emoji picker */}
                                    {showEmojiPicker && (
                                      <div
                                        ref={emojiRef}
                                        className="emoji-picker-wrapper"
                                      >
                                        <EmojiPicker
                                          onEmojiClick={onEmojiClick}
                                          autoFocusSearch={false}
                                          skinTonesDisabled
                                          previewConfig={{ showPreview: false }}
                                          height={360}
                                          width={340}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PhotoProvider>

      {/* ── Report Modal ── */}
      {showReportModal && (
        <div
          className="modal show"
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-modal-title"
        >
          <form
            className="modal-wrap rdcnvrstn-modal"
            onSubmit={handleSubmitReport}
          >
            <button
              type="button"
              className="close-btn"
              onClick={() => setShowReportModal(false)}
            >
              <CgClose size={22} />
            </button>
            <h3 className="title">Report Conversation</h3>
            <p className="modal-subtitle">
              Help us understand the issue. Your report will remain
              confidential.
            </p>
            <div className="input-wrap">
              <label>
                Reason <span>*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Tell us what happened..."
                name="message"
                maxLength={300}
                value={reportMessage}
                onChange={(e) => setReportMessage(e.target.value)}
              />
              <label className="right">{reportMessage.length}/300</label>
            </div>
            <div className="actions">
              <button
                className="btn-danger active-down-effect"
                type="button"
                onClick={() => setShowReportModal(false)}
              >
                <span>Cancel</span>
              </button>
              <button className="premium-btn active-down-effect" type="submit">
                <span>Submit</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Delete Modal ── */}
      {showDeleteModal && (
        <div
          className="modal show"
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-modal-title"
        >
          <div className="modal-wrap rdcnvrstn-modal">
            <button
              type="button"
              className="close-btn"
              onClick={() => setShowDeleteModal(false)}
            >
              <CgClose size={22} />
            </button>
            <h3 className="title">Delete Conversation</h3>
            <p className="modal-subtitle">
              This will permanently delete the conversation and cannot be
              undone.
            </p>
            <div className="actions">
              <button
                className="btn-danger active-down-effect"
                type="button"
                onClick={() => setShowDeleteModal(false)}
              >
                <span>Cancel</span>
              </button>
              <button
                className="premium-btn active-down-effect"
                type="button"
                onClick={handleDelete}
              >
                <span>Submit</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessagePage;
