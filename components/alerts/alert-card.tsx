import { BellRing, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertRule } from "@/lib/types";

export function AlertCard({ alert }: { alert: AlertRule }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between pt-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent-soft text-accent">
            <BellRing className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{alert.condition}</p>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted">
              <MessageSquare className="h-3 w-3" />
              {alert.channel}
            </div>
          </div>
        </div>
        <Badge variant={alert.status === "Active" ? "success" : "neutral"}>{alert.status}</Badge>
      </CardContent>
    </Card>
  );
}
