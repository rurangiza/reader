import "server-only";

import { cookies } from "next/headers";

import { components } from "@api/types/api";

type AuthenticatedUser = components["schemas"]["CurrentUserResponseDto"];

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";
}

export async function getAuthToken(): Promise<string | null> {
  return (await cookies()).get("token")?.value ?? null;
}

export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const token = await getAuthToken();
  if (!token) return null;

  const result = await fetch(`${getApiBaseUrl()}/users/me`, {
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  if (!result.ok) return null;
  return result.json();
  // return res.ok;
}
