import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from '../../common/alert/alert';
import { FormError } from '../../common/form-error/form-error';
import { axios } from '../../config/axios';
import { LoadingState, useCallState } from '../../hooks/callstate';

export function Home() {
  // const notes = useSelector((state) => state.notes);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   async function fetchNotes() {
  //     try {
  //       const { data } = await axios.get('/notes');
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   fetchNotes();
  // }, []);

  // console.log(notes);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginFailMessage, setLoginFailMessage] = useState(null);
  const { isLoading, errorState, setLoadingState, setErrorState } =
    useCallState();

  async function doLogin(email, password) {
    setLoadingState(LoadingState.LOADING);
    try {
      const { data } = await axios.post('/auth/login', {
        email,
        password,
      });
      setLoadingState(LoadingState.LOADED);

      if (!data.success) {
        setLoginFailMessage(data.error);
        return;
      }

      sessionStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (error) {
      setErrorState(error.message);
    }
  }

  return (
    <Formik
      initialValues={{ email: 'relaxed.dhinta@gmail.com', password: '123456' }}
      validate={(values) => {
        const errors = {};
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        if (values.password.length < 6) {
          errors.password = 'Password must be at least 6 characters';
        }
        return errors;
      }}
      onSubmit={(values) => {
        console.log(JSON.stringify(values, null, 2));
        doLogin(values.email, values.password);
      }}
    >
      {() => (
        <Form className="container mx-auto py-4 w-96">
          <div className="space-y-12">
            <div className="pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Login to your account
              </h2>

              {(errorState || loginFailMessage) && (
                <Alert variant="error">{errorState || loginFailMessage}</Alert>
              )}

              <div className="mt-5 grid grid-cols-1 gap-y-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                      <Field
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="off"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        placeholder="janesmith@example.com"
                      />
                    </div>
                  </div>
                  <FormError name="email" component="div" className="mt-1" />
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                      <Field
                        type={!showPassword ? 'password' : 'text'}
                        name="password"
                        id="password"
                        autoComplete="off"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                      />

                      <button
                        type="button"
                        className="text-sm bg-slate-300"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {!showPassword ? (
                          <EyeIcon className="h-5 w-10" />
                        ) : (
                          <EyeSlashIcon className="h-5 w-10" />
                        )}
                      </button>
                    </div>
                  </div>

                  <FormError name="password" component="div" className="mt-1" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
              disabled={isLoading}
            >
              Save
            </button>

            <Link to="/signup" className="text-blue-600">
              No Account? Signup here.
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}
