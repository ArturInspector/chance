import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Deliberation App",
  description: "Goal deliberation and validation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

