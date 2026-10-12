import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Lưu lại URL người dùng đang định truy cập để quay lại sau khi login thành công
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};