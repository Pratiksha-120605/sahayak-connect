import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { RequestCard } from "@/components/requests/RequestCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { helpRequests as initial } from "@/lib/mock/data";

export const Route = createFileRoute("/volunteer/requests")({
  component: VolunteerRequests,
});

type SortKey = "distance" | "urgency" | "newest";
const urgencyRank = { high: 0, medium: 1, low: 2 } as const;

function VolunteerRequests() {
  const [requests, setRequests] = useState(initial);
  const [sort, setSort] = useState<SortKey>("urgency");
  const [type, setType] = useState<string>("all");

  const list = requests
    .filter((r) => r.status === "open")
    .filter((r) => (type === "all" ? true : r.type === type))
    .sort((a, b) => {
      if (sort === "distance") return a.distanceKm - b.distanceKm;
      if (sort === "newest") return b.createdAt.localeCompare(a.createdAt);
      return urgencyRank[a.urgency] - urgencyRank[b.urgency];
    });

  const accept = (id: string) => {
    setRequests((rs) =>
      rs.map((r) =>
        r.id === id ? { ...r, status: "matched", matchedVolunteerId: "u-v1" } : r,
      ),
    );
    toast.success("Request accepted. Coordinate via chat.");
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Open requests</h1>
        <p className="text-sm text-muted-foreground">
          Sort and filter requests to find the best match for you.
        </p>
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <div className="space-y-1">
          <Label htmlFor="sort">Sort by</Label>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger id="sort" className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="urgency">Urgency</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
              <SelectItem value="newest">Newest first</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="type">Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="type" className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="mobility">Mobility</SelectItem>
              <SelectItem value="grocery">Grocery</SelectItem>
              <SelectItem value="medical">Medical</SelectItem>
              <SelectItem value="companionship">Companionship</SelectItem>
              <SelectItem value="errand">Errand</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-3">
        {list.length === 0 ? (
          <p className="text-sm text-muted-foreground">No open requests match your filters.</p>
        ) : (
          list.map((r) => (
            <RequestCard key={r.id} request={r} perspective="volunteer" onAccept={accept} />
          ))
        )}
      </div>
    </div>
  );
}
