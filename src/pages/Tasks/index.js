import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Assuming you're using Axios for API calls
import Button from '../../components/Button';
import CreateTaskForm from './components/CreateTaskForm';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        // Handle errors (e.g., display error message to user)
      }
    };

    fetchTasks();
  }, []); // Empty dependency array: fetch only on initial render

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      // Handle errors (e.g., display error message to user)
    }
  };

  return (
    <div className="tasks-container container mx-auto px-4 py-8">
      {isCreatingTask ? (
        <CreateTaskForm
          onSubmit={(newTask) => {
            setIsCreatingTask(false);
            setTasks([...tasks, newTask]);
          }}
        />
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-8">Your Tasks</h1>
          <ul className="list-none">
            {tasks.map((task) => (
              <li key={task.id} className="flex items-center justify-between mb-4 bg-gray-100 p-4 rounded-md shadow-sm">
                <Link to={`/tasks/${task.id}`} className="text-lg font-medium">
                  {task.title}
                </Link>
                <span className={`${task.completed ? 'text-green-500' : 'text-red-500'} font-bold`}>
                  {task.completed ? 'Completed' : 'To-Do'}
                </span>
                <Button text="Delete" onClick={() => handleDeleteTask(task.id)} className="bg-red-600" />
              </li>
            ))}
          </ul>
          <Button onClick={() => setIsCreatingTask(true)} className="bg-blue-500" text="Create New Task" />
        </>
      )}
    </div>
  );
}

export default Tasks;
