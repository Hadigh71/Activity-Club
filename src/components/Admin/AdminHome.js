import React, { useState, useEffect } from 'react';
import './AdminHome.css'; // Ensure you have this CSS file for styling
import Navbar from '../Navbar/Navbar';
import BackgroundImage from '../../images/tennis.jpg'; // Import the background image
import Footer from '../Footer/Footer';

const AdminHome = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setName(user.name);
    }
  }, []);

  const navigateTo = (path) => {
    window.location.href = path;
  }

  return (
    <section>
      <Navbar />
      <div className="admin-home-wrapper">
        <img src={BackgroundImage} alt="Background" className="background-image" />
        <div className='admin-home-container'>
          <h1>Hello, {name}!</h1>
          <div className='admin-actions'>
            <button onClick={() => navigateTo('/manage-admins')}>
              <i className="fa fa-user-shield"></i> Manage Admins
            </button>
            <button onClick={() => navigateTo('/manage-members')}>
              <i className="fa fa-users"></i> Manage Members
            </button>
            <button onClick={() => navigateTo('/manage-guides')}>
              <i className="fa fa-map-signs"></i> Manage Guides
            </button>
            <button onClick={() => navigateTo('/manage-events')}>
              <i className="fa fa-calendar-alt"></i> Manage Events
            </button>
            <button onClick={() => navigateTo('/manage-lookups')}>
              <i className="fa fa-cogs"></i> Manage Lookups
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default AdminHome;
