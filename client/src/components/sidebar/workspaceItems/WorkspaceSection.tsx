import { Plus } from "lucide-react";
import type { SidebarProps } from "../Sidebar";
import WorkspaceList from "./WorkspaceList";
import CreateWorkspace from "./CreateWorkspace";

const WorkspaceSection = ({ collapsed }: SidebarProps) => {
  return (
    <section className={collapsed ? "py-4" : "px-3 py-5"}>
      {!collapsed && (
        <div className="mb-3 flex items-center justify-between px-2">
          <p className="text-xs font-medium tracking-wider text-neutral-500">
            WORKSPACES
          </p>

          <button className="text-neutral-500 transition hover:text-white">
            <Plus size={16} />
          </button>
        </div>
      )}

      <WorkspaceList collapsed={collapsed} />

      {!collapsed && <CreateWorkspace />}
    </section>
  );
};

export default WorkspaceSection;