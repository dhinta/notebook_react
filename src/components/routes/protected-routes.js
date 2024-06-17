import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function ProtectedRoutes() {
  const location = useLocation();
  const token = sessionStorage.getItem('token');
  return !token ? (
    <Navigate to="/" replace state={{ from: location }} />
  ) : (
    <Outlet />
  );
}
