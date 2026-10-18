import WorkspaceGrid from "@/components/workspace/WorkspaceGrid";
import WorkspaceHeader from "@/components/workspace/WorkspaceHeader";
import { useGetWorkspacesQuery } from "@/features/workspace/workspaceApi";

const Workspaces = () => {
  const { data: workspaces, isLoading, isError } = useGetWorkspacesQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <p className="rounded-xl border border-destructive/20 bg-card p-4 text-sm text-destructive shadow-[0_1px_2px_rgba(28,25,23,0.04)]">
        Error fetching workspaces...
      </p>
    );
  }

  if (workspaces?.length === 0) {
    return (
      <div>
        <p>No Workspaces Yet</p>
        <p>Create a new Workspace</p>
        <button>+</button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <WorkspaceHeader />
        <section className="mt-10">
          <WorkspaceGrid workspaces={workspaces} />
        </section>
      </div>
    </main>
  );
};

export default Workspaces;
