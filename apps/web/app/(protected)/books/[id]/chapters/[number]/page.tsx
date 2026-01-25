import { Reader } from "@/features/books/Reader";

interface BookReadingPageParams {
  params: {
    id: string;
    number: string;
  };
}

export default function BookReadingPage({ params }: BookReadingPageParams) {
  const { id, number } = params;

  return <Reader bookId={id} chapterNumber={Number(number)} />;
}
