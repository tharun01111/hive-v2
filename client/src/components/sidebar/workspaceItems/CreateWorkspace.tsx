import { Plus } from "lucide-react";

const CreateWorkspace = () => {
  return (
    <button className="mt-4 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-400 transition hover:bg-neutral-800 hover:text-white">
      <Plus size={16} />
      Create workspace
    </button>
  );
};

export default CreateWorkspace;
