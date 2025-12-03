import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('authToken');

  if (!token) return <Navigate to="/signin" replace />;
  return children;
};

export default ProtectedRoutes;
