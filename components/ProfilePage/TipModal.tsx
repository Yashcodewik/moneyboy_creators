"use client";

import { CgClose } from "react-icons/cg";
import CustomSelect from "../CustomSelect";
interface TipModalProps {
  onClose: () => void;
  creator: {
    displayName?: string;
    userName?: string;
    profile?: string;
  };
}
const TipModal = ({ onClose, creator }: TipModalProps) => {

  return (
    <>
     <div
             className="modal show"
             role="dialog"
             aria-modal="true"
             aria-labelledby="age-modal-title"
           >
             <div className="modal-wrap tip-modal">
               <button className="close-btn">
                 <CgClose size={22} onClick={onClose} />
               </button>
               <div className="profile-card">
                 <div className="profile-card__main justify-center">
                   <div className="profile-card__avatar-settings">
                     <div className="profile-card__avatar">
                      <img
                        src={
                          creator?.profile ||
                          "/images/profile-avatars/profile-avatar-1.png"
                        }
                        alt={creator?.displayName || "Creator Avatar"}
                      />
                     </div>
                   </div>
                   <div className="profile-card__info">
                     <div className="profile-card__name-badge">
                       <div className="profile-card__name"> {creator?.displayName || "Unknown"} </div>
                       <div className="profile-card__badge">
                         <img
                           src="/images/logo/profile-badge.png"
                           alt="MoneyBoy Social Profile Badge"
                         />
                       </div>
                     </div>
                     <div className="profile-card__username">@{creator?.userName || "unknown"}</div>
                   </div>
                 </div>
               </div>
               <h3 className="title">Thanks for the Tip</h3>
               <div className="text-center">
                 <label className="orange">Enter The Amount</label>
                 <input
                   className="form-input number-input"
                   type="number"
                   placeholder="Amount"
                   name="amount"
                 />
               </div>
               <div className="actions">
                 <button className="premium-btn active-down-effect" onClick={onClose}>
                   <span>Sent Tip</span>
                 </button>
               </div>
             </div>
           </div>
    </>
  );
};

export default TipModal;
