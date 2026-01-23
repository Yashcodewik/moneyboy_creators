"use client";
import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const FrequentlyQuestions = () => {
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
                  FAQ
                </button>
              </div>
              <div className="card main_contwrap">
                <h3>Frequently Asked Questions (FAQ)</h3>
                <h4>Clear answers about MoneyBoy.com</h4>
                <p>
                  This page provides clear and transparent answers to the most
                  common questions about MoneyBoy.com, for both users and
                  content creators.
                </p>
                <p>
                  MoneyBoy is designed to be easy to understand and
                  straightforward to use. These FAQs are intended to clarify how
                  the platform works and what to expect.
                </p>
                <h3>General questions</h3>
                <div className="accordion">
                  <div className="accordion_head">
                    <div className="head_cont">
                      <h5>What is MoneyBoy.com?</h5>
                    </div>
                    <svg className="icons chevronDownRounded" />
                  </div>
                  <div className="accordion_body">
                    <p>No.</p>
                    <p>
                      MoneyBoy is not a general social network and does not
                      operate as an open or mixed-content feed.
                    </p>
                    <p>
                      It is a <b>specialized platform</b> focused on digital
                      content created by male creators, with clear rules,
                      defined roles, and transparent interactions.
                    </p>
                  </div>
                </div>
                <div className="accordion">
                  <div className="accordion_head">
                    <div className="head_cont">
                      <h5>Is MoneyBoy available internationally?</h5>
                    </div>
                    <svg className="icons chevronDownRounded" />
                  </div>
                  <div className="accordion_body">
                    <p>No.</p>
                    <p>
                      MoneyBoy.com is an international platform and can be
                      accessed from multiple countries, subject to local
                      regulations and platform policies.
                    </p>
                  </div>
                </div>
                <h3>General questions</h3>
                <div className="accordion">
                  <div className="accordion_head">
                    <div className="head_cont">
                      <h5>Do I need an account to browse MoneyBoy.com?</h5>
                    </div>
                    <svg className="icons chevronDownRounded" />
                  </div>
                  <div className="accordion_body">
                    <p>No.</p>
                    <p>
                      Users can browse public creator profiles and view free
                      content without registering.
                    </p>
                    <p>
                      Registration is required only to follow creators, access
                      premium content, or interact with the platform.
                    </p>
                  </div>
                </div>
                <div className="accordion">
                  <div className="accordion_head">
                    <div className="head_cont">
                      <h5>What type of content can I find on MoneyBoy? </h5>
                    </div>
                    <svg className="icons chevronDownRounded" />
                  </div>
                  <div className="accordion_body">
                    <p>
                      MoneyBoy hosts{" "}
                      <b>
                        digital content created exclusively by male content
                        creators
                      </b>
                      .
                    </p>
                    <p>Content may include:</p>
                    <ul className="points">
                      <li>free posts published by creators;</li>
                      <li>
                        premium content available through subscriptions, paid
                        posts, or PPV.
                      </li>
                    </ul>
                    <p>
                      All content is digital and published directly by the
                      creators.
                    </p>
                  </div>
                </div>
                <div className="accordion">
                  <div className="accordion_head">
                    <div className="head_cont">
                      <h5>How do subscriptions and paid content work?</h5>
                    </div>
                    <svg className="icons chevronDownRounded" />
                  </div>
                  <div className="accordion_body">
                    <p>Creators may offer:</p>
                    <ul className="points">
                      <li>
                        subscriptions with recurring access to premium content;
                      </li>
                      <li>individual paid posts or unlockable content;</li>
                      <li>pay-per-view (PPV) content.</li>
                    </ul>
                    <p>
                      All paid content is clearly marked.{" "}
                      <span className="block">
                        There are no hidden charges and no automatic payments
                        without explicit user confirmation.
                      </span>
                    </p>
                  </div>
                </div>
                <div className="accordion">
                  <div className="accordion_head">
                    <div className="head_cont">
                      <h4>Can I control what I pay for?</h4>
                    </div>
                    <svg className="icons chevronDownRounded" />
                  </div>
                  <div className="accordion_body">
                    <p>
                      Yes.{" "}
                      <span className="Users remain in full control of what they choose to access and support."></span>
                    </p>
                    <p>
                      Payments are made only after clear confirmation, and users
                      decide independently which creators or content to support.
                    </p>
                  </div>
                </div>
                <h3>Questions for content creators</h3>
                <div className="accordion">
                  <div className="accordion_head">
                    <div className="head_cont">
                      <h5>Who can become a creator on MoneyBoy.com?</h5>
                    </div>
                    <svg className="icons chevronDownRounded" />
                  </div>
                  <div className="accordion_body">
                    <p>
                      MoneyBoy.com is open to <b>male content creators</b> who
                      want to publish and monetize digital content within a
                      professional and structured platform.
                    </p>
                    <p>
                      Creators must complete an identity verification process
                      before becoming fully active.
                    </p>
                  </div>
                </div>
                <div className="accordion">
                  <div className="accordion_head">
                    <div className="head_cont">
                      <h5>What monetization options are available?</h5>
                    </div>
                    <svg className="icons chevronDownRounded" />
                  </div>
                  <div className="accordion_body">
                    <p>Creators can monetize through:</p>
                    <ul>
                      <li>recurring subscriptions;</li>
                      <li>individual paid posts or unlockable content;</li>
                      <li>
                        pay-per-view (PPV) content, including custom content
                        requests.
                      </li>
                    </ul>
                    <p>
                      Creators decide how to structure their content and
                      pricing.
                    </p>
                  </div>
                </div>
                <div className="accordion">
                  <div className="accordion_head">
                    <div className="head_cont">
                      <h5>Does MoneyBoy control creator pricing or content?</h5>
                    </div>
                    <svg className="icons chevronDownRounded" />
                  </div>
                  <div className="accordion_body">
                    <p>
                      No.{" "}
                      <span className="block">
                        MoneyBoy does not interfere with creator pricing
                        strategies or content structure.
                      </span>
                    </p>
                    <p>
                      Creators maintain full control over what they publish, how
                      content is offered, and how it is priced, within the
                      platform’s rules.
                    </p>
                  </div>
                </div>
                <div className="accordion">
                  <div className="accordion_head">
                    <div className="head_cont">
                      <h5>Are offline services or meetings allowed?</h5>
                    </div>
                    <svg className="icons chevronDownRounded" />
                  </div>
                  <div className="accordion_body">
                    <p>
                      No.{" "}
                      <span className="block">
                        MoneyBoy operates exclusively in the{" "}
                        <b>digital space</b>.
                      </span>
                    </p>
                    <p>
                      There are no physical services, offline meetings, or
                      real-world interactions facilitated through the platform.
                    </p>
                  </div>
                </div>
                <h3>Safety, verification, and transparency</h3>
                <div className="accordion">
                  <div className="accordion_head">
                    <div className="head_cont">
                      <h5>Are creators verified?</h5>
                    </div>
                    <svg className="icons chevronDownRounded" />
                  </div>
                  <div className="accordion_body">
                    <p>
                      No.{" "}
                      <span className="block">
                        All creators go through an identity verification
                        process.
                      </span>
                    </p>
                    <p>
                      This helps protect creators, build user trust, and
                      maintain a professional and reliable platform environment.
                    </p>
                  </div>
                </div>
                <div className="accordion">
                  <div className="accordion_head">
                    <div className="head_cont">
                      <h5>How are payments handled?</h5>
                    </div>
                    <svg className="icons chevronDownRounded" />
                  </div>
                  <div className="accordion_body">
                    <p>
                      Payments and earnings are managed through the platform in
                      a transparent way.
                    </p>
                    <p>
                      Creators can monitor earnings and manage their wallet
                      through a dedicated dashboard. User payments are processed
                      securely and clearly.
                    </p>
                  </div>
                </div>
                <div className="accordion">
                  <div className="accordion_head">
                    <div className="head_cont">
                      <h5>How does MoneyBoy protect user and creator data?</h5>
                    </div>
                    <svg className="icons chevronDownRounded" />
                  </div>
                  <div className="accordion_body">
                    <p>
                      MoneyBoy applies strict standards for data protection and
                      platform security.
                    </p>
                    <p>
                      Personal and financial information is handled in
                      accordance with applicable regulations and platform
                      policies.
                    </p>
                  </div>
                </div>
                <h3>Getting started</h3>
                <div className="accordion">
                  <div className="accordion_head">
                    <div className="head_cont">
                      <h5>How do I get started as a user?</h5>
                    </div>
                    <svg className="icons chevronDownRounded" />
                  </div>
                  <div className="accordion_body">
                    <p>
                      You can start by browsing creator profiles on
                      MoneyBoy.com.{" "}
                      <span className="block">
                        Registration is optional until you choose to follow
                        creators or access premium content.
                      </span>
                    </p>
                  </div>
                </div>
                <div className="accordion">
                  <div className="accordion_head">
                    <div className="head_cont">
                      <h5>How do I get started as a creator?</h5>
                    </div>
                    <svg className="icons chevronDownRounded" />
                  </div>
                  <div className="accordion_body">
                    <p>
                      Creators can apply by creating a profile on MoneyBoy.com
                      and completing the verification process.
                    </p>
                    <p>
                      You can learn more about how the platform works before
                      joining.
                    </p>
                  </div>
                </div>
                <h3>Final note</h3>
                <p>
                  MoneyBoy.com is built around clarity, transparency, and
                  specialization.
                </p>
                <p>
                  If you are looking for a focused platform dedicated
                  exclusively to male digital content creators, MoneyBoy
                  provides a structured and professional environment for both
                  users and creators.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FrequentlyQuestions;
