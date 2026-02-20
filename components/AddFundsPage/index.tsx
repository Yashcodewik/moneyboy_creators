"use client";
import React, { useState } from "react";
import Featuredboys from "../Featuredboys";
import Link from "next/link";
import CustomSelect from "../CustomSelect";
import { BsBank2 } from "react-icons/bs";
import { useSearchParams } from "next/navigation";

const AddFundsPage = () => {
  const searchParams = useSearchParams();
const tabParam = searchParams.get("tab");

const [tab, setTab] = useState(
  tabParam === "addfunds" ? 2 : 1
);

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
              className={`page-content-type-button active-down-effect ${
                tab === 1 ? "active" : ""
              }`}
              onClick={() => setTab(1)}
            >
              Add Payment Method
            </button>
            <button
              className={`page-content-type-button active-down-effect ${
                tab === 2 ? "active" : ""
              }`}
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
                      <div>
                        <label>Card Number</label>
                        <div className="label-input">
                          <input type="number" placeholder="Card Number" />
                        </div>
                      </div>
                      <div className="grid grid-2">
                        <div>
                          <label>Exp Date</label>
                          <div className="label-input">
                            <input type="date" placeholder="Exp Date" />
                          </div>
                        </div>
                        <div>
                          <label>CVC</label>
                          <div className="label-input">
                            <input type="number" placeholder="Exp Date" />
                          </div>
                        </div>
                      </div>
                      <div className="btm_btn">
                        <button className="btn-txt-gradient">
                          <span>Add card</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card filters-card-wrapper">
                    <div className="creator-content-cards-wrapper rqstpayout_containt addfunds">
                      <h3>You can add up to 10 cards</h3>
                      <img
                        src="/images/cardimg.png"
                        className="img-fluid w-max"
                      />
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
                          <h3>$10025.36</h3>
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
                            <input type="number" placeholder="Enter Amount" />
                          </div>
                        </div>
                          <label className="font-light mb-0">
                            Minimum top up amount $10{" "}
                            <span className="block">
                              Maximum top up wallet amount $1000
                            </span>
                          </label>
                        <div>
                          <label>Choose Payment Method*</label>
                          <CustomSelect
                            label="Select a Payment Card"
                            placeholder="Select a Payment Card"
                            options={[
                              { label: "options 1", value: "options1" },
                              { label: "options 2", value: "options2" },
                            ]}
                          />
                        </div>
                        <div className="couponcode_wraping">
                          <p>Enter Coupon Code Here</p>
                          <button className="btn-gray">Apply</button>
                        </div>
                        <div className="total_wrap bg-gray px-0">
                          <p>
                            Total: <b>350.00</b>
                          </p>
                          <button className="btn-txt-gradient">
                            <span>Buy Now</span>
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
