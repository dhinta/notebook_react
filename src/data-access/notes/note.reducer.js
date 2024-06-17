// import { combineReducers } from 'redux';
// import { ADD_NOTE, DELETE_NOTE } from './note.action';

// const addNoteReducer = (state = [], action) => {
//   if (action.type === ADD_NOTE) {
//     return [...state, action.payload];
//   }
// };

// const deleteNoteReducer = (state = [], action) => {
//   if (action.type === DELETE_NOTE) {
//     return state.filter((note) => note.id !== action.payload);
//   }
// };

// export default combineReducers({
//   addNoteReducer,
//   deleteNoteReducer,
// });

import { createSlice } from '@reduxjs/toolkit';

export const notesSlice = createSlice({
  name: 'notes',
  initialState: [],
  reducers: {
    addNote: (state, action) => {
      state.push(action.payload);
    },
    deleteNote: (state, action) => {
      state = state.filter((note) => note.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNote, deleteNote } = notesSlice.actions;

export default notesSlice.reducer;
