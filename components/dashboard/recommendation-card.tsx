import { Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AIResponseBody } from "@/components/copilot/ai-response-body";
import { getHomeRecommendation } from "@/lib/ai-responses";

export function RecommendationCard() {
  const response = getHomeRecommendation();

  return (
    <Card className="border-accent/20">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent">
              <Lightbulb className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Recommended for You</p>
              <p className="mt-0.5 text-xs text-muted">
                Performance AI proactively flagged this from your connected Meridian data.
              </p>
            </div>
          </div>
          <Badge variant="accent" className="shrink-0">
            Top Priority
          </Badge>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-foreground">{response.summary}</p>
      </CardHeader>
      <CardContent>
        <AIResponseBody response={response} />
      </CardContent>
    </Card>
  );
}
