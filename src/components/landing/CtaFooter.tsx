import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CtaFooter() {
  return (
    <section className="border-t border-border bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Get started today — be part of someone's good day.
        </h2>
        <p className="mt-3 text-base text-primary-foreground/85">
          Whether you need a hand or want to lend one, joining takes less than a minute.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" variant="secondary" asChild className="h-12 text-base">
            <Link to="/signup">Create an account</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="h-12 border-primary-foreground/40 bg-transparent text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            <Link to="/about">Learn more</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
