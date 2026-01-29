"use client";
import { useEffect, useState } from "react";
import CustomSelect from "../CustomSelect";
import {
  apiPost,
} from "@/utils/endpoints/common";
import {
  API_BLOCK_COUNTRIES,
} from "@/utils/api/APIConstant";
import {
  countryOptions,
} from "../helper/creatorOptions";
import ShowToast from "../common/ShowToast";

export enum UserStatus {
  ACTIVE = 0,
  NOT_VERIFIED = 1,
  SELF_DEACTIVATED = 2,
  ADMIN_DEACTIVATED = 3,
  DELETED = 4,
  VERIFIED = 5,
}


const BlockCountriesPage = () => {
  const [tab, setTab] = useState(0);
  const [blockedCountries, setBlockedCountries] = useState<string[]>([]);

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
                Block Countries
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
                Block Countries
              </button>
              {/* <button
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
              </button> */}
            </div>

            <div className="creator-profile-page-container">
              <div className="creator-profile-front-content-container">        
                {tab === 0 && (
                  <div className="creator-profile-card-container">
                    <div className="card filters-card-wrapper">
                      
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

export default BlockCountriesPage;
