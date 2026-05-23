import { CheckCircle2, HandHeart, MessageCircle, Search } from "lucide-react";

const steps = [
  { icon: Search, title: "Request", body: "Beneficiary describes the help needed and chosen radius." },
  { icon: HandHeart, title: "Match", body: "Verified volunteers nearby get notified in real time." },
  { icon: MessageCircle, title: "Help", body: "Chat, share location, and coordinate the task safely." },
  { icon: CheckCircle2, title: "Review", body: "Both sides rate each other to keep the community strong." },
];

export function HowItWorks() {
  return (
    <section className="border-y border-border bg-muted/40">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
          <p className="mt-3 text-muted-foreground">
            From the first request to a thank-you — four simple steps.
          </p>
        </div>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <span
                aria-hidden
                className="absolute -top-3 left-6 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
              >
                {i + 1}
              </span>
              <s.icon className="h-6 w-6 text-secondary" aria-hidden />
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
