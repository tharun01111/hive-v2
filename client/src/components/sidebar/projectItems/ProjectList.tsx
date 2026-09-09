import { useAppSelector } from "@/app/hooks";
import { type AppDispatch } from "@/app/store";
import {
  fetchAllProjects,
  selectAllProjects,
} from "@/features/projects/projectSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface ProjectListProps {
  workspaceId: string;
}

const ProjectList = ({ workspaceId }: ProjectListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const projects = useAppSelector(selectAllProjects);
  const status = useAppSelector((state) => state.projects.status);

  useEffect(() => {
    console.log("Fetching projects...");
    dispatch(fetchAllProjects(workspaceId));
  }, [dispatch]);

  if (status === "idle") return <p>Loading...</p>;

  return (
    <div>
      {projects.map((project) => (
        <div className="ml-10 mt-1 space-y-1" key={project.id}>
          <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-400 transition hover:bg-neutral-800 hover:text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-neutral-500" />
            {project.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
