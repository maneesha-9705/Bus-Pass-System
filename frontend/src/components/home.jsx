import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './header';
import './home.css';


const Home = () => {
  const navigate = useNavigate();
  const [showForms, setShowForms] = useState(false);

  const handleFormsClick = () => {
    setShowForms(!showForms);
  };

  const handleCitizenClick = () => {
    window.open('/citizen-form', '_blank');
  };

  const handleTraceDetailsClick = () => {
    window.open('/trace-details', '_blank');
  };
  return (
    <div className="home-page-container">
      <div className="top-header-wrapper">
        <Header />
      </div>

      <div className="carousel-container">
        <div className="carousel-track">
          {/* Beautiful Bus & Transport Imagery via Unsplash */}
          <div className="carousel-slide">
            <img src="/homebg.png" alt="Bus 1" />
            <div className="carousel-overlay">
              <h2>Safe & Reliable Journey</h2>
              <p>Experience comfort with every ride.</p>
            </div>
          </div>
          <div className="carousel-slide">
            <img src="/home2.png" alt="Bus 2" />
            <div className="carousel-overlay">
              <h2>Express Bus Services</h2>
              <p>Connecting cities, bringing people together.</p>
            </div>
          </div>
          <div className="carousel-slide">
            <img src="/home1.jpg" alt="Bus 3" />
            <div className="carousel-overlay">
              <h2>Easy Pass Booking</h2>
              <p>Get your passes digitally in seconds.</p>
            </div>
          </div>

        </div>
      </div>

      <div className="home-content">
        <h2 className="welcome-title">Welcome to Digital Bus Pass System</h2>
        <p className="welcome-subtitle">Get your passes easily, safely, and efficiently.</p>

        <div className="action-cards">
          <div className="action-card">
            <div className="icon"><img src="/Student.svg" alt="Student" /></div>
            <h3>Fresh Registration</h3>
            <div className="student-links">
              <span onClick={() => navigate('/above-ssc')} className="card-link">Above SSC</span>
              <span className="separator">&</span>
              <span onClick={() => navigate('/below-ssc')} className="card-link">Below SSC</span>
            </div>
          </div>
          <div className="action-card">
            <div className="icon"><img src="/emp.jpg" alt="Employee" /></div>
            <h3>Employee</h3>
            <p>Government and Non-Government</p>
          </div>
          <div className="action-card" onClick={handleCitizenClick}>
            <div className="icon"><img src="/citizen.jpg" alt="Citizens" /></div>
            <h3>Citizens</h3>
            <p>General citizens passes</p>
          </div>
          <div className="action-card">
            <div className="icon"><img src="/Update.svg" alt="Update Details" /></div>
            <h3>Update Details</h3>
            <p>Modify basic information</p>
          </div>
          <div className="action-card">
            <div className="icon"><img src="/pay.svg" alt="Payment" /></div>
            <h3>Payment</h3>
            <p>Pre & Present payments</p>
          </div>
          <div className="action-card" onClick={handleTraceDetailsClick}>
            <div className="icon"><img src="/trace.webp" alt="Trace Details" /></div>
            <h3>Trace Details</h3>
            <p>Track your pass status</p>
          </div>
          <div className="action-card" onClick={handleFormsClick}>
            <div className="icon"><img src="/dow.svg" alt="Download Forms" /></div>
            <h3>Download Forms</h3>
            {showForms ? (
              <div className="download-links">
                <a href="/belowSSCApplicationForm.pdf" download="Below_SSC_Form.pdf" onClick={(e) => e.stopPropagation()}>Below SSC</a>
                <a href="/aboveSSCApplicationForm.pdf" download="Above_SSC_Form.pdf" onClick={(e) => e.stopPropagation()}>Above SSC</a>
                <a href="/NGOApplicationForm.pdf" download="NGO_Application.pdf" onClick={(e) => e.stopPropagation()}>NGO Application</a>
                <a href="/JournalistForm.pdf" download="Journalist_Form.pdf" onClick={(e) => e.stopPropagation()}>Journalist Form</a>
              </div>
            ) : (
              <p>Click to view and download applications</p>
            )}
          </div>
          <div className="action-card">
            <div className="icon"><img src="/pass.png" alt="My Pass" /></div>
            <h3>My Pass</h3>
            <p>View active passes</p>
          </div>
          <div className="action-card">
            <div className="icon"><img src="/renew.webp" alt="Renewal Pass" /></div>
            <h3>Renewal Pass</h3>
            <p>Below SSC & Above SSC</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="home-footer">
        <div className="footer-content">
          <h4>Digital Bus Pass System</h4>
          <p>&copy; {new Date().getFullYear()} Digital Bus Pass System. All rights reserved.</p>
          <div className="footer-links">
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
            <a href="#privacy">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
export default Home;
