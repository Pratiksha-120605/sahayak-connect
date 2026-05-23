import { HeartHandshake } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 font-bold text-lg ${className}`}>
      <span
        aria-hidden
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"
      >
        <HeartHandshake className="h-5 w-5" />
      </span>
      <span>
        Sahayak
        <span className="sr-only"> — community help platform</span>
      </span>
    </Link>
  );
}
