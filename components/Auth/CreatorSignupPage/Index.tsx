"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomSelect from "@/components/CustomSelect";
import Link from "next/link";
import { } from "react";
import { useFormik } from "formik";
import { apiPost } from "@/utils/endpoints/common";
import { API_CREATOR_REGISTER, API_RESEND_OTP, API_VERIFY_OTP, } from "@/utils/api/APIConstant";
import ShowToast from "@/components/common/ShowToast";
import { ageGroupOptions, bodyTypeOptions, countryOptions, ethnicityOptions, eyeColorOptions, hairColorOptions, heightOptions, sexualOrientationOptions, sizeOptions, styleOptions, } from "@/components/helper/creatorOptions";
import OtpModal from "@/components/OtpModal";
import { useRouter } from "next/navigation";
import { CalendarDays } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoArrowBackOutline } from "react-icons/io5";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import SumsubWebSdk from "@sumsub/websdk-react";
import { validationSchemaCreator } from "@/libs/validation";

countries.registerLocale(enLocale);

const CreatorSignupPage = () => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [activeField, setActiveField] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setActiveField(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      displayName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "Male",
      dob: null,
      country: "",
      city: "",
      bio: "",
      bodyType: "",
      sexualOrientation: "",
      age: "",
      eyeColor: "",
      hairColor: "",
      ethnicity: "",
      height: "",
      style: "",
      size: "",
      popularity: "",
    },
    validationSchema: validationSchemaCreator,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const res = await apiPost({
          url: API_CREATOR_REGISTER,
          values,
        });

        // ✅ If backend sends success: false
        if (!res?.success) {
          if (
            res?.message?.toLowerCase().includes("email") ||
            res?.error?.toLowerCase().includes("email")
          ) {
            ShowToast(
              "Email already exists. Please use another email.",
              "error",
            );
          } else {
            ShowToast(
              res?.message || res?.error || "Something went wrong",
              "error",
            );
          }

          setLoading(false);
          return;
        }

        // ✅ SUCCESS
        ShowToast(res.message, "success");
        setEmailForOtp(values.email);
        setOtpOpen(true);
      } catch (err: any) {
        // ✅ If API throws error (409 / 400)
        if (err?.response?.data?.message?.toLowerCase().includes("email")) {
          ShowToast("Email already exists. Please use another email.", "error");
        } else {
          ShowToast(
            err?.response?.data?.message ||
            err?.message ||
            "Something went wrong",
            "error",
          );
        }
      } finally {
        setLoading(false);
      }
    },
  });

  const verifyOtp = async (otp: string) => {
    try {
      const res = await apiPost({
        url: API_VERIFY_OTP,
        values: {
          email: emailForOtp,
          otp: otp,
        },
      });

      if (res?.success) {
        setOtpOpen(false);
        setToken(res?.token);
      }

      if (res?.error) {
        ShowToast(res.error, "error");
        return;
      }
    } catch (err: any) {
      ShowToast(err?.message || "OTP verification failed", "error");
    }
  };

  // const verifyOtp = async (otp: string) => {
  //   try {
  //     const res = await signIn("credentials", {
  //       redirect: false,
  //       email: emailForOtp,
  //       otp,
  //     });

  //     if (res?.error) {
  //       ShowToast(res.error, "error");
  //       return;
  //     }

  //     ShowToast("OTP verified successfully", "success");
  //     setOtpOpen(false);

  //     // redirect to feed
  //     router.push("/feed");
  //   } catch (err: any) {
  //     ShowToast(err?.message || "OTP verification failed", "error");
  //   }
  // };

  const selectedCountry = formik.values.country;

  const countryCode = selectedCountry
    ? countries.getAlpha2Code(selectedCountry, "en")
    : null;

  const today = new Date();

  const maxAllowedDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  );

  const calculateAge = (dob: Date) => {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  };

  const getAgeGroup = (age: number) => {
    if (age >= 18 && age <= 24) return "18_24";
    if (age >= 25 && age <= 34) return "25_34";
    if (age >= 35 && age <= 44) return "35_44";
    if (age >= 45 && age <= 54) return "45_54";
    if (age >= 55) return "55_plus";
    return "";
  };

  const months = [
    { label: "Jan", value: "0" },
    { label: "Feb", value: "1" },
    { label: "Mar", value: "2" },
    { label: "Apr", value: "3" },
    { label: "May", value: "4" },
    { label: "Jun", value: "5" },
    { label: "Jul", value: "6" },
    { label: "Aug", value: "7" },
    { label: "Sep", value: "8" },
    { label: "Oct", value: "9" },
    { label: "Nov", value: "10" },
    { label: "Dec", value: "11" },
  ];

  const years = Array.from({ length: 100 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { label: year.toString(), value: year.toString() };
  });

  return (
    <div className="bg-off-white">
      <div className="container login_wrap creator_wrap">
        <div className="moneyboy-feed-page-container cont_wrap">
          <div className="main_cont">
            <img src="/images/logo.svg" className="logo_wrap" />
            {!token && (
              <>
                <div className="moneyboy-post__container card">
                  <div className="head">
                    <div className="backicons">
                      <button className="cate-back-btn active-down-effect" onClick={() => router.push("/feed")}><span><IoArrowBackOutline className="icons" /></span></button>
                    </div>
                    <div className="textcont">
                      <h3 className="heading">Creator Sign Up</h3>
                      <p className="mb-10">Sign up to make money and interact with your fans!</p>
                    </div>
                  </div>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="creator_maingrid">
                      <div className="form_grid">
                        <div>
                          <div className="label-input">
                            <div className="input-placeholder-icon"><i className="icons user svg-icon"></i></div>
                            <input type="text" placeholder="First Name *" value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur} name="firstName" />
                          </div>
                          {formik.touched.firstName && formik.errors.firstName && (<span className="error-message">{formik.errors.firstName}</span>)}
                        </div>
                        <div>
                          <div className="label-input">
                            <div className="input-placeholder-icon"><i className="icons user svg-icon"></i></div>
                            <input type="text" placeholder="Last name *" value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur} name="lastName" />
                          </div>
                          {formik.touched.lastName && formik.errors.lastName && (<span className="error-message">{formik.errors.lastName}</span>)}
                        </div>
                        <div>
                          <div className="label-input">
                            <div className="input-placeholder-icon"><i className="icons user2 svg-icon"></i></div>
                            <input type="text" placeholder="Display name *" value={formik.values.displayName} onChange={formik.handleChange} onBlur={formik.handleBlur} name="displayName" />
                          </div>
                          {formik.touched.displayName && formik.errors.displayName && (<span className="error-message">{formik.errors.displayName}</span>)}
                        </div>
                        <div>
                          <div className="label-input">
                            <div className="input-placeholder-icon"><i className="icons profile-check svg-icon"></i></div>
                            <input type="text" placeholder="User name *" value={formik.values.userName} onChange={formik.handleChange} onBlur={formik.handleBlur} name="userName" />
                          </div>
                          {formik.touched.userName && formik.errors.userName && (<span className="error-message">{formik.errors.userName}</span>)}
                        </div>
                        <div className="one">
                          <div className="label-input ">
                            <div className="input-placeholder-icon"><i className="icons message svg-icon"></i></div>
                            <input type="text" placeholder="Email Address *" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" />
                          </div>
                          {formik.touched.email && formik.errors.email && (<span className="error-message">{formik.errors.email}</span>)}
                        </div>
                        <div>
                          <div className="label-input password">
                            <div className="input-placeholder-icon"><i className="icons lock svg-icon"></i></div>
                            <input type={showPass ? "text" : "password"} placeholder="Password *" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" />
                            <span onClick={() => setShowPass(!showPass)} className="input-placeholder-icon eye-icon">
                              {showPass ? (
                                <i className="icons eye-slash svg-icon"></i>
                              ) : (
                                <i className="icons eye svg-icon"></i>
                              )}
                            </span>
                          </div>
                          {formik.touched.password && formik.errors.password && (
                            <span className="error-message">{formik.errors.password}</span>
                          )}
                        </div>
                        <div>
                          <div className="label-input password">
                            <div className="input-placeholder-icon"><i className="icons lock svg-icon"></i></div>
                            <input type={showConfirmPass ? "text" : "password"} placeholder="Confirm password *" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} name="confirmPassword" />
                            <span onClick={() => setShowConfirmPass(!showConfirmPass)} className="input-placeholder-icon eye-icon">
                              {showConfirmPass ? (
                                <i className="icons eye-slash svg-icon"></i>
                              ) : (
                                <i className="icons eye svg-icon"></i>
                              )}
                            </span>
                          </div>
                          {formik.touched.confirmPassword && formik.errors.confirmPassword && (<span className="error-message">{formik.errors.confirmPassword}</span>)}
                        </div>
                        <div>
                          <div className="label-input ">
                            <div className="input-placeholder-icon"><i className="icons groupUser svg-icon"></i></div>
                            <input type={"text"} placeholder="Gender" value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur} name="gender" disabled />
                          </div>
                          {formik.touched.gender && formik.errors.gender && (<span className="error-message">{formik.errors.gender}</span>)}
                        </div>
                        <div>
                          <div className="label-input calendar-dropdown" ref={wrapperRef} >
                            <div className="input-placeholder-icon"><CalendarDays className="icons svg-icon" /></div>
                            <input type="text" placeholder="(DD/MM/YYYY)" className="form-input" readOnly value={startDate?.toLocaleDateString("en-GB") || ""} onClick={() => setActiveField("schedule")} />
                            {activeField === "schedule" && (
                              <div className="calendar_show">
                                <DatePicker selected={startDate} inline maxDate={maxAllowedDate} minDate={new Date(1900, 0, 1)} showMonthDropdown showYearDropdown dropdownMode="select" scrollableYearDropdown yearDropdownItemNumber={100} renderCustomHeader={({ date, changeYear, changeMonth, }) => (
                                  <div className="flex gap-5 select_wrap" onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
                                    <CustomSelect className="bg-white p-sm size-sm" options={months} value={date.getMonth().toString()} onChange={(val) => changeMonth(Number(val))} searchable={false}/>
                                    <CustomSelect className="bg-white p-sm size-sm" options={years} value={date.getFullYear().toString()} onChange={(val) => changeYear(Number(val))} searchable={false}/>
                                  </div>
                                )}
                                  onChange={(date: Date | null) => { setStartDate(date); if (date) { const formattedDate = date.toLocaleDateString("en-CA"); formik.setFieldValue("dob", formattedDate); const age = calculateAge(date); const ageGroup = getAgeGroup(age); formik.setFieldValue("age", ageGroup); } setActiveField(null); }} />
                              </div>
                            )}
                          </div>
                          {formik.touched.dob && formik.errors.dob && (<span className="error-message">{formik.errors.dob}</span>)}
                        </div>
                        <div>
                          <CustomSelect
                            label="Select Country *"
                            icon={
                              countryCode ? (
                                <div className="flag-circle"><img src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`} alt="flag" /></div>
                              ) : (
                                <svg className="icons locationIcon svg-icon"></svg>
                              )
                            }
                            options={countryOptions}
                            value={formik.values.country}
                            onChange={(val) => formik.setFieldValue("country", val)}
                          />
                          {formik.touched.country && formik.errors.country && (<span className="error-message">{formik.errors.country}</span>)}
                        </div>
                        <div>
                          <div className="label-input">
                            <div className="input-placeholder-icon"><svg className="icons locationIcon svg-icon"></svg></div>
                            <input type="text" placeholder="City *" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} name="city" />
                          </div>
                          {formik.touched.city && formik.errors.city && (
                            <span className="error-message">{formik.errors.city}</span>
                          )}
                        </div>
                        <div className="one">
                          <div className="label-input textarea one">
                            <div className="input-placeholder-icon">
                              <svg className="icons messageUser svg-icon"></svg>
                            </div>
                            <textarea
                              rows={4}
                              placeholder="Bio"
                              value={formik.values.bio}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              name="bio"
                            ></textarea>
                          </div>
                          {formik.touched.bio && formik.errors.bio && (
                            <span className="error-message">
                              {formik.errors.bio}
                            </span>
                          )}
                        </div>
                        <div>
                          <CustomSelect
                            label="All Body Types"
                            icon={<svg className="icons handbody svg-icon" />}
                            options={bodyTypeOptions}
                            value={formik.values.bodyType}
                            onChange={(val) =>
                              formik.setFieldValue("bodyType", val)
                            }
                          />
                          {formik.touched.bodyType && formik.errors.bodyType && (
                            <span className="error-message">
                              {formik.errors.bodyType}
                            </span>
                          )}
                        </div>
                        <div>
                          <CustomSelect
                            label="All Sexual Orientation"
                            icon={<svg className="icons timeIcon svg-icon"></svg>}
                            options={sexualOrientationOptions}
                            value={formik.values.sexualOrientation}
                            onChange={(val) =>
                              formik.setFieldValue("sexualOrientation", val)
                            }
                          />
                          {formik.touched.sexualOrientation &&
                            formik.errors.sexualOrientation && (
                              <span className="error-message">
                                {formik.errors.sexualOrientation}
                              </span>
                            )}
                        </div>
                        <div>
                          <CustomSelect
                            label="All Ages"
                            icon={
                              <svg className="icons calendarClock svg-icon"></svg>
                            }
                            options={ageGroupOptions}
                            value={formik.values.age}
                            onChange={(val) => formik.setFieldValue("age", val)}
                          />
                          {formik.touched.age && formik.errors.age && (
                            <span className="error-message">
                              {formik.errors.age}
                            </span>
                          )}
                        </div>

                        <div>
                          <CustomSelect
                            label="All Eye Colors"
                            icon={
                              <svg className="icons cameraEye svg-icon"></svg>
                            }
                            options={eyeColorOptions}
                            value={formik.values.eyeColor}
                            onChange={(val) =>
                              formik.setFieldValue("eyeColor", val)
                            }
                          />
                          {formik.touched.eyeColor && formik.errors.eyeColor && (
                            <span className="error-message">
                              {formik.errors.eyeColor}
                            </span>
                          )}
                        </div>
                        <div>
                          <CustomSelect
                            label="All Hair Colors"
                            icon={
                              <svg className="icons paintDrop svg-icon"></svg>
                            }
                            options={hairColorOptions}
                            value={formik.values.hairColor}
                            onChange={(val) =>
                              formik.setFieldValue("hairColor", val)
                            }
                          />
                          {formik.touched.hairColor &&
                            formik.errors.hairColor && (
                              <span className="error-message">
                                {formik.errors.hairColor}
                              </span>
                            )}
                        </div>

                        <div>
                          <CustomSelect
                            label="All Ethnicities"
                            icon={
                              <svg className="icons multiUser svg-icon"></svg>
                            }
                            options={ethnicityOptions}
                            value={formik.values.ethnicity}
                            onChange={(val) =>
                              formik.setFieldValue("ethnicity", val)
                            }
                          />
                          {formik.touched.ethnicity &&
                            formik.errors.ethnicity && (
                              <span className="error-message">
                                {formik.errors.ethnicity}
                              </span>
                            )}
                        </div>
                        <div>
                          <CustomSelect
                            label="All Heights"
                            icon={
                              <svg className="icons uploadDownload svg-icon"></svg>
                            }
                            options={heightOptions}
                            value={formik.values.height}
                            onChange={(val) =>
                              formik.setFieldValue("height", val)
                            }
                          />
                          {formik.touched.height && formik.errors.height && (
                            <span className="error-message">
                              {formik.errors.height}
                            </span>
                          )}
                        </div>
                        <div>
                          <CustomSelect
                            label="All Styles"
                            icon={
                              <svg className="icons documentHeart svg-icon"></svg>
                            }
                            options={styleOptions}
                            value={formik.values.style}
                            onChange={(val) => formik.setFieldValue("style", val)}
                          />
                          {formik.touched.style && formik.errors.style && (
                            <span className="error-message">
                              {formik.errors.style}
                            </span>
                          )}
                        </div>
                        <div>
                          <CustomSelect
                            label="All Sizes"
                            icon={
                              <svg className="icons expanddiagonal svg-icon size-18"></svg>
                            }
                            options={sizeOptions}
                            value={formik.values.size}
                            onChange={(val) => formik.setFieldValue("size", val)}
                          />
                          {formik.touched.size && formik.errors.size && (
                            <span className="error-message">
                              {formik.errors.size}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="premium-btn" disabled={loading}>

                      {loading ? (
                        <span className="loader"></span>
                      ) : (
                        <span>Create your account</span>
                      )}
                    </button>
                  </form>
                  <p>
                    By signing up you agree to our{" "}
                    <Link href="/terms">Terms of Service</Link> and{" "}
                    <Link href="/privacy">Privacy Policy</Link>, and confirm
                    that you are at least 18 years old.
                  </p>
                  <p className="fs-18">
                    Have an account already?{" "}
                    <Link href="/login">Log in here.</Link>
                  </p>
                </div>
                <h4 className="account_login">
                  Are you a fan? <a href="/signup">Sign up here.</a>
                </h4>
              </>
            )}
          </div>
        </div>
      </div>

      {emailForOtp && otpOpen && (
        <OtpModal
          open={otpOpen}
          onClose={() => setOtpOpen(false)}
          email={emailForOtp}
          onSubmit={verifyOtp}
          resendApi={API_RESEND_OTP}
        />
      )}

      {token && (
        <SumsubWebSdk
          accessToken={token}
          expirationHandler={() => window.location.reload()}
          config={{ lang: "en" }}
          options={{ adaptIframeHeight: true }}
          onMessage={(type: any, payload: any) => {
            console.log("Sumsub Event:", type, payload);
            if (
              type === "idCheck.onApplicantStatusChanged" &&
              payload?.reviewStatus === "completed"
            ) {
              setTimeout(() => {
                router.push("/login");
              }, 1500);
            }
          }}
        />
      )}
    </div>
  );
};

export default CreatorSignupPage;
