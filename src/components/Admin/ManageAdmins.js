import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageAdmins.css'; // Ensure you have this CSS file for styling

const ManageAdmins = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ userName: '', name: '', email: '', password: '', dateOfBirth: '', gender: '', roleId: 1 });
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://localhost:7063/api/User/getall', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7063/api/User/create', newUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers([...users, response.data]);
      setNewUser({ userName: '', name: '', email: '', password: '', dateOfBirth: '', gender: '', roleId: 1 });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message);
      } else {
        console.error('Error adding user:', error);
      }
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7063/api/User/update/${editUser.id}`, editUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers(users.map(user => (user.id === editUser.id ? editUser : user)));
      setEditUser(null);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message);
      } else {
        console.error('Error updating user:', error);
      }
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://localhost:7063/api/User/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const resetForm = () => {
    setNewUser({ userName: '', name: '', email: '', password: '', dateOfBirth: '', gender: '', roleId: 1 });
    setEditUser(null);
  };

  const admins = users.filter(user => user.roleId === 1);

  return (
    <div className='manage-admins-container'>
      <h1>Manage Admins</h1>
      <button className='reset-button' onClick={resetForm}>Reset</button>
      <form className='user-form' onSubmit={editUser ? handleUpdateUser : handleAddUser}>
        <input
          type='text'
          placeholder='Username'
          value={editUser ? editUser.userName : newUser.userName}
          onChange={e => editUser ? setEditUser({ ...editUser, userName: e.target.value }) : setNewUser({ ...newUser, userName: e.target.value })}
          required
        />
        <input
          type='text'
          placeholder='Name'
          value={editUser ? editUser.name : newUser.name}
          onChange={e => editUser ? setEditUser({ ...editUser, name: e.target.value }) : setNewUser({ ...newUser, name: e.target.value })}
          required
        />
        <input
          type='email'
          placeholder='Email'
          value={editUser ? editUser.email : newUser.email}
          onChange={e => editUser ? setEditUser({ ...editUser, email: e.target.value }) : setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={editUser ? editUser.password : newUser.password}
          onChange={e => editUser ? setEditUser({ ...editUser, password: e.target.value }) : setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <div className='form-group'>
          <label style={{marginRight:'5px'}}>Date of Birth:</label>
          <input
            type='date'
            value={editUser ? editUser.dateOfBirth : newUser.dateOfBirth}
            onChange={e => editUser ? setEditUser({ ...editUser, dateOfBirth: e.target.value }) : setNewUser({ ...newUser, dateOfBirth: e.target.value })}
            required
          />
          </div>
        <select
          value={editUser ? editUser.gender : newUser.gender}
          onChange={e => editUser ? setEditUser({ ...editUser, gender: e.target.value }) : setNewUser({ ...newUser, gender: e.target.value })}
          required
        >
          <option value='' disabled>Select Gender</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
        </select>
        <select
          value={editUser ? editUser.roleId : newUser.roleId}
          onChange={e => editUser ? setEditUser({ ...editUser, roleId: e.target.value }) : setNewUser({ ...newUser, roleId: e.target.value })}
          required
        >
          <option value='' disabled>Select Role</option>
          <option value={1}>Admin</option>
          <option value={2}>Member</option>
          <option value={4}>Guide</option>
        </select>
        <button type='submit'>{editUser ? 'Update User' : 'Add User'}</button>
        {editUser && <button type='button' onClick={() => setEditUser(null)}>Cancel</button>}
      </form>
      <table className='users-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>Date Of Birth</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Role ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.name}</td>
              <td>{admin.userName}</td>
              <td>{admin.password}</td>
              <td>{admin.dateOfBirth}</td>
              <td>{admin.gender}</td>
              <td>{admin.email}</td>
              <td>{admin.roleId}</td>
              <td>
                <button onClick={() => setEditUser(admin)}className='assign-guide'>Edit</button>
                <button onClick={() => handleDeleteUser(admin.id)} className='delete-event'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageAdmins;
