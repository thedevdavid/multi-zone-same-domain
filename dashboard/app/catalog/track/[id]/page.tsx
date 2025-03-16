import Link from "next/link";

export default function Track({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      <h3>Track #{id}</h3>
      <p>Lorem ipsum</p>
      <Link href="/catalog">Back to catalog</Link>
    </div>
  );
}
