import { ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { GuardrailItem } from "@/lib/types";

export function GuardrailCard({ guardrail }: { guardrail: GuardrailItem }) {
  return (
    <Card>
      <CardContent className="flex items-start gap-3 pt-5">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-success-soft text-success">
          <ShieldCheck className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{guardrail.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">{guardrail.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
