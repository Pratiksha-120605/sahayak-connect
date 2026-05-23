import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NSSBadge, RatingStars, VerifiedBadge } from "@/components/common/Badges";
import { currentVolunteer } from "@/lib/mock/data";
import { toast } from "sonner";

export const Route = createFileRoute("/volunteer/profile")({
  component: VolunteerProfile,
});

function VolunteerProfile() {
  const me = currentVolunteer;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardContent className="space-y-5 p-6">
            <div className="flex items-center gap-4">
              <span
                aria-hidden
                className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold"
                style={{ background: me.avatarColor }}
              >
                {me.name.charAt(0)}
              </span>
              <div>
                <h2 className="flex flex-wrap items-center gap-2 text-xl font-semibold">
                  {me.name} <VerifiedBadge />
                  {me.nssMember && <NSSBadge />}
                </h2>
                {me.rating !== undefined && (
                  <RatingStars value={me.rating} count={me.reviewCount} />
                )}
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Profile updated.");
              }}
              className="grid gap-4 sm:grid-cols-2"
            >
              <div className="space-y-2">
                <Label htmlFor="vp-name">Full name</Label>
                <Input id="vp-name" defaultValue={me.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vp-phone">Phone</Label>
                <Input id="vp-phone" defaultValue={me.phone} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="vp-email">Email</Label>
                <Input id="vp-email" type="email" defaultValue={me.email} />
              </div>
              <div className="sm:col-span-2 flex justify-end gap-2">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit">Save changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-2 p-6">
              <h3 className="font-semibold">Verification</h3>
              <p className="text-sm text-muted-foreground">ID verified · Background check passed</p>
              {me.nssMember && (
                <p className="text-sm text-muted-foreground">NSS Member · ID NSS-2024-1789</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-2 p-6">
              <h3 className="font-semibold">Impact</h3>
              <p className="text-sm">
                {me.requestsCompleted} requests · {me.hoursVolunteered} hours
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
