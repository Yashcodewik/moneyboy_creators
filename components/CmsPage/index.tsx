"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getApiByParams } from "@/utils/endpoints/common";
import { API_GET_CMS_PAGE } from "@/utils/api/APIConstant";

interface CmsPageProps {
  slug: string;
  defaultTitle?: string;
  backUrl?: string;
  showGuidesTab?: boolean;
}

const CmsPage: React.FC<CmsPageProps> = ({
  slug,
  defaultTitle,
  backUrl,
  showGuidesTab = false,
}) => {
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

  /** Clean CMS HTML */
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

  /** Extract Guides Section */
  const extractGuides = (html: string) => {
    const regex =
      /<h3[^>]*>.*Platform Information.*Guides.*<\/h3>([\s\S]*)/i;

    const match = html.match(regex);

    if (match && match[1]) {
      return match[1].replace(
        /<ul class="points">/g,
        '<ul class="points link_points">'
      );
    }

    return "";
  };

  /** Fetch CMS */
  const fetchCmsPage = async () => {
    try {
      setLoading(true);

      const res = await getApiByParams({
        url: API_GET_CMS_PAGE,
        params: slug,
      });

      if (res?.success) {
        const html = cleanHtml(res.data?.content || "");

        setCmsData({
          ...res.data,
          content: html,
        });

        if (showGuidesTab) {
          const guides = extractGuides(html);
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
  }, [slug]);

  const changeTab = (tab: "all" | "guides") => {
    setActiveTab(tab);
    router.replace(`?tab=${tab}`);
  };

  return (
    <div className="container">
      <div className="moneyboy-main-asides-layout-container">
        <div className="moneyboy-page-content-container">
          <main className="moneyboy-dynamic-content-layout">
            <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers common-cntwrap">
              {/* Header */}
              <div className="moneyboy-feed-page-cate-buttons card">
                <button className="cate-back-btn active-down-effect" onClick={() => { if (backUrl) router.push(backUrl); else router.back(); }}><span className="icons arrowLeft"></span></button>
                {!showGuidesTab && (<button className="page-content-type-button active-down-effect active">{cmsData?.title || defaultTitle}</button>)}
                {showGuidesTab && (
                  <>
                    <button className={`page-content-type-button active-down-effect ${activeTab === "all" ? "active" : ""}`} onClick={() => changeTab("all")}>Help & Support</button>
                    <button className={`page-content-type-button active-down-effect ${activeTab === "guides" ? "active" : ""}`} onClick={() => changeTab("guides")}>Platform Information & Guides</button>
                  </>
                )}
              </div>
              {/* Content */}
              <div className="card main_contwrap">
                {loading && (
                  <div className="loadingtext">
                    <img src="/images/micons.png" alt="M" className="loading-letter-img" /> {"oneyBoy".split("").map((char, i) => (<span key={i} style={{ animationDelay: `${(i + 2) * 0.1}s` }}>{char}</span>))}
                  </div>
                )}
                {!loading && activeTab === "all" && cmsData && (
                  <div className="main_contwrap p-0" dangerouslySetInnerHTML={{ __html: cmsData.content, }} />
                )}
                {!loading && activeTab === "guides" && guidesSection && (
                  <div className="main_contwrap p-0" dangerouslySetInnerHTML={{ __html: guidesSection, }} />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CmsPage;

// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { getApiByParams } from "@/utils/endpoints/common";
// import { API_GET_CMS_PAGE } from "@/utils/api/APIConstant";

// interface CmsPageProps {
//   slug: string;
//   defaultTitle?: string;
//   backUrl?: string;
//   showGuidesTab?: boolean;
// }

// const CmsPage: React.FC<CmsPageProps> = ({
//   slug,
//   defaultTitle,
//   backUrl,
//   showGuidesTab = false,
// }) => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const tabParam = searchParams.get("tab") as "all" | "guides" | null;
//   const [activeTab, setActiveTab] = useState<"all" | "guides">(tabParam || "all");
//   const [cmsData, setCmsData] = useState<any>(null);
//   const [guidesSection, setGuidesSection] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (tabParam) setActiveTab(tabParam);
//   }, [tabParam]);

//   /** Clean CMS HTML */
//   const cleanHtml = (html: string) => {
//     if (!html) return "";
//     return html
//       .replace(/&nbsp;/gi, " ")
//       .replace(/\u00A0/g, " ")
//       .replace(/<ul>/g, '<ul class="points">')
//       .replace(/<ol>/g, '<ol class="number">')
//       .replace(/<p>\s*<\/p>/g, "")
//       .trim();
//   };

//   /** Extract Guides Section */
//   const extractGuides = (html: string) => {
//     const regex =
//       /<h3[^>]*>.*Platform Information.*Guides.*<\/h3>([\s\S]*)/i;

//     const match = html.match(regex);

//     if (match && match[1]) {
//       return match[1].replace(
//         /<ul class="points">/g,
//         '<ul class="points link_points">'
//       );
//     }

//     return "";
//   };

//   /** Fetch CMS */
//   const fetchCmsPage = async () => {
//     try {
//       setLoading(true);
//       const res = await getApiByParams({
//         url: API_GET_CMS_PAGE,
//         params: slug,
//       });
//       if (res?.success) {
//         const html = cleanHtml(res.data?.content || "");
//         setCmsData({
//           ...res.data,
//           content: html,
//         });
//         if (showGuidesTab) {
//           const guides = extractGuides(html);
//           setGuidesSection(guides);
//         }
//       }
//     } catch (error) {
//       console.error("CMS fetch error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCmsPage();
//   }, [slug]);

//   const changeTab = (tab: "all" | "guides") => {
//     setActiveTab(tab);
//     router.replace(`?tab=${tab}`);
//   };

//   return (
//     <div className="container">
//       <div className="moneyboy-main-asides-layout-container">
//         <div className="moneyboy-page-content-container">
//           <main className="moneyboy-dynamic-content-layout">
//             <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers common-cntwrap">
//               {/* Header */}
//               <div className="moneyboy-feed-page-cate-buttons card" id="posts-tabs-btn-card">
//                 <button className="cate-back-btn active-down-effect" onClick={() => { if (backUrl) router.push(backUrl); else router.back(); }}><span className="icons arrowLeft"></span></button>
//                 {!showGuidesTab && (<button className="page-content-type-button active-down-effect active">{cmsData?.title || defaultTitle}</button>)}
//                 {showGuidesTab && (
//                   <>
//                     <button className={`page-content-type-button active-down-effect ${activeTab === "all" ? "active" : ""}`} onClick={() => changeTab("all")}>Help & Support</button>
//                     <button className={`page-content-type-button active-down-effect ${activeTab === "guides" ? "active" : ""}`} onClick={() => changeTab("guides")}>Platform Information & Guides</button>
//                   </>
//                 )}
//               </div>
//               {/* Content */}
//               <div className="card main_contwrap">
//                 {loading &&
//                   <div className="loadingtext">
//                     <img src="/images/micons.png" alt="M" className="loading-letter-img" /> {"oneyBoy".split("").map((char, i) => (<span key={i} style={{ animationDelay: `${(i + 2) * 0.1}s` }}>{char}</span>))}
//                   </div>
//                 }
//                 {!loading && activeTab === "all" && cmsData && (
//                   <div className="main_contwrap p-0" dangerouslySetInnerHTML={{ __html: cmsData.content, }} />
//                 )}
//                 {!loading && activeTab === "guides" && guidesSection && (
//                   <div className="main_contwrap p-0" dangerouslySetInnerHTML={{ __html: guidesSection, }} />
//                 )}
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CmsPage;

// "use client";
// import React, { useEffect, useState } from "react";
// import { API_GET_CMS_PAGE } from "@/utils/api/APIConstant";
// import { getApiByParams } from "@/utils/endpoints/common";
// import { useRouter } from "next/navigation";

// interface CmsPageProps {
//   slug: string;
//   defaultTitle?: string;
// }

// const CmsPage: React.FC<CmsPageProps> = ({ slug, defaultTitle }) => {
//   const router = useRouter();
//   const [cmsData, setCmsData] = useState<any>(null);
//   const cleanHtml = (html: string) => {
//     if (!html) return "";
//     return html
//       .replace(/&nbsp;/gi, " ")
//       .replace(/\u00A0/g, " ")
//       .replace(/<ul>/g, '<ul class="points">')
//       .replace(/<ol>/g, '<ol class="number">')
//       .replace(/<p>\s*<\/p>/g, "")
//       .trim();
//   };

//   const getCmsPage = async () => {
//     try {
//       const res = await getApiByParams({
//         url: API_GET_CMS_PAGE,
//         params: slug,
//       });

//       if (res?.success) {
//         setCmsData({
//           ...res.data,
//           content: cleanHtml(res.data?.content || ""),
//         });
//       }
//     } catch (error) {
//       console.error("CMS fetch error:", error);
//     }
//   };

//   useEffect(() => {
//     getCmsPage();
//   }, [slug]);

//   return (
//     <div className="container">
//       <div className="moneyboy-main-asides-layout-container">
//         <div className="moneyboy-page-content-container">
//           <main className="moneyboy-dynamic-content-layout">
//             <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers common-cntwrap">
//               <div className="moneyboy-feed-page-cate-buttons card">
//                 <button className="cate-back-btn active-down-effect" onClick={() => router.push("/")}><span className="icons arrowLeft"></span></button>
//                 <button className="page-content-type-button active-down-effect active">{cmsData?.title || defaultTitle}</button>
//               </div>
//               <div className="card main_contwrap" dangerouslySetInnerHTML={{ __html: cmsData?.content || "", }} />
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CmsPage;