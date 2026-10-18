import type { Workspace } from "@/features/workspace/workspaceApi";
import WorkspaceCard from "./WorkspaceCard";
import CreateWorkspace from "../sidebar/workspaceItems/CreateWorkspace";
import { useNavigate } from "react-router-dom";

type WorkspaceProps = {
  workspaces: Workspace[] | undefined;
};

const WorkspaceGrid = ({ workspaces }: WorkspaceProps) => {

  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-5 flex items-center justify-end">
        <CreateWorkspace
          className="
            rounded-lg
            bg-primary px-4 py-2
            text-sm font-medium text-primary-foreground
            transition
            hover:bg-primary/80
          "
          variant="full"
        />
      </div>

      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {workspaces?.map((workspace, index) => (
          <div key={index} onClick={() => navigate(`/workspace/${workspace.id}`)}>
            <WorkspaceCard
              name={workspace.name}
              description={workspace.description || "Workspace description"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceGrid;
