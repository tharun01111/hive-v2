import { useAppDispatch } from "@/app/hooks"
import { initializeAuth } from "@/features/auth/authSlice";
import { useEffect } from "react";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return children;
}

export default AuthInitializer