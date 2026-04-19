import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../api/auth';

export const ProtectedRoute = () => {
  const token = getToken();

  if (!token) {
    return <Navigate to='/login' replace />;
  }
  return <Outlet />;
};
