import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/landing/Hero";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { CtaFooter } from "@/components/landing/CtaFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sahayak — Volunteer help, right when you need it" },
      {
        name: "description",
        content:
          "Sahayak connects people with mobility challenges to verified nearby volunteers for real-time help with everyday tasks.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Hero />
        <FeatureCards />
        <HowItWorks />
        <Testimonials />
        <CtaFooter />
      </main>
      <SiteFooter />
    </div>
  );
}
