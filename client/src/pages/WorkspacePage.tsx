import WorkspaceHeader from "@/components/workspace/WorkspaceHeader";
import ProjectGrid from "@/components/workspace/ProjectGrid";

const WorkspacePage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <WorkspaceHeader />

        <section className="mt-10">
          <ProjectGrid />
        </section>
      </div>
    </main>
  );
};

export default WorkspacePage;
