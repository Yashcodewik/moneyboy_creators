"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IoArrowBackOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";

const ForgotPassword = () => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
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

      if (!showChangePassword) {
        // show change password section
        setShowChangePassword(true);
        setSubmitting(false);
        return;
      }

      // update password logic
      console.log("Password updated:", values);
      router.push("/feed");

      setSubmitting(false);
    },
  });

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
                <button type="submit" className="premium-btn mb-0"><span>Send Reset Link</span></button>
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
    </div>
  );
};

export default ForgotPassword;