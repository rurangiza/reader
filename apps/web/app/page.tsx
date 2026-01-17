import { getCurrentUser } from "@/data/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return (
    <div>
      <h1>Welcome Home</h1>
    </div>
  );
}
