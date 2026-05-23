import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a new password — Sahayak" },
      { name: "description", content: "Set a new password for your Sahayak account." },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (form.get("pw1") !== form.get("pw2")) {
      toast.error("Passwords don't match.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    setSubmitting(false);
    toast.success("Password updated. Please sign in.");
    navigate({ to: "/signin" });
  };
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main id="main-content" className="flex flex-1 items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md border-border shadow-lg">
          <CardContent className="space-y-5 p-8">
            <div>
              <h1 className="text-2xl font-bold">Set a new password</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Choose a strong password you'll remember.
              </p>
            </div>
            <form onSubmit={submit} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="pw1">New password</Label>
                <Input id="pw1" name="pw1" type="password" minLength={6} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pw2">Confirm password</Label>
                <Input id="pw2" name="pw2" type="password" minLength={6} required />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Updating…" : "Update password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
