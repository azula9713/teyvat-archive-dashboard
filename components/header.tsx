"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "@/components/user-nav";

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-10 border-b">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <SidebarTrigger className="mr-2" />
          <h1 className="text-xl font-semibold md:hidden">Teyvat Archive</h1>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
