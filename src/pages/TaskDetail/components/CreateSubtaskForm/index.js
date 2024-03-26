import React, { useState } from 'react';

function CreateSubtaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(title); 
    setTitle(''); 
  };

  return (
    <form onSubmit={handleSubmit} className="create-subtask-form space-y-2">
      <label htmlFor="subtask-title" className="text-sm font-medium block mb-1">
        Subtask Title:
      </label>
      <input
        type="text"
        id="subtask-title"
        name="subtask-title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <button type="submit" className="btn btn-secondary px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Add Subtask
      </button>
    </form>
  );
}

export default CreateSubtaskForm;
