import { createFileRoute, Link } from "@tanstack/react-router";
import { MailCheck } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/verify-email")({
  head: () => ({
    meta: [
      { title: "Verify your email — Sahayak" },
      { name: "description", content: "Verify your email to activate your Sahayak account." },
    ],
  }),
  component: VerifyEmail,
});

function VerifyEmail() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main id="main-content" className="flex flex-1 items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md border-border shadow-lg">
          <CardContent className="space-y-4 p-8 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary/15 text-secondary">
              <MailCheck className="h-7 w-7" aria-hidden />
            </span>
            <h1 className="text-2xl font-bold">Check your inbox</h1>
            <p className="text-sm text-muted-foreground">
              We've sent a verification link to your email. Click it to activate your
              Sahayak account.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <Button asChild>
                <Link to="/signin">I've verified — sign in</Link>
              </Button>
              <Button variant="ghost">Resend verification email</Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
