import "server-only";

import { cookies, headers } from "next/headers";

import { components } from "@api/types/api";

type AuthenticatedUser = components["schemas"]["CurrentUserResponseDto"];

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";
}

export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  const cookieHeader = (await headers()).get("cookie");
  const result = await fetch(`${getApiBaseUrl()}/users/me`, {
    method: "get",
    headers: {
      cookie: cookieHeader ?? "",
    },
    cache: "no-store",
  });
  if (!result.ok) return null;
  return result.json();
}
