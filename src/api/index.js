import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});


export const fetchAllTasksAction = async() => {
    return await api.get('/tasks')
}

export const deleteTaskAction = async(taskId) => {
    return await api.delete(`/tasks/${taskId}`)
}

export const updateTaskAction = async(taskId, task) => {
    return await api.put(`/tasks/${taskId}`, task)
}

export const createTaskAction = async(task) => {
    return await api.post('/tasks', task)
}

export const getTaskDetailsAction = async(taskId) => {
    return await api.get(`/tasks/${taskId}`)
}

export const getAllCompletedTasksAction = async() => {
    return await api.get('/tasks/completed')
}

export const createSubTaskAction = async(taskId, subTaskTitle) => {
    return await api.post(`/tasks/${taskId}/subtasks`, subTaskTitle)
}

export const deleteSubTaskAction = async(taskId, subTaskId) => {
    return await api.delete(`/tasks/${taskId}/subtasks/${subTaskId}`)
}

export const updateSubTaskAction = async(taskId, subTaskId, subTask) => {
    return await api.put(`/tasks/${taskId}/subtasks/${subTaskId}`, subTask)
}