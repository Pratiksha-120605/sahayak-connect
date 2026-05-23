import { useState } from "react";
import { MapPin } from "lucide-react";
import type { HelpRequest, Urgency } from "@/lib/types";
import { cn } from "@/lib/utils";

const pinColor: Record<Urgency, string> = {
  high: "bg-destructive",
  medium: "bg-warning",
  low: "bg-success",
};

interface Props {
  requests: HelpRequest[];
  radius?: number; // 0..50, visual only
  onSelect?: (r: HelpRequest) => void;
  selectedId?: string;
}

export function MockMap({ requests, radius = 30, onSelect, selectedId }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      role="img"
      aria-label="Map showing nearby help requests. Color-coded pins indicate urgency."
      className="relative h-[420px] w-full overflow-hidden rounded-xl border border-border bg-[linear-gradient(135deg,oklch(0.96_0.02_200)_0%,oklch(0.97_0.015_160)_100%)] shadow-inner sm:h-[520px]"
    >
      {/* Decorative grid */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full opacity-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="oklch(0.7 0.04 220)"
              strokeWidth="0.5"
            />
          </pattern>
          <pattern id="roads" width="160" height="160" patternUnits="userSpaceOnUse">
            <path d="M0 80 H160" stroke="oklch(0.85 0.02 220)" strokeWidth="6" />
            <path d="M80 0 V160" stroke="oklch(0.85 0.02 220)" strokeWidth="6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#roads)" />
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* You-are-here radius */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/40 bg-primary/10"
        style={{ width: `${radius * 8}px`, height: `${radius * 8}px` }}
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <span className="block h-3 w-3 rounded-full bg-primary ring-4 ring-primary/30" />
      </div>
      <div className="absolute left-1/2 top-1/2 mt-3 -translate-x-1/2 rounded-md bg-background/80 px-2 py-0.5 text-xs font-medium shadow-sm">
        You are here
      </div>

      {/* Pins */}
      {requests.map((r) => {
        const isSelected = r.id === selectedId;
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => onSelect?.(r)}
            onMouseEnter={() => setHovered(r.id)}
            onMouseLeave={() => setHovered(null)}
            aria-label={`${r.title}, ${r.urgency} urgency, ${r.distanceKm} km away`}
            className={cn(
              "absolute z-10 -translate-x-1/2 -translate-y-full transition-transform focus-visible:scale-110",
              isSelected && "scale-110",
            )}
            style={{ left: `${r.x}%`, top: `${r.y}%` }}
          >
            <span
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full text-white shadow-lg ring-2 ring-background",
                pinColor[r.urgency],
              )}
            >
              <MapPin className="h-5 w-5" />
            </span>
            {(hovered === r.id || isSelected) && (
              <span className="absolute left-1/2 top-full mt-1 w-44 -translate-x-1/2 rounded-md bg-popover p-2 text-left text-xs shadow-md ring-1 ring-border">
                <span className="block font-semibold">{r.title}</span>
                <span className="block text-muted-foreground">
                  {r.distanceKm.toFixed(1)} km · {r.locationLabel}
                </span>
              </span>
            )}
          </button>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex items-center gap-3 rounded-lg bg-background/90 px-3 py-2 text-xs shadow-sm ring-1 ring-border">
        <span className="inline-flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive" aria-hidden /> Urgent
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-warning" aria-hidden /> Soon
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-success" aria-hidden /> Flexible
        </span>
      </div>
    </div>
  );
}
