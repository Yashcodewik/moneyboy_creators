"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Modal from "@/components/Modal";

export default function AgeGate() {
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/terms") return;

    try {
      const hasAgreed = localStorage.getItem("ageVerified");
      if (!hasAgreed) {
        setShowModal(true);
      }
    } catch (e) {
      setShowModal(true);
    }
  }, [pathname]);

  const handleAgree = () => {
    try {
      localStorage.setItem("ageVerified", "true");
    } catch (e) {
    }
    setShowModal(false);
  };

  const handleDisagree = () => {
    window.location.href = "https://www.google.com";
  };

  if (!showModal || pathname === "/terms") return null;

  return (
    <Modal show={showModal} onClose={handleDisagree} size="lg" title=" " className="ageverify_wrap">
      <div className="modal_containt ageverify-modal">
        <h3 className="title"> Age Verification Required{" "} <img src="/images/18plus-Icon.svg" className="icons" alt="18+" /></h3>
        <p>This website contains content intended for mature audiences. By entering, you confirm that:</p>
        <ul className="points">
          <li>You are at least <b>18 years old</b> (or the age of majority in your region).</li>
          <li>You are legally permitted to view this content.</li>
          <li>You agree to our{" "} <Link href="/terms">Terms &amp; Conditions</Link> and confirm your visit is voluntary.</li>
        </ul>
        <div className="actions">
          <button className="premium-btn active-down-effect" onClick={handleAgree}><span>I Agree, Enter Now</span></button>
          <button className="cate-back-btn active-down-effect" onClick={handleDisagree}>I Do Not Agree, Leave Site</button>
        </div>
      </div>
    </Modal>
  );
}