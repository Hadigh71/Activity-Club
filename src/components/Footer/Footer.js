import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>About Us</h2>
            <a href='/admin-home'>Get Started</a>
            <a href='/about'>Our Story</a>
            <a href='/about'>Our Vision</a>
            <a href='/about'>Our Mission</a>
            <a href='/'>Terms of Service</a>
          </div>
          <div className='footer-link-items'>
            <h2>Contact Us</h2>
            <a href='/contact'>Contact Us</a>
            <a href='/contact'>Support</a>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Manage</h2>
            <a href='/manage-admins'>Manage Admins</a>
            <a href='/manage-members'>Manage Members</a>
            <a href='/manage-guides'>Manage Guides</a>
            <a href='/manage-events'>Manage Events</a>
            <a href='/manage-lookups'>Manage Lookups</a>
          </div>
          <div className='footer-link-items'>
            <h2>Social Media</h2>
            <a href="https://www.instagram.com/">Instagram</a>
            <a href="https://www.facebook.com/">Facebook</a>
            <a href="https://www.youtube.com/">Youtube</a>
            <a href="https://twitter.com/">Twitter</a>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <a href='/' className='social-logo'>
              Activity Club
            </a>
          </div>
          <small className='website-rights'>Activity Club ©️ 2024</small>
          <div className='social-icons'>
            <a
              className='social-icon-link facebook'
              href='https://www.facebook.com/'
              target='_blank'
              aria-label='Facebook'
              rel="noopener noreferrer"
            >
              <i className='fab fa-facebook-f' />
            </a>
            <a
              className='social-icon-link instagram'
              href='https://www.instagram.com/'
              target='_blank'
              aria-label='Instagram'
              rel="noopener noreferrer"
            >
              <i className='fab fa-instagram' />
            </a>
            <a
              className='social-icon-link youtube'
              href='https://www.youtube.com/'
              target='_blank'
              aria-label='Youtube'
              rel="noopener noreferrer"
            >
              <i className='fab fa-youtube' />
            </a>
            <a
              className='social-icon-link twitter'
              href='https://twitter.com/'
              target='_blank'
              aria-label='Twitter'
              rel="noopener noreferrer"
            >
              <i className='fab fa-twitter' />
            </a>
            <a
              className='social-icon-link linkedin'
              href='https://www.linkedin.com/'
              target='_blank'
              aria-label='LinkedIn'
              rel="noopener noreferrer"
            >
              <i className='fab fa-linkedin' />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
