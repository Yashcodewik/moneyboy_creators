"use client";
import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const HowWorks = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromTab = searchParams.get("fromTab") || "all";
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
                  {" "}
                  How It Works
                </button>
              </div>
              <div className="card main_contwrap">
                <h3>How MoneyBoy.com Works</h3>
                <h4>
                  A clear and transparent platform for users and content
                  creators
                </h4>
                <p>
                  MoneyBoy.com is designed to be simple to understand and easy
                  to use, both for users who want to discover male content
                  creators and for creators who want to publish and monetize
                  digital content.
                </p>
                <p>
                  The platform follows a clear structure, with defined roles,
                  transparent interactions, and full control for both sides.
                </p>
                <p>Below is how MoneyBoy.com works in practice.</p>
                <h3>How MoneyBoy works for users</h3>
                <p>
                  MoneyBoy.com allows users to explore the platform freely, even
                  before registering.
                </p>
                <h4>Discover creators</h4>
                <p>
                  Users can browse and discover{" "}
                  <b>only male content creators</b> through public profiles that
                  are visible without registration.
                </p>
                <p>Each creator profile includes:</p>
                <ul className="points">
                  <li>a public biography;</li>
                  <li>images and preview content;</li>
                  <li>free posts published by the creator.</li>
                </ul>
                <p>
                  This allows users to understand a creator’s style and content
                  before choosing to follow or support them.
                </p>
                <h4>Follow creators</h4>
                <p>Users can follow creators they are interested in.</p>
                <p>Following a creator allows users to:</p>
                <ul className="points">
                  <li>stay updated on new content;</li>
                  <li>easily access free posts;</li>
                  <li>decide independently whether to support the creator.</li>
                </ul>
                <p>Following a profile does not require payment.</p>
                <h3>Access premium content</h3>
                <p>Creators may offer premium digital content through:</p>
                <ul className="points">
                  <li>subscriptions;</li>
                  <li>individual paid posts or unlockable content;</li>
                  <li>
                    pay-per-view (PPV) content, including custom content
                    requests.
                  </li>
                </ul>
                <p>
                  All paid content is clearly marked and separated from free
                  content. There are no hidden charges and no automatic payments
                  without explicit user confirmation.
                </p>
                <p>
                  Users remain in full control of what they choose to access and
                  support.
                </p>
                <h3>How MoneyBoy works for content creators</h3>
                <p>
                  MoneyBoy.com is built to support <b>male content creators</b>{" "}
                  who want to develop a professional and sustainable digital
                  activity.
                </p>
                <h3>Create a public profile</h3>
                <p>
                  Creators create a public profile that can be shared externally
                  and discovered by users on the platform.
                </p>
                <p>Profiles are designed to be:</p>
                <ul className="points">
                  <li>clear;</li>
                  <li>professional;</li>
                  <li>focused on content identity.</li>
                </ul>
                <p>
                  All creators complete an identity verification process before
                  becoming fully active on the platform.
                </p>
                <h3>Publish content</h3>
                <p>Creators can publish:</p>
                <ul className="points">
                  <li>free content, visible to everyone;</li>
                  <li>
                    premium content, available through subscriptions, paid
                    posts, or PPV.
                  </li>
                </ul>
                <p>Creators decide:</p>
                <ul className="points">
                  <li>what content is free;</li>
                  <li>what content is premium;</li>
                  <li>how their audience engages with their profile.</li>
                </ul>
                <h3>Monetize content</h3>
                <p>MoneyBoy allows creators to monetize through:</p>
                <ul className="points">
                  <li>recurring subscriptions;</li>
                  <li>individual paid posts or unlockable content;</li>
                  <li>
                    pay-per-view (PPV) content, including custom content
                    requests, managed directly through the platform.
                  </li>
                </ul>
                <p>
                  Custom content requests allow users to request specific
                  digital content, subject to availability and creator approval.{" "}
                  <span className="block">
                    All requests are handled within the platform and remain
                    strictly digital
                  </span>
                </p>
                <p>
                  All earnings are managed through a dedicated dashboard, where
                  creators can:
                </p>
                <ul className="points">
                  <li>track performance;</li>
                  <li>monitor earnings;</li>
                  <li>manage their wallet</li>
                </ul>
                <p>
                  MoneyBoy does not interfere with creator pricing strategies or
                  content structure.
                </p>
                <h3>A digital-only platform</h3>
                <p>MoneyBoy.com operates exclusively in the digital space.</p>
                <p>This means:</p>
                <ul className="points">
                  <li>no physical services;</li>
                  <li>no offline meetings;</li>
                  <li>no real-world interactions.</li>
                </ul>
                <p>
                  The platform is designed solely for publishing, distributing,
                  and monetizing digital content online, ensuring clarity,
                  safety, and compliance.
                </p>
                <h3>Transparency and control</h3>
                <p>
                  Both users and creators benefit from a transparent and
                  controlled environment.
                </p>
                <p>MoneyBoy.com ensures:</p>
                <ul className="points">
                  <li>clear separation between free and paid content;</li>
                  <li>transparent payment flows;</li>
                  <li>protection of personal and financial data;</li>
                  <li>defined platform rules and responsibilities.</li>
                </ul>
                <p>
                  The platform is built to reduce misunderstandings and to
                  support long-term, professional use.
                </p>
                <h3>In summary</h3>
                <p>MoneyBoy.com works through a simple and structured model:</p>
                <ul className="points">
                  <li>users discover and support male content creators;</li>
                  <li>creators publish and monetize digital content;</li>
                  <li>
                    all interactions remain transparent, controlled, and
                    digital.
                  </li>
                </ul>
                <p>
                  MoneyBoy.com offers a focused alternative to generic
                  platforms, providing clarity for users and professional tools
                  for creators.
                </p>
                <p>
                  <b>Interested in becoming a creator on MoneyBoy?</b> Learn how
                  to publish and monetize digital content on the platform
                </p>
                <ul className="points link_points">
                  <li>
                    Learn how MoneyBoy works (FAQ){" "}
                    <Link href="/help/for-cretors">/for-cretors </Link>
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

export default HowWorks;
