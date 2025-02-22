from uuid import uuid4
from dataclasses import dataclass, field
from abc import ABC, abstractmethod
from typing import List

UUID = str

""" Classes Definitions """

class Chapter:
    number: int
    content: str

@dataclass(kw_only=True)
class Book:
    title: str
    content: str = field(repr=False)
    chapters: List[Chapter]
    _chapters_count: int = field(init=False)

    def __post_init__(self) -> int:
        self._chapters_count = len(self.chapters)

class Database(ABC):
    @abstractmethod
    def add_book(self, book: Book):
        pass

    @abstractmethod
    def get_all_books(self):
        pass

    @abstractmethod
    def get_book_by_id(self, book_id: UUID):
        """ Retrieving book with known ID """
        pass

    @abstractmethod
    def get_book_by_title(self, title: str):
        """ searching for a book """
        pass

    @abstractmethod
    def update_book(self, book_id: str, book: Book):
        pass

    @abstractmethod
    def delete_all_books(self):
        pass

    @abstractmethod
    def delete_book_by_id(self, book_id: UUID):
        pass

class GraphDB(Database):
    """ Data Access Layer for Books operations """
    def __init__(self, driver):
        self._driver = driver

    # @timer
    def add_book(self, book: Book) -> str:
        records, _, _ = self._driver.execute_query(
            '''
            CREATE (book: Book {book_id: $id, title: $title, content: $content})
            RETURN book.title AS title
            ''',
            id=str(uuid4()),
            title=book['title'],
            content=book['content']
        )
        return records[0]['title']

    # @timer
    def get_all_books(self) -> List[Book]:
        # logger.info('Getting all books')
        records, _, _ = self._driver.execute_query(
            '''
            MATCH (b: Book)
            RETURN b.title as title, b.content as content, b.book_id as id
            '''
        )
        books = [{
            'title': record['title'],
            'content': record['content'],
            'id': record['id']
        } for record in records]
        # logger.warning(books)
        return books

    # @timer
    def get_book_by_id(self, book_id: UUID) -> Book:
        records, _, _ = self._driver.execute_query(
            '''
            MATCH (b:Book {book_id: $id})
            RETURN b.title as title, b.content as content, b.book_id as id
            ''',
            id=book_id
        )
        return records[0]

    def get_book_by_title(self, title: str) -> Book:
        records, _, _ = self._driver.execute_query(
            '''
            MATCH (b: Book {title: $title})
            RETURN b.title as title, b.content as content, b.book_id as id
            ''',
            title=title
        )
        return records[0]

    # @timer
    def update_book(self, book_id: str, book: Book) -> str:
        records, _, _ = self._driver.execute_query(
            '''
            MATCH (b:Book {book_id: $id})
            SET b.title = $title,
                b.content = $content
            RETURN b.title as title, b.content as content, b.book_id as id
            ''',
            id=book_id, title=book['title'], content=book['content']
        )
        return records[0]
    
    # @timer
    def update_book_title(self, book_id: UUID, title: str) -> str:
        records, _, _ = self._driver.execute_query(
            '''
            MATCH (b:Book {book_id: $id})
            SET b.title = $new_title
            RETURN b.title as title
            ''',
            id=book_id, new_title=title
        )
        return records[0]['title']


    # def get_chapter(self, book_id: UUID, chapter_id: int):
    #     logger.info('Getting a chapter')

    # @timer
    def delete_book_by_id(self, book_id: UUID):
        # logger.info('Removing a book')
        records, _, _ = self._driver.execute_query(
            '''
            MATCH (b:Book {book_id: $id})
            WITH b, b.title AS title
            DETACH DELETE b
            RETURN title
            ''',
            id=book_id
        )
        return records[0]['title']

    # @timer
    def delete_all_books(self) -> None:
        records, _, _ = self._driver.execute_query(
            '''
            MATCH (b:Book)
            WITH collect(b) AS books, count(b) AS totalCount
            FOREACH (b IN books | DETACH DELETE b)
            RETURN totalCount
            '''
        )
        return records[0]['totalCount']

class DocumentDB(Database):
    def __init__(self, mongodb_driver):
        self.driver = mongodb_driver

    def add_book(self, book: Book):
        pass

    def get_all_books(self):
        pass

    def get_book_by_id(self, book_id: UUID):
        """ Retrieving book with known ID """
        pass

    def get_book_by_title(self, title: str):
        """ searching for a book """
        pass

    def update_book(self, book: Book):
        pass

    def delete_all_books(self):
        pass

    def delete_book_by_id(self, book_id: UUID):
        pass


""" Playground """

def main():
    clean_code = Book(
        title='Clean Code',
        content="This is the content of the Clean Code",
        chapters=['hello', 'world']
    )
    print(clean_code)

if __name__ == "__main__":
    main()