import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "USA Trip Blog",
  description: "Share stories from your journey across the United States.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-zinc-50 antialiased`}>
        <div className="border-b border-zinc-200 bg-white/70 backdrop-blur">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-sm font-semibold text-zinc-900">USA Trip Blog</Link>
            <a href="https://unsplash.com/s/photos/usa" target="_blank" rel="noreferrer" className="text-sm text-zinc-600 hover:text-zinc-900">Photo ideas</a>
          </nav>
        </div>
        {children}
      </body>
    </html>
  );
}
