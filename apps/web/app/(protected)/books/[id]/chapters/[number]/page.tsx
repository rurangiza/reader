
import { BackHomeButton } from "@/components/BackHomeButton";
import { Reader } from "@/features/books/Reader";
import { TableOfContents } from "@/features/books/TableOfContents";

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

  return (
    <div className="relative">
      <TableOfContents bookId={id} chapterNumber={Number(number)} className="absolute right-full mr-10 z-10"/>
      <div className="">
        <BackHomeButton/>
        <Reader bookId={id} chapterNumber={Number(number)} />
      </div>
    </div>
  );
}
