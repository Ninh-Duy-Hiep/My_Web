"use client";

import { AppSidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MobileFloatingButton } from "@/components/MobileFloatingButton";
import { Header } from "@/components/Header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <MobileFloatingButton />

      <div className="flex flex-1 flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 p-4 pt-6">
            {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
