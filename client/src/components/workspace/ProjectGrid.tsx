import ProjectCard from "./ProjectCard";

const ProjectGrid = () => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Projects</h2>

          <p className="mt-1 text-sm text-muted-foreground">Projects in this workspace</p>
        </div>

        <button
          type="button"
          className="
            rounded-lg
            bg-primary px-4 py-2
            text-sm font-medium text-primary-foreground
            transition
            hover:bg-primary/80
          "
        >
          + New Project
        </button>
      </div>

      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
};

export default ProjectGrid;
