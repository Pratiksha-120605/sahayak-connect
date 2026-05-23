import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, BadgeCheck, Flag, Lock, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Safety & verification — Sahayak" },
      {
        name: "description",
        content:
          "How Sahayak keeps the community safe — verification, privacy controls, emergency contacts, and reporting.",
      },
    ],
  }),
  component: Safety,
});

const items = [
  {
    icon: BadgeCheck,
    title: "Verified volunteers only",
    body: "Every volunteer completes ID verification. NSS members get an additional badge tied to their college unit.",
  },
  {
    icon: ShieldCheck,
    title: "Background checks",
    body: "Volunteers consent to a background check before being matched with any request.",
  },
  {
    icon: AlertTriangle,
    title: "Emergency SOS",
    body: "A one-tap SOS button on every dashboard alerts your emergency contacts and Sahayak's support team.",
  },
  {
    icon: Lock,
    title: "Privacy by default",
    body: "Your address is only shared when a volunteer is matched. You choose what to reveal.",
  },
  {
    icon: Flag,
    title: "Easy reporting",
    body: "Report inappropriate behaviour in one tap. Our team responds within a few hours.",
  },
];

function Safety() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-16">
          <h1 className="text-4xl font-bold tracking-tight">Safety &amp; verification</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Trust is the foundation of Sahayak. Here's how we make sure every
            interaction is safe and respectful.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {items.map((it) => (
              <Card key={it.title} className="border-border">
                <CardContent className="space-y-3 p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <it.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h2 className="text-lg font-semibold">{it.title}</h2>
                  <p className="text-sm text-muted-foreground">{it.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-6">
            <h3 className="text-lg font-semibold">Need to report something?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Our trust &amp; safety team is available 24/7. We'll respond within a few hours.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild>
                <Link to="/contact">Contact support</Link>
              </Button>
              <Button variant="outline">Download privacy guide (PDF)</Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
