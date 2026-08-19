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
      <WorkspaceSection collapsed={collapsed}/>

      {/* Profile */}
      <Profile collapsed={collapsed} />

    </aside>
  );
};

export default Sidebar;