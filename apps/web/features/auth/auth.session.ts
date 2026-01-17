import "server-only";

import { cookies } from "next/headers";

import { cache } from "react";

import ky from "ky";
import { User } from "../user/user.types";

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";
}

export const getCurrentUser = cache(async (): Promise<User | null> => {
  const cookieHeader = await cookies();
  const authToken = cookieHeader.get("AUTH_TOKEN")?.value;
  if (!authToken) return null;

  try {
    const user = await ky
      .get(`${getApiBaseUrl()}/users/me`, {
        headers: {
          cookie: cookieHeader.toString() ?? "",
        },
        cache: "no-store",
      })
      .json<User>();
    return {
      id: user.id,
      name: user.name,
      emailAddress: user.emailAddress,
    };
  } catch {
    // TODO: securely log this unexpected failure
    return null;
  }
});
