import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmailOtp.css";
import { useLanguage } from "../context/LanguageContext";
import Header from "./header";


function EmailOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSendOtp = async () => {
    if (!email) {
      alert(t('please_enter_email_alert'));
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        alert(t('otp_sent_alert'));
      } else {
        alert(data.message || t('otp_send_failed_alert'));
      }

    } catch (error) {
      console.error("Error:", error);
      alert(t('server_error_alert'));
    }
  };

  const handleVerify = async () => {
    if (!otp) {
      alert(t('enter_otp_alert'));
      return;
    }

    const res = await fetch("http://localhost:5000/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp })
    });

    const data = await res.json();
    if (res.ok) {
      navigate("/home");
    } else {
      alert(data.message || t('otp_verify_failed_alert'));
    }
  };

  return (
    <>
      <Header />
      <div className="otp-container">
        <div className="card">
          <h2>{t('email_verification')}</h2>

          <input
            type="email"
            placeholder={t('enter_email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />

          <button className="btn send-btn" onClick={handleSendOtp}>
            {t('send_otp')}
          </button>

          {otpSent && (
            <>
              <input
                type="text"
                placeholder={t('enter_otp')}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="input-field"
              />

              <button className="btn verify-btn" onClick={handleVerify}>
                {t('verify')}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default EmailOtp;
