"use client";
import ShowToast from "@/components/common/ShowToast";
import OtpModal from "@/components/OtpModal";
import { API_REGISTER } from "@/utils/api/APIConstant";
import { apiPost } from "@/utils/endpoints/common";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBackOutline } from "react-icons/io5";
import * as yup from "yup";

export const signupSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  displayName: yup.string().required("Display name is required"),
  userName: yup
    .string()
    .matches(
      /^[A-Za-z0-9]{5,20}$/,
      "Username must be 5-20 characters long, letters A-Z, and numbers 0-9 only, no spaces."
    )
    .required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

const SignupPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      displayName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const payload = {
          firstName: values.firstName,
          lastName: values.lastName,
          displayName: values.displayName,
          userName: values.userName,
          email: values.email,
          password: values.password,
        };

        const res = await apiPost({
          url: API_REGISTER,
          values: payload,
        });

        if (res?.success) {
          ShowToast(res.message, "success");
          setEmailForOtp(values.email);
          formik.resetForm();
          setOtpOpen(true);
        } else {
          ShowToast(res?.message || "Registration failed", "error");
        }
      } catch (err: any) {
        ShowToast(err?.error || "Registration failed", "error");
      } finally {
        setLoading(false);
      }
    },
  });

  const verifyOtp = async (otp: string) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: emailForOtp,
        otp,
      });

      if (res?.error) {
        ShowToast(res.error, "error");
        return;
      }

      ShowToast("OTP verified successfully", "success");
      setOtpOpen(false);

      // redirect to feed
      router.push("/discover");
    } catch (err: any) {
      ShowToast(err?.message || "OTP verification failed", "error");
    }
  };



  return (
    <div className="container login_wrap">
      <div className="img_wrap">
        <img src="/images/loginflowimg.png" className="login_imgwrap" />
        <div className="backicons">
          <button className="btn-txt-gradient btn-outline" onClick={() => router.push('/feed')}><IoArrowBackOutline className="icons"/></button>
        </div>
      </div>
      <div className="moneyboy-feed-page-container cont_wrap">
        <div className="main_cont">
          <img src="/images/logo.svg" className="logo_wrap" />
          <div className="moneyboy-post__container card">
            <h3 className="heading">Fan Sign up</h3>
            <p>Sign up to interact with your idols!</p>
            <div className="loginbtn_wrap">
              <button className="google-button active-down-effect ">
                <FcGoogle size={18} /> Sign up with Google
              </button>
              <button className="x-button active-down-effect">
                <FaXTwitter size={18} /> Sign up with X
              </button>
            </div>
            <div className="or-divider">
              <span>Or</span>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="form_grid">
                <div>
                  <div className="label-input">
                    <div className="input-placeholder-icon">
                      <i className="icons user svg-icon"></i>
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="First Name *"
                    />
                  </div>
                  {formik.touched.firstName && formik.errors.firstName && (
                    <span className="error-message">
                      {formik.errors.firstName}
                    </span>
                  )}
                </div>
                <div>
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
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.touched.lastName && formik.errors.lastName && (
                    <span className="error-message">
                      {formik.errors.lastName}
                    </span>
                  )}
                </div>

                <div>
                  <div className="label-input one">
                    <div className="input-placeholder-icon">
                      <i className="icons user2 svg-icon"></i>
                    </div>
                    <input
                      type="text"
                      name="displayName"
                      placeholder="Display name *"
                      value={formik.values.displayName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.touched.displayName && formik.errors.displayName && (
                    <span className="error-message">
                      {formik.errors.displayName}
                    </span>
                  )}
                </div>

                <div>
                  <div className="label-input one">
                    <div className="input-placeholder-icon">
                      <i className="icons profile-check svg-icon"></i>
                    </div>
                    <input
                      type="text"
                      name="userName"
                      placeholder="User name *"
                      value={formik.values.userName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {formik.touched.userName && formik.errors.userName && (
                    <span className="error-message">
                      {formik.errors.userName}
                    </span>
                  )}
                </div>
                <div className="label-input one">
                  <div className="input-placeholder-icon">
                    <i className="icons message svg-icon"></i>
                  </div>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email Address *"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.email && formik.errors.email && (
                  <span className="error-message">{formik.errors.email}</span>
                )}
                <div className="label-input password one">
                  <div className="input-placeholder-icon">
                    <i className="icons lock svg-icon"></i>
                  </div>
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="Password *"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="input-placeholder-icon eye-icon"
                  >
                    {showPass ? (
                      <i className="icons eye svg-icon"></i>
                    ) : (
                      <i className="icons eye-slash svg-icon"></i>
                    )}
                  </span>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <span className="error-message">
                    {formik.errors.password}
                  </span>
                )}
                <div className="label-input password one">
                  <div className="input-placeholder-icon">
                    <i className="icons lock svg-icon"></i>
                  </div>
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm password *"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="input-placeholder-icon eye-icon"
                  >
                    {showConfirmPass ? (
                      <i className="icons eye svg-icon"></i>
                    ) : (
                      <i className="icons eye-slash svg-icon"></i>
                    )}
                  </span>
                </div>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <span className="error-message">
                      {formik.errors.confirmPassword}
                    </span>
                  )}
              </div>

              <button className="premium-btn mb-10" disabled={loading}>
                {loading ? (
                  <span className="loader"></span>
                ) : (
                  <span>Sign up</span>
                )}
              </button>
            </form>

            <p>
              By signing up you agree to our{" "}
              <Link href="#">Terms of Service</Link> and{" "}
              <Link href="#">Privacy Policy</Link>, and confirm that you are at
              least 18 years old.
            </p>
            <p className="fs-18">
              Have an account already? <Link href="/login">Log in here.</Link>
            </p>
          </div>
          <h4 className="account_login">
            Are you a creator? <Link href="/creator">Sign up here.</Link>
          </h4>
        </div>
      </div>
      {emailForOtp && otpOpen && (
        <OtpModal
          open={otpOpen}
          onClose={() => setOtpOpen(false)}
          email={emailForOtp}
          onSubmit={verifyOtp}
        />
      )}
    </div>
  );
};

export default SignupPage;
