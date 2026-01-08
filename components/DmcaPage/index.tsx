"use client";
import {  useRouter } from 'next/navigation';
import React from 'react'

const HelpPage = () => {
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
                <button className="page-content-type-button active-down-effect active">DMCA</button>
              </div>
              <div className="card main_contwrap">
                <h3>DMCA – Digital Millennium Copyright Act</h3>
                <p><b>MoneyBoy.com</b> is operated by <b>DNA Global Media B.V.</b>, a company registered in the Netherlands (KvK No. 97379654).</p>
                <p>We have implemented a comprehensive <b>Repeat Infringer Policy (RIP)</b> to terminate, without notice, the accounts of users who repeatedly infringe or attempt to infringe on the copyrights or trademarks of third parties.</p>
                <p>A copy of this policy is available upon written request.</p>
                <h3>1. DMCA Takedown Notices</h3>
                <p>If you believe that any content available on MoneyBoy.com infringes upon your copyright, please submit a valid DMCA Takedown Notice to our Designated Agent via email:</p>
                <p>We have implemented a comprehensive <b>Repeat Infringer Policy (RIP)</b> to terminate, without notice, the accounts of users who repeatedly infringe or attempt to infringe on the copyrights or trademarks of third parties.</p>
                <p>A copy of this policy is available upon written request.</p>
                <ul>
                  <li><b>Email:</b> support@moneyboy.com</li>
                  <li><b>Subject line:</b> DMCA Notice – [Your Name / Company]</li>
                </ul>
                <p>Your notice must include the following information as required by 17 U.S.C. §512(c)(3):</p>
                <ul className="number">
                  <li>Your full legal name and electronic or physical signature.</li>
                  <li>Identification of the copyrighted work claimed to have been infringed.</li>
                  <li>Identification of the infringing material, including its exact URL(s) on MoneyBoy.com.</li>
                  <li>Your contact information (email and country of residence).</li>
                  <li>A statement declaring your good-faith belief that the disputed use of the material is not authorized by the copyright owner, its agent, or the law.</li>
                  <li>A statement, made under penalty of perjury, that the information provided is accurate and that you are authorized to act on behalf of the copyright owner.</li>
                </ul>
                <p>Incomplete notices may be disregarded.</p>
                <h3>2. Counter-Notification</h3>
                <p>If you believe that content was removed by mistake or misidentification, you may submit a <b>Counter-Notification</b> under <b>17 U.S.C. §512(g)</b> by writing to <b>support@moneyboy.com</b> with the subject line “DMCA Counter-Notice”.</p>
                <p>Your Counter-Notification must include:</p>
                <ul className="number">
                  <li>Your name, address, and electronic signature.</li>
                  <li>Identification of the material that has been removed or disabled and the location where it appeared before removal.</li>
                  <li>A statement, under penalty of perjury, that you have a good-faith belief the material was removed or disabled as a result of mistake or misidentification.</li>
                  <li>Consent to the jurisdiction of your local Federal District Court (if in the U.S.) or of the courts in your country of residence (if outside the U.S.).</li>
                </ul>
                <h3>3. Misrepresentation Warning</h3>
                <p>Please note that <b>under 17 U.S.C. §512(f),</b> any person who knowingly makes <b>material misrepresentations</b> in a DMCA notification or counter-notification <b>may be held liable for damages</b>, including costs and attorney’s fees.</p>
                <h3>4. Additional Information</h3>
                <p>MoneyBoy.com acts as an <b>intermediary hosting provider.</b></p>
                <p>We do not control or pre-approve user-submitted content.</p>
                <p>Upon receiving a valid DMCA notice, we act expeditiously to remove or disable access to the</p>
                <p>reported material in accordance with U.S. and EU laws.</p>
              </div>
            </div>
      </main>
    </div>
      </div>
    </div>
  )
}

export default HelpPage;