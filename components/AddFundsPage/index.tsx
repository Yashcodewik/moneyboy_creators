"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Featuredboys from "../Featuredboys";
import Link from "next/link";
import CustomSelect from "../CustomSelect";
import { BsBank2 } from "react-icons/bs";
import { useSearchParams } from "next/navigation";
// import {CreditCard, useCreditCard,} from "credit-card-ui-react";
import "credit-card-ui-react/styles.css";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";
import {
  API_ADD_CARD,
  API_ADD_WALLET,
  API_GET_CARDS,
  API_GET_WALLET,
} from "@/utils/api/APIConstant";
import ShowToast from "../common/ShowToast";

const CreditCard = dynamic(
  () => import("credit-card-ui-react").then((m) => m.CreditCard),
  { ssr: false },
);

const AddFundsPage = () => {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [cards, setCards] = useState<any[]>([]);
  const [loadingCards, setLoadingCards] = useState(false);
  const [tab, setTab] = useState(tabParam === "addfunds" ? 2 : 1);
  const [amount, setAmount] = useState<number | "">("");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [loadingAddMoney, setLoadingAddMoney] = useState(false);
  const [amountError, setAmountError] = useState<string>("");
  const [flipped, setFlipped] = useState(false);

  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "expiry") {
      // Allow only numbers
      let formattedValue = value.replace(/\D/g, "");

      // Add slash automatically after 2 digits
      if (formattedValue.length >= 3) {
        formattedValue =
          formattedValue.slice(0, 2) + "/" + formattedValue.slice(2, 4);
      }

      // Limit to MM/YY (5 chars)
      formattedValue = formattedValue.slice(0, 5);

      setCardData((prev) => ({ ...prev, expiry: formattedValue }));
      return;
    }

    if (name === "cvc") {
      // Only numbers, max 4 digits
      const cvcValue = value.replace(/\D/g, "").slice(0, 4);
      setCardData((prev) => ({ ...prev, cvc: cvcValue }));
      return;
    }

    if (name === "number") {
      // Only numbers, auto space every 4 digits
      let cardValue = value.replace(/\D/g, "").slice(0, 16);
      cardValue = cardValue.replace(/(.{4})/g, "$1 ").trim();
      setCardData((prev) => ({ ...prev, number: cardValue }));
      return;
    }

    // Default behavior (for name field)
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    setLoadingCards(true);

    const res = await getApiWithOutQuery({
      url: API_GET_CARDS,
    });

    if (res?.success) {
      setCards(res.data);
    }

    setLoadingCards(false);
  };

  const handleAddCard = async (e: any) => {
    if (!cardData.number || !cardData.expiry) {
      ShowToast("Enter card details", "error");
      return;
    }

    const [month, year] = cardData.expiry.split("/");

    const res = await apiPost({
      url: API_ADD_CARD,
      values: {
        cardholderName: cardData.name,
        cardNumber: cardData.number.replace(/\s/g, ""),
        expMonth: Number(month),
        expYear: Number("20" + year),
      },
    });

    if (res?.success) {
      ShowToast(res.message, "success");

      setCardData({
        name: "",
        number: "",
        expiry: "",
        cvc: "",
      });

      fetchCards(); // refresh cards
    } else {
      ShowToast(res?.message || "Failed to add card", "error");
    }
  };

  const handleAddMoney = async () => {
    if (!amount || Number(amount) < 10) {
      // ShowToast("Minimum top up amount $10", "error");
      return;
    }

    if (!selectedCard) {
      ShowToast("Please select payment method", "error");
      return;
    }

    setLoadingAddMoney(true);

    const res = await apiPost({
      url: API_ADD_WALLET,
      values: {
        amount: Number(amount),
        paymentMethod: selectedCard,
      },
    });

    if (res?.success) {
      ShowToast(res.message, "success");
      setBalance(res.balance);
      setAmount("");
      setSelectedCard(null);
      setAmountError("");
    } else {
      ShowToast(res?.message || "Failed to add money", "error");
    }

    setLoadingAddMoney(false);
  };

  const fetchWalletBalance = async () => {
    const res = await getApiWithOutQuery({
      url: API_GET_WALLET,
    });

    if (res?.success) {
      setBalance(res.balance);
    }
  };
  useEffect(() => {
    fetchCards();
    fetchWalletBalance();
  }, []);
  const calculatedTotal =
    balance + (amount && !isNaN(Number(amount)) ? Number(amount) : 0);
  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
        <div
          className="moneyboy-feed-page-container moneyboy-diff-content-wrappers"
          data-scroll-zero
          data-multiple-tabs-section
          data-identifier="1"
        >
          <div
            className="moneyboy-feed-page-cate-buttons card"
            id="posts-tabs-btn-card"
          >
            {/* <button className="cate-back-btn active-down-effect">
                <span className="icons arrowLeft"></span>
              </button> */}
            <button
              className={`page-content-type-button active-down-effect ${tab === 1 ? "active" : ""}`}
              onClick={() => setTab(1)}
            >
              Add Payment Method
            </button>
            <button
              className={`page-content-type-button active-down-effect ${tab === 2 ? "active" : ""}`}
              onClick={() => setTab(2)}
            >
              Add funds
            </button>
          </div>
          <div className="tabs-content-wrapper-layout">
            <div data-multi-dem-cards-layout>
              {/* ========== Add Payment Method ========== */}
              {tab === 1 && (
                <div className="creator-content-filter-grid-container">
                  <div className="card filters-card-wrapper">
                    <div className="creator-content-cards-wrapper rqstpayout_containt addfunds">
                      <img
                        src="/images/cards_img.png"
                        className="img-fluid cardicon"
                      />
                      {/* +============= */}
                      <div>
                        <label>Cardholder Name</label>
                        <div className="label-input">
                          <input
                            type="text"
                            name="name"
                            placeholder="Cardholder Name"
                            value={cardData.name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div>
                        <label>Card Number</label>
                        <div className="label-input">
                          <input
                            type="tel"
                            name="number"
                            placeholder="Card Number"
                            value={cardData.number}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="grid grid-2">
                        <div>
                          <label>Expiry Date</label>
                          <div className="label-input">
                            <input
                              type="text"
                              name="expiry"
                              placeholder="MM/YY"
                              value={cardData.expiry}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div>
                          <label>CVC</label>
                          <div className="label-input">
                            <input
                              type="tel"
                              name="cvc"
                              placeholder="CVC"
                              maxLength={3}
                              value={cardData.cvc}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                setCardData((prev) => ({
                                  ...prev,
                                  cvc: value,
                                }));
                              }}
                              onFocus={() => setFlipped(true)}
                              onBlur={() => setFlipped(false)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="btm_btn">
                        <button
                          className="btn-txt-gradient"
                          onClick={handleAddCard}
                        >
                          <span>Add card</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card filters-card-wrapper">
                    <div className="creator-content-cards-wrapper rqstpayout_containt addfunds">
                      <h3>You can add up to 10 cards</h3>
                      {/* <img src="/images/cardimg.png" className="img-fluid w-max"/> */}
                      <div className="bankcard_wrapper">
                        {/* Live Preview Card (New Card Being Added) */}
                        {cardData.number && (
                          <CreditCard
                            brand="visa"
                            size="sm"
                            isFlipped={flipped}
                            gradient={{
                              type: "grain",
                              colors: [
                                "#22c55e55",
                                "#7300ff44",
                                "#eba8ff33",
                                "#00bfff44",
                              ],
                              colorBack: "#000000",
                              softness: 0.55,
                              intensity: 0.35,
                              noise: 0.12,
                            }}
                            cardNumber={cardData.number}
                            cardholderName={cardData.name}
                            expiryDate={cardData.expiry}
                            cvv={cardData.cvc}
                            level="gold"
                          />
                        )}

                        {/* Saved Cards From API */}
                        {loadingCards ? (
                          <div className="loadingtext">
                            {"Loading".split("").map((char, i) => (
                              <span
                                key={i}
                                style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                              >
                                {char}
                              </span>
                            ))}
                          </div>
                        ) : cards.length > 0 ? (
                          cards.map((card, index) => (
                            <CreditCard
                              key={index}
                              brand="visa"
                              size="sm"
                              gradient={{
                                type: "grain",
                                colors: [
                                  "#1e293b",
                                  "#334155",
                                  "#475569",
                                  "#64748b",
                                ],
                                colorBack: "#000000",
                                softness: 0.55,
                                intensity: 0.35,
                                noise: 0.12,
                              }}
                              cardNumber={`**** **** **** ${card.cardNumber}`}
                              cardholderName="Saved Card"
                              expiryDate={`${card.expMonth}/${String(card.expYear).slice(-2)}`}
                              cvv=""
                              level="classic"
                            />
                          ))
                        ) : (
                          <p className="nodeta">No saved cards yet</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* ========== Add funds ========== */}
              {tab === 2 && (
                <div className="creator-content-filter-grid-container">
                  <div className="card filters-card-wrapper">
                    <div className="creator-content-cards-wrapper rqstpayout_containt p-0 bg-white addfunds">
                      <div className="curntblc_wrap">
                        <svg className="icons currencyCircle size-45" />
                        <div className="text_wrap">
                          <p>Current Balance</p>
                          <h3>${balance.toFixed(2)}</h3>
                        </div>
                      </div>
                      <div className="note_wrap">
                        <p>
                          Your MoneyBoy Wallet is the easiest way to manage your
                          payments on the platform. Use your balance to send
                          tips, unlock content, and purchase media directly from
                          creators.
                        </p>
                        <p>
                          You can top up your wallet anytime to keep enjoying
                          seamless access to your favorite MoneyBoys and
                          exclusive content.
                        </p>
                      </div>
                      <div className="rqstpayout_containt p-14">
                        <div>
                          <label>Enter Amount *</label>
                          <div className="label-input">
                            <input
                              type="number"
                              placeholder="Enter Amount"
                              value={amount}
                           onChange={(e) => {
  const rawValue = e.target.value;

  if (rawValue === "") {
    setAmount("");
    setAmountError("Amount is required");
    return;
  }

  const value = Number(rawValue);
  setAmount(value);

  if (value < 10) {
    setAmountError("Minimum top up amount is $10");
  } else if (value > 1000) {
    setAmountError("Maximum top up amount is $1000");
  } else {
    setAmountError("");
  }
}}
                            />
                          </div>

                          {amountError && (
                            <p className="error-message">{amountError}</p>
                          )}
                        </div>
                        {/* <label className="font-light mb-0">
                            Minimum top up amount $10{" "}
                            <span className="block">
                              Maximum top up wallet amount $1000
                            </span>
                          </label> */}
                        <div>
                          <label>Choose Payment Method*</label>

                          {loadingCards ? (
                              <div className="loadingtext">
                            {"Loading".split("").map((char, i) => (
                              <span
                                key={i}
                                style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                              >
                                {char}
                              </span>
                            ))}
                          </div>
                          ) : cards && cards.length > 0 ? (
                            <CustomSelect
                              label="Select a Payment Card"
                              placeholder="Select a Payment Card"
                              value={selectedCard} // ✅ ADD THIS
                              options={cards.map((card) => ({
                                label: `${card.cardholderName} - **** ${card.cardNumber}`,
                                value: card._id,
                              }))}
                              onChange={(val: any) => {
                                console.log("SELECTED VALUE:", val);
                                setSelectedCard(val);
                              }}
                            />
                          ) : (
                            <div className="no-card-wrapper">
                              <p className="nodeta">No saved cards found.</p>
                              <button
                                type="button"
                                className="btn-txt-gradient"
                                onClick={() => setTab(1)}
                              >
                                <span>Add Card</span>
                              </button>
                            </div>
                          )}
                        </div>
                        {/* <div className="couponcode_wraping">
                            <p>Enter Coupon Code Here</p>
                            <button className="btn-gray">Apply</button>
                          </div> */}
                        <div className="total_wrap bg-gray px-0">
                          <p>
                            Total: <b>${calculatedTotal.toFixed(2)}</b>
                          </p>
                          <button
                            className="btn-txt-gradient"
                            onClick={handleAddMoney}
                            disabled={loadingAddMoney}
                          >
                            <span>
                              {loadingAddMoney ? "Processing..." : "Buy Now"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Featuredboys />
    </div>
  );
};

export default AddFundsPage;
