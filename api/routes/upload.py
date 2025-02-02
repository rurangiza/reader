from fastapi import APIRouter
from pydantic import BaseModel

class Response(BaseModel):
    message: str

router = APIRouter(prefix="/upload", tags=["pdf"])

@router.get(path="/", response_model=Response)
def reads_users():
    return {"message": "ok"}