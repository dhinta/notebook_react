import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import userReducer from './data-access/auth/auth.reducer';
import { notesReducer } from './data-access/notes';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

export default configureStore(
  {
    reducer: {
      notes: notesReducer,
      auth: userReducer,
    },
  },
  composedEnhancer,
);
