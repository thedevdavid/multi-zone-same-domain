import Link from "next/link";
import Header from "../../components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <div>
        <a href="/dashboard/team-slug">Dashboard team page</a>
      </div>
      <div>
        <a href="/dashboard/team-slug/project-slug">Dashboard project page</a>
      </div>
      <div>
        <a href="/dashboard/catalog">Catalog page from dashboard app</a>
      </div>
      <div>
        <Link href="/about">About page in marketing app</Link>
      </div>
    </div>
  );
}
