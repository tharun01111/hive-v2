import { useGetProjectsQuery } from "@/features/projects/projectApi";
import { Button } from "@/components/ui/button";

interface ProjectListProps {
  workspaceId: string;
}

const ProjectList = ({ workspaceId }: ProjectListProps) => {
  const { data: projects, isLoading, isError } = useGetProjectsQuery(workspaceId);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Failed to load projects</p>;

  const visibleProjects = projects?.slice(0, 5) ?? [];

  const remainingProjects = Math.max((projects?.length ?? 0) - 5, 0);

  return (
    <div className="mt-1">
      {visibleProjects.map((project) => (
        <div key={project.id} className="mt-1">
          <button
            type="button"
            className="
              flex w-full items-center gap-2
              rounded-md px-3 py-2
              text-sm text-muted-foreground
              transition
              hover:bg-secondary
              hover:text-foreground
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />

            <span className="truncate">{project.name}</span>
          </button>
        </div>
      ))}

      {remainingProjects > 0 && (
        <button
          type="button"
          className="
            mt-1
            px-3 py-1
            text-xs text-muted-foreground
            transition
            hover:text-foreground
          "
        >
          ⋯ {remainingProjects} more
        </button>
      )}
      <Button
        variant="ghost"
        className="
    h-8 w-full
    justify-start
    gap-2
    px-3
    text-xs font-medium
    text-muted-foreground
    hover:bg-muted
    hover:text-foreground
  "
      >
        <span className="text-sm">+</span>
        New Project
      </Button>
    </div>
  );
};

export default ProjectList;
