"use client";
import { useRouter } from 'next/navigation';
import React from 'react'

const RefundPage = () => {
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
                <button className="page-content-type-button active-down-effect active">Refund Policy</button>
              </div>
              <div className="card main_contwrap">
                <h3>Refund & Cancellation Policy</h3>
                <p><b>MoneyBoy.com</b> </p>
                <h3>1. General Policy</h3>
                <p>MoneyBoy.com is a digital subscription-based platform providing access to user-generated digital content, memberships, and pay-per-view (PPV) media. All content and services are delivered <b>electronically and instantly</b> upon successful payment.</p>
                <p>By completing a purchase or subscription on MoneyBoy.com, users acknowledge and agree to the terms outlined in this Refund & Cancellation Policy.</p>
                <h3>2. Subscriptions (Memberships)</h3>
                <p>Users may cancel their active subscription at any time directly from their account settings.</p>
                <ul className="points">
                  <li>Cancellation will take effect <b>at the end of the current billing period</b></li>
                  <li>No further charges will be applied after cancellation</li>
                  <li><b>Previously paid subscription fees are non-refundable</b>, including partially used billing periods</li>
                </ul>
                <p>Access to subscribed content remains available until the end of the paid subscription term.</p>
                <h3>3. Pay-Per-View (PPV) Content</h3>
                <p>All Pay-Per-View purchases are <b>final and non-refundable.</b></p>
                <p>Due to the immediate and irreversible delivery of digital content, refunds cannot be issued once access to PPV content has been granted.</p>
                <h3>4. Refund Eligibility</h3>
                <p>Refunds may be considered <b>only</b> in the following exceptional cases:</p>
                <ul className="points">
                  <li>Duplicate charges caused by a technical error</li>
                  <li>Unauthorized transactions confirmed after internal review</li>
                  <li>Proven system malfunction preventing access to purchased content</li>
                </ul>
                <p>Refund requests must be submitted within <b>14 days</b> of the transaction date and will be reviewed on a case-by-case basis.</p>
                <p>MoneyBoy.com reserves the right to deny refund requests that do not meet the criteria above.</p>
                <h3>5. Chargebacks & Dispute Resolution</h3>
                <p>Users are encouraged to contact <b>support@moneyboy.com</b> before initiating a chargeback with their payment provider.</p>
                <p>Unauthorized or abusive chargebacks may result in:</p>
                <ul className="points">
                  <li>Temporary or permanent account suspension</li>
                  <li>Loss of access to purchased content</li>
                </ul>
                <p>MoneyBoy.com cooperates fully with payment providers and card networks in dispute resolution processes.</p>
                <h3>6. Creator Content Responsibility</h3>
                <p>MoneyBoy.com acts as a <b>platform provider</b> and does not control or guarantee the content quality, availability, or performance of individual creators.</p>
                <p>Refunds will not be issued based on dissatisfaction with creator content once access has been granted.</p>
                <h3>7. Contact Information</h3>
                <p>For questions related to cancellations, refunds, or billing issues, users may contact:</p>
                <ul className="m-0 li-ps0">
                  <li><b>Email:</b> support@moneyboy.com</li>
                  <li><b>Subject line:</b> Refund & Cancellation Request</li>
                </ul>
              </div>
            </div>
      </main>
    </div>
      </div>
    </div>
  )
}

export default RefundPage;