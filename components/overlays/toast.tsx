"use client";

import { CheckCircle2 } from "lucide-react";
import { useWorkspace } from "@/components/providers/workspace-provider";

export function Toast() {
  const { toast } = useWorkspace();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2">
      <div className="flex items-center gap-2.5 rounded-lg border border-border bg-foreground px-4 py-3 text-sm font-medium text-white shadow-xl">
        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
        {toast.message}
      </div>
    </div>
  );
}
