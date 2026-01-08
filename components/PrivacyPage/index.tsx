"use client";
import { useRouter } from 'next/navigation';
import React from 'react'

const PrivacyPage = () => {
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
                <button className="page-content-type-button active-down-effect active">Privacy & Policy</button>
              </div>
              <div className="card main_contwrap">
                <h3>Last updated: <span>November 2025</span></h3>
                <p>Welcome to <b>MoneyBoy.com</b>, a platform operated by <b>DNA Global Media B.V.</b> (registered in the Netherlands, KvK No. 97379654).</p>
                <p>We are committed to protecting your personal data and ensuring transparency about how we collect, use, and safeguard information in compliance with applicable privacy laws, including the <b>EU General Data Protection Regulation (GDPR)</b>, the <b>California Consumer Privacy Act (CCPA)</b>, and other international data protection standards.</p>
                 <h3>1. Scope of this Policy</h3>
                 <p>This Privacy Policy applies to all users of <b>MoneyBoy.com</b>, including creators, subscribers, and visitors.</p>
                 <p>By accessing or using our website, you agree to the terms described herein.</p>
                 <p>This document explains:</p>
                 <ul className="points">
                  <li>What data we collect</li>
                  <li>How and why we use it</li>
                  <li>How we protect it</li>
                  <li>Your rights regarding your data</li>
                 </ul>
                 <h3>2. Information We Collect</h3>
                 <p>We may collect the following categories of information:</p>
                 <h5>A. Information you provide directly</h5>
                 <ul className="points">
                  <li>Account details (name, email, password, date of birth)</li>
                  <li>Payment information (processed securely by third-party payment providers; MoneyBoy.com does not store full credit card data)</li>
                  <li>Identity verification data (for creators and age verification)</li>
                  <li>Communication with support or other users</li>
                 </ul>
                 <h5>B. Information automatically collected</h5>
                 <ul className="points">
                  <li>Device and browser data (IP address, user agent, cookies, log data)</li>
                  <li>Usage data (pages visited, time spent, actions taken)</li>
                 </ul>
                 <h5>C. Sensitive content</h5>
                 <p>MoneyBoy.com hosts adult-oriented content. We take additional precautions to ensure all users accessing or uploading content are 18 years or older and comply with our Terms of Service and 18 U.S.C. §2257 obligations.</p>
                 <h3>3. How We Use Your Data</h3>
                 <p>We process personal data to:</p>
                 <ul className="points">
                  <li>Operate and maintain the platform;</li>
                  <li>Facilitate payments and subscriptions;</li>
                  <li>Verify identities and prevent fraud;</li>
                  <li>Enforce legal compliance (DMCA, 2257, GDPR);</li>
                  <li>Communicate with users and provide support;</li>
                  <li>Improve user experience and site functionality.</li>
                 </ul>
                 <p>We do not sell personal data to third parties.</p>
                 <h3>4. Data Sharing and Disclosure</h3>
                 <p>Your data may be shared only with:</p>
                 <ul className="points">
                  <li>Verified service providers (e.g., payment processors, hosting, security services);</li>
                  <li>Law enforcement agencies, only upon valid legal request;</li>
                  <li>Internal staff and contractors strictly under confidentiality agreements.</li>
                 </ul>
                 <p>All third-party processors comply with GDPR and CCPA standards.</p>
                 <h3>5. Data Retention</h3>
                 <p>We retain user data only for as long as necessary to:</p>
                 <ul className="points">
                  <li>Maintain your account,</li>
                  <li>Fulfill contractual obligations,</li>
                  <li>Comply with legal and regulatory requirements.</li>
                 </ul>
                 <p>You may request deletion of your account and associated data at any time (see Section 8).</p>
                 <h3>6. Cookies and Tracking</h3>
                 <p>MoneyBoy.com uses cookies and similar technologies for:</p>
                 <ul className="points">
                  <li>Authentication and security,</li>
                  <li>Session management,</li>
                  <li>Analytics and performance improvement.</li>
                 </ul>
                 <p>You can manage or disable cookies in your browser settings, though some features may become unavailable.</p>
                 <h3>7. Data Security</h3>
                 <p>We implement strict security measures to protect user data from unauthorized access, alteration, or disclosure.</p>
                 <p>All communications are encrypted via HTTPS and stored in secure environments managed under company-level access policies (see internal rule: access limited to the Founder & CEO).</p>
                 <h3>8. Your Rights</h3>
                 <p>Depending on your jurisdiction, you have the right to:</p>
                 <ul className="points">
                  <li>Access your personal data;</li>
                  <li>Correct or update information;</li>
                  <li>Request deletion (“right to be forgotten”);</li>
                  <li>Withdraw consent;</li>
                  <li>Object to processing or restrict data use;</li>
                  <li>Request a copy of your data (data portability).</li>
                 </ul>
                 <p>Requests can be made by emailing <b>support@moneyboy.com.</b> We respond within <b>30 days.</b></p>
                 <h3>9. International Data Transfers</h3>
                 <p>MoneyBoy.com is operated from the <b>European Union (Netherlands)</b>.When transferring data outside the EU/EEA, we ensure that adequate safeguards are in place (e.g., Standard Contractual Clauses or equivalent legal mechanisms).</p>
                 <h3>10. Age Restriction</h3>
                 <p>This platform is intended for adults (18+) only. <span className="block">We do not knowingly collect or store personal data from minors.</span> <span className="block">Any account found in violation of this rule will be suspended and reported if necessary.</span></p>
                 <h3>11. Updates to this Policy</h3>
                 <p>We may update this Privacy Policy periodically. <span className="block">All changes will be published on this page with an updated “Last updated” date.</span> <span className="block">Your continued use of the site constitutes acceptance of those updates.</span></p>
                 <h3>12. Contact</h3>
                 <p>If you have any questions, concerns, or requests related to privacy or data protection, please contact:</p>
                 <ul className="m-0 li-ps0">
                  <li><b>Email:</b> support@moneyboy.com</li>
                  <li><b>Subject line:</b> Privacy Inquiry</li>
                </ul>
              </div>
            </div>
      </main>
    </div>
      </div>
    </div>
  )
}

export default PrivacyPage;