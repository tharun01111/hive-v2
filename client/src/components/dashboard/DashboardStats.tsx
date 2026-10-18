import StatsCard from "./StatsCard";
import { useGetDashboardStatsQuery } from "@/features/dashboard/dashboardApi";

const DashboardStats = () => {
  const { data, isLoading, isError } = useGetDashboardStatsQuery();

  const stats = [
    {
      title: "Workspaces",
      value: data?.workspaceCount ?? 0,
      description: "Active workspaces",
    },
    {
      title: "Projects",
      value: data?.projectCount ?? 0,
      description: "Across all workspaces",
    },
    {
      title: "Tasks",
      value: 24,
      description: "Open tasks",
    },
    {
      title: "Members",
      value: data?.memberCount ?? 0,
      description: "Collaborators",
    },
  ];

  if (isLoading) {
    return (
      <p className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground shadow-sm">
        Loading dashboard stats...
      </p>
    );
  }

  if (isError)
    return (
      <p className="rounded-xl border border-destructive/20 bg-card p-4 text-sm text-destructive shadow-sm">
        Error in fetching workspaces...
      </p>
    );

  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            At a glance
          </p>
          <h2 className="mt-1 text-lg font-semibold text-foreground">Overview</h2>
        </div>
        <span className="hidden text-xs text-muted-foreground sm:block">
          Your workspace activity
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
          />
        ))}
      </div>
    </section>
  );
};

export default DashboardStats;
