import { Sparkles } from "lucide-react";

export function PilotBanner() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-accent/20 bg-accent-soft px-5 py-4">
      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
      <p className="text-sm text-blue-900">
        <span className="font-semibold">Configured for Meridian Q1 pilot:</span> offline attribution,
        CRM upload bridge, Teams workflow, and BFSI AI guardrails.
      </p>
    </div>
  );
}
