from fastapi import APIRouter
from .books import books

router : APIRouter = APIRouter()
router.include_router(books)

__all__ = ["router"]