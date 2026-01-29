"use client";

import { CgClose } from "react-icons/cg";

const PromoteModal = ({onClose}: {onClose: () => void}) => {

  return (
    <>
     <div
        className="modal show"
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-modal-title"
      >
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
              credit card.”
            </p>
          </div>
          <div className="select_wrap grid2">
            <label className="radio_wrap box_select">
              <input type="radio" name="access" />
              <h3>3 Days</h3>
              <p>$9.99 /day</p>
            </label>
            <label className="radio_wrap box_select">
              <input type="radio" name="access" />
              <h3>7 Days</h3>
              <p>$7.99 /day</p>
            </label>
            <label className="radio_wrap box_select">
              <input type="radio" name="access" />
              <h3>14 Days</h3>
              <p>$5.99 /day</p>
            </label>
            <label className="radio_wrap box_select">
              <input type="radio" name="access" />
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
              <input type="radio" name="access" />{" "}
              <img src="/images/icons/wallet_icons.svg" className="icons" />{" "}
              <p>Pay with wallet</p>
            </label>
            <label className="radio_wrap">
              <input type="radio" name="access" />{" "}
              <img src="/images/icons/card_icons.svg" className="icons" />{" "}
              <p>Pay with credit/debit card</p>
            </label>
          </div>
          <div className="actions">
            <button className="premium-btn active-down-effect">
              <span>Confirm & Promote</span>
            </button>
            <button className="active-down-effect" onClick={onClose}>
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromoteModal;
