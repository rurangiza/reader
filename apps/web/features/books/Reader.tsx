"use client";


import { $api } from "../api/client";
import { Markdown } from "./Markdown";

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

  if (isLoading) return;
  return (
    <div className="max-w-[756px] mb-16">
      {!chapter ? (
        <h1>No chapter found</h1>
      ) : (
        <>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance mb-8">
            {chapter.title}
          </h1>
          <Markdown>
            {chapter.content}
          </Markdown>
        </>
      )}
    </div>
  );
}
