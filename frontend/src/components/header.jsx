import React from "react";
import "./header.css";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
// download logo and keep in assets

function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <div className="apsrtc-top-header">

      {/* Left Section */}
      <div className="left-section">
        <img src="/logo.png" alt="APSRTC Logo" className="apsrtc-logo" />

        <div className="title-section">
          <h1 className="telugu-title">
            {t('telugu_title')}
          </h1>
          <p className="english-title">
            {t('english_title')}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <button className="lang-toggle" onClick={toggleLanguage} aria-label="Toggle Language">
          {language === 'en' ? 'తెలుగు' : 'English'}
        </button>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <div className="support-icon">🎧</div>
        <div>
          <p className="support-text">{t('support_text')}</p>
          <h2 className="support-number">0866 2570005</h2>
        </div>
      </div>

    </div>
  );
}

export default Header;