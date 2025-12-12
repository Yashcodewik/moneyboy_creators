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

        if (response?.success) {
          ShowToast(response.message || "Registered successfully", "success");
          resetForm();
          // router.push("/login");
        } else {
          ShowToast(response?.error || "Registration failed", "error");
        }
      } catch (error: any) {
        ShowToast(
          error?.message || "An error occurred during registration",
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
    <div className="container login_wrap">
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
              <button
                type="button"
                className="google-button active-down-effect"
              >
                <FcGoogle size={18} /> Sign up with Google
              </button>
              <button type="button" className="x-button active-down-effect">
                <FaXTwitter size={18} /> Sign up with X
              </button>
            </div>
            <div className="or-divider">
              <span>Or</span>
            </div>
            <form onSubmit={formik.handleSubmit} noValidate>
              <div className="form_grid">
                <div>
                  <div className="label-input">
                    <div className="input-placeholder-icon">
                      <i className="icons user svg-icon"></i>
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
                </div>
                <div>
                  <div className="label-input">
                    <div className="input-placeholder-icon">
                      <i className="icons user svg-icon"></i>
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
                </div>
                <div className="one">
                  <div className="label-input">
                    <div className="input-placeholder-icon">
                      <i className="icons user2 svg-icon"></i>
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
                </div>
                <div className="one">
                  <div className="label-input">
                    <div className="input-placeholder-icon">
                      <i className="icons profile-check svg-icon"></i>
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
                </div>
                <div className="one">
                  <div className="label-input">
                    <div className="input-placeholder-icon">
                      <i className="icons message svg-icon"></i>
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={
                        formik.touched.email && formik.errors.email
                          ? "error"
                          : ""
                      }
                    />
                  </div>
                  {renderError("email")}
                </div>
                <div className="one">
                  <div className="label-input password">
                    <div className="input-placeholder-icon">
                      <i className="icons lock svg-icon"></i>
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
                      onClick={() => setShowPass((prev) => !prev)}
                      className="input-placeholder-icon eye-icon"
                    >
                      {showPass ? (
                        <i className="icons eye svg-icon"></i>
                      ) : (
                        <i className="icons eye-slash svg-icon"></i>
                      )}
                    </span>
                  </div>
                  {renderError("password")}
                </div>
                <div className="one">
                  <div className="label-input password">
                    <div className="input-placeholder-icon">
                      <i className="icons lock svg-icon"></i>
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
                      onClick={() => setShowConfirmPass((prev) => !prev)}
                      className="input-placeholder-icon eye-icon"
                    >
                      {showConfirmPass ? (
                        <i className="icons eye svg-icon"></i>
                      ) : (
                        <i className="icons eye-slash svg-icon"></i>
                      )}
                    </span>
                  </div>
                  {renderError("confirmPassword")}
                </div>
              </div>
              <button
                type="submit"
                className="premium-btn"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "Signing up..." : "Sign up"}</span>
              </button>
              <p>
                By signing up you agree to our{" "}
                <Link href="#">Terms of Service</Link> and{" "}
                <Link href="#">Privacy Policy</Link>, and confirm that you are
                at least 18 years old.
              </p>
              <p className="fs-18 mb-0">
                Have an account already? <Link href="#">Log in here.</Link>
              </p>
            </form>
          </div>
          <h4 className="account_login">
            Are you a creator? <a href="#">Sign up here.</a>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
