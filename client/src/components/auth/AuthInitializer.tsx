import { useAppDispatch } from "@/app/hooks"
import { initializeAuth } from "@/features/auth/authSlice";
import { useEffect, useState } from "react";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {

  const[initialized, setInitialized] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth())
    .finally(() =>{
      setInitialized(true);
    })
  }, [dispatch]);

  if(!initialized)
    return <div>Loading...</div>

  return children;
}

export default AuthInitializer