import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import EventIcon from '@mui/icons-material/Event';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Profile.css'; // Import the CSS file for styling
import Navbar1 from '../Navbar/Navbar1';
import axios from 'axios';
import Footer1 from '../Footer/Footer1';

const Profile1 = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [showJoinedEvents, setShowJoinedEvents] = useState(false);

  useEffect(() => {
    const storedMember = localStorage.getItem('member');
    if (storedMember) {
      const member = JSON.parse(storedMember);
      setUsername(member.userName);
      fetchJoinedEvents(member.id);
    }
  }, []);

  const fetchJoinedEvents = async (memberId) => {
    try {
      const response = await axios.get(`https://localhost:7063/api/JoinedEvent/member/${memberId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setJoinedEvents(response.data);
    } catch (error) {
      console.error('Error fetching joined events:', error);
    }
  };

  const profileMenu = [
    { id: 1, name: "Home", icon: <HomeIcon /> },
    { id: 2, name: "About us", icon: <InfoIcon /> },
    { id: 3, name: "Contact us", icon: <MailIcon /> },
    { id: 4, name: "Joined Events", icon: <EventIcon /> },
    { id: 5, name: "Logout", icon: <ExitToAppIcon /> }
  ];

  const handleNavigation = (destination) => {
    switch (destination) {
      case 'Home':
        navigate('/public-home');
        break;
      case 'About us':
        navigate('/about1');
        break;
      case 'Contact us':
        navigate('/contact1');
        break;
      case 'Joined Events':
        setShowJoinedEvents(!showJoinedEvents);
        break;
      case 'Logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('member');
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/');
  };

  return (
    <section>
      <div>
        <Navbar1 />
      </div>
      <div className="profile-container">
        <div className="profile-username">
          <AccountCircleIcon style={{ fontSize: '32px', marginRight: '10px', marginTop: '40px', color: '#00ff08' }} />
          <h3 style={{ marginTop: '40px', fontSize: '25px' }}>{username}</h3>
        </div>
        <div className="profile-content">
          <ul className="profile-list">
            {profileMenu.map(item => (
              <React.Fragment key={item.id}>
                <li
                  onClick={() => handleNavigation(item.name)}
                  className="profile-item"
                >
                  <div className="profile-item-icon">
                    {item.icon}
                  </div>
                  <span className="profile-item-text">{item.name}</span>
                </li>
                {item.name === "Joined Events" && showJoinedEvents && (
                  <div className="joined-events-container">
                    <button className="close-button" onClick={() => setShowJoinedEvents(false)}>Hide</button>
                    <h2>Joined Events</h2>
                    {joinedEvents.length > 0 ? (
                      <ul>
                        {joinedEvents.map(event => (
                          <li key={event.id}>{event.name} (From: {event.dateFrom} To: {event.dateTo})</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No joined events found.</p>
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
      <Footer1/>
    </section>
  );
};

export default Profile1;
