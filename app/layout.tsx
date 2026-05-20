import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import CursorSpotlight from "@/components/cursor-spotlight";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Johannes Schulz - Fullstack Engineer",
  description: "Freelance Fullstack Engineer helping teams build and ship — from React/Next.js frontends to FastAPI/Postgres backends and infrastructure. Available for contracts ~25h/week. Remote, async-first.",
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: "Johannes Schulz - Fullstack Engineer",
    description: "Freelance Fullstack Engineer helping teams build and ship — from React/Next.js frontends to FastAPI/Postgres backends and infrastructure. Available for contracts ~25h/week. Remote, async-first.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={spaceGrotesk.className}>
        <CursorSpotlight />
        {children}
      </body>
    </html>
  );
}
