import Logout from "@/components/Logout";
import CreateWorkspace from "../sidebar/workspaceItems/CreateWorkspace";

const   DashboardHero = ({ name }: { name: string }) => {
  return (
    <section className="flex flex-col gap-6 rounded-xl border border-border bg-card p-6 shadow-[0_1px_2px_rgba(28,25,23,0.04)] sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Dashboard overview
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Good Evening, {name[0].toUpperCase() + name.slice(1, name.length)}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Let&apos;s build something meaningful today.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <CreateWorkspace
          variant="button"
          className="
            inline-flex items-center justify-center rounded-lg border border-border
            bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors
            hover:bg-muted active:bg-secondary
          "
        />
        <button className="inline-flex items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 active:scale-[0.98]">
          New Project
        </button>
        <Logout />
      </div>
    </section>
  );
};

export default DashboardHero;
