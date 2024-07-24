import React from 'react';
import Header2 from './Header2';
import OIP from '../../images/OIP.jpeg';
import swimming from '../../images/swimming.jpeg';
import Head from '../../images/head.webp';
import training from '../../images/training.jpg';
import './About.css';
import Navbar1 from '../Navbar/Navbar1';
import Footer1 from "../Footer/Footer1";
const About = () => {
  return (
    <>
    <Navbar1/>
      <Header2 className="headerimg" title="" image={Head} />
      <section className='slogan'>
        <div className='slogancontainer'>
          <div className='slogancontent'>
            <h2>Empowering Every Step, Every Adventure!</h2>
          </div>
        </div>
      </section>

      <section className="about__story">
        <div className="container about__story-container">
          <div className="about__section-image">
            <img src={OIP} alt="Our Story Image" />
          </div>
          <div className="about__section-content">
            <h1><b>Our Story</b></h1>
            <p>Born from a passion for adventure and community, the Activity Club was founded by a group of friends who wanted to create a space where individuals could come together, explore new activities, and share unforgettable experiences. Whether it's hiking, biking, or a weekend yoga retreat, our club offers a variety of events designed to bring people closer to nature and each other.</p>
            <p>With each event, we aim to foster a sense of belonging and camaraderie, creating lasting memories and promoting a healthy, active lifestyle. From small beginnings, the Activity Club has grown into a vibrant community, constantly expanding our offerings to include something for everyone.</p>
          </div>
        </div>
      </section>
      <section className="about__vision">
        <div className="container about__vision-container">
          <div className="about__section-content">
            <h1><b>Our Vision</b></h1>
            <p>To be the premier destination for adventure enthusiasts of all levels, providing diverse, high-quality activities that inspire, challenge, and connect people. We envision a world where everyone feels encouraged to step out of their comfort zone and embrace the joy of movement and exploration.</p>
          </div>
          <div className="about__section-image">
            <img src={training} alt="Our Vision Image" />
          </div>
        </div>
      </section>

      <section className="about__mission">
        <div className="container about__mission-container">
          <div className="about__section-image">
            <img src={swimming} alt="Our Mission Image" />
          </div>
          <div className="about__section-content">
            <h1><b>Our Mission</b></h1>
            <p>Our mission is to provide a supportive and inclusive environment where people can discover new passions, make meaningful connections, and improve their well-being through engaging and accessible activities. We are committed to promoting the benefits of an active lifestyle and ensuring that everyone, regardless of their background or experience, has the opportunity to participate and thrive.</p>
            <p>We aim to bridge the gap between adventure and accessibility, creating a platform where members can easily find, join, and enjoy a wide range of activities. Together, we celebrate the spirit of adventure and the bonds formed through shared experiences.</p>
          </div>
        </div>
        <Footer1/>

      </section>
    </>
  );
}

export default About;
