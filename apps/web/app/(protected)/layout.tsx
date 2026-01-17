import { getCurrentUser } from "@/features/auth/auth.session";
import { redirect } from "next/navigation";
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
      <HomeView children={children} user={user} />
    </>
  );
}
