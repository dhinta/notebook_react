import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { notesReducer } from './data-access/notes';
import userReducer from './data-access/users/user.reducer';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

export default configureStore(
  {
    reducer: {
      notes: notesReducer,
      user: userReducer,
    },
  },
  composedEnhancer,
);
