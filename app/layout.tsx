import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rural Stay",
  description: "Unplug. Stay. Discover.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F5F1EA] text-zinc-900">
        <header className="border-b border-zinc-900/10">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <Link
              href="/"
              className="font-mono text-sm font-semibold uppercase tracking-[0.2em]"
            >
              Rural Stay
            </Link>
          </div>
        </header>
        <main className="flex-1 mx-auto w-full max-w-6xl px-6 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
