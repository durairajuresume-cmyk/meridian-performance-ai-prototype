"use client";

import { FormEvent, useState } from "react";
import { Sparkles, SendHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AIResponseCard } from "@/components/copilot/ai-response-card";
import { promptChips, generateAIResponse } from "@/lib/ai-responses";
import { AIResponse } from "@/lib/types";

export default function CopilotPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  const runPrompt = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setPrompt(trimmed);
    setIsThinking(true);
    setResponse(null);
    setTimeout(() => {
      setResponse(generateAIResponse(trimmed));
      setIsThinking(false);
    }, 600);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    runPrompt(prompt);
  };

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-xl font-semibold text-foreground">AI Copilot</h1>
        <p className="mt-1 text-sm text-muted">
          Ask Performance AI about Meridian campaign performance, attribution and fatigue.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <CardTitle>Ask Performance AI</CardTitle>
          </div>
          <CardDescription>
            Grounded in connected Meridian campaign, attribution and CRM upload data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask why a campaign changed, rank performance, or check fatigue…"
            />
            <Button type="submit" disabled={isThinking}>
              <SendHorizontal className="h-4 w-4" />
              Ask
            </Button>
          </form>

          <div className="mt-4 flex flex-wrap gap-2">
            {promptChips.map((chip) => (
              <button
                key={chip}
                onClick={() => runPrompt(chip)}
                className="rounded-full border border-border bg-slate-50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent"
              >
                {chip}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {isThinking && (
        <Card>
          <CardContent className="py-8 text-center text-sm text-muted">
            Analyzing connected Meridian campaign and CRM data…
          </CardContent>
        </Card>
      )}

      {response && !isThinking && <AIResponseCard response={response} />}
    </div>
  );
}
