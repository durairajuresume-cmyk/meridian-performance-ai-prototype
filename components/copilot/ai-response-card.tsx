import { ShieldCheck, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AIResponse } from "@/lib/types";
import { useWorkspace } from "@/components/providers/workspace-provider";

export function AIResponseCard({ response }: { response: AIResponse }) {
  const { openCampaignDrawer, openTeamsModal } = useWorkspace();

  if (response.declined) {
    return (
      <Card className="border-warning/30 bg-warning-soft/40">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <p className="text-sm font-semibold text-foreground">Outside approved scope</p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-foreground">{response.summary}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <p className="text-xs font-medium uppercase tracking-wide text-muted">Performance AI Response</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground">{response.summary}</p>
      </CardHeader>
      <CardContent className="space-y-5">
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
      </CardContent>
    </Card>
  );
}
