import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { RequestCard } from "@/components/requests/RequestCard";
import { currentVolunteer, helpRequests } from "@/lib/mock/data";
import { Award, Clock, Users } from "lucide-react";

export const Route = createFileRoute("/volunteer/history")({
  component: VolunteerHistory,
});

function VolunteerHistory() {
  const me = currentVolunteer;
  const completed = helpRequests.filter(
    (r) => r.matchedVolunteerId === me.id && r.status === "completed",
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Your impact</h1>
        <p className="text-sm text-muted-foreground">
          Every task completed makes someone's day easier.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat icon={Users} label="People helped" value={me.requestsCompleted ?? 0} tone="primary" />
        <Stat icon={Clock} label="Hours volunteered" value={me.hoursVolunteered ?? 0} tone="secondary" />
        <Stat icon={Award} label="Average rating" value={me.rating?.toFixed(1) ?? "—"} tone="accent" />
      </div>
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Past assignments</h2>
        {completed.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              Your completed requests will appear here.
            </CardContent>
          </Card>
        ) : (
          completed.map((r) => (
            <RequestCard key={r.id} request={r} perspective="volunteer" />
          ))
        )}
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof Users;
  label: string;
  value: string | number;
  tone: "primary" | "secondary" | "accent";
}) {
  const styles = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/15 text-secondary",
    accent: "bg-accent/15 text-foreground",
  }[tone];
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-5">
        <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${styles}`}>
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
