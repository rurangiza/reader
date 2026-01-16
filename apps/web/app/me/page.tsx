import { redirect } from "next/navigation";

import { getAuthenticatedUser } from "@/lib/auth";
import { ProfilePageClient } from "./ProfilePageClient";

export default async function ProfilePage() {
  const user = await getAuthenticatedUser();
  if (!user) redirect("/login");

  return <ProfilePageClient />;
}
