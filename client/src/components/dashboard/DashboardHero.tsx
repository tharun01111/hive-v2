import Logout from "@/components/Logout";
import CreateWorkspace from "../sidebar/workspaceItems/CreateWorkspace";

const DashboardHero = ({ name }: { name: string }) => {
  return (
    <div className="flex items-center justify-between rounded-2xl border p-6">
      <div>
        <h3 className="text-3xl font-bold">Good Evening, {name}</h3>
        <p className="text-gray-500 mt-2">Let's Build something today.</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <CreateWorkspace
          variant="button"
          className="
            inline-flex items-center justify-center
            rounded-lg
            border border-neutral-300
            bg-white
            px-3 py-1.5
            text-sm font-medium text-black
            transition-colors duration-200
            hover:bg-neutral-100
            active:bg-neutral-200
          "
        />
        <button
          className="inline-flex items-center justify-center
            rounded-lg
            border border-neutral-300
            bg-white
            px-3 py-1.5
            text-sm font-medium text-black
            transition-colors duration-200
            hover:bg-neutral-100
            active:bg-neutral-200"
        >
          New Project
        </button>
        <Logout />
      </div>
    </div>
  );
};

export default DashboardHero;
