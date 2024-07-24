import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageAdmins.css'; // Reusing the same CSS file for styling

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    email: '',
    password: '',
    username: '',
    dateOfBirth: '',
    gender: '',
    joiningDate: '',
    mobileNum: '',
    emergencyNum: '',
    photo: '',
    profession: '',
    nationality: '',
  });
  const [editMember, setEditMember] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [viewJoinedEvents, setViewJoinedEvents] = useState(false);


  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('https://localhost:7063/api/Member/getall', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchMembers();
  }, []);

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7063/api/Member/create', newMember, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMembers([...members, response.data]);
      setNewMember({
        email: '',
        password: '',
        username: '',
        dateOfBirth: '',
        gender: '',
        joiningDate: '',
        mobileNum: '',
        emergencyNum: '',
        photo: '',
        profession: '',
        nationality: '',
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message);
      } else {
        console.error('Error adding member:', error);
      }
    }
  };

  const handleUpdateMember = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7063/api/Member/update/${editMember.id}`, editMember, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMembers(members.map(member => (member.id === editMember.id ? editMember : member)));
      setEditMember(null);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message);
      } else {
        console.error('Error updating member:', error);
      }
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      await axios.delete(`https://localhost:7063/api/Member/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMembers(members.filter(member => member.id !== id));
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const handleViewJoinedEvents = async (memberId) => {
    try {
      const response = await axios.get(`https://localhost:7063/api/JoinedEvent/member/${memberId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setJoinedEvents(response.data);
      setSelectedMember(memberId);
    } catch (error) {
      console.error('Error fetching joined events:', error);
      setJoinedEvents([]);
      setSelectedMember(memberId);
    }
  };

  const resetForm = () => {
    setNewMember({
      email: '',
      password: '',
      username: '',
      dateOfBirth: '',
      gender: '',
      joiningDate: '',
      mobileNum: '',
      emergencyNum: '',
      photo: '',
      profession: '',
      nationality: '',
    });
    setEditMember(null);
  };

  return (
    <div className='manage-members-container'>
      <h1>Manage Members</h1>
      <button className='reset-button' onClick={resetForm}>Reset</button>
      <form className='user-form' onSubmit={editMember ? handleUpdateMember : handleAddMember}>
        <input
          type='email'
          placeholder='Email'
          value={editMember ? editMember.email : newMember.email}
          onChange={e => editMember ? setEditMember({ ...editMember, email: e.target.value }) : setNewMember({ ...newMember, email: e.target.value })}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={editMember ? editMember.password : newMember.password}
          onChange={e => editMember ? setEditMember({ ...editMember, password: e.target.value }) : setNewMember({ ...newMember, password: e.target.value })}
          required
        />
        <input
          type='text'
          placeholder='Username'
          value={editMember ? editMember.username : newMember.username}
          onChange={e => editMember ? setEditMember({ ...editMember, username: e.target.value }) : setNewMember({ ...newMember, username: e.target.value })}
          required
        />
        <div className='form-group3' >
          <label style={{ marginRight: '5px' }}>Date of Birth:</label>
          <input
            type='date'
            value={editMember ? editMember.dateOfBirth : newMember.dateOfBirth}
            onChange={e => editMember ? setEditMember({ ...editMember, dateOfBirth: e.target.value }) : setNewMember({ ...newMember, dateOfBirth: e.target.value })}
            required
          />
        </div>
        <select
          value={editMember ? editMember.gender : newMember.gender}
          onChange={e => editMember ? setEditMember({ ...editMember, gender: e.target.value }) : setNewMember({ ...newMember, gender: e.target.value })}
          required
        >
          <option value='' disabled>Select Gender</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
        </select>
        <div className='form-group3'>
          <label style={{ marginRight: '5px' }}>Joining Date:</label>
          <input
            type='date'
            value={editMember ? editMember.joiningDate : newMember.joiningDate}
            onChange={e => editMember ? setEditMember({ ...editMember, joiningDate: e.target.value }) : setNewMember({ ...newMember, joiningDate: e.target.value })}
            required
          />
        </div>
        <input
          type='text'
          placeholder='Mobile Number'
          value={editMember ? editMember.mobileNum : newMember.mobileNum}
          onChange={e => editMember ? setEditMember({ ...editMember, mobileNum: e.target.value }) : setNewMember({ ...newMember, mobileNum: e.target.value })}
          required
        />
        <input
          type='text'
          placeholder='Emergency Number'
          value={editMember ? editMember.emergencyNum : newMember.emergencyNum}
          onChange={e => editMember ? setEditMember({ ...editMember, emergencyNum: e.target.value }) : setNewMember({ ...newMember, emergencyNum: e.target.value })}
          required
        />
        <input
          type='text'
          placeholder='Photo'
          value={editMember ? editMember.photo : newMember.photo}
          onChange={e => editMember ? setEditMember({ ...editMember, photo: e.target.value }) : setNewMember({ ...newMember, photo: e.target.value })}
          required
        />
        <input
          type='text'
          placeholder='Profession'
          value={editMember ? editMember.profession : newMember.profession}
          onChange={e => editMember ? setEditMember({ ...editMember, profession: e.target.value }) : setNewMember({ ...newMember, profession: e.target.value })}
          required
        />
        <input
          type='text'
          placeholder='Nationality'
          value={editMember ? editMember.nationality : newMember.nationality}
          onChange={e => editMember ? setEditMember({ ...editMember, nationality: e.target.value }) : setNewMember({ ...newMember, nationality: e.target.value })}
          required
        />
        <button type='submit'>{editMember ? 'Update Member' : 'Add Member'}</button>
        {editMember && <button type='button' onClick={() => setEditMember(null)}>Cancel</button>}
      </form>
      <table className='users-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Password</th>
            <th>Username</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Joining Date</th>
            <th>Mobile Number</th>
            <th>Emergency Number</th>
            <th>Photo</th>
            <th>Profession</th>
            <th>Nationality</th>
            <th>Joined Events</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.email}</td>
              <td>{member.password}</td>
              <td>{member.username}</td>
              <td>{member.dateOfBirth}</td>
              <td>{member.gender}</td>
              <td>{member.joiningDate}</td>
              <td>{member.mobileNum}</td>
              <td>{member.emergencyNum}</td>
              <td>{member.photo}</td>
              <td>{member.profession}</td>
              <td>{member.nationality}</td>
              <td>                
                <button onClick={() => { handleViewJoinedEvents(member.id); setViewJoinedEvents(true) }} className='view-members'>View Joined Events</button>
              </td>
              <td>
                <button onClick={() => setEditMember(member)} className='assign-guide'>Edit</button>
                <button onClick={() => handleDeleteMember(member.id)} className='delete-event'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewJoinedEvents && selectedMember && (
        <div className='assigned-guides-container'>
          <button className='close-button' onClick={() => setViewJoinedEvents(false)}>Hide Joined Events</button>
          <h2>Joined Events for Member ID: {selectedMember}</h2>
          {joinedEvents.length > 0 ? (
            <ul>
              {joinedEvents.map(event => (
                <li key={event.id}>{event.name} (From: {event.dateFrom} To: {event.dateTo})</li>
              ))}
            </ul>
          ) : (
            <p>No joined events found for this member.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ManageMembers;
