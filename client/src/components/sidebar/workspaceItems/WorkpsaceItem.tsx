import {
  CalendarDays,
  ChevronDown,
  ChevronRight,
  FileText,
  Folder,
  Home,
} from "lucide-react";

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
  const initial = workspace.name.charAt(0).toUpperCase();

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={onToggle}
        title={workspace.name}
        className="
          flex h-10 w-10 items-center justify-center
          rounded-lg
          bg-neutral-800
          text-sm font-semibold text-white
          transition-colors
          hover:bg-neutral-700
        "
      >
        {initial}
      </button>
    );
  }

  return (
    <div className="w-full">
      {/* Workspace Header */}
      <div
        className={`
          flex items-center gap-2 rounded-lg px-2 py-2
          transition-colors
          ${
            isExpanded
              ? "bg-neutral-800"
              : "hover:bg-neutral-800/70"
          }
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
            text-neutral-400
            transition-colors
            hover:bg-neutral-700
            hover:text-white
          "
        >
          {isExpanded ? (
            <ChevronDown size={17} />
          ) : (
            <ChevronRight size={17} />
          )}
        </button>

        {/* Workspace Name */}
        <button
          type="button"
          className="
            flex min-w-0 flex-1 items-center gap-3
            text-left
          "
        >
          <div
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-lg
              bg-neutral-700
              text-sm font-semibold text-white
            "
          >
            {initial}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              {workspace.name}
            </p>
          </div>

          <span
            className="
              shrink-0
              text-[11px] font-medium uppercase
              tracking-wide
              text-neutral-500
            "
          >
            {workspace.role ?? "MEMBER"}
          </span>
        </button>
      </div>

      {/* Workspace Navigation */}
      {isExpanded && (
        <div className="mt-1 rounded-lg bg-neutral-900/40 py-1">
          {/* Home */}
          <button
            type="button"
            className="
              flex w-full items-center gap-3
              rounded-md px-4 py-2
              text-sm text-white
              bg-neutral-800
            "
          >
            <Home size={18} />
            <span>Home</span>
          </button>

          {/* Projects */}
          <div>
            <button
              type="button"
              className="
                flex w-full items-center gap-3
                rounded-md px-4 py-2
                text-sm text-neutral-400
                transition-colors
                hover:bg-neutral-800
                hover:text-white
              "
            >
              <Folder size={18} />
              <span>Projects</span>
            </button> 
          </div>

          {/* Notes */}
          <button
            type="button"
            className="
              flex w-full items-center gap-3
              rounded-md px-4 py-2
              text-sm text-neutral-400
              transition-colors
              hover:bg-neutral-800
              hover:text-white
            "
          >
            <FileText size={18} />
            <span>Notes</span>
          </button>

          {/* Calendar */}
          <button
            type="button"
            className="
              flex w-full items-center gap-3
              rounded-md px-4 py-2
              text-sm text-neutral-400
              transition-colors
              hover:bg-neutral-800
              hover:text-white
            "
          >
            <CalendarDays size={18} />
            <span>Calendar</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkspaceItem;