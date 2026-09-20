import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteWorkspaceMutation } from "@/features/workspace/workspaceApi";

type DelteWorkspaceProps = {
  workspaceId: string;
};

export function DeleteWorkspaceButton({ workspaceId }: DelteWorkspaceProps) {
  const [deleteWorkspace, { isLoading }] = useDeleteWorkspaceMutation();

  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant="outline">Delete Workspace</Button>}
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Workspace</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this workspace? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose render={<Button type="button">Close</Button>} />
          <Button
            variant="destructive"
            onClick={() => deleteWorkspace(workspaceId)}
          >
            {isLoading ? "Deleting..." : "Delete Workspace"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
