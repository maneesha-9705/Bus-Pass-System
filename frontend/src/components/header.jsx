import React from "react";
import "./header.css";
 // download logo and keep in assets

function Header() {
  return (
    <div className="apsrtc-top-header">
      
      {/* Left Section */}
      <div className="left-section">
        <img src="/logo.png" alt="APSRTC Logo" className="apsrtc-logo" />

        <div className="title-section">
          <h1 className="telugu-title">
            ఆంధ్రప్రదేశ్ రాష్ట్ర రోడ్డు రవాణా సంస్థ
          </h1>
          <p className="english-title">
            Andhra Pradesh State Road Transport Corporation
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="support-icon">🎧</div>
        <div>
          <p className="support-text">(24/7 Customer Support)</p>
          <h2 className="support-number">0866 2570005</h2>
        </div>
      </div>

    </div>
  );
}

export default Header;