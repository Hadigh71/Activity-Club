import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Importing AccountCircleIcon for user icon
import './Profile.css'; // Import the CSS file for styling
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.userName);
    }
  }, []);

  const profileMenu = [
    { id: 1, name: "Home", icon: <HomeIcon /> },
    { id: 2, name: "About us", icon: <InfoIcon /> },
    { id: 3, name: "Contact us", icon: <MailIcon /> },
    { id: 4, name: "Logout", icon: <ExitToAppIcon /> }
  ];

  const handleNavigation = (destination) => {
    switch (destination) {
      case 'Home':
        navigate('/admin-home');
        break;
      case 'About us':
        navigate('/about');
        break;
      case 'Contact us':
        navigate('/contact');
        break;
      case 'Logout':
        handleLogout(navigate);
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/');
  };

  return (
    <section>
      <div>
        <Navbar />
      </div>
      <div className="profile-container">
        <div className="profile-username">
          <AccountCircleIcon style={{ fontSize: '32px', marginRight: '10px', marginTop:'40px' , color:'#00ff08'}} />
          <h3 style={{marginTop:'40px', fontSize:'25px'}}>{username}</h3>
        </div>
        <div className="profile-content">
          <ul className="profile-list">
            {profileMenu.map(item => (
              <li
                key={item.id}
                onClick={() => handleNavigation(item.name)}
                className="profile-item"
              >
                <div className="profile-item-icon">
                  {item.icon}
                </div>
                <span className="profile-item-text">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer/>
    </section>
  );
};

export default Profile;
