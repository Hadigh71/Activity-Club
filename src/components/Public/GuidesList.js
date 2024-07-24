import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GuidesList.css'; // Separate CSS file for GuidesList styling
import Guides from "../../images/guides.jpg";

const GuidesList = () => {
  const [guides, setGuides] = useState([]);
  
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await axios.get('https://localhost:7063/api/Guide/getall', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setGuides(response.data);
      } catch (error) {
        console.error('Error fetching guides:', error);
      }
    };

    fetchGuides();
  }, []);

  return (
    <section className='guides-section'>
      <div className='guides-background-image'>
        <img src={Guides} alt="Guides Background" />
      </div>
      <div className='guides-container'>
        <h1>Guides List</h1>
        <table className='guides-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Username</th>
              <th>Date of Birth</th>
              <th>Joining Date</th>
              <th>Photo</th>
              <th>Profession</th>
            </tr>
          </thead>
          <tbody>
            {guides.map(guide => (
              <tr key={guide.id}>
                <td>{guide.id}</td>
                <td>{guide.fullName}</td>
                <td>{guide.email}</td>
                <td>{guide.password}</td>
                <td>{guide.username}</td>
                <td>{guide.dateOfBirth}</td>
                <td>{guide.joiningDate}</td>
                <td>{guide.photo}</td>
                <td>{guide.profession}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default GuidesList;
