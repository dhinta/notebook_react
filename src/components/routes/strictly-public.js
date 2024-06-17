import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function StrictlyPublicRoutes() {
  const location = useLocation();
  const token = sessionStorage.getItem('token');
  return token ? (
    <Navigate to="/dashboard" replace state={{ from: location }} />
  ) : (
    <Outlet />
  );
}
