import { Quote } from "lucide-react";

const stories = [
  {
    name: "Asha M.",
    role: "Beneficiary, Bengaluru",
    quote:
      "I no longer wait for family to be free. Within 10 minutes, a kind volunteer was on the way with my medicines.",
    color: "oklch(0.8 0.13 162)",
  },
  {
    name: "Rohan I.",
    role: "Volunteer, NSS member",
    quote:
      "Sahayak makes it easy to help during my college breaks. The verification and chat keep everyone safe.",
    color: "oklch(0.78 0.16 262)",
  },
  {
    name: "Meera J.",
    role: "Beneficiary, Koramangala",
    quote:
      "Having a regular companion for my evening walks has been life-changing. Thank you, Sahayak.",
    color: "oklch(0.8 0.12 320)",
  },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">Stories from our community</h2>
        <p className="mt-3 text-muted-foreground">
          Real experiences from beneficiaries and volunteers across India.
        </p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {stories.map((s) => (
          <figure
            key={s.name}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <Quote className="h-6 w-6 text-accent" aria-hidden />
            <blockquote className="mt-3 text-sm text-foreground/90">"{s.quote}"</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold"
                style={{ background: s.color }}
              >
                {s.name.charAt(0)}
              </span>
              <span>
                <span className="block text-sm font-semibold">{s.name}</span>
                <span className="block text-xs text-muted-foreground">{s.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
