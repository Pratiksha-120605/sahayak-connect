import { createFileRoute } from "@tanstack/react-router";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { currentVolunteer } from "@/lib/mock/data";

export const Route = createFileRoute("/volunteer/messages")({
  component: () => (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Messages</h1>
      <ChatInterface currentUserId={currentVolunteer.id} />
    </div>
  ),
});
