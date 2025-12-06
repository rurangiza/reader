from fastapi import APIRouter, Depends, Form, UploadFile, status

from reader.dependencies import get_storage_client
from reader.lib.storage import StorageClient

from .model import BookResponse
from .service import validate_upload_request

router = APIRouter(prefix="/books", tags=["Books"])


@router.post("", response_model=BookResponse, status_code=status.HTTP_202_ACCEPTED)
async def upload_book(
    file: UploadFile,
    title: str = Form(...),
    storage_client: StorageClient = Depends(get_storage_client),
):
    """Upload a PDF"""
    validate_upload_request(file, title)
    print(storage_client.__class__)
    storage_client.put_object()
