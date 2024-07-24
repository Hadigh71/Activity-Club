import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageAdmins.css'; // Reusing the same CSS file for styling

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [guides, setGuides] = useState([]);
  const [members, setMembers] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    categoryId: '',
    destination: '',
    dateFrom: '',
    dateTo: '',
    cost: '',
    status: '',
  });
  const [editEvent, setEditEvent] = useState(null);
  const [selectedGuideId, setSelectedGuideId] = useState('');
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [assignedGuides, setAssignedGuides] = useState([]);
  const [showAssignedGuides, setShowAssignedGuides] = useState(false);
  const [showJoinedMembers, setShowJoinedMembers] = useState(false);
  const [selectedEventId1, setSelectedEventId1] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://localhost:7063/api/Event/getall', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

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

    fetchEvents();
    fetchGuides();
  }, []);

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7063/api/Event/create', newEvent, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setEvents([...events, response.data]);
      setNewEvent({
        name: '',
        description: '',
        categoryId: '',
        destination: '',
        dateFrom: '',
        dateTo: '',
        cost: '',
        status: '',
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message);
      } else {
        console.error('Error adding event:', error);
      }
    }
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://localhost:7063/api/Event/update/${editEvent.id}`, editEvent, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setEvents(events.map(event => (event.id === editEvent.id ? editEvent : event)));
      setEditEvent(null);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message);
      } else {
        console.error('Error updating event:', error);
      }
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`https://localhost:7063/api/Event/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleAssignGuide = async (eventId) => {
    try {
      await axios.post(`https://localhost:7063/api/ResponsibleFor/assign`, null, {
        params: {
          guideId: selectedGuideId,
          eventId: eventId
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Guide assigned successfully');
      fetchAssignedGuides(eventId);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data.message);
      } else {
        console.error('Error assigning guide:', error);
      }
    }
  };

  const fetchAssignedGuides = async (eventId) => {
    try {
      const response = await axios.get(`https://localhost:7063/api/ResponsibleFor/getByEvent/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setAssignedGuides(response.data);
    } catch (error) {
      console.error('Error fetching assigned guides:', error);
    }
  };

  const fetchJoinedMembers = async (eventId) => {
    try {
      const response = await axios.get(`https://localhost:7063/api/JoinedEvent/getByEvent/${eventId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching joined members:', error);
    }
  };

  const resetForm = () => {
    setNewEvent({
      name: '',
      description: '',
      categoryId: '',
      destination: '',
      dateFrom: '',
      dateTo: '',
      cost: '',
      status: '',
    });
    setEditEvent(null);
  };

  return (
    <div className='manage-admins-container'>
      <h1>Manage Events</h1>
      <button className='reset-button' onClick={resetForm}>Reset</button>
      <form className='user-form' onSubmit={editEvent ? handleUpdateEvent : handleAddEvent}>
        <input
          type='text'
          placeholder='Name'
          value={editEvent ? editEvent.name : newEvent.name}
          onChange={e => editEvent ? setEditEvent({ ...editEvent, name: e.target.value }) : setNewEvent({ ...newEvent, name: e.target.value })}
          required
        />
        <input
          type='text'
          placeholder='Description'
          value={editEvent ? editEvent.description : newEvent.description}
          onChange={e => editEvent ? setEditEvent({ ...editEvent, description: e.target.value }) : setNewEvent({ ...newEvent, description: e.target.value })}
          required
        />
        <input
          type='text'
          placeholder='Category ID'
          value={editEvent ? editEvent.categoryId : newEvent.categoryId}
          onChange={e => editEvent ? setEditEvent({ ...editEvent, categoryId: e.target.value }) : setNewEvent({ ...newEvent, categoryId: e.target.value })}
          required
        />
        <input
          type='text'
          placeholder='Destination'
          value={editEvent ? editEvent.destination : newEvent.destination}
          onChange={e => editEvent ? setEditEvent({ ...editEvent, destination: e.target.value }) : setNewEvent({ ...newEvent, destination: e.target.value })}
          required
        />
        <div className='form-group1'>
          <label style={{ marginRight: '5px' }}>Date From:</label>
          <input
            type='date'
            value={editEvent ? editEvent.dateFrom : newEvent.dateFrom}
            onChange={e => editEvent ? setEditEvent({ ...editEvent, dateFrom: e.target.value }) : setNewEvent({ ...newEvent, dateFrom: e.target.value })}
            required
          />
        </div>
        <div className='form-group2'>
          <label style={{ marginRight: '5px' }}>Date To:</label>
          <input
            type='date'
            value={editEvent ? editEvent.dateTo : newEvent.dateTo}
            onChange={e => editEvent ? setEditEvent({ ...editEvent, dateTo: e.target.value }) : setNewEvent({ ...newEvent, dateTo: e.target.value })}
            required
          />
        </div>
        <input
          type='text'
          placeholder='Cost'
          value={editEvent ? editEvent.cost : newEvent.cost}
          onChange={e => editEvent ? setEditEvent({ ...editEvent, cost: e.target.value }) : setNewEvent({ ...newEvent, cost: e.target.value })}
          required
        />
        <input
          type='text'
          placeholder='Status'
          value={editEvent ? editEvent.status : newEvent.status}
          onChange={e => editEvent ? setEditEvent({ ...editEvent, status: e.target.value }) : setNewEvent({ ...newEvent, status: e.target.value })}
          required
        />
        <button type='submit'>{editEvent ? 'Update Event' : 'Add Event'}</button>
        {editEvent && <button type='button' onClick={() => setEditEvent(null)}>Cancel</button>}
      </form>
      <table className='users-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category ID</th>
            <th>Destination</th>
            <th>Date From</th>
            <th>Date To</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Assign Guide</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.name}</td>
              <td>{event.description}</td>
              <td>{event.categoryId}</td>
              <td>{event.destination}</td>
              <td>{event.dateFrom}</td>
              <td>{event.dateTo}</td>
              <td>{event.cost}</td>
              <td>{event.status}</td>
              <td>
                <select onChange={(e) => setSelectedGuideId(e.target.value)}>
                  <option value="">Select Guide</option>
                  {guides.map(guide => (
                    <option key={guide.id} value={guide.id}>{guide.fullName}</option>
                  ))}
                </select>
                <button onClick={() => {
                  setSelectedEventId(event.id);
                  handleAssignGuide(event.id);
                }} className="assign-guide">Assign</button>
                <button onClick={() => {
                  setSelectedEventId(event.id);
                  fetchAssignedGuides(event.id);
                  setShowAssignedGuides(true);
                }} className="view-guides">View Assigned Guides</button>
                <button onClick={() => {
                  setSelectedEventId1(event.id);
                  fetchJoinedMembers(event.id);
                  setShowJoinedMembers(true);
                }} className="view-members">View Joined Members</button>
              </td>
              <td>
                <button onClick={() => setEditEvent(event)} className='assign-guide'>Edit</button>
                <button onClick={() => handleDeleteEvent(event.id)} className="delete-event">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAssignedGuides && selectedEventId && (
        <div className='assigned-guides-container'>
          <button className='close-button' onClick={() => setShowAssignedGuides(false)}>Hide Assigned Guides</button>
          <h2>Assigned Guides for Event ID: {selectedEventId}</h2>
          <ul>
            {assignedGuides.map(guide => (
              <li key={guide.id}>{guide.fullName}</li>
            ))}
          </ul>
        </div>
      )}
      {showJoinedMembers && selectedEventId1 && (
        <div className='assigned-guides-container'>
          <button className='close-button' onClick={() => setShowJoinedMembers(false)}>Hide Joined Members</button>
          <h2>Joined Members for Event ID: {selectedEventId1}</h2>
          <ul>
            {members.map(member => (
              <li key={member.id}>{member.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ManageEvents;
