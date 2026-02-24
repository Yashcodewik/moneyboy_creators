"use client";
import React from 'react'
import Featuredboys from '../Featuredboys';
import Link from 'next/link';
import CustomSelect from '../CustomSelect';
import { BsBank2 } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import { IoArrowBackOutline } from 'react-icons/io5';

const RequestPayoutPage = () => {
  const router = useRouter();
  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
        <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers" data-scroll-zero data-multiple-tabs-section data-identifier="1">
            {/* <div className="moneyboy-feed-page-cate-buttons card show_mobail" id="posts-tabs-btn-card">
              <button className="cate-back-btn active-down-effect" onClick={() => router.back()}><span className="icons arrowLeft"></span></button>
              <button className="page-content-type-button active-down-effect active">Request a Payout</button>
            </div> */}
            <div className="moneyboy-feed-page-cate-buttons card hide_mobile" id="posts-tabs-btn-card">
              <button className="cate-back-btn active-down-effect" onClick={() => router.push("/feed")}><IoArrowBackOutline className="icons" /></button>

                  {/* <button
            className="btn-txt-gradient btn-outline"
            onClick={() => router.push("/feed")}
          >
            <IoArrowBackOutline className="icons" />
          </button> */}
              <button className="page-content-type-button active-down-effect active max-w-50">Request a Payout</button>
            </div>
            <div className="tabs-content-wrapper-layout">
              <div data-multi-dem-cards-layout>
                <div className="creator-content-filter-grid-container">
                  <div className="card filters-card-wrapper">
                   <div className="creator-content-cards-wrapper rqstpayout_containt">
                    <div className="history_wrap">
                      <div className="rline">
                        <p>Total Earned</p>
                        <h3>$ 1,598.61</h3>
                      </div>
                      <div className="rline">
                        <p>Withdrew</p>
                        <h3>$ 150.00</h3>
                      </div>
                      <div className="">
                        <p>Wallet Balance</p>
                        <h3>$ 1,429.42</h3>
                      </div>
                    </div>
                    <div>
                      <label>Requested amount</label>
                      <div className="label-input">
                        <input type="number" placeholder="111" name="city"/>
                      </div>
                    </div>
                    <div>
                      <label>Note to admin</label>
                      <div className="label-input">
                        <textarea rows={3} placeholder="Lorem ipsum"></textarea>
                      </div>
                    </div>
                    <div>
                    <CustomSelect label="Banking" placeholder="Banking" icon={<BsBank2 size={14} />}
                      options={[
                        { label: "options 1", value: "options1" },
                        { label: "options 2", value: "options2" },
                      ]}/>
                    </div>
                    <div className="btm_btn">
                      <button className="btn-txt-gradient"><span>Submit</span></button>
                      <button className="btn-danger">Cancel</button>
                    </div>
                   </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>

      <Featuredboys />
    </div>
  )
}

export default RequestPayoutPage;