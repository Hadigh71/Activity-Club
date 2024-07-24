import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import './Navbar.css'

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' >
            Activity Club
          </Link>
          <div className='menu-icon' onClick={handleClick}>
          <IoMenu />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
              <Link to='/admin-home' className='nav-links' >
                Home 
              </Link>
              </li>
            <li className='nav-item'>
              <Link to='/about' className='nav-links' >
                About us 
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/contact'
                className='nav-links'
              >
                Contact us
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/profile'
                className='nav-links'
              >
                Profile
              </Link>
            </li>

            


          </ul>
          
          
        </div>
      </nav>
    </>
  );
}

export default Navbar;