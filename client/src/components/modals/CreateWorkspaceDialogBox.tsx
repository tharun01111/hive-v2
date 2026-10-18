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
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateWorkspaceMutation } from "@/features/workspace/workspaceApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type DialogBoxProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Workspace name is required")
    .max(50, "Name must be 50 characters or less"),
  description: z.string().max(200, "Description must be 200 characters or less"),
});

type FormValues = z.infer<typeof formSchema>;

export function WorkspaceDialogBox({ open, onOpenChange }: DialogBoxProps) {
  const [createWorkspace, { isLoading }] = useCreateWorkspaceMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const description = form.watch("description");

  useEffect(() => {
    if (open) {
      form.setFocus("name");
    }
  }, [open, form]);

  const onSubmit = async (data: FormValues) => {
    try {
      await createWorkspace({
        ...data,
        description: data.description.trim(),
      }).unwrap();

      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to create workspace:", error);
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (isLoading) return;

    if (!nextOpen) {
      form.reset();
    }

    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="gap-0 overflow-hidden rounded-2xl border border-border bg-white p-0 text-foreground shadow-xl sm:max-w-[420px]">
        {/* Header */}
        <DialogHeader className="space-y-1.5 px-6 pb-1 pt-7 text-left">
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Create workspace
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground">
            A shared space for your projects and team.
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 px-6 pb-6 pt-5">
            {/* Workspace name */}
            <Field className="gap-1.5">
              <Label htmlFor="name" className="text-sm font-medium">
                Name
              </Label>

              <Input
                id="name"
                placeholder="e.g. Product Development"
                maxLength={50}
                aria-invalid={!!form.formState.errors.name}
                {...form.register("name")}
                className="h-10 rounded-lg border-border bg-[#F6F4F0] shadow-none placeholder:text-[#A8A29A] focus-visible:border-primary/50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-primary/20"
              />

              {form.formState.errors.name && (
                <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
              )}
            </Field>

            {/* Description */}
            <Field className="gap-1.5">
              <Label htmlFor="description" className="text-sm font-medium">
                Description <span className="font-normal text-muted-foreground">(optional)</span>
              </Label>

              <Textarea
                id="description"
                placeholder="What is this workspace for?"
                rows={3}
                maxLength={200}
                aria-invalid={!!form.formState.errors.description}
                {...form.register("description")}
                className="min-h-[88px] resize-none rounded-lg border-border bg-[#F6F4F0] shadow-none placeholder:text-[#A8A29A] focus-visible:border-primary/50 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-primary/20"
              />

              {(form.formState.errors.description || description.length > 0) && (
                <div className="flex items-center justify-between gap-2">
                  {form.formState.errors.description ? (
                    <p className="text-xs text-destructive">
                      {form.formState.errors.description.message}
                    </p>
                  ) : (
                    <span />
                  )}

                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {description.length}/200
                  </span>
                </div>
              )}
            </Field>
          </div>

          {/* Footer */}
          <DialogFooter className="mx-0 mb-0 flex-row justify-end gap-2 rounded-none border-0 bg-white px-6 pb-6 pt-0">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="ghost"
                  disabled={isLoading}
                  className="h-10 rounded-lg px-4 text-muted-foreground hover:bg-[#F6F4F0] hover:text-foreground"
                >
                  Cancel
                </Button>
              }
            />

            <Button type="submit" disabled={isLoading} className="h-10 rounded-lg px-5">
              {isLoading ? "Creating..." : "Create workspace"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default WorkspaceDialogBox;
