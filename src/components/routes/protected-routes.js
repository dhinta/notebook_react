import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { fetchUserEffect } from '../../data-access/users/user.effects';
import { PrivateHeader } from '../headers/private-header';

export function ProtectedRoutes() {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = sessionStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  dispatch(fetchUserEffect(token));

  return (
    <>
      <PrivateHeader />
      <Outlet />
    </>
  );
}
