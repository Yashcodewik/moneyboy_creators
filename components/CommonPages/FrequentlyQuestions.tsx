"use client";
import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { getApiByParams } from "@/utils/endpoints/common";
import { API_GET_CMS_PAGE } from "@/utils/api/APIConstant";
import parse from "html-react-parser";

const FrequentlyQuestions = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromTab = searchParams.get("fromTab") || "all";

  const [cmsData, setCmsData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [openIndex, setOpenIndex] = React.useState<string | null>(null);

  const fetchCmsPage = async () => {
    setLoading(true);

    const res = await getApiByParams({
      url: API_GET_CMS_PAGE,
      params: "faq", // ✅ IMPORTANT
    });

    if (res?.success) {
      setCmsData(res.data);
    }

    setLoading(false);
  };

  React.useEffect(() => {
    fetchCmsPage();
  }, []);

  const splitContent = () => {
    if (!cmsData?.content) return { top: "", bottom: "" };

    // normalize content (remove &nbsp;)
    const cleanContent = cmsData.content.replace(/&nbsp;/g, " ");

    // split ignoring case + flexible spacing
    const parts = cleanContent.split(/<h3[^>]*>\s*final\s*note\s*<\/h3>/i);

    if (parts.length < 2) {
      return { top: cmsData.content, bottom: "" };
    }

    return {
      top: parts[0],
      bottom: `<h3>Final Note</h3>${parts[1]}`
    };
  };

  const { top, bottom } = splitContent();

  const cleanHtml = (html: string) => {
    if (!html) return "";

    let cleaned = html;

    // ✅ remove &nbsp;
    cleaned = cleaned.replace(/&nbsp;/g, " ");

    // ✅ remove empty tags (p, div, h3, h4, span etc.)
    cleaned = cleaned.replace(/<(\w+)[^>]*>\s*<\/\1>/g, "");

    // ✅ remove multiple <br>
    cleaned = cleaned.replace(/(<br\s*\/?>\s*){2,}/g, "<br/>");

    // ✅ remove wrapper div ONLY if it wraps everything
    if (/^<div[^>]*>[\s\S]*<\/div>$/.test(cleaned)) {
      cleaned = cleaned.replace(/^<div[^>]*>/i, "").replace(/<\/div>$/i, "");
    }

    return cleaned.trim();
  };


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
                  onClick={() => router.push(`/help?tab=${fromTab}`)}
                >
                  <span className="icons arrowLeft"></span>
                </button>

                <button className="page-content-type-button active-down-effect active">
                  FAQ
                </button>
              </div>

              <div className="card main_contwrap">

                {loading && <p>Loading...</p>}

                {!loading && cmsData && (
                  <>
                    {/* ✅ HEADER CONTENT */}
                    {parse(cleanHtml(top))}

                    {/* ✅ FAQ SECTIONS */}
                    {cmsData?.faqs?.map((section: any, i: number) => (
                      <React.Fragment key={i}>

                        {/* CATEGORY */}
                        <h3>{section.category}</h3>

                        {section.items.map((item: any, j: number) => {
                          const key = `${i}-${j}`;

                          return (
                            <div
                              className={`accordion ${openIndex === key ? "show" : ""}`}
                              key={key}
                            >

                              <div
                                className="accordion_head"
                                onClick={() =>
                                  setOpenIndex(openIndex === key ? null : key)
                                }
                              >
                                <div className="head_cont">
                                  <h5>{item.question}</h5>
                                </div>
                                <svg className="icons chevronDownRounded" />
                              </div>

                              {openIndex === key && (
                                <div
                                  className="accordion_body"
                                  dangerouslySetInnerHTML={{
                                    __html: cleanHtml(item.answer),
                                  }}
                                />
                              )}

                            </div>
                          );
                        })}
                      </React.Fragment>
                    ))}

                    {bottom && parse(cleanHtml(bottom))}
                  </>
                )}

              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyQuestions;