import { createSlice } from '@reduxjs/toolkit';
import { fetchUserEffect } from './auth.effects';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const userReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserEffect.fulfilled, (state, action) => {
        const { user, isAuthenticated } = action.payload;
        state.user = user;
        state.isAuthenticated = isAuthenticated;
      })
      .addCase(fetchUserEffect.rejected, () => initialState);
  },
});

export const { logout } = userReducer.actions;
export default userReducer.reducer;
