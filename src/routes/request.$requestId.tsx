import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MockMap } from "@/components/map/MockMap";
import {
  RequestStatusBadge,
  UrgencyPill,
} from "@/components/requests/RequestCard";
import { NSSBadge, RatingStars, VerifiedBadge } from "@/components/common/Badges";
import { getUser, helpRequests } from "@/lib/mock/data";

export const Route = createFileRoute("/request/$requestId")({
  loader: ({ params }) => {
    const request = helpRequests.find((r) => r.id === params.requestId);
    if (!request) throw notFound();
    return { request };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.request.title ?? "Request"} — Sahayak` },
      {
        name: "description",
        content:
          loaderData?.request.description ?? "Help request details on Sahayak.",
      },
    ],
  }),
  component: RequestDetailPage,
  notFoundComponent: () => (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Request not found</h1>
        <p className="mt-2 text-muted-foreground">
          This request may have been removed or completed.
        </p>
        <Button asChild className="mt-4">
          <Link to="/volunteer">Back to nearby requests</Link>
        </Button>
      </div>
    </div>
  ),
});

function RequestDetailPage() {
  const { request } = Route.useLoaderData();
  const beneficiary = getUser(request.beneficiaryId);
  const matched = request.matchedVolunteerId
    ? getUser(request.matchedVolunteerId)
    : undefined;

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8">
          <Button variant="ghost" asChild className="-ml-3">
            <Link to="/volunteer">
              <ArrowLeft className="mr-1 h-4 w-4" /> Back
            </Link>
          </Button>

          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <Card>
              <CardContent className="space-y-4 p-6">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h1 className="text-2xl font-bold">{request.title}</h1>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-4 w-4" aria-hidden /> {request.locationLabel}
                      </span>
                      <span aria-hidden>·</span>
                      <span>{request.distanceKm.toFixed(1)} km</span>
                      <span aria-hidden>·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-4 w-4" aria-hidden /> {request.preferredTime}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <UrgencyPill urgency={request.urgency} />
                    <RequestStatusBadge status={request.status} />
                  </div>
                </div>
                <p className="text-base text-foreground/90">{request.description}</p>

                <MockMap requests={[request]} radius={20} selectedId={request.id} />

                <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                  {request.status === "open" && (
                    <>
                      <Button
                        onClick={() => toast.success("Request accepted.")}
                        className="flex-1"
                      >
                        Accept request
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => toast("Declined.")}
                      >
                        Decline
                      </Button>
                    </>
                  )}
                  {request.status === "matched" && (
                    <Button asChild>
                      <Link to="/volunteer/messages">Open chat</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <aside className="space-y-4" aria-label="People & safety info">
              {beneficiary && (
                <Card>
                  <CardContent className="space-y-3 p-5">
                    <h2 className="text-sm font-semibold text-muted-foreground">
                      Beneficiary
                    </h2>
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="flex h-12 w-12 items-center justify-center rounded-full text-base font-bold"
                        style={{ background: beneficiary.avatarColor }}
                      >
                        {beneficiary.name.charAt(0)}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 font-semibold">
                          {beneficiary.name} <VerifiedBadge />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {beneficiary.address}
                        </div>
                      </div>
                    </div>
                    {beneficiary.rating !== undefined && (
                      <RatingStars
                        value={beneficiary.rating}
                        count={beneficiary.reviewCount}
                      />
                    )}
                  </CardContent>
                </Card>
              )}
              {matched && (
                <Card>
                  <CardContent className="space-y-3 p-5">
                    <h2 className="text-sm font-semibold text-muted-foreground">
                      Matched volunteer
                    </h2>
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="flex h-12 w-12 items-center justify-center rounded-full text-base font-bold"
                        style={{ background: matched.avatarColor }}
                      >
                        {matched.name.charAt(0)}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 font-semibold">
                          {matched.name} <VerifiedBadge />
                          {matched.nssMember && <NSSBadge />}
                        </div>
                        {matched.rating !== undefined && (
                          <RatingStars
                            value={matched.rating}
                            count={matched.reviewCount}
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              <Card className="border-secondary/30 bg-secondary/5">
                <CardContent className="space-y-2 p-5">
                  <h2 className="text-sm font-semibold">Safety</h2>
                  <p className="text-sm text-muted-foreground">
                    All matched volunteers are background-verified. Use the in-app
                    chat — never share payment details outside Sahayak.
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/safety">Learn more about safety</Link>
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
