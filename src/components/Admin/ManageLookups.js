import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageAdmins.css'; // Import the CSS file for styling

const ManageLookups = () => {
  const [lookups, setLookups] = useState([]);
  const [codes, setCodes] = useState([]);
  const [newLookup, setNewLookup] = useState({
    name: '',
    codeId: '',
    order: '',
  });
  const [editLookup, setEditLookup] = useState(null);
  const [newCode, setNewCode] = useState('');
  const [showNewCodeInput, setShowNewCodeInput] = useState(false);

  useEffect(() => {
    const fetchLookups = async () => {
      try {
        const response = await axios.get('https://localhost:7063/api/Lookup/getall', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setLookups(response.data);
      } catch (error) {
        console.error('Error fetching lookups:', error);
      }
    };

    const fetchCodes = async () => {
      try {
        const response = await axios.get('https://localhost:7063/api/Code/getall', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCodes(response.data);
      } catch (error) {
        console.error('Error fetching codes:', error);
      }
    };

    fetchLookups();
    fetchCodes();
  }, []);

  const handleAddLookup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7063/api/Lookup/create', newLookup, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setLookups([...lookups, response.data]);
      setNewLookup({
        name: '',
        codeId: '',
        order: '',
      });
    } catch (error) {
      console.error('Error adding lookup:', error);
    }
  };

  const handleUpdateLookup = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7063/api/Lookup/update/${editLookup.id}`, editLookup, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setLookups(lookups.map(lookup => (lookup.id === editLookup.id ? editLookup : lookup)));
      setEditLookup(null);
    } catch (error) {
      console.error('Error updating lookup:', error);
    }
  };

  const handleDeleteLookup = async (id) => {
    try {
      await axios.delete(`https://localhost:7063/api/Lookup/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setLookups(lookups.filter(lookup => lookup.id !== id));
    } catch (error) {
      console.error('Error deleting lookup:', error);
    }
  };

  const handleAddCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7063/api/Code/create', { lookupType: newCode }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCodes([...codes, response.data]);
      setNewCode('');
      setShowNewCodeInput(false);
    } catch (error) {
      console.error('Error adding code:', error);
    }
  };

  const resetForm = () => {
    setNewLookup({
      name: '',
      codeId: '',
      order: '',
    });
    setEditLookup(null);
  };

  const getLookupType = (codeId) => {
    const code = codes.find(code => code.id === codeId);
    return code ? code.lookupType : 'Unknown';
  };

  return (
    <div className='manage-admins-container'>
      <h1>Manage Lookups</h1>
      <button className='reset-button' onClick={resetForm}>Reset</button>
      <form className='user-form' onSubmit={editLookup ? handleUpdateLookup : handleAddLookup}>
        <input
          type='text'
          placeholder='Name'
          value={editLookup ? editLookup.name : newLookup.name}
          onChange={e => editLookup ? setEditLookup({ ...editLookup, name: e.target.value }) : setNewLookup({ ...newLookup, name: e.target.value })}
          required
        />
        <select
          value={editLookup ? editLookup.codeId : newLookup.codeId}
          onChange={e => {
            if (e.target.value === 'new-code') {
              setShowNewCodeInput(true);
            } else {
              setShowNewCodeInput(false);
              editLookup ? setEditLookup({ ...editLookup, codeId: e.target.value }) : setNewLookup({ ...newLookup, codeId: e.target.value });
            }
          }}
          required
        >
          <option value="">Select Lookup Type</option>
          {codes.map(code => (
            <option key={code.id} value={code.id}>{code.lookupType}</option>
          ))}
          <option value="new-code">Add New Lookup Type</option>
        </select>
        {showNewCodeInput && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <input
              type='text'
              placeholder='New Lookup Type'
              className='NewLookupType'
              value={newCode}
              onChange={e => setNewCode(e.target.value)}
              required
              style={{ width: '60%', marginRight: '10px' }}
            />
            <button className="AddLookupType" onClick={handleAddCode} style={{ width: 'calc(40% - 10px)' }}>Add Lookup Type</button>
          </div>
        )}
        <input
          type='number'
          placeholder='Order'
          value={editLookup ? editLookup.order : newLookup.order}
          onChange={e => editLookup ? setEditLookup({ ...editLookup, order: e.target.value }) : setNewLookup({ ...newLookup, order: e.target.value })}
          required
        />
        <button type='submit'>{editLookup ? 'Update Lookup' : 'Add Lookup'}</button>
        {editLookup && <button type='button' onClick={() => setEditLookup(null)}>Cancel</button>}
      </form>
      <table className='users-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Code</th>
            <th>Order</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lookups.map(lookup => (
            <tr key={lookup.id}>
              <td>{lookup.id}</td>
              <td>{lookup.name}</td>
              <td>{getLookupType(lookup.codeId)}</td> {/* Display lookupType instead of codeId */}
              <td>{lookup.order}</td>
              <td>
                <button onClick={() => setEditLookup(lookup)} className='assign-guide'>Edit</button>
                <button onClick={() => handleDeleteLookup(lookup.id)} className='delete-event'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageLookups;
