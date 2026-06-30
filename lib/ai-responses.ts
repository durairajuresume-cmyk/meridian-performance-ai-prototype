import { AIResponse } from "./types";
import { unsupportedPromptExample } from "./mock-data";

export const promptChips: string[] = [
  "Rank campaigns worst-to-best by ROAS",
  "Why did Gold Loan Mumbai CPL increase?",
  "Show gold-loan CPL by city",
  "Detect audience fatigue across Meta, Google and DV360",
];

const GUARDRAIL_NOTE =
  "Response grounded in connected Meridian campaign and CRM data. No customer-level PII used. Advisory recommendation only.";

const cannedResponses: Record<string, Omit<AIResponse, "id" | "prompt">> = {
  "rank campaigns worst-to-best by roas": {
    summary:
      "Ranking the 5 active Q1 campaigns by ROAS, lowest to highest. SME Loan Retargeting trails the set; Personal Loan Tier 2 leads.",
    evidence: [
      { text: "SME Loan Retargeting — 1.8x ROAS, ₹910 CPL, DV360 access pending" },
      { text: "Gold Loan Mumbai — 2.1x ROAS, ₹626 CPL, Meta frequency at 7.8" },
      { text: "Two-Wheeler Loan South — 3.0x ROAS, ₹576 CPL" },
      { text: "Credit Card Acquisition — 3.8x ROAS, ₹461 CPL" },
      { text: "Personal Loan Tier 2 — 4.2x ROAS, ₹443 CPL" },
    ],
    recommendation:
      "Prioritize budget review for SME Loan Retargeting and Gold Loan Mumbai. Hold or scale Personal Loan Tier 2 and Credit Card Acquisition.",
    confidence: 88,
    guardrailNote: GUARDRAIL_NOTE,
    teamsMessage:
      "Performance AI Alert: ROAS ranking refreshed for Q1 campaigns. Lowest performer is SME Loan Retargeting at 1.8x; highest is Personal Loan Tier 2 at 4.2x. Recommended action: review budget allocation for SME Loan Retargeting and Gold Loan Mumbai.",
    relatedCampaignId: "sme-loan-retargeting",
  },
  "why did gold loan mumbai cpl increase?": {
    summary:
      "Gold Loan Mumbai CPL increased 22% week-over-week. The likely drivers are higher Meta frequency, creative CTR decline, and lower lead-to-disbursal conversion.",
    evidence: [
      { text: "Meta frequency increased from 5.1 to 7.8" },
      { text: "Creative CTR dropped 14%" },
      { text: "Lead-to-disbursal conversion dropped from 8.4% to 5.9%" },
      { text: "Offline attribution match rate is 84%; 12% records pending CRM reconciliation" },
    ],
    recommendation:
      "Reduce Meta retargeting budget by ₹3L, shift test budget to Google Search, and monitor DV360 overlap once access is enabled.",
    confidence: 82,
    guardrailNote: GUARDRAIL_NOTE,
    teamsMessage:
      "Performance AI Alert: Gold Loan Mumbai CPL increased 22% WoW. Likely causes: Meta frequency 7.8, creative CTR down 14%, and lower lead-to-disbursal conversion. Recommended action: reduce Meta retargeting budget by ₹3L and review DV360 overlap once access is enabled.",
    relatedCampaignId: "gold-loan-mumbai",
  },
  "show gold-loan cpl by city": {
    summary:
      "Gold-loan CPL varies notably by city. Mumbai carries the highest CPL among active and historical gold-loan markets, with Ahmedabad trending upward.",
    evidence: [
      { text: "Mumbai — ₹626 CPL (active campaign, Attention status)" },
      { text: "Pune — ₹588 CPL" },
      { text: "Delhi NCR — ₹645 CPL" },
      { text: "Ahmedabad — ₹701 CPL, trending upward over the last 2 weeks" },
    ],
    recommendation:
      "Investigate Ahmedabad creative and audience fatigue alongside the Mumbai diagnostic; consider reallocating a portion of Mumbai retargeting spend toward Pune.",
    confidence: 76,
    guardrailNote: GUARDRAIL_NOTE,
    teamsMessage:
      "Performance AI Alert: Gold-loan CPL by city reviewed. Mumbai and Ahmedabad show the highest CPL (₹626 and ₹701). Recommended action: investigate Ahmedabad fatigue and consider reallocating Mumbai retargeting spend toward Pune.",
    relatedCampaignId: "gold-loan-mumbai",
  },
  "detect audience fatigue across meta, google and dv360": {
    summary:
      "Cross-platform audience fatigue detected on Meta. Google frequency remains healthy. DV360 cannot be assessed until access is validated.",
    evidence: [
      { text: "Meta frequency at 7.8, above the 7.0 fatigue threshold" },
      { text: "Google frequency at 3.4, within healthy range" },
      { text: "DV360 frequency unavailable — access pending validation" },
      { text: "Gold Loan Mumbai and SME Loan Retargeting are the campaigns most exposed to Meta fatigue" },
    ],
    recommendation:
      "Recommendation only — automated execution requires platform write-access validation. Review Meta frequency caps manually for Gold Loan Mumbai and SME Loan Retargeting.",
    confidence: 80,
    guardrailNote: GUARDRAIL_NOTE,
    teamsMessage:
      "Performance AI Alert: Cross-platform audience fatigue detected on Meta (frequency 7.8). Google is healthy at 3.4; DV360 unavailable pending access validation. Recommended action: review Meta frequency caps for Gold Loan Mumbai and SME Loan Retargeting.",
    relatedCampaignId: "gold-loan-mumbai",
  },
};

const fallbackResponse: Omit<AIResponse, "id" | "prompt"> = {
  summary:
    "Based on connected Meridian campaign, attribution and CRM upload data, here is a grounded read on current Q1 pilot performance.",
  evidence: [
    { text: "Blended ROAS at 3.1x across 5 active campaigns" },
    { text: "Offline match rate at 84% via the CRM upload bridge" },
    { text: "Gold Loan Mumbai and SME Loan Retargeting are the two campaigns flagged for attention" },
  ],
  recommendation:
    "Start with the suggested prompts for a grounded diagnostic, or ask about a specific campaign, platform or city.",
  confidence: 70,
  guardrailNote: GUARDRAIL_NOTE,
  teamsMessage:
    "Performance AI Alert: Q1 pilot summary — blended ROAS at 3.1x, offline match rate at 84%. Gold Loan Mumbai and SME Loan Retargeting flagged for attention.",
  relatedCampaignId: "gold-loan-mumbai",
};

const OFF_TOPIC_KEYWORDS = ["ipl", "sponsorship", "cricket", "celebrity", "brand campaign idea"];

let responseCounter = 0;

export function generateAIResponse(prompt: string): AIResponse {
  responseCounter += 1;
  const id = `response-${responseCounter}`;
  const normalized = prompt.trim().toLowerCase();

  if (OFF_TOPIC_KEYWORDS.some((keyword) => normalized.includes(keyword))) {
    return {
      id,
      prompt,
      summary: unsupportedPromptExample.response,
      evidence: [],
      recommendation: "",
      confidence: 0,
      guardrailNote: GUARDRAIL_NOTE,
      teamsMessage: "",
      declined: true,
    };
  }

  const canned = cannedResponses[normalized];
  if (canned) {
    return { id, prompt, ...canned };
  }

  return { id, prompt, ...fallbackResponse };
}

export function getHomeRecommendation(): AIResponse {
  return generateAIResponse(promptChips[1]);
}
