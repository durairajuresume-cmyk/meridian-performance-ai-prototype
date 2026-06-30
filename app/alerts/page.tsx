import { AlertCard } from "@/components/alerts/alert-card";
import { alertRules } from "@/lib/mock-data";

export default function AlertsPage() {
  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Alerts</h1>
        <p className="mt-1 text-sm text-muted">
          Configured alert rules for the Meridian Q1 pilot, routed to Microsoft Teams.
        </p>
      </div>

      <div className="space-y-3">
        {alertRules.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
}
