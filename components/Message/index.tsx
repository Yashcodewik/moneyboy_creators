"use client";
import React, { useEffect, useRef, useState } from "react";
import SideBar from "./SideBar";
import { Smile, Mic, CircleX, BadgeCheck, MessageCircleMore, Loader, Link2 } from "lucide-react";
import "@/public/styles/small-components/small-components.css";
import { useDeviceType } from "@/hooks/useDeviceType";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useDecryptedSession } from "@/libs/useDecryptedSession";
import socket from "@/libs/socket";
import { apiPost, apiPostWithMultiForm, getApi, getApiByParams } from "@/utils/endpoints/common";
import { API_MESSAGE_CHAT, API_MESSAGE_CHAT_UPLOAD_MEDIA } from "@/utils/api/APIConstant";
import { useRouter, useSearchParams } from "next/navigation";
import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";
import CustomSelect from "../CustomSelect";
import toast from "react-hot-toast";
import ChatFetures from "./ChatFeatures";
import ChatFeatures from "./ChatFeatures";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const MessagePage = () => {
  const [activeChat, setActiveChat] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { session } = useDecryptedSession();
  const [messages, setMessages] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const threadPublicIdFromUrl = searchParams.get("threadId");
  const [activeUser, setActiveUser] = useState<any>(null);
  const [newComment, setNewComment] = useState("");

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLInputElement | null>(null);
  const emojiRef = useRef<HTMLDivElement | null>(null);
  const emojiButtonRef = useRef<HTMLButtonElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTypingRef = useRef(false);
  const [searchText, setSearchText] = useState("");
  const [searchedMessages, setSearchedMessages] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const [showDeclineSelect, setShowDeclineSelect] = useState(false);
  const router = useRouter();

  const isMobile = useDeviceType();
  useEffect(() => {
    console.log("ACTIVE CHAT:", activeChat);
    console.log("ACTIVE USER:", activeUser);
  }, [activeChat, activeUser]);

  // ✅ LOG: Socket connection
  useEffect(() => {
    console.log("🔌 Socket connected:", socket.connected);
    console.log("🔌 Socket ID:", socket.id);

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

  socket.emit("heartbeat", session.user.id);

  const interval = setInterval(() => {
    socket.emit("heartbeat", session.user.id);
  }, 5000);

  return () => clearInterval(interval);
}, [session?.user?.id]);

  useEffect(() => {
    const handler = (message: any) => {
      console.log("📨 NEW MESSAGE RECEIVED:", message);

      setMessages(prev => {
        // ✅ Remove any temp message from the same sender with similar timestamp
        const withoutTemp = prev.filter(m =>
          !m._id.toString().startsWith('temp-') ||
          m.senderId._id !== message.senderId._id
        );

        // ✅ Check if real message already exists
        const exists = withoutTemp.some(m => m._id === message._id);

        if (exists) {
          console.log("⚠️ Message already exists, skipping");
          return prev;
        }

        console.log("✅ Adding new message to state");
        return [...withoutTemp, message];
      });
    };

    socket.on("newMessage", handler);

    return () => {
      socket.off("newMessage", handler);
    };
  }, []);

useEffect(() => {
  const handler = ({ readerId }: any) => {
    if (readerId === session?.user?.id) return;

    setMessages(prev =>
      prev.map(msg => {
        const senderId =
          typeof msg.senderId === "object"
            ? msg.senderId._id
            : msg.senderId;

        if (senderId === session?.user?.id) {
          return { ...msg, isRead: true };
        }
        return msg;
      })
    );
  };

  socket.on("messagesRead", handler);

  return () => {
    socket.off("messagesRead", handler); 
  };
}, [session?.user?.id]);


  useEffect(() => {
    if (!threadPublicIdFromUrl) return;

   setActiveChat((prev: any) => {
  if (prev?.publicId === threadPublicIdFromUrl) return prev;
  return { publicId: threadPublicIdFromUrl };
});

  }, [threadPublicIdFromUrl]);

  useEffect(() => {
    if (!activeChat?.publicId || !session?.user?.id) return;

    socket.emit("markRead", {
      threadId: activeChat.publicId,
      userId: session.user.id,
    });
  }, [activeChat?.publicId, session?.user?.id]);

  const queryClient = useQueryClient();
    // ✅ Fetch messages when chat changes

  const { data: chatData,refetch, isLoading } = useQuery({
  queryKey: ["chatMessages", activeChat?.publicId],
  queryFn: async () => {
    if (!activeChat?.publicId) return [];

    const res = await getApi({  
      url: API_MESSAGE_CHAT,
      page: 1,
      rowsPerPage: 50,
      searchText: activeChat.publicId,
    });

    return res?.data || [];
  },
  enabled: !!activeChat?.publicId,
});
  useEffect(() => {
    if (chatData) {
      setMessages(chatData);
    }
  }, [chatData]);


  // ✅ Fetch thread details (OTHER USER info)
  useEffect(() => {
  if (!chatBodyRef.current) return;

  chatBodyRef.current.scrollTop =
    chatBodyRef.current.scrollHeight;
}, [messages]);


  useEffect(() => {
    if (!activeChat?.publicId) return;

    (async () => {
      try {
        const res = await getApiByParams({
          url: "/messages/thread",
          params: activeChat.publicId,
        });

        console.log("THREAD DETAILS:", res);
        setActiveUser(res?.user || null);
      } catch (err) {
        console.error("THREAD DETAILS ERROR:", err);
      }
    })();
  }, [activeChat?.publicId]);

useEffect(() => {
  const handleTyping = ({ threadId, userId }: any) => {
    if (
      threadId === activeChat?.publicId &&
      userId !== session?.user?.id
    ) {
      setIsOtherUserTyping(true);
    }
  };

  const handleStopTyping = ({ threadId, userId }: any) => {
    if (
      threadId === activeChat?.publicId &&
      userId !== session?.user?.id
    ) {
      setIsOtherUserTyping(false);
    }
  };

  socket.on("userTyping", handleTyping);
  socket.on("userStopTyping", handleStopTyping);

  return () => {
    socket.off("userTyping", handleTyping);
    socket.off("userStopTyping", handleStopTyping);
  };
}, [activeChat?.publicId, session?.user?.id]);


  // ✅ Join thread room
  useEffect(() => {
    if (!activeChat?.publicId) {
      console.log("⚠️ No active chat to join");
      return;
    }

    console.log("🚪 Joining thread room:", activeChat.publicId);
    socket.emit("joinThread", activeChat.publicId);


  }, [activeChat?.publicId]);

  // ✅ Connect user to socket
  useEffect(() => {
    if (!session?.user?.id) {
      console.error("❌ No userId in session");
      return;
    }

    const userId = session.user.id;
    console.log("🔗 Connecting user to socket:", userId);

    socket.emit("connectUser", userId);

    socket.on("connectListener", (data) => {
      console.log("✅ User connected. Socket ID:", data.socketId);
    });

    return () => {
      socket.off("connectListener");
    };
  }, [session]);

  // ✅ FIXED: Send message with detailed logging
  const sendMessage = () => {
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📤 ATTEMPTING TO SEND MESSAGE");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━");

    console.log("📝 Message text:", newComment);
    console.log("🔗 Thread ID:", activeChat?.threadId);
    console.log("👤 Sender ID:", session?.user?.id);
    console.log("👥 Receiver ID:", activeUser?._id);

    if (!newComment.trim()) {
      console.error("❌ Message is empty");
      return;
    }

    if (!activeChat?.publicId || !session?.user?.id || !activeUser?._id) {
      console.error("❌ Missing required data");
      return;
    }

    if (!socket.connected) {
      console.error("❌ Socket not connected");
      return;
    }
    socket.emit("stopTyping", {
      threadId: activeChat.publicId,
      userId: session.user.id,
    });
    isTypingRef.current = false;

    const payload = {
      threadId: activeChat.publicId,
      senderId: session.user.id,
      receiverId: activeUser._id,
      text: newComment,
    };

    console.log("📤 Sending payload:", payload);

    // ✅ OPTIMISTIC UPDATE: Add message immediately to UI
    const tempMessage = {
      _id: `temp-${Date.now()}`, // Temporary ID
      senderId: {
        _id: session.user.id,
        userName: session.user.userName,
        displayName: session.user.displayName,
        profile: session.user.profile,
      },
      receiverId: activeUser._id,
      message: newComment,
      createdAt: new Date().toISOString(),
      isRead: false,
      type: 1,
      isPending: true, // ✅ Mark as pending
    };

    setMessages(prev => [...prev, tempMessage]);

    socket.emit("sendMessage", payload);

    console.log("✅ Message emitted to socket");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━");

    setNewComment("");
  };

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
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

    setShowEmojiPicker(false);
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const overlay = document.querySelector(".mobile-popup-overlay");
    if (!overlay) return;

    if (isOpen) {
      overlay.classList.add("active");
    } else {
      overlay.classList.remove("active");
    }

    return () => overlay.classList.remove("active");
  }, [isOpen, isMobile]);

const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

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

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("threadId", activeChat.publicId);
    formData.append("receiverId", activeUser._id);

    const res = await apiPostWithMultiForm({
      url: API_MESSAGE_CHAT_UPLOAD_MEDIA,
      values: formData,
    });

    if (!res || res.error) {
      toast.error(res?.error || "Upload failed");
    }

    socket.emit("mediaMessageUploaded", {
      threadId: activeChat.publicId,
      messageId: res._id,
    });

  } catch (error) {
    toast.error("Upload failed");
  } finally {
    setUploading(false);
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

  setIsSearching(true);

  const res = await getApi({
    url: `/messages/thread/search/${activeChat.publicId}`,
    page: 1,
    rowsPerPage: 50,
    searchText: value,
  });

  setSearchedMessages(res?.data || []);
  setIsSearching(false);
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
    ">$1</span>`
  );
};

const handleAcceptPPV = async (ppvId: string) => {
  await apiPost({
    url: `subscription/accept/${ppvId}`,
    values: {},
  });

  refetch();
};

const handleUploadPPVMedia = async (ppvId: string, files: FileList | null) => {
  if (!files) return;

  const formData = new FormData();

  Array.from(files).forEach((file) => {
    formData.append("files", file);
  });

  try {
    await apiPostWithMultiForm({
      url: `subscription/upload-media/${ppvId}`,
      values: formData,
    });

    toast.success("Media uploaded");

    // Refresh chat
    refetch();
  } catch (err) {
    toast.error("Upload failed");
  }
};

const handleRejectPPV = async (ppvId: string, reason: string) => {
  try {
    await apiPost({
      url: `subscription/reject/${ppvId}`,
      values: { reason },
    });

    toast.success("PPV Rejected");

    refetch();
  } catch (err) {
    toast.error("Failed");
  }
};

const handlePayPPV = async (ppvId: string) => {
  try {
    await apiPost({
      url: `subscription/pay/${ppvId}`,
      values: {},
    });

    toast.success("Payment successful");
    refetch();
  } catch (err) {
    toast.error("Payment failed");
  }
};

  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout">
        <div className="msg-page-wrapper card">
            <div className="msg-page-container" msg-page-wrapper={true}>
              <SideBar
                onSelectChat={(thread: any) => {
                  if (!thread?.publicId) return; // 🔥 IMPORTANT
                  setActiveChat(thread);
                }}
              />
              <div className="msg-chats-layout">
                <div className="msg-chats-rooms-container" msg-chat-rooms-wrapper="">
                  <div className="msg-chat-room-layout" msg-chat-room="" data-active="">
                    {!activeChat?.publicId ? (
                      <div className="messages-empty">
                      <div className="messages-empty-card">
                        <div className="glow-ring"></div>
                        <div className="messages-empty-icon"><MessageCircleMore size={32} color="#FFF" /><span className="ping"></span></div>
                        <h3>Start a conversation</h3>
                        <p>Select a creator from the left or discover new ones to begin chatting.</p>
                        <Link href={"/discover"}>
                        <button className="premium-btn active-down-effect" ><span>Find creators</span></button>
                        </Link>
                        <div className="floating-bubbles">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                    ) : (
                          <div className="msg-chat-room-container">
                            <div className="chat-room-header-layout">
                              <div className="chat-room-header-container">
                                {/* Profile */}
                                <div className="chat-room-header-profile">
                                  <div className="profile-card">
                                    <div className="profile-card__main">
                                      <div className="profile-card__avatar-settings">
                                        <div className="profile-card__avatar">
                                          <img src={activeUser?.profile || "/images/profile-avatars/profile-avatar-27.jpg"} alt="Profile Avatar" />
                                        </div>
                                      </div>
                                      <div className="profile-card__info">
                                        <div className="profile-card__name-badge">
                                          <div className="profile-card__name">{activeUser?.displayName || activeUser?.userName || ""}</div>
                                          <div className="profile-card__badge">
                                            <img src="/images/logo/profile-badge.png" alt="Profile Badge" />
                                          </div>
                                        </div>
                                        <div className="profile-card__username">@{activeUser?.userName || ""}</div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* Actions */}
                                <div className="chat-room-header-btns">
                                  <div 
                                  className="btn-txt-gradient"
                                  onClick={() => {
                                    if (!activeUser?.publicId && !activeUser?._id) return;

                                    // Prefer publicId if available
                                    const profileId = activeUser?.publicId || activeUser?._id;

                                    router.push(`/profile/${profileId}`);
                                  }}  
                                  ><span>View Profile</span></div>
                                  {/* More Options */}
                                  <div className="rel-user-more-opts-wrapper">
                                    <button className="rel-user-more-opts-trigger-icon" aria-label="More options" onClick={toggleMenu}>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25">
                                        <path d="M5 10.5C3.9 10.5 3 11.4 3 12.5C3 13.6 3.9 14.5 5 14.5C6.1 14.5 7 13.6 7 12.5C7 11.4 6.1 10.5 5 10.5Z" />
                                        <path d="M12 10.5C10.9 10.5 10 11.4 10 12.5C10 13.6 10.9 14.5 12 14.5C13.1 14.5 14 13.6 14 12.5C14 11.4 13.1 10.5 12 10.5Z" />
                                        <path d="M19 10.5C17.9 10.5 17 11.4 17 12.5C17 13.6 17.9 14.5 19 14.5C20.1 14.5 21 13.6 21 12.5C21 11.4 20.1 10.5 19 10.5Z" />
                                      </svg>
                                    </button>
                                    {/* Popup */}
                                    {isOpen && (
                                      <div ref={dropdownRef} className="rel-users-more-opts-popup-wrapper" style={isMobile ? mobileStyle : desktopStyle}>
                                        <ChatFeatures threadPublicId={activeChat.publicId} onSearch={handleSearchChange}/>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="chat-room-body-layout">
                              <div 
                              ref={chatBodyRef}
                              className="chat-room-body-container">

                                <div className="chat-date-divider">
                                  <span>19 August</span>
                                </div>
                                {messages.map((msg) => {
                                  const senderId =
                                    typeof msg.senderId === "object"
                                      ? msg.senderId._id
                                      : msg.senderId;

                                  const isSender = senderId === session?.user?.id;
                                 const isCreator =
                                  msg.ppvRequestId &&
                                  session?.user?.id ===
                                    (typeof msg.ppvRequestId.creatorId === "object"
                                      ? msg.ppvRequestId.creatorId._id
                                      : msg.ppvRequestId.creatorId);
                                  return (
                                    <div
                                      key={msg._id}
                                      className={`chat-msg-wrapper ${isSender ? "outcoming-message" : "incoming-message"
                                        }`}
                                    >
                                      <div className="chat-msg-profile">
                                        <img
                                          src={
                                            typeof msg.senderId === "object"
                                              ? msg.senderId.profile
                                              : "/images/profile-avatars/profile-avatar-27.jpg"
                                          }
                                          alt="#"
                                        />
                                      </div>

                                      <div className="chat-msg-txt-wrapper">
                                        {/* TEXT */}
                                        {msg.type === 1 && (
                                          <div className="chat-msg-txt">
                                           <p
                                            dangerouslySetInnerHTML={{
                                              __html: highlightText(msg.message, searchText),
                                            }}
                                          />

                                          </div>
                                        )}

                                        {/* IMAGE */}
                                        {msg.type === 3 && (
                                          <div className="chat-msg-image">
                                            <img src={msg.mediaUrl} alt="chat-media" />
                                          </div>
                                        )}

                                        {/* VIDEO */}
                                        {msg.type === 2 && (
                                          <div className="chat-msg-image">
                                            <Plyr
                                              source={{
                                                type: "video",
                                                sources: [{ src: msg.mediaUrl, type: "video/mp4" }],
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

                                        <div className="chat-msg-details">
                                          <div className="chat-msg-time">
                                            <span>
                                              {new Date(msg.createdAt).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                              })}
                                            </span>
                                          </div>
                                          {isSender && (
                                            <div className="chat-msg-check-icon">
                                              {msg.isRead ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                  <path d="M9.52585 5.53587L3.92585 11.0359C3.7856 11.1737 3.59685 11.2509 3.40023 11.2509C3.20361 11.2509 3.01485 11.1737 2.8746 11.0359L0.474602 8.67899C0.404304 8.60997 0.34829 8.52777 0.309758 8.4371C0.271226 8.34642 0.250931 8.24905 0.250031 8.15053C0.248215 7.95157 0.325511 7.76003 0.464915 7.61805C0.533941 7.54776 0.616137 7.49174 0.706811 7.45321C0.797485 7.41468 0.89486 7.39438 0.993377 7.39348C1.19234 7.39167 1.38388 7.46896 1.52585 7.60837L3.40085 9.44962L8.47523 4.46587C8.61712 4.32646 8.80858 4.24913 9.00748 4.25089C9.20639 4.25265 9.39645 4.33335 9.53585 4.47524C9.67526 4.61713 9.75258 4.80859 9.75083 5.0075C9.74907 5.2064 9.66837 5.39646 9.52648 5.53587H9.52585ZM15.5352 4.47337C15.4662 4.40283 15.3839 4.34662 15.293 4.30796C15.2022 4.2693 15.1046 4.24895 15.0059 4.24808C14.9072 4.24721 14.8093 4.26583 14.7178 4.30288C14.6263 4.33993 14.543 4.39468 14.4727 4.46399L9.40023 9.44962L8.90773 8.96587C8.76584 8.82646 8.57438 8.74913 8.37547 8.75089C8.17657 8.75265 7.98651 8.83335 7.8471 8.97524C7.7077 9.11713 7.63037 9.30859 7.63213 9.5075C7.63389 9.7064 7.71459 9.89646 7.85648 10.0359L8.8746 11.0359C9.01485 11.1737 9.20361 11.2509 9.40023 11.2509C9.59684 11.2509 9.7856 11.1737 9.92585 11.0359L15.5259 5.53587C15.5961 5.46684 15.6521 5.38465 15.6906 5.294C15.7291 5.20334 15.7493 5.10598 15.7502 5.0075C15.7511 4.90901 15.7325 4.81131 15.6957 4.71999C15.6588 4.62866 15.6043 4.5455 15.5352 4.47524V4.47337Z" fill="none"></path>
                                                </svg>
                                              ) : (
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="16"
                                                  height="16"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  strokeWidth="2"
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                >
                                                  <path d="M18 6L9 15l-3-3" />
                                                </svg>
                                              )}
                                            </div>
                                          )}
                                          
                                        </div>
                                        {msg.type === 5 && msg.ppvRequestId && (
                                          <div className="ppvrequest_wrap">

                                            <button className="premium-btn active-down-effect ppvbtn">
                                              <span>PPV Request</span>
                                            </button>

                                            {/* STATUS MESSAGES */}

                                            {/* REJECTED */}
                                            {msg.ppvRequestId.status === "REJECTED" && (
                                              <div className="warning_wrap danger">
                                                <CircleX size={20}/> PPV request rejected
                                              </div>
                                            )}

                                            {/* ACCEPTED (before final unlock) */}
                                            {msg.ppvRequestId.status === "ACCEPTED" && (
                                              <div className="warning_wrap success">
                                                <BadgeCheck size={20}/> Creator approved this request
                                              </div>
                                            )}

                                            {/* PAID (FINAL STATE) */}
                                            {msg.ppvRequestId.status === "PAID" && (
                                              <div className="warning_wrap success">
                                                <BadgeCheck size={20}/> PPV unlocked successfully
                                              </div>
                                            )}

                                            {/* UPLOAD BOX — CREATOR ONLY + PENDING */}
                                            {isCreator && msg.ppvRequestId.status === "PENDING" && (
                                              <div
                                                className="upload-box"
                                                onClick={() =>
                                                  document.getElementById(`upload-${msg.ppvRequestId._id}`)?.click()
                                                }
                                              >
                                                <span className="text">Upload Media</span>

                                                <input
                                                  type="file"
                                                  multiple
                                                  hidden
                                                  id={`upload-${msg.ppvRequestId._id}`}
                                                  onChange={(e) =>
                                                    handleUploadPPVMedia(
                                                      msg.ppvRequestId._id,
                                                      e.target.files
                                                    )
                                                  }
                                                />
                                              </div>
                                            )}

                                            {/* CONTENT INFO */}

                                            <div className="cont_wrap">
                                              <h3>Type</h3>
                                              <p>{msg.ppvRequestId.type.toLowerCase()}</p>
                                            </div>

                                            <div className="cont_wrap">
                                              <h3>Description</h3>
                                              <p>{msg.ppvRequestId.description}</p>
                                            </div>

                                            {/* MEDIA SECTION */}
                                            <div className="cont_wrap">
                                              <h3>
                                                {msg.ppvRequestId.status === "PAID"
                                                  ? "Delivered Media"
                                                  : "Reference File"}
                                              </h3>

                                              <div className="upload-wrapper">

                                                {/* 🔥 AFTER PAID → SHOW DELIVERED MEDIA */}
                                                {msg.ppvRequestId.status === "PAID" &&
                                                  msg.ppvRequestId.deliveredMedia?.map(
                                                    (url: string, index: number) => (
                                                      <div className="img_wrap" key={index}>
                                                        {msg.ppvRequestId.type === "PHOTO" ? (
                                                          <img
                                                            src={url}
                                                            className="img-fluid upldimg"
                                                            alt="delivered"
                                                            onClick={() => window.open(url, "_blank")}
                                                          />
                                                        ) : (
                                                          <video
                                                            src={url}
                                                            className="img-fluid upldimg"
                                                            controls
                                                          />
                                                        )}
                                                      </div>
                                                    )
                                                  )}

                                                {/* BEFORE PAID → SHOW REFERENCE FILE */}
                                                {msg.ppvRequestId.status !== "PAID" && (
                                                  <>
                                                    {msg.ppvRequestId.type === "PHOTO" && (
                                                      <div className="img_wrap">
                                                        <img
                                                          src={msg.ppvRequestId.referenceFile}
                                                          className="img-fluid upldimg"
                                                          alt="preview"
                                                        />
                                                      </div>
                                                    )}

                                                    {msg.ppvRequestId.type === "VIDEO" && (
                                                      <div className="img_wrap">
                                                        <video
                                                          src={msg.ppvRequestId.referenceFile}
                                                          className="img-fluid upldimg"
                                                          controls
                                                        />
                                                      </div>
                                                    )}
                                                  </>
                                                )}

                                              </div>
                                            </div>

                                            {/* ACTIONS */}
                                            <div className="actions">
                                              <div>
                                                <p className="text-gradiant">Amount</p>
                                                <button className="btn-txt-gradient">
                                                  <span>${msg.ppvRequestId.price}</span>
                                                </button>
                                              </div>

                                              <div className="right">

                                                {/* CREATOR SIDE - PENDING */}
                                                {isCreator && msg.ppvRequestId.status === "PENDING" && (
                                                  <>
                                                    <button
                                                      className="btn-txt-gradient"
                                                      onClick={() =>
                                                        handleRejectPPV(
                                                          msg.ppvRequestId._id,
                                                          "Not Interested"
                                                        )
                                                      }
                                                    >
                                                      <span>Decline</span>
                                                    </button>
                                                  </>
                                                )}

                                                {/* CREATOR SIDE - MEDIA UPLOADED → APPROVE */}
                                                {isCreator &&
                                                  msg.ppvRequestId.status === "MEDIA_UPLOADED" && (
                                                    <button
                                                      className="btn-txt-gradient"
                                                      onClick={() =>
                                                        handleAcceptPPV(msg.ppvRequestId._id)
                                                      }
                                                    >
                                                      <span>Approve</span>
                                                    </button>
                                                  )}

                                              </div>
                                            </div>

                                          </div>
                                        )}
                                    </div>
                                  </div>
                                    
                                  );
                                })}   
                              {isOtherUserTyping && (
                                <div className="chat-msg-typing-anim-elem">
                                  <div className="loading">
                                    <span className="loading__dot"></span>
                                    <span className="loading__dot"></span>
                                    <span className="loading__dot"></span>
                                  </div>
                                </div>
                              )}
                              </div>
                            </div>

                            <div className="chat-room-footer-layout">
                              <div className="chat-room-footer-container">
                                <div className="chat-file-upload-btn">
                                  <label>
                                    <input
                                      ref={fileInputRef}
                                      type="file"
                                      hidden
                                      accept="image/*,video/*"
                                      onChange={handleFileSelect}
                                      disabled={uploading || !activeChat?.threadId || !activeUser?._id}
                                    />
                                    <span>
                                      {uploading ? (
                                        <Loader size={22} color="#ebebeb" className="loader imgupld"/>
                                      ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                          <path d="M12.3297 12.1499L9.85969 14.6199C8.48969 15.9899 8.48969 18.1999 9.85969 19.5699C11.2297 20.9399 13.4397 20.9399 14.8097 19.5699L18.6997 15.6799C21.4297 12.9499 21.4297 8.50992 18.6997 5.77992C15.9697 3.04992 11.5297 3.04992 8.79969 5.77992L4.55969 10.0199C2.21969 12.3599 2.21969 16.1599 4.55969 18.5099" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                        </svg>
                                      )}
                                    </span>
                                  </label>
                                </div>
                                <div className="chat-msg-typing-input">
                                  <input
                                  ref={textareaRef}
                                  type="text"
                                  placeholder="Send a message..."
                                  value={newComment}
                                  onChange={(e) => {
                                    setNewComment(e.target.value);

                                    if (!activeChat?.publicId || !session?.user?.id) return;

                                    // 🔥 Emit typing once
                                    if (!isTypingRef.current) {
                                      socket.emit("typing", {
                                        threadId: activeChat.publicId,
                                        userId: session.user.id,
                                      });
                                      isTypingRef.current = true;
                                    }

                                    // 🔥 Reset stop-typing timer
                                    if (typingTimeoutRef.current) {
                                      clearTimeout(typingTimeoutRef.current);
                                    }

                                    typingTimeoutRef.current = setTimeout(() => {
                                      socket.emit("stopTyping", {
                                        threadId: activeChat.publicId,
                                        userId: session.user.id,
                                      });
                                      isTypingRef.current = false;
                                    }, 1200); // ⏱️ idle delay
                                  }}
                                />
                                </div>
                                <div className="chat-msg-action-btns">
                                  <button
                                    ref={emojiButtonRef}
                                    className="emojis-icon-btn"
                                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                                      <rect x="0.5" y="0.5" width="34" height="34" rx="17" stroke="none"></rect>
                                      <path d="M15.1257 25.4173H19.8756C23.834 25.4173 25.4173 23.834 25.4173 19.8756V15.1257C25.4173 11.1673 23.834 9.58398 19.8756 9.58398H15.1257C11.1673 9.58398 9.58398 11.1673 9.58398 15.1257V19.8756C9.58398 23.834 11.1673 25.4173 15.1257 25.4173Z" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                      <path d="M20.2715 15.7188C20.9273 15.7188 21.459 15.1871 21.459 14.5312C21.459 13.8754 20.9273 13.3438 20.2715 13.3438C19.6156 13.3438 19.084 13.8754 19.084 14.5312C19.084 15.1871 19.6156 15.7188 20.2715 15.7188Z" stroke="none" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                      <path d="M14.7285 15.7188C15.3844 15.7188 15.916 15.1871 15.916 14.5312C15.916 13.8754 15.3844 13.3438 14.7285 13.3438C14.0727 13.3438 13.541 13.8754 13.541 14.5312C13.541 15.1871 14.0727 15.7188 14.7285 15.7188Z" stroke="none" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                      <path d="M14.65 18.5293H20.35C20.7458 18.5293 21.0625 18.846 21.0625 19.2418C21.0625 21.213 19.4713 22.8043 17.5 22.8043C15.5288 22.8043 13.9375 21.213 13.9375 19.2418C13.9375 18.846 14.2542 18.5293 14.65 18.5293Z" stroke="none" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </button>
                                  <button className="voice-recorder-icon-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                                      <rect x="0.5" y="0.5" width="34" height="34" rx="17" stroke="none"></rect>
                                      <path d="M11.4434 15.6387V16.9845C11.4434 20.3253 14.1588 23.0408 17.4996 23.0408C20.8404 23.0408 23.5559 20.3253 23.5559 16.9845V15.6387" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                      <path d="M17.5007 20.2715C19.2502 20.2715 20.6673 18.8544 20.6673 17.1048V12.7507C20.6673 11.0011 19.2502 9.58398 17.5007 9.58398C15.7511 9.58398 14.334 11.0011 14.334 12.7507V17.1048C14.334 18.8544 15.7511 20.2715 17.5007 20.2715Z" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                      <path d="M16.4004 13.0905C17.1129 12.8292 17.8887 12.8292 18.6012 13.0905" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                      <path d="M16.8672 14.7687C17.2868 14.6578 17.7222 14.6578 18.1418 14.7687" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                      <path d="M17.5 23.041V25.416" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </button>
                                  <button className="btn-txt-simple send-msg-btn" onClick={sendMessage}>
                                    <span>Send</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                      <path d="M7.39969 6.32015L15.8897 3.49015C19.6997 2.22015 21.7697 4.30015 20.5097 8.11015L17.6797 16.6002C15.7797 22.3102 12.6597 22.3102 10.7597 16.6002L9.91969 14.0802L7.39969 13.2402C1.68969 11.3402 1.68969 8.23015 7.39969 6.32015Z" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                      <path d="M10.1094 13.6505L13.6894 10.0605" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </button>

                                  {showEmojiPicker && (
                                    <div ref={emojiRef} className="emoji-picker-wrapper">
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
                          </div>
                        )}
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePage;