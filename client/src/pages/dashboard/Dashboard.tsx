import DashboardHero from '@/pages/dashboard/DashboardHero'
import DashboardStats from '@/pages/dashboard/DashboardStats'
import RecentActivity from './RecentActivity'
import { useAppSelector } from '@/app/hooks'

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className='min-h-screen bg-neutral-50'>
      <main className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
      <DashboardHero name={user?.username ?? "User"}/>
      <DashboardStats />
      <RecentActivity />
      </main>
    </div>
  )
}

export default Dashboard
