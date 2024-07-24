import React, { useState, useEffect } from 'react';
import Navbar1 from '../Navbar/Navbar1';
import BackgroundImage from '../../images/background2.jpeg';
import './PublicHome.css';
import Footer1 from '../Footer/Footer1';

const PublicHome = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    const storedMember = localStorage.getItem('member');
    if (storedMember) {
      const member = JSON.parse(storedMember);
      setName(member.name);
    }
  }, []);

  const navigateTo = (path) => {
    window.location.href = path;
  }

  return (
    <section>
    <Navbar1 />

    <div className="public-home-wrapper">
      <div className="content-wrapper">
        <img src={BackgroundImage} alt="Background" className="background-image" />
        <div className="content">
          <h1>Hello, {name}!</h1>
          <p>Welcome to the Activity Club, where we empower every step and every adventure! Join us to explore new activities and share unforgettable experiences.</p>
          <button className="upcoming-events-button" onClick={() => navigateTo('/upcoming-events')}>
            View All Events
          </button>
          <button className="upcoming-events-button" onClick={() => navigateTo('/guides-list')}>
            View All Guides
          </button>
        </div>
      </div>
      <Footer1 />
    </div>
    </section>
  );
}

export default PublicHome;
