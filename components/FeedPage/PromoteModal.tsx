"use client";

import { CgClose } from "react-icons/cg";

import { API_PROMOTE_PROFILE } from "@/utils/api/APIConstant";
import ShowToast from "@/components/common/ShowToast";
import { useState } from "react";
import { apiPost } from "@/utils/endpoints/common";

const PromoteModal = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(3);
const [paymentType, setPaymentType] = useState("wallet");

const handlePromote = async () => {
  setLoading(true);

  const response = await apiPost({
    url: API_PROMOTE_PROFILE,
    values: {
      duration,
      price: 55.99, // keep static for now
      paymentType,
    },
  });

  setLoading(false);

  if (response?.success) {
    ShowToast("Profile promoted successfully 🚀", "success");
    onClose();
  } else {
    ShowToast(response?.message || "Something went wrong", "error");
  }
};
  return (
    <div className="modal show" role="dialog">
      <div className="modal-wrap promote-modal">
        <button className="close-btn" onClick={onClose}>
          <CgClose size={22} />
        </button>

        <h3 className="title">Promote Your Profile</h3>

        <p>
          Increase your visibility on MoneyBoy! Promote your profile to appear
          in the Featured MoneyBoys section and attract more fans.
        </p>

        <div className="note">
          <p>
            Choose your promotion plan and pay easily with your Wallet or
            credit card.
          </p>
        </div>

        {/* STATIC UI ONLY */}
        <div className="select_wrap grid2">
<label className="radio_wrap box_select">
  <input
    type="radio"
    name="duration"
    checked={duration === 3}
    onChange={() => setDuration(3)}
  />
  <h3>3 Days</h3>
  <p>$9.99 /day</p>
</label>

<label className="radio_wrap box_select">
  <input
    type="radio"
    name="duration"
    checked={duration === 7}
    onChange={() => setDuration(7)}
  />
  <h3>7 Days</h3>
  <p>$7.99 /day</p>
</label>

<label className="radio_wrap box_select">
  <input
    type="radio"
    name="duration"
    checked={duration === 14}
    onChange={() => setDuration(14)}
  />
  <h3>14 Days</h3>
  <p>$5.99 /day</p>
</label>

<label className="radio_wrap box_select">
  <input
    type="radio"
    name="duration"
    checked={duration === 30}
    onChange={() => setDuration(30)}
  />
  <h3>30 Days</h3>
  <p>$3.99 /day</p>
</label>
        </div>

        <div className="total_wrap">
          <div>
            <h3>Total Price</h3>
            <p>7 Days at $7.99 /day</p>
          </div>
          <div>
            <h2>$55.99</h2>
          </div>
        </div>

        <h4>Payment Method</h4>

        <div className="select_wrap">
      <label className="radio_wrap">
  <input
    type="radio"
    name="payment"
    checked={paymentType === "wallet"}
    onChange={() => setPaymentType("wallet")}
  />
  <img src="/images/icons/wallet_icons.svg" className="icons" />
  <p>Pay with wallet</p>
</label>

<label className="radio_wrap">
  <input
    type="radio"
    name="payment"
    checked={paymentType === "card"}
    onChange={() => setPaymentType("card")}
  />
  <img src="/images/icons/card_icons.svg" className="icons" />
  <p>Pay with credit/debit card</p>
</label>
        </div>

        <div className="actions">
          <button
            className="premium-btn active-down-effect"
            onClick={handlePromote}
            disabled={loading}
          >
            <span>{loading ? "Processing..." : "Confirm & Promote"}</span>
          </button>

          <button className="active-down-effect" onClick={onClose}>
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoteModal;