"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { useCurrentUser } from "@/features/user/user.store";
import { SidebarInset, SidebarTrigger } from "@repo/ui/components/sidebar";
import { useEffect, useState } from "react";

import { User } from "@/features/user/user.types";

interface HomeViewProps {
  children: React.ReactNode;
  user: User;
}

export function HomeView({ children, user }: HomeViewProps) {
  const { setUser } = useCurrentUser();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(user);
    setReady(true);
  }, [user, setUser]);

  if (!ready) return null;
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        {children}
      </SidebarInset>
    </>
  );
}
