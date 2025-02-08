import os
from fastapi import APIRouter, File, Form, UploadFile
from pydantic import BaseModel

class Response(BaseModel):
    message: str

router = APIRouter(prefix="/upload", tags=["pdf"])

@router.post(path="/", response_model=Response)
async def handle_pdf_uploads(file: UploadFile = File(...), title: str = Form(...)):
    """ Handle PDF uploads """
    try:
        pdf = await file.read()
        save_file_locally(pdf, title)
    except Exception as e:
        return {"message": f"{e}"}
    return {"message": "ok"}

def save_file_locally(pdf, title):
    target_directory = 'uploads'
    os.makedirs(target_directory, exist_ok=True)
    file_path = os.path.join(target_directory, f'{title}.pdf')
    with open(file_path, 'wb') as f:
        f.write(pdf)