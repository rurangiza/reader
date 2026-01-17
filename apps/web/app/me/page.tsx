import { redirect } from "next/navigation";

import { getCurrentUser } from "@/data/auth";
import { ProfilePageClient } from "./ProfilePageClient";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return <ProfilePageClient />;
}
