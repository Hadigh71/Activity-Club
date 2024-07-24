import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';
import Navbar1 from '../Navbar/Navbar1';
import Footer1 from '../Footer/Footer1';

function Contact() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedMember = localStorage.getItem('member');
    if (storedMember) {
      const member = JSON.parse(storedMember);
      setUsername(member.userName);
      setEmail(member.email);
    }
  }, []);

  async function submit(e) {
    e.preventDefault();

    const templateParams = {
      to_email: 'hadighandour3@gmail.com',
      from_name: e.target.from_name.value,
      from_email: e.target.from_email.value,
      message: e.target.message.value,
    };

    emailjs.send(
      'service_ayyl51h',
      'template_3x0e21d',
      templateParams,
      'IptLCqLDRbLkd0Ij5'
    )
      .then((response) => {
        console.log('Email sent:', response);
        alert("Email sent successfully");
        setMessage('');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert("Error sending email.");
      });
  }

  return (
    <section>
        <div>
            <Navbar1/>
        </div>
      <div className='contact-container'>
        <form onSubmit={submit}>
          <h3>GET IN TOUCH</h3>
          <input
            className="input1"
            type='text'
            name='from_name'
            placeholder='User name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="input2"
            type='text'
            name='from_email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            className="input3"
            name='message'
            rows='4'
            placeholder="How can we help you?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button className="btn" type='submit'>Send Message</button>
        </form>
      </div>
      <Footer1/>
    </section>
  );
}

export default Contact;
