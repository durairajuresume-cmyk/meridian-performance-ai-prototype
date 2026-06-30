"use client";

import { X } from "lucide-react";
import { useWorkspace } from "@/components/providers/workspace-provider";
import { campaigns, campaignFunnels, campaignAttribution, campaignRootCauses } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { statusBadgeVariant } from "@/components/dashboard/campaign-table";

export function CampaignDrawer() {
  const { drawerCampaignId, closeCampaignDrawer } = useWorkspace();

  const campaign = campaigns.find((item) => item.id === drawerCampaignId);
  if (!campaign) return null;

  const funnel = campaignFunnels[campaign.id];
  const attribution = campaignAttribution[campaign.id];
  const rootCauses = campaignRootCauses[campaign.id];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        aria-label="Close drilldown"
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-[1px]"
        onClick={closeCampaignDrawer}
      />
      <div className="relative h-full w-full max-w-md overflow-y-auto bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-border bg-white px-6 py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted">Campaign Drilldown</p>
            <h2 className="mt-1 text-lg font-semibold text-foreground">{campaign.name}</h2>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="outline">{campaign.platform}</Badge>
              <Badge variant="outline">{campaign.city}</Badge>
              <Badge variant={statusBadgeVariant(campaign.status)}>{campaign.status}</Badge>
            </div>
          </div>
          <button
            onClick={closeCampaignDrawer}
            className="rounded-md p-1.5 text-muted hover:bg-slate-100 hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          <section>
            <h3 className="text-sm font-semibold text-foreground">Funnel</h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <FunnelStat label="Impressions" value={funnel.impressions} />
              <FunnelStat label="Clicks" value={funnel.clicks} />
              <FunnelStat label="Leads" value={funnel.leads} />
              <FunnelStat label="Loan Disbursals" value={funnel.disbursals} />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-foreground">Offline Attribution</h3>
            <div className="mt-3 space-y-2">
              <AttributionRow label="Offline match rate" value={`${attribution.offlineMatchRate}%`} />
              <AttributionRow label="Pending CRM reconciliation" value={`${attribution.pendingReconciliation}%`} />
              <AttributionRow label="Unmatched records" value={`${attribution.unmatched}%`} />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-foreground">Root Cause Signals</h3>
            <div className="mt-3 grid grid-cols-1 gap-2">
              {rootCauses.map((cause) => (
                <div
                  key={cause.title}
                  className="rounded-lg border border-border bg-slate-50 px-3 py-2.5"
                >
                  <p className="text-xs font-medium text-foreground">{cause.title}</p>
                  <p className="mt-0.5 text-xs text-muted">{cause.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function FunnelStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-white px-3 py-2.5">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-0.5 text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}

function AttributionRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-slate-50 px-3 py-2 text-xs">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
