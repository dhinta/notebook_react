import { createSlice } from '@reduxjs/toolkit';
import { fetchUserEffect } from './user.effects';

const userReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    logout() {
      return null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUserEffect.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { setUser, logout } = userReducer.actions;
export default userReducer.reducer;
