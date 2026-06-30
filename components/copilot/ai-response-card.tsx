import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AIResponse } from "@/lib/types";
import { AIResponseBody } from "@/components/copilot/ai-response-body";

export function AIResponseCard({ response }: { response: AIResponse }) {
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
      <CardContent>
        <AIResponseBody response={response} />
      </CardContent>
    </Card>
  );
}
