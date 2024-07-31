import React, { useState, useEffect } from 'react';
import './UpcomingEvents.css'; // Ensure you create a CSS file for styling
import axios from 'axios';
import Image from "../../images/head1.jpg";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [memberId, setMemberId] = useState(null);
  const [assignedGuides, setAssignedGuides] = useState([]);
  const [viewGuides, setViewGuides] = useState(false);
  const [joinedEvents, setJoinedEvents] = useState([]);

  useEffect(() => {
    const storedMember = localStorage.getItem('member');
    if (storedMember) {
      const member = JSON.parse(storedMember);
      setMemberId(member.id);
    }

    const fetchEvents = async () => {
      try {
        const response = await fetch('https://localhost:7063/api/Event/getall', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        // Sort events by dateFrom in ascending order
        const sortedEvents = data.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchJoinedEvents = async () => {
      try {
        const response = await fetch(`https://localhost:7063/api/JoinedEvent/member/${memberId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setJoinedEvents(data.map(event => ({
          eventId: event.id,
          joinedEventId: event.joinedEventId // Assuming the backend returns the JoinedEvent ID
        })));
      } catch (error) {
        console.error('Error fetching joined events:', error);
      }
    };

    fetchEvents();
    if (memberId) {
      fetchJoinedEvents();
    }
  }, [memberId]);

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

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setViewGuides(false); // Reset the viewGuides state
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
    setViewGuides(false); // Reset the viewGuides state
  };

  const handleJoinEvent = async (eventId) => {
    try {
      const response = await fetch('https://localhost:7063/api/JoinedEvent/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ memberId, eventId })
      });

      if (response.ok) {
        alert('Successfully joined the event!');
        setJoinedEvents([...joinedEvents, { eventId, joinedEventId: await response.json().id }]); // Update joined events list
        setSelectedEvent(null); // Close the event details after joining
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to join the event.');
      }
    } catch (error) {
      console.error('Error joining event:', error);
      alert('Error joining event. Please try again.');
    }
  };

  const handleLeaveEvent = async (eventId) => {
    const joinedEvent = joinedEvents.find(e => e.eventId === eventId);
    if (!joinedEvent) {
      alert("You're not a member of this event.");
      return;
    }

    try {
      const response = await fetch(`https://localhost:7063/api/JoinedEvent/delete?memberId=${memberId}&eventId=${eventId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        alert('Successfully left the event!');
        setJoinedEvents(joinedEvents.filter(e => e.eventId !== eventId)); // Update joined events list
        setSelectedEvent(null); // Close the event details after leaving
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to leave the event.');
      }
    } catch (error) {
      console.error('Error leaving event:', error);
      alert('Error leaving event. Please try again.');
    }
  };

  const isPastDue = (event) => {
    const currentDate = new Date();
    const eventEndDate = new Date(event.dateTo);
    return eventEndDate < currentDate;
  };

  return (
    <section>
      <div className="upcoming-events-background-container">
        <img src={Image} alt="Background" className="upcoming-events-background-image" />
        <h1>All Events</h1>
      </div>
      <div className="upcoming-events-container">
        <div className="upcoming-events-list">
          {events.map(event => (
            <div className="upcoming-events-card" key={event.id} onClick={() => handleEventClick(event)}>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p><strong>Destination:</strong> {event.destination}</p>
              <p><strong>Date:</strong> {event.dateFrom} to {event.dateTo}</p>
              <p><strong>Cost:</strong> ${event.cost}</p>
              <p><strong>Status:</strong> {event.status}</p>
            </div>
          ))}
        </div>

        {selectedEvent && (
          <div className="upcoming-events-details show">
            <div className="upcoming-events-details-content">
              <h2>{selectedEvent.name}</h2>
              <p><strong>Description:</strong> {selectedEvent.description}</p>
              <p><strong>Destination:</strong> {selectedEvent.destination}</p>
              <p><strong>Date:</strong> {selectedEvent.dateFrom} to {selectedEvent.dateTo}</p>
              <p><strong>Cost:</strong> ${selectedEvent.cost}</p>
              <p><strong>Status:</strong> {selectedEvent.status}</p>
              {isPastDue(selectedEvent) ? (
                <p className="upcoming-events-past-due">Past Due</p>
              ) : (
                <>
                  <button onClick={() => handleJoinEvent(selectedEvent.id)} className="upcoming-events-join-button">Join Event</button>
                  <button onClick={() => handleLeaveEvent(selectedEvent.id)} className="upcoming-events-leave-button">Leave Event</button>
                </>
              )}
              <button onClick={() => { fetchAssignedGuides(selectedEvent.id); setViewGuides(true); }} className="upcoming-events-see-guides-button">See Guides</button>
              <button onClick={handleCloseDetails} className="upcoming-events-close-button">Close</button>
              {viewGuides && (
                <div className="upcoming-events-guide-details">
                  <h3>Assigned Guides:</h3>
                  {assignedGuides.length > 0 ? (
                    assignedGuides.map(guide => (
                      <p key={guide.id}><strong>Name:</strong> {guide.fullName}</p>
                    ))
                  ) : (
                    <p>No guides for this event.</p>
                  )}
                  <button onClick={() => setViewGuides(false)} className="upcoming-events-hide-button">Close Guides</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default UpcomingEvents;
