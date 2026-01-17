"use client";

import { LogOut as LogOutIcon } from "lucide-react";
import { $api } from "@/features/api/client";
import { toast } from "@repo/ui/components/sonner";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@repo/ui/components/dropdown-menu";

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
      toast.success("You're logged out", {
        position: "top-center",
      });
      router.push("/login");
    },
  });

  async function handleLogout() {
    await triggerLogout({});
  }
  return (
    <DropdownMenuItem onClick={handleLogout}>
      <LogOutIcon />
      Log out
    </DropdownMenuItem>
  );
}
