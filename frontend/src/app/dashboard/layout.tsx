"use client";

import { AppSidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MobileFloatingButton } from "@/components/MobileFloatingButton";
import { Header } from "@/components/Header";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex h-screen w-full bg-background">
        <div className="hidden border-r md:block w-64 shrink-0 p-4 space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-6 w-24" />
          </div>
          
          <div className="space-y-2">
             <Skeleton className="h-4 w-12 mb-4" />
             {[1, 2, 3].map((i) => (
               <Skeleton key={i} className="h-10 w-full rounded-md" />
             ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col min-h-screen">
          
          <header className="flex h-[72px] items-center justify-between border-b px-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex items-center gap-3">
               <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </header>

          <main className="flex-1 p-6 space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
               {[1, 2, 3, 4].map((i) => (
                 <Skeleton key={i} className="h-32 rounded-xl" />
               ))}
            </div>
            <Skeleton className="h-[300px] w-full rounded-xl" />
          </main>
        </div>
      </div>
    );
  }
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
