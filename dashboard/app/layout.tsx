import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Next.js - Dashboard Zone",
  description: "Next.js example for Multi Zones",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <p>Main layout in dashboard app</p>
          <div className="nav-links">
            <a href="/home">Marketing Home</a>
            <Link href="/">Dashboard Home</Link>
            <Link href="/catalog">Catalog</Link>
            <Link href="/team-slug">Team page</Link>
            <Link href="/team-slug/project-slug">Project page</Link>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
