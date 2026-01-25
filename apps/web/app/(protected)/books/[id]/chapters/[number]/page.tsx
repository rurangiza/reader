import { Reader } from "@/features/books/Reader";

interface BookReadingPageParams {
  params: Promise<{
    id: string;
    number: string;
  }>;
}

export default async function BookReadingPage({
  params,
}: BookReadingPageParams) {
  const { id, number } = await params;

  return <Reader bookId={id} chapterNumber={Number(number)} />;
}
