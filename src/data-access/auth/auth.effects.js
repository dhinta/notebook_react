import { createAsyncThunk } from '@reduxjs/toolkit';
import { axios } from '../../config/axios';

export const fetchUserEffect = createAsyncThunk(
  'users/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/auth/me');
      return {
        user: data,
        isAuthenticated: true,
      };
    } catch (error) {
      sessionStorage.removeItem('token');
      return rejectWithValue({});
    }
  },
);
