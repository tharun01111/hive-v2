import { Search } from "lucide-react";

const WorkspaceHeader = () => {
  return (
    <header>
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-2xl font-semibold">Workspaces</h1>
        </div>

        <div className="relative w-72">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />

          <input
            type="text"
            placeholder="Search"
            className="
              w-full rounded-lg
              border border-transparent
              bg-white
              py-2 pl-10 pr-4
              text-sm text-neutral
              outline-none
              placeholder:text-neutral-500
              focus:border-gray-300
              focus:ring-2 focus:ring-gray-200
              transition-all duration-200
            "
          />
        </div>
      </div>
    </header>
  );
};

export default WorkspaceHeader;
