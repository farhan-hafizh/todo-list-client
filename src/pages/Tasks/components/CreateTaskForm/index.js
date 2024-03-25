import React, { useState } from 'react';
import axios from 'axios';

function CreateTaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(''); // Optional: Add state for due date

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      const newTask = {
        title,
        description,
        due_date: formatDueDate(dueDate), // Format due date before sending
      };
      const response = await axios.post('http://127.0.0.1:8000/api/tasks', newTask);
      onSubmit(response.data); // Call the provided onSubmit function with the created task data
      setTitle(''); // Clear form fields after successful submission
      setDescription('');
      setDueDate(''); // Optional: Clear due date state after submission
    } catch (error) {
      console.error('Error creating task:', error);
      // Handle errors (e.g., display error message to user)
    }
  };

  const formatDueDate = (userDueDate) => {
    // If no due date is provided, set default to 24:00:00
    if (!userDueDate) {
      return '2024-03-25 24:00:00'; // Today's date with default time
    }

    // Attempt to parse user-provided due date (assuming format YYYY-MM-DD)
    const parsedDate = new Date(userDueDate);
    if (parsedDate.getTime()) { // Check if valid date object
      // Format date with desired format (no square brackets)
      return parsedDate.toISOString().slice(0, 19).replace('T', ' ');
    } else {
      // Handle invalid user input (e.g., display error message)
      console.error('Invalid due date format:', userDueDate);
      // You can choose to return an empty string or a default value here
      return '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-task-form">
      <h2>Create New Task</h2>
      <div className="form-group">
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description (optional):</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <div className="form-group"> {/* Optional: Due date input */}
        <label htmlFor="due-date">Due Date (optional):</label>
        <input
          type="datetime-local" // Use 'date' for just date selection
          id="due-date"
          name="due_date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Create Task
      </button>
    </form>
  );
}

export default CreateTaskForm;
