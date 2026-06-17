import {
  Activity,
  Bell,
  ChevronsUpDown,
  LogOut,
  Moon,
  Plus,
  Users,
} from "lucide-react";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#090a0a] text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-[300px] shrink-0 border-r border-white/10 bg-[#17181d] text-slate-200 lg:flex lg:flex-col">
          <div className="border-b border-white/10 p-3">
            <button className="flex h-14 w-full items-center justify-between rounded-lg border border-slate-500/70 bg-[#101116] px-3 text-left shadow-[0_0_0_2px_rgba(255,255,255,0.08)] transition hover:border-slate-400">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-bold text-slate-950">
                  N
                </span>
                <span className="truncate text-lg font-semibold text-white">
                  New 1
                </span>
              </div>
              <ChevronsUpDown className="size-4 text-slate-400" />
            </button>
          </div>

          <nav className="flex-1 space-y-6 px-3 py-6">
            <SidebarGroup title="Workspaces">
              <SidebarItem active icon="N" label="New 1" />
            </SidebarGroup>

            <SidebarGroup title="Projects">
              <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-lg text-slate-300 transition hover:bg-white/5 hover:text-white">
                <span className="size-2 rounded-full bg-slate-500" />
                <span className="truncate">Our project</span>
              </button>
            </SidebarGroup>
          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#15161b] p-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-slate-700 text-sm font-semibold">
                  T
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">Tharun</p>
                  <p className="truncate text-xs text-slate-400">
                    tharunadhi33@gmail.com
                  </p>
                </div>
              </div>
              <LogOut className="size-4 shrink-0 text-slate-400" />
            </div>
          </div>
        </aside>

        <section className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_48%_0%,rgba(33,138,91,0.22),transparent_42%)]" />

          <header className="relative z-10 flex items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:hidden">
            <button className="flex min-w-0 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-sm font-bold text-slate-950">
                N
              </span>
              <span className="truncate font-semibold">New 1</span>
            </button>
            <div className="flex items-center gap-2">
              <IconButton label="Theme">
                <Moon className="size-4" />
              </IconButton>
              <IconButton label="Notifications">
                <Bell className="size-4" />
              </IconButton>
            </div>
          </header>

          <div className="relative z-10 mx-auto w-full max-w-[1060px] px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-white">
                  New 1
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button className="inline-flex h-10 items-center gap-2 rounded-lg px-2 text-sm font-medium text-slate-300 transition hover:text-white">
                  <Users className="size-4" />
                  Members
                </button>
                <button className="inline-flex h-10 items-center justify-center rounded-lg border border-white/15 bg-[#15161d] px-5 text-sm font-semibold text-white transition hover:bg-[#1d1f28]">
                  New workspace
                </button>
                <button className="inline-flex h-10 items-center justify-center rounded-lg bg-emerald-400 px-5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300">
                  New project
                </button>
                <button className="inline-flex h-10 items-center gap-2 rounded-lg px-2 text-sm font-medium text-slate-300 transition hover:text-white">
                  <Activity className="size-4" />
                  Activity
                </button>
              </div>
            </div>

            <section className="mt-12">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                  Projects
                </p>
                <button className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-slate-400 transition hover:text-white">
                  <Plus className="size-4" />
                  Add
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <ProjectCard />
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function SidebarGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-2 px-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
        {title}
      </h2>
      <div className="space-y-1">{children}</div>
    </section>
  );
}

function SidebarItem({
  active,
  icon,
  label,
}: {
  active?: boolean;
  icon: string;
  label: string;
}) {
  return (
    <button
      className={`relative flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-lg font-semibold transition ${
        active
          ? "bg-white/8 text-white"
          : "text-slate-300 hover:bg-white/5 hover:text-white"
      }`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-emerald-400" />
      )}
      <span className="flex size-5 items-center justify-center rounded bg-slate-600 text-xs font-bold text-white">
        {icon}
      </span>
      <span className="truncate">{label}</span>
    </button>
  );
}

function IconButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      aria-label={label}
      title={label}
      className="inline-flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 transition hover:bg-white/10 hover:text-white"
    >
      {children}
    </button>
  );
}

function ProjectCard() {
  return (
    <article className="min-h-[182px] rounded-lg border border-white/10 bg-[#17181d] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.28)] transition hover:border-white/20 hover:bg-[#1c1d23]">
      <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-950">
        o
      </div>

      <h3 className="mt-5 text-lg font-semibold text-white">Our project</h3>

      <div className="mt-6 flex items-center gap-3 text-sm text-slate-400">
        <span className="flex size-7 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold text-white">
          T
        </span>
        <span>1 member</span>
      </div>
    </article>
  );
}
