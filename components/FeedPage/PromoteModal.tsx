"use client";

import { CgClose } from "react-icons/cg";
import {
  API_GET_ACTIVE_PROMOTION,
  API_GET_PROMOTIONS,
  API_PROMOTE_PROFILE,
} from "@/utils/api/APIConstant";
import ShowToast from "@/components/common/ShowToast";
import { useEffect, useState } from "react";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";
import Modal from "../Modal";
import { fetchWallet } from "@/redux/wallet/Action";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { showError, showQuestion, showSuccess } from "@/utils/alert";

const PromoteModal = ({
  onClose,
  show,
}: {
  onClose: () => void;
  show: boolean;
}) => {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(3);
  const [paymentType, setPaymentType] = useState("wallet");
  const [plans, setPlans] = useState<any[]>([]);
  const [activePromotion, setActivePromotion] = useState<any>(null);
  const [loadingPromotion, setLoadingPromotion] = useState(true);

  const selectedPlan = plans.find((p) => Number(p.days) === Number(duration));
  const pricePerDay = Number(selectedPlan?.price || 0);

  const totalPrice = selectedPlan
    ? (pricePerDay * Number(duration)).toFixed(2)
    : "0.00";

    const dispatch = useDispatch<AppDispatch>();

  // ================= API =================
const handlePromote = async () => {
 
  const confirm = await showQuestion(
    `Are you sure you want to promote your profile for ${duration} days?\n\nTotal: $${totalPrice}`,
    "Yes, Promote",
    "Cancel"
  );

  if (!confirm) return; 

  try {
    setLoading(true);

    const response = await apiPost({
      url: API_PROMOTE_PROFILE,
      values: {
        duration,
        price: Number(totalPrice),
        paymentType,
      },
    });

    if (response?.success) {
      showSuccess("Profile promoted successfully 🚀");

      dispatch(fetchWallet());
      onClose();
    } else {
      showError(response?.message || "Something went wrong");
    }
  } catch (err) {
    showError("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  // ================= FETCH =================
  const fetchPromotions = async () => {
    try {
      const res = await getApiWithOutQuery({
        url: API_GET_PROMOTIONS,
      });

      if (res?.success && res.data?.length) {
        const sortedPlans = res.data.sort(
          (a: any, b: any) => Number(a.days) - Number(b.days)
        );

        setPlans(sortedPlans);
        setDuration(Number(sortedPlans[0].days));
      } else {
        showError("Failed to load promotion plans");
      }
    } catch {
      showError("Failed to load promotion plans");
    }
  };

const fetchActivePromotion = async () => {
  try {
    setLoadingPromotion(true);

    const res = await getApiWithOutQuery({
      url: API_GET_ACTIVE_PROMOTION,
    });

    if (res?.success && res.data && Object.keys(res.data).length > 0) {
      setActivePromotion(res.data);
    } else {
      setActivePromotion(null);
    }
  } catch {
    setActivePromotion(null);
  } finally {
    setLoadingPromotion(false);
  }
};

  useEffect(() => {
    if (!show) return;

    fetchPromotions();
    fetchActivePromotion();
  }, [show]);

  // ================= TIMER =================
  const remainingDays = activePromotion
    ? Math.max(
      0,
      Math.ceil(
        (new Date(activePromotion.expiresAt).getTime() - Date.now()) /
        (1000 * 60 * 60 * 24)
      )
    )
    : 0;

  useEffect(() => {
    if (!activePromotion) return;

    const expiryTime = new Date(activePromotion.expiresAt).getTime();

    const timer = setInterval(() => {
      if (Date.now() >= expiryTime) {
        setActivePromotion(null);
        fetchActivePromotion();
      }
    }, 60000);

    return () => clearInterval(timer);
  }, [activePromotion]);

  if (loadingPromotion) {
  return (
    <Modal className="promote_wrap" size="md" show={show} title=" " onClose={onClose}>
      <div className="modal_containt promote-modal">
        <div className="loadingtext">
          {"Loading...".split("").map((char, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              {char}
            </span>
          ))}
        </div>
      </div>
    </Modal>
  );
}

  // ================= ACTIVE UI =================
  if (activePromotion) {
    return (
      <Modal className="promote_wrap" size="md" show={show} title=" " onClose={onClose}>
        <div className="modal_containt promote-modal">
          <h3 className="title">Promotion Active 🚀</h3>
          <p>Your profile is currently being promoted.</p>
          <div className="total_wrap">
            <div>
              <h3>Promotion Duration</h3>
              <p>{activePromotion.duration} Days</p>
            </div>
            <div>
              <h2>{remainingDays} Days Left</h2>
            </div>
          </div>

          <div className="note">
            <p> Your profile is visible in the Featured section until the promotion expires.</p>
          </div>
          <div className="actions">
            <button
              className="premium-btn active-down-effect"
              onClick={onClose}
            >
              <span>Close</span>
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  // ================= NORMAL UI =================
  return (
    <Modal className="promote_wrap" size="md" show={show} title=" " onClose={onClose}>
      <div className="modal_containt promote-modal">
        <h3 className="title">Promote Your Profile</h3>
        <p>Increase your visibility! Promote your profile to appear in the Featured section and attract more users.</p>
        <div className="note">
          <p>Choose your promotion plan and pay easily with your Wallet or card.</p>
        </div>
        {/* Plans */}
        <div className="select_wrap grid2">
          {plans.map((plan) => (
            <label key={plan._id} className="radio_wrap box_select">
              <input type="radio" name="duration" checked={Number(duration) === Number(plan.days)} onChange={() => setDuration(Number(plan.days))} />
              <h3>{plan.days} Days</h3>
              <p>${plan.price} /Day</p>
            </label>
          ))}
        </div>
        {/* Total */}
        <div className="total_wrap">
          <div>
            <h3>Total Price</h3>
            <p>{duration} Days × ${pricePerDay} /day</p>
          </div>
          <div>
            <h2>${totalPrice}</h2>
          </div>
        </div>
        {/* Payment */}
        <h4>Payment Method</h4>
        <div className="select_wrap">
          <label className="radio_wrap">
            <input type="radio" checked={paymentType === "wallet"} onChange={() => setPaymentType("wallet")} />
            <img src="/images/icons/wallet_icons.svg" className="icons" />
            <p>Wallet</p>
          </label>
          <label className="radio_wrap">
            <input type="radio" checked={paymentType === "card"} onChange={() => setPaymentType("card")} />
            <img src="/images/icons/card_icons.svg" className="icons" />
            <p>Card</p>
          </label>
        </div>
        {/* Actions */}
        <div className="actions">
          <button className="premium-btn active-down-effect" onClick={handlePromote} disabled={loading}><span>{loading ? "Processing..." : "Confirm & Promote"}</span></button>
          <button className="active-down-effect" onClick={onClose}><span>Cancel</span></button>
        </div>
      </div>
    </Modal>
  );
};

export default PromoteModal;

// "use client";

// import { CgClose } from "react-icons/cg";
// import {
//   API_GET_ACTIVE_PROMOTION,
//   API_GET_PROMOTIONS,
//   API_PROMOTE_PROFILE,
// } from "@/utils/api/APIConstant";
// import ShowToast from "@/components/common/ShowToast";
// import { useEffect, useState } from "react";
// import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";

// const PromoteModal = ({ onClose }: { onClose: () => void }) => {
//   const [loading, setLoading] = useState(false);
//   const [duration, setDuration] = useState(3);
//   const [paymentType, setPaymentType] = useState("wallet");
//   const [plans, setPlans] = useState<any[]>([]);
//   const selectedPlan = plans.find((p) => p.days === duration);
//   const pricePerDay = Number(selectedPlan?.price || 0);
//   const totalPrice = selectedPlan
//     ? (pricePerDay * Number(duration)).toFixed(2)
//     : "0.00";
// const [activePromotion, setActivePromotion] = useState<any>(null);
//   const handlePromote = async () => {
//     setLoading(true);

//     const response = await apiPost({
//       url: API_PROMOTE_PROFILE,
//       values: {
//         duration,
//         price: Number(totalPrice),
//         paymentType,
//       },
//     });

//     setLoading(false);

//     if (response?.success) {
//       ShowToast("Profile promoted successfully 🚀", "success");
//       onClose();
//     } else {
//       ShowToast(response?.message || "Something went wrong", "error");
//     }
//   };

//   useEffect(() => {
//     fetchPromotions();
//     fetchActivePromotion();
//   }, []);

//   const fetchPromotions = async () => {
//     const res = await getApiWithOutQuery({
//       url: API_GET_PROMOTIONS,
//     });

//     if (res?.success && res.data.length) {
//       const sortedPlans = res.data.sort(
//         (a: any, b: any) => Number(a.days) - Number(b.days),
//       );
//       setPlans(sortedPlans);
//       setDuration(res.data[0].days);
//     } else {
//       ShowToast("Failed to load promotion plans", "error");
//     }
//   };

//   const fetchActivePromotion = async () => {
//   const res = await getApiWithOutQuery({
//     url: API_GET_ACTIVE_PROMOTION,
//   });

//   if (res?.success && res.data && Object.keys(res.data).length > 0) {
//     setActivePromotion(res.data);
//   }
// };

// const remainingDays = activePromotion
//   ? Math.ceil(
//       (new Date(activePromotion.expiresAt).getTime() - Date.now()) /
//         (1000 * 60 * 60 * 24),
//     )
//   : 0;

//   useEffect(() => {
//   if (!activePromotion) return;

//   const expiryTime = new Date(activePromotion.expiresAt).getTime();

//   const timer = setInterval(() => {
//     const now = Date.now();

//     if (now >= expiryTime) {
//       setActivePromotion(null);
//       fetchActivePromotion();
//     }
//   }, 60000);

//   return () => clearInterval(timer);
// }, [activePromotion]);

//   if (activePromotion) {
//   return (
//     <div className="modal show" role="dialog">
//       <div className="modal-wrap promote-modal">
//         <button className="close-btn" onClick={onClose}>
//           <CgClose size={22} />
//         </button>

//         <h3 className="title">Promotion Active 🚀</h3>

//         <p>Your profile is currently being promoted.</p>

//         <div className="total_wrap">
//           <div>
//             <h3>Promotion Duration</h3>
//             <p>{activePromotion.duration} Days</p>
//           </div>
//           <div>
//             <h2>{remainingDays} Days Left</h2>
//           </div>
//         </div>

//         <div className="note">
//           <p>
//             Your profile is visible in the Featured MoneyBoys section until the
//             promotion expires.
//           </p>
//         </div>

//         <div className="actions">
//           <button
//             className="premium-btn active-down-effect"
//             onClick={onClose}
//           >
//             <span>Close</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
//   return (
//     <div className="modal show" role="dialog">
//       <div className="modal-wrap promote-modal">
//         <button className="close-btn" onClick={onClose}>
//           <CgClose size={22} />
//         </button>

//         <h3 className="title">Promote Your Profile</h3>

//         <p>
//           Increase your visibility on MoneyBoy! Promote your profile to appear
//           in the Featured MoneyBoys section and attract more fans.
//         </p>

//         <div className="note">
//           <p>
//             Choose your promotion plan and pay easily with your Wallet or credit
//             card.
//           </p>
//         </div>

//         {/* STATIC UI ONLY */}
//         <div className="select_wrap grid2">
//           {plans.map((plan) => (
//             <label key={plan._id} className="radio_wrap box_select">
//               <input
//                 type="radio"
//                 name="duration"
//                 checked={Number(duration) === Number(plan.days)}
//                 onChange={() => setDuration(Number(plan.days))}
//               />
//               <h3>{plan.days} Days</h3>
//               <p>${plan.price} /Day</p>
//             </label>
//           ))}
//         </div>

//         <div className="total_wrap">
//           <div>
//             <h3>Total Price</h3>
//             <p>
//               {duration || 0} Days at ${pricePerDay || 0} /day
//             </p>
//           </div>
//           <div>
//             <h2>${isNaN(Number(totalPrice)) ? "0.00" : totalPrice}</h2>
//           </div>
//         </div>

//         <h4>Payment Method</h4>

//         <div className="select_wrap">
//           <label className="radio_wrap">
//             <input
//               type="radio"
//               name="payment"
//               checked={paymentType === "wallet"}
//               onChange={() => setPaymentType("wallet")}
//             />
//             <img src="/images/icons/wallet_icons.svg" className="icons" />
//             <p>Pay with wallet</p>
//           </label>

//           <label className="radio_wrap">
//             <input
//               type="radio"
//               name="payment"
//               checked={paymentType === "card"}
//               onChange={() => setPaymentType("card")}
//             />
//             <img src="/images/icons/card_icons.svg" className="icons" />
//             <p>Pay with credit/debit card</p>
//           </label>
//         </div>

//         <div className="actions">
//           <button
//             className="premium-btn active-down-effect"
//             onClick={handlePromote}
//             disabled={loading}
//           >
//             <span>{loading ? "Processing..." : "Confirm & Promote"}</span>
//           </button>

//           <button className="active-down-effect" onClick={onClose}>
//             <span>Cancel</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PromoteModal;
