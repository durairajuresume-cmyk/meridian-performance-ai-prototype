import { Card } from "@/components/ui/card";

export function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="px-4 py-4">
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className="mt-1.5 text-xl font-semibold text-foreground">{value}</p>
    </Card>
  );
}
