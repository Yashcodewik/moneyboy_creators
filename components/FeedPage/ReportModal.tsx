"use client";

import { CgClose } from "react-icons/cg";
import CustomSelect from "../CustomSelect";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { reportPostAction } from "@/redux/feed/feedAction";

const ReportModal = ({ onClose,
  postId,
}: {
  onClose: () => void;
  postId: string;
}) => {

  const dispatch = useDispatch<AppDispatch>();

const [title, setTitle] = useState("");
const [description, setDescription] = useState("");

  return (
    <>
     <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-modal-title"
      >
        <div className="modal-wrap report-modal">
          <button className="close-btn" onClick={onClose}>
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
              value={title}
              onChange={(value) => setTitle(value as string)}
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
            <textarea
  rows={3}
  placeholder="Tell us why you report?"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>

            <label className="right">0/300</label>
          </div>
          <div className="actions">
            <button
  className="premium-btn active-down-effect"
  onClick={() => {
    if (!title) return;
    dispatch(
      reportPostAction({
        postId,
        title,
        description,
      })
    );

    onClose();
  }}
>
  <span>Submit</span>
</button>

          </div>
        </div>
      </div>
    </>
  );
};

export default ReportModal;
