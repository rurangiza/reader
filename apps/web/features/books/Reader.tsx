"use client";

import Markdown from "react-markdown";

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

  if (isLoading) return;
  return (
    <div className="max-w-[756] mb-16">
      {!chapter ? (
        <h1>Not chapter found</h1>
      ) : (
        <>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance mb-8">
            {chapter.title}
          </h1>
          <Markdown
            components={{
              h2: (props) => (
                <h2
                  className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
                  {...props}
                ></h2>
              ),
              h3: (props) => (
                <h3
                  className="scroll-m-20 text-2xl font-semibold tracking-tight"
                  {...props}
                ></h3>
              ),
              p: (props) => <p className="text-2xl/8" {...props}></p>,
            }}
          >
            {chapter.content}
          </Markdown>
        </>
      )}
    </div>
  );
}
