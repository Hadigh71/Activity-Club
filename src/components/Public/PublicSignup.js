import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../../images/background2.jpeg"; // Adjust the path to your image
import './../Admin/AdminLogin.css';

function PublicSignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [roleId, setRoleId] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7063/api/Auth/signup", {
        userName: username,
        email: email,
        name: name,
        password: password,
        gender: gender,
        dateOfBirth: dateOfBirth,
        roleId: roleId
      });

      if (response.data.success) {
        alert("User created successfully");
        navigate("/public-home", { state: { id: username } });
      } else {
        alert("Failed to sign up: " + response.data.message);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          alert(`Error: ${error.response.data.message}`);
        } else {
          alert("An error occurred. Please try again.");
        }
      } else if (error.request) {
        console.error("Error request:", error.request);
        alert("No response from server. Please try again later.");
      } else {
        console.error("Error message:", error.message);
        alert("An error occurred. Please try again.");
      }
    }
  }

  return (
    <div className='body-container'>
      <img src={BackgroundImage} alt="background" className='background-image'/>
      <div className='cover'>
        <h1 className='header'>Public Sign Up</h1>
        <form onSubmit={submit}>
          <input
            className='input-field'
            value={username}
            type="text"
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className='input-field'
            value={email}
            type="email"
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className='input-field'
            value={name}
            type="text"
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className='input-field'
            value={password}
            type="password"
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className='input-field'
            value={gender}
            type="text"
            placeholder='Gender'
            onChange={(e) => setGender(e.target.value)}
            required
          />
          <input
            className='input-field'
            value={dateOfBirth}
            type="date"
            placeholder='Date of Birth'
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
          <input
            className='input-field'
            value={roleId}
            type="number"
            placeholder='Role ID'
            onChange={(e) => setRoleId(e.target.value)}
            required
          />
          <button className='login-button' type='submit'>Sign Up</button>
        </form>
        <p>Already have an account?</p>
        <a className='link' href='/public-login'>Login Instead</a>
      </div>
    </div>
  );
}

export default PublicSignUp;
