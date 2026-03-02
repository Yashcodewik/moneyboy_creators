import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";
import {
  API_CREATE_UPDATE_SUBSCRIPTION,
  API_GET_MY_SUBSCRIPTION,
} from "@/utils/api/APIConstant";
import ShowToast from "../common/ShowToast";
import { GoDotFill } from "react-icons/go";
import { showError, showSuccess } from "@/utils/alert";

const PricingSetting = () => {
  const [subscription, setSubscription] = useState({
    monthlyPrice: "",
    yearlyPrice: "",
    ppvVideoPrice: "",
    ppvPhotoPrice: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    const res = await getApiWithOutQuery({
      url: API_GET_MY_SUBSCRIPTION,
    });

    if (res?.success && res?.data) {
      setSubscription({
        monthlyPrice: res.data.monthlyPrice ?? "",
        yearlyPrice: res.data.yearlyPrice ?? "",
        ppvVideoPrice: res.data.ppvVideoPrice ?? "",
        ppvPhotoPrice: res.data.ppvPhotoPrice ?? "",
      });
    }
  };

  const subscriptionFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      monthlyPrice: subscription.monthlyPrice,
      yearlyPrice: subscription.yearlyPrice,
      ppvVideoPrice: subscription.ppvVideoPrice,
      ppvPhotoPrice: subscription.ppvPhotoPrice,
    },
    validationSchema: Yup.object({
      monthlyPrice: Yup.number()
        .required("Monthly price is required")
        .min(1, "Must be greater than 0"),

      yearlyPrice: Yup.number()
        .required("Yearly price is required")
        .min(1, "Must be greater than 0"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const res = await apiPost({
          url: API_CREATE_UPDATE_SUBSCRIPTION,
          values: {
            monthlyPrice: Number(values.monthlyPrice),
            yearlyPrice: Number(values.yearlyPrice),
            ppvVideoPrice: Number(values.ppvVideoPrice),
            ppvPhotoPrice: Number(values.ppvPhotoPrice),
          },
        });

        if (res?.success) {
          await fetchSubscription();
          showSuccess("Subscription updated successfully");
        } else {
          showError(res?.message || "Failed to update subscription");
        }
      } catch (err: any) {
        showError(err?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={subscriptionFormik.handleSubmit}>
      <div className="creator-profile-card-container">
        <div className="card filters-card-wrapper">
          <div className="creator-content-cards-wrapper pricing_account_wrap">
            <div className="subtop_cont">
              <h3>Subscription</h3>
              <button className="btn-primary">
                <GoDotFill size={20} /> <span>Paid Subscriptions</span>
              </button>
            </div>
            <div className="form_grid">
              <div className="one">
                <label>Monthly Subscription Price*</label>
                  {/* <span className="currency">$</span> */}
                <div className="label-input">
                  <input
                    type="number"
                    name="monthlyPrice"
                    value={subscriptionFormik.values.monthlyPrice}
                    onChange={subscriptionFormik.handleChange}
                    onBlur={subscriptionFormik.handleBlur}
                  />
                </div>
                {subscriptionFormik.touched.monthlyPrice &&
                  subscriptionFormik.errors.monthlyPrice && (
                    <span className="error-message">
                      {subscriptionFormik.errors.monthlyPrice}
                    </span>
                  )}
              </div>

              <div className="one">
                <label>Yearly Subscription Price*</label>
                <div className="label-input">
                  <input
                    type="number"
                    name="yearlyPrice"
                    value={subscriptionFormik.values.yearlyPrice}
                    onChange={subscriptionFormik.handleChange}
                    onBlur={subscriptionFormik.handleBlur}
                  />
                </div>
                {subscriptionFormik.touched.yearlyPrice &&
                  subscriptionFormik.errors.yearlyPrice && (
                    <span className="error-message">
                      {subscriptionFormik.errors.yearlyPrice}
                    </span>
                  )}
              </div>
              {/* <hr></hr>
              <h6>Minimum price for custom PPV requests. This is the starting amount fans must pay to request personalized content</h6> */}
              <div className="one">
                <label>PPV Request - Custom video</label>
                <div className="label-input">
                  <input
                    type="number"
                    name="ppvVideoPrice"
                    value={subscriptionFormik.values.ppvVideoPrice}
                    onChange={subscriptionFormik.handleChange}
                  />
                </div>
              </div>

              <div className="one">
                <label>PPV Request - Custom Photo</label>
                <div className="label-input">
                  <input
                    type="number"
                    name="ppvPhotoPrice"
                    value={subscriptionFormik.values.ppvPhotoPrice}
                    onChange={subscriptionFormik.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="btm_btn">
              <button
                type="submit"
                className={`premium-btn active-down-effect ${loading ? "disabled" : ""}`}
                disabled={loading}
              >
                <span>{loading ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PricingSetting;
