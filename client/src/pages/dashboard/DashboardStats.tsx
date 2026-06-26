import StatsCard from './StatsCard';

const DashboardStats = () => {
  const stats = [
  {
    title: "Workspaces",
    value: 3,
    description: "Active workspaces",
  },
  {
    title: "Projects",
    value: 8,
    description: "Across all workspaces",
  },
  {
    title: "Tasks",
    value: 24,
    description: "Open tasks",
  },
  {
    title: "Members",
    value: 15,
    description: "Collaborators",
  },
];
  return (
  <div className='mt-10'>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">
  Overview
</h2>
   <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>  
      {stats.map((stat) => (
        <StatsCard 
        key={stat.title}
        title={stat.title}
        value={stat.value}
        description={stat.description} 
      / >
      ))}
    </div>
    </div> 

  )
}

export default DashboardStats