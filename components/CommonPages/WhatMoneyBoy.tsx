"use client";
import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const WhatMoneyBoy = () => {
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
                  What Is Moneyboy
                </button>
              </div>
              <div className="card main_contwrap">
                <h3>What is MoneyBoy.com</h3>
                <h4>
                  A premium platform dedicated exclusively to male content
                  creators
                </h4>
                <p>
                  MoneyBoy.com is an international digital platform created to
                  offer a clear, curated, and specialized experience in the
                  world of male digital content.
                </p>
                <p>
                  It is a space designed with a single, precise focus:{" "}
                  <b>
                    all content on MoneyBoy is created exclusively by male
                    content creators.
                  </b>
                </p>
                <p>
                  MoneyBoy was built to remove confusion, mixed environments,
                  and generic platforms, offering instead a dedicated ecosystem
                  where users can discover male creators in one place, and
                  creators can operate within a structured and professional
                  framework.
                </p>
                <h3>For users: where to find only male content creators</h3>
                <p>
                  For users, MoneyBoy.com is first and foremost a destination.
                </p>
                <p>
                  It is a platform where you can explore and follow{" "}
                  <b>only male content creators</b>, without mixed feeds,
                  unrelated content, or unclear positioning
                </p>
                <p>On MoneyBoy.com you can:</p>
                <ul className="points">
                  <li>discover male-only creator profiles;</li>
                  <li>
                    explore public profiles with biographies, images, and free
                    content;
                  </li>
                  <li>follow creators you are interested in;</li>
                  <li>
                    access premium and exclusive digital content in a clear and
                    transparent way.
                  </li>
                </ul>
                <p>
                  The experience is designed to be simple, orderly, and focused.{" "}
                  <span className="block">
                    No anonymous profiles, no spam, no unnecessary noise.
                  </span>
                </p>
                <p>
                  All creator profiles on MoneyBoy are verified, ensuring
                  authenticity and a transparent relationship between creators
                  and their audience.
                </p>
                <p>
                  MoneyBoy.com allows users to explore freely, understand the
                  platform, and choose how and when to support creators —
                  without pressure and without confusion.
                </p>
                <p>
                  <b>Want to understand how MoneyBoy works in practice?</b>{" "}
                  <span className="block">
                    Learn how profiles, content, and subscriptions work →{" "}
                    <b>/how-it-works</b>
                  </span>
                </p>
                <h3>
                  For content creators: a platform built to monetize digital
                  content
                </h3>
                <p>
                  For male content creators, MoneyBoy.com is a{" "}
                  <b>professional opportunity platform</b>.
                </p>
                <p>
                  It is designed for creators who want to build a clear digital
                  presence and monetize their content in a structured,
                  transparent, and independent way.
                </p>
                <p>MoneyBoy allows creators to:</p>
                <ul className="points">
                  <li>create a public and shareable profile;</li>
                  <li>publish free and premium digital content;</li>
                  <li>monetize through subscriptions and paid content;</li>
                  <li>
                    manage earnings through a dedicated dashboard and wallet
                    system.
                  </li>
                </ul>
                <p>
                  The platform is focused exclusively on{" "}
                  <b>digital online content.</b>{" "}
                  <span className="block">
                    There are no physical services, no offline meetings, and no
                    external intermediations.
                  </span>
                </p>
                <p>
                  This approach allows creators to operate in a controlled
                  environment, with clear rules, reliable tools, and long-term
                  sustainability.
                </p>
                <p>
                  <b>Interested in joining MoneyBoy as a creator? </b>{" "}
                  <span className="block">
                    See how monetization and subscriptions work →{" "}
                    <b>/how-it-works</b>
                  </span>
                </p>
                <h3>A controlled, secure, and transparent environment</h3>
                <p>
                  MoneyBoy.com adopts a strict and professional approach to
                  platform management.
                </p>
                <p>This includes:</p>
                <ul className="points">
                  <li>identity verification for all content creators;</li>
                  <li>protection of personal and financial data;</li>
                  <li>transparent payment and payout processes;</li>
                  <li>
                    clear separation between platform responsibilities and
                    creator activity.
                  </li>
                </ul>
                <p>
                  The goal is to build an ecosystem where users know what to
                  expect, creators can work with confidence, and the platform
                  can grow in a stable and responsible way.
                </p>
                <h3>In summary </h3>
                <p>MoneyBoy.com is:</p>
                <ul className="points">
                  <li>
                    a premium platform dedicated exclusively to male content
                    creators;
                  </li>
                  <li>a place where users find only content created by men;</li>
                  <li>
                    a professional environment for creators to monetize digital
                    content online;
                  </li>
                  <li>
                    an international, verified, and quality-oriented platform.
                  </li>
                </ul>
                <p>
                  MoneyBoy.com is not a generic social network, and it is not a
                  chaotic marketplace. It is a specialized platform designed to
                  connect demand and supply in the male digital content space,
                  in a clear, elegant, and sustainable way.
                </p>
                <ul className="points link_points">
                  <li>
                    Learn how MoneyBoy works (FAQ){" "}
                    <Link href="/help/how-it-works">/how-it-works </Link>
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

export default WhatMoneyBoy;
