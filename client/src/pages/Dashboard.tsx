import DashboardHero from "@/components/dashboard/DashboardHero";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentActivity from "../components/dashboard/RecentActivity";
import Sidebar from "@/components/sidebar/Sidebar";
import { useAppSelector } from "@/app/hooks";
import { useState } from "react";
import YourWorkspaces from "@/components/dashboard/YourWorkpsaces";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 md:flex">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />

      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-7xl space-y-10 px-4 py-6 sm:px-6 lg:px-8">
          <DashboardHero name={user?.username ?? "User"} />

          <DashboardStats />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.7fr_1fr]">
            <YourWorkspaces />
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
