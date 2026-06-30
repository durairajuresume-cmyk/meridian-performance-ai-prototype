import { AlertTriangle, Sparkles } from "lucide-react";
import { GuardrailCard } from "@/components/governance/guardrail-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { guardrails, unsupportedPromptExample } from "@/lib/mock-data";

export default function GovernancePage() {
  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Governance</h1>
        <p className="mt-1 text-sm text-muted">
          BFSI AI guardrails configured for the Meridian Q1 pilot.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {guardrails.map((guardrail) => (
          <GuardrailCard key={guardrail.title} guardrail={guardrail} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Guardrail in Action</CardTitle>
          <CardDescription>How Performance AI responds to a question outside approved Meridian scope.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-2.5 rounded-lg border border-border bg-slate-50 px-4 py-3">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">Prompt</p>
              <p className="mt-1 text-sm text-foreground">{unsupportedPromptExample.prompt}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 rounded-lg border border-warning/30 bg-warning-soft/50 px-4 py-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-warning">Response</p>
              <p className="mt-1 text-sm text-foreground">{unsupportedPromptExample.response}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
