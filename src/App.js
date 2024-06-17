import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import { ProtectedRoutes } from './components/routes/protected-routes';
import { StrictlyPublicRoutes } from './components/routes/strictly-public';
import { Dashboard } from './pages/dashboard/dashboard';
import { Home } from './pages/home/home';
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
    ],
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
