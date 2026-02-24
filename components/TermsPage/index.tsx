"use client";
import { useRouter } from "next/navigation";
import React from "react";

const TermsPage = () => {
  const router = useRouter();
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
                  onClick={() => router.push("/")}
                >
                  <span className="icons arrowLeft"></span>
                </button>
                <button className="page-content-type-button active-down-effect active">
                  Terms of Service
                </button>
              </div>
              <div className="card main_contwrap">
                <h3>Effective as of October 2025</h3>
                <p>
                  Welcome to <b>MoneyBoy.com</b>, a social media and
                  subscription-based content platform operated by{" "}
                  <b>DNA Global Media B.V.</b>, a company registered in the
                  Netherlands (KvK No. 97379654).
                </p>
                <p>
                  By using this Website, you agree to be bound by these Terms of
                  Service (“Terms”), our Privacy Policy, and all applicable
                  laws.
                </p>
                <h3>1. Eligibility and Age Requirement</h3>
                <p>
                  MoneyBoy.com is an adult-oriented platform.The Website is
                  offered and available{" "}
                  <b>only to individuals who are 18 years of age or older</b>{" "}
                  (or the age of legal majority in your jurisdiction, if
                  higher).
                </p>
                <p>By using the Website, you represent and warrant that:</p>
                <ul className="points">
                  <li>You are at least 18 years old;</li>
                  <li>
                    You have the legal capacity to enter into this agreement;
                  </li>
                  <li>
                    All information you provide during registration is true,
                    accurate, and complete.
                  </li>
                </ul>
                <p>
                  If you do not meet these conditions, you must not access or
                  use the Website.
                </p>
                <h3>2. Nature of the Platform</h3>
                <p>
                  MoneyBoy.com is a <b>user-generated content platform</b> that
                  allows registered users (“Creators”) to:
                </p>
                <ul className="points">
                  <li>Create a profile</li>
                  <li>Upload photos, videos, and other digital media</li>
                  <li>
                    Set subscription prices for other users (“Fans”) who wish to
                    view their content
                  </li>
                  <li>
                    Generate revenue through subscriptions, tips, or
                    pay-per-view content.
                  </li>
                </ul>
                <p>
                  The Website also enables Fans to view, interact with, and
                  support their favorite Creators.
                </p>
                <p>
                  DNA Global Media B.V. acts solely as a{" "}
                  <b>platform provider and intermediary</b>, not as a producer
                  or publisher of user content.
                </p>
                <h3>2.1 Gender Policy</h3>
                <p>
                  MoneyBoy.com is a platform exclusively for male and
                  male-identifying content creators.
                </p>
                <h3>3. Acceptance of Terms</h3>
                <p>
                  By registering, accessing, or using MoneyBoy.com, you agree to
                  comply with these Terms and all related policies, including:
                </p>
                <ul className="points">
                  <li>
                    <b>Privacy Policy</b>
                  </li>
                  <li>
                    <b>DMCA Policy</b>
                  </li>
                  <li>
                    <b>18 U.S.C. §2257 Compliance Notice</b>
                  </li>
                </ul>
                <p>
                  If you do not agree, you must immediately stop using the
                  Website.
                </p>
                <h3>4. User Accounts and Responsibilities</h3>
                <ul className="points">
                  <li>
                    You must maintain the confidentiality of your account
                    credentials.
                  </li>
                  <li>
                    You are solely responsible for any activity under your
                    account.
                  </li>
                  <li>
                    You agree to immediately notify <b>support@moneyboy.com</b>{" "}
                    of any unauthorized access or security breach.
                  </li>
                  <li>You must not share, sell, or transfer your account.</li>
                  <li>
                    You must not upload or share content that violates laws,
                    infringes intellectual property rights, or depicts anyone
                    under 18 years old.
                  </li>
                </ul>
                <p>
                  Each User guarantees that all submitted information and
                  content is accurate, original, and owned by them.
                </p>
                <h3>5. User Content and Licensing</h3>
                <div>
                  <p className="mb-5">
                    By uploading or posting any content (“User Content”) on
                    MoneyBoy.com, you grant DNA Global Media B.V. a{" "}
                    <b>
                      worldwide, non-exclusive, royalty-free, transferable
                      license
                    </b>{" "}
                    to host, display, and distribute that content solely to
                    operate and promote the Website.
                  </p>
                  <p className="mb-5">
                    You retain all ownership rights to your content, subject to
                    this limited license.
                  </p>
                  <p className="mb-5">
                    MoneyBoy.com reserves the right to remove or disable any
                    content that violates these Terms, applicable law, or
                    community standards.
                  </p>
                </div>
                <h3>6. Payments, Payouts, and Chargebacks</h3>
                <div>
                  <p className="mb-5">
                    Creators may earn income through subscriptions, pay-per-view
                    content, and tips. All payments are processed by verified
                    third-party payment providers. MoneyBoy.com does not store
                    or directly process credit card data..
                  </p>
                  {/* <p className="mb-5">All payments are processed by verified third-party payment providers.</p>
                <p className="mb-5">MoneyBoy.com does not store or directly process credit card data.</p> */}
                </div>
                <h4>6.1 Earnings and Availability</h4>
                <div>
                  <p className="mb-10">
                    {" "}
                    Earnings generated by Creators are subject to a holding
                    period before becoming available for withdrawal. Funds may
                    be marked as “pending” and will become “available” after the
                    applicable clearance period determined by the platform.
                  </p>

                  <div>
                    <p className="mb-5">
                      {" "}
                      MoneyBoy.com reserves the right to adjust the holding
                      period at its discretion for risk management, fraud
                      prevention, and chargeback protection purposes.
                    </p>
                  </div>
                </div>
                <h4>6.2 Payout Requests</h4>
                <p>
                  Creators may request payout of their available balance,
                  subject to:
                </p>

                <ul className="points">
                  <li>
                    A minimum payout threshold determined by the platform;
                  </li>
                  <li>Compliance with identity verification requirements;</li>
                  <li>Compliance with these Terms and applicable laws</li>
                </ul>
                <p className="mb-5">
                  The platform reserves the right to limit payout frequency and
                  to temporarily hold payouts for security review.
                </p>
                <h4>6.3 Chargebacks, Disputes, and Reversals</h4>
                <p className="mb-5">
                  The platform reserves the right to limit payout frequency and
                  to temporarily hold payouts for security review.
                </p>

                <ul className="points">
                  <li>
                    The corresponding earnings may be deducted from the
                    Creator’s pending or available balance;
                  </li>
                  <li>
                    If the Creator’s balance is insufficient, the account may
                    reflect a negative balance;
                  </li>
                  <li>
                    Future earnings may be applied to offset any outstanding
                    negative balance.
                  </li>
                </ul>
                <p>
                  Creators acknowledge and agree that they are financially
                  responsible for disputed transactions related to their
                  content.
                </p>
                <p>
                  MoneyBoy.com reserves the right to suspend payouts or accounts
                  in cases of excessive chargebacks, suspected fraud, or
                  abnormal transaction activity.
                </p>
                <h4>6.4 Taxes</h4>
                <p>
                  Creators are solely responsible for reporting and paying all
                  taxes arising from their earnings. MoneyBoy.com does not act
                  as a withholding agent unless required by applicable law.
                </p>
                <h3>7. Prohibited Conduct</h3>
                <p>Users may not:</p>
                <ul className="points">
                  <li>
                    Upload, post, or distribute any illegal, obscene,
                    defamatory, or exploitative material
                  </li>
                  <li>Impersonate others or misrepresent their identity</li>
                  <li>
                    Use the platform for solicitation, spam, or fraudulent
                    activities
                  </li>
                  <li>
                    Attempt to hack, interfere with, or disrupt the Website’s
                    security systems.
                  </li>
                </ul>
                <p>
                  Violation of these rules may result in immediate account
                  suspension or termination.
                </p>
                <h3>8. Intellectual Property</h3>
                <div>
                  <p className="mb-5">
                    All trademarks, designs, and content owned by DNA Global
                    Media B.V. (including the MoneyBoy name and logo) are
                    protected by copyright and trademark laws.
                  </p>
                  <p className="mb-5">
                    Users must not copy, modify, or distribute any part of the
                    Website without prior written authorization.
                  </p>
                </div>
                <p>
                  All User Content remains the property of its respective
                  Creator, subject to the license granted under these Terms.
                </p>
                <h3>9. Safe Harbor and Legal Compliance</h3>
                <p>
                  MoneyBoy.com operates as an{" "}
                  <b>interactive computer service provider</b> under{" "}
                  <b>47 U.S.C. §230 (Communications Decency Act)</b> and as a{" "}
                  <b>hosting intermediary</b> under{" "}
                  <b>EU Directive 2000/31/EC (E-Commerce Directive).</b>
                </p>
                <p>
                  The Company is not liable for any user-generated content but
                  will act expeditiously to remove illegal material upon notice.
                </p>
                <h3>10. Account Termination</h3>
                <p>
                  DNA Global Media B.V. reserves the right to suspend or
                  terminate any account that:
                </p>
                <ul className="points">
                  <li>Violates these Terms,</li>
                  <li>Posts illegal or underage content,</li>
                  <li>Engages in harassment or abusive conduct,</li>
                  <li>
                    Fails identity verification or payment compliance checks.
                  </li>
                </ul>
                <h3>11. Disclaimer of Warranties</h3>
                <div>
                  <p className="mb-5">
                    The Website and its services are provided “as is” and “as
                    available”.
                  </p>
                  <p className="mb-5">
                    DNA Global Media B.V. makes no warranties of any kind,
                    express or implied, regarding:
                  </p>
                </div>
                <ul className="points">
                  <li>The accuracy or completeness of content;</li>
                  <li>
                    The continuous or error-free operation of the Website;
                  </li>
                  <li>
                    The reliability of user communications or transactions.
                  </li>
                </ul>
                <h3>12. Limitation of Liability</h3>
                <p>
                  To the fullest extent permitted by law, DNA Global Media B.V.
                  shall not be liable for:
                </p>
                <ul className="points">
                  <li>Any indirect, consequential, or punitive damages;</li>
                  <li>
                    Any data loss, unauthorized access, or user misconduct;
                  </li>
                  <li>
                    Any dispute between users (including Creators and Fans).
                  </li>
                </ul>
                <p>
                  In no event shall the total liability of DNA Global Media B.V.
                  exceed the amount paid by you, if any, within the last 12
                  months.
                </p>
                <h3>13. Governing Law and Jurisdiction</h3>
                <p>
                  These Terms are governed by and construed in accordance with
                  the laws of the Netherlands.
                </p>
                <p>
                  Any dispute arising under or in connection with these Terms
                  shall be subject to the exclusive jurisdiction of the courts
                  of Rotterdam, Netherlands.
                </p>
                <h3>14. Changes to Terms</h3>
                <div>
                  <p className="mb-5">
                    We may update or modify these Terms from time to time.
                  </p>
                  <p className="mb-5">
                    Any changes will be effective immediately upon publication.
                  </p>
                  <p className="mb-5">
                    Your continued use of the Website constitutes acceptance of
                    the updated Terms.
                  </p>
                </div>
                <h3>15. Contact</h3>
                <p>
                  For any questions or legal notices regarding these Terms,
                  please contact:
                </p>
                <ul className="m-0 li-ps0">
                  <li>
                    <b>Email:</b> support@moneyboy.com
                  </li>
                  <li>
                    <b>Subject line:</b> 2257 Compliance Inquiry
                  </li>
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
