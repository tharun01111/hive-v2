import { type UserToken, verifyToken } from "@/services/authService";
import { createContext, useEffect, useState } from "react";
import { loginUser } from "@/services/authService";

type AuthContextType = {
  user: UserToken | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};
export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: React.ReactNode
};

const AuthProvider = ({ children }: AuthProviderProps) => {

  const [user, setUser] = useState<UserToken | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (
  email: string,
  password: string
  ) => {
  const data = await loginUser({
    email,
    password,
  });

  localStorage.setItem(
    "token",
    data.token
  );

  setToken(data.token);
  setUser(data.user);
  setIsAuthenticated(true);
};

  const logout = () => {
  localStorage.removeItem("token");

  setUser(null);
  setToken(null);
  setIsAuthenticated(false);
};

  useEffect(() => {
  const initializeAuth = async () => {
     const storedToken = localStorage.getItem("token");

  if (!storedToken) {
    setIsLoading(false);
    return;
  }

  try {
    const userData = await verifyToken(storedToken);

    setUser(userData);
    setToken(storedToken);
    setIsAuthenticated(true);
  } catch {
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  } finally {
    setIsLoading(false);
  }
  }
initializeAuth(); 
  }, []);

  return (
    <AuthContext.Provider value={{user, token, isAuthenticated, loading: isLoading, login, logout}}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider