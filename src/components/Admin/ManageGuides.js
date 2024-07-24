import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageAdmins.css'; // Reusing the same CSS file for styling

const ManageGuides = () => {
  const [guides, setGuides] = useState([]);
  const [newGuide, setNewGuide] = useState({
    fullName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    joiningDate: '',
    photo: '',
    profession: '',
  });
  const [editGuide, setEditGuide] = useState(null);

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

  const handleAddGuide = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7063/api/Guide/create', newGuide, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setGuides([...guides, response.data]);
      setNewGuide({
        fullName: '',
        email: '',
        password: '',
        dateOfBirth: '',
        joiningDate: '',
        photo: '',
        profession: '',
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message);
      } else {
        console.error('Error adding guide:', error);
      }
    }
  };

  const handleUpdateGuide = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7063/api/Guide/update/${editGuide.id}`, editGuide, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setGuides(guides.map(guide => (guide.id === editGuide.id ? editGuide : guide)));
      setEditGuide(null);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message);
      } else {
        console.error('Error updating guide:', error);
      }
    }
  };

  const handleDeleteGuide = async (id) => {
    try {
      await axios.delete(`https://localhost:7063/api/Guide/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
      });
      setGuides(guides.filter(guide => guide.id !== id));
    } catch (error) {
      console.error('Error deleting guide:', error);
    }
  };

  const resetForm = () => {
    setNewGuide({
      fullName: '',
      email: '',
      password: '',
      dateOfBirth: '',
      joiningDate: '',
      photo: '',
      profession: '',
    });
    setEditGuide(null);
  };

  return (
    <div className='manage-admins-container'>
      <h1>Manage Guides</h1>
      <button className='reset-button' onClick={resetForm}>Reset</button>
      <form className='user-form' onSubmit={editGuide ? handleUpdateGuide : handleAddGuide}>
        <input
          type='text'
          placeholder='Full Name'
          value={editGuide ? editGuide.fullName : newGuide.fullName}
          onChange={e => editGuide ? setEditGuide({ ...editGuide, fullName: e.target.value }) : setNewGuide({ ...newGuide, fullName: e.target.value })}
          required
        />
        <input
          type='email'
          placeholder='Email'
          value={editGuide ? editGuide.email : newGuide.email}
          onChange={e => editGuide ? setEditGuide({ ...editGuide, email: e.target.value }) : setNewGuide({ ...newGuide, email: e.target.value })}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={editGuide ? editGuide.password : newGuide.password}
          onChange={e => editGuide ? setEditGuide({ ...editGuide, password: e.target.value }) : setNewGuide({ ...newGuide, password: e.target.value })}
          required
        />
        <input
          type='text'
          placeholder='Username'
          value={editGuide ? editGuide.username : newGuide.username}
          onChange={e => editGuide ? setEditGuide({ ...editGuide, username: e.target.value }) : setNewGuide({ ...newGuide, username: e.target.value })}
          required
        />
        <div className='form-group'>
          <label style={{marginRight:'5px'}}>Date of Birth:</label>
          <input
            type='date'
            value={editGuide ? editGuide.dateOfBirth : newGuide.dateOfBirth}
            onChange={e => editGuide ? setEditGuide({ ...editGuide, dateOfBirth: e.target.value }) : setNewGuide({ ...newGuide, dateOfBirth: e.target.value })}
            required
          />
        </div>
        <div className='form-group'>
          <label style={{marginRight:'5px'}}>Joining Date:</label>
          <input
            type='date'
            value={editGuide ? editGuide.joiningDate : newGuide.joiningDate}
            onChange={e => editGuide ? setEditGuide({ ...editGuide, joiningDate: e.target.value }) : setNewGuide({ ...newGuide, joiningDate: e.target.value })}
            required
          />
        </div>
        <input
          type='text'
          placeholder='Photo'
          value={editGuide ? editGuide.photo : newGuide.photo}
          onChange={e => editGuide ? setEditGuide({ ...editGuide, photo: e.target.value }) : setNewGuide({ ...newGuide, photo: e.target.value })}
          required
        />
        <input
          type='text'
          placeholder='Profession'
          value={editGuide ? editGuide.profession : newGuide.profession}
          onChange={e => editGuide ? setEditGuide({ ...editGuide, profession: e.target.value }) : setNewGuide({ ...newGuide, profession: e.target.value })}
          required
        />
        <button type='submit'>{editGuide ? 'Update Guide' : 'Add Guide'}</button>
        {editGuide && <button type='button' onClick={() => setEditGuide(null)}>Cancel</button>}
      </form>
      <table className='users-table'>
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
            <th>Actions</th>
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
              <td>
                <button onClick={() => setEditGuide(guide)} className='assign-guide'>Edit</button>
                <button onClick={() => handleDeleteGuide(guide.id)} className='delete-event'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageGuides;
