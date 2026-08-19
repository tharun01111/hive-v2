import DashboardHero from '@/pages/dashboard/DashboardHero'
import DashboardStats from '@/pages/dashboard/DashboardStats'
import RecentActivity from './RecentActivity'
import Sidebar from "@/components/sidebar/Sidebar"
import { useAppSelector } from '@/app/hooks'
import { useState } from 'react'

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth)

  const [ collapsed, setCollapsed ] = useState(false);

  return (
    <div className="flex min-h-screen bg-neutral-50">

      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)}/>

      <main className="min-w-0 flex-1">

        <div className="mx-auto max-w-7xl space-y-10 px-4 py-6 sm:px-6 lg:px-8">

          <DashboardHero
            name={user?.username ?? "User"}
          />

          <DashboardStats />

          <RecentActivity />

        </div>

      </main>

    </div>
  )
}

export default Dashboard