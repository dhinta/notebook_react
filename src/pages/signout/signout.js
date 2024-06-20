import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../data-access/users/user.reducer';

export function Signout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    sessionStorage.removeItem('token');
    navigate('/');
  }, [dispatch, navigate]);
  return <></>;
}
