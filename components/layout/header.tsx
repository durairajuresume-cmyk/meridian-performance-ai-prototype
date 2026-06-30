"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Lock, ClipboardCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const [secondsAgo, setSecondsAgo] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsAgo((prev) => (prev >= 119 ? 1 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-white px-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-sm font-semibold text-foreground">Meridian Performance AI</h1>
          <Badge variant="accent">Q1 Pilot Workspace</Badge>
        </div>
        <p className="mt-0.5 text-xs text-muted">Last refreshed {secondsAgo} seconds ago</p>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-slate-600">
          Pilot Account
        </Badge>
        <Badge variant="success">
          <ShieldCheck className="h-3 w-3" />
          BFSI Guardrails Active
        </Badge>
        <Badge variant="accent">
          <Lock className="h-3 w-3" />
          Privacy-safe Mode
        </Badge>
        <Badge variant="neutral">
          <ClipboardCheck className="h-3 w-3" />
          Advisory Mode
        </Badge>
      </div>
    </header>
  );
}
