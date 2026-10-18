import type { SidebarProps } from "../Sidebar";
import WorkspaceList from "./WorkspaceList";
import CreateWorkspace from "./CreateWorkspace";

const WorkspaceSection = ({ collapsed }: SidebarProps) => {
  return (
    <section className={collapsed ? "py-4" : "px-3 py-5"}>
      {!collapsed && (
        <div className="mb-3 flex items-center justify-between px-2">
          <p className="text-xs font-semibold tracking-[0.16em] text-muted-foreground">
            WORKSPACES
          </p>

          <CreateWorkspace
            variant="icon"
            className="
              flex h-7 w-7 items-center justify-center
              rounded-md
              text-muted-foreground
              transition-all duration-200
              hover:bg-secondary
              hover:text-foreground
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
            border border-border border-dashed
            bg-card
            px-3 py-2.5
            text-sm font-medium text-secondary-foreground
            transition-all duration-200
            hover:bg-muted
            active:scale-[0.99]
          "
        />
      )}
    </section>
  );
};

export default WorkspaceSection;
