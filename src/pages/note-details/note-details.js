import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../common/loader/loader';
import { getNoteByParams } from '../../helpers/notes-service';
import { LoadingState, useCallState } from '../../hooks/callstate';

export function NoteDetails() {
  const [note, setNote] = useState(null);
  const { isLoading, setLoadingState, setErrorState } = useCallState();
  const params = useParams();

  const fetchNote = useCallback(async () => {
    setLoadingState(LoadingState.LOADING);
    try {
      const data = await getNoteByParams(params);
      setNote(data[0]);
      setLoadingState(LoadingState.LOADED);
    } catch (error) {
      setErrorState(error);
    }
  }, [params]);

  useEffect(() => {
    fetchNote();
  }, [fetchNote]);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <h1>Note Details</h1>

      <h2>{note?.title}</h2>
      <h2>{note?.note}</h2>
    </div>
  );
}
