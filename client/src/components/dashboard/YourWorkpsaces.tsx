import { useGetWorkspacesQuery } from "@/features/workspace/workspaceApi";

const YourWorkpsaces = () => {
  const { data: workspaces, isLoading, isError } = useGetWorkspacesQuery();

  if (isError) return <p>Error fetching workspaces...</p>;

  return (
    <div className="space-y-2">
      {isLoading ? (
        <p className="px-2 py-3 text-sm text-neutral-500">Loading...</p>
      ) : workspaces?.length === 0 ? (
        <div className="rounded-xl border border-neutral-200 bg-white px-4 py-8 text-center">
          <p className="text-sm font-medium text-neutral-900">
            No workspaces yet
          </p>
          <p className="mt-1 text-xs text-neutral-500">
            Create a workspace to get started.
          </p>
        </div>
      ) : (
        workspaces?.map((workspace) => (
          <div
            key={workspace.id}
            className="
          flex items-center justify-between
          rounded-xl
          border border-neutral-200
          bg-white
          px-4 py-3
          transition
          hover:border-neutral-300
          hover:bg-neutral-50
        "
          >
            <div className="flex min-w-0 items-center gap-3">
              {/* Workspace initial */}
              <div
                className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-lg
              bg-neutral-100
              text-sm font-semibold
              text-neutral-900
            "
              >
                {workspace.name[0].toUpperCase()}
              </div>

              {/* Workspace details */}
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-neutral-900">
                  {workspace.name}
                </p>

                <p className="mt-0.5 text-xs text-neutral-500">
                  {workspace.role ?? "No role"}
                </p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default YourWorkpsaces;
