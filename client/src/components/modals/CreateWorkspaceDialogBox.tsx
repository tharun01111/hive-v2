import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateWorkspaceMutation } from "@/features/workspace/workspaceApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type DialogBoxProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function WorkspaceDialogBox({ open, onOpenChange }: DialogBoxProps) {

  const formSchema = z.object({
    name: z
      .string()
      .min(1, "Workspace name is required")
      .max(50, "Name must be less than 50 characters"),

    description: z
      .string()
      .max(200, "Description must be less than 200 characters")
      .optional(),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form values: ", data);
    try {
      await createWorkspace(data).unwrap();

      form.reset();
      onOpenChange(false);

      console.log("Successfully created a workspace");
    } catch (error) {
      console.error("Failed to create workspace: ", error);
    }
  };

  const [createWorkspace, { isLoading }] = useCreateWorkspaceMutation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm bg-white text-black rounded-2xl">
        <DialogHeader>
          <DialogTitle>Create a Workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to organize your projects, tasks, and team
            members.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="My workspace"
                {...form.register("name")}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Optional"
                {...form.register("description")}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.description.message}
                </p>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit" disabled={isLoading}>{ isLoading ? "Creating..." : "Create" }</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default WorkspaceDialogBox;
