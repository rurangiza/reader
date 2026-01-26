"use client";

import { Button } from "@repo/ui/components/button";
import { toast } from "@repo/ui/components/sonner";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { $api } from "../api/client";

export function LogoutSticker() {
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
  <Button className="fixed right-4 top-2 cursor-pointer hover:bg-transparent text-gray-400" onClick={handleLogout} variant={"ghost"}>
    Logout
    <LogOut/>
  </Button>
  )
}