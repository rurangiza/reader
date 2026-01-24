import { Reader } from "@/features/books/Reader";

interface BookReadingParams {
  params: Promise<{
    id: string;
    number: number;
  }>;
}

export default async function BookReadingPage({ params }: BookReadingParams) {
  const { id, number: chapterNumber } = await params;

  return <Reader bookId={id} chapterNumber={chapterNumber} />;
}
