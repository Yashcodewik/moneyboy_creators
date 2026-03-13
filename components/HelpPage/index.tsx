"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getApiByParams } from "@/utils/endpoints/common";
import { API_GET_CMS_PAGE } from "@/utils/api/APIConstant";

const HelpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get("tab") as "all" | "guides" | null;

  const [activeTab, setActiveTab] = useState<"all" | "guides">(
    tabParam || "all"
  );

  const [cmsData, setCmsData] = useState<any>(null);
  const [guidesSection, setGuidesSection] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tabParam) setActiveTab(tabParam);
  }, [tabParam]);

  const cleanHtml = (html: string) => {
    if (!html) return "";

    return html
      .replace(/&nbsp;/gi, " ")
      .replace(/\u00A0/g, " ")
      .replace(/<ul>/g, '<ul class="points">')
      .replace(/<ol>/g, '<ol class="number">')
      .replace(/<p>\s*<\/p>/g, "")
      .trim();
  };

  const fetchCmsPage = async () => {
    try {
      setLoading(true);

      const res = await getApiByParams({
        url: API_GET_CMS_PAGE,
        params: "help & support",
      });

      if (res?.success) {
        const html = cleanHtml(res.data?.content || "");

        setCmsData({
          ...res.data,
          content: html,
        });

        /** Split Guides Section */
        const split = html.split(
          "<h3>5. Platform Information &amp; Guides</h3>"
        );

        if (split.length > 1) {
          const guides = split[1].replace(
            /<ul class="points">/g,
            '<ul class="points link_points">'
          );

          setGuidesSection(guides);
        }
      }
    } catch (error) {
      console.error("CMS fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCmsPage();
  }, []);

  return (
    <div className="container">
      <div className="moneyboy-main-asides-layout-container">
        <div className="moneyboy-page-content-container">
          <main className="moneyboy-dynamic-content-layout">
            <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers common-cntwrap">

              {/* Tabs */}
              <div
                className="moneyboy-feed-page-cate-buttons card"
                id="posts-tabs-btn-card"
              >
                <button
                  className="cate-back-btn active-down-effect"
                  onClick={() => router.push("/feed")}
                >
                  <span className="icons arrowLeft"></span>
                </button>

                <button
                  className={`page-content-type-button active-down-effect ${
                    activeTab === "all" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  Help & Support
                </button>

                <button
                  className={`page-content-type-button active-down-effect ${
                    activeTab === "guides" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("guides")}
                >
                  Platform Information & Guides
                </button>
              </div>

              {/* Content */}
              <div className="card main_contwrap">
                {loading && <p>Loading...</p>}

                {!loading && activeTab === "all" && cmsData && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: cmsData.content,
                    }}
                  />
                )}

                {!loading && activeTab === "guides" && guidesSection && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: guidesSection,
                    }}
                  />
                )}
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;