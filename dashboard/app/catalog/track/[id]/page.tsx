import Link from "next/link";

export default async function Track({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <h1>Track #{id}</h1>
      <p>Lorem ipsum</p>
      <Link href="/catalog">Back to catalog</Link>
    </div>
  );
}
