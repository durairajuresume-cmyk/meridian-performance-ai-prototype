import { PilotBanner } from "@/components/dashboard/pilot-banner";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { ConnectedSourcesCard } from "@/components/dashboard/connected-sources-card";
import { FrequencyIntelligenceCard } from "@/components/dashboard/frequency-intelligence-card";
import { PlatformRoasCard } from "@/components/dashboard/platform-roas-card";
import { RecommendationCard } from "@/components/dashboard/recommendation-card";
import { DateRangeFilter } from "@/components/dashboard/date-range-filter";
import { CampaignTable } from "@/components/dashboard/campaign-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { kpiCards, campaigns } from "@/lib/mock-data";

export default function OverviewPage() {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Overview</h1>
          <p className="mt-1 text-sm text-muted">
            Trusted full-funnel campaign performance for the Meridian Q1 pilot.
          </p>
        </div>
        <DateRangeFilter />
      </div>

      <PilotBanner />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {kpiCards.map((kpi) => (
          <KpiCard key={kpi.label} label={kpi.label} value={kpi.value} />
        ))}
      </div>

      <RecommendationCard />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>
                Click a campaign to drill into funnel, attribution and root cause signals.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <CampaignTable campaigns={campaigns} />
            </CardContent>
          </Card>
        </div>
        <ConnectedSourcesCard />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PlatformRoasCard />
        <FrequencyIntelligenceCard />
      </div>
    </div>
  );
}
