"use client";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import CustomSelect from "../CustomSelect";
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
  onConfirm: (paymentMethod: "wallet" | "card") => Promise<void>;
  loading?: boolean;
}

const UnlockContentModal = ({
  onClose,
  creator,
  post,
  onConfirm,
  loading = false,
}: UnlockContentModalProps) => {

  const [cards, setCards] = useState<any[]>([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "card">(
    "wallet",
  );
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
            <CgClose size={22} />
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
          <div>
            <label className="small">Payment Method</label>
            <div className="select_wrap">
              <label className="radio_wrap">
                <input type="radio" name="payment" value="wallet" checked={paymentMethod === "wallet"} onChange={() => setPaymentMethod("wallet")} />
                <img src="/images/icons/wallet_icons.svg" alt="wallet" className="icons" />
                <p>Pay With Wallet</p>
              </label>

              <label className="radio_wrap">
                <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
                <img src="/images/icons/card_icons.svg" alt="card" className="icons" />
                <p>Pay With Credit/Debit Card</p>
              </label>
            </div>
          </div>
          {paymentMethod === "card" &&
            <div>
              <label className="small">Choose Payment Method*</label>
              <CustomSelect
                label="Select a Payment Card"
                placeholder="Select a Payment Card"
                value={selectedCard}
                options={cards.map((card) => ({
                  label: `${card.cardholderName} - **** ${card.cardNumber}`,
                  value: card._id,
                }))}
                onChange={(val: any) => {
                  console.log("SELECTED VALUE:", val);
                  setSelectedCard(val);
                }}
              />
            </div>
          }
          <div className="actions">
            <button className="premium-btn active-down-effect" onClick={() => onConfirm(paymentMethod)}disabled={loading}>
              <span>{loading ? "Processing..." : "Confirm to unlock"}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnlockContentModal;
