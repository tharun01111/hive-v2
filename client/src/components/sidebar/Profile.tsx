import { useAppSelector } from "@/app/hooks"
import type { SidebarProps } from "./Sidebar"

const Profile = ({ collapsed } : SidebarProps) => {
  
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div
          className={`
            shrink-0
            border-t
            border-neutral-800
            transition-all
            duration-300
            ${collapsed ? "p-3" : "p-4"}
          `}
        >

          <button
            className={`
              flex
              w-full
              items-center
              rounded-lg
              text-left
              transition
              hover:bg-neutral-800
              ${collapsed ? "justify-center p-1" : "gap-3 p-2"}
            `}
          >

            {/* AVATAR */}
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-neutral-700
                text-sm
                font-medium
              "
            >
              {user?.username?.[0]?.toUpperCase() ?? "?"}
            </div>


            {/* USER INFO */}
            {!collapsed && (
              <div className="min-w-0">

                <p className="truncate text-sm font-medium">
                  {user?.username}
                </p>

                <p className="truncate text-xs text-neutral-500">
                  {user?.email}
                </p>

              </div>
            )}

          </button>

        </div>
  )
}

export default Profile