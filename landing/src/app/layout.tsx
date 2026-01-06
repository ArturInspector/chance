import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chance | Procedural Determinism",
  description: "Formalize your life into executable procedures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistMono.variable}>
      <body className="bg-white text-zinc-950 antialiased dark:bg-black dark:text-zinc-50 font-mono">
        {children}
      </body>
    </html>
  );
}
