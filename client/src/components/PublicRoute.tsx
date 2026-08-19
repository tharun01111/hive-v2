import { useAppSelector } from '@/app/hooks';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {

  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  console.log("Entering public route...");
  
  if(loading) return null;

  console.log("Exiting public route...");
  return isAuthenticated ?<Navigate to="/dashboard" /> : <Outlet />;
}

export default PublicRoute
