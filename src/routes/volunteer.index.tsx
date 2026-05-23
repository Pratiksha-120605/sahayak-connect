import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, MapPin } from "lucide-react";
import { toast } from "sonner";
import { MockMap } from "@/components/map/MockMap";
import { helpRequests, getUser } from "@/lib/mock/data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UrgencyPill } from "@/components/requests/RequestCard";
import { VerifiedBadge } from "@/components/common/Badges";
import type { HelpRequest } from "@/lib/types";

export const Route = createFileRoute("/volunteer/")({
  component: VolunteerMap,
});

function VolunteerMap() {
  const open = helpRequests.filter((r) => r.status === "open");
  const [radius, setRadius] = useState("5");
  const [selected, setSelected] = useState<HelpRequest | undefined>();

  const radiusVal = Number(radius);
  const visible = open.filter((r) => r.distanceKm <= radiusVal);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Nearby requests</h1>
          <p className="text-sm text-muted-foreground">
            {visible.length} open within {radius} km
          </p>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="radius" className="text-sm text-muted-foreground">
            Radius
          </label>
          <Select value={radius} onValueChange={setRadius}>
            <SelectTrigger id="radius" className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 km</SelectItem>
              <SelectItem value="5">5 km</SelectItem>
              <SelectItem value="10">10 km</SelectItem>
              <SelectItem value="20">20 km</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <MockMap
          requests={visible}
          radius={Math.min(40, radiusVal * 4)}
          selectedId={selected?.id}
          onSelect={(r) => setSelected(r)}
        />
        <aside aria-label="Request details" className="space-y-3">
          {selected ? (
            <RequestDetail request={selected} onClear={() => setSelected(undefined)} />
          ) : (
            <Card className="border-dashed">
              <CardContent className="p-6 text-sm text-muted-foreground">
                Tap a pin on the map to see request details and accept.
              </CardContent>
            </Card>
          )}
          <Card>
            <CardContent className="space-y-2 p-4">
              <h3 className="text-sm font-semibold">Quick list</h3>
              <ul className="divide-y divide-border">
                {visible.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => setSelected(r)}
                      className="w-full py-2 text-left hover:bg-muted/60"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium">{r.title}</span>
                        <UrgencyPill urgency={r.urgency} />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {r.distanceKm.toFixed(1)} km · {r.locationLabel}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function RequestDetail({
  request,
  onClear,
}: {
  request: HelpRequest;
  onClear: () => void;
}) {
  const beneficiary = getUser(request.beneficiaryId);
  return (
    <Card>
      <CardContent className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold">{request.title}</h3>
          <UrgencyPill urgency={request.urgency} />
        </div>
        <p className="text-sm text-foreground/80">{request.description}</p>
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" aria-hidden /> {request.locationLabel} ·{" "}
            {request.distanceKm.toFixed(1)} km
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" aria-hidden /> {request.preferredTime} · ~
            {Math.round(request.distanceKm * 4)} min away
          </div>
        </div>
        {beneficiary && (
          <div className="flex items-center gap-2 rounded-md bg-muted/40 p-2 text-sm">
            <span
              aria-hidden
              className="flex h-8 w-8 items-center justify-center rounded-full font-semibold"
              style={{ background: beneficiary.avatarColor }}
            >
              {beneficiary.name.charAt(0)}
            </span>
            <span className="font-medium">{beneficiary.name}</span>
            <VerifiedBadge />
          </div>
        )}
        <div className="flex gap-2">
          <Button
            className="flex-1"
            onClick={() => {
              toast.success(`Accepted "${request.title}". Opening chat…`);
              onClear();
            }}
          >
            Accept request
          </Button>
          <Button variant="outline" onClick={onClear}>
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
