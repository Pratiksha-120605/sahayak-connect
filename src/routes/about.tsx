import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Sahayak — A community help platform" },
      {
        name: "description",
        content:
          "Sahayak is a volunteer matching platform building an inclusive ecosystem of care for people with mobility challenges.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="text-4xl font-bold tracking-tight">About Sahayak</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We believe an inclusive city begins with neighbours who show up. Sahayak
            is a real-time volunteer matching platform built specifically for the
            everyday support people with mobility challenges deserve.
          </p>
          <div className="mt-10 space-y-8">
            <article>
              <h2 className="text-2xl font-semibold">Our mission</h2>
              <p className="mt-2 text-foreground/80">
                To remove the small daily barriers — a flight of stairs, a grocery trip, a
                clinic visit — by connecting beneficiaries with verified volunteers who
                live nearby and want to help.
              </p>
            </article>
            <article>
              <h2 className="text-2xl font-semibold">Built with care</h2>
              <p className="mt-2 text-foreground/80">
                Sahayak is designed for accessibility from the first pixel: high
                contrast, large tap targets, keyboard navigation, screen reader
                support, and warm, empowering language.
              </p>
            </article>
            <article>
              <h2 className="text-2xl font-semibold">Powered by NSS &amp; community</h2>
              <p className="mt-2 text-foreground/80">
                We partner with NSS units across colleges so every volunteer is verified
                and accountable. Reviews and ratings keep the bar high.
              </p>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
