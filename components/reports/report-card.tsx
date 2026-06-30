"use client";

import { FileText, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReportItem } from "@/lib/types";

function statusVariant(status: ReportItem["status"]): BadgeProps["variant"] {
  switch (status) {
    case "Ready":
      return "success";
    case "Generating":
      return "warning";
    case "Scheduled":
      return "neutral";
  }
}

export function ReportCard({
  report,
  expanded,
  onTogglePreview,
}: {
  report: ReportItem;
  expanded: boolean;
  onTogglePreview: () => void;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-md bg-accent-soft text-accent">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <CardTitle>{report.name}</CardTitle>
            <div className="mt-1.5">
              <Badge variant={statusVariant(report.status)}>{report.status}</Badge>
            </div>
          </div>
        </div>
        <Button variant="secondary" size="sm" onClick={onTogglePreview}>
          {expanded ? "Hide Preview" : "Preview"}
        </Button>
      </CardHeader>
      {report.metrics && (
        <CardContent className="pt-3">
          <div className="grid grid-cols-3 gap-2">
            {report.metrics.map((metric) => (
              <div key={metric.label} className="rounded-lg border border-border bg-slate-50 px-3 py-2.5">
                <p className="text-[11px] text-muted">{metric.label}</p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">{metric.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      )}
      {expanded && (
        <CardContent>
          <div className="rounded-lg border border-border bg-slate-50 px-4 py-4">
            <ul className="space-y-2">
              {report.summaryBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
