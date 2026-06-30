"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Megaphone,
  Sparkles,
  FileText,
  BellRing,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Overview", icon: LayoutDashboard },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/copilot", label: "AI Copilot", icon: Sparkles },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/alerts", label: "Alerts", icon: BellRing },
  { href: "/governance", label: "Governance", icon: ShieldCheck },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-border bg-white">
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-sm font-bold text-white">
          M
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-foreground">Meridian</p>
          <p className="text-[11px] text-muted">Performance AI</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent-soft text-accent"
                  : "text-slate-600 hover:bg-slate-50 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-4 py-4">
        <div className="rounded-lg bg-slate-50 px-3 py-3">
          <p className="text-xs font-medium text-foreground">Q1 Pilot Workspace</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted">
            Configured on top of Performance AI for Meridian Capital Finance.
          </p>
        </div>
      </div>
    </aside>
  );
}
