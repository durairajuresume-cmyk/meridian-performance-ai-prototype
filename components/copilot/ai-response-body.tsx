"use client";

import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AIResponse } from "@/lib/types";
import { useWorkspace } from "@/components/providers/workspace-provider";

export function AIResponseBody({ response }: { response: AIResponse }) {
  const { openCampaignDrawer, openTeamsModal } = useWorkspace();

  return (
    <div className="space-y-5">
      <section>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted">Evidence</h4>
        <ul className="mt-2 space-y-1.5">
          {response.evidence.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {item.text}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-muted">Recommendation</h4>
        <p className="mt-2 text-sm text-foreground">{response.recommendation}</p>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted">Confidence</h4>
          <span className="text-sm font-semibold text-foreground">{response.confidence}%</span>
        </div>
        <Progress value={response.confidence} className="mt-2" />
      </section>

      <div className="flex items-start gap-2 rounded-lg border border-border bg-slate-50 px-3 py-3">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <p className="text-xs leading-relaxed text-muted">{response.guardrailNote}</p>
      </div>

      <div className="flex gap-2 border-t border-border pt-4">
        {response.relatedCampaignId && (
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => openCampaignDrawer(response.relatedCampaignId!)}
          >
            View Evidence
          </Button>
        )}
        <Button className="flex-1" onClick={() => openTeamsModal(response.teamsMessage)}>
          Send to Teams
        </Button>
      </div>
    </div>
  );
}
