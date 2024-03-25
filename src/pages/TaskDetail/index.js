import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Assuming you're using Axios for API calls

function TaskDetail() {
  const [task, setTask] = useState(null);
  const { taskId } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/tasks/${taskId}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
        // Handle errors (e.g., display error message to user)
      }
    };

    fetchTask();
  }, [taskId]); // Dependency array: fetch only when taskId changes

  if (!task) {
    return <div>Loading task details...</div>;
  }

    const handleMarkComplete = async () => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await axios.put(`/api/tasks/${taskId}`, updatedTask);
      setTask(updatedTask);
    } catch (error) {
      console.error('Error marking task complete:', error);
      // Handle errors (e.g., display error message to user)
    }
  };

  return (
    <div className="task-detail-container container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
      <p className="text-lg mb-4">{task.description}</p>
      {task.due_date && (
        <p className="text-gray-600 mb-4">Due Date: {new Date(task.due_date).toLocaleDateString()}</p>
      )}
      <button onClick={handleMarkComplete} className="btn btn-primary">
        {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
      </button>
      {/* Display subtasks (optional) */}
      {task.subtasks && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Subtasks</h3>
          <ul className="list-disc pl-4">
            {task.subtasks.map((subtask) => (
              <li key={subtask.id} className="text-lg mb-2">
                {subtask.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TaskDetail;
