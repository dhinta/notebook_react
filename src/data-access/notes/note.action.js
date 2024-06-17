export const ADD_NOTE = 'NOTE_ADD';
export const DELETE_NOTE = 'NOTE_DELETE';

export const addNote = (note) => ({ type: ADD_NOTE, payload: note });
export const deleteNote = (id) => ({ type: DELETE_NOTE, payload: id });
