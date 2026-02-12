 import socket from "@/libs/socket";
import { API_MESSAGE_SIDEBAR } from "@/utils/api/APIConstant";
import { getApi } from "@/utils/endpoints/common";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SideBar = ({ onSelectChat }: any) => {
  const [chatList, setChatList] = useState<any[]>([]);
  const router = useRouter();
const searchParams = useSearchParams();
const threadIdFromUrl = searchParams.get("threadId");

  useEffect(() => {
    console.log("SIDEBAR DATA:", chatList);
  }, [chatList]);

  useEffect(() => {
    const handleOnline = ({ userId }: any) => {
      console.log("ONLINE EVENT RECEIVED:", userId);

      setChatList(prev =>
        prev.map(chat =>
          chat.user.id === userId
            ? { ...chat, user: { ...chat.user, isOnline: true } }
            : chat
        )
      );
    };

    const handleOffline = ({ userId }: any) => {
      setChatList(prev =>
        prev.map(chat =>
          chat.user.id === userId
            ? { ...chat, user: { ...chat.user, isOnline: false } }
            : chat
        )
      );
    };

    socket.on("userOnline", handleOnline);
    socket.on("userOffline", handleOffline);

    return () => {
      socket.off("userOnline", handleOnline);
      socket.off("userOffline", handleOffline);
    };
  }, []);


  useEffect(() => {
    const fetchSidebar = async () => {
      try {
        const res = await getApi({
          url: API_MESSAGE_SIDEBAR,
          page: 1,
          rowsPerPage: 50,
          searchText: "",
        });
        setChatList(res);
      } catch (err) {
        console.error("Sidebar fetch failed", err);
      }
    };
    fetchSidebar();
  }, []);

  useEffect(() => {
    if (!threadIdFromUrl && chatList.length > 0) {
      router.replace(`/message?threadId=${chatList[0].publicId}`);
    }
  }, [chatList]);

  return (
    <div className="msg-profiles-layout">
      <div className="msg-profiles-header">
        <div className="msg-profiles-header-container">
          <div className="msg-layout-title">
            <h2>Messages</h2>
            <div className="msg-num-circle">
              <span>29</span>
            </div>
          </div>

          <div className="msg-profiles-search-input">
            <div className="label-input">
              <div className="input-placeholder-icon">
                <svg
                  className="svg-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14 5H20"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14 8H17"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <input type="text" placeholder="Search Contact" />
            </div>
          </div>
        </div>
      </div>
      <div className="msg-profiles-wrapper">
        <div className="msg-profiles-container" msg-chat-contacts-wrapper="">
          {Array.isArray(chatList) && chatList.map((chat) => (
            <div key={chat.publicId}
              className="msg-contact-box"
              msg-chat-contact=""
              data-active={threadIdFromUrl === chat.publicId ? "true" : undefined}
              onClick={() => {
                // setActiveChat(chat.threadId);
                onSelectChat(chat);
              }}
            >
              <div className="contact-item">
                <div className="contact-avatar-wrapper">
                  <img
                    className="contact-avatar"
                    src={chat?.user?.image || "/images/profile-avatars/profile-avatar-6.jpg"}
                    alt=""
                  />
                  <div className={`contact-status-indicator ${chat?.user?.isOnline ? "online" : "offline"
                    }`}></div>
                </div>

                <div className="contact-content">
                  <div className="contact-header">
                    <h4 className="contact-name">{chat?.user?.username || "Unknown User"}</h4>
                    <span className="contact-time">{new Date(chat?.updatedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}</span>
                  </div>

                  <div className="contact-preview">
                    <div className="contact-message">
                      <p>{chat?.lastMessage?.message || chat?.lastMessage}</p>
                    </div>
                    {chat?.unreadCount > 0 && (
                      <div className="contact-unread-count">
                        <span>{chat?.unreadCount}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default SideBar;