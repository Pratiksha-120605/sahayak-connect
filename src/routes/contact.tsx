import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Sahayak" },
      {
        name: "description",
        content: "Reach the Sahayak team for partnerships, support, or feedback.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    (e.target as HTMLFormElement).reset();
    toast.success("Thanks! We'll be in touch within 1 business day.");
  };
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <section className="mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Get in touch</h1>
            <p className="mt-3 text-muted-foreground">
              Questions, partnership ideas, or feedback? We read every message.
            </p>
            <dl className="mt-8 space-y-4 text-sm">
              <div>
                <dt className="font-semibold">Email</dt>
                <dd className="text-muted-foreground">hello@sahayak.community</dd>
              </div>
              <div>
                <dt className="font-semibold">Helpline</dt>
                <dd className="text-muted-foreground">+91 80-4567-8910</dd>
              </div>
              <div>
                <dt className="font-semibold">Hours</dt>
                <dd className="text-muted-foreground">Mon–Sat · 9 AM to 8 PM IST</dd>
              </div>
            </dl>
          </div>
          <form
            onSubmit={submit}
            className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
            noValidate
          >
            <div className="space-y-2">
              <Label htmlFor="c-name">Your name</Label>
              <Input id="c-name" required minLength={2} maxLength={100} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-email">Email</Label>
              <Input id="c-email" type="email" required maxLength={255} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-msg">Message</Label>
              <Textarea id="c-msg" rows={5} required maxLength={1000} />
            </div>
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Sending…" : "Send message"}
            </Button>
          </form>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
