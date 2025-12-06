from pydantic import BaseModel
from uuid import UUID

class BookUploadRequest(BaseModel):
    title: str

class BookResponse(BaseModel):
    id: UUID