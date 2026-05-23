import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/volunteer/availability")({
  component: Availability,
});

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

function Availability() {
  const [active, setActive] = useState(true);
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    Mon: true,
    Tue: true,
    Wed: true,
    Thu: true,
    Fri: true,
    Sat: true,
    Sun: false,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Availability</h1>
        <p className="text-sm text-muted-foreground">
          Control when you'll receive new request notifications.
        </p>
      </div>

      <Card>
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <h2 className="font-semibold">Accept new requests</h2>
            <p className="text-sm text-muted-foreground">
              When off, you'll stay matched on active sessions but won't get new ones.
            </p>
          </div>
          <Switch checked={active} onCheckedChange={setActive} aria-label="Accept new requests" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4 p-5">
          <h2 className="font-semibold">Weekly hours</h2>
          <div className="grid gap-3">
            {days.map((d) => (
              <div
                key={d}
                className="flex flex-wrap items-center gap-3 rounded-md border border-border p-3"
              >
                <Switch
                  checked={enabled[d]}
                  onCheckedChange={(c) => setEnabled((prev) => ({ ...prev, [d]: c }))}
                  aria-label={`Available on ${d}`}
                />
                <span className="w-12 font-medium">{d}</span>
                <div className="flex flex-1 items-center gap-2">
                  <Label htmlFor={`${d}-from`} className="sr-only">
                    From
                  </Label>
                  <Input id={`${d}-from`} type="time" defaultValue="09:00" disabled={!enabled[d]} />
                  <span aria-hidden>–</span>
                  <Label htmlFor={`${d}-to`} className="sr-only">
                    To
                  </Label>
                  <Input id={`${d}-to`} type="time" defaultValue="18:00" disabled={!enabled[d]} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button onClick={() => toast.success("Availability saved.")}>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
