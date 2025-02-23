from typing import List, Dict
from pydantic import BaseModel

class Chapter(BaseModel):
    number: int
    title: str
    content: str

class Book(BaseModel):
    title: str
    chapters: List[Chapter]
    summary: str = ""  # Optional field with default value

class UploadResponse(BaseModel):
    message: str