import { ShieldCheck, BadgeCheck, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary",
        className,
      )}
    >
      <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
      Verified
    </span>
  );
}

export function NSSBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-secondary/15 px-2 py-0.5 text-xs font-medium text-secondary",
        className,
      )}
    >
      <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
      NSS Member
    </span>
  );
}

export function RatingStars({
  value,
  count,
  className,
}: {
  value: number;
  count?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-1 text-sm text-foreground", className)}
      aria-label={`${value.toFixed(1)} out of 5 stars${count ? `, ${count} reviews` : ""}`}
    >
      <Star className="h-4 w-4 fill-accent text-accent" aria-hidden />
      <span className="font-medium">{value.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-muted-foreground">({count})</span>
      )}
    </span>
  );
}
