"use client";

import { MessageSquare, X } from "lucide-react";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { Button } from "@/components/ui/button";

export function TeamsModal() {
  const { teamsModal, closeTeamsModal, showToast } = useWorkspace();

  if (!teamsModal.open) return null;

  const handleSend = () => {
    closeTeamsModal();
    showToast("Alert sent to Meridian Digital Team.");
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <button
        aria-label="Close Teams preview"
        className="absolute inset-0 bg-slate-900/40"
        onClick={closeTeamsModal}
      />
      <div className="relative w-full max-w-lg rounded-xl border border-border bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#464EB8] text-white">
              <MessageSquare className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">Microsoft Teams Alert Preview</h2>
          </div>
          <button
            onClick={closeTeamsModal}
            className="rounded-md p-1.5 text-muted hover:bg-slate-100 hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">Meridian Digital Team</p>
          <div className="mt-2 rounded-lg border border-border bg-slate-50 px-4 py-3 text-sm leading-relaxed text-foreground">
            {teamsModal.message}
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-border px-6 py-4">
          <Button variant="secondary" onClick={closeTeamsModal}>
            Cancel
          </Button>
          <Button onClick={handleSend}>Send Alert</Button>
        </div>
      </div>
    </div>
  );
}
