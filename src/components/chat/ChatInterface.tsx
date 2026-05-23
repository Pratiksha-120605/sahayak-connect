import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ChatThread } from "@/lib/types";
import { chatThreads as initialThreads, getUser } from "@/lib/mock/data";
import { toast } from "sonner";

export function ChatInterface({ currentUserId }: { currentUserId: string }) {
  const [threads, setThreads] = useState<ChatThread[]>(
    initialThreads.filter(
      (t) => t.beneficiaryId === currentUserId || t.volunteerId === currentUserId,
    ),
  );
  const [activeId, setActiveId] = useState<string | undefined>(threads[0]?.id);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = threads.find((t) => t.id === activeId);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [active?.messages.length]);

  const otherId =
    active && (active.beneficiaryId === currentUserId ? active.volunteerId : active.beneficiaryId);
  const other = otherId ? getUser(otherId) : undefined;

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim() || !active) return;
    const next = threads.map((t) =>
      t.id === active.id
        ? {
            ...t,
            messages: [
              ...t.messages,
              {
                id: `m-${Date.now()}`,
                threadId: t.id,
                authorId: currentUserId,
                body: draft.trim(),
                sentAt: new Date().toISOString(),
                read: false,
              },
            ],
            lastMessageAt: new Date().toISOString(),
          }
        : t,
    );
    setThreads(next);
    setDraft("");
    setTyping(true);
    setTimeout(() => setTyping(false), 1500);
  };

  if (threads.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-10 text-center text-muted-foreground">
        No conversations yet. Once you're matched, chats appear here.
      </div>
    );
  }

  return (
    <div className="grid h-[600px] grid-cols-1 overflow-hidden rounded-xl border border-border bg-card md:grid-cols-[260px_1fr]">
      {/* Thread list */}
      <aside className="border-b border-border md:border-b-0 md:border-r" aria-label="Conversations">
        <ul className="divide-y divide-border">
          {threads.map((t) => {
            const other = getUser(
              t.beneficiaryId === currentUserId ? t.volunteerId : t.beneficiaryId,
            );
            const last = t.messages[t.messages.length - 1];
            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(t.id)}
                  className={cn(
                    "flex w-full items-center gap-3 p-3 text-left hover:bg-muted",
                    activeId === t.id && "bg-muted",
                  )}
                >
                  <span
                    aria-hidden
                    className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold"
                    style={{ background: other?.avatarColor }}
                  >
                    {other?.name.charAt(0)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">
                      {other?.name}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {last?.body}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Conversation */}
      <section className="flex min-h-0 flex-col">
        {active && other && (
          <>
            <header className="flex items-center justify-between border-b border-border p-3">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold"
                  style={{ background: other.avatarColor }}
                >
                  {other.name.charAt(0)}
                </span>
                <div>
                  <div className="text-sm font-semibold">{other.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {other.role === "volunteer" ? "Verified volunteer" : "Beneficiary"}
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Share location"
                  onClick={() => toast.success("Location shared (demo).")}
                >
                  <MapPin className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Emergency call"
                  className="text-destructive"
                  onClick={() => toast.success("Calling emergency line (demo)…")}
                >
                  <Phone className="h-5 w-5" />
                </Button>
              </div>
            </header>

            <div
              ref={scrollRef}
              className="flex-1 space-y-2 overflow-y-auto bg-muted/30 p-4"
            >
              {active.messages.map((m) => {
                const mine = m.authorId === currentUserId;
                return (
                  <div
                    key={m.id}
                    className={cn(
                      "flex flex-col",
                      mine ? "items-end" : "items-start",
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-3 py-2 text-sm",
                        mine
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-card border border-border rounded-bl-sm",
                      )}
                    >
                      {m.body}
                    </div>
                    <div className="mt-0.5 text-[10px] text-muted-foreground">
                      {new Date(m.sentAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {mine && (m.read ? " · Read" : " · Sent")}
                    </div>
                  </div>
                );
              })}
              {typing && (
                <div
                  className="text-xs text-muted-foreground"
                  aria-live="polite"
                >
                  {other.name.split(" ")[0]} is typing…
                </div>
              )}
            </div>

            <form
              onSubmit={send}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <label htmlFor="chat-input" className="sr-only">
                Message
              </label>
              <Input
                id="chat-input"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type a message…"
                autoComplete="off"
              />
              <Button type="submit" aria-label="Send message">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
