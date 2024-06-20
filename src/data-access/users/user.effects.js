import { createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { axios } from '../../config/axios';

export const fetchUserEffect = createAsyncThunk('users/fetchUser', async () => {
  const navigate = useNavigate();

  try {
    const { data } = await axios.get('/auth/me');
    return data;
  } catch (error) {
    sessionStorage.removeItem('token');
    navigate('/');
    return null;
    // return { error: error.message };
  }
});
