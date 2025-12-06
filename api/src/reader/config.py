from pydantic_settings import SettingsConfigDict

from reader.lib.parsers.document_parser_client_type import DocumentParserClientType
from reader.lib.storage.storage_client_type import StorageClientType


class Settings:
    storage_client_type = StorageClientType.MINIO

    minio_endpoint: str
    minio_access_key: str
    minio_secret_key: str

    bucket_name: str

    docling_code_enrichement: bool = False
    document_parser_client: DocumentParserClientType = DocumentParserClientType.DOCLING

    max_file_size_in_mb: int = 5

    model_config = SettingsConfigDict(env_file=".env")
