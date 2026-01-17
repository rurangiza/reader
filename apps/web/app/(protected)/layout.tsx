import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/auth.session";

import { HomeView } from "./HomeView";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <>
      <HomeView user={user}>{children}</HomeView>
    </>
  );
}
