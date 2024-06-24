import { createContext, useEffect, useReducer, useState } from 'react';
import { Modal } from '../../common/modal/modal';
import { AddNote } from '../../components/add-note/add-note';
import { ListNotes } from '../../components/list-notes/list-notes';
import { axios } from '../../config/axios';
import { useSharedWorker } from '../../hooks/shared-worker';

export const NoteAction = {
  LIST: 'list',
  ADD: 'add',
  UPDATE: 'update',
  DELETE: 'delete',
};

function reducer(state = [], action) {
  switch (action.type) {
    case NoteAction.LIST:
      return [...action.payload];
    default:
      return state;
  }
}

export const NotesContext = createContext({});

export function Dashboard() {
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [notes, dispatch] = useReducer(reducer, []);
  const { worker } = useSharedWorker(fetchNotes);

  async function fetchNotes() {
    try {
      const { data } = await axios.get('/notes');
      dispatch({ type: NoteAction.LIST, payload: data });
    } catch (error) {
      console.error(error);
      return dispatch({ type: NoteAction.LIST, payload: [] });
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      <div className="container mx-auto px-4">
        <div className="mt-2 flex justify-between">
          <h1 className="text-base font-semibold leading-10 text-gray-900 px-4">
            Dashboard
          </h1>
          <button
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
            onClick={() => setShowAddNoteModal(true)}
          >
            New Note
          </button>
        </div>

        <ListNotes />
      </div>

      <Modal
        title="Add Note"
        open={showAddNoteModal}
        onClose={() => {
          setShowAddNoteModal(false);
        }}
      >
        <AddNote
          onClose={() => {
            setShowAddNoteModal(false);
          }}
          refreshNotes={() => {
            worker.port.postMessage({
              type: 'refresh-notes',
            });
          }}
        />
      </Modal>
    </NotesContext.Provider>
  );
}
