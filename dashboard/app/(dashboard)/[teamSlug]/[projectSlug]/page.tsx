import { notFound } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ teamSlug: string; projectSlug: string }>;
}) {
  const { teamSlug, projectSlug } = await params;

  // Project validation
  // const project = await getProjectBySlug(teamSlug, projectSlug);
  const project = {
    name: projectSlug,
  };

  if (!project) {
    notFound();
  }

  return (
    <div className="project-dashboard">
      <h1>{project.name}</h1>
      <div className="project-content">Content</div>
    </div>
  );
}
