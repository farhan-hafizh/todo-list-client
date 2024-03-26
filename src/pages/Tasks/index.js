import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import CreateTaskForm from './components/CreateTaskForm';
import { deleteTaskAction, fetchAllTasksAction } from '../../api'; 
import { formatDueDate } from '../../helper/timeHelper';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetchAllTasksAction();
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []); 

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTaskAction(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
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
          onClose={() => setIsCreatingTask(false)}
        />
      ) : (
        <>
          {/* Task List with Column Titles and Navigation */}
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-medium">Title</th>
                <th className="px-4 py-2 text-left font-medium">Status</th>
                <th className="px-4 py-2 text-left font-medium">Due Date</th>
                <th className="px-4 py-2 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                    <tr onClick={()=> navigate(`/tasks/${task.id}`)} className="bg-white border-b hover:bg-gray-100 cursor-pointer">
                      <td className="px-4 py-2">{task.title}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`${task.completed ? 'text-green-500' : 'text-red-500'} font-bold`}
                        >
                          {task.completed ? 'Completed' : 'To-Do'}
                        </span>
                      </td>
                      <td className="px-4 py-2">{task.due_date && formatDueDate(task.due_date)}</td>
                      <td className="px-4 py-2 text-right">
                        <Button text="Delete" 
                          onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTask(task.id)
                        }} className="bg-red-600" />
                      </td>
                    </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan={4}>No tasks found.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Button to Create New Task */}
          <div className="mt-4 text-right">
            <Button onClick={() => setIsCreatingTask(true)} className="bg-blue-500" text="Create New Task" />
          </div>
        </>
      )}
    </div>
  );
}

export default Tasks;
