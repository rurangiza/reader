from fastapi import Depends

from reader.config import Settings
from reader.lib.parsers import DocumentParser, DocumentParserFactory
from reader.lib.storage import StorageClientFactory


def get_settings() -> Settings:
    return Settings()


def get_storage_client(settings: Settings = Depends(get_settings)):
    return StorageClientFactory.createStorageClient(settings)


def get_document_parser_client(
    settings: Settings = Depends(get_settings),
) -> DocumentParser:
    return DocumentParserFactory.createDocumentParser(settings)
