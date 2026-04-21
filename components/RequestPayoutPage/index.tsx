"use client";
import React, { useEffect, useState } from "react";
import Featuredboys from "../Featuredboys";
import CustomSelect from "../CustomSelect";
import { BsBank2 } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

import ShowToast from "@/components/common/ShowToast";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";
import {
  API_GET_TRANSACTIONS,
  API_PAYOUT_ACCOUNTS,
  API_REQUEST_PAYOUT,
  API_WALLET_SUMMARY,
} from "@/utils/api/APIConstant";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, useAppDispatch } from "@/redux/store";
import { fetchTransactions, fetchWallet } from "@/redux/wallet/Action";
import { deductBalance } from "@/redux/wallet/Slice";
import { CircleQuestionMark } from "lucide-react";
import { showError, showSuccess } from "@/utils/alert";

const RequestPayoutPage = () => {
  const router = useRouter();
  const [options, setOptions] = useState<any[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<any>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const { summary: InitialSummary } = useSelector((state: any) => state.wallet);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [summary, setSummary] = useState({
    walletBalance: 0,
    pendingPayout: 0,
    totalWithdrawn: 0,
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    const res = await getApiWithOutQuery({
      url: API_PAYOUT_ACCOUNTS,
    });

    if (res?.success) {
      const data = res.data;
      const opts: any[] = [];

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

  const walletBalance = InitialSummary?.walletBalance ?? summary.walletBalance;

  const isInvalidAmount =
    !amount || Number(amount) <= 0 || Number(amount) > walletBalance;

  const submitPayout = async () => {
    if (!amount || Number(amount) <= 0) {
      return showError("Enter valid amount");
    }

    if (Number(amount) > walletBalance) {
      return showError("Amount exceeds wallet balance");
    }

    if (!selectedMethod) {
      return showError("Select payout method");
    }

    try {
      setIsSubmitting(true);

      const res = await apiPost({
        url: API_REQUEST_PAYOUT,
        values: {
          amount: Number(amount),
          method: selectedMethod?.value || selectedMethod,
          note,
        },
      });

      if (res?.success) {
        dispatch(deductBalance(Number(amount)));
        showSuccess("Payout request submitted");

        dispatch(fetchTransactions({ getApiTab: () => API_GET_TRANSACTIONS }));
        dispatch(fetchWallet());

        setAmount("");
        setNote("");
        setSelectedMethod(null);
        loadSummary();
      } else {
        showError(res?.message || "Failed");
      }
    } catch (err) {
      showError("Something went wrong");
    } finally {
      setIsSubmitting(false); // 🔥 stop loader
    }
  };

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
            <button
              className="cate-back-btn active-down-effect"
              onClick={() => router.back()}
            >
              <IoArrowBackOutline className="icons" />
            </button>
            <button className="page-content-type-button active-down-effect active max-w-50">
              Request a Payout
            </button>
          </div>

          <div className="tabs-content-wrapper-layout">
            <div data-multi-dem-cards-layout>
              <div className="creator-content-filter-grid-container">
                <div className="card filters-card-wrapper">
                  <div className="creator-content-cards-wrapper rqstpayout_containt">
                    <div className="history_wrap">
                      {/* <div className="rline">
                        <p>Total Earned</p>
                        <h3>$ 0</h3>
                      </div> */}
                      <div className="small rline">
                        <div className="btntooltip_wrapper justify-center w-full">
                          <p className="flex items-center gap-5">Available Balance<button className="inline-flex" data-tooltip="Money ready to withdraw or use."> <CircleQuestionMark size={13} /></button></p>
                        </div>
                        <h3>$ {InitialSummary?.walletBalance?.toFixed(2) || summary.walletBalance.toFixed(2)}</h3>
                      </div>
                      <div className="small">
                        <div className="btntooltip_wrapper justify-center w-full">
                          <p className="flex items-center gap-5">Pending Earnings<button className="inline-flex left" data-tooltip="Processing earnings. Available soon."> <CircleQuestionMark size={13} /></button></p>
                        </div>
                        <h3 className="small">$ {InitialSummary?.pendingPayout?.toFixed(2) || summary.pendingPayout.toFixed(2)}</h3>
                      </div>
                    </div>
                    <div>
                      <label>Requested amount</label>
                      <div className="label-input">
                        <input type="number" placeholder="Enter the Value" value={amount} onChange={(e) => setAmount(e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <label>Note to admin</label>
                      <div className="label-input">
                        <textarea rows={3} placeholder="Note to admin (optional)" value={note} onChange={(e) => setNote(e.target.value)}></textarea>
                      </div>
                    </div>
                    <div>
                      <CustomSelect label="Banking" placeholder="Select payout method" icon={<BsBank2 size={14} />} options={options} value={selectedMethod} onChange={(val: any) => setSelectedMethod(val)} />
                    </div>
                    {Number(amount) > walletBalance && (
                      <p style={{ color: "red", fontSize: "12px" }}>Amount exceeds wallet balance</p>
                    )}

                    <div className="btm_btn">
                      {/* <button
                        className="btn-txt-gradient"
                        onClick={submitPayout}
                        disabled={isInvalidAmount}
                        style={{
                          opacity: isInvalidAmount ? 0.5 : 1,
                          cursor: isInvalidAmount ? "not-allowed" : "pointer",
                        }}
                      >
                        <span>Submit</span>
                      </button> */}
                      <button className="btn-txt-gradient" onClick={submitPayout} disabled={isInvalidAmount || isSubmitting} style={{ opacity: isInvalidAmount || isSubmitting ? 0.5 : 1, cursor: isInvalidAmount || isSubmitting ? "not-allowed" : "pointer", }}><span>{isSubmitting ? "Processing..." : "Submit"}</span></button>
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
  );
};

export default RequestPayoutPage;
