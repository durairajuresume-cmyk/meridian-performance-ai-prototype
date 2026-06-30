import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { WorkspaceProvider } from "@/components/providers/workspace-provider";
import { OverlayHost } from "@/components/overlays/overlay-host";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <WorkspaceProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto bg-background px-8 py-6">
            <div className="mx-auto max-w-[1400px]">{children}</div>
          </main>
        </div>
      </div>
      <OverlayHost />
    </WorkspaceProvider>
  );
}
