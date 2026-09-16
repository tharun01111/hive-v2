import Profile from "./Profile";
import SidebarHeader from "./SidebarHeader";
import WorkspaceSection from "./workspaceItems/WorkspaceSection";
import SidebarNavigation from "./SidebarNavigation";

export type SidebarProps = {
  collapsed: boolean;
  onToggle?: () => void;
};

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  return (
    <aside
      className={`
        flex
        h-screen
        shrink-0
        flex-col
        overflow-hidden
        border-r
        border-neutral-800
        bg-[#18181b]
        text-white
        transition-[width]
        duration-300
        ease-in-out
        ${collapsed ? "w-[68px]" : "w-[280px]"}
      `}
    >
      {/* Header */}
      <SidebarHeader
        collapsed={collapsed}
        onToggle={onToggle}
      />

      {/* Main sidebar content */}
      <div className="flex min-h-0 flex-1 flex-col">
        {/* Scrollable workspace area */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <WorkspaceSection collapsed={collapsed} />
        </div>

        {/* Notifications / Settings */}
        <SidebarNavigation collapsed={collapsed} />
      </div>

      {/* Profile */}
      <Profile collapsed={collapsed} />
    </aside>
  );
};

export default Sidebar;