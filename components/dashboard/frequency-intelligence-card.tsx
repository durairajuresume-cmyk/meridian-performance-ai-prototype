import { Gauge } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const metrics = [
  { platform: "Meta", value: "7.8", status: "danger" as const },
  { platform: "Google", value: "3.4", status: "success" as const },
  { platform: "DV360", value: "Access pending", status: "warning" as const },
];

export function FrequencyIntelligenceCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-md bg-accent-soft text-accent">
            <Gauge className="h-4 w-4" />
          </div>
          <div>
            <CardTitle>Frequency Intelligence</CardTitle>
            <p className="mt-1 text-xs text-muted">Cross-platform audience fatigue detected.</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {metrics.map((metric) => (
            <div key={metric.platform} className="rounded-lg border border-border bg-slate-50 px-3 py-3">
              <p className="text-xs text-muted">{metric.platform}</p>
              <p className="mt-1 text-base font-semibold text-foreground">{metric.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-start gap-2 rounded-lg border border-border bg-white px-3 py-3">
          <Badge variant="outline" className="shrink-0">
            Advisory
          </Badge>
          <p className="text-xs leading-relaxed text-muted">
            Recommendation only — automated execution requires platform write-access validation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
