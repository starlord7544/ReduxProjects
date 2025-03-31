import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:6969/api/v1',
});

export default {
    login: (username, password) => api.post('users/login', { username, password }),
    register: (username, password) => api.post('users/register', { username, password }),

    getTasks: (userId) => api.get(`/tasks/getUserTasks?userId=${userId}`),
    createTask: (taskData) => api.post('/tasks/create', taskData),
    updateTask: (taskId, updates) => api.put(`/tasks/update/${taskId}`, updates),
    deleteTask: (taskId) => api.delete(`/tasks/delete/${taskId}`),
    moveTask: (taskId, newCategory) => api.put(`/tasks/move/${taskId}/move`, { newCategory }),
    assignUsers: (taskId, userIds) => api.put(`/tasks/assignUsers/${taskId}/assign`, { userIds }),

    getAllUsers: () => api.get('/users')
}