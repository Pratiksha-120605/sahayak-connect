import { type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  ClipboardList,
  Home,
  LogOut,
  Map as MapIcon,
  MessageCircle,
  Settings,
  Sparkles,
  User as UserIcon,
  History as HistoryIcon,
  Activity,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Logo } from "@/components/common/Logo";
import { SOSButton } from "@/components/common/SOSButton";
import type { User } from "@/lib/types";
import { useState } from "react";

type NavItem = { to: string; label: string; icon: typeof Home };

const beneficiaryNav: NavItem[] = [
  { to: "/beneficiary", label: "Dashboard", icon: Home },
  { to: "/beneficiary/requests", label: "My requests", icon: ClipboardList },
  { to: "/beneficiary/messages", label: "Messages", icon: MessageCircle },
  { to: "/beneficiary/profile", label: "Profile", icon: UserIcon },
];

const volunteerNav: NavItem[] = [
  { to: "/volunteer", label: "Nearby map", icon: MapIcon },
  { to: "/volunteer/requests", label: "Requests list", icon: ClipboardList },
  { to: "/volunteer/active", label: "Active", icon: Activity },
  { to: "/volunteer/history", label: "History", icon: HistoryIcon },
  { to: "/volunteer/messages", label: "Messages", icon: MessageCircle },
  { to: "/volunteer/profile", label: "Profile", icon: UserIcon },
  { to: "/volunteer/availability", label: "Availability", icon: Settings },
];

function AppSidebar({ items }: { items: NavItem[] }) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex h-12 items-center px-2">
          {!collapsed ? <Logo /> : <Logo className="text-base" />}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active =
                  path === item.to ||
                  (item.to !== "/beneficiary" &&
                    item.to !== "/volunteer" &&
                    path.startsWith(item.to));
                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.label}>
                      <Link to={item.to} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Sign out">
              <Link to="/" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

function DashboardHeader({ user }: { user: User }) {
  const isVolunteer = user.role === "volunteer";
  const [online, setOnline] = useState(true);
  return (
    <header className="flex h-14 w-full items-center gap-2 border-b border-border bg-background px-3">
      <SidebarTrigger aria-label="Toggle sidebar" />
      <div className="hidden text-sm text-muted-foreground sm:block">
        Welcome back, <span className="font-medium text-foreground">{user.name.split(" ")[0]}</span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        {isVolunteer && (
          <label className="hidden items-center gap-2 rounded-md border border-border px-2 py-1 text-sm sm:flex">
            <span aria-hidden className={online ? "text-success" : "text-muted-foreground"}>
              ●
            </span>
            <span className="text-foreground">{online ? "Online" : "Offline"}</span>
            <Switch
              checked={online}
              onCheckedChange={setOnline}
              aria-label="Toggle availability"
            />
          </label>
        )}
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" aria-hidden />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-2"
              aria-label="Open profile menu"
            >
              <span
                aria-hidden
                className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-foreground"
                style={{ background: user.avatarColor }}
              >
                {user.name.charAt(0)}
              </span>
              <span className="hidden text-sm font-medium sm:inline">{user.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={isVolunteer ? "/volunteer/profile" : "/beneficiary/profile"}>
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/safety">Safety center</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/">Sign out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export function DashboardShell({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) {
  const items = user.role === "volunteer" ? volunteerNav : beneficiaryNav;
  return (
    <SidebarProvider>
      <div className="flex min-h-dvh w-full bg-muted/30">
        <AppSidebar items={items} />
        <div className="flex min-h-dvh flex-1 flex-col">
          <DashboardHeader user={user} />
          <main id="main-content" className="flex-1 p-4 sm:p-6">
            <div className="mx-auto w-full max-w-6xl">{children}</div>
          </main>
        </div>
        <SOSButton />
      </div>
      <span className="hidden">
        <Sparkles />
      </span>
    </SidebarProvider>
  );
}
