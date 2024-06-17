import { configureStore } from '@reduxjs/toolkit';
import { notesReducer } from './data-access/notes';

export default configureStore({
  reducer: {
    notes: notesReducer,
  },
});
