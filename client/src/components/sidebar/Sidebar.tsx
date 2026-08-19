import Profile from "./Profile";
import SidebarHeader from "./SidebarHeader";
import WorkspaceSection from "./workspaceItems/WorkspaceSection";

export type SidebarProps = {
  collapsed: boolean; 
  onToggle?: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  return (
    <aside className={`
        flex
        flex-col
        h-screen
        shrink-0
        overflow-hidden
        border-r
        border-neutral-800
        bg-[#18181b]
        text-white
        transition-[width]
        duration-300
        ease-in-out
        ${collapsed ? "w-[68px]" : "w-[300px]"}
      `}>

      {/* Header */}
      <SidebarHeader collapsed={collapsed} onToggle={onToggle}/>

      {/* Workspace Area */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <WorkspaceSection collapsed={collapsed} />
      </div>

      {/* Profile */}
      <Profile collapsed={collapsed} />

    </aside>
  );
};

export default Sidebar;