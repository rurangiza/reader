"use client";

import { cn } from "@repo/ui/lib/utils";
import { useEffect, useState } from "react";

import { LogoutSticker } from "@/features/auth/LogoutSticker";
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
      <div className={cn(
              "bg-background relative flex w-full flex-1 flex-col",
              "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
            )}>
        <div className="relative flex flex-1 flex-col gap-4 px-10 h-full m-auto w-[756px] mt-32">
          <LogoutSticker />
          {children}
        </div>
      </div>
    </>
  );
}
