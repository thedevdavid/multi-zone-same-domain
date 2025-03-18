import React from "react";

export default async function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <p>Dash layout</p>
      {children}
    </div>
  );
}
