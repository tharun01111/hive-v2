import { ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Workspace } from "@/features/workspace/workspaceApi";
import ProjectList from "../projectItems/ProjectList";

type WorkspaceItemProps = {
  workspace: Workspace;
  collapsed: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  index?: number;
};

// Workspace avatar tint palette – cycles by index
const WS_TINTS = [
  { bg: "var(--ws-sage-bg)", fg: "var(--ws-sage-fg)" },
  { bg: "var(--ws-sand-bg)", fg: "var(--ws-sand-fg)" },
  { bg: "var(--ws-clay-bg)", fg: "var(--ws-clay-fg)" },
  { bg: "var(--ws-slate-bg)", fg: "var(--ws-slate-fg)" },
];

const WorkspaceItem = ({
  workspace,
  collapsed,
  isExpanded,
  onToggle,
  index = 0,
}: WorkspaceItemProps) => {
  const navigate = useNavigate();

  const initial = workspace.name.charAt(0).toUpperCase();
  const tint = WS_TINTS[index % WS_TINTS.length];

  // Collapsed sidebar
  if (collapsed) {
    return (
      <button
        type="button"
        onClick={onToggle}
        title={workspace.name}
        className="
          flex h-10 w-10 items-center justify-center
          rounded-lg
          text-sm font-semibold
          transition-colors
          hover:opacity-90
        "
        style={{ backgroundColor: tint.bg, color: tint.fg }}
      >
        {initial}
      </button>
    );
  }

  return (
    <div className="w-full">
      {/* Workspace */}
      <div
        className={`
          flex items-center gap-2 rounded-lg px-2 py-2
          transition-colors
          ${isExpanded ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-secondary"}
        `}
      >
        {/* Expand / Collapse */}
        <button
          type="button"
          onClick={onToggle}
          aria-label={`${isExpanded ? "Collapse" : "Expand"} ${workspace.name}`}
          aria-expanded={isExpanded}
          className="
            flex h-7 w-7 shrink-0 items-center justify-center
            rounded-md
            text-muted-foreground
            transition-colors
            hover:bg-secondary
            hover:text-foreground
          "
        >
          {isExpanded ? <ChevronDown size={17} /> : <ChevronRight size={17} />}
        </button>

        {/* Workspace Name */}
        <button
          type="button"
          onClick={() => navigate(`/workspace/${workspace.id}`)}
          className="
            flex min-w-0 flex-1 items-center gap-3
            text-left
          "
        >
          <div
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-lg
              text-sm font-semibold
            "
            style={{ backgroundColor: tint.bg, color: tint.fg }}
          >
            {initial}
          </div>

          <p className="truncate text-sm font-semibold">{workspace.name}</p>
        </button>
      </div>

      {/* Projects */}
      {isExpanded && (
        <div className="ml-9 mt-1">
          <ProjectList workspaceId={workspace.id} />
        </div>
      )}
    </div>
  );
};

export default WorkspaceItem;
