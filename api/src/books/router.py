"""
Router for handling book-related operations including PDF uploads and processing.
Provides endpoints for uploading PDFs and accessing them.
"""

from fastapi import APIRouter, File, Form, UploadFile, HTTPException

from data.image import ImageDAL
from data.file import FileDAL

from src.books.parsers import Marker, DocLing
from src.books.schemas import UploadResponse
from src.books.constants import MAX_FILE_SIZE

router = APIRouter(prefix="/books", tags=["books"])

@router.post(path="/upload", response_model=UploadResponse)
async def upload(file: UploadFile = File(...), title: str = Form(...)):
    """ Handle PDF uploads """
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )
    
    if len(title.strip()) == 0:
        raise HTTPException(
            status_code=400,
            detail="Title cannot be empty"
        )
        
    try:
        pdf = await file.read()
        if len(pdf) > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail="File too large. Maximum size is 10MB"
            )
        # m = Marker()
        d = DocLing()
        pdf_filepath = FileDAL.save(pdf, title, output_format=".pdf")
        # html: str = m.to_html(pdf_filepath, ImageDAL.save_images)
        html: str = d.to_html(pdf_filepath)
        html_filepath = FileDAL.save(html, title, output_format=".html")
        return {"message": f"Saved HTML at: {html_filepath}"}
    except (IOError, OSError) as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while processing the file. Please try again later.\n: {e}"
        ) from e
    return {"message": "ok"}

@router.get(path="/")
async def get_books():
    return "Here are all your books"

@router.get(path="/{book_id}")
async def get_book(book_id: str):
    if book_id == "115":
        return "Book 115: Lord of the rings"
    else:
        return "Book 000: Nothing Morey"

@router.patch(path="/{book_id}")
async def update_book(book_id: str):
    return f"Updated the book with ID: {book_id}"

@router.delete(path="/{book_id}")
async def delete_book(book_id: str):
    return f"Deleted the book with ID: {book_id}"