"use client";

import { CampaignDrawer } from "@/components/overlays/campaign-drawer";
import { TeamsModal } from "@/components/overlays/teams-modal";
import { Toast } from "@/components/overlays/toast";

export function OverlayHost() {
  return (
    <>
      <CampaignDrawer />
      <TeamsModal />
      <Toast />
    </>
  );
}
