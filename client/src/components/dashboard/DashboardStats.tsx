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
    return <p>Loading dashboard stats...</p>;
  }

  if(isError) 
    return <p>Error in fetching workspaces...</p>

  return (
    <div className="mt-10">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
        Overview
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 ">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;
