
from pydantic import BaseModel
from fastapi import APIRouter, File, Form, UploadFile, HTTPException

from src.storage import LocalStorage
from utils import convert_pdf_to_html

MAX_FILE_SIZE = 10 * 1024 * 1024

class Response(BaseModel):
    message: str

router = APIRouter(prefix="/upload", tags=["pdf"])

@router.post(path="/", response_model=Response)
async def handle_pdf_uploads(file: UploadFile = File(...), title: str = Form(...)):
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
        html: str = convert_pdf_to_html(pdf, title)
        LocalStorage.save(html, f"{title}_processed")
    except (IOError, OSError) as e:
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing the file. Please try again later."
        ) from e
    return {"message": "ok"}