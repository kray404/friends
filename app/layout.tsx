"use client ";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "../components/NavBar";
import { getServerSession } from "next-auth";
import SessionProvider from "../components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Four Tees Friends",
  description: "An overview over Four Tees friends in the different seasons",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <SessionProvider session={session}>
          <NavBar />
          <div className="rounded-lg p-4 shadow-lg shadow-black/20 w-full">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
