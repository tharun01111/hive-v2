const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      title: "Created workspace",
      time: "10 mins ago",
      description: "Design Team workspace was created",
    },
    {
      id: 2,
      title: "Created project",
      time: "30 mins ago",
      description: "Hive frontend project was added",
    },
  ];
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(28,25,23,0.04)]">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Activity
          </p>
          <h2 className="mt-1 text-lg font-semibold text-foreground">Recent activity</h2>
        </div>
        <button className="text-sm font-medium text-primary transition-colors hover:opacity-80">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h3 className="text-sm font-medium text-foreground">{activity.title}</h3>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentActivity;
