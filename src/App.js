import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from "./components/Welcome";
import AdminLogin from "./components/Admin/AdminLogin";
import PublicLogin from "./components/Public/PublicLogin";
import AdminSignup from "./components/Admin/AdminSignup";
import PublicSignup from "./components/Public/PublicSignup";
import AdminHome from './components/Admin/AdminHome';
import ManageAdmins from './components/Admin/ManageAdmins';
import ManageMembers from './components/Admin/ManageMembers';
import ManageGuides from './components/Admin/ManageGuides';
import ManageEvents from './components/Admin/ManageEvents';
import Contact from './components/Navbar_Items/Contact';
import About from './components/Navbar_Items/About';
import Profile from './components/Navbar_Items/Profile';
import PublicHome from './components/Public/PublicHome';
import Contact1 from './components/Navbar_Items/Contact1'; 
import Profile1 from './components/Navbar_Items/Profile1';
import About1 from './components/Navbar_Items/About1';
import ManageLookups from './components/Admin/ManageLookups';
import UpcomingEvents from './components/Public/UpcomingEvents';

import './App.css';
import GuidesList from './components/Public/GuidesList';

function App() {
  return (
    <section>
      <div className='App'>
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/public-login" element={<PublicLogin />} />
            <Route path="/admin-signup" element={<AdminSignup />} />
            <Route path="/public-signup" element={<PublicSignup />} />
            <Route path="/admin-home" element={<AdminHome />} />
            <Route path="/manage-admins" element={<ManageAdmins />} />
            <Route path="/manage-members" element={<ManageMembers />} />
            <Route path="/manage-guides" element={<ManageGuides />} />
            <Route path="/manage-events" element={<ManageEvents />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/public-home" element={<PublicHome />} />
            <Route path="/contact1" element={<Contact1 />} />
            <Route path="/profile1" element={<Profile1 />} />
            <Route path="/about1" element={<About1 />} />
            <Route path="/manage-lookups" element={<ManageLookups />} />
            <Route path="/upcoming-events" element={<UpcomingEvents />} />
            <Route path="/guides-list" element={<GuidesList />} />

          </Routes>
        </Router>
      </div>
    </section>
  );
}

export default App;
