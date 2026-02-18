"use client";
import { useEffect, useState } from "react";
import Featuredboys from "../Featuredboys";
import CustomSelect from "../CustomSelect";
import Link from "next/link";
import { TbCamera } from "react-icons/tb";
import { GoDotFill } from "react-icons/go";
import {
  apiPost,
  apiPostWithMultiForm,
  getApiWithOutQuery,
} from "@/utils/endpoints/common";
import {
  API_CHANGE_PASSWORD,
  API_TOGGLE_ACCOUNT,
  API_UPDATE_USER_PROFILE,
  API_USER_PROFILE,
} from "@/utils/api/APIConstant";
import { countryOptions, genderOptions } from "../helper/creatorOptions";
import ShowToast from "../common/ShowToast";

export enum UserStatus {
  ACTIVE = 0,
  NOT_VERIFIED = 1,
  SELF_DEACTIVATED = 2,
  ADMIN_DEACTIVATED = 3,
  DELETED = 4,
  VERIFIED = 5,
}
const UserEditProfilePage = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [tab, setTab] = useState(0);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getApiWithOutQuery({ url: API_USER_PROFILE });
      if (res.success) {
        setUserProfile(res.data);
        setFormData({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          displayName: res.data.displayName,
          userName: res.data.userName,
          gender: res.data.gender,
          dob: res.data.dob,
          country: res.data.country,
          city: res.data.city,
          bio: res.data.bio,
          email: res.data.email,
        });
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    const payload = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== "") {
        payload.append(key, formData[key]);
      }
    });

    if (profileFile) {
      payload.append("profile", profileFile);
    }

    if (coverFile) {
      payload.append("coverImage", coverFile);
    }

    const res = await apiPostWithMultiForm({
      url: API_UPDATE_USER_PROFILE,
      values: payload,
    });

    if (res?.success) {
      ShowToast("Profile updated successfully", "success");
    }
  };

  const today = new Date();
  const minAdultDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];

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
      url: API_CHANGE_PASSWORD,
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
        url: API_TOGGLE_ACCOUNT,
        values: {}, // no body needed
      });

      if (res?.success) {
        ShowToast(res.message, "success");

        // Update local userProfile status
        setUserProfile((prev: any) => ({
          ...prev,
          status: res.status, // update status returned from API
        }));
      }
    } catch (error: any) {
      ShowToast(error?.message || "Failed to toggle account", "error");
    }
  };
  return (
    <div className="moneyboy-2x-1x-layout-container">
      <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
        <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers">
          <div
            className="moneyboy-feed-page-cate-buttons card"
            id="posts-tabs-btn-card"
          >
            {/* <button className="cate-back-btn active-down-effect">
              <span className="icons arrowLeft hwhite"></span>
            </button> */}
            <button
              className={`page-content-type-button active-down-effect ${
                tab === 0 ? "active" : ""
              }`}
              onClick={() => setTab(0)}
            >
              basic information
            </button>
            <button
              className={`page-content-type-button active-down-effect ${
                tab === 1 ? "active" : ""
              }`}
              onClick={() => setTab(1)}
            >
              Account and security
            </button>
          </div>
          <div className="creator-profile-page-container">
            <div className="creator-profile-front-content-container">
              {/* ========== basic information ========== */}
              {tab === 0 && userProfile && (
                <>
                  <div className="creator-profile-card-container card">
                    <div className="creator-profile-banner">
                      <img
                        src={
                          coverFile
                            ? URL.createObjectURL(coverFile)
                            : userProfile.coverImage ||
                              "/images/profile-banners/profile-banner-10.png"
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

                      <label htmlFor="coverUpload" className="imgicons"
                       style={{ cursor: "pointer" }}>
                        <TbCamera size="16" />
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
                                      : userProfile.profile ||
                                        "/images/profile-avatars/profile-avatar-13.jpg"
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
                                  className="imgicons"
                                  style={{ cursor: "pointer" }}
                                >
                                  <TbCamera size="16" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="creator-subscriptions-container">
                        <div className="form_grid">
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

                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <i className="icons user svg-icon"></i>
                            </div>
                            <input
                              type="text"
                              placeholder="Last name *"
                              value={formData.lastName || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  lastName: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <i className="icons user2 svg-icon"></i>
                            </div>
                            <input
                              type="text"
                              placeholder="Display name *"
                              value={formData.displayName || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  displayName: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <i className="icons profile-check svg-icon"></i>
                            </div>
                            <input
                              type="text"
                              placeholder="User name *"
                              value={formData.userName || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  userName: e.target.value,
                                })
                              }
                            />
                          </div>

                          <CustomSelect
                            label="Select Your Gender"
                            icon={<svg className="icons groupUser svg-icon" />}
                            options={genderOptions}
                            value={formData.gender || ""}
                            onChange={(val) =>
                              setFormData({ ...formData, gender: val })
                            }
                          />

                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <i className="icons bookmarkIcon svg-icon"></i>
                            </div>
                            <input
                              type="date"
                              placeholder="Date of Birth (DD/MM/YYYY) *"
                              value={formData.dob || ""}
                              max={minAdultDate}
                              onChange={(e) => {
                                const selectedDate = e.target.value;

                                if (selectedDate > minAdultDate) {
                                  alert("You must be at least 18 years old");
                                  return;
                                }

                                setFormData({
                                  ...formData,
                                  dob: selectedDate,
                                });
                              }}
                            />
                          </div>

                          <CustomSelect
                            label="United States of America *"
                            icon={
                              <img
                                src="/images/united_flag.png"
                                className="svg-icon"
                              />
                            }
                            options={countryOptions}
                            value={formData.country || ""}
                            onChange={(val) =>
                              setFormData({ ...formData, country: val })
                            }
                          />

                          <div className="label-input">
                            <div className="input-placeholder-icon">
                              <svg className="icons locationIcon svg-icon"></svg>
                            </div>
                            <input
                              type="text"
                              placeholder="City *"
                              value={formData.city || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  city: e.target.value,
                                })
                              }
                            />
                          </div>

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
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="btm_btn one">
                    <button
                      className="premium-btn active-down-effect"
                      onClick={handleUpdateProfile}
                    >
                      <span>Save changes</span>
                    </button>
                  </div>
                </>
              )}

              {/* ========== Account and security ========== */}
              {tab === 1 && (
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
                            value={userProfile?.email || ""}
                            readOnly
                          />

                          <span className="righttext">
                            {userProfile?.status === 5
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
                            onClick={() => setShowConfirmPass(!showConfirmPass)}
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
                            userProfile?.status === UserStatus.SELF_DEACTIVATED
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
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Featuredboys />
    </div>
  );
};

export default UserEditProfilePage;
