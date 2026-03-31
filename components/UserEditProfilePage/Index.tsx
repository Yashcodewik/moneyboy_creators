"use client";
import React, { useState, useRef, useEffect } from "react";
import Featuredboys from "../Featuredboys";
import CustomSelect from "../CustomSelect";
import { TbCamera } from "react-icons/tb";
import { apiPost, apiPostWithMultiForm, getApiWithOutQuery, } from "@/utils/endpoints/common";
import { API_CHANGE_PASSWORD, API_TOGGLE_ACCOUNT, API_UPDATE_USER_PROFILE, API_USER_PROFILE, } from "@/utils/api/APIConstant";
import { countryOptions } from "../helper/creatorOptions";
import { CalendarDays } from "lucide-react";
import DatePicker from "react-datepicker";
import NoProfileSvg from "../common/NoProfileSvg";
import { showError, showSuccess } from "@/utils/alert";
import { useDecryptedSession } from "@/libs/useDecryptedSession";
import ImageCropModal from "./ImageCropModal";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { useSession } from "next-auth/react";
countries.registerLocale(enLocale);

// ========== Enums & Constants ==========

export enum UserStatus {
  ACTIVE = 0,
  NOT_VERIFIED = 1,
  SELF_DEACTIVATED = 2,
  ADMIN_DEACTIVATED = 3,
  DELETED = 4,
  VERIFIED = 5,
}

export const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Non-binary", value: "Non-binary" },
  { label: "Prefer not to say", value: "Prefer not to say" },
];

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
].map((m, i) => ({ label: m, value: i.toString() }));

const years = Array.from({ length: 100 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { label: year.toString(), value: year.toString() };
});

// ========== Types ==========

interface FormData {
  firstName: string;
  lastName: string;
  displayName: string;
  userName: string;
  gender: string;
  dob: string;
  country: string;
  city: string;
  bio: string;
  email: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// ========== Component ==========

const UserEditProfilePage = () => {

  // ── UI State ──
  const [tab, setTab] = useState<0 | 1>(0);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  // ── Data State ──
  const [userProfile, setUserProfile] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    displayName: "",
    userName: "",
    gender: "",
    dob: "",
    country: "",
    city: "",
    bio: "",
    email: "",
  });
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { data: session, update } = useSession();
  // ── File / Crop State ──
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [cropOpen, setCropOpen] = useState(false);
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [cropType, setCropType] = useState<"avatar" | "cover" | null>(null);

  const calendarRef = useRef<HTMLDivElement>(null);

  // ========== Fetch Profile ==========

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.isAuthenticated) return;

      const publicId = session?.user?.publicId;
      if (!publicId) {
        console.error("Public ID missing in session");
        return;
      }

      try {
        setLoading(true);
        const res = await getApiWithOutQuery({
          url: `${API_USER_PROFILE}/${publicId}`,
        });

        if (res?.success) {
          const data = res.data;
          setUserProfile(data);
          setFormData({
            firstName: data.firstName ?? "",
            lastName: data.lastName ?? "",
            displayName: data.displayName ?? "",
            userName: data.userName ?? "",
            gender: data.gender ?? "",
            dob: data.dob ?? "",
            country: data.country ?? "",
            city: data.city ?? "",
            bio: data.bio ?? "",
            email: data.email ?? "",
          });

          if (data.dob) {
            const parsed = new Date(data.dob);
            if (!isNaN(parsed.getTime())) setSelectedDate(parsed);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session?.isAuthenticated, session?.user?.publicId]);

  // ========== Close Calendar on Outside Click ==========

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(".calendar-dropdown") ||
        target.closest(".react-datepicker") ||
        target.closest(".custom-select-menu")
      ) {
        return;
      }
      setCalendarOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ========== Handlers ==========

  const handleFormChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: keyof PasswordData, value: string) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "cover"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCropImage(reader.result as string);
      setCropType(type);
      setCropOpen(true);
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  const handleCropSave = async (croppedBase64: string) => {
    const blob = await (await fetch(croppedBase64)).blob();
    const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });

    if (cropType === "avatar") {
      setProfileFile(file);
    } else if (cropType === "cover") {
      setCoverFile(file);
    }

    setCropOpen(false);
    setCropImage(null);
    setCropType(null);
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const payload = new FormData();

      (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
        const value = formData[key];
        if (value !== undefined && value !== "") {
          payload.append(key, value);
        }
      });

      if (selectedDate) {
        payload.append("dob", selectedDate.toISOString());
      }

      if (profileFile) payload.append("profile", profileFile);
      if (coverFile) payload.append("coverImage", coverFile);

      const res = await apiPostWithMultiForm({
        url: API_UPDATE_USER_PROFILE,
        values: payload,
      });

      if (res?.success) {
        showSuccess("Profile updated successfully");

        const fresh = await getApiWithOutQuery({
          url: `${API_USER_PROFILE}/${session?.user?.publicId}`,
        });

        if (fresh?.data) {
          await update({
            user: {
              ...session?.user,
              profile: fresh.data.profile,
              displayName: fresh.data.displayName,
              firstName: fresh.data.firstName,
              lastName: fresh.data.lastName,
            },
          });
        }
      } else {
        showError(res?.message || "Failed to update profile");
      }
    } catch (error: any) {
      showError(error?.error || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      showError("Please fill all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showError("New password and confirm password do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await apiPost({
        url: API_CHANGE_PASSWORD,
        values: passwordData,
      });

      if (res?.success) {
        showSuccess(res.message || "Password updated successfully");

        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        showError(res?.message || "Failed to update password");
      }
    } catch (error: any) {
      showError(error?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAccount = async () => {
    try {
      setLoading(true);
      const res = await apiPost({
        url: API_TOGGLE_ACCOUNT,
        values: {},
      });

      if (res?.success) {
        showSuccess(res.message);
        setUserProfile((prev: any) => ({
          ...prev,
          status: res.status,
        }));
      } else {
        showError(res?.message || "Failed to toggle account");
      }
    } catch (error: any) {
      showError(error?.message || "Failed to toggle account");
    } finally {
      setLoading(false);
    }
  };

  const selectedCountry = formData.country;
  const countryCode = selectedCountry
    ? countries.getAlpha2Code(selectedCountry, "en")
    : null;
  return (
    <>
      <div className="moneyboy-2x-1x-layout-container">
        <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
          <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers">
            {/* ── Tab Buttons ── */}
            <div className="moneyboy-feed-page-cate-buttons card" id="posts-tabs-btn-card">
              <button className={`page-content-type-button active-down-effect ${tab === 0 ? "active" : ""}`} onClick={() => setTab(0)}>Basic Information</button>
              <button className={`page-content-type-button active-down-effect ${tab === 1 ? "active" : ""}`} onClick={() => setTab(1)}>Account and Security</button>
            </div>

            <div className="creator-profile-page-container">
              <div className="creator-profile-front-content-container">
                {/* ========== Tab 0 – Basic Information ========== */}
                {tab === 0 && (
                  <>
                    <div className="creator-profile-card-container card">
                      {/* Cover Image */}
                      <div className="creator-profile-banner">
                        {coverFile ? (
                          <img src={URL.createObjectURL(coverFile)} alt="cover preview" />
                        ) : userProfile?.coverImage ? (
                          <img src={userProfile.coverImage} alt="cover" />
                        ) : (
                          <NoProfileSvg />
                        )}
                        <input type="file" hidden accept="image/*" id="coverUpload" onChange={(e) => handleFileSelect(e, "cover")} />
                        <label htmlFor="coverUpload" className="imgicons pointer"><TbCamera size={16} /></label>
                      </div>

                      <div className="creator-profile-info-container">
                        {/* Avatar */}
                        <div className="profile-card">
                          <div className="profile-info-buttons">
                            <div className="profile-card__main">
                              <div className="profile-card__avatar-settings">
                                <div className="profile-card__avatar">
                                  {profileFile ? (
                                    <img src={URL.createObjectURL(profileFile)} alt="profile preview" />
                                  ) : userProfile?.profile ? (
                                    <img src={userProfile.profile} alt="profile" />
                                  ) : (
                                    <NoProfileSvg />
                                  )}
                                  <input type="file" hidden accept="image/*" id="profileUpload" onChange={(e) => handleFileSelect(e, "avatar")} />
                                  <label htmlFor="profileUpload" className="imgicons pointer"><TbCamera size={16} /></label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Form Fields */}
                        <div className="creator-subscriptions-container">
                          <div className="form_grid">
                            {/* First Name */}
                            <div className="label-input">
                              <div className="input-placeholder-icon"><i className="icons user svg-icon" /></div>
                              <input type="text" placeholder="First Name *" value={formData.firstName} onChange={(e) => handleFormChange("firstName", e.target.value)} />
                            </div>
                            {/* Last Name */}
                            <div className="label-input">
                              <div className="input-placeholder-icon"><i className="icons user svg-icon" /></div>
                              <input type="text" placeholder="Last Name *" value={formData.lastName} onChange={(e) => handleFormChange("lastName", e.target.value)} />
                            </div>
                            {/* Display Name */}
                            <div className="label-input">
                              <div className="input-placeholder-icon"><i className="icons user2 svg-icon" /></div>
                              <input type="text" placeholder="Display Name *" value={formData.displayName} onChange={(e) => handleFormChange("displayName", e.target.value)} />
                            </div>
                            {/* Username (read-only) */}
                            <div className="label-input">
                              <div className="input-placeholder-icon"><i className="icons profile-check svg-icon" /></div>
                              <input type="text" placeholder="User Name *" value={formData.userName} disabled readOnly />
                            </div>
                            {/* Gender */}
                            <CustomSelect label="Select Your Gender" icon={<svg className="icons groupUser svg-icon" />} options={genderOptions} value={formData.gender} onChange={(val) => handleFormChange("gender", val as string)} />
                            {/* Date of Birth */}
                            <div className="label-input calendar-dropdown" ref={calendarRef}>
                              <div className="input-placeholder-icon"><CalendarDays className="icons svg-icon" /></div>
                              <input type="text" placeholder="Date of Birth (DD/MM/YYYY)" className="form-input" readOnly value={selectedDate ? selectedDate.toLocaleDateString("en-GB") : ""} onClick={(e) => { e.stopPropagation(); setCalendarOpen(true); }} />
                              {calendarOpen && (
                                <div className="calendar_show shadow" onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
                                  <DatePicker selected={selectedDate} inline renderCustomHeader={({ date, changeYear, changeMonth, }) => (
                                    <div className="flex gap-5 select_wrap p-2" onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
                                      <CustomSelect options={months} searchable={false} value={date.getMonth().toString()} onChange={(val) => changeMonth(Number(val))} />
                                      <CustomSelect options={years} searchable={false} value={date.getFullYear().toString()} onChange={(val) => changeYear(Number(val))} />
                                    </div>
                                  )}
                                    onChange={(date: Date | null) => { setSelectedDate(date); if (date) { handleFormChange("dob", date.toISOString()); } setCalendarOpen(false); }}
                                  />
                                </div>
                              )}
                            </div>
                            {/* Country */}
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
                              value={formData.country || ""}
                              onChange={(val) =>
                                setFormData({ ...formData, country: val as string })
                              }
                            />

                            {/* City */}
                            <div className="label-input">
                              <div className="input-placeholder-icon"><svg className="icons locationIcon svg-icon" /></div>
                              <input type="text" placeholder="City" value={formData.city} onChange={(e) => handleFormChange("city", e.target.value)} />
                            </div>

                            {/* Bio */}
                            <div className="label-input textarea one">
                              <div className="input-placeholder-icon">
                                <svg className="icons messageUser svg-icon" />
                              </div>
                              <textarea rows={4} placeholder="Bio" value={formData.bio} onChange={(e) => handleFormChange("bio", e.target.value)} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Save Button */}
                    <div className="btm_btn one">
                      <button className="premium-btn active-down-effect" onClick={handleUpdateProfile} disabled={loading}>
                        {loading ? (<span className="loader" />) : (<span>Save Changes</span>)}
                      </button>
                    </div>
                  </>
                )}

                {/* ══════════════ Tab 1 – Account & Security ══════════════ */}
                {tab === 1 && (
                  <div className="creator-profile-card-container">
                    <div className="card filters-card-wrapper">
                      {/* Password Section */}
                      <div className="creator-content-cards-wrapper mb-10 pricing_account_wrap">
                        <div className="form_grid">
                          {/* Email */}
                          <div className="label-input one">
                            <div className="input-placeholder-icon"><i className="icons message svg-icon" /></div>
                            <input type="text" value={userProfile?.email ?? ""} readOnly />
                            <span className="righttext">{userProfile?.status === UserStatus.VERIFIED ? "Verified" : "Unverified"}</span>
                          </div>
                          <div className="col-span-full">
                            <p className="text">Do You Want to Change Your Password</p>
                          </div>

                          {/* Password */}
                          <div className="label-input one password">
                            <div className="input-placeholder-icon"><i className="icons lock svg-icon" /></div>
                            <input type={showPass ? "text" : "password"} placeholder="Current Password *" value={passwordData.currentPassword} onChange={(e) => handlePasswordChange("currentPassword", e.target.value)} />
                            <span onClick={() => setShowPass((prev) => !prev)} className="input-placeholder-icon eye-icon">{showPass ? (<i className="icons eye-slash svg-icon" />) : (<i className="icons eye svg-icon" />)}</span>
                          </div>

                          {/* New Password */}
                          <div className="label-input password">
                            <div className="input-placeholder-icon"><i className="icons lock svg-icon" /></div>
                            <input type={showPass ? "text" : "password"} placeholder="New Password *" value={passwordData.newPassword} onChange={(e) => handlePasswordChange("newPassword", e.target.value)} />
                            <span onClick={() => setShowPass((prev) => !prev)} className="input-placeholder-icon eye-icon">{showPass ? (<i className="icons eye-slash svg-icon" />) : (<i className="icons eye svg-icon" />)}</span>
                          </div>

                          {/* Confirm Password */}
                          <div className="label-input password">
                            <div className="input-placeholder-icon"><i className="icons lock svg-icon" /></div>
                            <input type={showConfirmPass ? "text" : "password"} placeholder="Confirm Password *" value={passwordData.confirmPassword} onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)} />
                            <span onClick={() => setShowConfirmPass((prev) => !prev)} className="input-placeholder-icon eye-icon">{showConfirmPass ? (<i className="icons eye-slash svg-icon" />) : (<i className="icons eye svg-icon" />)}</span>
                          </div>
                        </div>
                        <div className="btm_btn">
                          <button className="premium-btn active-down-effect" onClick={handleChangePassword} disabled={loading}>{loading ? (<span className="loader" />) : (<span>Save Changes</span>)}</button>
                        </div>
                      </div>

                      {/* Deactivate / Reactivate Section */}
                      <div className="creator-content-cards-wrapper mb-10 pricing_account_wrap">
                        <div className="deactivate_wrap">
                          <div>
                            <h5>Deactivate Account</h5>
                            <p>Hides the profile temporarily (does not delete it)</p>
                          </div>
                          <button className={`btn-danger ${userProfile?.status === UserStatus.SELF_DEACTIVATED ? "reactivate-btn" : ""}`} onClick={handleToggleAccount} disabled={loading}>{userProfile?.status === UserStatus.SELF_DEACTIVATED ? "Reactivate Account" : "Deactivate Account"}</button>
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
      {/* Image Crop Modal */}
      <ImageCropModal show={cropOpen} image={cropImage} aspect={cropType === "cover" ? 6 / 1 : 1} onClose={() => { setCropOpen(false); setCropImage(null); setCropType(null); }} onSave={handleCropSave} />
    </>
  );
};

export default UserEditProfilePage;