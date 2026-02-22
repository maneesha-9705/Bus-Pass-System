import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import "./EmailOtp.css";


function EmailOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
  if (!email) {
    alert("Please enter email");
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
      alert(data.message);
    } else {
      alert(data.message || "Failed to send OTP");
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Server not connected");
  }
};

  const handleVerify = async () => {
  if (!otp) {
    alert("Enter OTP");
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
    alert(data.message || "OTP verification failed");
  }
};

  return (
    <div className="otp-container">
      <div className="card">
        <h2>Email Verification</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />

        <button className="btn send-btn" onClick={handleSendOtp}>
          Send OTP
        </button>

        {otpSent && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input-field"
            />

            <button className="btn verify-btn" onClick={handleVerify}>
              Verify
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default EmailOtp;
