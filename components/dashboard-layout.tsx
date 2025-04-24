"use client";

import type { ReactNode } from "react";

import { Header } from "@/components/header";
import { Navigation } from "@/components/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarRail
} from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: Readonly<DashboardLayoutProps>) {
  return (
    <div className="bg-background min-h-screen max-w-svw overflow-hidden">
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
