import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RequestCard } from "@/components/requests/RequestCard";
import { Card, CardContent } from "@/components/ui/card";
import { currentVolunteer, helpRequests as initial } from "@/lib/mock/data";
import { Timer } from "lucide-react";

export const Route = createFileRoute("/volunteer/active")({
  component: VolunteerActive,
});

function VolunteerActive() {
  const [requests, setRequests] = useState(initial);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const active = requests.filter(
    (r) =>
      r.matchedVolunteerId === currentVolunteer.id &&
      (r.status === "matched" || r.status === "in_progress"),
  );

  const complete = (id: string) => {
    setRequests((rs) => rs.map((r) => (r.id === id ? { ...r, status: "completed" } : r)));
    toast.success("Marked complete. Thanks for helping!");
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Active sessions</h1>
          <p className="text-sm text-muted-foreground">
            Your ongoing matches — keep the beneficiary updated in chat.
          </p>
        </div>
        {active.length > 0 && (
          <Card className="bg-accent/10">
            <CardContent className="flex items-center gap-3 p-3">
              <Timer className="h-5 w-5 text-accent" aria-hidden />
              <div>
                <div className="text-xs text-muted-foreground">Session timer</div>
                <div className="font-mono text-lg font-semibold">
                  {mm}:{ss}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {active.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center text-muted-foreground">
            No active sessions. Accept a request to get started.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {active.map((r) => (
            <RequestCard
              key={r.id}
              request={r}
              perspective="volunteer"
              onComplete={complete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
