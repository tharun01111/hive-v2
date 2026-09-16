import WorkspaceDialogBox from "@/components/modals/WorkspaceDialogBox";
import { Plus } from "lucide-react";
import { useState } from "react";

interface CreateWorkspaceProps {
  variant?: "icon" | "full" | "button";
  className?: string;
}

const CreateWorkspace = ({ variant = "full", className }: CreateWorkspaceProps) => {
  const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = useState(false);

  const handleOpen = () => {
    setIsCreateWorkspaceOpen(true);
  };

  return (
    <div>
      <button onClick={handleOpen} className={className}>
        {variant === "icon" && <Plus size={16} />}

        {variant === "full" && (
          <>
            <Plus size={16} />
            Create workspace
          </>
        )}

        {variant === "button" && "New Workspace"}
      </button>

      <WorkspaceDialogBox
        open={isCreateWorkspaceOpen}
        onOpenChange={setIsCreateWorkspaceOpen}
      />
    </div>
  );
};

export default CreateWorkspace;
