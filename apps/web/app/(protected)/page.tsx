import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { redirect } from "next/navigation";


export default function HomePage() {
  redirect("/books")
  return (
    <>
      <CardHeader className="px-0">
        <CardTitle>Home</CardTitle>
        <CardDescription>
          Where it all starts.
        </CardDescription>
      </CardHeader>
    </>
  );
}
