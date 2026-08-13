
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
    <section className="mt-8 rounded-xl border bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2>Recent Activity</h2>
        <button>View all</button>
      </div>

      <div>
        {activities.map((activity) => (
          <div key={activity.id}>
          <h3>{activity.title}</h3>
          <p>{activity.time}</p>
          <p>{activity.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RecentActivity