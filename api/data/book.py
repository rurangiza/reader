from uuid import uuid4

from src.logger import logger, timer
from neo4j import GraphDatabase
from typing import List

UUID = str
BookTitle = str

class Chapter:
    number: int
    content: str

class Book:
    id: int
    title: str
    content: str
    chapters: List[Chapter]
    chapters_count: int

class BookDAL:
    """ Data Access Layer for Books operations """
    def __init__(self, driver: GraphDatabase):
        self._driver = driver

    @timer
    def add_book(self, book: Book) -> BookTitle:
        records, _, _ = self._driver.execute_query(
            '''
            CREATE (book: Book {book_id: $id, title: $title, content: $content})
            RETURN book.title AS title
            ''',
            id=str(uuid4()),
            title=book['title'],
            content=book['content'][:500]
        )
        return records[0]['title']

    @timer
    def get_all_books(self) -> List[Book]:
        logger.info('Getting all books')
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
        logger.warning(books)
        return books

    def get_specific_book(self, book_id: UUID) -> Book:
        records, _, _ = self._driver.execute_query(
            '''
            MATCH (b:Book {book_id: $id})
            RETURN b.title as title, b.content as content, b.book_id as id
            ''',
            id=book_id
        )
        return records[0]

    def update_book(self, book_id: str, book: Book) -> BookTitle:
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
    
    def update_specific_book_title(self, book_id: UUID, title: str) -> BookTitle:
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


    def delete_specific_book(self, book_id: UUID):
        logger.info('Removing a book')
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

    @timer
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
