"use client";

import Link from "next/link";

import { $api } from "../api/client";

interface TableOfContentProps {
  bookId: string,
  chapterNumber: number,
  className?: string,
}

export function TableOfContents({bookId, chapterNumber, className}: TableOfContentProps) {
  const { data: openedBook } = $api.useQuery(
    "get",
    "/books/{id}",
    {
      params: {
        path: {
          id: bookId,
        },
      },
    },
  );
  return (
    <>
      {openedBook && (
        <div className={`w-64 max-h-[calc(100vh-6rem)] overflow-auto ${className ?? ""}`}>
          <p className="text-right text-xl mb-2 font-bold">{openedBook.title.toUpperCase()}</p>
          <p className="text-right">Table of Contents</p>
          {openedBook.chapters.map((chapter) => {
              return <Link className={`block text-right hover:text-stone-900 ${chapterNumber === chapter.number ? "text-stone-900" : "text-stone-400"}`} href={`/books/${bookId}/chapters/${chapter.number}`} key={chapter.number}>
                  {chapter.title}
                </Link>
            })}
        </div>
      )}
    </>
  )
}