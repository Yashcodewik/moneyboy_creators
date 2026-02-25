"use client";

import { CgClose } from "react-icons/cg";

import { API_GET_PROMOTIONS, API_PROMOTE_PROFILE } from "@/utils/api/APIConstant";
import ShowToast from "@/components/common/ShowToast";
import { useEffect, useState } from "react";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";



const PromoteModal = ({ onClose }: { onClose: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(3);
const [paymentType, setPaymentType] = useState("wallet");
const [plans, setPlans] = useState<any[]>([]);
const selectedPlan = plans.find((p) => p.days === duration);
const pricePerDay = parseFloat(
  String(selectedPlan?.price || "0").replace(/[^\d.]/g, "")
);
const totalPrice = (pricePerDay * duration).toFixed(2);
const handlePromote = async () => {
  setLoading(true);

  const response = await apiPost({
    url: API_PROMOTE_PROFILE,
 values: {
  duration,
  price: Number(totalPrice),
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

useEffect(() => {
  fetchPromotions();
}, []);

const fetchPromotions = async () => {
  const res = await getApiWithOutQuery({
    url: API_GET_PROMOTIONS,
  });

  if (res?.success && res.data.length) {
    setPlans(res.data);

    // ✅ set default selected duration from API
    setDuration(res.data[0].duration);
  } else {
    ShowToast("Failed to load promotion plans", "error");
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
  {plans.map((plan) => (
    <label key={plan._id} className="radio_wrap box_select">
      <input
        type="radio"
        name="duration"
        checked={duration === plan.duration}
        onChange={() => setDuration(plan.duration)}
      />
      <h3>{plan.days} Days</h3>
      <p>${plan.price} /day</p>
    </label>
  ))}
</div>

     <div className="total_wrap">
  <div>
    <h3>Total Price</h3>
    <p>
  {duration || 0} Days at ${pricePerDay || 0} /day
</p>
  </div>
  <div>
    <h2>${totalPrice}</h2>
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