"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const HelpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as "all" | "guides" | null;
  const [activeTab, setActiveTab] = React.useState<"all" | "guides">(
    tabParam || "all",
  );

  React.useEffect(() => {
    if (tabParam) setActiveTab(tabParam);
  }, [tabParam]);
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
                {activeTab === "all" && (
                  <>
                    <h3>Help & Support – MoneyBoy.com</h3>
                    <p>
                      <b>MoneyBoy.com</b> is operated by{" "}
                      <b>DNA Global Media B.V.</b>, a company registered in the
                      Netherlands (KvK No. 97379654).
                    </p>
                    <p>
                      We are committed to respecting intellectual property
                      rights and maintaining a transparent, compliant, and safe
                      environment for all users.
                    </p>
                    <h3>1. Intellectual Property & DMCA Compliance</h3>
                    <p>
                      MoneyBoy.com fully complies with the{" "}
                      <b>
                        Digital Millennium Copyright Act (DMCA), EU Directive
                        2001/29/EC
                      </b>
                      , and other applicable international copyright laws.
                    </p>
                    <p>
                      We maintain a <b>Repeat Infringer Policy (RIP)</b> to
                      permanently suspend accounts that repeatedly violate
                      copyright or trademark laws.
                    </p>
                    <p>A copy of this policy is available upon request.</p>
                    <p>
                      If you believe any content on MoneyBoy.com infringes your
                      copyright, please submit a detailed{" "}
                      <b>DMCA Takedown Notice</b> to:
                    </p>
                    <ul>
                      <li>
                        <b>Email:</b> support@moneyboy.com
                      </li>
                      <li>
                        <b>Subject line:</b> DMCA Notice – [Your Name / Company]
                      </li>
                    </ul>
                    <p>Your notice must include:</p>
                    <ul className="points">
                      <li>
                        A physical or electronic signature of the copyright
                        owner or authorized representative.
                      </li>
                      <li>
                        Identification of the copyrighted work claimed to have
                        been infringed.
                      </li>
                      <li>
                        Identification of the infringing material and its
                        URL(s).
                      </li>
                      <li>
                        Your full contact information (name, email, country).
                      </li>
                      <li>
                        A statement of good-faith belief that the use is not
                        authorized by the copyright owner or by law.
                      </li>
                      <li>
                        A statement, under penalty of perjury, that the
                        information is accurate and that you are authorized to
                        act on behalf of the copyright owner.
                      </li>
                    </ul>
                    <h3>2. Counter-Notification</h3>
                    <p>
                      If you believe your content was removed by mistake, you
                      may file a <b>Counter-Notification</b> under{" "}
                      <b>17 U.S.C. §512(g)</b> by writing to{" "}
                      <b>support@moneyboy.com</b> with subject line “DMCA
                      Counter-Notice”.
                    </p>
                    <p>
                      Knowingly submitting a false claim or counter-claim may
                      expose you to legal liability for damages, including costs
                      and attorney’s fees, as specified in{" "}
                      <b>17 U.S.C. §512(f).</b>
                    </p>
                    <h3>3. Support & Contact</h3>
                    <p>
                      For any technical, billing, or account-related questions,
                      please contact:
                    </p>
                    <p>
                      <b>MoneyBoy Support</b>
                    </p>
                    <p>
                      <b>Email: </b> support@moneyboy.com
                    </p>
                    <p>
                      We respond to verified support requests within{" "}
                      <b>72 hours.</b>
                    </p>
                    <h3>4. Abuse & Safety</h3>
                    <p>
                      MoneyBoy.com has a zero-tolerance policy toward illegal
                      content or abuse.To report any violation (including
                      impersonation, harassment, or underage material), please
                      use the same contact channel at{" "}
                      <b>support@moneyboy.com</b> — include the subject line
                      “Abuse Report”.
                    </p>
                    <p>
                      All reports are reviewed under the applicable laws,
                      including the <b>EU Digital Services Act (DSA)</b> and{" "}
                      <b>U.S. Section 230</b> safe harbor provisions.
                    </p>
                  </>
                )}
                {(activeTab === "all" || activeTab === "guides") && (
                  <>
                    <h3>
                      {activeTab === "all"
                        ? "5. Platform Information & Guides"
                        : "Platform Information & Guides"}
                    </h3>
                    <p>
                      This section provides general information about
                      MoneyBoy.com and how the platform works, for both users
                      and content creators.
                    </p>
                    <h4>About MoneyBoy</h4>
                    <ul className="points link_points">
                      <li>
                        What is MoneyBoy.com{" "}
                        <Link
                          href={`/help/what-is-moneyboy?fromTab=guides`}
                        >
                          /what-is-moneyboy
                        </Link>
                      </li>
                      <li>
                        How it works{" "}
                        <Link href={`/help/how-it-works?fromTab=guides`}>
                          /how-it-works
                        </Link>
                      </li>
                    </ul>
                    <h4>For Content Creators</h4>
                    <ul className="points link_points">
                      <li>
                        For Creators{" "}
                        <Link href={`/help/for-creators?fromTab=guides`}>
                          /for-creators
                        </Link>
                      </li>
                    </ul>
                    <h4>General Help</h4>
                    <ul className="points link_points">
                      <li>
                        Frequently Asked Questions (FAQ){" "}
                        <Link href={`/help/faq?fromTab=guides`}>
                          /faq
                        </Link>
                      </li>
                    </ul>
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

export default HelpPage;
