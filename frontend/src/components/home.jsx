import React from 'react'
import Header from './header';
import './home.css';

const Home = () => {
  return (
    <div className="home-page-container">
      <div className="top-header-wrapper">
        <Header />
      </div>

      <div className="carousel-container">
        <div className="carousel-track">
          {/* Beautiful Bus & Transport Imagery via Unsplash */}
          <div className="carousel-slide">
            <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop" alt="Bus 1" />
            <div className="carousel-overlay">
              <h2>Safe & Reliable Journey</h2>
              <p>Experience comfort with every ride.</p>
            </div>
          </div>
          <div className="carousel-slide">
            <img src="https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?q=80&w=1200&auto=format&fit=crop" alt="Bus 2" />
            <div className="carousel-overlay">
              <h2>Express Bus Services</h2>
              <p>Connecting cities, bringing people together.</p>
            </div>
          </div>
          <div className="carousel-slide">
            <img src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1200&auto=format&fit=crop" alt="Bus 3" />
            <div className="carousel-overlay">
              <h2>Easy Pass Booking</h2>
              <p>Get your passes digitally in seconds.</p>
            </div>
          </div>
          {/* Duplicate the first slide for seamless animation looping */}
          <div className="carousel-slide">
            <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop" alt="Bus 1" />
            <div className="carousel-overlay">
              <h2>Safe & Reliable Journey</h2>
              <p>Experience comfort with every ride.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="home-content">
        <h2 className="welcome-title">Welcome to Bus Pass System</h2>
        <p className="welcome-subtitle">Get your passes easily, safely, and efficiently.</p>

        <div className="action-cards">
          <div className="action-card">
            <div className="icon">🎫</div>
            <h3>Book a Pass</h3>
            <p>Apply for a new student, general, or route-specific bus pass.</p>
          </div>
          <div className="action-card">
            <div className="icon">🔄</div>
            <h3>Renew Pass</h3>
            <p>Quickly renew your existing passes before they expire.</p>
          </div>
          <div className="action-card">
            <div className="icon">🚌</div>
            <h3>View Routes</h3>
            <p>Check the latest schedules, timings, and routes.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
