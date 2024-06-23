import { createSelector } from '@reduxjs/toolkit';

const appState = (state) => state;
export const selectUser = createSelector(appState, ({ auth }) => auth.user);
export const selectIsAuthenticated = createSelector(
  appState,
  ({ auth }) => auth.isAuthenticated,
);
