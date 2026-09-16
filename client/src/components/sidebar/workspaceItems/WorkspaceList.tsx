import { useState } from "react";
import { useGetWorkspacesQuery } from "@/features/workspace/workspaceApi";
import WorkspaceItem from "./WorkpsaceItem";

const WorkspaceList = ({ collapsed }: { collapsed: boolean }) => {
  const [expandedWorkspaceId, setExpandedWorkspaceId] = useState<string | null>(
    null,
  );

  const { data: workspaces, isLoading, isError } = useGetWorkspacesQuery();

  if (isLoading) {
    return <div className="px-2 py-2 text-sm text-neutral-500">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="px-2 py-2 text-sm text-red-400">
        Failed to fetch workspaces
      </div>
    );
  }

  return (
    <div
      className={collapsed ? "flex flex-col items-center gap-2" : "space-y-1"}
    >
      {workspaces?.map((workspace) => (
        <WorkspaceItem
          key={workspace.id}
          workspace={workspace}
          collapsed={collapsed}
          isExpanded={workspace.id === expandedWorkspaceId}
          onToggle={() =>
            setExpandedWorkspaceId((currentId) =>
              currentId === workspace.id ? null : workspace.id,
            )
          }
        />
      ))}
    </div>
  );
};

export default WorkspaceList;
