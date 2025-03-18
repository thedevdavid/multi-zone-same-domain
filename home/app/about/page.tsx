import Link from "next/link";

export default function About() {
  return (
    <div>
      <p>This is the about page.</p>
      <div>
        <Link href="/home">Go Back</Link>
      </div>
    </div>
  );
}
