import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Four Tees Friends",
  description: "An overview over Four Tees friends in the different seasons",
};

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto_mono.className}>
      <body className="h-full">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
