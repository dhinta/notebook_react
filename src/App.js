import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import { Dashboard } from './pages/dashboard/dashboard';
import { Home } from './pages/home/home';
import { Signup } from './pages/signup/signup';

const router = createBrowserRouter([
  {
    path: '/', // Reverse protect route
    element: <Home />,
  },
  {
    path: '/signup', // Reverse protect route
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
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
