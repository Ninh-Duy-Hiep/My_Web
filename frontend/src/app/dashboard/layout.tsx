"use client";

import { AppSidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MobileFloatingButton } from "@/components/MobileFloatingButton";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <MobileFloatingButton />

      <div className="flex-1 space-y-4 p-4 pt-6">{children}</div>
    </SidebarProvider>
  );
}
