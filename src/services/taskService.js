import api from './api';

export const getTasks = (userId) => {
    return api.get(`/tasks?userId=${userId}`);
};

export const addTask = (taskData) => {
    return api.post('/tasks', taskData);
};

export const updateTask = (taskId, taskData) => {
    return api.patch(`/tasks/${taskId}`, taskData);
};

export const deleteTask = (taskId) => {
    return api.delete(`/tasks/${taskId}`);
}; 