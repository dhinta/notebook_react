import { createContext, useEffect, useReducer, useState } from 'react';
import { Modal } from '../../common/modal/modal';
import { AddNote } from '../../components/add-note/add-note';
import { ListNotes } from '../../components/list-notes/list-notes';
import { getNoteByParams } from '../../helpers/notes-service';
import { useQueryParams } from '../../hooks/query-params';

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
  const { setQueryParam, deserialize } = useQueryParams();
  const [searchText, setSearchText] = useState(deserialize().search || '');

  async function fetchNotes(query) {
    const data = await getNoteByParams(query);
    dispatch({ type: NoteAction.LIST, payload: data });
  }

  useEffect(() => {
    fetchNotes(deserialize());
  }, [deserialize]);

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      <div className="container mx-auto px-4">
        <div className="mt-2 flex justify-between">
          <h1 className="text-base font-semibold leading-10 text-gray-900 px-4">
            Dashboard
          </h1>

          <div>
            <input
              placeholder="Search..."
              id="search"
              name="search"
              type="text"
              autoComplete="off"
              size={50}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="block flex-1 bg-gray-100 border-2 py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setQueryParam('search', searchText);
                }
              }}
            />
          </div>

          <button
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
            onClick={() => setShowAddNoteModal(true)}
          >
            New Note
          </button>
        </div>

        <ListNotes refreshNotes={fetchNotes} />
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
          refreshNotes={fetchNotes}
        />
      </Modal>
    </NotesContext.Provider>
  );
}
