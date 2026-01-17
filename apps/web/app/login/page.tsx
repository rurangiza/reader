import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/auth.session";
import { LoginForm } from "@/features/auth/LoginForm";

export default async function Page() {
  const user = await getCurrentUser();
  if (user) redirect("/");

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
