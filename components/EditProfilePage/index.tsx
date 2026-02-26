"use client";
import { useEffect, useRef, useState } from "react";
import CustomSelect from "../CustomSelect";
import { TbCamera } from "react-icons/tb";
import {
  apiPostWithMultiForm,
  getApiWithOutQuery,
} from "@/utils/endpoints/common";
import {
  API_CREATOR_PROFILE_INFO,
  API_UPDATE_CREATOR_PROFILE,
} from "@/utils/api/APIConstant";
import {
  ageGroupOptions,
  bodyTypeOptions,
  countryOptions,
  ethnicityOptions,
  eyeColorOptions,
  hairColorOptions,
  heightOptions,
  sexualOrientationOptions,
  sizeOptions,
  styleOptions,
} from "../helper/creatorOptions";
import ShowToast from "../common/ShowToast";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { validationSchemaCreatorUpdate } from "@/libs/validation";
import { CalendarDays } from "lucide-react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import AccountSecurity from "./AccountSecurity";
import PricingSetting from "./PricingSetting";
import ImageCropModal from "./ImageCropModal";
import { showError, showSuccess } from "@/utils/alert";

countries.registerLocale(enLocale);
const EditProfilePage = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [coverError, setCoverError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [cropOpen, setCropOpen] = useState(false);
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [cropType, setCropType] = useState<"avatar" | "cover" | null>(null);

  const handleCropSave = async (croppedBase64: string) => {
    const blob = await (await fetch(croppedBase64)).blob();
    const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });
    if (cropType === "avatar") {
      setProfileFile(file);
    } else {
      setCoverFile(file);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setActiveField(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await getApiWithOutQuery({ url: API_CREATOR_PROFILE_INFO });

    if (res?.user && res?.creator) {
      const merged = { ...res.user, ...res.creator };
      setFormData(merged);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      displayName: formData.displayName || "",
      userName: formData.userName || "",
      gender: formData.gender || "Male",
      dob: formData.dob || null,
      country: formData.country || "",
      city: formData.city || "",
      bio: formData.bio || "",
      bodyType: formData.bodyType || "",
      sexualOrientation: formData.sexualOrientation || "",
      age: formData.age || "",
      eyeColor: formData.eyeColor || "",
      hairColor: formData.hairColor || "",
      ethnicity: formData.ethnicity || "",
      height: formData.height || "",
      style: formData.style || "",
      size: formData.size || "",
      popularity: formData.popularity || "",
    },
    validationSchema: validationSchemaCreatorUpdate,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const payload = new FormData();

        (Object.keys(values) as (keyof typeof values)[]).forEach((key) => {
          const value = values[key];

          if (value !== "" && value !== null && value !== undefined) {
            payload.append(key, value as any);
          }
        });

        if (profileFile) payload.append("profile", profileFile);
        if (coverFile) payload.append("coverImage", coverFile);

        const res = await apiPostWithMultiForm({
          url: API_UPDATE_CREATOR_PROFILE,
          values: payload,
        });

        if (!res?.success) {
          setLoading(false);
          return;
        }
        if (res?.success) {
          showSuccess("Profile updated successfully");
          await fetchProfile();
        }
      } catch (err: any) {
        const backendMessage = err?.response?.data?.message;

        if (Array.isArray(backendMessage)) {
          showError(backendMessage.join(", "));
        } else {
          showError(
            backendMessage ||
              err?.response?.data?.error ||
              err?.message ||
              "Something went wrong",
          );
        }
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    return () => {
      if (coverFile) {
        URL.revokeObjectURL(URL.createObjectURL(coverFile));
      }
    };
  }, [coverFile]);

  useEffect(() => {
    let objectUrl: string | null = null;

    if (coverFile) {
      objectUrl = URL.createObjectURL(coverFile);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [coverFile]);

  useEffect(() => {
    if (formData?.dob) {
      const parsedDate = new Date(formData.dob);
      setStartDate(parsedDate);
      formik.setFieldValue("dob", formData.dob);
    }
  }, [formData.dob]);

  const calculateAge = (dob: Date) => {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
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

  const today = new Date();

  const maxAllowedDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  );

  const selectedCountry = formik.values.country;

  const countryCode = selectedCountry
    ? countries.getAlpha2Code(selectedCountry, "en")
    : null;

  const months = [
    { label: "January", value: "0" },
    { label: "February", value: "1" },
    { label: "March", value: "2" },
    { label: "April", value: "3" },
    { label: "May", value: "4" },
    { label: "June", value: "5" },
    { label: "July", value: "6" },
    { label: "August", value: "7" },
    { label: "September", value: "8" },
    { label: "October", value: "9" },
    { label: "November", value: "10" },
    { label: "December", value: "11" },
  ];

  const years = Array.from({ length: 100 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { label: year.toString(), value: year.toString() };
  });

  return (
    <>
      <div className="moneyboy-2x-1x-layout-container">
        <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
          <div
            className="moneyboy-feed-page-container moneyboy-diff-content-wrappers"
            data-scroll-zero
            data-multiple-tabs-section
            data-identifier="1"
          >
            <div
              className="moneyboy-feed-page-cate-buttons card show_mobail"
              id="posts-tabs-btn-card"
            >
              <button className="cate-back-btn active-down-effect">
                <span className="icons arrowLeft"></span>
              </button>
              <button className="page-content-type-button active">
                Edit Profile
              </button>
            </div>
            <div
              className="moneyboy-feed-page-cate-buttons card"
              id="posts-tabs-btn-card"
            >
              {/* <button className="cate-back-btn active-down-effect hide_mobail">
                <span className="icons arrowLeft"></span>
              </button> */}
              <button
                className={`page-content-type-button active-down-effect ${
                  tab === 0 ? "active" : ""
                }`}
                onClick={() => setTab(0)}
              >
                Basic information
              </button>
              <button
                className={`page-content-type-button active-down-effect ${
                  tab === 1 ? "active" : ""
                }`}
                onClick={() => setTab(1)}
              >
                Pricing settings
              </button>
              <button
                className={`page-content-type-button active-down-effect ${
                  tab === 2 ? "active" : ""
                }`}
                onClick={() => setTab(2)}
              >
                Account and security
              </button>
            </div>

            <div className="creator-profile-page-container">
              <div className="creator-profile-front-content-container">
                {/* ========== Basic information ========== */}
                {tab === 0 && (
                  <div className="creator-profile-card-container card">
                    <div className="creator-profile-banner">
                      {coverFile ? (
                        <img
                          src={URL.createObjectURL(coverFile)}
                          alt="Creator Profile Banner"
                        />
                      ) : formData?.coverImage && !coverError ? (
                        <img
                          src={formData.coverImage}
                          alt="Creator Profile Banner"
                          onError={() => setCoverError(true)}
                        />
                      ) : (
                        <div className="noprofile">
                          <svg
                            width="40"
                            height="40"
                            viewBox="0 0 66 54"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="animate-m"
                              d="M65.4257 49.6477L64.1198 52.8674C64.0994 52.917 64.076 52.9665 64.0527 53.0132C63.6359 53.8294 62.6681 54.2083 61.8081 53.8848C61.7673 53.8731 61.7265 53.8556 61.6886 53.8381L60.2311 53.1764L57.9515 52.1416C57.0945 51.7509 56.3482 51.1446 55.8002 50.3779C48.1132 39.6156 42.1971 28.3066 38.0271 16.454C37.8551 16.1304 37.5287 15.9555 37.1993 15.9555C36.9631 15.9555 36.7241 16.0459 36.5375 16.2325L28.4395 24.3596C28.1684 24.6307 27.8099 24.7678 27.4542 24.7678C27.4076 24.7678 27.3609 24.7648 27.3143 24.7619C27.2239 24.7503 27.1307 24.7328 27.0432 24.7065C26.8217 24.6366 26.6118 24.5112 26.4427 24.3276C23.1676 20.8193 20.6053 17.1799 18.3097 15.7369C18.1698 15.6495 18.0153 15.6057 17.8608 15.6057C17.5634 15.6057 17.2719 15.7602 17.1029 16.0313C14.1572 20.7377 11.0702 24.8873 7.75721 28.1157C7.31121 28.5471 6.74277 28.8299 6.13061 28.9115L3.0013 29.3254L1.94022 29.4683L1.66912 29.5033C0.946189 29.5994 0.296133 29.0602 0.258237 28.3314L0.00754237 23.5493C-0.0274383 22.8701 0.191188 22.2025 0.610956 21.669C1.51171 20.5293 2.39789 19.3545 3.26512 18.152C5.90032 14.3304 9.52956 8.36475 13.1253 1.39631C13.548 0.498477 14.4283 0 15.3291 0C15.8479 0 16.3727 0.163246 16.8187 0.513052L27.3799 8.76557L39.285 0.521797C39.6931 0.206971 40.1711 0.0583046 40.6434 0.0583046C41.4683 0.0583046 42.2729 0.510134 42.6635 1.32052C50.16 18.2735 55.0282 34.2072 63.6378 47.3439C63.9584 47.8336 64.0197 48.4487 63.8039 48.9851L65.4257 49.6477Z"
                              fill="url(#paint0_linear_4470_53804)"
                            />
                            <defs>
                              <linearGradient
                                id="paint0_linear_4470_53804"
                                x1="0"
                                y1="27"
                                x2="66"
                                y2="27"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop stop-color="#FDAB0A" />
                                <stop offset="0.4" stop-color="#FECE26" />
                                <stop offset="1" stop-color="#FE990B" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      )}

                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        id="coverUpload"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          const reader = new FileReader();
                          reader.onload = () => {
                            setCropImage(reader.result as string);
                            setCropType("cover");
                            setCropOpen(true);
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                      <label
                        htmlFor="coverUpload"
                        className="imgicons active-down-effect-2x"
                      >
                        <TbCamera size={16} />
                      </label>
                    </div>

                    <div className="creator-profile-info-container">
                      <div className="profile-card">
                        <div className="profile-info-buttons">
                          <div className="profile-card__main">
                            <div className="profile-card__avatar-settings">
                              <div className="profile-card__avatar">
                                {profileFile ? (
                                  <img
                                    src={URL.createObjectURL(profileFile)}
                                    alt="Profile Avatar"
                                  />
                                ) : formData?.profile && !avatarError ? (
                                  <img
                                    src={formData.profile}
                                    alt="Profile Avatar"
                                    onError={() => setAvatarError(true)}
                                  />
                                ) : (
                                  <div className="noprofile">
                                    <svg
                                      width="40"
                                      height="40"
                                      viewBox="0 0 66 54"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        className="animate-m"
                                        d="M65.4257 49.6477L64.1198 52.8674C64.0994 52.917 64.076 52.9665 64.0527 53.0132C63.6359 53.8294 62.6681 54.2083 61.8081 53.8848C61.7673 53.8731 61.7265 53.8556 61.6886 53.8381L60.2311 53.1764L57.9515 52.1416C57.0945 51.7509 56.3482 51.1446 55.8002 50.3779C48.1132 39.6156 42.1971 28.3066 38.0271 16.454C37.8551 16.1304 37.5287 15.9555 37.1993 15.9555C36.9631 15.9555 36.7241 16.0459 36.5375 16.2325L28.4395 24.3596C28.1684 24.6307 27.8099 24.7678 27.4542 24.7678C27.4076 24.7678 27.3609 24.7648 27.3143 24.7619C27.2239 24.7503 27.1307 24.7328 27.0432 24.7065C26.8217 24.6366 26.6118 24.5112 26.4427 24.3276C23.1676 20.8193 20.6053 17.1799 18.3097 15.7369C18.1698 15.6495 18.0153 15.6057 17.8608 15.6057C17.5634 15.6057 17.2719 15.7602 17.1029 16.0313C14.1572 20.7377 11.0702 24.8873 7.75721 28.1157C7.31121 28.5471 6.74277 28.8299 6.13061 28.9115L3.0013 29.3254L1.94022 29.4683L1.66912 29.5033C0.946189 29.5994 0.296133 29.0602 0.258237 28.3314L0.00754237 23.5493C-0.0274383 22.8701 0.191188 22.2025 0.610956 21.669C1.51171 20.5293 2.39789 19.3545 3.26512 18.152C5.90032 14.3304 9.52956 8.36475 13.1253 1.39631C13.548 0.498477 14.4283 0 15.3291 0C15.8479 0 16.3727 0.163246 16.8187 0.513052L27.3799 8.76557L39.285 0.521797C39.6931 0.206971 40.1711 0.0583046 40.6434 0.0583046C41.4683 0.0583046 42.2729 0.510134 42.6635 1.32052C50.16 18.2735 55.0282 34.2072 63.6378 47.3439C63.9584 47.8336 64.0197 48.4487 63.8039 48.9851L65.4257 49.6477Z"
                                        fill="url(#paint0_linear_4470_53804)"
                                      />
                                      <defs>
                                        <linearGradient
                                          id="paint0_linear_4470_53804"
                                          x1="0"
                                          y1="27"
                                          x2="66"
                                          y2="27"
                                          gradientUnits="userSpaceOnUse"
                                        >
                                          <stop stop-color="#FDAB0A" />
                                          <stop
                                            offset="0.4"
                                            stop-color="#FECE26"
                                          />
                                          <stop
                                            offset="1"
                                            stop-color="#FE990B"
                                          />
                                        </linearGradient>
                                      </defs>
                                    </svg>
                                  </div>
                                )}

                                <input
                                  type="file"
                                  hidden
                                  accept="image/*"
                                  id="profileUpload"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    const reader = new FileReader();
                                    reader.onload = () => {
                                      setCropImage(reader.result as string);
                                      setCropType("avatar");
                                      setCropOpen(true);
                                    };
                                    reader.readAsDataURL(file);
                                  }}
                                />

                                <label
                                  htmlFor="profileUpload"
                                  className="imgicons active-down-effect-2x"
                                >
                                  <TbCamera size={16} />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="creator-subscriptions-container">
                        <div className="form_grid mb-10">
                          <div>
                            <div className="label-input">
                              <div className="input-placeholder-icon">
                                <i className="icons user svg-icon"></i>
                              </div>
                              <input
                                type="text"
                                placeholder="First Name *"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="firstName"
                              />
                            </div>
                            {formik.touched.firstName &&
                              formik.errors.firstName && (
                                <span className="error-message">
                                  {formik.errors.firstName as string}
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
                                placeholder="Last name *"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="lastName"
                              />
                            </div>
                            {formik.touched.lastName &&
                              formik.errors.lastName && (
                                <span className="error-message">
                                  {formik.errors.lastName as string}
                                </span>
                              )}
                          </div>
                          <div>
                            <div className="label-input">
                              <div className="input-placeholder-icon">
                                <i className="icons user2 svg-icon"></i>
                              </div>
                              <input
                                type="text"
                                placeholder="Display name *"
                                value={formik.values.displayName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="displayName"
                              />
                            </div>
                            {formik.touched.displayName &&
                              formik.errors.displayName && (
                                <span className="error-message">
                                  {formik.errors.displayName as string}
                                </span>
                              )}
                          </div>
                          <div>
                            <div className="label-input">
                              <div className="input-placeholder-icon">
                                <i className="icons profile-check svg-icon"></i>
                              </div>
                              <input
                                type="text"
                                placeholder="User name *"
                                value={formik.values.userName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="userName"
                                disabled
                              />
                            </div>
                            {formik.touched.userName &&
                              formik.errors.userName && (
                                <span className="error-message">
                                  {formik.errors.userName as string}
                                </span>
                              )}
                          </div>
                          <div>
                            <div className="label-input ">
                              <div className="input-placeholder-icon">
                                <i className="icons groupUser svg-icon"></i>
                              </div>
                              <input
                                type={"text"}
                                placeholder="Gender"
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="gender"
                              />
                            </div>
                            {/* <CustomSelect
                          label="Select Gender *"
                          icon={<i className="icons groupUser svg-icon"></i>}
                          options={genderOptions}
                          value={formik.values.gender}
                          onChange={(val) =>
                            formik.setFieldValue("gender", val)
                          }
                        /> */}
                            {formik.touched.gender && formik.errors.gender && (
                              <span className="error-message">
                                {formik.errors.gender as string}
                              </span>
                            )}
                          </div>
                          <div>
                            <div
                              className="label-input calendar-dropdown"
                              ref={wrapperRef}
                            >
                              <div className="input-placeholder-icon">
                                <CalendarDays className="icons svg-icon" />
                              </div>
                              <input
                                type="text"
                                placeholder="(DD/MM/YYYY)"
                                className="form-input"
                                readOnly
                                value={
                                  startDate?.toLocaleDateString("en-GB") || ""
                                }
                                onClick={() => setActiveField("schedule")}
                              />
                              {activeField === "schedule" && (
                                <div className="calendar_show">
                                  <DatePicker
                                    selected={startDate}
                                    inline
                                    maxDate={maxAllowedDate}
                                    renderCustomHeader={({
                                      date,
                                      changeYear,
                                      changeMonth,
                                    }) => (
                                      <div
                                        className="flex gap-5 select_wrap"
                                        onMouseDown={(e) => e.stopPropagation()}
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        <CustomSelect
                                          className="bg-white p-sm size-sm"
                                          options={months}
                                          value={date.getMonth().toString()}
                                          onChange={(val) =>
                                            changeMonth(Number(val))
                                          }
                                          searchable={false}
                                        />
                                        <CustomSelect
                                          className="bg-white p-sm size-sm"
                                          options={years}
                                          value={date.getFullYear().toString()}
                                          onChange={(val) =>
                                            changeYear(Number(val))
                                          }
                                          searchable={false}
                                        />
                                      </div>
                                    )}
                                    onChange={(date: Date | null) => {
                                      if (date) {
                                        const formattedDate =
                                          date.toISOString();
                                        formik.setFieldValue(
                                          "dob",
                                          formattedDate,
                                        );
                                        const age = calculateAge(date);
                                        const ageGroup = getAgeGroup(age);
                                        formik.setFieldValue("age", ageGroup);
                                      }
                                      setActiveField(null);
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                            {formik.touched.dob && formik.errors.dob && (
                              <span className="error-message">
                                {formik.errors.dob as string}
                              </span>
                            )}
                          </div>
                          <div>
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
                              onChange={(val) =>
                                formik.setFieldValue("country", val)
                              }
                            />
                            {formik.touched.country &&
                              formik.errors.country && (
                                <span className="error-message">
                                  {formik.errors.country as string}
                                </span>
                              )}
                          </div>
                          <div>
                            <div className="label-input">
                              <div className="input-placeholder-icon">
                                <svg className="icons locationIcon svg-icon"></svg>
                              </div>
                              <input
                                type="text"
                                placeholder="City *"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name="city"
                              />
                            </div>
                            {formik.touched.city && formik.errors.city && (
                              <span className="error-message">
                                {formik.errors.city as string}
                              </span>
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
                                {formik.errors.bio as string}
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
                            {formik.touched.bodyType &&
                              formik.errors.bodyType && (
                                <span className="error-message">
                                  {formik.errors.bodyType as string}
                                </span>
                              )}
                          </div>
                          <div>
                            <CustomSelect
                              label="All Sexual Orientation"
                              icon={
                                <svg className="icons timeIcon svg-icon"></svg>
                              }
                              options={sexualOrientationOptions}
                              value={formik.values.sexualOrientation}
                              onChange={(val) =>
                                formik.setFieldValue("sexualOrientation", val)
                              }
                            />
                            {formik.touched.sexualOrientation &&
                              formik.errors.sexualOrientation && (
                                <span className="error-message">
                                  {formik.errors.sexualOrientation as string}
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
                              onChange={(val) =>
                                formik.setFieldValue("age", val)
                              }
                            />
                            {formik.touched.age && formik.errors.age && (
                              <span className="error-message">
                                {formik.errors.age as string}
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
                            {formik.touched.eyeColor &&
                              formik.errors.eyeColor && (
                                <span className="error-message">
                                  {formik.errors.eyeColor as string}
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
                                  {formik.errors.hairColor as string}
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
                                  {formik.errors.ethnicity as string}
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
                                {formik.errors.height as string}
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
                              onChange={(val) =>
                                formik.setFieldValue("style", val)
                              }
                            />
                            {formik.touched.style && formik.errors.style && (
                              <span className="error-message">
                                {formik.errors.style as string}
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
                              onChange={(val) =>
                                formik.setFieldValue("size", val)
                              }
                            />
                            {formik.touched.size && formik.errors.size && (
                              <span className="error-message">
                                {formik.errors.size as string}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="btm_btn ">
                          <button
                            type="submit"
                            className={`premium-btn active-down-effect ${loading ? "disabled" : ""}`}
                            onClick={() => formik.handleSubmit()}
                            disabled={loading}
                          >
                            <span>
                              {loading ? "Saving..." : "Save Changes"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* ========== Pricing settings ========== */}
                {tab === 1 && <PricingSetting />}
                {/* ========== Account and security ========== */}
                {tab === 2 && <AccountSecurity profile={formData} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Start */}
      <ImageCropModal
        show={cropOpen}
        image={cropImage}
        aspect={cropType === "cover" ? 6 / 1 : 1}
        onClose={() => setCropOpen(false)}
        onSave={handleCropSave}
      />

      {/* <div className="modal show" role="dialog" aria-modal="true" aria-labelledby="age-modal-title">
        <form className="modal-wrap imgcrop-modal">
          <button className="close-btn"><CgClose size={22} /></button>
          <h3 className="title">Edit Profile Photo</h3>
          <div className="img_wrap">
            <img alt="Post Image" src="https://res.cloudinary.com/drhj03nvv/image/upload/v1771397982/posts/6995635dd577ca04fd5c7755/1771397981555-post-img-4.jpg.jpg"/>
          </div>
          <div className="actions">
            <button className="premium-btn active-down-effect" type="submit"><span>Save</span></button>
          </div>
        </form>
      </div> */}
    </>
  );
};

export default EditProfilePage;
