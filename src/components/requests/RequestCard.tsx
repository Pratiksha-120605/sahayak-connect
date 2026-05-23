import { Link } from "@tanstack/react-router";
import { Clock, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { HelpRequest, RequestStatus, Urgency, User } from "@/lib/types";
import { getUser } from "@/lib/mock/data";
import { RatingStars, VerifiedBadge } from "@/components/common/Badges";

const urgencyStyles: Record<Urgency, string> = {
  high: "bg-destructive/10 text-destructive border-destructive/30",
  medium: "bg-warning/15 text-foreground border-warning/40",
  low: "bg-success/10 text-success border-success/30",
};

const urgencyLabel: Record<Urgency, string> = {
  high: "Urgent",
  medium: "Soon",
  low: "Flexible",
};

const statusStyles: Record<RequestStatus, string> = {
  open: "bg-primary/10 text-primary",
  matched: "bg-secondary/15 text-secondary",
  in_progress: "bg-accent/15 text-foreground",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-muted text-muted-foreground line-through",
};

const statusLabel: Record<RequestStatus, string> = {
  open: "Open",
  matched: "Matched",
  in_progress: "In progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function UrgencyPill({ urgency }: { urgency: Urgency }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        urgencyStyles[urgency],
      )}
    >
      <span aria-hidden>●</span> {urgencyLabel[urgency]}
    </span>
  );
}

export function RequestStatusBadge({ status }: { status: RequestStatus }) {
  return (
    <Badge variant="secondary" className={cn("border-0", statusStyles[status])}>
      {statusLabel[status]}
    </Badge>
  );
}

interface Props {
  request: HelpRequest;
  perspective: "beneficiary" | "volunteer";
  onAccept?: (id: string) => void;
  onComplete?: (id: string) => void;
}

export function RequestCard({ request, perspective, onAccept, onComplete }: Props) {
  const matched: User | undefined = request.matchedVolunteerId
    ? getUser(request.matchedVolunteerId)
    : undefined;
  const beneficiary = getUser(request.beneficiaryId);
  const showVolunteer = perspective === "beneficiary" && matched;
  const showBeneficiary = perspective === "volunteer" && beneficiary;

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="space-y-3 p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="space-y-1">
            <h3 className="text-base font-semibold leading-tight">{request.title}</h3>
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" aria-hidden /> {request.locationLabel}
              </span>
              <span aria-hidden>·</span>
              <span>{request.distanceKm.toFixed(1)} km away</span>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden /> {request.preferredTime}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <UrgencyPill urgency={request.urgency} />
            <RequestStatusBadge status={request.status} />
          </div>
        </div>

        <p className="text-sm text-foreground/80">{request.description}</p>

        {showVolunteer && matched && (
          <div className="flex items-center justify-between rounded-md border border-border bg-muted/40 p-2">
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
                style={{ background: matched.avatarColor }}
              >
                {matched.name.charAt(0)}
              </span>
              <div className="text-sm">
                <div className="flex items-center gap-2 font-medium">
                  {matched.name} <VerifiedBadge />
                </div>
                {matched.rating !== undefined && (
                  <RatingStars value={matched.rating} count={matched.reviewCount} />
                )}
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/beneficiary/messages" aria-label={`Message ${matched.name}`}>
                <MessageCircle className="mr-1 h-4 w-4" /> Message
              </Link>
            </Button>
          </div>
        )}

        {showBeneficiary && beneficiary && (
          <div className="flex items-center justify-between rounded-md border border-border bg-muted/40 p-2">
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
                style={{ background: beneficiary.avatarColor }}
              >
                {beneficiary.name.charAt(0)}
              </span>
              <div className="text-sm">
                <div className="flex items-center gap-2 font-medium">
                  {beneficiary.name} <VerifiedBadge />
                </div>
                <div className="text-xs text-muted-foreground">{beneficiary.address}</div>
              </div>
            </div>
          </div>
        )}

        {request.review && (
          <blockquote className="rounded-md border-l-2 border-accent bg-muted/40 p-3 text-sm italic text-foreground/80">
            "{request.review}"
            {request.rating && (
              <div className="not-italic mt-1">
                <RatingStars value={request.rating} />
              </div>
            )}
          </blockquote>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/request/$requestId" params={{ requestId: request.id }}>
              View details
            </Link>
          </Button>
          <div className="flex gap-2">
            {perspective === "volunteer" && request.status === "open" && onAccept && (
              <Button onClick={() => onAccept(request.id)} size="sm">
                Accept request
              </Button>
            )}
            {perspective === "volunteer" &&
              request.status === "in_progress" &&
              onComplete && (
                <Button
                  size="sm"
                  className="bg-success text-success-foreground hover:bg-success/90"
                  onClick={() => onComplete(request.id)}
                >
                  Mark complete
                </Button>
              )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
