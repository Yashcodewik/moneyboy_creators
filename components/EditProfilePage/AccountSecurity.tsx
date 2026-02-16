import React, { useRef, useState } from "react";
import ShowToast from "../common/ShowToast";
import { apiPost } from "@/utils/endpoints/common";
import {
  API_BLOCK_COUNTRIES,
  API_CHANGE_CREATOR_PASSWORD,
  API_TOGGLE_CREATOR_ACCOUNT,
  API_UNBLOCK_COUNTRIES,
} from "@/utils/api/APIConstant";
import { FaXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { countryOptions } from "../helper/creatorOptions";
import CustomSelect from "../CustomSelect";

export enum UserStatus {
  ACTIVE = 0,
  NOT_VERIFIED = 1,
  SELF_DEACTIVATED = 2,
  ADMIN_DEACTIVATED = 3,
  DELETED = 4,
  VERIFIED = 5,
}

const AccountSecurity = ({ profile }: any) => {
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [blockedCountries, setBlockedCountries] = useState<string[]>([]);
  const prevBlockedCountriesRef = useRef<string[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);

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

  const handleSaveBlockedCountries = async () => {
    const previous = prevBlockedCountriesRef.current;
    const current = blockedCountries;

    const toBlock = current.filter((c) => !previous.includes(c));
    const toUnblock = previous.filter((c) => !current.includes(c));

    try {
      if (toBlock.length) {
        await apiPost({
          url: API_BLOCK_COUNTRIES,
          values: { countryNames: toBlock },
        });
      }

      if (toUnblock.length) {
        await apiPost({
          url: API_UNBLOCK_COUNTRIES,
          values: { countryNames: toUnblock },
        });
      }

      prevBlockedCountriesRef.current = current;

      ShowToast("Blocked countries updated successfully", "success");
    } catch (err: any) {
      ShowToast(err?.message || "Failed to update blocked countries", "error");
    }
  };

  return (
    <div className="creator-profile-card-container">
      <div className="card filters-card-wrapper">
        <div className="creator-content-cards-wrapper mb-10 pricing_account_wrap">
          <div className="form_grid">
            <div className="label-input one">
              <div className="input-placeholder-icon">
                <i className="icons message svg-icon"></i>
              </div>
              <input type="text" value={profile?.email || ""} readOnly />
              <span className="righttext">
                {profile?.status === 5 ? "Verified" : "Unverified"}
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
        <div className="creator-content-cards-wrapper mb-10 pricing_account_wrap connect_social_wrap">
          <div className="select_countries_wrap">
            <h5>Connect Your Social accounts</h5>
            <p>Connect Your Social accounts to Your MoneYBoy Profile</p>
            <div className="btn_wrap">
              <label>Sign in With x</label>
              <button type="button" className="active-down-effect xbtn">
                <div className="icons">
                  <FaXTwitter size={18} />
                </div>{" "}
                SIGN IN WITH X
              </button>
            </div>
            <div className="btn_wrap">
              <label>Sign In With Google</label>
              <button type="button" className="active-down-effect googlebtn">
                <div className="icons">
                  <FcGoogle size={16} />
                </div>{" "}
                SIGN IN WITH GOOGLE
              </button>
            </div>
          </div>
        </div>
        <div className="creator-content-cards-wrapper mb-10 pricing_account_wrap">
          <div className="deactivate_wrap">
            <div className="">
              <h5>Deactivate account</h5>
              <p>Hides the profile temporarily (Does not delete it)</p>
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
                  onChange={(value) => setBlockedCountries(value as string[])}
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
  );
};

export default AccountSecurity;
