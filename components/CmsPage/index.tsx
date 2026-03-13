"use client";
import React, { useEffect, useState } from "react";
import { API_GET_CMS_PAGE } from "@/utils/api/APIConstant";
import { getApiByParams } from "@/utils/endpoints/common";
import { useRouter } from "next/navigation";

interface CmsPageProps {
  slug: string;
  defaultTitle?: string;
}

const CmsPage: React.FC<CmsPageProps> = ({ slug, defaultTitle }) => {
  const router = useRouter();
  const [cmsData, setCmsData] = useState<any>(null);
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

  const getCmsPage = async () => {
    try {
      const res = await getApiByParams({
        url: API_GET_CMS_PAGE,
        params: slug,
      });

      if (res?.success) {
        setCmsData({
          ...res.data,
          content: cleanHtml(res.data?.content || ""),
        });
      }
    } catch (error) {
      console.error("CMS fetch error:", error);
    }
  };

  useEffect(() => {
    getCmsPage();
  }, [slug]);

  return (
    <div className="container">
      <div className="moneyboy-main-asides-layout-container">
        <div className="moneyboy-page-content-container">
          <main className="moneyboy-dynamic-content-layout">
            <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers common-cntwrap">
              <div className="moneyboy-feed-page-cate-buttons card">
                <button className="cate-back-btn active-down-effect" onClick={() => router.push("/")}><span className="icons arrowLeft"></span></button>
                <button className="page-content-type-button active-down-effect active">{cmsData?.title || defaultTitle}</button>
              </div>
              <div className="card main_contwrap" dangerouslySetInnerHTML={{ __html: cmsData?.content || "", }} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CmsPage;