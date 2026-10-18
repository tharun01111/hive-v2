const ProjectCard = () => {
  return (
    <article
      className="
        group
        cursor-pointer
        rounded-xl
        border border-border
        bg-card
        p-5
        transition
        hover:border-primary/50
        hover:bg-accent
      "
    >
      <div className="mb-5 flex items-start justify-between">
        <div
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-lg
            bg-accent
            text-sm font-semibold
          "
        >
          H
        </div>

        <button
          type="button"
          className="
            text-muted-foreground
            opacity-0
            transition
            group-hover:opacity-100
            hover:text-foreground
          "
        >
          ⋮
        </button>
      </div>

      <h3 className="text-base font-semibold">Hive</h3>

      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
        Collaborative workspace management platform.
      </p>

      <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
        <span>12 Tasks</span>
        <span>5 Members</span>
      </div>

      <div className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
        Updated 2 hours ago
      </div>
    </article>
  );
};

export default ProjectCard;
