import Link from "next/link";

export default function Catalog() {
  return (
    <div>
      <h1>Catalog page</h1>
      <ul>
        <li>
          <Link href="/catalog/track/1">Track 1</Link>
        </li>
        <li>
          <Link href="/catalog/track/2">Track 2</Link>
        </li>
      </ul>
      <Link href="/">Dashboard Home</Link>
    </div>
  );
}
