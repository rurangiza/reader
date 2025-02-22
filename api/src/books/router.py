"""
Router for handling book-related operations including PDF uploads and processing.
Provides endpoints for uploading PDFs and accessing them.
"""

from fastapi import (
    APIRouter,
    File,
    Form,
    Body,
    UploadFile,
    HTTPException,Request
)

from data.image import ImageDAL
from data.book import BookDAL

from src.logger import logger

from typing import List

from src.books.schemas import UploadResponse, Book
from src.books.constants import MAX_FILE_SIZE
from src.books.utils import normalize_title

router = APIRouter(prefix="/books", tags=["books"])

@router.get(path="/", response_model=List[Book])
async def get_books(request: Request):
    """ .Get all books """
    db_driver = request.app.state.driver
    try:
        books: List[Book] = BookDAL(db_driver).get_all_books()
        return books
    except Exception as e:
        logger.error('Failed to retrieve all books. Cause: %s', e)
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve all books. Cause: {e}"
        ) from e
    

@router.get(path="/{book_id}", response_model=Book)
async def get_book_by_id(request: Request, book_id: str):
    """ Get a specific book by ID """
    db_driver = request.app.state.driver
    try:
        book: Book = BookDAL(db_driver).get_book_by_id(book_id)
        return book
    except Exception as e:
        logger.error('Failed to retrieve book with ID %s. Cause: %s', book_id, e)
        raise HTTPException(
            status_code=500,
            detail=f"Failed to retrieve book with ID {book_id}. Cause: {e}"
        ) from e

@router.post(path="/upload", response_model=UploadResponse)
async def add_book(
    request: Request,
    file: UploadFile = File(...),
    title: str = Form(...)
    ):
    """ Upload book to the database """
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=415,
            detail="Only PDF files are allowed"
        )
    
    if len(title.strip()) == 0:
        raise HTTPException(
            status_code=400,
            detail="Title cannot be empty"
        )
        
    try:
        pdf: bytes = await file.read()
        if len(pdf) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413,
                detail="File too large. Maximum 10mb"
            )
        
        title = normalize_title(title)
        parser = request.app.state.parser
        html: str = parser.to_html(pdf, ImageDAL.save_images)
        db_driver = request.app.state.driver
        response = BookDAL(db_driver).add_book({
            'title': title,
            'content': html
        })
        return {"message": f"Book '{response}' added to the database"}
    except (IOError, OSError) as e:
        logger.error('Failed to upload the book %s: Cause: %s', title, e)
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while processing the file. \
                Please try again later.\n: {e}"
        ) from e
    return {"message": "ok"}

@router.put(path="/{book_id}", response_model=Book)
async def update_book(
    request: Request,
    book_id: str,
    title: str = Body(..., embed=True),
    content: str = Body(..., embed=True)
    ):
    driver = request.app.state.driver
    try:
        updated_book: str = BookDAL(driver).update_book(
            book_id, {
                'title': title,
                'content': content
            })
        return updated_book
    except Exception as e:
        logger.error('Failed to update the book with ID %s. Cause: %s', book_id, e)
        raise HTTPException(
            status_code=500,
            detail=f"Failed to update the book {book_id}. Cause: {e}"
        ) from e

@router.patch(path="/{book_id}")
async def update_book_title(
    request: Request,
    book_id: str,
    title: str = Body(..., embed=True)
    ):
    driver = request.app.state.driver
    try:
        newtitle: str = BookDAL(driver).update_book_title(
            book_id,
            title
        )
        return f"Changed book title to {newtitle}"
    except Exception as e:
        logger.error('Failed to update book title to %s. Cause: %s', title, e)
        raise HTTPException(
            status_code=500,
            detail=f"Failed to update the title to {title}. Cause: {e}"
        ) from e

@router.delete(path="/{book_id}")
async def delete_book_by_id(request: Request, book_id: str):
    driver = request.app.state.driver
    try:
        title: str = BookDAL(driver).delete_book_by_id(book_id)
        return f"Book {title} was successfullly removed."
    except Exception as e:
        logger.error('Failed to delete the book with Id %s. CauseL %s', book_id, e)
        raise HTTPException(
            status_code=500,
            detail=f"Failed to remove the book. Cause: {e}"
        ) from e

@router.delete(path="/")
async def delete_books(request: Request):
    driver = request.app.state.driver
    try:
        count: str = BookDAL(driver).delete_all_books()
        return f'Library reset. Deleted {count} books in total.'
    except Exception as e:
        logger.error('Failed to reset the library. Cause: %s', e)
        raise HTTPException(
            status_code=500,
            detail=f"Failed to reset the library. Cause: {e}"
        ) from e
