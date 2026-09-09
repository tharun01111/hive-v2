import { ChevronDown, ChevronRight } from "lucide-react";
import ProjectList from "../projectItems/ProjectList";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { useAppSelector } from "@/app/hooks";
import {
  fetchWorkspaces,
  selectAllWorkspaces,
} from "@/features/workspace/workspaceSlice";
import { useEffect, useState } from "react";

const WorkspaceList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const workspaces = useAppSelector(selectAllWorkspaces);
  const status = useAppSelector((state: RootState) => state.workspaces.status);

  const [expandedWorkspaceId, setExpandedWorkspaceId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWorkspaces());
    }
  }, [dispatch, expandedWorkspaceId]);

  if (status === "pending") return <p>Loading...</p>;

  return (
    <div>
      {workspaces.map((workspace) => {
        const isExpanded = workspace.id === expandedWorkspaceId;
        return (
          <div key={workspace.id}>
            <div className="flex items-center rounded-lg bg-neutral-800 px-2 py-2">
              <button
                className="mr-2 text-neutral-400 hover:text-white"
                onClick={() =>
                  setExpandedWorkspaceId(
                    expandedWorkspaceId === workspace.id ? null : workspace.id,
                  )
                }
              >
                {isExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </button>

              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-neutral-700 text-sm font-medium">
                  {workspace.name[0].toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {workspace.name.toUpperCase()}
                  </p>

                  <p className="text-xs text-neutral-500">{workspace.role}</p>
                </div>
              </div>
            </div>

            {/* Projects inside Workspace */}
            {isExpanded && <ProjectList workspaceId={workspace.id} />}
          </div>
        );
      })}
    </div>
  );
};

export default WorkspaceList;
