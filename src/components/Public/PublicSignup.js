import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../../images/background2.jpeg"; // Adjust the path to your image
import './PublicSign.css';

function PublicSignUp() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [joiningDate, setJoiningDate] = useState('');
  const [mobileNum, setMobileNum] = useState('');
  const [emergencyNum, setEmergencyNum] = useState('');
  const [photo, setPhoto] = useState('');
  const [profession, setProfession] = useState('');
  const [nationality, setNationality] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7063/api/Member/signup", {
        username: username,
        email: email,
        name: name,
        password: password,
        gender: gender,
        dateOfBirth: dateOfBirth,
        joiningDate: joiningDate,
        mobileNum: mobileNum,
        emergencyNum: emergencyNum,
        photo: photo,
        profession: profession,
        nationality: nationality
      });

      if (response.data.success) {
        alert("Member created successfully");
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('member', JSON.stringify(response.data)); // Save member info
        navigate("/public-home", { state: { id: username, name: name } });
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
    <div className='body-container1'>
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
            value={password}
            type="password"
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
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
          <select
            className='select-field'
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <div className='form-group-date'>
            <label className='date-label'>Date of Birth:</label>
            <input
              className='input-field'
              value={dateOfBirth}
              type="date"
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>
          <div className='form-group-date'>
            <label className='date-label'>Joining Date:</label>
            <input
              className='input-field'
              value={joiningDate}
              type="date"
              onChange={(e) => setJoiningDate(e.target.value)}
              required
            />
          </div>
          <input
            className='input-field'
            value={mobileNum}
            type="text"
            placeholder='Mobile Number'
            onChange={(e) => setMobileNum(e.target.value)}
            required
          />
          <input
            className='input-field'
            value={emergencyNum}
            type="text"
            placeholder='Emergency Number'
            onChange={(e) => setEmergencyNum(e.target.value)}
            required
          />
          <input
            className='input-field'
            value={photo}
            type="text"
            placeholder='Photo'
            onChange={(e) => setPhoto(e.target.value)}
            required
          />
          <input
            className='input-field'
            value={profession}
            type="text"
            placeholder='Profession'
            onChange={(e) => setProfession(e.target.value)}
            required
          />
          <input
            className='input-field'
            value={nationality}
            type="text"
            placeholder='Nationality'
            onChange={(e) => setNationality(e.target.value)}
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
