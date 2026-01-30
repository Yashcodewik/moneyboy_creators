"use client";

import { CgClose } from "react-icons/cg";
import CustomSelect from "../CustomSelect";

interface SubscriptionModalProps {
  onClose: () => void;
  onConfirm: () => void;
  plan: "MONTHLY" | "YEARLY";
  action: "subscribe" | "upgrade" | "renew" | null;

  creator: {
    displayName?: string;
    userName?: string;
    profile?: string;
  };

subscription?: {
  monthlyPrice?: number;
  yearlyPrice?: number;
};

}


const SubscriptionModal = ({
  onClose,
  onConfirm,
  plan,
  action,
  creator,
  subscription,
}: SubscriptionModalProps) => {

const finalPrice =
  plan === "MONTHLY"
    ? subscription?.monthlyPrice
    : subscription?.yearlyPrice;

    const savings =
  subscription?.monthlyPrice &&
  subscription?.yearlyPrice
    ? Math.round(
        ((subscription.monthlyPrice * 12 -
          subscription.yearlyPrice) /
          (subscription.monthlyPrice * 12)) *
          100
      )
    : null;

  return (
    <>
     <div
        className="modal show"
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-modal-title"
      >
        <div className="modal-wrap subscription-modal">
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
                  <div className="profile-card__name">{creator?.displayName || "Unknown Creator"}</div>
                  <div className="profile-card__badge">
                    <img
                      src="/images/logo/profile-badge.png"
                      alt="MoneyBoy Social Profile Badge"
                    />
                  </div>
                </div>
                <div className="profile-card__username">@{creator?.userName || "Unknown User"}</div>
              </div>
            </div>
          </div>
          <h3 className="title">
           {plan === "MONTHLY" ? "Monthly" : "Yearly"} {action}{" "} <span className="gradinttext">{finalPrice ? `$${finalPrice}` : "Not Updated yet"}</span>{" "}
            <sub>
              /{plan === "MONTHLY" ? "month" : "year"}
              {plan === "YEARLY" && savings && (
                <span>(Save {savings}%)</span>
              )}
            </sub>
          </h3>
          <ul className="points">
            <li>Full access to this creator’s exclusive content</li>
            <li>Direct message with this creator</li>
            <li>Requested personalised Pay Per view contaent </li>
            <li>Cancel your subscription at any time</li>
          </ul>
          <div className="actions">
            <CustomSelect
              label="Select  a payment card"
              searchable={false}
              options={[
                { label: "Visa Credit Card", value: "visa" },
                { label: "Mastercard Credit Card", value: "mastercard" },
                { label: "RuPay Debit Card", value: "rupay" },
                { label: "American Express", value: "amex" },
                { label: "Discover Card", value: "discover" },
              ]}
            />
            <button className="premium-btn active-down-effect" onClick={onConfirm}>
               <span>
                  {action === "upgrade"
                    ? "Upgrade"
                    : action === "renew"
                    ? "Renew"
                    : "Subscribe"}
                </span>
            </button>
          </div>
          <p className="note">
            Clicking “Subscribe” will take you to the payment screen to finalize
            you subscription
          </p>
        </div>
      </div>
    </>
  );
};

export default SubscriptionModal;
