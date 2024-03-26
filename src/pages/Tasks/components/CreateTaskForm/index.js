import React, { useState } from 'react';
import { createTaskAction } from '../../../../api';
import Button from '../../../../components/Button';
import { getDefaultDueDate } from '../../../../helper/timeHelper';

function CreateTaskForm({ onSubmit, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(''); 

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      const newTask = {
        title,
        description,
        due_date: formatDueDate(dueDate), 
      };
      const response = await createTaskAction(newTask);
      onSubmit(response.data); 
      setTitle('');
      setDescription('');
      setDueDate(''); 
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const formatDueDate = (userDueDate) => {
  if (!userDueDate) {
    return getDefaultDueDate();
  }
  const parsedDate = new Date(userDueDate);

  if (parsedDate.getTime()) {
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const hours = String(parsedDate.getHours()).padStart(2, '0');
    const minutes = String(parsedDate.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:00`;
  } else {
    console.error('Invalid due date format:', userDueDate);
    return null; 
  }
};


  return (
   <form onSubmit={handleSubmit} className="create-task-form space-y-4">
  <h2>Create New Task</h2>
  <div className="form-group flex items-center">
    <label htmlFor="title" className="w-1/4 text-sm font-medium">Title:</label>
    <input
      type="text"
      id="title"
      name="title"
      value={title}
      onChange={(event) => setTitle(event.target.value)}
      required
      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>
  <div className="form-group">
    <label htmlFor="description" className="text-sm font-medium">Description (optional):</label>
    <textarea
      id="description"
      name="description"
      value={description}
      onChange={(event) => setDescription(event.target.value)}
      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>
  <div className="form-group flex items-center">
    <label htmlFor="due-date" className="w-1/4 text-sm font-medium">Due Date (optional):</label>
    <input
      type="datetime-local"
      id="due-date"
      name="due_date"
      value={dueDate}
      onChange={(event) => setDueDate(event.target.value)}
      className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>

  <button type="submit" className="btn-primary px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
    Create Task
  </button>
  <Button onClick={onClose} text="Cancel" className="bg-red-500 ml-4"/>
</form>

  );
}

export default CreateTaskForm;
