import "server-only";

import { cookies } from "next/headers";

import { components } from "@api/types/api";
import { cache } from "react";

import ky from "ky";

type AuthenticatedUser = components["schemas"]["CurrentUserResponseDto"];

function getApiBaseUrl() {
  return process.env.INTERNAL_API_BASE_URL ?? "http://localhost:4000";
}

class UserDTO {
  constructor(
    public id: string,
    public name: string,
  ) {}
}

export const getCurrentUser = cache(async (): Promise<UserDTO | null> => {
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
      .json<AuthenticatedUser>();
    return new UserDTO(user.id, user.name);
  } catch {
    // TODO: securely log this unexpected failure
    return null;
  }
});
