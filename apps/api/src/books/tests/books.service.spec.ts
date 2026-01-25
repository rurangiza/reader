import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { randomUUID } from "crypto";

import { DatabaseService } from "@/database/database.service";

import { BooksService } from "../books.service";

interface FindChapterParams {
  where: {
    bookId: string,
    number: number,
  }
}

describe("BooksService", () => {
  let booksService: BooksService;

  const mockBook = {
    chapters: [
      {
        content: "nothing",
        number: 1,
        title: "Age of tomorrow"
      }
    ],
    id: "5075a2e7-8ee5-4145-bafb-a82123f39502"
  }
  const mockLibrary = [ mockBook ]

  const mockDatabase = {
    chapter: {
      findFirstOrThrow: jest.fn().mockImplementation(
        (args: FindChapterParams) => {
          const {bookId, number} = args.where;
          const book = mockLibrary.find((book) => book.id === bookId)
          if (book) {
            return book.chapters.find((chapter) => chapter.number === number)
          }
          throw new NotFoundException("Not book found");
        },
      )
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, {provide: DatabaseService, useValue: mockDatabase}],
    }).compile()

    booksService = module.get<BooksService>(BooksService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  })

  describe("findChapter", () => {
    it("should return a chapter when a matching bookId and chapter number exist", async () => {
      const book = await booksService.findChapter(mockBook.id, 1);

      expect(book).toEqual(expect.objectContaining({
        title: mockBook.chapters[0]?.title,
      }))
      expect(mockDatabase.chapter.findFirstOrThrow).toHaveBeenCalledWith(expect.objectContaining({
        select: {
          content: true,
          number: true,
          title: true,
        },
        where: {
          bookId: mockBook.id,
          number: 1,
        }
      }))
    })

    it("should return not found when no chapter with matching bookId and number exist", async () => {
      mockDatabase.chapter.findFirstOrThrow.mockRejectedValueOnce(
        new NotFoundException('not found'),
      );
      await expect(booksService.findChapter(randomUUID(), 1)).rejects.toThrow(NotFoundException);
      expect(mockDatabase.chapter.findFirstOrThrow).toHaveBeenCalledTimes(1);
    })
  })
})