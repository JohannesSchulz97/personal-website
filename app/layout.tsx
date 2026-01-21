import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalNavbar from "@/components/layout/conditional-navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Johannes Schulz - ML Engineer & Computer Scientist",
  description: "Portfolio of Johannes Schulz - Machine Learning Engineer, Computer Scientist, and Mathematician specializing in probabilistic modeling and data-driven solutions.",
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
