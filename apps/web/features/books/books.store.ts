import { create } from "zustand";

import { $api } from "../api/client";

type Book = {
  chapters: Chapter[];
  id: string;
  title: string;
};
type Chapter = { number: number; title: string };

interface CurrentBooksState {
  books: Map<string, Book>;
  getBook: (bookId: string) => Book | undefined;
}

const useCurrentBookStore = create<CurrentBooksState>((set, get) => ({
  books: new Map<string, Book>(),
  getBook: (bookId: string) => {
    const storedBooks = get().books;
    const bookFound = storedBooks.get(bookId);
    if (bookFound) return bookFound;
    const { data: bookFetched } = $api.useQuery("get", "/books/{id}", {
      params: {
        path: {
          id: bookId,
        },
      },
    });
    if (bookFetched) {
      storedBooks.set(bookFetched.id, bookFetched);
    }
    return bookFetched;
  },
}));

export const useCurrentBooks = () => useCurrentBookStore();
