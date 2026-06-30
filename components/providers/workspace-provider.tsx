"use client";

import { createContext, useCallback, useContext, useState, ReactNode } from "react";

interface ToastState {
  id: number;
  message: string;
}

interface TeamsModalState {
  open: boolean;
  message: string;
}

interface WorkspaceContextValue {
  drawerCampaignId: string | null;
  openCampaignDrawer: (campaignId: string) => void;
  closeCampaignDrawer: () => void;
  teamsModal: TeamsModalState;
  openTeamsModal: (message: string) => void;
  closeTeamsModal: () => void;
  toast: ToastState | null;
  showToast: (message: string) => void;
}

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [drawerCampaignId, setDrawerCampaignId] = useState<string | null>(null);
  const [teamsModal, setTeamsModal] = useState<TeamsModalState>({ open: false, message: "" });
  const [toast, setToast] = useState<ToastState | null>(null);

  const openCampaignDrawer = useCallback((campaignId: string) => {
    setDrawerCampaignId(campaignId);
  }, []);

  const closeCampaignDrawer = useCallback(() => {
    setDrawerCampaignId(null);
  }, []);

  const openTeamsModal = useCallback((message: string) => {
    setTeamsModal({ open: true, message });
  }, []);

  const closeTeamsModal = useCallback(() => {
    setTeamsModal((prev) => ({ ...prev, open: false }));
  }, []);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToast({ id, message });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3500);
  }, []);

  return (
    <WorkspaceContext.Provider
      value={{
        drawerCampaignId,
        openCampaignDrawer,
        closeCampaignDrawer,
        teamsModal,
        openTeamsModal,
        closeTeamsModal,
        toast,
        showToast,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error("useWorkspace must be used within WorkspaceProvider");
  }
  return ctx;
}
