"use client";
import { useEffect, useState } from "react";
import Featuredboys from "../Featuredboys";
import CustomSelect from "../CustomSelect";
import Link from "next/link";
import { CgClose } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { countryOptions } from "../helper/creatorOptions";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import * as Yup from "yup";
import { useFormik } from "formik";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";
import ShowToast from "../common/ShowToast";
import {
  API_BANK,
  API_BANK_DETAIL,
  API_PAYPAL,
  API_PAYPAL_DETAIL,
} from "@/utils/api/APIConstant";

countries.registerLocale(enLocale);

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name required"),
  lastName: Yup.string().required("Last name required"),
  bankName: Yup.string().required("Bank name required"),
  accountNumber: Yup.string()
    .matches(/^[0-9]+$/, "Must be numeric")
    .min(6, "Too short")
    .required("Account number required"),
  country: Yup.string().required("Country required"),
  city: Yup.string().required("City required"),
  state: Yup.string().required("State required"),
  address: Yup.string().required("Address required"),
  routingNumber: Yup.string().required("RoutingNumber required"),
  swiftCode: Yup.string().required("SwiftCode required"),
});

const BankingPage = () => {
  const [activeTab, setActiveTab] = useState("bank");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [savingPaypal, setSavingPaypal] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      bankName: "",
      accountNumber: "",
      country: "",
      state: "",
      city: "",
      address: "",
      routingNumber: "",
      swiftCode: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const res = await apiPost({
        url: API_BANK,
        values,
      });

      if (res?.success) {
        ShowToast(res.message, "success");
      } else {
        ShowToast(res?.message || "Failed to save", "error");
      }

      setSubmitting(false);
    },
  });

  // ✅ load saved bank details
  useEffect(() => {
    const loadBank = async () => {
      const res = await getApiWithOutQuery({
        url: API_BANK_DETAIL,
      });

      if (res?.data) {
        const {
          firstName,
          lastName,
          bankName,
          accountNumber,
          country,
          state,
          city,
          address,
          routingNumber,
          swiftCode,
        } = res.data;

        formik.setValues({
          firstName: firstName || "",
          lastName: lastName || "",
          bankName: bankName || "",
          accountNumber: accountNumber || "",
          country: country || "",
          state: state || "",
          city: city || "",
          address: address || "",
          routingNumber: routingNumber || "",
          swiftCode: swiftCode || "",
        });
      }
    };

    loadBank();
  }, []);

  useEffect(() => {
    const loadPaypal = async () => {
      const res = await getApiWithOutQuery({
        url: API_PAYPAL_DETAIL,
      });

      if (res?.data?.paypalEmail) {
        setPaypalEmail(res.data.paypalEmail);
      }
    };

    loadPaypal();
  }, []);

  const savePaypal = async () => {
    if (!paypalEmail) {
      ShowToast("Please enter PayPal email", "error");
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(paypalEmail)) {
      ShowToast("Invalid email format", "error");
      return;
    }

    setSavingPaypal(true);

    const res = await apiPost({
      url: API_PAYPAL,
      values: { paypalEmail },
    });

    if (res?.success) {
      ShowToast(res.message, "success");
    } else {
      ShowToast(res?.message || "Failed to save", "error");
    }

    setSavingPaypal(false);
  };

  const selectedCountry = formik.values.country;
  const countryCode = selectedCountry
    ? countries.getAlpha2Code(selectedCountry, "en")
    : null;
  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
        <div
          className="moneyboy-feed-page-container moneyboy-diff-content-wrappers"
          data-scroll-zero
          data-multiple-tabs-section
          data-identifier="1"
        >
          {/* <div className="moneyboy-feed-page-cate-buttons card" id="posts-tabs-btn-card">
              <button className="page-content-type-button active-down-effect active"><svg className="icons storeBox"/>Bank transfer</button>
              <button className="page-content-type-button active-down-effect"><img src="/images/paypal_icons.png" className="paypal_icons mx-auto"/></button>
            </div> */}
          <div
            className="moneyboy-feed-page-cate-buttons card"
            id="posts-tabs-btn-card"
          >
            <button
              className={`page-content-type-button active-down-effect ${activeTab === "bank" ? "active" : ""}`}
              onClick={() => setActiveTab("bank")}
            >
              <svg className="icons storeBox" />
              Bank transfer
            </button>
            <button
              className={`page-content-type-button active-down-effect ${activeTab === "paypal" ? "active" : ""}`}
              onClick={() => setActiveTab("paypal")}
            >
              <img
                src="/images/paypal_icons.png"
                className="paypal_icons mx-auto"
              />
            </button>
          </div>
          <div className="creator-content-filter-grid-container">
            {activeTab === "bank" && (
              <div className="card filters-card-wrapper">
                <form
                  onSubmit={formik.handleSubmit}
                  className="creator-content-cards-wrapper rqstpayout_containt bank_pay_wrap"
                >
                  <div className="creator-content-cards-wrapper rqstpayout_containt bank_pay_wrap">
                    <div className="label-input">
                      <div className="input-placeholder-icon">
                        <i className="icons user svg-icon"></i>
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name *"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <span className="error-message">
                      {formik.touched.firstName && formik.errors.firstName}
                    </span>
                    <div className="label-input">
                      <div className="input-placeholder-icon">
                        <i className="icons user svg-icon"></i>
                      </div>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name *"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <span className="error-message">
                      {formik.touched.lastName && formik.errors.lastName}
                    </span>
                    <div className="label-input">
                      <div className="input-placeholder-icon">
                        <i className="icons bank svg-icon"></i>
                      </div>
                      <input
                        type="text"
                        placeholder="Bank name *"
                        name="bankName"
                        value={formik.values.bankName}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <span className="error-message">
                      {formik.touched.bankName && formik.errors.bankName}
                    </span>
                    <div className="label-input">
                      <div className="input-placeholder-icon">
                        <i className="icons bankAccount svg-icon"></i>
                      </div>
                      <input
                        type="text"
                        name="accountNumber"
                        placeholder="Bank account *"
                        value={formik.values.accountNumber}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <span className="error-message">
                      {formik.touched.accountNumber &&
                        formik.errors.accountNumber}
                    </span>
                    <CustomSelect
                      label="Select Country *"
                      icon={
                        countryCode ? (
                          <div className="flag-circle">
                            <img
                              src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
                              alt="flag"
                            />
                          </div>
                        ) : (
                          <svg className="icons locationIcon svg-icon"></svg>
                        )
                      }
                      options={countryOptions}
                      value={formik.values.country}
                      onChange={(val) => formik.setFieldValue("country", val)}
                    />
                    <span className="error-message">
                      {formik.touched.country && formik.errors.country}
                    </span>

                    <div className="label-input">
                      <div className="input-placeholder-icon">
                        <svg className="icons building svg-icon" />
                      </div>

                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                      />
                    </div>

                    <span className="error-message">
                      {formik.touched.state && formik.errors.state}
                    </span>

                    {/* <CustomSelect
                      label="State"
                      searchable={false}
                      icon={<svg className="icons building svg-icon" />}
                      options={[
                        { label: "Options 1", value: "Options1" },
                        { label: "Options 2", value: "Options2" },
                      ]}
                    /> */}
                    {/* <CustomSelect
                      label="City *"
                      searchable={false}
                      icon={<svg className="icons locationIcon svg-icon" />}
                      options={[
                        { label: "Options 1", value: "Options1" },
                        { label: "Options 2", value: "Options2" },
                      ]}
                    /> */}

                    <div className="label-input">
                      <div className="input-placeholder-icon">
                        <svg className="icons locationIcon svg-icon" />
                      </div>

                      <input
                        type="text"
                        name="city"
                        placeholder="City *"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                      />
                    </div>

                    <span className="error-message">
                      {formik.touched.city && formik.errors.city}
                    </span>

                    <div className="label-input">
                      <div className="input-placeholder-icon">
                        <i className="icons home svg-icon"></i>
                      </div>
                      <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <span className="error-message">
                      {formik.touched.address && formik.errors.address}
                    </span>
                    <div className="label-input">
                      <div className="input-placeholder-icon">
                        <i className="icons swapHorizontal svg-icon"></i>
                      </div>
                      <input
                        type="text"
                        name="routingNumber"
                        placeholder="Bank routing"
                        value={formik.values.routingNumber}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <span className="error-message">
                      {formik.touched.routingNumber &&
                        formik.errors.routingNumber}
                    </span>
                    <div className="label-input">
                      <div className="input-placeholder-icon">
                        <i className="icons cardLock svg-icon"></i>
                      </div>
                      <input
                        type="text"
                        name="swiftCode"
                        placeholder="Bank swift code"
                        value={formik.values.swiftCode}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <span className="error-message">
                      {formik.touched.swiftCode && formik.errors.swiftCode}
                    </span>
                    <div className="btm_btn">
                      <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="btn-txt-gradient bigbtn"
                      >
                        <span>
                          {formik.isSubmitting ? "Saving..." : "Save Changes"}
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
            {/* {activeTab === "paypal" && (
              <div className="card filters-card-wrapper">
                <div className="creator-content-cards-wrapper rqstpayout_containt pay_wrap">
                  <p className="top_space">Paypal account email</p>
                  <div className="label-input">
                    <input type="text" placeholder="Sunilmuraya3@gmail.com" />
                  </div>
                  <div className="btm_btn">
                    <button className="btn-txt-gradient bigbtn">
                      <span>Submit</span>
                    </button>
                  </div>
                </div>
              </div>
            )} */}
            {activeTab === "paypal" && (
              <div className="card filters-card-wrapper">
                <div className="creator-content-cards-wrapper rqstpayout_containt pay_wrap">
                  <p className="top_space">Paypal account email</p>

                  <div className="label-input">
                    <input
                      type="email"
                      placeholder="Enter PayPal email"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}  
                    />
                  </div>

                  <div className="btm_btn">
                    <button
                      onClick={savePaypal}
                      disabled={savingPaypal}
                      className="btn-txt-gradient bigbtn"
                    >
                      <span>{savingPaypal ? "Saving..." : "Save PayPal"}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Featuredboys />
    </div>
  );
};

export default BankingPage;
