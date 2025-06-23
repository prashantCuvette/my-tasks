import api from './api';

export const getNotes = (userId) => {
    return api.get(`/notes?userId=${userId}`);
};

export const addNote = (noteData) => {
    return api.post('/notes', noteData);
};

export const updateNote = (noteId, noteData) => {
    return api.patch(`/notes/${noteId}`, noteData);
};

export const deleteNote = (noteId) => {
    return api.delete(`/notes/${noteId}`);
}; 