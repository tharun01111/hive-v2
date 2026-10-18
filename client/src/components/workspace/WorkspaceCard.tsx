type WorkspaceCardProps = {
  name: string;
  description?: string;
};

const WorkspaceCard = ({ name, description }: WorkspaceCardProps) => {
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
          {name[0].toUpperCase()}
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

      <h3 className="text-base font-semibold">{name}</h3>

      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
        {description || "Workspace description"}
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

export default WorkspaceCard;
