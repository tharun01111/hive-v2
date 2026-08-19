import { useAppDispatch } from "@/app/hooks"
import { logout } from "../features/auth/authSlice";


const Logout = () => {

  const dispatch = useAppDispatch();

  const logoutUser = () => {
    dispatch(logout());
  }

  return (
   <button
    onClick={logoutUser}
    className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 active:scale-95 cursor-pointer"
  >
    Logout
  </button>
  )
}

export default Logout