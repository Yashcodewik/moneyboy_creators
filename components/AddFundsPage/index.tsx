"use client";
import React from 'react'
import Featuredboys from '../Featuredboys';
import Link from 'next/link';
import CustomSelect from '../CustomSelect';
import { BsBank2 } from "react-icons/bs";

const AddFundsPage = () => {
  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
        <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers" data-scroll-zero data-multiple-tabs-section data-identifier="1">
          <div className="moneyboy-feed-page-cate-buttons card" id="posts-tabs-btn-card">
            <button className="cate-back-btn active-down-effect"><span className="icons arrowLeft"></span></button>
            <button className="page-content-type-button active-down-effect active">Add Payment Method</button>
            <button className="page-content-type-button active-down-effect active">Add funds</button>
          </div>
            <div className="tabs-content-wrapper-layout">
              <div data-multi-dem-cards-layout>
                <div className="creator-content-filter-grid-container">
                  <div className="card filters-card-wrapper">
                   <div className="creator-content-cards-wrapper rqstpayout_containt addfunds">
                    <img src="/images/cards_img.png" className="img-fluid cardicon"/>
                    <div>
                      <label>Card Number</label>
                      <div className="label-input">
                        <input type="number" placeholder="Card Number"/>
                      </div>
                    </div>
                    <div className="grid grid-2">
                      <div>
                        <label>Exp Date</label>
                        <div className="label-input">
                          <input type="date" placeholder="Exp Date"/>
                        </div>
                      </div>
                      <div>
                        <label>CVC</label>
                        <div className="label-input">
                          <input type="number" placeholder="Exp Date"/>
                        </div>
                      </div>
                    </div>
                    <div className="btm_btn">
                      <button className="btn-txt-gradient"><span>Add card</span></button>
                    </div>
                   </div>
                  </div>
                  <div className="card filters-card-wrapper">
                   <div className="creator-content-cards-wrapper rqstpayout_containt addfunds">
                     <h3>You can add up to 10 cards</h3>
                     <img src="/images/cardimg.png" className="img-fluid w-max"/>
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

export default AddFundsPage;