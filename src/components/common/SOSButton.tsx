import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export function SOSButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          aria-label="Emergency SOS"
          className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-destructive text-destructive-foreground shadow-lg hover:bg-destructive/90 focus-visible:ring-4"
        >
          <Phone className="h-6 w-6" />
          <span className="sr-only">Emergency SOS</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Trigger emergency support?</AlertDialogTitle>
          <AlertDialogDescription>
            This will alert your emergency contacts and the nearest verified volunteers.
            Continue only if you need immediate help.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => toast.success("Emergency contacts notified (demo).")}
          >
            Send SOS
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
