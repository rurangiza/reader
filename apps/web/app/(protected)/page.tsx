import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";

import { Library } from "@/features/books/Library";

export default function HomePage() {
  return (
    <>
      <CardHeader className="px-0">
        <CardTitle>Pick and read</CardTitle>
        <CardDescription>
          Enter the title, the author and the add chapters below.
        </CardDescription>
      </CardHeader>
      <Library />
    </>
  );
}
