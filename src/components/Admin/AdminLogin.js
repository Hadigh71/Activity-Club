import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../../images/background2.jpeg"; // Adjust the path to your image
import './AdminLogin.css';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7063/api/User/authenticate", {
        userName: username,
        password: password,
      });

      if (response.status === 200 && response.data.success) {
        const token = response.data.token;
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(response.data)); // Save user info
        console.log(token);
        navigate("/admin-home", { state: { id: username, name: response.data.name } });
      } else {
        alert("User did not sign up or the password is wrong");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        alert(`Error: ${error.response.data.message || "Wrong details"}`);
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
        <h1 className='header'>Admin Login</h1>
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
            value={password}
            type="password"
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className='login-button' type='submit'>Log In</button>
        </form>
        <p>Don't have an account?</p>
        <a className='link2' href='/admin-signup'>Sign Up Instead</a>
      </div>
    </div>
  );
}

export default AdminLogin;
