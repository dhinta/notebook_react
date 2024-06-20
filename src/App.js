import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import { ProtectedRoutes } from './components/routes/protected-routes';
import { StrictlyPublicRoutes } from './components/routes/strictly-public';
import { ContactUs } from './pages/contact-us/contact-us';
import { Dashboard } from './pages/dashboard/dashboard';
import { Home } from './pages/home/home';
import { Settings } from './pages/settings/settings';
import { Signout } from './pages/signout/signout';
import { Signup } from './pages/signup/signup';

const router = createBrowserRouter([
  {
    element: <StrictlyPublicRoutes />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/signout',
        element: <Signout />,
      },
    ],
  },
  {
    path: '/contact-us',
    element: <ContactUs />,
  },
  {
    path: '*',
    loader: async () => redirect('/'),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
