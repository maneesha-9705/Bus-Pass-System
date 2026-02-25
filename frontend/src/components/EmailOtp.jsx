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

  useEffect(() => {
    // Carousel interval removed as there is only one image
  }, []);

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
              >
                {t('as_user')}
              </button>
              <button
                className={`role-tab ${loginRole === 'admin' ? 'active' : ''}`}
                onClick={() => setLoginRole('admin')}
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
                />
              </div>
            </div>

            {otpSent && (
              <div className="input-group mt-3">
                <span className="input-label-text">OTP</span>
                <div className="input-with-icon">
                  <span className="input-icon">🔑</span>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="input-field"
                    placeholder="Enter OTP"
                  />
                </div>
              </div>
            )}



            {otpSent ? (
              <button className="btn submit-btn" onClick={handleVerify}>
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
