"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CampaignTable } from "@/components/dashboard/campaign-table";
import { campaigns } from "@/lib/mock-data";
import { CampaignStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const filters: Array<CampaignStatus | "All"> = ["All", "Healthy", "Watch", "Attention"];

export default function CampaignsPage() {
  const [activeFilter, setActiveFilter] = useState<CampaignStatus | "All">("All");

  const filteredCampaigns =
    activeFilter === "All" ? campaigns : campaigns.filter((c) => c.status === activeFilter);

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Campaigns</h1>
        <p className="mt-1 text-sm text-muted">
          All Q1 pilot campaigns across connected sources, with offline disbursal attribution.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>All Campaigns</CardTitle>
            <CardDescription>Click a row to view funnel, attribution and root cause detail.</CardDescription>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg border border-border bg-slate-50 p-1">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                  activeFilter === filter
                    ? "bg-white text-foreground shadow-sm"
                    : "text-muted hover:text-foreground"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <CampaignTable campaigns={filteredCampaigns} />
        </CardContent>
      </Card>
    </div>
  );
}
