"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const isDemoPage = pathname.startsWith("/demos");

  if (isDemoPage) return null;

  return <Navbar />;
}
