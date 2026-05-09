import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "@/components/layout/conditional-navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Johannes Schulz - AI Systems Engineer",
  description: "Portfolio of Johannes Schulz - AI Systems Engineer specializing in production-grade AI systems, enterprise infrastructure, and multi-service orchestration.",
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: "Johannes Schulz - AI Systems Engineer",
    description: "Portfolio of Johannes Schulz - AI Systems Engineer specializing in production-grade AI systems, enterprise infrastructure, and multi-service orchestration.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ConditionalNavbar />
        {children}
      </body>
    </html>
  );
}
