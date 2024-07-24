import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from "../images/background1.jpg";
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  return (
   
      <div className="welcome-container">
        <img src={BackgroundImage} alt="background" className='background-image' />
        <div className="welcome-content">
          <h1>Welcome to Activity Club!</h1>
          <p>
            Join our community and explore a variety of events, guides, and activities that we offer.
            Whether you're an adventure enthusiast or looking for new experiences, our club has something for everyone.
          </p>
          <div className="login-options">
            <button className="login-button" onClick={() => navigate('/admin-login')}>Admin Login</button>
            <button className="login-button" onClick={() => navigate('/public-login')}>Public Login</button>
          </div>
        </div>
      </div>

  );
};

export default Welcome;
