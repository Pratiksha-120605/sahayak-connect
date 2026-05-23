import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { currentBeneficiary } from "@/lib/mock/data";

export const Route = createFileRoute("/beneficiary")({
  head: () => ({
    meta: [{ title: "Beneficiary dashboard — Sahayak" }],
  }),
  component: () => (
    <DashboardShell user={currentBeneficiary}>
      <Outlet />
    </DashboardShell>
  ),
});
