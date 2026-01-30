"use client";

import { CgClose } from "react-icons/cg";
import CustomSelect from "../CustomSelect";

const TipModal = ({onClose}: {onClose: () => void}) => {

  return (
    <>
     <div
             className="modal"
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
                         src="/images/profile-avatars/profile-avatar-1.png"
                         alt="MoneyBoy Social Profile Avatar"
                       />
                     </div>
                   </div>
                   <div className="profile-card__info">
                     <div className="profile-card__name-badge">
                       <div className="profile-card__name"> Addisonraee </div>
                       <div className="profile-card__badge">
                         <img
                           src="/images/logo/profile-badge.png"
                           alt="MoneyBoy Social Profile Badge"
                         />
                       </div>
                     </div>
                     <div className="profile-card__username">@rae</div>
                   </div>
                 </div>
               </div>
               <h3 className="title">Thanks for the Tip</h3>
               <div className="text-center">
                 <label className="orange">Enter The Amount</label>
                 <input
                   className="form-input number-input"
                   type="number"
                   placeholder="Question"
                   name="firstName"
                 />
               </div>
               <div className="actions">
                 <button className="premium-btn active-down-effect">
                   <span>Sent Tip</span>
                 </button>
               </div>
             </div>
           </div>
    </>
  );
};

export default TipModal;
