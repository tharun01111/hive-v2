import { useAppSelector } from "@/app/hooks";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, loading, token } = useAppSelector((state) => state.auth);
  console.log("Entering ProtectedRoute");
  console.log("Auth:", isAuthenticated);

  console.log("Token:", token);
  if (loading) return null;

  console.log("Exiting ProtectedRoute...");


  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
