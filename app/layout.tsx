import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Four Tees Friends",
  description: "An overview over Four Tees friends in the different seasons",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        <NavBar />
        <div className="rounded-lg p-4 shadow-lg shadow-black/20 w-full">
          <div>{children}</div>
        </div>
      </body>
    </html>
  );
}
