"use client";
import { useState } from "react";
import Featuredboys from '../Featuredboys';
import CustomSelect from '../CustomSelect';
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

const BankingPage = () => {
  return (
      <div className="moneyboy-2x-1x-layout-container">
        <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
          <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers" data-scroll-zero data-multiple-tabs-section data-identifier="1">
            <div className="moneyboy-feed-page-cate-buttons card" id="posts-tabs-btn-card">
              <button className="page-content-type-button active-down-effect active"><svg className="icons storeBox"/>Bank transfer</button>
              <button className="page-content-type-button active-down-effect"><svg className="icons paypal"></svg></button>
            </div>
            <div className="creator-content-filter-grid-container">
              <div className="card filters-card-wrapper">
                <div className="creator-content-cards-wrapper rqstpayout_containt bank_pay_wrap">
                <div className="label-input">
                  <div className="input-placeholder-icon"><i className="icons user svg-icon"></i></div>
                  <input type="text" placeholder="First Name *" />
                </div>
                <div className="label-input">
                  <div className="input-placeholder-icon"><i className="icons user svg-icon"></i></div>
                  <input type="text" placeholder="Last name *" />
                </div>
                <div className="label-input">
                  <div className="input-placeholder-icon"><i className="icons bank svg-icon"></i></div>
                  <input type="text" placeholder="Bank name *" />
                </div>
                <div className="label-input">
                  <div className="input-placeholder-icon"><i className="icons bankAccount svg-icon"></i></div>
                  <input type="text" placeholder="Bank account *" />
                </div>
                <CustomSelect label="United States of America *" searchable={false}
                  icon={<img src="/images/united_flag.png" className="svg-icon"/>}
                  options={[
                    { label: "Options 1", value: "Options1" },
                    { label: "Options 2", value: "Options2" },
                  ]}/>
                <CustomSelect label="State" searchable={false}
                  icon={<svg className="icons building svg-icon" />}
                  options={[
                    { label: "Options 1", value: "Options1" },
                    { label: "Options 2", value: "Options2" },
                  ]}/>
                <CustomSelect label="City *" searchable={false}
                  icon={<svg className="icons locationIcon svg-icon" />}
                  options={[
                    { label: "Options 1", value: "Options1" },
                    { label: "Options 2", value: "Options2" },
                  ]}/>
                <div className="label-input">
                  <div className="input-placeholder-icon"><i className="icons home svg-icon"></i></div>
                  <input type="text" placeholder="Address" />
                </div>
                <div className="label-input">
                  <div className="input-placeholder-icon"><i className="icons swapHorizontal svg-icon"></i></div>
                  <input type="text" placeholder="Bank routing" />
                </div>
                <div className="label-input">
                  <div className="input-placeholder-icon"><i className="icons cardLock svg-icon"></i></div>
                  <input type="text" placeholder="Bank swift code" />
                </div>
                  <div className="btm_btn">
                    <button className="btn-txt-gradient"><span>Save Changes</span></button>
                  </div>
                </div>
              </div>
              <div className="card filters-card-wrapper">
                123
              </div>
            </div>
          </div>
        </div>
        <Featuredboys />
      </div>
  )
}

export default BankingPage;
