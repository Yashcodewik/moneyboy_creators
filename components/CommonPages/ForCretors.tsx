"use client";
import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getApiByParams } from "@/utils/endpoints/common";
import { API_GET_CMS_PAGE } from "@/utils/api/APIConstant";

const ForCretors = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromTab = searchParams.get("fromTab") || "all";

  const [cmsData, setCmsData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchCmsPage = async () => {
    setLoading(true);

    const res = await getApiByParams({
      url: API_GET_CMS_PAGE,
      params: "creators_on_moneyboy",
    });

    if (res?.success) {
      setCmsData(res?.data);
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
                  onClick={() => router.push(`/help?tab=guides`)}
                >
                  <span className="icons arrowLeft"></span>
                </button>

                <button className="page-content-type-button active-down-effect active">
                  For Creators
                </button>
              </div>

              <div className="card main_contwrap">

                {loading && <p>Loading...</p>}

                {!loading && cmsData && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: cmsData?.content || "",
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

export default ForCretors;