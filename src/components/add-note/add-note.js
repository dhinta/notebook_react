import { Field, Form, Formik } from 'formik';
import { Alert } from '../../common/alert/alert';
import { FormError } from '../../common/form-error/form-error';
import { Loader, LoaderSize } from '../../common/loader/loader';
import { axios } from '../../config/axios';
import { LoadingState, useCallState } from '../../hooks/callstate';

export function AddNote({ onClose, refreshNotes }) {
  const { isLoading, errorState, setLoadingState, setErrorState } =
    useCallState();
  const handleSubmit = async ({ title, note }) => {
    setLoadingState(LoadingState.LOADING);
    try {
      await axios.post('/notes', { title, note });
      onClose();
      refreshNotes();
    } catch (error) {
      setErrorState(error.response.data.error);
    }
  };
  return isLoading ? (
    <Loader size={LoaderSize.SMALL} />
  ) : (
    <Formik
      initialValues={{ title: '', note: '' }}
      validate={({ title, note }) => {
        const errors = {};

        if (!title) {
          errors.title = 'Required';
        }
        if (!note) {
          errors.note = 'Required';
        }

        return errors;
      }}
      onSubmit={handleSubmit}
    >
      <Form>
        {errorState && <Alert variant="error">{errorState}</Alert>}
        <div className="mt-2 grid grid-cols-1 gap-y-4">
          <div className="sm:col-span-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>

            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                <Field
                  id="title"
                  name="title"
                  type="text"
                  autoComplete="off"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <FormError name="title" component="div" className="mt-1" />
          </div>
          <div className="sm:col-span-4">
            <label
              htmlFor="note"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Note
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                <Field
                  id="note"
                  name="note"
                  as="textarea"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <FormError name="note" component="div" className="mt-1" />
          </div>
        </div>

        <div className="flex items-center mt-4 justify-center gap-x-4">
          <button
            type="button"
            className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </Form>
    </Formik>
  );
}
