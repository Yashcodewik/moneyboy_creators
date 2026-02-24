import { apiPost, getApi } from '@/utils/endpoints/common';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import CustomSelect from '../CustomSelect';
import { CgClose } from 'react-icons/cg';
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  muteThread,
  hideThread,
  searchMessages,
  toggleBlockThread,
  fetchThreadDetails,
} from "@/redux/message/messageActions";
import { useSelector } from 'react-redux';
import { setThreadDetails } from '@/redux/message/messageSlice';


const ChatFeatures = ({ threadPublicId, onSearch, onReport, onDelete,
}: {
  threadPublicId: string;
  onSearch: (value: string) => void;
  onReport: () => void;
  onDelete: () => void;
}) => {

  const [searchText, setSearchText] = useState("");
  const [searchedMessages, setSearchedMessages] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const router = useRouter();
    const { isBlocked , isHidden} = useAppSelector(
    (state) => state.message
  );

  const dispatch = useAppDispatch();
const handleMute = async () => {
  await dispatch(muteThread(threadPublicId));
  toast.success("Conversation muted");
};

  const handleHide = async () => {
    const res: any = await dispatch(hideThread(threadPublicId));
    if (res.meta.requestStatus === "fulfilled") {
      const { isHidden, message } = res.payload;
      toast.success(
        message || 
        (isHidden
          ? "Conversation hidden successfully"
          : "Conversation unhidden successfully")
      );
      if (isHidden) {
        router.replace("/message");
      }

    } else {
      toast.error("Failed to update conversation");
    }
  };

 const handleBlock = async () => {
  const res: any = await dispatch(toggleBlockThread(threadPublicId));

  if (res.meta.requestStatus === "fulfilled") {
    toast.success(res.payload.message);
     dispatch(fetchThreadDetails(threadPublicId));
  } else {
    toast.error("Failed to toggle block");
  }
};

const handleSearch = async () => {
  await dispatch(
    searchMessages({
      threadId: threadPublicId,
      searchText,
    })
  );

  onSearch(searchText); 
};

  return (
    <div className="rel-users-more-opts-popup-container">
      <ul>
        <li className="chat-msg-search">
          <div>
            <div className="label-input">
              <div className="input-placeholder-icon">
                <svg className="svg-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 5H20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 8H17" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search Message"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
          </div>
        </li>
        <li onClick={handleMute}>
          <div className="icon mute-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 8.36997V7.40997C15 4.42997 12.93 3.28997 10.41 4.86997L7.49 6.69997C7.17 6.88997 6.8 6.99997 6.43 6.99997H5C3 6.99997 2 7.99997 2 9.99997V14C2 16 3 17 5 17H7" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M10.4102 19.13C12.9302 20.71 15.0002 19.56 15.0002 16.59V12.95" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M18.81 9.41998C19.71 11.57 19.44 14.08 18 16" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M21.1481 7.79999C22.6181 11.29 22.1781 15.37 19.8281 18.5" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M22 2L2 22" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
          <span>Mute Conversation</span>
        </li>
        <li onClick={handleHide}>
          <div className="icon hide-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g>
                <path d="M17.8201 5.77047C16.0701 4.45047 14.0701 3.73047 12.0001 3.73047C8.47009 3.73047 5.18009 5.81047 2.89009 9.41047C1.99009 10.8205 1.99009 13.1905 2.89009 14.6005C3.68009 15.8405 4.60009 16.9105 5.60009 17.7705" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M14.5299 9.46992L9.46992 14.5299C8.81992 13.8799 8.41992 12.9899 8.41992 11.9999C8.41992 10.0199 10.0199 8.41992 11.9999 8.41992C12.9899 8.41992 13.8799 8.81992 14.5299 9.46992Z" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M8.41992 19.5297C9.55992 20.0097 10.7699 20.2697 11.9999 20.2697C15.5299 20.2697 18.8199 18.1897 21.1099 14.5897C22.0099 13.1797 22.0099 10.8097 21.1099 9.39969C20.7799 8.87969 20.4199 8.38969 20.0499 7.92969" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M15.5099 12.6992C15.2499 14.1092 14.0999 15.2592 12.6899 15.5192" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M9.47 14.5293L2 21.9993" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M22 2L14.53 9.47" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </g>
            </svg>
          </div>
          <span>{isHidden ? "Unhide Conversation" : "Hide Conversation"}</span>
        </li>
        <li onClick={handleBlock}>
          <div className="icon block-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M3.41016 22C3.41016 18.13 7.26015 15 12.0002 15C12.9602 15 13.8902 15.13 14.7602 15.37" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M22 18C22 18.32 21.96 18.63 21.88 18.93C21.79 19.33 21.63 19.72 21.42 20.06C20.73 21.22 19.46 22 18 22C16.97 22 16.04 21.61 15.34 20.97C15.04 20.71 14.78 20.4 14.58 20.06C14.21 19.46 14 18.75 14 18C14 16.92 14.43 15.93 15.13 15.21C15.86 14.46 16.88 14 18 14C19.18 14 20.25 14.51 20.97 15.33C21.61 16.04 22 16.98 22 18Z" stroke="none" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M20.5 15.5001L15.5 20.5001" stroke="none" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round">
              </path>
            </svg>
          </div>
          <span>{isBlocked ? "Unblock Messages" : "Block Messages"}</span>
        </li>
        <li onClick={onReport}>
          <div className="icon report-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5.14844 2V22" stroke="none" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M5.14844 4H16.3484C19.0484 4 19.6484 5.5 17.7484 7.4L16.5484 8.6C15.7484 9.4 15.7484 10.7 16.5484 11.4L17.7484 12.6C19.6484 14.5 18.9484 16 16.3484 16H5.14844" stroke="none" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
          <span>Report Conversation</span>
        </li>
        <li onClick={onDelete}>
          <div className="icon delete-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g clipPath="url(#clip0_6001_200)">
                <mask id="mask0_6001_200" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                  <path d="M24 0H0V24H24V0Z" fill="white"></path>
                </mask>
                <g mask="url(#mask0_6001_200)">
                  <path d="M21 5.98047C17.67 5.65047 14.32 5.48047 10.98 5.48047C9 5.48047 7.02 5.58047 5.04 5.78047L3 5.98047" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M19 6L18.3358 18.5288C18.2234 20.4821 18.1314 22 15.2803 22H8.71971C5.86861 22 5.77664 20.4821 5.66423 18.5288L5 6" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M10.3301 16.5H13.6601" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M9.5 12.5H14.5" stroke="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </g>
              </g>
              <defs>
                <clipPath id="clip0_6001_200">
                  <rect width="24" height="24" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
          <span>Delete Conversation</span>
        </li>
      </ul>
    </div>
  )
}

export default ChatFeatures;