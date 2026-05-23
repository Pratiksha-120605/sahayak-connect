import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RatingStars, VerifiedBadge } from "@/components/common/Badges";
import { currentBeneficiary, helpRequests } from "@/lib/mock/data";
import { toast } from "sonner";

export const Route = createFileRoute("/beneficiary/profile")({
  component: BeneficiaryProfile,
});

function BeneficiaryProfile() {
  const me = currentBeneficiary;
  const completed = helpRequests.filter(
    (r) => r.beneficiaryId === me.id && r.status === "completed",
  );
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
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                  {me.name} <VerifiedBadge />
                </h2>
                <p className="text-sm text-muted-foreground">{me.address}</p>
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
                <Label htmlFor="p-name">Full name</Label>
                <Input id="p-name" defaultValue={me.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="p-phone">Phone</Label>
                <Input id="p-phone" defaultValue={me.phone} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="p-addr">Address</Label>
                <Textarea id="p-addr" rows={2} defaultValue={me.address} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="p-disab">Type of disability (optional)</Label>
                <Input id="p-disab" defaultValue={me.disabilityType} />
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
            <CardContent className="space-y-3 p-6">
              <h3 className="font-semibold">Reputation</h3>
              {me.rating !== undefined && (
                <RatingStars value={me.rating} count={me.reviewCount} />
              )}
              <p className="text-sm text-muted-foreground">
                {completed.length} requests completed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-3 p-6">
              <h3 className="font-semibold text-destructive">Danger zone</h3>
              <p className="text-sm text-muted-foreground">
                Temporarily pause your account or permanently delete it.
              </p>
              <div className="flex flex-col gap-2">
                <Button variant="outline">Pause account</Button>
                <Button variant="outline" className="text-destructive border-destructive/40">
                  Delete account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
