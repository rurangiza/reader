"use client";

import { $api } from "../api/client";

interface BookReaderProps {
  bookId: string;
  chapterNumber: number;
}

export function Reader({ bookId, chapterNumber }: BookReaderProps) {
  const { data: chapter, isLoading } = $api.useQuery(
    "get",
    "/books/{id}/chapters/{number}",
    {
      params: {
        path: {
          id: bookId,
          number: chapterNumber,
        },
      },
    },
  );
  return (
    <>
      {!isLoading && chapter && (
        <>
          <h1>{chapter.title ?? "Unknown Title"}</h1>
          <p>{chapter.content ?? "No content"}</p>
        </>
      )}
    </>
  );
}
