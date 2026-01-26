import { Button } from "@repo/ui/components/button";
import { CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Upload } from "lucide-react";
import Link from "next/link";

import { Library } from "@/features/books/Library";

export default function BooksListingPage() {
  return (
  <>
      <div className="grid grid-cols-4">
        <CardHeader className="px-0 col-span-3">
          <CardTitle>Library</CardTitle>
          <CardDescription>
            Pick a book.
          </CardDescription>
        </CardHeader>
        <Button asChild variant={"outline"}>
          <Link className="w-fit justify-self-end" href={"/books/upload"}>
            <Upload/>
            Add Books
          </Link>
        </Button>
      </div>
      <Library/>
    </>
)
}