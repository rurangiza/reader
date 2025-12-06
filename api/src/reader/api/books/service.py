from fastapi import Depends, HTTPException, UploadFile, status

from reader.config import Settings
from reader.dependencies import get_settings

ALLOWED_CONTENT_TYPES = ["application/pdf", "application/docs"]


def validate_upload_request(
    file: UploadFile, title: str, settings: Settings = Depends(get_settings)
):
    if file.size > settings.max_file_size_in_mb * 1_000_000:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File too large. Must be smaller than {MAX_FILE_SIZE_IN_MB}mb",
        )
    if len(title) < 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="The title can't be empty."
        )
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported content-type. Got '{file.content_type}' but expected '{', '.join(ALLOWED_CONTENT_TYPES)}'",
        )
