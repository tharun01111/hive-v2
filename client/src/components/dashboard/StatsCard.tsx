type StatCardProps = {
  title: string;
  value: number;
  description: string;
};

const StatsCard = ({ title, value, description }: StatCardProps) => {
  return (
    <article className="group rounded-xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(28,25,23,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-border hover:shadow-md">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <span className="h-2 w-2 rounded-full bg-border transition-transform group-hover:scale-125" />
      </div>
      <p className="text-4xl font-bold tracking-tight text-foreground">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </article>
  );
};

export default StatsCard;
