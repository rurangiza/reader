"use client";

import { SidebarInset } from "@repo/ui/components/sidebar";
import { useEffect, useState } from "react";

import { AppSidebar } from "@/components/app-sidebar";
import { useCurrentUser } from "@/features/user/user.store";
import { UserDTO } from "@/features/user/user.types";

interface HomeViewProps {
  children: React.ReactNode;
  user: UserDTO;
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
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"></header>
        <div className="flex flex-1 flex-col gap-4 px-10 h-full">
          {children}
        </div>
      </SidebarInset>
    </>
  );
}
