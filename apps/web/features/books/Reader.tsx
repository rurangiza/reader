"use client";


import { Timer } from "lucide-react";

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
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance mb-4">
            {chapter.title}
          </h1>
          <div className="flex items-center text-stone-600">
            <Timer className="mr-2" size={20}/>{chapter.readTime === 0 ? 1 : chapter.readTime} min read
          </div>
          <Markdown className="mt-4">
            {chapter.content}
          </Markdown>
        </>
      )}
    </div>
  );
}
