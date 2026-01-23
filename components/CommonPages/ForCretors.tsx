"use client";
import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const ForCretors = () => {
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
                  For Creators
                </button>
              </div>
              <div className="card main_contwrap">
                <h3>For Creators on MoneyBoy.com</h3>
                <h4>
                  A premium platform built exclusively for male content creators
                </h4>
                <p>
                  MoneyBoy.com is an international digital platform designed
                  specifically for <b>male content creators</b> who want a
                  clear, focused, and professional environment to publish and
                  monetize digital content.
                </p>
                <p>
                  Unlike generic platforms, MoneyBoy is built around a single
                  specialization. This creates clarity for users, a defined
                  audience for creators, and a structured ecosystem designed for
                  long-term sustainability.
                </p>
                <h3>What MoneyBoy means for creators</h3>
                <p>
                  For creators, MoneyBoy.com is a{" "}
                  <b>dedicated digital platform</b>, not a general social
                  network.
                </p>
                <p>It exists to provide:</p>
                <ul className="points">
                  <li>
                    a focused environment without mixed or unrelated content;
                  </li>
                  <li>
                    a clearly defined audience interested in male creators;
                  </li>
                  <li>
                    a professional structure designed around digital content
                    monetization.
                  </li>
                </ul>
                <p>
                  MoneyBoy is not about visibility at any cost. It is about{" "}
                  <b>clarity, positioning, and control.</b>
                </p>
                <h3>What creators can do on MoneyBoy</h3>
                <p>
                  On MoneyBoy.com, creators can build a public presence and
                  engage directly with their audience.
                </p>
                <p>Creators can:</p>
                <ul className="points">
                  <li>create a public and shareable profile;</li>
                  <li>
                    publish free digital content to introduce their style and
                    identity;
                  </li>
                  <li>offer premium content to subscribers and supporters;</li>
                  <li>grow a fanbase within a curated and focused platform.</li>
                </ul>
                <p>
                  All profiles are designed to be discoverable, readable, and
                  aligned with a professional digital presence.
                </p>
                <h3>Monetization options</h3>
                <p>
                  MoneyBoy provides multiple monetization options, allowing
                  creators to choose the model that best fits their content and
                  audience.
                </p>
                <p>Creators can monetize through:</p>
                <ul className="points">
                  <li>recurring subscriptions;</li>
                  <li>individual paid posts or unlockable content;</li>
                  <li>
                    pay-per-view (PPV) content, including custom content
                    requests, managed through the platform.
                  </li>
                </ul>
                <p>
                  All earnings are handled through a dedicated dashboard, where
                  creators can:
                </p>
                <ul className="points">
                  <li>track performance;</li>
                  <li>monitor earnings;</li>
                  <li>manage their wallet.</li>
                </ul>
                <p>
                  MoneyBoy does not interfere with creator pricing strategies or
                  content structure.
                </p>
                <h3>Control, independence, and transparency</h3>
                <p>
                  MoneyBoy is designed to give creators <b>full control</b> over
                  their activity.
                </p>
                <p>Creators maintain control over:</p>
                <ul className="points">
                  <li>the content they publish;</li>
                  <li>how content is offered (free or premium);</li>
                  <li>pricing and availability.</li>
                </ul>
                <p>
                  The platform operates exclusively in the digital space.{" "}
                  <span className="block">
                    There are no physical services, offline meetings, or
                    real-world interactions.
                  </span>
                </p>
                <p>
                  This ensures a clear, compliant, and transparent environment
                  for both creators and users.
                </p>
                <h3>A verified and professional environment</h3>
                <p>
                  All creators on MoneyBoy go through an identity verification
                  process.
                </p>
                <p>This approach:</p>
                <ul className="points">
                  <li>protects creators;</li>
                  <li>builds trust with users;</li>
                  <li>strengthens the overall reputation of the platform.</li>
                </ul>
                <p>
                  MoneyBoy aims to create an ecosystem where professional
                  standards, transparency, and accountability are part of the
                  platform structure.
                </p>
                <h3>Who MoneyBoy is for</h3>
                <p>MoneyBoy.com is suitable for:</p>
                <ul className="points">
                  <li>
                    creators who are starting their digital content journey;
                  </li>
                  <li>
                    creators already active on other platforms who want a more
                    focused environment;
                  </li>
                  <li>
                    creators who value clarity, structure, and long-term
                    positioning;
                  </li>
                  <li>
                    creators interested in building a professional digital
                    presence.
                  </li>
                </ul>
                <p>
                  MoneyBoy is not designed for creators looking for chaotic
                  feeds or generic exposure. It is built for those who value{" "}
                  <b>focus and quality</b>.
                </p>
                <p>
                  <b>Interested in becoming a creator on MoneyBoy? </b> You can
                  learn how the platform works or create your profile directly.
                </p>
                <ul className="points link_points">
                  <li>
                    Learn how MoneyBoy works{" "}
                    <Link href="/help/how-it-works">/how-it-works </Link>
                  </li>
                  <li>
                    Create your profile on MoneyBoy{" "}
                    <Link href="/signup">signup → </Link>
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

export default ForCretors;
