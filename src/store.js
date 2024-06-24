import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import userReducer from './data-access/auth/auth.reducer';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

export default configureStore(
  {
    reducer: {
      auth: userReducer,
    },
  },
  composedEnhancer,
);
