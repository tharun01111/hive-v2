import DashboardHero from '@/components/dashboard/DashboardHero'
import DashboardStats from '@/components/dashboard/DashboardStats'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
      <DashboardHero name='Tharun'/>
      <DashboardStats />
    </div>
  )
}

export default Dashboard