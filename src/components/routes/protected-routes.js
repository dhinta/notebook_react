import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { Loader } from '../../common/loader/loader';
import { fetchUserEffect } from '../../data-access/auth/auth.effects';
import { selectUser } from '../../data-access/auth/auth.selector';
import { PrivateHeader } from '../headers/private-header';

export function ProtectedRoutes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(fetchUserEffect(token));
    } else {
      navigate('/', { replace: true });
    }
  }, [dispatch, navigate, token]);

  return token && user ? (
    <>
      <PrivateHeader />
      <Outlet />
    </>
  ) : (
    <Loader />
  );
}
