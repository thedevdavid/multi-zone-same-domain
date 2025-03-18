import { notFound } from "next/navigation";

export default async function TeamPage({
  params,
}: {
  params: Promise<{ teamSlug: string }>;
}) {
  const { teamSlug } = await params;
  // This is where the actual team validation happens (not in middleware)
  // const team = await getTeamBySlug(params.teamSlug);
  const team = {
    name: teamSlug,
  };

  // If team doesn't exist, show 404
  if (!team) {
    notFound();
  }

  return (
    <div className="team-dashboard">
      <h1>{team.name} Dashboard</h1>
      <div className="team-content">Content</div>
    </div>
  );
}
