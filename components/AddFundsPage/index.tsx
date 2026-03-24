"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Featuredboys from "../Featuredboys";
import Link from "next/link";
import CustomSelect from "../CustomSelect";
import { BsBank2 } from "react-icons/bs";
import { useRouter, useSearchParams } from "next/navigation";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addWalletFunds, fetchWallet } from "@/redux/wallet/Action";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreditCard = dynamic(
  () => import("credit-card-ui-react").then((m) => m.CreditCard),
  { ssr: false },
);

const AddFundsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [cards, setCards] = useState<any[]>([]);
  const [loadingCards, setLoadingCards] = useState(false);
  const [tab, setTab] = useState(1);

  const [amount, setAmount] = useState<number | "">("");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const [amountError, setAmountError] = useState<string>("");
  const [flipped, setFlipped] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { balance, loading, addingFunds } = useSelector(
    (state: RootState) => state.wallet,
  );

  const cardFormik = useFormik({
    initialValues: {
      name: "",
      number: "",
      expiry: "",
      cvc: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Cardholder name required"),
      number: Yup.string()
        .required("Card number required")
        .test("len", "Card number must be 16 digits", (val) => {
          return val?.replace(/\s/g, "").length === 16;
        }),
      expiry: Yup.string()
        .required("Expiry required")
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry (MM/YY)")
        .test("not-expired", "Card is expired", function (value) {
          if (!value) return false;

          const [month, year] = value.split("/");
          const expMonth = parseInt(month, 10);
          const expYear = parseInt("20" + year, 10);

          const now = new Date();
          const currentMonth = now.getMonth() + 1;
          const currentYear = now.getFullYear();

          if (expYear < currentYear) return false;
          if (expYear === currentYear && expMonth < currentMonth) return false;

          return true;
        }),

      cvc: Yup.string()
        .required("CVC required")
        .matches(/^\d{3}$/, "CVC must be 3 digits"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const [month, year] = values.expiry.split("/");

      const res = await apiPost({
        url: API_ADD_CARD,
        values: {
          cardholderName: values.name,
          cardNumber: values.number.replace(/\s/g, ""),
          expMonth: Number(month),
          expYear: Number("20" + year),
        },
      });

      if (res?.success) {
        ShowToast(res.message, "success");
        resetForm();
        fetchCards();
      } else {
        ShowToast(res?.message || "Failed", "error");
      }
    },
  });

  useEffect(() => {
    if (tabParam === "addfunds") {
      setTab(2);
    } else {
      setTab(1);
    }
  }, [tabParam]);

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

  const handleAddMoney = () => {
    if (!amount || Number(amount) < 10) {
      setAmountError("Minimum top up amount is $10");
      return;
    }

    if (!selectedCard) {
      ShowToast("Please select payment method", "error");
      return;
    }

    dispatch(
      addWalletFunds({
        amount: Number(amount),
        paymentMethod: selectedCard,
      }),
    );

    setAmount("");
    setSelectedCard(null);
    setAmountError("");
  };

  useEffect(() => {
    fetchCards();
    dispatch(fetchWallet());
  }, [dispatch]);
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
              className={`page-content-type-button ${tabParam !== "addfunds" ? "active" : ""}`}
              onClick={() => router.push("/add-funds?tab=addcard")}
            >
              Add Payment Method
            </button>

            <button
              className={`page-content-type-button ${tabParam === "addfunds" ? "active" : ""}`}
              onClick={() => router.push("/add-funds?tab=addfunds")}
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
                            value={cardFormik.values.name}
                            onChange={cardFormik.handleChange}
                            onBlur={cardFormik.handleBlur}
                          />
                        </div>
                        {cardFormik.touched.name && cardFormik.errors.name && (
                          <p className="error-message">
                            {cardFormik.errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label>Card Number</label>
                        <div className="label-input">
                          <input
                            type="text"
                            name="number"
                            maxLength={16}
                            value={cardFormik.values.number}
                            onChange={cardFormik.handleChange}
                          />
                        </div>
                        {cardFormik.errors.number && (
                          <p className="error-message">
                            {cardFormik.errors.number}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-2">
                        <div>
                          <label>Expiry Date</label>
                          <div className="label-input">
                            <input
                              type="text"
                              name="expiry"
                              value={cardFormik.values.expiry}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, "");

                                if (value.length >= 3) {
                                  value =
                                    value.slice(0, 2) + "/" + value.slice(2, 4);
                                }

                                cardFormik.setFieldValue(
                                  "expiry",
                                  value.slice(0, 5),
                                );
                              }}
                              onBlur={cardFormik.handleBlur}
                            />
                          </div>
                          {cardFormik.touched.expiry &&
                            cardFormik.errors.expiry && (
                              <p className="error-message">
                                {cardFormik.errors.expiry}
                              </p>
                            )}
                        </div>
                        <div>
                          <label>CVC</label>
                          <div className="label-input">
                            <input
                              type="text"
                              name="cvc"
                              value={cardFormik.values.cvc}
                              onChange={(e) => {
                                const value = e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 3);
                                cardFormik.setFieldValue("cvc", value);
                              }}
                              onBlur={cardFormik.handleBlur}
                            />
                          </div>

                          {cardFormik.touched.cvc && cardFormik.errors.cvc && (
                            <p className="error-message">
                              {cardFormik.errors.cvc}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="btm_btn">
                        <button
                          type="button"
                          className="btn-txt-gradient"
                          onClick={() => cardFormik.handleSubmit()}
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
                        {cardFormik.values.number && (
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
                            cardNumber={cardFormik.values.number}
                            cardholderName={cardFormik.values.name}
                            expiryDate={cardFormik.values.expiry}
                            cvv={cardFormik.values.cvc}
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
                                  setAmountError(
                                    "Minimum top up amount is $10",
                                  );
                                } else if (value > 1000) {
                                  setAmountError(
                                    "Maximum top up amount is $1000",
                                  );
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
                                  style={{
                                    animationDelay: `${(i + 1) * 0.1}s`,
                                  }}
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
                            disabled={addingFunds}
                          >
                            <span>
                              {addingFunds ? "Processing..." : "Buy Now"}
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
