"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { getApiByParams } from "@/utils/endpoints/common";
import { API_GET_CMS_PAGE } from "@/utils/api/APIConstant";

const HelpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get("tab") as "all" | "guides" | null;

  const [activeTab, setActiveTab] = React.useState<"all" | "guides">(
    tabParam || "all",
  );

  const [cmsData, setCmsData] = React.useState<any>(null);
  const [guidesSection, setGuidesSection] = React.useState<string>("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (tabParam) setActiveTab(tabParam);
  }, [tabParam]);

  const fetchCmsPage = async () => {
    setLoading(true);

    const res = await getApiByParams({
      url: API_GET_CMS_PAGE,
      params: "help & support",
    });

    if (res?.success) {
      setCmsData(res?.data);

      const html = res?.data?.content || "";

      const match = html.match(/5\.[\s\S]*/);

      if (match) {
        setGuidesSection(match[0]);
      }
    }

    setLoading(false);
  };

  React.useEffect(() => {
    fetchCmsPage();
  }, []);

  return (
    <div className="container">
      <div className="moneyboy-main-asides-layout-container">
        <div className="moneyboy-page-content-container">
          <main className="moneyboy-dynamic-content-layout">
            <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers common-cntwrap">
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

              <div className="card main_contwrap">

                {loading && <p>Loading...</p>}

                {!loading && cmsData && activeTab === "all" && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: cmsData?.content || "",
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