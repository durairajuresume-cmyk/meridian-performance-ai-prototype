"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const PRESETS = ["Today", "This Week", "This Month", "Last Month", "This Quarter"] as const;
type Preset = (typeof PRESETS)[number];

function formatDay(date: Date) {
  return date.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
}

function formatMonth(date: Date) {
  return date.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

function startOfWeek(date: Date) {
  const result = new Date(date);
  result.setDate(date.getDate() - date.getDay());
  return result;
}

export function DateRangeFilter() {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<Preset>("Today");

  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const quarter = Math.floor(today.getMonth() / 3) + 1;

  const presetLabel: Record<Preset, string> = {
    Today: formatDay(today),
    "This Week": `Week of ${formatDay(startOfWeek(today))}`,
    "This Month": formatMonth(today),
    "Last Month": formatMonth(lastMonth),
    "This Quarter": `Q${quarter} ${today.getFullYear()}`,
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-2 rounded-md border border-border bg-white px-3 py-2 text-xs font-medium text-foreground hover:bg-slate-50"
      >
        <Calendar className="h-3.5 w-3.5 text-muted" />
        {preset}
        <span className="text-muted">· {presetLabel[preset]}</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted" />
      </button>

      {open && (
        <>
          <button
            aria-label="Close date filter"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 z-20 mt-1.5 w-56 rounded-lg border border-border bg-white p-1.5 shadow-lg">
            {PRESETS.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setPreset(option);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-xs font-medium",
                  preset === option
                    ? "bg-accent-soft text-accent"
                    : "text-foreground hover:bg-slate-50"
                )}
              >
                <span>{option}</span>
                <span className="text-muted">{presetLabel[option]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
