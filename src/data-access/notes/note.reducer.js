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
