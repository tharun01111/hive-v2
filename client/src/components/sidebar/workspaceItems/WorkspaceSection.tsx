import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import type { SidebarProps } from "../Sidebar";

const WorkspaceSection = ({ collapsed } : SidebarProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
       {!collapsed && (
        <section className="px-3 py-5">

          {/* Section Header */}
          <div className="mb-3 flex items-center justify-between px-2">

            <p className="text-xs font-medium tracking-wider text-neutral-500">
              WORKSPACES
            </p>

            <button className="text-neutral-500 transition hover:text-white">
              <Plus size={16} />
            </button>

          </div>


          {/* Workspace Item */}
          <div>

            <div className="flex items-center rounded-lg bg-neutral-800 px-2 py-2">

              <button className="mr-2 text-neutral-400 hover:text-white">
                <ChevronDown size={16} />
              </button>

              <div className="flex min-w-0 flex-1 items-center gap-3">

                {/* Workspace Icon */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-700 text-sm font-medium">
                  H
                </div>

                {/* Workspace Information */}
                <div className="min-w-0">

                  <p className="truncate text-sm font-medium">
                    Hive Development
                  </p>

                  <p className="text-xs text-neutral-500">
                    Owner
                  </p>

                </div>

              </div>

            </div>


            {/* Projects inside Workspace */}
            <div className="ml-10 mt-1 space-y-1">

              <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-400 transition hover:bg-neutral-800 hover:text-white">

                <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />

                Frontend

              </button>


              <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-400 transition hover:bg-neutral-800 hover:text-white">

                <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />

                Backend

              </button>


              <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-400 transition hover:bg-neutral-800 hover:text-white">

                <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />

                Mobile

              </button>

            </div>

          </div>


          {/* Another Workspace */}
          <div className="mt-1">

            <div className="flex items-center rounded-lg px-2 py-2 transition hover:bg-neutral-800/60">

              <button className="mr-2 text-neutral-500 hover:text-white">
                <ChevronRight size={16} />
              </button>

              <div className="flex min-w-0 flex-1 items-center gap-3">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-700 text-sm font-medium">
                  C
                </div>

                <div className="min-w-0">

                  <p className="truncate text-sm font-medium">
                    College Team
                  </p>

                  <p className="text-xs text-neutral-500">
                    Member
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* Another Workspace */}
          <div className="mt-1">

            <div className="flex items-center rounded-lg px-2 py-2 transition hover:bg-neutral-800/60">

              <button className="mr-2 text-neutral-500 hover:text-white">
                <ChevronRight size={16} />
              </button>

              <div className="flex min-w-0 flex-1 items-center gap-3">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-700 text-sm font-medium">
                  D
                </div>

                <div className="min-w-0">

                  <p className="truncate text-sm font-medium">
                    Design Team
                  </p>

                  <p className="text-xs text-neutral-500">
                    Member
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* Create Workspace */}
          <button className="mt-4 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-400 transition hover:bg-neutral-800 hover:text-white">

            <Plus size={16} />

            Create workspace

          </button>

        </section>
       )}

       {collapsed && (
            <div className="flex flex-col items-center gap-3 py-5">

              {/* Dashboard */}
              <button
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  text-neutral-400
                  transition
                  hover:bg-neutral-800
                  hover:text-white
                "
              >
                🏠
              </button>


              {/* Workspace */}
              <button
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  text-neutral-400
                  transition
                  hover:bg-neutral-800
                  hover:text-white
                "
              >
                🗂️
              </button>


              {/* Search */}
              <button
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  text-neutral-400
                  transition
                  hover:bg-neutral-800
                  hover:text-white
                "
              >
                🔍
              </button>


              {/* Settings */}
              <button
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  text-neutral-400
                  transition
                  hover:bg-neutral-800
                  hover:text-white
                "
              >
                ⚙️
              </button>

            </div>
          )}

      </div>
  )
}

export default WorkspaceSection