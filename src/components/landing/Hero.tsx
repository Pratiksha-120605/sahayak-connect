import { Link } from "@tanstack/react-router";
import { ArrowRight, HeartHandshake, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary">
            <HeartHandshake className="h-4 w-4" aria-hidden /> Community-powered help
          </span>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Real help, from neighbours you can trust.
          </h1>
          <p className="text-lg text-muted-foreground">
            Sahayak connects people who need an extra hand with verified volunteers
            nearby — for groceries, mobility, medical visits, or simply company on a walk.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild className="h-12 text-base">
              <Link to="/signup">
                Sign up as a beneficiary <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary text-base"
            >
              <Link to="/signup">
                Volunteer with us <Users className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
            <div>
              <div className="text-2xl font-bold text-foreground">2,400+</div>
              Verified volunteers
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">18k</div>
              Tasks completed
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">4.9★</div>
              Avg. rating
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/15 to-accent/15 blur-2xl" aria-hidden />
          <div className="relative rounded-3xl border border-border bg-card p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/20 text-secondary font-bold"
              >
                A
              </span>
              <div>
                <div className="text-sm font-semibold">Asha posted a request</div>
                <div className="text-xs text-muted-foreground">2 min ago · 0.5 km away</div>
              </div>
              <span className="ml-auto rounded-full bg-warning/20 px-2 py-0.5 text-xs font-medium">
                Soon
              </span>
            </div>
            <p className="mt-4 text-sm text-foreground/80">
              "Looking for help picking up a prescription from Apollo Pharmacy — payment
              already done via UPI."
            </p>
            <div className="mt-4 rounded-lg border border-border bg-muted/40 p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">3 verified volunteers nearby</span>
                <span className="text-xs text-muted-foreground">ETA 8 min</span>
              </div>
              <div className="mt-2 flex -space-x-2">
                {["R", "P", "K"].map((c, i) => (
                  <span
                    key={c}
                    aria-hidden
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card text-xs font-semibold text-white"
                    style={{
                      background: ["oklch(0.78 0.16 262)", "oklch(0.78 0.15 25)", "oklch(0.78 0.14 70)"][i],
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Match volunteer
              </Button>
              <Button size="sm" variant="ghost">
                See nearby
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
