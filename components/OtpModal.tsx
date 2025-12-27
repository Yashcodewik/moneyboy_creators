"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import ShowToast from "./common/ShowToast";
import { useRouter } from "next/navigation";

type OtpModalProps = {
  open: boolean;
  email: string;
  onClose: () => void;
};

const OtpModal = ({ open, email, onClose }: OtpModalProps) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  if (!open) return null;

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        redirect: false,
        email: email,
        otp,
      });

      if (result?.error) {
        ShowToast("Invalid OTP", "error");
        return;
      }
      ShowToast("Registration completed!", "success");
      onClose();

      router.push("/dashboard");
    } catch (error: any) {
      ShowToast(error?.message || "Error verifying OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-overlay">
      <div className="otp-modal">
        <h3>Verify OTP</h3>
        <p>Enter the OTP sent to your email.</p>

        <input
          type="text"
          maxLength={6}
          className="otp-input"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <div className="otp-actions">
          <button
            className="premium-btn mb-10"
            disabled={loading}
            onClick={handleVerifyOtp}
          >
            {loading ? (
              <span className="loader"></span>
            ) : (
              <span>Verify OTP</span>
            )}
          </button>
        </div>
      </div>

      <style>{`
        .otp-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .otp-modal {
          background: #fff;
          padding: 25px;
          border-radius: 10px;
          width: 350px;
          text-align: center;
          box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        }

        .otp-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin-top: 15px;
          text-align: center;
          font-size: 18px;
          letter-spacing: 5px;
        }

        .otp-actions {
          margin-top: 20px;
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        .otp-submit {
          padding: 10px 15px;
          background: #000;
          color: #fff;
          border-radius: 6px;
        }

        .otp-cancel {
          padding: 10px 15px;
          background: #ccc;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};

export default OtpModal;
