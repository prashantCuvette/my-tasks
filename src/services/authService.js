import api from './api';

export const login = async (email, password) => {
    // json-server doesn't have a real auth system.
    // We'll get all users and find the one with the matching email and password.
    // In a real app, you'd POST to an /auth/login endpoint.
    const users = await api.get('/users');
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        throw new Error('Invalid credentials');
    }
    // Don't return the password
    const { password: _, ...userToReturn } = user;
    return userToReturn;
};

export const signup = async (userData) => {
    const users = await api.get('/users');
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
        throw new Error('User already exists');
    }
    return api.post('/users', userData);
}; 