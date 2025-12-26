"use client";
import { useRef, useState } from "react";

type OtpModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (otp: string) => void;
};

const OTP_LENGTH = 6;
const OtpModal = ({ open, onClose, onSubmit }: OtpModalProps) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  if (!open) return null;
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };
  const handleSubmit = () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== OTP_LENGTH) return;
    onSubmit(finalOtp);
  };

  return (
    <div className="otp-overlay">
      <div className="otp-modal">
        <button className="otp-close" onClick={onClose}>×</button>
        <h3 className="otp-title">Verify OTP</h3>
        <p className="otp-subtitle">Enter the 6-digit code sent to your email</p>
        <div className="otp-boxes">
          {otp.map((digit, index) => (
            <input key={index} ref={(el) => (inputsRef.current[index] = el)} type="text" inputMode="numeric" maxLength={1} className="otp-box" value={digit} onChange={(e) => handleChange(e.target.value, index)} onKeyDown={(e) => handleKeyDown(e, index)} autoFocus={index === 0}/>
          ))}
        </div>
        <div className="modal_footer">
          <button className="otp-cancel mw-50" onClick={onClose}>Cancel</button>
          <button className="premium-btn mw-50" onClick={handleSubmit}><span>Verify OTP</span></button>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;