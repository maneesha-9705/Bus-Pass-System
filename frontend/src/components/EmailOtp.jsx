import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EmailOtp.css";
import { useLanguage } from "../context/LanguageContext";
import Header from "./header";

const CAROUSEL_IMAGES = [
  "/homebg.png"
];

function EmailOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email");
  const [loginRole, setLoginRole] = useState("student"); // student or admin
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigate = useNavigate();
  const { t } = useLanguage();

  const [timeLeft, setTimeLeft] = useState(0);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    let timer;
    if (otpSent && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && otpSent) {
      setIsExpired(true);
    }

    let cooldownTimer;
    if (otpSent && cooldownTime > 0) {
      cooldownTimer = setInterval(() => {
        setCooldownTime((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
      if (cooldownTimer) clearInterval(cooldownTimer);
    };
  }, [otpSent, timeLeft, cooldownTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendOtp = async () => {
    if (!email) {
      alert(t('please_enter_email_alert'));
      return;
    }

    if (loginMethod === 'mobile') {
      alert("Mobile OTP not yet implemented. Please use email.");
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
        setTimeLeft(300); // 5 minutes
        setCooldownTime(0); // 0 means no cooldown initially shown
        setIsExpired(false);
        alert(t('otp_sent_alert'));
      } else {
        alert(data.message || t('otp_send_failed_alert'));
      }

    } catch (error) {
      console.error("Error:", error);
      alert(t('server_error_alert'));
    }
  };

  const handleResendOtp = async () => {
    if (cooldownTime > 0) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await response.json();

      if (response.ok) {
        setTimeLeft(300);
        setCooldownTime(300);
        setIsExpired(false);
        alert("OTP Resent successfully");
      } else {
        alert(data.message || "Failed to resend OTP");
      }

    } catch (err) {
      console.error("Error resending OTP:", err);
      alert(t('server_error_alert'));
    }
  };

  const handleVerify = async () => {
    if (!otp) {
      alert(t('enter_otp_alert'));
      return;
    }

    if (isExpired) {
      alert("OTP Expired");
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
    <div className="login-page-wrapper">
      <Header />



      <div className="otp-container">
        <div className="otp-wrapper">
          {/* Left Panel */}
          <div className="otp-left-panel">
            <div className="otp-branding">
              <h2><img src="/logo.png" alt="Icon" className="branding-icon" /> {t('digital_bus_pass_system')}</h2>
              <p>State Transport Services</p>
            </div>

            <div className="left-hero-card">
              <img
                src={CAROUSEL_IMAGES[currentImageIndex]}
                alt="Bus Pass Virtual"
                className="hero-poster"
              />
              <div className="hero-text">
                <h3>APSRTC Digital Bus Pass Generation</h3>
                <p>Generating the maximum passes efficiently</p>
              </div>
            </div>

          </div>

          {/* Right Panel */}
          <div className="otp-right-panel">
            <h2 className="login-heading">Log in</h2>

            <div className="role-tabs">
              <button
                className={`role-tab ${loginRole === 'student' ? 'active' : ''}`}
                onClick={() => setLoginRole('student')}
                disabled={otpSent}
                style={{ cursor: otpSent ? 'not-allowed' : 'pointer', opacity: otpSent ? 0.7 : 1 }}
              >
                {t('as_user')}
              </button>
              <button
                className={`role-tab ${loginRole === 'admin' ? 'active' : ''}`}
                onClick={() => setLoginRole('admin')}
                disabled={otpSent}
                style={{ cursor: otpSent ? 'not-allowed' : 'pointer', opacity: otpSent ? 0.7 : 1 }}
              >
                {t('as_admin')}
              </button>
            </div>



            <div className="input-group">
              <span className="input-label-text">{loginMethod === 'email' ? t('email') + ' Address' : t('mobile') + ' Number'}</span>
              <div className="input-with-icon">
                <span className="input-icon">✉️</span>
                <input
                  type={loginMethod === 'email' ? "email" : "tel"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder={loginMethod === 'email' ? "example@email.com" : "9876543210"}
                  disabled={otpSent}
                />
              </div>
            </div>

            {otpSent && (
              <div className="input-group mt-3">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="input-label-text">OTP</span>
                  <span style={{ fontSize: '0.85rem', color: isExpired ? 'red' : '#555' }}>
                    {isExpired ? "Expired" : `Valid for: ${formatTime(timeLeft)}`}
                  </span>
                </div>

                <div className="input-with-icon">
                  <span className="input-icon">🔑</span>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="input-field"
                    placeholder="Enter OTP"
                    disabled={isExpired}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <button
                    onClick={handleResendOtp}
                    disabled={cooldownTime > 0}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: cooldownTime > 0 ? '#aaa' : '#0056b3',
                      cursor: cooldownTime > 0 ? 'not-allowed' : 'pointer',
                      fontSize: '0.9rem',
                      textDecoration: 'underline'
                    }}
                  >
                    {cooldownTime > 0 ? `Resend OTP in ${cooldownTime}s` : "Resend OTP"}
                  </button>
                </div>
              </div>
            )}



            {otpSent ? (
              <button className="btn submit-btn" onClick={handleVerify} disabled={isExpired} style={{ opacity: isExpired ? 0.6 : 1 }}>
                {t('verify')}
              </button>
            ) : (
              <button className="btn submit-btn" onClick={handleSendOtp}>
                {t('send_otp')}
              </button>
            )}

            <div className="login-footer">
              <a href="#">{t('problems_logging_in')}</a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailOtp;
