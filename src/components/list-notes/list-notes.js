import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '../../common/alert/alert';
import { Loader, LoaderSize } from '../../common/loader/loader';
import { deleteNote } from '../../helpers/notes-service';
import { LoadingState, useCallState } from '../../hooks/callstate';
import { useQueryParams } from '../../hooks/query-params';
import { NotesContext } from '../../pages/dashboard/dashboard';

export function ListNotes({ refreshNotes }) {
  const navigate = useNavigate();
  const { queryParams, setQueryParam } = useQueryParams();
  const { notes = [] } = useContext(NotesContext);
  const { isLoading, setLoadingState, errorState, setErrorState } =
    useCallState();

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    setLoadingState(LoadingState.LOADING);
    try {
      await deleteNote(id);
      setLoadingState(LoadingState.LOADED);
      refreshNotes();
    } catch (error) {
      setErrorState(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader size={LoaderSize.SMALL} />}
      {errorState && <Alert className="mt-4">{errorState}</Alert>}

      <table className="border-collapse table-auto w-full text-sm mt-8">
        <thead>
          <tr>
            <th
              className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left cursor-pointer"
              onClick={() => {
                if (!queryParams.get('sort')) {
                  setQueryParam('sort', 'title:asc');
                  return;
                }

                const [, value] = queryParams.get('sort').split(':');
                const val = value === 'asc' ? 'title:desc' : 'title:asc';

                setQueryParam('sort', val);
              }}
            >
              Title
            </th>
            <th
              className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left cursor-pointer"
              onClick={() => {
                if (!queryParams.get('sort')) {
                  setQueryParam('sort', 'note:asc');
                  return;
                }

                const [, value] = queryParams.get('sort').split(':');
                const val = value === 'asc' ? 'note:desc' : 'note:asc';

                setQueryParam('sort', val);
              }}
            >
              Description
            </th>
            <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800">
          {notes.map(({ note, title, _id: id, url }) => (
            <tr
              key={id}
              onClick={() => navigate(`/notes/${url}/details`)}
              className="cursor-pointer"
            >
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                {title}
              </td>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                {note}
              </td>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                <button type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>

                <button
                  className="ml-2"
                  onClick={(event) => handleDelete(event, id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
