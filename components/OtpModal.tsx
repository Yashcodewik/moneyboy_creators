"use client";
import { API_RESEND_OTP } from "@/utils/api/APIConstant";
import { apiPost } from "@/utils/endpoints/common";
import { useEffect, useRef, useState } from "react";
import { CgCloseO } from "react-icons/cg";

type OtpModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (otp: string) => void;
  email?: string;
    resendApi: string; 
};

const OTP_LENGTH = 6;
const RESEND_TIME = 60;
const OtpModal = ({ open, onClose, onSubmit, email ,resendApi }: OtpModalProps) => {
  const [timer, setTimer] = useState(RESEND_TIME);
  const [isResending, setIsResending] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    if (!open) return;

    const interval = startTimer();

    return () => clearInterval(interval);
  }, [open]);
  if (!open) return null;

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== OTP_LENGTH) return;
    try {
      setIsVerifying(true);
      await onSubmit(finalOtp);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!canResend || isResending) return;
    try {
      setIsResending(true);
     await apiPost({
    url: resendApi,
    values: { email },
});

      startTimer();
      // restart timer
      setTimer(RESEND_TIME);
      setCanResend(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsResending(false);
    }
  };

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setTimer(RESEND_TIME);
    setCanResend(false);

    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return intervalRef.current;
  };

  return (
    <div className="otp-overlay">
      <div className="otp-modal">
        <button className="otp-close otp-cancel" onClick={onClose}>
          <CgCloseO size={22} color="red" />
        </button>
        <h3 className="otp-title">Verify OTP</h3>
        <p className="otp-subtitle">
          Enter the 6-digit code sent to your email
        </p>
        <div className="otp-boxes">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="otp-box"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              autoFocus={index === 0}
            />
          ))}
        </div>
        <div className="otp-resend">
          {!canResend ? (
            <p className="resend-timer">
              Resend OTP in <strong>{timer}s</strong>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="resend-btn"
            >
              {isResending ? "Sending..." : "Resend OTP"}
            </button>
          )}
        </div>

        <div className="modal_footer">
          <button className="otp-cancel mw-50" onClick={onClose}>
            Cancel
          </button>
          <button
            className="premium-btn mw-50"
            onClick={handleSubmit}
            disabled={isVerifying}
          >
            {isVerifying ? (
              <span className="loader"></span>
            ) : (
              <span>Verify OTP</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
