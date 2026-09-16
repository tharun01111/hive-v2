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

          <CreateWorkspace
            variant="icon"
            className="
              flex h-7 w-7 items-center justify-center
              rounded-md
              text-neutral-400
              transition-all duration-200
              hover:bg-neutral-800
              hover:text-white
              active:scale-95
            "
          />
        </div>
      )}

      <WorkspaceList collapsed={collapsed} />

      {!collapsed && (
        <CreateWorkspace
          variant="full"
          className="
            mt-4 flex w-full items-center gap-2
            rounded-lg
            border border-neutral-800
            bg-neutral-900/50
            px-3 py-2.5
            text-sm font-medium text-neutral-400
            transition-all duration-200
            hover:border-neutral-700
            hover:bg-neutral-800
            hover:text-white
            active:scale-[0.99]
          "
        />
      )}
    </section>
  );
};

export default WorkspaceSection;
