import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in — Sahayak" },
      { name: "description", content: "Sign in to your Sahayak account as a beneficiary or volunteer." },
    ],
  }),
  component: SignIn,
});

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["beneficiary", "volunteer"]),
});
type Values = z.infer<typeof schema>;

function SignIn() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { role: "beneficiary" },
  });

  const onSubmit = async (v: Values) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    setSubmitting(false);
    toast.success("Welcome back!");
    navigate({ to: v.role === "beneficiary" ? "/beneficiary" : "/volunteer" });
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main id="main-content" className="flex flex-1 items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md border-border shadow-lg">
          <CardContent className="space-y-6 p-6 sm:p-8">
            <div>
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Sign in to continue helping or being helped.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <fieldset className="space-y-2">
                <legend className="text-sm font-medium">I'm signing in as</legend>
                <RadioGroup
                  defaultValue="beneficiary"
                  className="grid grid-cols-2 gap-2"
                  onValueChange={(v) => setValue("role", v as Values["role"])}
                >
                  <label
                    htmlFor="role-b"
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-border p-3 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                  >
                    <RadioGroupItem id="role-b" value="beneficiary" />
                    Beneficiary
                  </label>
                  <label
                    htmlFor="role-v"
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-border p-3 text-sm has-[:checked]:border-secondary has-[:checked]:bg-secondary/5"
                  >
                    <RadioGroupItem id="role-v" value="volunteer" />
                    Volunteer
                  </label>
                </RadioGroup>
              </fieldset>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-err" : undefined}
                  {...register("email")}
                />
                {errors.email && (
                  <p id="email-err" className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Forgot?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "pw-err" : undefined}
                  {...register("password")}
                />
                {errors.password && (
                  <p id="pw-err" className="text-xs text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Signing in…" : "Sign in"}
              </Button>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
              </div>

              <Button type="button" variant="outline" className="w-full">
                Continue with Google
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                New here?{" "}
                <Link to="/signup" className="font-medium text-primary hover:underline">
                  Create an account
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
