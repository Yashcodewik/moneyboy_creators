 import socket from "@/libs/socket";
import { API_MESSAGE_SIDEBAR } from "@/utils/api/APIConstant";
import { getApi } from "@/utils/endpoints/common";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const SideBar = ({ onSelectChat, activeThreadId }: any) => {
  const [chatList, setChatList] = useState<any[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const threadIdFromUrl = searchParams.get("threadId");
  const [searchText, setSearchText] = useState("");

const filteredChatList = useMemo(() => {
  if (!searchText.trim()) return chatList;

  const lower = searchText.toLowerCase();

  return chatList.filter((chat) => {
    const username = chat?.user?.username?.toLowerCase() || "";
    const lastMessage =
      (chat?.lastMessage?.message || chat?.lastMessage || "")
        .toLowerCase();

    return (
      username.includes(lower) ||
      lastMessage.includes(lower)
    );
  });
}, [chatList, searchText]);

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
            {/* <div className="msg-num-circle">
              <span>29</span>
            </div> */}
          </div>

          <div className="msg-profiles-search-input">
            <div className="label-input">
              <div className="input-placeholder-icon">
                <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 5H20" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 8H17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <input type="text" placeholder="Search Contact" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
            </div>
          </div>
        </div>
      </div>
      <div className="msg-profiles-wrapper">
        <div className="msg-profiles-container" msg-chat-contacts-wrapper="">
        <div className="hidecnvt_wrapp">
          <h3>Hide Conversation</h3>
          <div className="msg-contact-box">
            <div className="contact-item">
              <div className="contact-avatar-wrapper">
                <img className="contact-avatar" src="https://res.cloudinary.com/drhj03nvv/image/upload/v1770286421/profile/1770286420683-profile.jpg.jpg" alt="#"/>
                <div className="contact-status-indicator online"></div>
              </div>
              <div className="contact-content">
                <div className="contact-header">
                  <h4 className="contact-name">James Baptista</h4>
                  <span className="contact-time">12:25</span>
                </div>
                <div className="contact-preview">
                  <div className="contact-message"><p>Lorem ipsum, dolor sit a consectetur adipisicing eli</p></div>
                  <div className="contact-unread-count"><span>8</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
         {Array.isArray(filteredChatList) && filteredChatList.map((chat) => (
            <div key={chat.publicId} className="msg-contact-box" msg-chat-contact="" data-active={activeThreadId === chat.publicId ? "true" : undefined} onClick={() => {onSelectChat(chat);}}>
              <div className="contact-item">
                <div className="contact-avatar-wrapper">
                  {chat?.user?.image? ( 
                    <img className="contact-avatar" src={chat?.user?.image || "/images/profile-avatars/profile-avatar-6.jpg"} alt=""/>
                  ) : (
                    <div className="noprofile">
                      <svg width="40" height="40" viewBox="0 0 66 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path className="animate-m" d="M65.4257 49.6477L64.1198 52.8674C64.0994 52.917 64.076 52.9665 64.0527 53.0132C63.6359 53.8294 62.6681 54.2083 61.8081 53.8848C61.7673 53.8731 61.7265 53.8556 61.6886 53.8381L60.2311 53.1764L57.9515 52.1416C57.0945 51.7509 56.3482 51.1446 55.8002 50.3779C48.1132 39.6156 42.1971 28.3066 38.0271 16.454C37.8551 16.1304 37.5287 15.9555 37.1993 15.9555C36.9631 15.9555 36.7241 16.0459 36.5375 16.2325L28.4395 24.3596C28.1684 24.6307 27.8099 24.7678 27.4542 24.7678C27.4076 24.7678 27.3609 24.7648 27.3143 24.7619C27.2239 24.7503 27.1307 24.7328 27.0432 24.7065C26.8217 24.6366 26.6118 24.5112 26.4427 24.3276C23.1676 20.8193 20.6053 17.1799 18.3097 15.7369C18.1698 15.6495 18.0153 15.6057 17.8608 15.6057C17.5634 15.6057 17.2719 15.7602 17.1029 16.0313C14.1572 20.7377 11.0702 24.8873 7.75721 28.1157C7.31121 28.5471 6.74277 28.8299 6.13061 28.9115L3.0013 29.3254L1.94022 29.4683L1.66912 29.5033C0.946189 29.5994 0.296133 29.0602 0.258237 28.3314L0.00754237 23.5493C-0.0274383 22.8701 0.191188 22.2025 0.610956 21.669C1.51171 20.5293 2.39789 19.3545 3.26512 18.152C5.90032 14.3304 9.52956 8.36475 13.1253 1.39631C13.548 0.498477 14.4283 0 15.3291 0C15.8479 0 16.3727 0.163246 16.8187 0.513052L27.3799 8.76557L39.285 0.521797C39.6931 0.206971 40.1711 0.0583046 40.6434 0.0583046C41.4683 0.0583046 42.2729 0.510134 42.6635 1.32052C50.16 18.2735 55.0282 34.2072 63.6378 47.3439C63.9584 47.8336 64.0197 48.4487 63.8039 48.9851L65.4257 49.6477Z" fill="url(#paint0_linear_4470_53804)"/>
                        <defs>
                          <linearGradient id="paint0_linear_4470_53804" x1="0" y1="27" x2="66" y2="27" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#FDAB0A"/>
                            <stop offset="0.4" stop-color="#FECE26"/>
                            <stop offset="1" stop-color="#FE990B"/>
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  )}
                  <div className={`contact-status-indicator ${chat?.user?.isOnline ? "online" : "offline"
                    }`}></div>
                </div>

                <div className="contact-content">
                  <div className="contact-header">
                    <h4 className="contact-name">{chat?.user?.username || "Unknown User"}</h4>
                    <span className="contact-time">{new Date(chat?.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit",})}</span>
                  </div>

                  <div className="contact-preview">
                    <div className="contact-message">
                      <p>{chat?.lastMessage?.message || chat?.lastMessage}</p>
                    </div>
                    {chat?.isMuted && (
                    <div className="icon mute-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 8.36997V7.40997C15 4.42997 12.93 3.28997 10.41 4.86997L7.49 6.69997C7.17 6.88997 6.8 6.99997 6.43 6.99997H5C3 6.99997 2 7.99997 2 9.99997V14C2 16 3 17 5 17H7" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M10.4102 19.13C12.9302 20.71 15.0002 19.56 15.0002 16.59V12.95" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M18.81 9.41998C19.71 11.57 19.44 14.08 18 16" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M21.1481 7.79999C22.6181 11.29 22.1781 15.37 19.8281 18.5" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M22 2L2 22" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                    )}
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