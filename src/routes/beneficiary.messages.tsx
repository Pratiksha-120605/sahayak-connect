import { createFileRoute } from "@tanstack/react-router";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { currentBeneficiary } from "@/lib/mock/data";

export const Route = createFileRoute("/beneficiary/messages")({
  component: () => (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Messages</h1>
      <ChatInterface currentUserId={currentBeneficiary.id} />
    </div>
  ),
});
