import React from 'react'
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
    <div>
      {stats.map((stat) => (
        <StatsCard 
        key={stat.title}
        title={stat.title}
        value={stat.value}
        description={stat.description} 
      / >
      ))}
    </div>
  )
}

export default DashboardStats