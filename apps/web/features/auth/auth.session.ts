import "server-only";
import ky from "ky";
import { cookies } from "next/headers";
import { cache } from "react";

import { User } from "../user/user.types";

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";
}

export const getCurrentUser = cache(async (): Promise<null | User> => {
  const cookieHeader = await cookies();
  const authToken = cookieHeader.get("AUTH_TOKEN")?.value;
  if (!authToken) return null;

  try {
    const user = await ky
      .get(`${getApiBaseUrl()}/users/me`, {
        cache: "no-store",
        headers: {
          cookie: cookieHeader.toString() ?? "",
        },
      })
      .json<User>();
    return {
      emailAddress: user.emailAddress,
      id: user.id,
      name: user.name,
    };
  } catch {
    // TODO: securely log this unexpected failure
    return null;
  }
});
