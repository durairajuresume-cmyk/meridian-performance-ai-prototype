"use client";

import { Campaign, CampaignStatus } from "@/lib/types";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { ChevronRight } from "lucide-react";

export function statusBadgeVariant(status: CampaignStatus): BadgeProps["variant"] {
  switch (status) {
    case "Healthy":
      return "success";
    case "Watch":
      return "warning";
    case "Attention":
      return "danger";
  }
}

const columns = [
  "Campaign",
  "Platform",
  "Product",
  "City",
  "Spend",
  "Leads",
  "Disbursals",
  "CPL",
  "ROAS",
  "Frequency",
  "Status",
];

export function CampaignTable({ campaigns }: { campaigns: Campaign[] }) {
  const { openCampaignDrawer } = useWorkspace();

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[860px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wide text-muted">
            {columns.map((col) => (
              <th key={col} className="whitespace-nowrap px-4 py-3 font-medium">
                {col}
              </th>
            ))}
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr
              key={campaign.id}
              onClick={() => openCampaignDrawer(campaign.id)}
              className="cursor-pointer border-b border-border last:border-0 hover:bg-accent-soft/40"
            >
              <td className="whitespace-nowrap px-4 py-3 font-medium text-foreground">
                {campaign.name}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-muted">{campaign.platform}</td>
              <td className="whitespace-nowrap px-4 py-3 text-muted">{campaign.product}</td>
              <td className="whitespace-nowrap px-4 py-3 text-muted">{campaign.city}</td>
              <td className="whitespace-nowrap px-4 py-3 text-foreground">{campaign.spend}</td>
              <td className="whitespace-nowrap px-4 py-3 text-foreground">{campaign.leads}</td>
              <td className="whitespace-nowrap px-4 py-3 text-foreground">{campaign.disbursals}</td>
              <td className="whitespace-nowrap px-4 py-3 text-foreground">{campaign.cpl}</td>
              <td className="whitespace-nowrap px-4 py-3 text-foreground">{campaign.roas}</td>
              <td className="whitespace-nowrap px-4 py-3 text-foreground">{campaign.frequency}</td>
              <td className="whitespace-nowrap px-4 py-3">
                <Badge variant={statusBadgeVariant(campaign.status)}>{campaign.status}</Badge>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-muted">
                <ChevronRight className="h-4 w-4" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
