import { useGetProjectsQuery } from "@/features/projects/projectApi";

interface ProjectListProps {
  workspaceId: string;
}

const ProjectList = ({ workspaceId }: ProjectListProps) => {
  const {
    data: projects,
    isLoading,
    isError,
  } = useGetProjectsQuery(workspaceId);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Failed to load projects</p>;

  return (
    <div>
      {projects?.map((project) => (
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
