import React from "react";

export default function TeamLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { teamSlug: string };
}) {
  return (
    <div>
      <h1>Team: {params.teamSlug}</h1>
      <main>{children}</main>

      {/* Notice the asset path in the script source */}
      {/* <script src="/dashboard-static/_next/static/chunks/main.js"></script> */}
    </div>
  );
}
