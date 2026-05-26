import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackToHome({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 text-sm text-slate hover:text-teal transition-colors mb-8 ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      Back to home
    </Link>
  );
}
