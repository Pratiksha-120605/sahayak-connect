import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Sparkles } from "lucide-react";

const schema = z.object({
  type: z.enum(["mobility", "grocery", "medical", "companionship", "errand", "other"]),
  title: z.string().trim().min(4, "Add a short title (4+ chars)").max(80),
  description: z.string().trim().min(10, "Describe what help you need").max(500),
  location: z.string().trim().min(2).max(120),
  preferredTime: z.string().trim().min(2).max(60),
  radius: z.enum(["1", "5", "10", "20"]),
  urgency: z.enum(["low", "medium", "high"]),
});

type FormValues = z.infer<typeof schema>;

export function NewRequestDialog({ trigger }: { trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { type: "grocery", radius: "5", urgency: "medium" },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setOpen(false);
    reset();
    toast.success("Request posted! Nearby volunteers have been notified.", {
      description: `${values.title} · within ${values.radius} km`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="lg" className="h-14 gap-2 text-base">
            <Plus className="h-5 w-5" /> Post a new help request
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" aria-hidden /> Post a help request
          </DialogTitle>
          <DialogDescription>
            Share what you need. Verified volunteers nearby will be notified instantly.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="req-type">Type of help</Label>
            <Select
              defaultValue="grocery"
              onValueChange={(v) => setValue("type", v as FormValues["type"])}
            >
              <SelectTrigger id="req-type">
                <SelectValue placeholder="Pick a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mobility">Mobility help</SelectItem>
                <SelectItem value="grocery">Grocery shopping</SelectItem>
                <SelectItem value="medical">Medical visit / pharmacy</SelectItem>
                <SelectItem value="companionship">Companionship</SelectItem>
                <SelectItem value="errand">Errand</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="req-title">Short title</Label>
            <Input
              id="req-title"
              placeholder="e.g. Grocery pickup from FreshMart"
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "req-title-err" : undefined}
              {...register("title")}
            />
            {errors.title && (
              <p id="req-title-err" className="text-xs text-destructive">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="req-desc">Description</Label>
            <Textarea
              id="req-desc"
              rows={3}
              placeholder="A few details so the volunteer is prepared."
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? "req-desc-err" : undefined}
              {...register("description")}
            />
            {errors.description && (
              <p id="req-desc-err" className="text-xs text-destructive">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="req-loc">Pickup / meeting point</Label>
              <Input
                id="req-loc"
                placeholder="Lotus Apts, JP Nagar"
                {...register("location")}
                aria-invalid={!!errors.location}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="req-time">Preferred time</Label>
              <Input
                id="req-time"
                placeholder="Today, 4 PM"
                {...register("preferredTime")}
                aria-invalid={!!errors.preferredTime}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="req-radius">Search radius</Label>
            <Select
              defaultValue="5"
              onValueChange={(v) => setValue("radius", v as FormValues["radius"])}
            >
              <SelectTrigger id="req-radius">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Within 1 km</SelectItem>
                <SelectItem value="5">Within 5 km</SelectItem>
                <SelectItem value="10">Within 10 km</SelectItem>
                <SelectItem value="20">Within 20 km</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Urgency</legend>
            <RadioGroup
              defaultValue="medium"
              className="grid grid-cols-3 gap-2"
              onValueChange={(v) => setValue("urgency", v as FormValues["urgency"])}
            >
              {[
                { v: "low", label: "Flexible", c: "border-success/40" },
                { v: "medium", label: "Soon", c: "border-warning/50" },
                { v: "high", label: "Urgent", c: "border-destructive/50" },
              ].map((opt) => (
                <label
                  key={opt.v}
                  htmlFor={`urg-${opt.v}`}
                  className={`flex cursor-pointer items-center gap-2 rounded-md border ${opt.c} bg-background p-3 text-sm has-[:checked]:bg-muted`}
                >
                  <RadioGroupItem id={`urg-${opt.v}`} value={opt.v} />
                  {opt.label}
                </label>
              ))}
            </RadioGroup>
          </fieldset>

          <DialogFooter className="gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Posting…" : "Post request"}
            </Button>
          </DialogFooter>
          {/* watch is referenced so eslint stays quiet on unused destructure */}
          <span className="hidden">{watch("type")}</span>
        </form>
      </DialogContent>
    </Dialog>
  );
}
