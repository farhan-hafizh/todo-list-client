import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import {
  createSubTaskAction,
  deleteSubTaskAction,
  deleteTaskAction,
  getTaskDetailsAction,
  updateSubTaskAction,
  updateTaskAction,
} from '../../api'; 
import CreateSubtaskForm from './components/CreateSubtaskForm';
import { formatDueDate } from '../../helper/timeHelper';

function TaskDetail() {
  const [task, setTask] = useState(null);
  const { taskId } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTaskDetailsAction(taskId);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [taskId]);

  const [showCreateSubtaskForm, setShowCreateSubtaskForm] = useState(false);

  const handleCreateSubtaskClick = () => {
    setShowCreateSubtaskForm(true);
  };

  const handleMarkComplete = async () => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await updateTaskAction(taskId, updatedTask);
      setTask(updatedTask);
    } catch (error) {
      console.error('Error marking task complete:', error);
    }
  };

 const handleMarkSubtaskComplete = async (subtask) => {
  try {
    const updatedSubtaskData = { completed: !subtask.completed }; 
    await updateSubTaskAction(taskId, subtask.id, updatedSubtaskData);

    const updatedTask = {
      ...task,
      subtasks: task.subtasks.map((st) =>
        st.id === subtask.id
          ? { ...st, ...updatedSubtaskData } 
          : st
      ),
    };
    setTask(updatedTask);
  } catch (error) {
    console.error('Error marking subtask complete:', error);
  }
};

const handleDeleteTask = async () => {
  try {
    if (task.subtasks && task.subtasks.length > 0) {
      for (const subtask of task.subtasks) {
        await deleteSubTaskAction(taskId, subtask.id);
      }
    }

    await deleteTaskAction(taskId);
    navigate('/tasks');
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

const handleDeleteSubtask = async (subtask) => {
  try {
    await deleteSubTaskAction(task.id, subtask.id);

    setTask({
      ...task,
      subtasks: task.subtasks.filter((st) => st.id !== subtask.id),
    });
  } catch (error) {
    console.error('Error deleting subtask:', error);
  }
};


  return (
    <div className="task-detail-container container mx-auto px-4 py-8">
      <Button className="bg-purple-500" onClick={()=> navigate(-1)} text="< Back"/>
      {task ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Title: {task.title}</h2>
          <p className="text-lg mb-4">Description: {task.description}</p>
          <span className={`${task.completed ? 'text-green-500' : 'text-red-500'} font-bold`}>
            {task.completed ? 'Completed' : 'To-Do'}
          </span>
          {task.due_date && (
            <p className="text-gray-600 mb-4">Due Date: {task.due_date} ({formatDueDate(task.due_date)})</p>
          )}
          <Button
            text={task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            onClick={handleMarkComplete}
            className="bg-blue-500"
          />
          <Button text="Create Subtask" onClick={handleCreateSubtaskClick} className="bg-blue-500 mt-4 ml-4" />
          <Button text="Delete Task" onClick={handleDeleteTask} className="bg-red-500 mt-4 ml-4" />


          {/* Display subtasks (optional) */}
          {task.subtasks && task.subtasks.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Subtasks</h3>
              <ul className="list-disc pl-4">
                {task.subtasks.map((subtask) => (
                  <li key={subtask.id} className="text-lg mb-2">
                    {`${subtask.title} | Status: ${subtask.completed ? 'Completed' : 'Incomplete'}`}
                    <Button
                      text={subtask.completed ? 'Mark Incomplete' : 'Mark Complete'}
                      onClick={() => handleMarkSubtaskComplete(subtask)}
                      className="bg-blue-500 mx-4"
                    />
                    <Button
                      text="Delete"
                      onClick={()=>handleDeleteSubtask(subtask)}
                      className="bg-red-500 mx-4"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {showCreateSubtaskForm && (
            <CreateSubtaskForm
              onSubmit={async (subtaskTitle) => {
                try {
                  const response = await createSubTaskAction(taskId, {title: subtaskTitle});
                  const updatedTask = { ...task, subtasks: [...task.subtasks, response.data] };
                  setTask(updatedTask);
                  setShowCreateSubtaskForm(false); 
                } catch (error) {
                  console.error('Error creating subtask:', error);
                }
              }}
            />
          )}
        </>
      ) : (
        <div>Loading task details...</div>
      )}
    </div>
  );
}

export default TaskDetail;
