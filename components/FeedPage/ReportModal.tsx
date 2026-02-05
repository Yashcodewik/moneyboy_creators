"use client";

import { CgClose } from "react-icons/cg";
import CustomSelect from "../CustomSelect";

const PromoteModal = ({onClose}: {onClose: () => void}) => {

  return (
    <>
     <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-modal-title"
      >
        <div className="modal-wrap report-modal">
          <button className="close-btn">
            <CgClose size={22} />
          </button>
          <h3 className="title">Report Pop-Up</h3>
          <div className="img_wrap">
            <img
              src="/images/profile-avatars/profile-avatar-1.png"
              alt="MoneyBoy Social Profile Avatar"
            />
          </div>
          <div>
            <label>
              Tital <span>*</span>
            </label>
            <CustomSelect
              searchable={false}
              label="Violent Or Repulsive Content"
              options={[
                {
                  label: "Violent or repulsive content",
                  value: "violent_or_repulsive",
                },
                {
                  label: "Hateful or abusive content",
                  value: "hateful_or_abusive",
                },
                {
                  label: "Harassment or bullying",
                  value: "harassment_or_bullying",
                },
                {
                  label: "Harmful or dangerous acts",
                  value: "harmful_or_dangerous",
                },
                { label: "Child abuse", value: "child_abuse" },
                { label: "Promotes terrorism", value: "promotes_terrorism" },
                { label: "Spam or misleading", value: "spam_or_misleading" },
                { label: "Infringes my rights", value: "infringes_my_rights" },
                { label: "Others", value: "others" },
              ]}
            />
          </div>
          <div className="input-wrap">
            <label>Description</label>
            <textarea rows={3} placeholder="Tell Us Whay You Report?" />
            <label className="right">0/300</label>
          </div>
          <div className="actions">
            <button className="premium-btn active-down-effect">
              <span>Submit</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromoteModal;
