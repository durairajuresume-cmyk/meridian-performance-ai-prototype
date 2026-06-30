import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { connectedSources } from "@/lib/mock-data";
import { ConnectedSource } from "@/lib/types";

function sourceBadgeVariant(status: ConnectedSource["status"]): BadgeProps["variant"] {
  switch (status) {
    case "Connected":
      return "success";
    case "Uploaded":
      return "accent";
    case "Access pending":
      return "warning";
    case "Migration pending":
      return "warning";
  }
}

export function ConnectedSourcesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2.5">
          {connectedSources.map((source) => (
            <div key={source.name} className="flex items-center justify-between text-sm">
              <span className="text-foreground">{source.name}</span>
              <Badge variant={sourceBadgeVariant(source.status)}>{source.status}</Badge>
            </div>
          ))}
        </div>
        <p className="mt-4 border-t border-border pt-3 text-xs text-muted">
          CRM upload bridge active until Dynamics integration is available.
        </p>
      </CardContent>
    </Card>
  );
}
