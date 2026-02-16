"use client";
import { useEffect, useRef, useState } from "react";
import CustomSelect from "../CustomSelect";
import { apiPost, getApiWithOutQuery } from "@/utils/endpoints/common";
import {
  API_BLOCK_COUNTRIES,
  API_GET_BLOCKED_COUNTRIES,
  API_UNBLOCK_COUNTRIES,
} from "@/utils/api/APIConstant";
import { countryOptions } from "../helper/creatorOptions";
import ShowToast from "../common/ShowToast";
import { useRouter } from "next/navigation";

export enum UserStatus {
  ACTIVE = 0,
  NOT_VERIFIED = 1,
  SELF_DEACTIVATED = 2,
  ADMIN_DEACTIVATED = 3,
  DELETED = 4,
  VERIFIED = 5,
}

const BlockCountriesPage = () => {
  const router=useRouter();
  const [tab, setTab] = useState(0);
  const [blockedCountries, setBlockedCountries] = useState<string[]>([]);
  const prevBlockedCountriesRef = useRef<string[]>([]);
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

  useEffect(() => {
    const fetchBlockedCountries = async () => {
      const res = await getApiWithOutQuery({
        url: API_GET_BLOCKED_COUNTRIES,
      });

      if (res?.success) {
        setBlockedCountries(res.countryNames || []);
        prevBlockedCountriesRef.current = res.countryNames || [];
      }
    };

    if (tab === 0) {
      fetchBlockedCountries();
    }
  }, [tab]);

  return (
    <>
      <div className="moneyboy-2x-1x-layout-container">
        <div className="moneyboy-2x-1x-a-layout wishlist-page-container">
          <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers" data-scroll-zero data-multiple-tabs-section data-identifier="1">
            <div className="moneyboy-feed-page-cate-buttons card show_mobail" id="posts-tabs-btn-card">
              <button className="cate-back-btn active-down-effect"><span className="icons arrowLeft"></span></button>
              <button className="page-content-type-button active">Block Countries</button>
            </div>
            <div className="moneyboy-feed-page-cate-buttons card hide_mobile" id="posts-tabs-btn-card" >
              <button className="cate-back-btn active-down-effect"  onClick={() => router.push("/feed")}><span className="icons arrowLeft hwhite"></span></button>
              <button className={`page-content-type-button active-down-effect max-w-50 ${tab === 0 ? "active" : ""}`} onClick={() => setTab(0)}>Block Countries</button>
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
                              <CustomSelect label="Select Countries" options={countryOptions} value={blockedCountries} onChange={(value) => setBlockedCountries(value as string[])} multiple searchable />
                            </div>
                          </div>
                          <div className="btm_btn">
                            <button type="button" className="premium-btn active-down-effect" onClick={handleSaveBlockedCountries}><span>Save Changes</span></button>
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
