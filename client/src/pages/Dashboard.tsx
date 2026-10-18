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
    <div className="flex h-screen overview-hidden bg-background">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <main className="min-w-0 flex-1 overflow-hidden">
        <div className="mx-auto max-w-7xl overflow-hidden space-y-8 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex h-full flex-col gap-6">
            <DashboardHero name={user?.username ?? "User"} />

            <DashboardStats />

            <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-[1.35fr_1fr]">
              <YourWorkspaces />
              <RecentActivity />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
