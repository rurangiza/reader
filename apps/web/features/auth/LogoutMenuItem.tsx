"use client";

import { DropdownMenuItem } from "@repo/ui/components/dropdown-menu";
import { toast } from "@repo/ui/components/sonner";
import { LogOut as LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { $api } from "@/features/api/client";

export function LogouOutMenuItem() {
  const router = useRouter();

  const { mutate: triggerLogout } = $api.useMutation("post", "/auth/logout", {
    onError: () => {
      toast.error("Failed to logout", {
        position: "top-center",
      });
      // TODO: handle better when token is expired but page not refreshed yet
      // leading to error -> refreshing redirects to /login
      router.push("/login");
    },
    onSuccess: () => {
      router.push("/login");
    },
  });

  function handleLogout() {
    triggerLogout({});
  }
  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOutIcon />
      Log out
    </DropdownMenuItem>
  );
}
