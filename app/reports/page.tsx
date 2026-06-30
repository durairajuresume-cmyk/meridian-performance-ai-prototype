"use client";

import { useState } from "react";
import { ReportCard } from "@/components/reports/report-card";
import { reports } from "@/lib/mock-data";

export default function ReportsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Reports</h1>
        <p className="mt-1 text-sm text-muted">
          Generated from connected Meridian campaign, attribution and CRM upload data.
        </p>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            expanded={expandedId === report.id}
            onTogglePreview={() => setExpandedId(expandedId === report.id ? null : report.id)}
          />
        ))}
      </div>
    </div>
  );
}
