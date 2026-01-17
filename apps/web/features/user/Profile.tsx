"use client";

import { useCurrentUser } from "./user.store";

export function Profile() {
  const { user } = useCurrentUser();

  return <h1>Welcome {user && user.name}</h1>;
}
