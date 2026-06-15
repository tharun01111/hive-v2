import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {

  const token = localStorage.getItem("token ");

  return token ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute