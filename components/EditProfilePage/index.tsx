"use client";
import { useEffect, useState } from "react";
import CustomSelect from "../CustomSelect";
import { TbCamera } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";
import {
  apiPost,
  apiPostWithMultiForm,
  getApiWithOutQuery,
} from "@/utils/endpoints/common";
import {
  API_BLOCK_COUNTRIES,
  API_CHANGE_CREATOR_PASSWORD,
  API_CREATE_UPDATE_SUBSCRIPTION,
  API_CREATOR_PROFILE,
  API_GET_MY_SUBSCRIPTION,
  API_TOGGLE_CREATOR_ACCOUNT,
  API_UPDATE_CREATOR_PROFILE,
} from "@/utils/api/APIConstant";
import { countryOptions, creatorFormOptions } from "../helper/creatorOptions";
import ShowToast from "../common/ShowToast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";

export enum UserStatus {
  ACTIVE = 0,
  NOT_VERIFIED = 1,
  SELF_DEACTIVATED = 2,
  ADMIN_DEACTIVATED = 3,
  DELETED = 4,
  VERIFIED = 5,
}
const ALLOWED_PROFILE_FIELDS = [
  // user fields
  "firstName",
  "lastName",
  "displayName",
  "userName",

  // creator fields
  "gender",
  "dob",
  "country",
  "city",
  "bio",
  "bodyType",
  "sexualOrientation",
  "age",
  "eyeColor",
  "hairColor",
  "ethnicity",
  "height",
  "style",
  "size",
  "popularity",
];

const EditProfilePage = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [tab, setTab] = useState(0);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [userProfile, setUserProfile] = useState<any>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [blockedCountry, setBlockedCountry] = useState<string | null>(null);
  const [blockedCountries, setBlockedCountries] = useState<string[]>([]);
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [subscription, setSubscription] = useState({
    monthlyPrice: "",
    yearlyPrice: "",
    ppvVideoPrice: "",
    ppvPhotoPrice: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getApiWithOutQuery({ url: API_CREATOR_PROFILE });

      if (res?.user && res?.creator) {
        const merged = { ...res.user, ...res.creator };

        const filtered: any = {};
        ALLOWED_PROFILE_FIELDS.forEach((key) => {
          if (merged[key] !== undefined) {
            filtered[key] = merged[key];
          }
        });

        setProfile(merged);
        setFormData(filtered);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    const payload = new FormData();

    ALLOWED_PROFILE_FIELDS.forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null) {
        payload.append(key, formData[key]);
      }
    });

    if (profileFile) payload.append("profile", profileFile);
    if (coverFile) payload.append("coverImage", coverFile);

    const res = await apiPostWithMultiForm({
      url: API_UPDATE_CREATOR_PROFILE,
      values: payload,
    });

    if (res?.success) {
      ShowToast("Profile updated successfully", "success");
    }
  };

  const handleChangePassword = async () => {
    if (!passwordData.password || !passwordData.confirmPassword) {
      ShowToast("Please fill all password fields", "error");
      return;
    }

    if (passwordData.password !== passwordData.confirmPassword) {
      ShowToast("Password and confirm password do not match", "error");
      return;
    }

    const res = await apiPost({
      url: API_CHANGE_CREATOR_PASSWORD,
      values: passwordData,
    });

    if (res?.success) {
      ShowToast(res.message || "Password updated successfully", "success");
      setPasswordData({
        password: "",
        confirmPassword: "",
      });
    } else {
      ShowToast(res?.message || "Failed to update password", "error");
    }
  };
  const handleToggleAccount = async () => {
    try {
      const res = await apiPost({
        url: API_TOGGLE_CREATOR_ACCOUNT,
        values: {},
      });

      if (res?.success) {
        ShowToast(res.message, "success");

        setUserProfile((prev: any) => ({
          ...prev,
          status: res.status,
        }));
      }
    } catch (error: any) {
      ShowToast(error?.message || "Failed to toggle account", "error");
    }
  };

  useEffect(() => {
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

    if (tab === 1) {
      fetchSubscription();
    }
  }, [tab]);

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
        ShowToast("Subscription updated successfully", "success");
      } else {
        ShowToast(res?.message || "Failed to update subscription", "error");
      }
    },
  });

  const handleSaveBlockedCountries = async () => {
    if (!blockedCountries.length) {
      ShowToast("Please select at least one country", "error");
      return;
    }

    const res = await apiPost({
      url: API_BLOCK_COUNTRIES,
       values: { countryNames: blockedCountries },  
    });

    if (res?.success) {
      ShowToast("Blocked countries updated successfully", "success");
    } else {
      ShowToast(res?.message || "Failed to update blocked countries", "error");
    }
  };

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
                {tab === 0 && profile && (
                  <div className="creator-profile-card-container card">
                    <div className="creator-profile-banner">
                      <img
                        src={
                          coverFile
                            ? URL.createObjectURL(coverFile)
                            : profile.coverImage ||
                              "/images/profile-banners/profile-banner-2.jpg"
                        }
                        alt="Creator Profile Banner Image"
                      />

                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        id="coverUpload"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setCoverFile(e.target.files[0]);
                          }
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
                                <img
                                  src={
                                    profileFile
                                      ? URL.createObjectURL(profileFile)
                                      : profile.profile ||
                                        "/images/profile-avatars/profile-avatar-1.png"
                                  }
                                  alt="MoneyBoy Social Profile Avatar"
                                />

                                <input
                                  type="file"
                                  hidden
                                  accept="image/*"
                                  id="profileUpload"
                                  onChange={(e) => {
                                    if (e.target.files?.[0]) {
                                      setProfileFile(e.target.files[0]);
                                    }
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
                        <div className="form_grid">
                          {/* First Name */}
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <i className="icons user svg-icon"></i>
                            </div>
                            <input
                              type="text"
                              placeholder="First Name *"
                              value={formData.firstName || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  firstName: e.target.value,
                                })
                              }
                            />
                          </div>

                          {/* Last Name */}
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <i className="icons user svg-icon"></i>
                            </div>
                            <input
                              type="text"
                              placeholder="Last Name *"
                              value={formData.lastName || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  lastName: e.target.value,
                                })
                              }
                            />
                          </div>

                          {/* Display Name */}
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <i className="icons user2 svg-icon"></i>
                            </div>
                            <input
                              type="text"
                              placeholder="Display Name *"
                              value={formData.displayName || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  displayName: e.target.value,
                                })
                              }
                            />
                          </div>

                          {/* Username */}
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <i className="icons profile-check svg-icon"></i>
                            </div>
                            <input
                              type="text"
                              placeholder="Username *"
                              value={formData.userName || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  userName: e.target.value,
                                })
                              }
                            />
                          </div>

                          {/* Gender */}
                          <CustomSelect
                            label="Select Your Gender"
                            icon={<svg className="icons groupUser svg-icon" />}
                            options={creatorFormOptions.genderOptions}
                            value={formData.gender || ""}
                            onChange={(val) =>
                              setFormData({ ...formData, gender: val })
                            }
                          />

                          {/* Date of Birth */}
                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <i className="icons bookmarkIcon svg-icon"></i>
                            </div>
                            <input
                              type="date"
                              placeholder="Date of Birth (DD/MM/YYYY) *"
                              value={formData.dob || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  dob: e.target.value,
                                })
                              }
                            />
                          </div>

                          {/* Country */}
                          <CustomSelect
                            label="Select Country"
                            icon={
                              <img
                                src="/images/united_flag.png"
                                className="svg-icon"
                              />
                            }
                            options={creatorFormOptions.countryOptions}
                            value={formData.country || ""}
                            onChange={(val) =>
                              setFormData({ ...formData, country: val })
                            }
                          />

                          {/* City */}
                          <CustomSelect
                            label="Select City"
                            icon={
                              <svg className="icons locationIcon svg-icon"></svg>
                            }
                            options={creatorFormOptions.cityOptions}
                            value={formData.city || ""}
                            onChange={(val) =>
                              setFormData({ ...formData, city: val })
                            }
                          />

                          {/* Bio */}
                          <div className="label-input textarea one">
                            <div className="input-placeholder-icon">
                              <svg className="icons messageUser svg-icon"></svg>
                            </div>
                            <textarea
                              rows={4}
                              placeholder="Bio"
                              value={formData.bio || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  bio: e.target.value,
                                })
                              }
                            ></textarea>
                          </div>

                          {/* Body Type */}
                          <CustomSelect
                            label="All Body Types"
                            icon={<svg className="icons handbody svg-icon" />}
                            options={creatorFormOptions.bodyTypeOptions}
                            value={formData.bodyType || ""}
                            onChange={(val) =>
                              setFormData({ ...formData, bodyType: val })
                            }
                          />

                          {/* Sexual Orientation */}
                          <CustomSelect
                            label="All Sexual Orientations"
                            icon={
                              <svg className="icons timeIcon svg-icon"></svg>
                            }
                            options={
                              creatorFormOptions.sexualOrientationOptions
                            }
                            value={formData.sexualOrientation || ""}
                            onChange={(val) =>
                              setFormData({
                                ...formData,
                                sexualOrientation: val,
                              })
                            }
                          />

                          {/* Age Group */}
                          <CustomSelect
                            label="All Ages"
                            icon={
                              <svg className="icons calendarClock svg-icon"></svg>
                            }
                            options={creatorFormOptions.ageGroupOptions}
                            value={formData.age || ""}
                            onChange={(val) =>
                              setFormData({ ...formData, age: val })
                            }
                          />

                          {/* Eye Color */}
                          <CustomSelect
                            label="All Eye Colors"
                            icon={
                              <svg className="icons cameraEye svg-icon"></svg>
                            }
                            options={creatorFormOptions.eyeColorOptions}
                            value={formData.eyeColor || ""}
                            onChange={(val) =>
                              setFormData({ ...formData, eyeColor: val })
                            }
                          />

                          {/* Hair Color */}
                          <CustomSelect
                            label="All Hair Colors"
                            icon={
                              <svg className="icons paintDrop svg-icon"></svg>
                            }
                            options={creatorFormOptions.hairColorOptions}
                            value={formData.hairColor || ""}
                            onChange={(val) =>
                              setFormData({ ...formData, hairColor: val })
                            }
                          />

                          {/* Ethnicity */}
                          <CustomSelect
                            label="All Ethnicities"
                            icon={
                              <svg className="icons multiUser svg-icon"></svg>
                            }
                            options={creatorFormOptions.ethnicityOptions}
                            value={formData.ethnicity || ""}
                            onChange={(val) =>
                              setFormData({ ...formData, ethnicity: val })
                            }
                          />

                          {/* Height */}
                          <CustomSelect
                            label="All Heights"
                            icon={
                              <svg className="icons uploadDownload svg-icon"></svg>
                            }
                            options={creatorFormOptions.heightOptions}
                            value={formData.height || ""}
                            onChange={(val) =>
                              setFormData({ ...formData, height: val })
                            }
                          />

                          {/* Style */}
                          <CustomSelect
                            label="All Styles"
                            icon={
                              <svg className="icons documentHeart svg-icon"></svg>
                            }
                            options={creatorFormOptions.styleOptions}
                            value={formData.style || ""}
                            onChange={(val) =>
                              setFormData({ ...formData, style: val })
                            }
                          />

                          {/* Size */}
                          <CustomSelect
                            label="All Sizes"
                            icon={
                              <svg className="icons expanddiagonal svg-icon"></svg>
                            }
                            options={creatorFormOptions.sizeOptions}
                            value={formData.size || ""}
                            onChange={(val) =>
                              setFormData({ ...formData, size: val })
                            }
                          />

                          {/* Popularity */}
                          <CustomSelect
                            label="All Popularity"
                            icon={
                              <svg className="icons zigzagchart svg-icon"></svg>
                            }
                            options={creatorFormOptions.popularityOptions}
                            value={formData.popularity || ""}
                            onChange={(val) =>
                              setFormData({ ...formData, popularity: val })
                            }
                          />

                          {/* Update Button */}
                          <div className="btm_btn one">
                            <button
                              className="premium-btn active-down-effect"
                              onClick={handleUpdateProfile}
                            >
                              <span>Update Profile</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* ========== Pricing settings ========== */}
                {tab === 1 && (
                  <form onSubmit={subscriptionFormik.handleSubmit}>
                    <div className="creator-profile-card-container">
                      <div className="card filters-card-wrapper">
                        <div className="creator-content-cards-wrapper pricing_account_wrap">
                          <div className="subtop_cont">
                            <h3>Subscription</h3>
                            <button className="btn-primary">
                              <GoDotFill size={20} />{" "}
                              <span>Paid Subscriptions</span>
                            </button>
                          </div>
                          <div className="form_grid">
                            <div className="one">
                              <label>Monthly Subscription Price*</label>
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

                            <div className="one">
                              <label>PPV Request - Custom video</label>
                              <div className="label-input">
                                <input
                                  type="number"
                                  name="ppvVideoPrice"
                                  value={
                                    subscriptionFormik.values.ppvVideoPrice
                                  }
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
                                  value={
                                    subscriptionFormik.values.ppvPhotoPrice
                                  }
                                  onChange={subscriptionFormik.handleChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="btm_btn">
                            <button
                              type="submit"
                              className="premium-btn active-down-effect"
                            >
                              <span>Save Changes</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
                {/* ========== Account and security ========== */}
                {tab === 2 && (
                  <div className="creator-profile-card-container">
                    <div className="card filters-card-wrapper">
                      <div className="creator-content-cards-wrapper mb-10 pricing_account_wrap">
                        <div className="form_grid">
                          <div className="label-input one">
                            <div className="input-placeholder-icon">
                              <i className="icons message svg-icon"></i>
                            </div>
                            <input
                              type="text"
                              value={profile?.email || ""}
                              readOnly
                            />
                            <span className="righttext">
                              {profile?.status === 5
                                ? "Verified"
                                : "Unverified"}
                            </span>
                          </div>
                          <div className="label-input password">
                            <div className="input-placeholder-icon">
                              <i className="icons lock svg-icon"></i>
                            </div>
                            <input
                              type={showPass ? "text" : "password"}
                              placeholder="Password *"
                              value={passwordData.password}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  password: e.target.value,
                                })
                              }
                            />
                            <span
                              onClick={() => setShowPass(!showPass)}
                              className="input-placeholder-icon eye-icon"
                            >
                              {showPass ? (
                                <i className="icons eye-slash svg-icon"></i>
                              ) : (
                                <i className="icons eye svg-icon"></i>
                              )}
                            </span>
                          </div>
                          <div className="label-input password">
                            <div className="input-placeholder-icon">
                              <i className="icons lock svg-icon"></i>
                            </div>
                            <input
                              type={showConfirmPass ? "text" : "password"}
                              placeholder="Confirm password*"
                              value={passwordData.confirmPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  confirmPassword: e.target.value,
                                })
                              }
                            />
                            <span
                              onClick={() =>
                                setShowConfirmPass(!showConfirmPass)
                              }
                              className="input-placeholder-icon eye-icon"
                            >
                              {showConfirmPass ? (
                                <i className="icons eye-slash svg-icon"></i>
                              ) : (
                                <i className="icons eye svg-icon"></i>
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="btm_btn">
                          <button
                            className="premium-btn active-down-effect"
                            onClick={handleChangePassword}
                          >
                            <span>Save Changes</span>
                          </button>
                        </div>
                      </div>
                      <div className="creator-content-cards-wrapper mb-10 pricing_account_wrap connect_social_wrap">
                        <div className="select_countries_wrap">
                          <h5>Connect Your Social accounts</h5>
                          <p>Connect Your Social accounts to Your MoneYBoy Profile</p>
                          <div className="btn_wrap">
                            <label>Sign in With x</label>
                            <button type="button" className="active-down-effect xbtn"><div className="icons"><FaXTwitter size={18} /></div> SIGN IN WITH X</button>
                          </div>
                          <div className="btn_wrap">
                            <label>Sign In With Google</label>
                            <button type="button" className="active-down-effect googlebtn"><div className="icons"><FcGoogle size={16} /></div> SIGN IN WITH GOOGLE</button>
                          </div>
                        </div>
                      </div>
                      <div className="creator-content-cards-wrapper mb-10 pricing_account_wrap">
                        <div className="deactivate_wrap">
                          <div className="">
                            <h5>Deactivate account</h5>
                            <p>
                              Hides the profile temporarily (Does not delete it)
                            </p>
                          </div>
                          <button
                            className={`btn-danger ${
                              userProfile?.status ===
                              UserStatus.SELF_DEACTIVATED
                                ? "reactivate-btn"
                                : ""
                            }`}
                            onClick={handleToggleAccount}
                          >
                            {userProfile?.status === UserStatus.SELF_DEACTIVATED
                              ? "Reactivate account"
                              : "Deactivate account"}
                          </button>
                        </div>
                      </div>
                      <div className="creator-content-cards-wrapper pricing_account_wrap select">
                        <div className="select_countries_wrap">
                          <h5>Block Countries</h5>
                          <p>Select countries you want to block</p>
                          <div className="form_grid">
                            <div className="one">
                              <CustomSelect
                                label="Select Countries"
                                options={countryOptions}
                                value={blockedCountries}
                                onChange={(value) =>
                                  setBlockedCountries(value as string[])
                                }
                                multiple
                                searchable
                              />
                            </div>
                          </div>
                          <div className="btm_btn">
                            <button
                              type="button"
                              className="premium-btn active-down-effect"
                              onClick={handleSaveBlockedCountries}
                            >
                              <span>Save Changes</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfilePage;
