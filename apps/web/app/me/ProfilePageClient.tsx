"use client";

import { $api } from "@/api/client";

export function ProfilePageClient() {
  const { data: user, isLoading } = $api.useQuery("get", "/users/me");

  return <h1>Welcome {!isLoading && user?.name}</h1>;
}
