import { useAppDispatch } from "@/app/hooks";
import { logout } from "../features/auth/authSlice";

const Logout = () => {
  const dispatch = useAppDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <button
      onClick={logoutUser}
      className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted active:scale-[0.98]"
    >
      Logout
    </button>
  );
};

export default Logout;
