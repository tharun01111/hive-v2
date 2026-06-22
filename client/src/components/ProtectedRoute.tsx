import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {

  const {isAuthenticated, loading} = useAuth();
  if(loading) return null;

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute