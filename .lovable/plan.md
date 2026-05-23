## Sahayak — Frontend UI Plan (Mock Data)

Build a fully-clickable frontend for the Sahayak volunteer matching platform. No backend; mock data lives in TypeScript files and component state. Real auth/DB and live maps come later.

### Design system (set once in `src/styles.css`)
- Palette tokens (oklch equivalents of spec hexes):
  - `--primary` #2563EB, `--secondary` #10B981, `--accent` #F59E0B
  - `--destructive` #EF4444, `--warning` #FBBF24, `--success` #10B981
  - `--background` #FFFFFF, `--muted` #F9FAFB, `--muted-foreground` #6B7280
- Typography: Inter via Google Fonts, base 16px / line-height 1.6, H1 32 / H2 24 / H3 20
- WCAG AA: visible focus ring, 44px+ tap targets, semantic landmarks, skip link in `__root.tsx`

### Routes (TanStack Start, file-based)
```
src/routes/
  __root.tsx              shell: skip link, <main>, Sonner toaster
  index.tsx               Landing
  about.tsx               About (short)
  contact.tsx             Contact (form, mock submit)
  signin.tsx              Unified sign in with role toggle
  signup.tsx              Tabs: Beneficiary | Volunteer signup
  verify-email.tsx        Success confirmation
  forgot-password.tsx
  reset-password.tsx
  beneficiary/_layout.tsx  Sidebar + header layout
  beneficiary/index.tsx    Dashboard home + Quick Post Request modal
  beneficiary/requests.tsx Active + past requests, filters
  beneficiary/messages.tsx Chat UI
  beneficiary/profile.tsx
  volunteer/_layout.tsx    Sidebar + header + Online/Offline toggle
  volunteer/index.tsx      Map view (mock) + nearby request pins
  volunteer/requests.tsx   List view, sortable/filterable
  volunteer/active.tsx     Ongoing sessions with timer
  volunteer/history.tsx    Past assignments + impact stats
  volunteer/messages.tsx
  volunteer/profile.tsx
  volunteer/availability.tsx
  request/$requestId.tsx   Detailed request page (shared)
  safety.tsx               Trust/verification info
```
Each route gets its own `head()` with unique title + description + og tags.

### Shared components (`src/components/`)
- `layout/SiteHeader.tsx`, `SiteFooter.tsx` — public nav
- `layout/DashboardSidebar.tsx` — shadcn Sidebar wrapper, role-aware nav items
- `layout/DashboardHeader.tsx` — notifications bell, profile dropdown, (volunteer) availability switch
- `landing/Hero.tsx`, `FeatureCards.tsx`, `HowItWorks.tsx`, `Testimonials.tsx`, `CtaFooter.tsx`
- `requests/RequestCard.tsx`, `RequestStatusBadge.tsx`, `UrgencyPill.tsx`, `NewRequestDialog.tsx`
- `volunteers/VerifiedBadge.tsx`, `NSSBadge.tsx`, `RatingStars.tsx`
- `map/MockMap.tsx` — stylized SVG/CSS map with absolutely-positioned color-coded pins, radius circle, click → request modal
- `chat/ChatThread.tsx`, `ChatMessage.tsx`, `ChatComposer.tsx` (typing indicator, read receipts, location share button, emergency call button)
- `common/EmptyState.tsx`, `PageHeader.tsx`, `SOSButton.tsx` (fixed bottom-right on dashboards)

### Mock data (`src/lib/mock/`)
- `users.ts` — sample beneficiaries + volunteers
- `requests.ts` — varied statuses, urgencies, locations (lat/lng for pin placement)
- `messages.ts` — chat threads
- `reviews.ts`
Typed via interfaces in `src/lib/types.ts`. Components read directly; "actions" (accept, complete, send) update React state + toast.

### Forms
- React Hook Form + Zod for signup/signin/new-request/contact
- Inline errors tied to inputs via `aria-describedby`
- Loading states on submit buttons; success → toast + navigate

### Accessibility specifics
- Skip-to-content link in `__root.tsx`
- Single `<main>` per route
- All icon-only buttons get `aria-label`
- Urgency conveyed via badge text + color (not color alone)
- Sidebar collapsible with `SidebarTrigger` always visible in header

### Out of scope (this pass)
- Real auth, database, realtime
- Real map provider (Leaflet/Mapbox)
- Dark mode, i18n, admin analytics, leaderboard — can layer on later
- Payment, SMS, social login wiring

### Deliverable
Clickable demo: visitors can browse landing → sign up (mock) → land in either dashboard → create/accept requests, open chat, view profile, all driven by mock state. Visual + interaction quality ready to plug a backend into next.