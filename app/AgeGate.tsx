"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CgClose } from "react-icons/cg";

export default function AgeGate() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasAgreed = localStorage.getItem("ageVerified");

    if (!hasAgreed) {
      setShowModal(true);
    }
  }, []);

  const handleAgree = () => {
    localStorage.setItem("ageVerified", "true");
    setShowModal(false);
  };

  const handleDisagree = () => {
    window.open("", "_self");
    window.close();
  };

  if (!showModal) return null;

  return (
    <div
      className="modal show"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-modal-title"
    >
      <div className="modal-wrap ageverify-modal">
        <button className="close-btn" onClick={handleDisagree}>
          <CgClose size={22} />
        </button>

        <h3 className="title">
          Age Verification Required{" "}
          <img src="/images/18plus-Icon.svg" className="icons" />
        </h3>

        <p>
          This website contains content intended for mature audiences. By
          entering, you confirm that:
        </p>

        <ul className="points">
          <li>
            You are at least <b>18 years old</b> (or the age of majority in your
            region).
          </li>
          <li>You are legally permitted to view this content.</li>
          <li>
            You agree to our <Link href="/terms">Terms & Conditions</Link> and
            confirm your visit is voluntary.
          </li>
        </ul>

        <div className="actions">
          <button
            className="premium-btn active-down-effect"
            onClick={handleAgree}
          >
            <span>I Agree, Enter Now</span>
          </button>

          <button
            className="cate-back-btn active-down-effect"
            onClick={handleDisagree}
          >
            I Do Not Agree, Leave Site
          </button>
        </div>
      </div>
    </div>
  );
}
