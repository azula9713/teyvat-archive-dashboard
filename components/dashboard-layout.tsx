"use client";

import type { ReactNode } from "react";
import { Header } from "@/components/header";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Navigation } from "@/components/navigation";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: Readonly<DashboardLayoutProps>) {
  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <Sidebar>
          <Navigation />
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="container mx-auto p-4 md:p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
