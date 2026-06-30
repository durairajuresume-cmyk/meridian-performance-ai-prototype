export type CampaignStatus = "Healthy" | "Watch" | "Attention";

export interface Campaign {
  id: string;
  name: string;
  platform: string;
  product: string;
  city: string;
  spend: string;
  leads: string;
  disbursals: number;
  cpl: string;
  roas: string;
  frequency: number;
  status: CampaignStatus;
}

export interface CampaignFunnel {
  impressions: string;
  clicks: string;
  leads: string;
  disbursals: string;
}

export interface CampaignAttribution {
  offlineMatchRate: number;
  pendingReconciliation: number;
  unmatched: number;
}

export interface RootCauseCard {
  title: string;
  detail: string;
}

export interface ConnectedSource {
  name: string;
  status: "Connected" | "Access pending" | "Uploaded" | "Migration pending";
}

export interface AIEvidenceItem {
  text: string;
}

export interface AIResponse {
  id: string;
  prompt: string;
  summary: string;
  evidence: AIEvidenceItem[];
  recommendation: string;
  confidence: number;
  guardrailNote: string;
  teamsMessage: string;
  relatedCampaignId?: string;
  declined?: boolean;
}

export interface ReportItem {
  id: string;
  name: string;
  status: "Ready" | "Generating" | "Scheduled";
  summaryBullets: string[];
}

export interface AlertRule {
  id: string;
  condition: string;
  channel: string;
  status: "Active" | "Paused";
}

export interface GuardrailItem {
  title: string;
  description: string;
}
