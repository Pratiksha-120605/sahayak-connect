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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up — Sahayak" },
      {
        name: "description",
        content:
          "Create your Sahayak account — join as a beneficiary seeking help or as a verified volunteer.",
      },
    ],
  }),
  component: SignUp,
});

const baseFields = {
  name: z.string().trim().min(2, "Enter your full name").max(100),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20)
    .regex(/^[\d+\-\s()]+$/, "Digits, spaces, and +-() only"),
  password: z.string().min(6, "At least 6 characters"),
};

const beneficiarySchema = z.object({
  ...baseFields,
  address: z.string().trim().min(4).max(200),
  disabilityType: z.string().max(100).optional(),
  emergencyContact: z.string().trim().min(5).max(60),
});

const volunteerSchema = z.object({
  ...baseFields,
  nssId: z.string().max(50).optional(),
  availability: z.string().trim().min(2).max(120),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Background verification consent is required" }),
  }),
});

type BenValues = z.infer<typeof beneficiarySchema>;
type VolValues = z.infer<typeof volunteerSchema>;

function SignUp() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main id="main-content" className="flex flex-1 items-center justify-center px-4 py-10">
        <Card className="w-full max-w-2xl border-border shadow-lg">
          <CardContent className="space-y-6 p-6 sm:p-8">
            <div>
              <h1 className="text-2xl font-bold">Create your Sahayak account</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Choose how you'd like to join the community.
              </p>
            </div>

            <Tabs defaultValue="beneficiary">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="beneficiary">I need help</TabsTrigger>
                <TabsTrigger value="volunteer">I want to volunteer</TabsTrigger>
              </TabsList>
              <TabsContent value="beneficiary" className="mt-6">
                <BeneficiaryForm />
              </TabsContent>
              <TabsContent value="volunteer" className="mt-6">
                <VolunteerForm />
              </TabsContent>
            </Tabs>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/signin" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}

function BeneficiaryForm() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BenValues>({ resolver: zodResolver(beneficiarySchema) });

  const onSubmit = async (_v: BenValues) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    toast.success("Account created — check your email to verify.");
    navigate({ to: "/verify-email" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <FieldGrid>
        <Field id="b-name" label="Full name" error={errors.name?.message}>
          <Input id="b-name" autoComplete="name" {...register("name")} />
        </Field>
        <Field id="b-email" label="Email" error={errors.email?.message}>
          <Input id="b-email" type="email" autoComplete="email" {...register("email")} />
        </Field>
        <Field id="b-phone" label="Phone" error={errors.phone?.message}>
          <Input id="b-phone" type="tel" autoComplete="tel" {...register("phone")} />
        </Field>
        <Field id="b-pw" label="Password" error={errors.password?.message}>
          <Input id="b-pw" type="password" autoComplete="new-password" {...register("password")} />
        </Field>
      </FieldGrid>
      <Field id="b-address" label="Home address" error={errors.address?.message}>
        <Textarea id="b-address" rows={2} {...register("address")} />
      </Field>
      <FieldGrid>
        <Field
          id="b-disab"
          label="Type of disability (optional)"
          hint="Helps us match the right kind of help."
        >
          <Input
            id="b-disab"
            placeholder="e.g. Mobility, low vision"
            {...register("disabilityType")}
          />
        </Field>
        <Field
          id="b-emerg"
          label="Emergency contact"
          error={errors.emergencyContact?.message}
        >
          <Input
            id="b-emerg"
            placeholder="Name & phone"
            {...register("emergencyContact")}
          />
        </Field>
      </FieldGrid>
      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? "Creating account…" : "Create beneficiary account"}
      </Button>
    </form>
  );
}

function VolunteerForm() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VolValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: { consent: false as unknown as true },
  });
  const consent = watch("consent");

  const onSubmit = async (_v: VolValues) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    toast.success("Account created — check your email to verify.");
    navigate({ to: "/verify-email" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <FieldGrid>
        <Field id="v-name" label="Full name" error={errors.name?.message}>
          <Input id="v-name" autoComplete="name" {...register("name")} />
        </Field>
        <Field id="v-email" label="Email" error={errors.email?.message}>
          <Input id="v-email" type="email" autoComplete="email" {...register("email")} />
        </Field>
        <Field id="v-phone" label="Phone" error={errors.phone?.message}>
          <Input id="v-phone" type="tel" autoComplete="tel" {...register("phone")} />
        </Field>
        <Field id="v-pw" label="Password" error={errors.password?.message}>
          <Input id="v-pw" type="password" autoComplete="new-password" {...register("password")} />
        </Field>
        <Field id="v-nss" label="NSS member ID (optional)">
          <Input id="v-nss" placeholder="e.g. NSS-2024-1234" {...register("nssId")} />
        </Field>
        <Field
          id="v-avail"
          label="Availability"
          hint="When are you usually free to help?"
          error={errors.availability?.message}
        >
          <Input
            id="v-avail"
            placeholder="e.g. Weekends 9 AM – 6 PM"
            {...register("availability")}
          />
        </Field>
      </FieldGrid>
      <label
        htmlFor="v-consent"
        className="flex items-start gap-3 rounded-md border border-border bg-muted/40 p-3 text-sm"
      >
        <Checkbox
          id="v-consent"
          checked={!!consent}
          onCheckedChange={(c) => setValue("consent", (c === true) as true, { shouldValidate: true })}
        />
        <span>
          I consent to background verification and agree to Sahayak's volunteer
          conduct guidelines.
        </span>
      </label>
      {errors.consent && (
        <p className="text-xs text-destructive">{errors.consent.message as string}</p>
      )}
      <Button
        type="submit"
        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
        disabled={submitting}
      >
        {submitting ? "Creating account…" : "Create volunteer account"}
      </Button>
    </form>
  );
}

function FieldGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && (
        <p className="text-xs text-destructive" id={`${id}-err`}>
          {error}
        </p>
      )}
    </div>
  );
}
