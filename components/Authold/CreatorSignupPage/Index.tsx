"use client";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { TbCamera } from "react-icons/tb";
import { useFormik } from "formik";
import * as Yup from "yup";
import { apiPost, apiPostWithMultiForm } from "@/utils/endpoints/common";
import ShowToast from "@/components/common/ShowToast";
import { API_CREATOR_REGISTER } from "@/utils/api/APIConstant";
import DatePicker from "react-datepicker";
import { ageGroupOptions, bodyTypeOptions, countryOptions, ethnicityOptions, eyeColorOptions, hairColorOptions, heightOptions, popularityOptions, sexualOrientationOptions, sizeOptions, styleOptions } from "@/components/helper/creatorOptions";


const CreatorSignupPage = () => {
  const [activeTab, setActiveTab] = useState("fan");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      displayName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      dob: null as Date | null,

      country: "",
      city: "",
      bio: "",
      sexualOrientation: "",
      age: "",
      height: "",
      style: "",
      popularity: "",
      bodyType: "",
      eyeColor: "",
      hairColor: "",
      ethnicity: "",
      size: "",
      governmentIdFile: null as File | null,
      selfieIdFile: null as File | null,
    },

    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      displayName: Yup.string().required("Display name is required"),
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),

      gender: Yup.string().required("Gender is required"),
      dob: Yup.date().nullable().required("Date of birth is required"),

      country: Yup.string().required("Country is required"),
      city: Yup.string().required("City is required"),
      bio: Yup.string().required("Bio is required"),

      sexualOrientation: Yup.string().required(
        "Sexual orientation is required"
      ),
      age: Yup.string().required("Age group is required"),
      height: Yup.string().required("Height is required"),
      style: Yup.string().required("Style is required"),
      popularity: Yup.string().required("Popularity is required"),
      bodyType: Yup.string().required("Body type is required"),
      eyeColor: Yup.string().required("Eye color is required"),
      hairColor: Yup.string().required("Hair color is required"),
      ethnicity: Yup.string().required("Ethnicity is required"),
      size: Yup.string().required("Size is required"),

      // 🔹 optional for now
      governmentIdFile: Yup.mixed().nullable(),
      selfieIdFile: Yup.mixed().nullable(),
    }),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const { governmentIdFile, selfieIdFile, ...formValues } = values;

        const res = await apiPost({
          url: API_CREATOR_REGISTER,
          values: formValues,
        });

        if (res?.success) {
          ShowToast(res.message, "success");
          resetForm();
          setOpenDropdown(null);
          setShowPass(false);
          setShowConfirmPass(false);
        } else {
          ShowToast(res?.message || "Registration failed", "error");
        }
      } catch (err) {
        ShowToast("Something went wrong", "error");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const renderError = (fieldName: keyof typeof formik.values) => {
    const showError =
      (formik.touched[fieldName] || formik.submitCount > 0) &&
      formik.errors[fieldName];

    return showError ? (
      <div
        className="field-error"
        style={{ color: "red", fontSize: "12px", marginTop: "4px" }}
      >
        {formik.errors[fieldName]}
      </div>
    ) : null;
  };

  const { values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <div className="bg-off-white">
      <div className="container login_wrap creator_wrap">
        <div className="moneyboy-feed-page-container cont_wrap">
          <div className="main_cont">
            <img src="/images/logo.svg" className="logo_wrap" />
            <div className="moneyboy-post__container card">
              <h3 className="heading">Creator Sign Up</h3>
              <p>Sign up to make money and interact with your fans!</p>
              <form className="creator_maingrid" onSubmit={formik.handleSubmit}>
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
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.15973 14.56C4.73973 16.18 4.73973 18.82 7.15973 20.43C9.90973 22.27 14.4197 22.27 17.1697 20.43C19.5897 18.81 19.5897 16.17 17.1697 14.56C14.4297 12.73 9.91973 12.73 7.15973 14.56Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="First Name *"
                      name="firstName"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      className={
                        touched.firstName && errors.firstName ? "error" : ""
                      }
                    />
                    {renderError("firstName")}
                  </div>
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
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M7.15973 14.56C4.73973 16.18 4.73973 18.82 7.15973 20.43C9.90973 22.27 14.4197 22.27 17.1697 20.43C19.5897 18.81 19.5897 16.17 17.1697 14.56C14.4297 12.73 9.91973 12.73 7.15973 14.56Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Last name *"
                      name="lastName"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                    />
                    {(touched.lastName || formik.submitCount > 0) &&
                      errors.lastName && (
                        <span className="error-text">{errors.lastName}</span>
                      )}
                  </div>
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
                          d="M12.1202 12.7805C12.0502 12.7705 11.9602 12.7705 11.8802 12.7805C10.1202 12.7205 8.72021 11.2805 8.72021 9.51047C8.72021 7.70047 10.1802 6.23047 12.0002 6.23047C13.8102 6.23047 15.2802 7.70047 15.2802 9.51047C15.2702 11.2805 13.8802 12.7205 12.1202 12.7805Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M18.7398 19.3805C16.9598 21.0105 14.5998 22.0005 11.9998 22.0005C9.39977 22.0005 7.03977 21.0105 5.25977 19.3805C5.35977 18.4405 5.95977 17.5205 7.02977 16.8005C9.76977 14.9805 14.2498 14.9805 16.9698 16.8005C18.0398 17.5205 18.6398 18.4405 18.7398 19.3805Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Display name *"
                      name="displayName"
                      value={formik.values.displayName}
                      onChange={formik.handleChange}
                    />
                    {(touched.displayName || formik.submitCount > 0) &&
                      errors.displayName && (
                        <span className="error-text">{errors.displayName}</span>
                      )}
                  </div>
                  <div className="label-input">
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
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.1601 9.62C12.0601 9.61 11.9401 9.61 11.8301 9.62C9.4501 9.54 7.5601 7.59 7.5601 5.19C7.5501 2.74 9.5401 0.75 11.9901 0.75C14.4401 0.75 16.4301 2.74 16.4301 5.19C16.4301 7.59 14.5301 9.54 12.1601 9.62Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M11.99 20.5597C10.17 20.5597 8.36004 20.0997 6.98004 19.1797C4.56004 17.5597 4.56004 14.9197 6.98004 13.3097C9.73004 11.4697 14.24 11.4697 16.99 13.3097"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="User name *"
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                    {(touched.username || formik.submitCount > 0) &&
                      errors.username && (
                        <span className="error-text">{errors.username}</span>
                      )}
                  </div>
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
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Email Address *"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    {(touched.email || formik.submitCount > 0) &&
                      errors.email && (
                        <span className="error-text">{errors.email}</span>
                      )}
                  </div>
                  <div className="label-input password">
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
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Password *"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    {(touched.password || formik.submitCount > 0) &&
                      errors.password && (
                        <span className="error-text">{errors.password}</span>
                      )}

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
                  <div className="label-input password">
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
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12 18.5C13.3807 18.5 14.5 17.3807 14.5 16C14.5 14.6193 13.3807 13.5 12 13.5C10.6193 13.5 9.5 14.6193 9.5 16C9.5 17.3807 10.6193 18.5 12 18.5Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      placeholder="Confirm password *"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                    />
                    {(touched.confirmPassword || formik.submitCount > 0) &&
                      errors.confirmPassword && (
                        <span className="error-text">
                          {errors.confirmPassword}
                        </span>
                      )}

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
                          d="M9.16006 10.87C9.06006 10.86 8.94006 10.86 8.83006 10.87C6.45006 10.79 4.56006 8.84 4.56006 6.44C4.56006 3.99 6.54006 2 9.00006 2C11.4501 2 13.4401 3.99 13.4401 6.44C13.4301 8.84 11.5401 10.79 9.16006 10.87Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M16.4098 4C18.3498 4 19.9098 5.57 19.9098 7.5C19.9098 9.39 18.4098 10.93 16.5398 11C16.4598 10.99 16.3698 10.99 16.2798 11"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M4.16021 14.56C1.74021 16.18 1.74021 18.82 4.16021 20.43C6.91021 22.27 11.4202 22.27 14.1702 20.43C16.5902 18.81 16.5902 16.17 14.1702 14.56C11.4302 12.73 6.92021 12.73 4.16021 14.56Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M18.3398 20C19.0598 19.85 19.7398 19.56 20.2998 19.13C21.8598 17.96 21.8598 16.03 20.2998 14.86C19.7498 14.44 19.0798 14.16 18.3698 14"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Male"
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.gender && errors.gender && (
                      <span className="error-text">{errors.gender}</span>
                    )}
                  </div>
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
                          d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M15.5 2V9.85999C15.5 10.3 14.98 10.52 14.66 10.23L12.34 8.09003C12.15 7.91003 11.85 7.91003 11.66 8.09003L9.34003 10.23C9.02003 10.52 8.5 10.3 8.5 9.85999V2H15.5Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M13.25 14H17.5"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9 18H17.5"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <DatePicker
                      selected={formik.values.dob}
                      onChange={(date) => formik.setFieldValue("dob", date)}
                      onBlur={formik.handleBlur}
                      placeholderText="Date of Birth"
                      dateFormat="dd/MM/yyyy"
                      className="react-datepicker-input"
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                      maxDate={new Date()}
                    />

                    {touched.dob && errors.dob && (
                      <span className="error-text">{errors.dob}</span>
                    )}
                  </div>
                  <div
                    className="custom-select-element"
                    data-custom-select-element=""
                    data-custom-select-value=""
                  >
                    {/* ✅ MOVE onClick HERE */}
                    <div
                      className="custom-select-label-wrapper"
                      data-custom-select-triger=""
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === "country" ? null : "country"
                        )
                      }
                    >
                      <div className="custom-select-icon-txt">
                        <img
                          src="/images/united_flag.png"
                          className="svg-icon"
                        />
                        <span className="custom-select-label-txt">
                          {formik.values.country || "Select Country"}
                        </span>
                      </div>

                      <div className="custom-select-chevron">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                        >
                          <path
                            d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95"
                            stroke="none"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* ✅ CONDITIONAL RENDERING ADDED */}
                    {openDropdown === "country" && (
                      <div
                        style={{ display: "block" }}
                        className="custom-select-options-dropdown-wrapper"
                        data-custom-select-dropdown=""
                      >
                        <div className="custom-select-options-dropdown-container">
                          <div
                            className="custom-select-options-search"
                            data-custom-select-options-search=""
                          >
                            <div className="label-input">
                              <div className="input-placeholder-icon">
                                <svg
                                  className="svg-icon"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2" />
                                  <path d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198Z" />
                                  <path d="M14 5H20" />
                                  <path d="M14 8H17" />
                                </svg>
                              </div>
                              <input type="text" placeholder="Search here" />
                            </div>
                          </div>

                          <div className="custom-select-options-lists-container">
                            <ul
                              className="custom-select-options-list"
                              data-custom-select-options-list=""
                            >
                              {countryOptions.map((option) => (
                                <li
                                  key={option.value}
                                  className="custom-select-option"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    formik.setFieldValue(
                                      "country",
                                      option.label
                                    ); // or option.value depending on your needs
                                    setOpenDropdown(null);
                                  }}
                                >
                                  <span>{option.label}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    {(formik.touched.country || formik.submitCount > 0) &&
                      formik.errors.country && (
                        <span className="error-text">
                          {formik.errors.country}
                        </span>
                      )}
                  </div>

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
                          d="M11.9999 13.4295C13.723 13.4295 15.1199 12.0326 15.1199 10.3095C15.1199 8.58633 13.723 7.18945 11.9999 7.18945C10.2768 7.18945 8.87988 8.58633 8.87988 10.3095C8.87988 12.0326 10.2768 13.4295 11.9999 13.4295Z"
                          stroke="black"
                          stroke-width="1.5"
                        />
                        <path
                          d="M3.61971 8.49C5.58971 -0.169998 18.4197 -0.159997 20.3797 8.5C21.5297 13.58 18.3697 17.88 15.5997 20.54C13.5897 22.48 10.4097 22.48 8.38971 20.54C5.62971 17.88 2.46971 13.57 3.61971 8.49Z"
                          stroke="black"
                          stroke-width="1.5"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="City *"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.city && errors.city && (
                      <span className="error-text">{errors.city}</span>
                    )}
                  </div>
                  <div className="label-input textarea one">
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
                          d="M18 18.86H17.24C16.44 18.86 15.68 19.17 15.12 19.73L13.41 21.42C12.63 22.19 11.36 22.19 10.58 21.42L8.87 19.73C8.31 19.17 7.54 18.86 6.75 18.86H6C4.34 18.86 3 17.53 3 15.89V4.97C3 3.33 4.34 2 6 2H18C19.66 2 21 3.33 21 4.97V15.88C21 17.52 19.66 18.86 18 18.86Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.0701 8.95078C12.0301 8.95078 11.97 8.95078 11.92 8.95078C10.87 8.91078 10.04 8.06078 10.04 7.00078C10.04 5.92078 10.9101 5.05078 11.9901 5.05078C13.0701 5.05078 13.9401 5.93078 13.9401 7.00078C13.9501 8.06078 13.1201 8.92078 12.0701 8.95078Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M9.24994 11.9609C7.91994 12.8509 7.91994 14.3009 9.24994 15.1909C10.7599 16.2009 13.2399 16.2009 14.7499 15.1909C16.0799 14.3009 16.0799 12.8509 14.7499 11.9609C13.2399 10.9609 10.7699 10.9609 9.24994 11.9609Z"
                          stroke="black"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    {/* rows="4" */}
                    <textarea
                      placeholder="Bio"
                      name="bio"
                      value={values.bio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.bio && errors.bio && (
                      <span className="error-text">{errors.bio}</span>
                    )}
                  </div>
                  <div
                    className="custom-select-element"
                    data-custom-select-element=""
                    data-custom-select-value=""
                  >
                    <div
                      className="custom-select-element"
                      data-custom-select-element=""
                      data-custom-select-value=""
                    >
                      <div
                        className="custom-select-label-wrapper"
                        data-custom-select-triger=""
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === "bodyType" ? null : "bodyType"
                          )
                        }
                      >
                        <div className="custom-select-icon-txt">
                          {/* <img src="/images/united_flag.png" className="svg-icon"/> */}
                          <span className="custom-select-label-txt">
                            {formik.values.bodyType || "All Body Types"}
                          </span>
                        </div>

                        <div className="custom-select-chevron">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                          >
                            <path
                              d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95"
                              stroke="none"
                              strokeWidth="1.5"
                              strokeMiterlimit="10"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </div>

                      {openDropdown === "bodyType" && (
                        <div
                          style={{ display: "block" }}
                          className="custom-select-options-dropdown-wrapper"
                          data-custom-select-dropdown=""
                        >
                          <div className="custom-select-options-dropdown-container">
                            <div
                              className="custom-select-options-search"
                              data-custom-select-options-search=""
                            >
                              <div className="label-input">
                                <div className="input-placeholder-icon">
                                  <svg
                                    className="svg-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <path
                                      d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                    <path
                                      d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                    <path
                                      d="M14 5H20"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                    <path
                                      d="M14 8H17"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                  </svg>
                                </div>
                                <input type="text" placeholder="Search here" />
                              </div>
                            </div>

                            <div className="custom-select-options-lists-container">
                              <ul
                                className="custom-select-options-list"
                                data-custom-select-options-list=""
                              >
                                {bodyTypeOptions.map((option) => (
                                  <li
                                    key={option.value}
                                    className="custom-select-option"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      formik.setFieldValue(
                                        "bodyType",
                                        option.label
                                      );
                                      setOpenDropdown(null);
                                    }}
                                  >
                                    <span>{option.label}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {touched.bodyType && errors.bodyType && (
                      <span className="error-text">{errors.bodyType}</span>
                    )}
                  </div>
                  <div
                    className="custom-select-element"
                    data-custom-select-element=""
                    data-custom-select-value=""
                  >
                    <div
                      className="custom-select-label-wrapper"
                      data-custom-select-triger=""
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === "sexualOrientation"
                            ? null
                            : "sexualOrientation"
                        )
                      }
                    >
                      <div className="custom-select-icon-txt">
                        <div className="input-placeholder-icon">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="svg-icon"
                          >
                            <path d="M11 17C14.3137 17 17 14.3137 17 11C17 7.68629 14.3137 5 11 5C7.68629 5 5 7.68629 5 11C5 14.3137 7.68629 17 11 17Z" />
                            <path d="M20 2L16 6" />
                            <path d="M15 2H20V7" />
                            <path d="M11 17V22" />
                            <path d="M14 19H8" />
                          </svg>
                        </div>

                        <span className="custom-select-label-txt">
                          {formik.values.sexualOrientation ||
                            "All Sexual Orientation"}
                        </span>
                      </div>

                      <div className="custom-select-chevron">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                        >
                          <path
                            d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95"
                            stroke="none"
                          />
                        </svg>
                      </div>
                    </div>

                    {openDropdown === "sexualOrientation" && (
                      <div
                        style={{ display: "block" }}
                        className="custom-select-options-dropdown-wrapper"
                        data-custom-select-dropdown=""
                      >
                        <div className="custom-select-options-dropdown-container">
                          <div className="custom-select-options-search">
                            <div className="label-input">
                              <div className="input-placeholder-icon">
                                <svg
                                  className="svg-icon"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2" />
                                </svg>
                              </div>
                              <input type="text" placeholder="Search here" />
                            </div>
                          </div>

                          <div className="custom-select-options-lists-container">
                            <ul className="custom-select-options-list">
                              {sexualOrientationOptions.map((option) => (
                                <li
                                  key={option.value}
                                  className="custom-select-option"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    formik.setFieldValue(
                                      "sexualOrientation",
                                      option.label
                                    );
                                    setOpenDropdown(null);
                                  }}
                                >
                                  <span>{option.label}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {touched.sexualOrientation && errors.sexualOrientation && (
                      <span className="error-text">
                        {errors.sexualOrientation}
                      </span>
                    )}
                  </div>

                  <div
                    className="custom-select-element"
                    data-custom-select-element=""
                    data-custom-select-value=""
                    onClick={() =>
                      setOpenDropdown(openDropdown === "age" ? null : "age")
                    }
                  >
                    <div
                      className="custom-select-label-wrapper"
                      data-custom-select-triger=""
                    >
                      <div className="custom-select-icon-txt">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="svg-icon"
                        >
                          <path
                            d="M8 2V5"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16 2V5"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M21 8.5V13.63C20.11 12.92 18.98 12.5 17.75 12.5C16.52 12.5 15.37 12.93 14.47 13.66C13.26 14.61 12.5 16.1 12.5 17.75C12.5 18.73 12.78 19.67 13.26 20.45C13.63 21.06 14.11 21.59 14.68 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7 11H13"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7 16H9.62"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M23 17.75C23 18.73 22.72 19.67 22.24 20.45C21.96 20.93 21.61 21.35 21.2 21.69C20.28 22.51 19.08 23 17.75 23C16.6 23 15.54 22.63 14.68 22C14.11 21.59 13.63 21.06 13.26 20.45C12.78 19.67 12.5 18.73 12.5 17.75C12.5 16.1 13.26 14.61 14.47 13.66C15.37 12.93 16.52 12.5 17.75 12.5C18.98 12.5 20.11 12.92 21 13.63C22.22 14.59 23 16.08 23 17.75Z"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M17.75 20.25C17.75 18.87 18.87 17.75 20.25 17.75C18.87 17.75 17.75 16.63 17.75 15.25C17.75 16.63 16.63 17.75 15.25 17.75C16.63 17.75 17.75 18.87 17.75 20.25Z"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span className="custom-select-label-txt">
                          {formik.values.age || "Select Age Group"}
                        </span>
                      </div>
                      <div className="custom-select-chevron">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                        >
                          <path
                            d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95"
                            stroke="none"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    {openDropdown === "age" && (
                      <div
                        className="custom-select-options-dropdown-wrapper"
                        data-custom-select-dropdown=""
                        style={{ display: "block" }}
                      >
                        <div className="custom-select-options-dropdown-container">
                          <div
                            className="custom-select-options-search"
                            data-custom-select-options-search=""
                          >
                            <div className="label-input">
                              <div className="input-placeholder-icon">
                                <svg
                                  className="svg-icon"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M14 5H20"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M14 8H17"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </svg>
                              </div>
                              <input type="text" placeholder="Search here" />
                            </div>
                          </div>
                          <div className="custom-select-options-lists-container">
                            <ul
                              className="custom-select-options-list"
                              data-custom-select-options-list=""
                            >
                              {ageGroupOptions.map((option) => (
                                <li
                                  key={option.value}
                                  className="custom-select-option"
                                  onClick={() => {
                                    formik.setFieldValue("age", option.label);
                                    setOpenDropdown(null);
                                  }}
                                >
                                  <span>{option.label}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    {touched.age && errors.age && (
                      <span className="error-text">{errors.age}</span>
                    )}
                  </div>
                  <div
                    className="custom-select-element"
                    data-custom-select-element=""
                    data-custom-select-value=""
                  >
                    <div
                      className="custom-select-label-wrapper"
                      data-custom-select-triger=""
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === "eyeColor" ? null : "eyeColor"
                        )
                      }
                    >
                      <div className="custom-select-icon-txt">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="svg-icon"
                        >
                          <path
                            d="M14.9647 13.4003C14.9647 15.3803 13.3647 16.9803 11.3847 16.9803C9.40469 16.9803 7.80469 15.3803 7.80469 13.4003C7.80469 11.4203 9.40469 9.82031 11.3847 9.82031C13.3647 9.82031 14.9647 11.4203 14.9647 13.4003Z"
                            stroke="black"
                            stroke-width="1.2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M18.8644 7.3607C18.8644 7.7807 18.6844 8.1707 18.3844 8.4307C18.1244 8.6607 17.7944 8.8007 17.4244 8.8007C16.6244 8.8007 15.9844 8.1607 15.9844 7.3607C15.9844 6.7007 16.4344 6.1407 17.0444 5.9707C17.2044 6.3907 17.5644 6.7107 18.0044 6.8307C18.1244 6.8607 18.2544 6.8807 18.3844 6.8807C18.5144 6.8807 18.6444 6.8607 18.7644 6.8307C18.8244 6.9907 18.8644 7.1707 18.8644 7.3607Z"
                            stroke="black"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M19.8253 5.44C19.8253 5.63 19.7853 5.81 19.7253 5.97C19.5653 6.39 19.2053 6.71 18.7653 6.83C18.6453 6.86 18.5153 6.88 18.3853 6.88C18.2553 6.88 18.1253 6.86 18.0053 6.83C17.5653 6.71 17.2053 6.39 17.0453 5.97C16.9853 5.81 16.9453 5.63 16.9453 5.44C16.9453 4.64 17.5853 4 18.3853 4C19.1853 4 19.8253 4.64 19.8253 5.44Z"
                            stroke="black"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M20.7848 7.3607C20.7848 8.1607 20.1448 8.8007 19.3448 8.8007C18.9748 8.8007 18.6448 8.6607 18.3848 8.4307C18.6848 8.1707 18.8648 7.7907 18.8648 7.3607C18.8648 7.1707 18.8248 6.9907 18.7648 6.8307C19.2048 6.7107 19.5648 6.3907 19.7248 5.9707C20.3348 6.1407 20.7848 6.7007 20.7848 7.3607Z"
                            stroke="black"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M22.3846 5.20039V7.60039C22.3846 9.38039 21.7546 10.2104 20.2046 10.3704C20.3046 10.5104 20.4046 10.6504 20.4946 10.8004C21.3946 12.2104 21.3946 14.5804 20.4946 15.9904C18.2046 19.5904 14.9146 21.6704 11.3846 21.6704C7.85461 21.6704 4.56461 19.5904 2.27461 15.9904C1.37461 14.5804 1.37461 12.2104 2.27461 10.8004C4.55461 7.20039 7.84461 5.12039 11.3846 5.12039C12.4146 5.12039 13.4146 5.30039 14.3846 5.64039V5.20039C14.3846 3.20039 15.1846 2.40039 17.1846 2.40039H19.5846C21.5846 2.40039 22.3846 3.20039 22.3846 5.20039Z"
                            stroke="black"
                            stroke-width="1.3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M17.1848 10.4004H19.5848C21.5848 10.4004 22.3848 9.60039 22.3848 7.60039V5.20039C22.3848 3.20039 21.5848 2.40039 19.5848 2.40039H17.1848C15.1848 2.40039 14.3848 3.20039 14.3848 5.20039V7.60039C14.3848 9.60039 15.1848 10.4004 17.1848 10.4004Z"
                            stroke="black"
                            stroke-width="1.3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span className="custom-select-label-txt">
                          {formik.values.eyeColor || "All Eye Colors"}
                        </span>
                      </div>
                      <div className="custom-select-chevron">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                        >
                          <path
                            d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95"
                            stroke="none"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    {openDropdown === "eyeColor" && (
                      <div
                        className="custom-select-options-dropdown-wrapper"
                        data-custom-select-dropdown=""
                        style={{ display: "block" }}
                      >
                        <div className="custom-select-options-dropdown-container">
                          <div
                            className="custom-select-options-search"
                            data-custom-select-options-search=""
                          >
                            <div className="label-input">
                              <div className="input-placeholder-icon">
                                <svg
                                  className="svg-icon"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M14 5H20"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M14 8H17"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </svg>
                              </div>
                              <input type="text" placeholder="Search here" />
                            </div>
                          </div>
                          <div className="custom-select-options-lists-container">
                            <ul
                              className="custom-select-options-list"
                              data-custom-select-options-list=""
                            >
                              {eyeColorOptions.map((option) => (
                                <li
                                  key={option.value}
                                  className="custom-select-option"
                                  onClick={() => {
                                    formik.setFieldValue(
                                      "eyeColor",
                                      option.label
                                    );
                                    setOpenDropdown(null);
                                  }}
                                >
                                  <span>{option.label}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    {touched.age && errors.age && (
                      <span className="error-text">{errors.age}</span>
                    )}
                  </div>
                  <div
                    className="custom-select-element"
                    data-custom-select-element=""
                    data-custom-select-value=""
                  >
                    <div
                      className="custom-select-label-wrapper"
                      data-custom-select-triger=""
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === "hairColor" ? null : "hairColor"
                        )
                      }
                    >
                      <div className="custom-select-icon-txt">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="svg-icon"
                        >
                          <path
                            d="M9.40994 15.9516L7.01992 13.5617C6.21992 12.7617 6.21992 11.9616 7.01992 11.1716L11.0099 7.18164L15.3999 11.5717C15.6199 11.7917 15.6199 12.1516 15.3999 12.3716L11.8099 15.9616C11.0099 16.7516 10.2099 16.7516 9.40994 15.9516Z"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10.21 6.38086L11.01 7.18085"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6.45996 12.3314L15.49 11.9414"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16.4701 14.1719C16.4701 14.1719 15.3701 15.3718 15.3701 16.1018C15.3701 16.7118 15.8701 17.2018 16.4701 17.2018C17.0801 17.2018 17.5701 16.7018 17.5701 16.1018C17.5801 15.3618 16.4701 14.1719 16.4701 14.1719Z"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span className="custom-select-label-txt">
                          {formik.values.hairColor || "All Hair Colors"}
                        </span>
                      </div>
                      <div className="custom-select-chevron">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                        >
                          <path
                            d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95"
                            stroke="none"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    {openDropdown === "hairColor" && (
                      <div
                        className="custom-select-options-dropdown-wrapper"
                        data-custom-select-dropdown=""
                        style={{ display: "block" }}
                      >
                        <div className="custom-select-options-dropdown-container">
                          <div
                            className="custom-select-options-search"
                            data-custom-select-options-search=""
                          >
                            <div className="label-input">
                              <div className="input-placeholder-icon">
                                <svg
                                  className="svg-icon"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M14 5H20"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M14 8H17"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </svg>
                              </div>
                              <input type="text" placeholder="Search here" />
                            </div>
                          </div>
                          <div className="custom-select-options-lists-container">
                            <ul
                              className="custom-select-options-list"
                              data-custom-select-options-list=""
                            >
                              {hairColorOptions.map((option) => (
                                <li
                                  key={option.value}
                                  className="custom-select-option"
                                  onClick={() => {
                                    formik.setFieldValue(
                                      "hairColor",
                                      option.label
                                    );
                                    setOpenDropdown(null);
                                  }}
                                >
                                  <span>{option.label}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    {touched.hairColor && errors.hairColor && (
                      <span className="error-text">{errors.hairColor}</span>
                    )}
                  </div>
                  <div
                    className="custom-select-element"
                    data-custom-select-element=""
                    data-custom-select-value=""
                  >
                    <div
                      className="custom-select-label-wrapper"
                      data-custom-select-triger=""
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === "ethnicity" ? null : "ethnicity"
                        )
                      }
                    >
                      <div className="custom-select-icon-txt">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="svg-icon"
                        >
                          <path
                            d="M18.0001 7.16C17.9401 7.15 17.8701 7.15 17.8101 7.16C16.4301 7.11 15.3301 5.98 15.3301 4.58C15.3301 3.15 16.4801 2 17.9101 2C19.3401 2 20.4901 3.16 20.4901 4.58C20.4801 5.98 19.3801 7.11 18.0001 7.16Z"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M16.9704 14.4402C18.3404 14.6702 19.8504 14.4302 20.9104 13.7202C22.3204 12.7802 22.3204 11.2402 20.9104 10.3002C19.8404 9.59016 18.3104 9.35016 16.9404 9.59016"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.97047 7.16C6.03047 7.15 6.10047 7.15 6.16047 7.16C7.54047 7.11 8.64047 5.98 8.64047 4.58C8.64047 3.15 7.49047 2 6.06047 2C4.63047 2 3.48047 3.16 3.48047 4.58C3.49047 5.98 4.59047 7.11 5.97047 7.16Z"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.00043 14.4402C5.63043 14.6702 4.12043 14.4302 3.06043 13.7202C1.65043 12.7802 1.65043 11.2402 3.06043 10.3002C4.13043 9.59016 5.66043 9.35016 7.03043 9.59016"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12.0001 14.6307C11.9401 14.6207 11.8701 14.6207 11.8101 14.6307C10.4301 14.5807 9.33008 13.4507 9.33008 12.0507C9.33008 10.6207 10.4801 9.4707 11.9101 9.4707C13.3401 9.4707 14.4901 10.6307 14.4901 12.0507C14.4801 13.4507 13.3801 14.5907 12.0001 14.6307Z"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.08973 17.7813C7.67973 18.7213 7.67973 20.2613 9.08973 21.2013C10.6897 22.2713 13.3097 22.2713 14.9097 21.2013C16.3197 20.2613 16.3197 18.7213 14.9097 17.7813C13.3197 16.7213 10.6897 16.7213 9.08973 17.7813Z"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span className="custom-select-label-txt">
                          {formik.values.ethnicity || "All Ethnicities"}
                        </span>
                      </div>
                      <div className="custom-select-chevron">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                        >
                          <path
                            d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95"
                            stroke="none"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    {openDropdown === "ethnicity" && (
                      <div
                        style={{ display: "block" }}
                        className="custom-select-options-dropdown-wrapper"
                        data-custom-select-dropdown=""
                      >
                        <div className="custom-select-options-dropdown-container">
                          <div
                            className="custom-select-options-search"
                            data-custom-select-options-search=""
                          >
                            <div className="label-input">
                              <div className="input-placeholder-icon">
                                <svg
                                  className="svg-icon"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M14 5H20"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M14 8H17"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </svg>
                              </div>
                              <input type="text" placeholder="Search here" />
                            </div>
                          </div>

                          <div className="custom-select-options-lists-container">
                            <ul
                              className="custom-select-options-list"
                              data-custom-select-options-list=""
                            >
                              {ethnicityOptions.map((option) => (
                                <li
                                  key={option.value}
                                  className="custom-select-option"
                                  onClick={() => {
                                    formik.setFieldValue(
                                      "ethnicity",
                                      option.label
                                    );
                                    setOpenDropdown(null);
                                  }}
                                >
                                  <span>{option.label}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    {touched.ethnicity && errors.ethnicity && (
                      <span className="error-text">{errors.ethnicity}</span>
                    )}
                  </div>

                  <div
                    className="custom-select-element"
                    data-custom-select-element=""
                    data-custom-select-value=""
                  >
                    <div
                      className="custom-select-label-wrapper"
                      data-custom-select-triger=""
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === "height" ? null : "height"
                        )
                      }
                    >
                      <div className="custom-select-icon-txt">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="svg-icon"
                        >
                          <path
                            d="M12.1996 19.3993V11.7999"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.38525 15.5859L12.1997 19.4004L16.0141 15.5859"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M3.5 22H20.5"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12.1996 4.60071V12.2001"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.38525 8.41406L12.1997 4.59962L16.0141 8.41406"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M3.5 2H20.5"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span className="custom-select-label-txt">
                          {formik.values.height || "Select Height"}
                        </span>
                      </div>
                      <div className="custom-select-chevron">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                        >
                          <path
                            d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95"
                            stroke="none"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    {openDropdown === "height" && (
                      <div
                        style={{ display: "block" }}
                        className="custom-select-options-dropdown-wrapper"
                        data-custom-select-dropdown=""
                      >
                        <div className="custom-select-options-dropdown-container">
                          <div
                            className="custom-select-options-search"
                            data-custom-select-options-search=""
                          >
                            <div className="label-input">
                              <div className="input-placeholder-icon">
                                <svg
                                  className="svg-icon"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M14 5H20"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M14 8H17"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </svg>
                              </div>
                              <input type="text" placeholder="Search here" />
                            </div>
                          </div>
                          <div className="custom-select-options-lists-container">
                            <ul
                              className="custom-select-options-list"
                              data-custom-select-options-list=""
                            >
                              {heightOptions.map((option) => (
                                <li
                                  key={option.value}
                                  className="custom-select-option"
                                  onClick={() => {
                                    formik.setFieldValue(
                                      "height",
                                      option.label
                                    );
                                    setOpenDropdown(null);
                                  }}
                                >
                                  <span>{option.label}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    {touched.height && errors.height && (
                      <span className="error-text">{errors.height}</span>
                    )}
                  </div>
                  <div
                    className="custom-select-element"
                    data-custom-select-element=""
                    data-custom-select-value=""
                  >
                    <div
                      className="custom-select-label-wrapper"
                      data-custom-select-triger=""
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === "style" ? null : "style"
                        )
                      }
                    >
                      <div className="custom-select-icon-txt">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="svg-icon"
                        >
                          <path
                            d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.48014 15.4891C7.15014 14.4591 7.54011 13.1891 8.61011 12.8391C9.18011 12.6591 9.88012 12.8091 10.2701 13.3591C10.6401 12.7891 11.3701 12.6591 11.9301 12.8391C13.0101 13.1891 13.3901 14.4591 13.0701 15.4891C12.5601 17.1191 10.7701 17.9691 10.2701 17.9691C9.78012 17.9591 8.01014 17.1291 7.48014 15.4891Z"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span className="custom-select-label-txt">
                          {formik.values.style || "Select Style"}
                        </span>
                      </div>
                      <div className="custom-select-chevron">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                        >
                          <path
                            d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95"
                            stroke="none"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    {openDropdown === "style" && (
                      <div
                        style={{ display: "block" }}
                        className="custom-select-options-dropdown-wrapper"
                        data-custom-select-dropdown=""
                      >
                        <div className="custom-select-options-dropdown-container">
                          <div
                            className="custom-select-options-search"
                            data-custom-select-options-search=""
                          >
                            <div className="label-input">
                              <div className="input-placeholder-icon">
                                <svg
                                  className="svg-icon"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M14 5H20"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M14 8H17"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </svg>
                              </div>
                              <input type="text" placeholder="Search here" />
                            </div>
                          </div>
                          <div className="custom-select-options-lists-container">
                            <ul
                              className="custom-select-options-list"
                              data-custom-select-options-list=""
                            >
                              {styleOptions.map((option) => (
                                <li
                                  key={option.value}
                                  className="custom-select-option"
                                  onClick={() => {
                                    formik.setFieldValue("style", option.label);
                                    setOpenDropdown(null);
                                  }}
                                >
                                  <span>{option.label}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    {touched.style && errors.style && (
                      <span className="error-text">{errors.style}</span>
                    )}
                  </div>
                  <div
                    className="custom-select-element"
                    data-custom-select-element=""
                    data-custom-select-value=""
                  >
                    <div
                      className="custom-select-label-wrapper"
                      data-custom-select-triger=""
                      onClick={() =>
                        setOpenDropdown(openDropdown === "size" ? null : "size")
                      }
                    >
                      <div className="custom-select-icon-txt">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="svg-icon"
                        >
                          <path
                            d="M21 9V3H15"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M3 15V21H9"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M21 3L13.5 10.5"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M10.5 13.5L3 21"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span className="custom-select-label-txt">
                          {formik.values.size || "All Sizes"}
                        </span>
                      </div>
                      <div className="custom-select-chevron">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                        >
                          <path
                            d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95"
                            stroke="none"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    {openDropdown === "size" && (
                      <div
                        style={{ display: "block" }}
                        className="custom-select-options-dropdown-wrapper"
                        data-custom-select-dropdown=""
                      >
                        <div className="custom-select-options-dropdown-container">
                          <div
                            className="custom-select-options-search"
                            data-custom-select-options-search=""
                          >
                            <div className="label-input">
                              <div className="input-placeholder-icon">
                                <svg
                                  className="svg-icon"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M14 5H20"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M14 8H17"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </svg>
                              </div>
                              <input type="text" placeholder="Search here" />
                            </div>
                          </div>
                          <div className="custom-select-options-lists-container">
                            <ul
                              className="custom-select-options-list"
                              data-custom-select-options-list=""
                            >
                              {sizeOptions.map((option) => (
                                <li
                                  key={option.value}
                                  className="custom-select-option"
                                  onClick={() => {
                                    formik.setFieldValue("size", option.label);
                                    setOpenDropdown(null);
                                  }}
                                >
                                  <span>{option.label}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    {touched.size && errors.size && (
                      <span className="error-text">{errors.size}</span>
                    )}
                  </div>
                  <div
                    className="custom-select-element"
                    data-custom-select-element=""
                    data-custom-select-value=""
                  >
                    <div
                      className="custom-select-label-wrapper"
                      data-custom-select-triger=""
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === "popularity" ? null : "popularity"
                        )
                      }
                    >
                      <div className="custom-select-icon-txt">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="svg-icon"
                        >
                          <path
                            d="M2 15.2895V5.70953C2 4.37953 2.77 4.05953 3.71 4.99953L6.3 7.58953C6.69 7.97953 7.33 7.97953 7.71 7.58953L11.29 3.99953C11.68 3.60953 12.32 3.60953 12.7 3.99953L16.29 7.58953C16.68 7.97953 17.32 7.97953 17.7 7.58953L20.29 4.99953C21.23 4.05953 22 4.37953 22 5.70953V15.2995C22 18.2995 20 20.2995 17 20.2995H7C4.24 20.2895 2 18.0495 2 15.2895Z"
                            stroke="black"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <span className="custom-select-label-txt">
                          {formik.values.popularity || "Select Popularity"}
                        </span>
                      </div>
                      <div className="custom-select-chevron">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                        >
                          <path
                            d="M20.4201 8.95L13.9001 15.47C13.1301 16.24 11.8701 16.24 11.1001 15.47L4.58008 8.95"
                            stroke="none"
                            stroke-width="1.5"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    {openDropdown === "popularity" && (
                      <div
                        style={{ display: "block" }}
                        className="custom-select-options-dropdown-wrapper"
                        data-custom-select-dropdown=""
                      >
                        <div className="custom-select-options-dropdown-container">
                          <div
                            className="custom-select-options-search"
                            data-custom-select-options-search=""
                          >
                            <div className="label-input">
                              <div className="input-placeholder-icon">
                                <svg
                                  className="svg-icon"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M20 11C20 15.97 15.97 20 11 20C6.03 20 2 15.97 2 11C2 6.03 6.03 2 11 2"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M18.9299 20.6898C19.4599 22.2898 20.6699 22.4498 21.5999 21.0498C22.4499 19.7698 21.8899 18.7198 20.3499 18.7198C19.2099 18.7098 18.5699 19.5998 18.9299 20.6898Z"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M14 5H20"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M14 8H17"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </svg>
                              </div>
                              <input type="text" placeholder="Search here" />
                            </div>
                          </div>
                          <div className="custom-select-options-lists-container">
                            <ul
                              className="custom-select-options-list"
                              data-custom-select-options-list=""
                            >
                              {popularityOptions.map((option) => (
                                <li
                                  key={option.value}
                                  className="custom-select-option"
                                  onClick={() => {
                                    formik.setFieldValue(
                                      "popularity",
                                      option.label
                                    );
                                    setOpenDropdown(null);
                                  }}
                                >
                                  <span>{option.label}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    {touched.popularity && errors.popularity && (
                      <span className="error-text">{errors.popularity}</span>
                    )}
                  </div>
                </div>
                <div className="right_wrap">
                  <div className="label-input one file-upload-wrapper">
                    <div className="input-placeholder-icon">
                      <svg
                        width="45"
                        height="45"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M31.5871 15.2255L30.1579 21.3213C28.9329 26.5859 26.5121 28.715 21.9621 28.2775C21.2329 28.2192 20.4454 28.088 19.5996 27.8838L17.1496 27.3005C11.0684 25.8567 9.18711 22.8526 10.6163 16.7567L12.0454 10.6463C12.3371 9.40673 12.6871 8.32756 13.1246 7.43798C14.8309 3.90881 17.7329 2.9609 22.6038 4.11298L25.0392 4.68173C31.1496 6.1109 33.0163 9.12964 31.5871 15.2255Z"
                          fill="#E5741F"
                        />
                        <path
                          opacity="0.4"
                          d="M18.4523 9.53563C19.1663 9.69787 19.8766 9.2506 20.0389 8.53661C20.2011 7.82261 19.7539 7.11228 19.0399 6.95003C18.3259 6.78778 17.6155 7.23506 17.4533 7.94905C17.291 8.66304 17.7383 9.37338 18.4523 9.53563Z"
                          fill="white"
                        />
                        <path
                          d="M18.3005 10.1806C17.0051 9.88621 15.7528 10.5152 15.5095 11.5857C15.4931 11.6581 15.537 11.7279 15.6094 11.7443L20.0515 12.7538C20.1239 12.7702 20.1937 12.7263 20.2101 12.6539C20.4534 11.5834 19.5959 10.4749 18.3005 10.1806Z"
                          fill="white"
                        />
                        <path
                          d="M21.9627 28.2771C21.0586 28.8896 19.9211 29.4 18.5357 29.8521L16.2315 30.6104C10.4419 32.4771 7.394 30.9167 5.51275 25.1271L3.64609 19.3667C1.77942 13.5771 3.32525 10.5146 9.11483 8.64792L11.419 7.88958C12.0169 7.7 12.5857 7.53958 13.1252 7.4375C12.6877 8.32708 12.3377 9.40625 12.0461 10.6458L10.6169 16.7562C9.18775 22.8521 11.069 25.8562 17.1502 27.3L19.6002 27.8833C20.4461 28.0875 21.2336 28.2187 21.9627 28.2771Z"
                          fill="#E5741F"
                        />
                        <path
                          d="M26.4091 19.0909C26.3216 19.0909 26.2341 19.0763 26.132 19.0617L14.8206 16.1476C14.2372 16.0018 13.8872 15.4039 14.0331 14.8206C14.1789 14.2372 14.7768 13.8872 15.3601 14.0331L26.6716 16.9472C27.2549 17.093 27.6049 17.6909 27.4591 18.2742C27.3424 18.7555 26.8903 19.0909 26.4091 19.0909Z"
                          fill="#E5741F"
                        />
                        <path
                          d="M18.0689 21.0743C17.9814 21.0743 17.8939 21.0597 17.7918 21.0452L13.5481 19.966C12.9648 19.8202 12.6148 19.2222 12.7606 18.6389C12.9064 18.0556 13.5043 17.7056 14.0877 17.8514L18.3314 18.9306C18.9148 19.0764 19.2648 19.6743 19.1189 20.2577C19.0023 20.7535 18.5648 21.0743 18.0689 21.0743Z"
                          fill="#E5741F"
                        />
                      </svg>
                      <div className="imgicons">
                        <TbCamera size="16" />
                      </div>
                    </div>
                    <p>
                      Your government issued ID card, National ID card, Passport
                      or Driving license *
                    </p>
                    <input
                      type="file"
                      className="real-file-input"
                      accept="image/*,.pdf"
                    />
                  </div>
                  <div className="label-input one file-upload-wrapper">
                    <div className="input-placeholder-icon">
                      <svg
                        width="45"
                        height="45"
                        viewBox="0 0 75 75"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M37.501 6.25C29.3135 6.25 22.6572 12.9062 22.6572 21.0937C22.6572 29.125 28.9385 35.625 37.126 35.9062C37.376 35.875 37.626 35.875 37.8135 35.9062C37.876 35.9062 37.9072 35.9062 37.9697 35.9062C38.001 35.9062 38.001 35.9062 38.0322 35.9062C46.0322 35.625 52.3135 29.125 52.3447 21.0937C52.3447 12.9062 45.6885 6.25 37.501 6.25Z"
                          fill="#E5741F"
                        />
                        <path
                          d="M53.3779 44.2188C44.6592 38.4062 30.4404 38.4062 21.6592 44.2188C17.6904 46.875 15.5029 50.4687 15.5029 54.3125C15.5029 58.1562 17.6904 61.7188 21.6279 64.3438C26.0029 67.2813 31.7529 68.75 37.5029 68.75C43.2529 68.75 49.0029 67.2813 53.3779 64.3438C57.3154 61.6875 59.5029 58.125 59.5029 54.25C59.4717 50.4063 57.3154 46.8438 53.3779 44.2188Z"
                          fill="#E5741F"
                        />
                        <path
                          d="M35.0043 45H26.3698C23.8548 45 21.8184 47.0912 21.8184 49.6505V59.4404C21.8184 61.9998 23.865 64.0909 26.3698 64.0909H34.9941C37.5092 64.0909 39.5456 61.9998 39.5456 59.4404V49.6505C39.5558 47.0808 37.5092 45 35.0043 45Z"
                          fill="#9E551E"
                        />
                        <path
                          d="M31.0251 55.2271H25.5706C25.0115 55.2271 24.5479 54.7635 24.5479 54.2044C24.5479 53.6453 25.0115 53.1816 25.5706 53.1816H31.0251C31.5842 53.1816 32.0479 53.6453 32.0479 54.2044C32.0479 54.7635 31.5842 55.2271 31.0251 55.2271Z"
                          fill="white"
                        />
                        <path
                          d="M36.4806 60.6822H25.5716C25.0125 60.6822 24.5488 60.2185 24.5488 59.6594C24.5488 59.1004 25.0125 58.6367 25.5716 58.6367H36.4806C37.0397 58.6367 37.5034 59.1004 37.5034 59.6594C37.5034 60.2185 37.0397 60.6822 36.4806 60.6822Z"
                          fill="white"
                        />
                        <path
                          d="M52.7289 45H44.0944C41.5794 45 39.543 47.0912 39.543 49.6505V59.4404C39.543 61.9998 41.5896 64.0909 44.0944 64.0909H52.7188C55.2338 64.0909 57.2702 61.9998 57.2702 59.4404V49.6505C57.2804 47.0808 55.2338 45 52.7289 45Z"
                          fill="#9E551E"
                        />
                        <path
                          opacity="0.4"
                          d="M43.6393 51.8176C44.2669 51.8176 44.7757 51.3089 44.7757 50.6813C44.7757 50.0537 44.2669 49.5449 43.6393 49.5449C43.0117 49.5449 42.5029 50.0537 42.5029 50.6813C42.5029 51.3089 43.0117 51.8176 43.6393 51.8176Z"
                          fill="white"
                        />
                        <path
                          d="M43.6372 52.3848C42.4986 52.3848 41.5713 53.1484 41.5713 54.0893C41.5713 54.1529 41.6213 54.2029 41.6849 54.2029H45.5895C45.6531 54.2029 45.7031 54.1529 45.7031 54.0893C45.7031 53.1484 44.7758 52.3848 43.6372 52.3848Z"
                          fill="white"
                        />
                        <path
                          d="M54.2077 53.8619H48.7532C48.1941 53.8619 47.7305 53.3982 47.7305 52.8391C47.7305 52.28 48.1941 51.8164 48.7532 51.8164H54.2077C54.7668 51.8164 55.2305 52.28 55.2305 52.8391C55.2305 53.3982 54.7668 53.8619 54.2077 53.8619Z"
                          fill="white"
                        />
                        <path
                          d="M54.2053 60.6822H43.2962C42.7371 60.6822 42.2734 60.2185 42.2734 59.6594C42.2734 59.1004 42.7371 58.6367 43.2962 58.6367H54.2053C54.7643 58.6367 55.228 59.1004 55.228 59.6594C55.228 60.2185 54.7643 60.6822 54.2053 60.6822Z"
                          fill="white"
                        />
                        <path
                          d="M53.8616 40.9082C51.2291 40.9082 49.0889 43.0506 49.0889 45.686C49.0889 48.271 51.1085 50.3631 53.741 50.4537C53.8214 50.4436 53.9018 50.4436 53.9621 50.4537C53.9822 50.4537 53.9922 50.4537 54.0123 50.4537C54.0224 50.4537 54.0224 50.4537 54.0324 50.4537C56.6047 50.3631 58.6243 48.271 58.6343 45.686C58.6343 43.0506 56.4941 40.9082 53.8616 40.9082Z"
                          fill="#EBA16B"
                        />
                        <path
                          opacity="0.4"
                          d="M36.1855 16.4473C39.5467 13.4865 36.8434 11.1841 38.8164 13.1572C40.7901 15.1309 46.4664 17.517 51.9746 19.0791L51.5977 16.4453C52.0807 17.9079 52.3437 19.47 52.3438 21.0928C52.3125 29.124 46.0312 35.624 38.0312 35.9053H37.8125C37.625 35.874 37.375 35.874 37.125 35.9053C28.9375 35.624 22.6562 29.124 22.6562 21.0928C22.6563 20.5945 22.6804 20.1019 22.7285 19.6162C28.2653 19.933 33.5137 18.8007 36.1855 16.4473Z"
                          fill="#E5741F"
                        />
                        <path
                          d="M32 28.9473C32 28.9473 35.5523 30.2631 37.9211 30.2631C40.2898 30.2631 43.8421 28.9473 43.8421 28.9473"
                          stroke="#6E401E"
                          stroke-linecap="round"
                        />
                      </svg>
                      <div className="imgicons">
                        <TbCamera size="16" />
                      </div>
                    </div>
                    <p>Your selfie with your ID and handwritten note *</p>
                    <input
                      type="file"
                      className="real-file-input"
                      accept="image/*,.pdf"
                    />
                  </div>
                </div>
              </form>
              <button
                type="button"
                className="premium-btn"
                onClick={() => formik.handleSubmit()}
              >
                <span>Create your account</span>
              </button>

              <p>
                By signing up you agree to our{" "}
                <Link href="#">Terms of Service</Link> and{" "}
                <Link href="#">Privacy Policy</Link>, and confirm that you are
                at least 18 years old.
              </p>
              <p className="fs-18">
                Have an account already? <Link href="#">Log in here.</Link>
              </p>
            </div>
            <h4 className="account_login">
              Are you a creator? <a href="#">Sign up here.</a>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorSignupPage;
