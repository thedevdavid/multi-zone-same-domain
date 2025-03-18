import "./globals.css";

export const metadata = {
  title: "Next.js - Home Zone",
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
        <p>Home layout</p>
        {children}
      </body>
    </html>
  );
}
