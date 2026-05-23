import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { currentVolunteer } from "@/lib/mock/data";

export const Route = createFileRoute("/volunteer")({
  head: () => ({
    meta: [{ title: "Volunteer dashboard — Sahayak" }],
  }),
  component: () => (
    <DashboardShell user={currentVolunteer}>
      <Outlet />
    </DashboardShell>
  ),
});
