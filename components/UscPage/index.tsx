"use client";
import { useRouter } from 'next/navigation';
import React from 'react'

const UscPage = () => {
   const router = useRouter();
  return (
    <div className="container">
      <div className="moneyboy-main-asides-layout-container">
      <div className="moneyboy-page-content-container">
      <main className="moneyboy-dynamic-content-layout">
            <div className="moneyboy-feed-page-container moneyboy-diff-content-wrappers common-cntwrap">
              <div className="moneyboy-feed-page-cate-buttons card" id="posts-tabs-btn-card">
                <button className="cate-back-btn active-down-effect" onClick={() => router.push("/")}>
                  <span className="icons arrowLeft"></span>
                </button>
                <button className="page-content-type-button active-down-effect active">U.S.C 2257</button>
              </div>
              <div className="card main_contwrap">
                <h3>18 U.S.C. §2257 Compliance Notice</h3>
                <p>In compliance with <b>18 U.S.C. §2257</b> and <b>28 C.F.R. §75</b>, all persons who appear in any visual depiction of actual sexually explicit conduct appearing or otherwise contained within <b>MoneyBoy.com</b> were <b>18 years of age or older</b> at the time the visual image was created.</p>
                <h3>Exemption Statement – Third-Party Content</h3>
                <p>The owners and operators of <b>MoneyBoy.com</b> are <b>not the primary or secondary producers</b>, as those terms are defined in <b>18 U.S.C. §2257</b> and related case law, of any visual content appearing on this website.</p>
                <p>All visual content uploaded by independent users, creators, or third-party contributors is produced under their own responsibility. Each user who uploads such material must:</p>
                <ul className="points">
                  <li>Affirm that all performers depicted are at least <b>18 years old</b> at the time of production;</li>
                  <li>Maintain all required age-verification and record-keeping documents in accordance with <b>18 U.S.C. §2257</b> and <b>28 C.F.R. §75</b>;</li>
                  <li>Make those records available to law-enforcement authorities upon lawful request.</li>
                </ul>
                <p>MoneyBoy.com does not act as a producer or custodian of those records and does <b>not</b> control or pre-screen content prior to upload.</p>
                <h3>Record-Keeping Compliance</h3>
                <p>Users who produce and upload visual depictions of actual sexually explicit conduct must ensure that their records comply with <b>18 U.S.C. §2257</b>.</p>
                <p>Such records must include a copy of a valid government-issued photo ID for each performer and must be maintained for inspection as required by law.</p>
                <h3>Content Removal and Enforcement</h3>
                <p>Pursuant to <b>18 U.S.C. §2257(h)(2)(B)(v)</b> and <b>47 U.S.C. §230(c)</b>, the operators of <b>MoneyBoy.com</b> reserve the right to <b>remove or disable</b> any content posted by third parties that is deemed indecent, obscene, defamatory, exploitative, or otherwise inconsistent with our <b>Terms of Service</b>.</p>
                <p>To report a potential violation or to request information about our compliance practices, please contact:</p>
                <ul className="m-0 li-ps0">
                  <li><b>Email:</b> support@moneyboy.com</li>
                  <li><b>Subject line:</b> 2257 Compliance Inquiry</li>
                </ul>
              </div>
            </div>
      </main>
    </div>
      </div>
    </div>
  )
}

export default UscPage;