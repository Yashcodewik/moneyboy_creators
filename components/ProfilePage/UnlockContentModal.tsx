"use client";

import { CgClose } from "react-icons/cg";
interface UnlockContentModalProps {
  onClose: () => void;
  creator: {
    displayName?: string;
    userName?: string;
    profile?: string;
  };
  post: {
    publicId: string;
    text: string;
    price: number;
  };
  onConfirm: () => Promise<void>;
  loading?: boolean;
}

const UnlockContentModal = ({
  onClose,
  creator,
  post,
  onConfirm,
  loading = false,
}: UnlockContentModalProps) => {
  return (
    <>
     <div
       className="modal show"
       role="dialog"
       aria-modal="true"
       aria-labelledby="age-modal-title"
     >
       <div className="modal-wrap tip-modal unlockmodal">
         <button className="close-btn" onClick={onClose}>
           <CgClose size={22}  />
         </button>
         <div className="profile-card">
           <div className="profile-card__main justify-center">
             <div className="profile-card__avatar-settings">
               <div className="profile-card__avatar">
                <img
                src={creator.profile || "/images/profile-avatars/profile-avatar-1.png"}
                alt="Creator"
              />
               </div>
             </div>
             <div className="profile-card__info">
               <div className="profile-card__name-badge">
                 <div className="profile-card__name"> {creator.displayName}</div>
                 <div className="profile-card__badge">
                   <img
                     src="/images/logo/profile-badge.png"
                     alt="MoneyBoy Social Profile Badge"
                   />
                 </div>
               </div>
               <div className="profile-card__username">@{creator.userName}</div>
             </div>
           </div>
         </div>
         <h3 className="title">Unlock Content</h3>
         <h4>
           <span className="textorange">${post.price}</span> USD
         </h4>
         <p>
           My man hates spiders!!{" "}
           <img src="/images/icons/spider_icons.svg" className="icons" />{" "}
           <img src="/images/icons/smiling-faceicons.svg" className="icons" />
         </p>
         <div className="actions">
           <button className="premium-btn active-down-effect" onClick={onConfirm} disabled={loading}>
             <span>{loading ? "Processing..." : "Confirm to unlock"}</span>
           </button>
         </div>
       </div>
     </div>
    </>
  );
};

export default UnlockContentModal;
