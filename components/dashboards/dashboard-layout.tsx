"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SidebarNav } from "./sidebar-nav";
import { Topbar } from "./topbar";
import type { DashboardLayoutProps } from "@/types/dashboard";

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <SidebarNav />
      <SidebarInset>
        <Topbar title={title} />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
