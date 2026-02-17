"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import OtpModal from "@/components/OtpModal";
import { apiPost } from "@/utils/endpoints/common";
import { API_FORGOT_PASSWORD, API_RESET_PASSWORD, API_VERIFY_RESET_OTP } from "@/utils/api/APIConstant";
import ShowToast from "@/components/common/ShowToast";

const ForgotPassword = () => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
const [otpVerified, setOtpVerified] = useState(false);
const [otpCode, setOtpCode] = useState("");
  const validationSchema = Yup.object({
    email: Yup.string() .email("Enter valid email") .required("Email is required"),
    newPassword: Yup.string().when([], {
      is: () => showChangePassword,
      then: (schema) =>
        schema
          .min(6, "Password must be at least 6 characters")
          .required("New password is required"),
    }),

    confirmPassword: Yup.string().when([], {
      is: () => showChangePassword,
      then: (schema) =>
        schema
          .oneOf([Yup.ref("newPassword")], "Passwords must match")
          .required("Confirm password is required"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    enableReinitialize: true,
onSubmit: async (values, { setSubmitting }) => {
  setSubmitting(true);

  try {
    // STEP 1 → Send OTP
    if (!showChangePassword) {
      const res = await apiPost({
        url: API_FORGOT_PASSWORD,
        values: { email: values.email },
      });

      if (res?.success) {
        ShowToast(res.message, "success");
        setOtpOpen(true);
      } else {
        ShowToast(res?.message || "Failed to send OTP", "error");
      }

      setSubmitting(false);
      return;
    }

    // STEP 2 → Reset password (OTP verified here)
    const res = await apiPost({
      url: API_RESET_PASSWORD,
      values: {
        email: values.email,
        otp: otpCode,
        password: values.newPassword,
        confirmPassword: values.confirmPassword,
      },
    });

    if (res?.success) {
      ShowToast(res.message, "success");
      router.push("/login");
    } else {
      ShowToast(res?.message || "Reset failed", "error");

      // 👇 if OTP wrong or expired → reopen modal
      if (res?.message?.toLowerCase().includes("otp")) {
        setOtpOpen(true);
        setShowChangePassword(false);
      }
    }
  } catch (err) {
    ShowToast("Something went wrong", "error");
  }

  setSubmitting(false);
},


  });

const handleOtpSubmit = async (otp: string) => {
  if (otp.length !== 6) {
    ShowToast("Enter valid OTP", "error");
    return;
  }

  try {
    const res = await apiPost({
      url: API_VERIFY_RESET_OTP,
      values: {
        email: formik.values.email,
        otp,
      },
    });

    if (res?.success) {
      setOtpCode(otp);
      setOtpOpen(false);
      setShowChangePassword(true);

      ShowToast("OTP verified", "success");
    }
  } catch (err: any) {
    ShowToast(err?.response?.data?.message || "Invalid OTP", "error");
  }
};



  return (
    <div className="container login_wrap lg_wrap">
      <div className="img_wrap">
        <img src="/images/loginflowimg.png" className="login_imgwrap" />
        <div className="backicons">
          <button className="btn-txt-gradient btn-outline" onClick={() => router.push("/feed")}><IoArrowBackOutline className="icons" /></button>
        </div>
      </div>
      <div className="moneyboy-feed-page-container cont_wrap justify-center">
        <div className="main_cont">
          <img src="/images/logo.svg" className="logo_wrap" />
          <form onSubmit={formik.handleSubmit}>
            {/* RESET PASSWORD */}
            {!showChangePassword && (
              <div className="moneyboy-post__container card">
                <h3 className="heading">Reset Password</h3>
                <p>Enter your email to reset your password.</p>
                <div className="form_grid">
                  <div className="one">
                    <div className="label-input">
                      <div className="input-placeholder-icon"><i className="icons message svg-icon"></i></div>
                      <input type="email" name="email" placeholder="Enter Email Address *" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    </div>
                    {formik.touched.email && formik.errors.email && (<span className="error-message">{formik.errors.email}</span>)}
                  </div>
                  <div className="recaptcha one">
                    Add Recaptcha
                  </div>
                </div>
                <button type="submit" className="premium-btn mb-0"><span>Send OTP</span></button>
              </div>
            )}
            {/* CHANGE PASSWORD */}
            {showChangePassword && (
              <div className="moneyboy-post__container card">
                <h3 className="heading">Change Password</h3>
                <p>Enter and confirm your new password.</p>
                <div className="form_grid">
                  <div className="one">
                    <div className="label-input password">
                      <div className="input-placeholder-icon"><i className="icons lock svg-icon"></i></div>
                      <input type={showPass ? "text" : "password"} name="newPassword" placeholder="New Password" value={formik.values.newPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                      <span onClick={() => setShowPass(!showPass)} className="input-placeholder-icon eye-icon"><i className={`icons ${showPass ? "eye" : "eye-slash"} svg-icon`}></i></span>
                    </div>
                    {formik.touched.newPassword && formik.errors.newPassword && (<span className="error-message">{formik.errors.newPassword}</span>)}
                  </div>
                  <div className="one">
                    <div className="label-input password">
                      <div className="input-placeholder-icon"><i className="icons lock svg-icon"></i></div>
                      <input type={showConfirmPass ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                      <span onClick={() => setShowConfirmPass(!showConfirmPass)} className="input-placeholder-icon eye-icon">
                        <i className={`icons ${showConfirmPass ? "eye" : "eye-slash"} svg-icon`}></i>
                      </span>
                    </div>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (<span className="error-message">{formik.errors.confirmPassword}</span>)}
                  </div>
                </div>
                <button type="submit" className="premium-btn mb-0"><span>Update Password</span></button>
              </div>
            )}
          </form>
        </div>
      </div>
      <OtpModal
  open={otpOpen}
  onClose={() => setOtpOpen(false)}
  onSubmit={handleOtpSubmit}
  email={formik.values.email}
/>
    </div>

    
  );
};

export default ForgotPassword;