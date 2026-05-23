import { ClipboardList, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: ClipboardList,
    title: "Post help requests in seconds",
    body: "Tell us what you need, where, and when. Categories from groceries to medical visits.",
  },
  {
    icon: MapPin,
    title: "Real-time nearby matching",
    body: "Volunteers in your chosen radius are notified instantly so help arrives fast.",
  },
  {
    icon: ShieldCheck,
    title: "Verified volunteers only",
    body: "Background-checked helpers, with NSS-member badges, reviews, and ratings.",
  },
  {
    icon: Sparkles,
    title: "Safety built in",
    body: "Emergency SOS, location sharing, in-app chat, and a clear reporting flow.",
  },
];

export function FeatureCards() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">Designed for trust and ease</h2>
        <p className="mt-3 text-muted-foreground">
          Every feature is built around accessibility, dignity, and real-world safety.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <Card key={f.title} className="border-border transition-shadow hover:shadow-md">
            <CardContent className="space-y-3 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
