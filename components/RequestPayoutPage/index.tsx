"use client";
import React, { useEffect, useState } from 'react'
import Featuredboys from '../Featuredboys';
import CustomSelect from '../CustomSelect';
import { BsBank2 } from "react-icons/bs";
import { useRouter } from 'next/navigation';
import { IoArrowBackOutline } from 'react-icons/io5';


import ShowToast from "@/components/common/ShowToast";
import { apiPost, getApiWithOutQuery } from '@/utils/endpoints/common';
import { API_PAYOUT_ACCOUNTS, API_REQUEST_PAYOUT, API_WALLET_SUMMARY } from '@/utils/api/APIConstant';


const RequestPayoutPage = () => {
  const router = useRouter();

  const [options, setOptions] = useState<any[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const [summary, setSummary] = useState({
  walletBalance: 0,
  pendingPayout: 0,
  totalWithdrawn: 0,
});

  
  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    const res = await getApiWithOutQuery({
      url: API_PAYOUT_ACCOUNTS,
    });

    if (res?.success) {
      const data = res.data;
      const opts:any[] = [];

      if (data.bank) {
        opts.push({
          label: `Account: ${data.bank.bankName} ••••${data.bank.accountNumber}`,
          value: "bank",
        });
      }

      if (data.paypal) {
        opts.push({
          label: `PayPal: ${data.paypal}`,
          value: "paypal",
        });
      }

      setOptions(opts);
    }
  };

  const submitPayout = async () => {
    if (!amount || Number(amount) <= 0) {
      return ShowToast("Enter valid amount", "error");
    }

    if (!selectedMethod) {
      return ShowToast("Select payout method", "error");
    }

    const res = await apiPost({
      url: API_REQUEST_PAYOUT,
      values: {
        amount: Number(amount),
        method: selectedMethod?.value || selectedMethod,
        note,
      },
    });

    if (res?.success) {
      ShowToast("Payout request submitted", "success");
      setAmount("");
      setNote("");
      setSelectedMethod(null);
      loadSummary();
    } else {
      ShowToast(res?.message || "Failed", "error");
    }
  };
  const loadSummary = async () => {
  const res = await getApiWithOutQuery({
    url: API_WALLET_SUMMARY,
  });

  if (res?.success) {
    setSummary(res.data);
  }
};

  useEffect(() => {
  loadAccounts();
  loadSummary();
}, []);
  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
        <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers" data-scroll-zero data-multiple-tabs-section data-identifier="1">
            
            <div className="moneyboy-feed-page-cate-buttons card hide_mobile" id="posts-tabs-btn-card">
              <button className="cate-back-btn active-down-effect" onClick={() => router.push("/feed")}><IoArrowBackOutline className="icons" /></button>
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
                        <h3>$ 0</h3>
                      </div>
                      <div className="rline">
                        <p>Withdraw Review</p>
                         <h3>$ {summary.pendingPayout.toFixed(2)}</h3>
                      </div>
                      <div>
                        <p>Wallet Balance</p>
                        <h3>$ {summary.walletBalance.toFixed(2)}</h3>
                      </div>
                    </div>

                    <div>
                      <label>Requested amount</label>
                      <div className="label-input">
                        <input
                          type="number"
                          placeholder="Enter the Value"
                          value={amount}
                          onChange={(e)=>setAmount(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label>Note to admin</label>
                      <div className="label-input">
                        <textarea
                          rows={3}
                          placeholder="Lorem ipsum"
                          value={note}
                          onChange={(e)=>setNote(e.target.value)}
                        ></textarea>
                      </div>
                    </div>

                    <div>
                    <CustomSelect
                      label="Banking"
                      placeholder="Select payout method"
                      icon={<BsBank2 size={14} />}
                      options={options}
                      value={selectedMethod}
                      onChange={(val:any)=>setSelectedMethod(val)}
                    />
                    </div>

                    <div className="btm_btn">
                      <button className="btn-txt-gradient" onClick={submitPayout}>
                        <span>Submit</span>
                      </button>
                      {/* <button className="btn-danger" onClick={()=>router.back()}>
                        Cancel
                      </button> */}
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