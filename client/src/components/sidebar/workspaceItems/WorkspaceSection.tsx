import { Plus } from "lucide-react";
import type { SidebarProps } from "../Sidebar";
import WorkspaceList from "./WorkspaceList";

const WorkspaceSection = ({ collapsed }: SidebarProps) => {
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
          <WorkspaceList />

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
  );
};

export default WorkspaceSection;
