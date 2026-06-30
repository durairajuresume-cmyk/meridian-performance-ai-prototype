import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { platformRoas } from "@/lib/mock-data";

export function PlatformRoasCard() {
  const maxRoas = Math.max(...platformRoas.map((entry) => entry.roas));

  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-2.5 space-y-0">
        <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-md bg-accent-soft text-accent">
          <BarChart3 className="h-4 w-4" />
        </div>
        <div>
          <CardTitle>Platform-wise ROAS</CardTitle>
          <CardDescription>Return on ad spend by connected platform.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {platformRoas.map((entry) => (
            <div key={entry.platform}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">{entry.platform}</span>
                <span className="font-semibold text-foreground">{entry.roas}x</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${(entry.roas / maxRoas) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
