import { axios } from '../config/axios';

export async function getNotes() {
  try {
    const { data } = await axios.get('/notes');
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getNoteByParams(params) {
  const { data } = await axios.get('/notes', { params });
  return data;
}

export async function deleteNote(id) {
  const { data } = await axios.delete('/notes', { data: { id } });
  return data;
}
