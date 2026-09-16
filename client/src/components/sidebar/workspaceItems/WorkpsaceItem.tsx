import { ChevronDown, ChevronRight } from "lucide-react";
import ProjectList from "../projectItems/ProjectList";
import type { Workspace } from "@/features/workspace/workspaceApi";

type WorkspaceItemProps = {
  workspace: Workspace;
  collapsed: boolean;
  isExpanded: boolean;
  onToggle: () => void;
};

const WorkspaceItem = ({
  workspace,
  collapsed,
  isExpanded,
  onToggle,
}: WorkspaceItemProps) => {
  if (collapsed) {
    return (
      <button
        onClick={onToggle}
        title={workspace.name}
        className="
          flex h-10 w-10
          items-center justify-center
          rounded-lg
          text-sm font-semibold
          text-white
          transition
          hover:bg-neutral-800
        "
      >
        {workspace.name[0].toUpperCase()}
      </button>
    );
  }

  return (
    <div>
      <div
        className={`
          flex items-center rounded-lg
          px-2 py-2
          transition-colors
          ${isExpanded ? "bg-neutral-800" : "hover:bg-neutral-800/70"}
        `}
      >
        <button
          className="mr-2 text-neutral-400 hover:text-white"
          onClick={onToggle}
        >
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-700 text-sm font-medium">
            {workspace.name[0].toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{workspace.name}</p>

            <p className="text-xs text-neutral-500">
              {workspace.role ?? "MEMBER"}
            </p>
          </div>
        </div>
      </div>

      {isExpanded && <ProjectList workspaceId={workspace.id} />}
    </div>
  );
};

export default WorkspaceItem;
