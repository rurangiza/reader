from pydantic import BaseModel
from typing import List, Dict

class UploadResponse(BaseModel):
    message: str

class Book(BaseModel):
    title: str
    content: str
    id: str