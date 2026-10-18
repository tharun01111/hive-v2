import { Bell, Settings } from "lucide-react";

type SidebarNavigationProps = {
  collapsed: boolean;
};

const SidebarNavigation = ({ collapsed }: SidebarNavigationProps) => {
  return (
    <nav className="border-t border-border px-3 py-3">
      <button
        className={`
          flex w-full items-center rounded-md
          text-sm text-muted-foreground
          transition-colors
          hover:bg-secondary
          hover:text-foreground
          ${collapsed ? "justify-center px-0" : "gap-3 px-3"}
          h-10
        `}
      >
        <Bell size={18} />

        {!collapsed && <span>Notifications</span>}
      </button>

      <button
        className={`
          flex w-full items-center rounded-md
          text-sm text-muted-foreground
          transition-colors
          hover:bg-secondary
          hover:text-foreground
          ${collapsed ? "justify-center px-0" : "gap-3 px-3"}
          h-10
        `}
      >
        <Settings size={18} />

        {!collapsed && <span>Settings</span>}
      </button>
    </nav>
  );
};

export default SidebarNavigation;
