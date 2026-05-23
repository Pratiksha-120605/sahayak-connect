import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowRight, HeartHandshake, ListChecks, MessageCircle } from "lucide-react";
import { NewRequestDialog } from "@/components/requests/NewRequestDialog";
import { RequestCard } from "@/components/requests/RequestCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { currentBeneficiary, helpRequests } from "@/lib/mock/data";

export const Route = createFileRoute("/beneficiary/")({
  component: BeneficiaryHome,
});

function BeneficiaryHome() {
  const myRequests = useMemo(
    () => helpRequests.filter((r) => r.beneficiaryId === currentBeneficiary.id),
    [],
  );
  const active = myRequests.filter((r) => r.status !== "completed" && r.status !== "cancelled");

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold sm:text-3xl">Hi {currentBeneficiary.name.split(" ")[0]} 👋</h1>
            <p className="text-muted-foreground">
              Need a hand today? Post a request and verified volunteers nearby will be notified.
            </p>
          </div>
          <NewRequestDialog />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={ListChecks}
          label="Active requests"
          value={active.length.toString()}
          tone="primary"
        />
        <StatCard
          icon={HeartHandshake}
          label="Volunteers helped you"
          value={(myRequests.filter((r) => r.matchedVolunteerId).length).toString()}
          tone="secondary"
        />
        <StatCard
          icon={MessageCircle}
          label="Unread messages"
          value="1"
          tone="accent"
        />
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Active requests</h2>
          <Button variant="ghost" asChild>
            <Link to="/beneficiary/requests">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        {active.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-3">
            {active.map((r) => (
              <RequestCard key={r.id} request={r} perspective="beneficiary" />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof HeartHandshake;
  label: string;
  value: string;
  tone: "primary" | "secondary" | "accent";
}) {
  const toneStyles = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/15 text-secondary",
    accent: "bg-accent/15 text-foreground",
  }[tone];
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${toneStyles}`}>
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <Card className="border-dashed">
      <CardContent className="p-8 text-center text-muted-foreground">
        No active requests yet — when you post one, it'll appear here.
      </CardContent>
    </Card>
  );
}
