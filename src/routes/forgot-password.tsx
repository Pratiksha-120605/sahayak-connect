import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — Sahayak" },
      { name: "description", content: "Reset your Sahayak account password securely." },
    ],
  }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 400));
    setSent(true);
    toast.success("Password reset link sent (demo).");
  };
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main id="main-content" className="flex flex-1 items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md border-border shadow-lg">
          <CardContent className="space-y-5 p-8">
            <div>
              <h1 className="text-2xl font-bold">Forgot password</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Enter your account email and we'll send you a secure reset link.
              </p>
            </div>
            {sent ? (
              <div className="rounded-md border border-success/40 bg-success/10 p-4 text-sm">
                If an account exists for that email, a reset link is on its way.
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="fp-email">Email</Label>
                  <Input id="fp-email" type="email" required />
                </div>
                <Button type="submit" className="w-full">
                  Send reset link
                </Button>
              </form>
            )}
            <p className="text-center text-sm text-muted-foreground">
              <Link to="/signin" className="font-medium text-primary hover:underline">
                Back to sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
