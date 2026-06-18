import React from 'react'

type StatCardProps = {
  title: string;
  value: number;
  description: string;
};

const StatsCard = ({ title, value, description }: StatCardProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{value}</p>
      <span>{description}</span>
    </div>
  )
}

export default StatsCard