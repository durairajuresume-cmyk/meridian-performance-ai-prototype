import {
  AlertRule,
  Campaign,
  CampaignAttribution,
  CampaignFunnel,
  ConnectedSource,
  GuardrailItem,
  PlatformRoas,
  ReportItem,
  RootCauseCard,
} from "./types";

export const kpiCards = [
  { label: "Spend", value: "₹48.2L" },
  { label: "Clicks", value: "1.82L" },
  { label: "Leads", value: "8,420" },
  { label: "Loan Disbursals", value: "612" },
  { label: "CPL", value: "₹572" },
  { label: "Cost per Disbursal", value: "₹7,876" },
  { label: "ROAS", value: "3.1x" },
  { label: "Offline Match Rate", value: "84%" },
];

export const connectedSources: ConnectedSource[] = [
  { name: "Google Ads", status: "Connected" },
  { name: "Meta", status: "Connected" },
  { name: "Snapchat", status: "Connected" },
  { name: "TikTok", status: "Connected" },
  { name: "DV360", status: "Access pending" },
  { name: "App Analytics", status: "Connected" },
  { name: "CRM Upload", status: "Uploaded" },
  { name: "Microsoft Dynamics", status: "Migration pending" },
];

export const campaigns: Campaign[] = [
  {
    id: "gold-loan-mumbai",
    name: "Gold Loan Mumbai",
    platform: "Meta",
    product: "Gold Loan",
    city: "Mumbai",
    spend: "₹12.4L",
    leads: "1,980",
    disbursals: 117,
    cpl: "₹626",
    roas: "2.1x",
    frequency: 7.8,
    status: "Attention",
  },
  {
    id: "personal-loan-tier2",
    name: "Personal Loan Tier 2",
    platform: "Google",
    product: "Personal Loan",
    city: "Tier 2",
    spend: "₹9.8L",
    leads: "2,210",
    disbursals: 184,
    cpl: "₹443",
    roas: "4.2x",
    frequency: 3.4,
    status: "Healthy",
  },
  {
    id: "two-wheeler-south",
    name: "Two-Wheeler Loan South",
    platform: "Snapchat",
    product: "Two-Wheeler Loan",
    city: "South",
    spend: "₹7.6L",
    leads: "1,320",
    disbursals: 96,
    cpl: "₹576",
    roas: "3.0x",
    frequency: 4.1,
    status: "Watch",
  },
  {
    id: "sme-loan-retargeting",
    name: "SME Loan Retargeting",
    platform: "DV360",
    product: "SME Loan",
    city: "Pan India",
    spend: "₹10.1L",
    leads: "1,110",
    disbursals: 74,
    cpl: "₹910",
    roas: "1.8x",
    frequency: 6.9,
    status: "Attention",
  },
  {
    id: "credit-card-acquisition",
    name: "Credit Card Acquisition",
    platform: "TikTok",
    product: "Credit Card",
    city: "Metro",
    spend: "₹8.3L",
    leads: "1,800",
    disbursals: 141,
    cpl: "₹461",
    roas: "3.8x",
    frequency: 3.9,
    status: "Healthy",
  },
];

export const platformRoas: PlatformRoas[] = Array.from(
  campaigns.reduce((byPlatform, campaign) => {
    const roasValue = parseFloat(campaign.roas.replace("x", ""));
    const values = byPlatform.get(campaign.platform) ?? [];
    values.push(roasValue);
    byPlatform.set(campaign.platform, values);
    return byPlatform;
  }, new Map<string, number[]>())
)
  .map(([platform, values]) => ({
    platform,
    roas: Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 10) / 10,
  }))
  .sort((a, b) => b.roas - a.roas);

export const campaignFunnels: Record<string, CampaignFunnel> = {
  "gold-loan-mumbai": {
    impressions: "8.4L",
    clicks: "42,300",
    leads: "1,980",
    disbursals: "117",
  },
  "personal-loan-tier2": {
    impressions: "6.1L",
    clicks: "38,900",
    leads: "2,210",
    disbursals: "184",
  },
  "two-wheeler-south": {
    impressions: "4.8L",
    clicks: "24,100",
    leads: "1,320",
    disbursals: "96",
  },
  "sme-loan-retargeting": {
    impressions: "5.3L",
    clicks: "19,600",
    leads: "1,110",
    disbursals: "74",
  },
  "credit-card-acquisition": {
    impressions: "5.9L",
    clicks: "33,400",
    leads: "1,800",
    disbursals: "141",
  },
};

export const campaignAttribution: Record<string, CampaignAttribution> = {
  "gold-loan-mumbai": { offlineMatchRate: 84, pendingReconciliation: 12, unmatched: 4 },
  "personal-loan-tier2": { offlineMatchRate: 91, pendingReconciliation: 7, unmatched: 2 },
  "two-wheeler-south": { offlineMatchRate: 88, pendingReconciliation: 9, unmatched: 3 },
  "sme-loan-retargeting": { offlineMatchRate: 79, pendingReconciliation: 15, unmatched: 6 },
  "credit-card-acquisition": { offlineMatchRate: 90, pendingReconciliation: 8, unmatched: 2 },
};

export const attributionSummary: CampaignAttribution = {
  offlineMatchRate: 84,
  pendingReconciliation: 12,
  unmatched: 4,
};

export const campaignRootCauses: Record<string, RootCauseCard[]> = {
  "gold-loan-mumbai": [
    { title: "Audience fatigue", detail: "Frequency 7.8" },
    { title: "Creative fatigue", detail: "CTR down 14%" },
    { title: "City spike", detail: "Mumbai CPL up 22%" },
    { title: "Attribution lag", detail: "12% CRM records pending" },
  ],
  "personal-loan-tier2": [
    { title: "Audience health", detail: "Frequency steady at 3.4" },
    { title: "Creative performance", detail: "CTR stable" },
    { title: "City spread", detail: "Tier 2 CPL consistent" },
    { title: "Attribution lag", detail: "7% CRM records pending" },
  ],
  "two-wheeler-south": [
    { title: "Audience fatigue", detail: "Frequency rising toward 4.1" },
    { title: "Creative fatigue", detail: "CTR down 6%" },
    { title: "City spike", detail: "South region CPL up 9%" },
    { title: "Attribution lag", detail: "9% CRM records pending" },
  ],
  "sme-loan-retargeting": [
    { title: "Audience fatigue", detail: "Frequency 6.9" },
    { title: "Creative fatigue", detail: "CTR down 11%" },
    { title: "DV360 access", detail: "Pending validation" },
    { title: "Attribution lag", detail: "15% CRM records pending" },
  ],
  "credit-card-acquisition": [
    { title: "Audience health", detail: "Frequency steady at 3.9" },
    { title: "Creative performance", detail: "CTR stable" },
    { title: "Metro spread", detail: "CPL consistent" },
    { title: "Attribution lag", detail: "8% CRM records pending" },
  ],
};

export const reports: ReportItem[] = [
  {
    id: "weekly-acquisition-review",
    name: "Weekly Acquisition Review",
    status: "Ready",
    summaryBullets: [
      "Spend pacing in line with Q1 plan at ₹48.2L across 5 active campaigns",
      "Personal Loan Tier 2 remains the strongest performer at 4.2x ROAS",
      "Gold Loan Mumbai flagged for CPL increase driven by Meta audience fatigue",
      "Offline match rate steady at 84% with CRM upload bridge active",
    ],
  },
  {
    id: "executive-summary",
    name: "Executive Summary",
    status: "Ready",
    summaryBullets: [
      "Q1 pilot tracking 612 loan disbursals against a ₹48.2L acquisition spend",
      "Blended ROAS at 3.1x, ahead of the BFSI benchmark range",
      "Two campaigns flagged for attention: Gold Loan Mumbai and SME Loan Retargeting",
      "DV360 access pending; recommendation impact will be revisited once enabled",
    ],
  },
  {
    id: "gold-loan-city-performance",
    name: "Gold Loan City Performance",
    status: "Ready",
    summaryBullets: [
      "Mumbai carries the largest gold-loan spend share and the highest CPL at ₹626",
      "Pune and Delhi NCR show healthier CPL in the ₹580–₹650 range",
      "Ahmedabad CPL trending upward, worth monitoring alongside Mumbai",
      "City-level view grounded in connected campaign and CRM upload data",
    ],
  },
  {
    id: "offline-attribution-report",
    name: "Offline Attribution Report",
    status: "Generating",
    metrics: [
      { label: "Offline Match Rate", value: "84%" },
      { label: "Pending CRM Reconciliation", value: "12%" },
      { label: "Unmatched Records", value: "4%" },
    ],
    summaryBullets: [
      "Blended offline match rate at 84% via the CRM upload bridge",
      "12% of records pending CRM reconciliation across active campaigns",
      "4% of records remain unmatched, primarily from offline branch walk-ins",
      "Full Microsoft Dynamics integration expected to improve match rates post-migration",
    ],
  },
];

export const alertRules: AlertRule[] = [
  { id: "cpl-spike", condition: "CPL spike above 20%", channel: "Microsoft Teams", status: "Active" },
  { id: "roas-drop", condition: "ROAS drop above 15%", channel: "Microsoft Teams", status: "Active" },
  {
    id: "offline-match-rate",
    condition: "Offline match rate below 75%",
    channel: "Microsoft Teams",
    status: "Active",
  },
  {
    id: "audience-frequency",
    condition: "Audience frequency above 7",
    channel: "Microsoft Teams",
    status: "Active",
  },
];

export const guardrails: GuardrailItem[] = [
  {
    title: "Meridian context only",
    description: "Responses are scoped to connected Meridian campaign, attribution and reporting data.",
  },
  {
    title: "No unsupported metrics",
    description: "The AI will not fabricate metrics that are not present in connected sources.",
  },
  {
    title: "Evidence required",
    description: "Every diagnostic response is backed by cited evidence from campaign and CRM data.",
  },
  {
    title: "Confidence required",
    description: "Recommendations are always shown with a confidence score for transparency.",
  },
  {
    title: "PII masking",
    description: "No customer-level personally identifiable information is used or surfaced in responses.",
  },
  {
    title: "Advisory mode only",
    description: "Recommendations are advisory; no automated execution occurs without explicit approval.",
  },
  {
    title: "BFSI claim safety",
    description: "Responses avoid regulated financial claims and stay within approved marketing context.",
  },
  {
    title: "Audit log enabled",
    description: "All AI diagnostics and Teams alerts are logged for governance and audit review.",
  },
];

export const unsupportedPromptExample = {
  prompt: "What should Meridian do for IPL sponsorship?",
  response:
    "I can help with Meridian's connected campaign performance, attribution, audience fatigue and reporting. I don't have approved data to answer sponsorship strategy.",
};
