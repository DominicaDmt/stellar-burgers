import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logout } from '../../services/slices/userSlice';
import { deleteCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Очищаем токены
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');

    // Диспатчим logout
    dispatch(logout());

    // Принудительно редиректим, минуя ProtectedRoute
    navigate('/login', { replace: true });

    // Перезагружаем страницу, чтобы сбросить состояние
    window.location.href = '/login';
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
