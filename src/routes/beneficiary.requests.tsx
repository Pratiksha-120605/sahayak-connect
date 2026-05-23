import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { NewRequestDialog } from "@/components/requests/NewRequestDialog";
import { RequestCard } from "@/components/requests/RequestCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { currentBeneficiary, helpRequests } from "@/lib/mock/data";

export const Route = createFileRoute("/beneficiary/requests")({
  component: BeneficiaryRequests,
});

function BeneficiaryRequests() {
  const mine = useMemo(
    () => helpRequests.filter((r) => r.beneficiaryId === currentBeneficiary.id),
    [],
  );
  const [filter, setFilter] = useState("");

  const filtered = (list: typeof mine) =>
    filter
      ? list.filter((r) => r.title.toLowerCase().includes(filter.toLowerCase()))
      : list;

  const active = mine.filter((r) => r.status !== "completed" && r.status !== "cancelled");
  const past = mine.filter((r) => r.status === "completed" || r.status === "cancelled");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">My requests</h1>
          <p className="text-sm text-muted-foreground">
            Track active matches and revisit past help.
          </p>
        </div>
        <NewRequestDialog />
      </div>

      <div className="max-w-sm">
        <Label htmlFor="filter" className="sr-only">
          Filter requests
        </Label>
        <Input
          id="filter"
          placeholder="Filter by title…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active ({active.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4 space-y-3">
          {filtered(active).length === 0 ? (
            <p className="text-sm text-muted-foreground">No active requests.</p>
          ) : (
            filtered(active).map((r) => (
              <RequestCard key={r.id} request={r} perspective="beneficiary" />
            ))
          )}
        </TabsContent>
        <TabsContent value="past" className="mt-4 space-y-3">
          {filtered(past).length === 0 ? (
            <p className="text-sm text-muted-foreground">No past requests.</p>
          ) : (
            filtered(past).map((r) => (
              <RequestCard key={r.id} request={r} perspective="beneficiary" />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
