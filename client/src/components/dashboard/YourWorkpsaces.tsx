import { useGetWorkspacesQuery } from "@/features/workspace/workspaceApi";
import { useNavigate } from "react-router-dom";

// Workspace avatar tint palette – cycles by index (mirrors sidebar)
const WS_TINTS = [
  { bg: "var(--ws-sage-bg)", fg: "var(--ws-sage-fg)" },
  { bg: "var(--ws-sand-bg)", fg: "var(--ws-sand-fg)" },
  { bg: "var(--ws-clay-bg)", fg: "var(--ws-clay-fg)" },
  { bg: "var(--ws-slate-bg)", fg: "var(--ws-slate-fg)" },
];

const YourWorkpsaces = () => {
  const { data: workspaces, isLoading, isError } = useGetWorkspacesQuery();

  const navigate = useNavigate();

  if (isError)
    return (
      <p className="rounded-xl border border-destructive/20 bg-card p-4 text-sm text-destructive shadow-[0_1px_2px_rgba(28,25,23,0.04)]">
        Error fetching workspaces...
      </p>
    );

  const hasMoreWorkspaces = (workspaces?.length ?? 0) > 3;
  const displayedWorkspaces = workspaces?.slice(0, 3);

  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(28,25,23,0.04)]">
      {/* Header */}
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Workspaces
          </p>

          <h2 className="mt-1 text-lg font-semibold text-foreground">Your workspaces</h2>
        </div>

        {hasMoreWorkspaces ? (
          <button
            onClick={() => navigate("/workspaces")}
            className="
              text-xs font-medium
              text-primary
              transition-colors
              hover:opacity-80
              cursor-pointer
            "
          >
            View more
          </button>
        ) : (
          <span className="text-xs text-muted-foreground">Recent</span>
        )}
      </div>

      {/* Workspaces */}
      <div className="space-y-2">
        {isLoading ? (
          <p className="px-2 py-3 text-sm text-muted-foreground">Loading...</p>
        ) : workspaces?.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-muted/50 px-4 py-8 text-center">
            <p className="text-sm font-medium text-foreground">No workspaces yet</p>

            <p className="mt-1 text-xs text-muted-foreground">Create a workspace to get started.</p>
          </div>
        ) : (
          displayedWorkspaces?.map((workspace, index) => {
            const tint = WS_TINTS[index % WS_TINTS.length];
            return (
              <div
                key={workspace.id}
                className="
                  flex cursor-pointer items-center justify-between
                  rounded-xl
                  border border-border
                  bg-card
                  px-4 py-3
                  shadow-[0_1px_2px_rgba(28,25,23,0.04)]
                  transition-all duration-200
                  hover:-translate-y-1
                  hover:border-border
                  hover:bg-muted
                  hover:shadow-md
                "
                onClick={() => navigate(`/workspace/${workspace.id}`)}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className="
                      flex h-9 w-9 shrink-0
                      items-center justify-center
                      rounded-lg
                      text-sm font-semibold
                    "
                    style={{ backgroundColor: tint.bg, color: tint.fg }}
                  >
                    {workspace.name[0].toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{workspace.name}</p>

                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {workspace.role ?? "No role"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default YourWorkpsaces;
