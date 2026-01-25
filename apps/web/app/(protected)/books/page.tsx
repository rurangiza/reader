import { CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";

import { Library } from "@/features/books/Library";

export default function BooksListingPage() {
  return (
  <>
      <CardHeader className="px-0">
        <CardTitle>Library</CardTitle>
        <CardDescription>
          Pick a book.
        </CardDescription>
      </CardHeader>
      <Library/>
    </>
)
}