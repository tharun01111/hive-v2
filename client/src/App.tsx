import { Route, Routes, useNavigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { useEffect } from "react"
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const navigate = useNavigate();

  useEffect(() => {
     const token = localStorage.getItem("token ");
     if(token)
      navigate("/dashboard", { replace: true });

  }, [navigate]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute >
              <Dashboard />
          </ProtectedRoute>
          } />
      </Routes>
    </div>

  )
}

export default App
