import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function CreateGoalForm() {
  // State to hold form data
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [priority, setPriority] = useState('');
  const { user } = useAuth();
  
  const token = localStorage.getItem('jwt_token');
  const user_id = user.id;
  // Hook for navigation
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setUser('hello');
    const formData = {
      user_id,
      title,
      description,
      startDate,
      endDate,
      priority,
    };
   
    try {
      const response = await fetch('http://127.0.0.1:8000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Goal created successfully:', data);
        navigate(-1); // Go back to the previous page on success
      } else {
        console.error('Failed to create goal:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle Cancel Button (navigate to previous page)
  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div>
      <h1>Create a New Goal</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter goal title"
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter goal description"
            required
          ></textarea>
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="">Select priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <button type="submit">Create</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default CreateGoalForm;
