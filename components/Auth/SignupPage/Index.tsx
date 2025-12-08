"use client";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import * as Yup from "yup";

import ShowToast from "@/components/common/ShowToast";
import { apiPost } from "@/utils/endpoints/common";
import { API_REGISTER } from "@/utils/api/APIConstant";



const signupValidationSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),

  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),

  displayName: Yup.string()
    .required("Display name is required")
    .min(3, "Display name must be at least 3 characters")
    .max(30, "Display name must be less than 30 characters"),

  userName: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),

  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const SignupPage = () => {
  const [activeTab, setActiveTab] = useState("fan");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    validationSchema: signupValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        const { confirmPassword, ...submitData } = values;

        const response = await apiPost({
          url: API_REGISTER,
          values: submitData,
        });

        if (response.success) {
          ShowToast(response.message, "success");
          resetForm();
          // router.push("/login");
        } else {
          ShowToast(response.error || "Registration failed", "error");
        }
      } catch (error: any) {
        ShowToast(
          error.message || "An error occurred during registration",
          "error"
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const renderError = (fieldName: keyof typeof formik.values) => {
    return formik.touched[fieldName] && formik.errors[fieldName] ? (
      <div
        className="error-message"
        style={{ color: "red", fontSize: "12px", marginTop: "4px" }}
      >
        {formik.errors[fieldName]}
      </div>
    ) : null;
  };

  return (
    <div className="login_wrap">
      <div className="img_wrap">
        <img src="/images/loginflowimg.png" className="login_imgwrap" />
      </div>
      <div className="moneyboy-feed-page-container cont_wrap">
        <div className="main_cont">
          <img src="/images/logo/moneyboy-logo.png" className="logo_wrap" />
          <div className="moneyboy-post__container card">
            <h3 className="heading">Fan Sign up</h3>
            <p>Sign up to interact with your idols!</p>
            <div className="loginbtn_wrap">
              <button className="google-button active-down-effect ">
                <FcGoogle size={22} /> Sign up with Google
              </button>
              <button className="x-button active-down-effect">
                <FaXTwitter size={22} /> Sign up with X
              </button>
            </div>
            <div className="or-divider">
              <span>Or</span>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="form_grid">
                <div className="label-input">
                  <div className="input-placeholder-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                    >
                      <path
                        d="M12.1596 10.87C12.0596 10.86 11.9396 10.86 11.8296 10.87C9.44957 10.79 7.55957 8.84 7.55957 6.44C7.55957 3.99 9.53957 2 11.9996 2C14.4496 2 16.4396 3.99 16.4396 6.44C16.4296 8.84 14.5396 10.79 12.1596 10.87Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.15973 14.56C4.73973 16.18 4.73973 18.82 7.15973 20.43C9.90973 22.27 14.4197 22.27 17.1697 20.43C19.5897 18.81 19.5897 16.17 17.1697 14.56C14.4297 12.73 9.91973 12.73 7.15973 14.56Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="First Name *"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.firstName && formik.errors.firstName
                        ? "error"
                        : ""
                    }
                  />
                </div>
                {renderError("firstName")}

                <div className="label-input">
                  <div className="input-placeholder-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                    >
                      <path
                        d="M12.1596 10.87C12.0596 10.86 11.9396 10.86 11.8296 10.87C9.44957 10.79 7.55957 8.84 7.55957 6.44C7.55957 3.99 9.53957 2 11.9996 2C14.4496 2 16.4396 3.99 16.4396 6.44C16.4296 8.84 14.5396 10.79 12.1596 10.87Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.15973 14.56C4.73973 16.18 4.73973 18.82 7.15973 20.43C9.90973 22.27 14.4197 22.27 17.1697 20.43C19.5897 18.81 19.5897 16.17 17.1697 14.56C14.4297 12.73 9.91973 12.73 7.15973 14.56Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Last name *"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.lastName && formik.errors.lastName
                        ? "error"
                        : ""
                    }
                  />
                </div>
                {renderError("lastName")}

                <div className="label-input one">
                  <div className="input-placeholder-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                    >
                      <path
                        d="M12.1202 12.7805C12.0502 12.7705 11.9602 12.7705 11.8802 12.7805C10.1202 12.7205 8.72021 11.2805 8.72021 9.51047C8.72021 7.70047 10.1802 6.23047 12.0002 6.23047C13.8102 6.23047 15.2802 7.70047 15.2802 9.51047C15.2702 11.2805 13.8802 12.7205 12.1202 12.7805Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.7398 19.3805C16.9598 21.0105 14.5998 22.0005 11.9998 22.0005C9.39977 22.0005 7.03977 21.0105 5.25977 19.3805C5.35977 18.4405 5.95977 17.5205 7.02977 16.8005C9.76977 14.9805 14.2498 14.9805 16.9698 16.8005C18.0398 17.5205 18.6398 18.4405 18.7398 19.3805Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Display name *"
                    name="displayName"
                    value={formik.values.displayName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.displayName && formik.errors.displayName
                        ? "error"
                        : ""
                    }
                  />
                </div>
                {renderError("displayName")}

                <div className="label-input one">
                  <div className="input-placeholder-icon">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                    >
                      <path
                        d="M14.4399 17.7993L15.9599 19.3193L18.9999 16.2793"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.1601 9.62C12.0601 9.61 11.9401 9.61 11.8301 9.62C9.4501 9.54 7.5601 7.59 7.5601 5.19C7.5501 2.74 9.5401 0.75 11.9901 0.75C14.4401 0.75 16.4301 2.74 16.4301 5.19C16.4301 7.59 14.5301 9.54 12.1601 9.62Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.99 20.5597C10.17 20.5597 8.36004 20.0997 6.98004 19.1797C4.56004 17.5597 4.56004 14.9197 6.98004 13.3097C9.73004 11.4697 14.24 11.4697 16.99 13.3097"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="User name *"
                    name="userName"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.userName && formik.errors.userName
                        ? "error"
                        : ""
                    }
                  />
                </div>
                {renderError("userName")}

                <div className="label-input one">
                  <div className="input-placeholder-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                    >
                      <path
                        d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address *"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.email && formik.errors.email ? "error" : ""
                    }
                  />
                </div>
                {renderError("email")}

                <div className="label-input password one">
                  <div className="input-placeholder-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                    >
                      <path
                        d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Password *"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.password && formik.errors.password
                        ? "error"
                        : ""
                    }
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="input-placeholder-icon eye-icon"
                  >
                    {showPass ? (
                      <FaEyeSlash className="svg-icon" />
                    ) : (
                      <FaEye className="svg-icon" />
                    )}
                  </span>
                </div>
                {renderError("password")}

                <div className="label-input password one">
                  <div className="input-placeholder-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="svg-icon"
                    >
                      <path
                        d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    placeholder="Confirm password *"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? "error"
                        : ""
                    }
                  />
                  <span
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="input-placeholder-icon eye-icon"
                  >
                    {showConfirmPass ? (
                      <FaEyeSlash className="svg-icon" />
                    ) : (
                      <FaEye className="svg-icon" />
                    )}
                  </span>
                </div>
                {renderError("confirmPassword")}
              </div>

              <button
                type="submit"
                className="premium-btn"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "Signing up..." : "Sign up"}</span>
              </button>
            </form>

            <p>
              By signing up you agree to our{" "}
              <Link href="#">Terms of Service</Link> and{" "}
              <Link href="#">Privacy Policy</Link>, and confirm that you are at
              least 18 years old.
            </p>
            <p className="fs-18">
              Have an account already? <Link href="#">Log in here.</Link>
            </p>
          </div>
          <h4 className="account_login">
            Are you a creator? <a href="/creator">Sign up here.</a>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
