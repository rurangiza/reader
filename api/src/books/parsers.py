import os
import tempfile

from typing import Dict, List
from abc import ABC, abstractmethod
from docling.document_converter import DocumentConverter

from src.logger import logger


class BaseParser(ABC):

    @abstractmethod
    def to_md(
        self,
        file: str | bytes
        ) -> str:
        pass

    def _get_filepath(self, file: str | bytes):
        """ Returns original path or path to a temporary file """
        if not isinstance(file, (str, bytes)):
            raise TypeError(f"Expected str or bytes, got {type(file).__name__}")
        if isinstance(file, str):
            return file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:
            tmp_file.write(file)
            return tmp_file.name

class DocLing(BaseParser):
    """ .Infos: https://github.com/DS4SD/docling """
    def __init__(self):
        self.__parser = self.__create_parser()
    
    def to_md(self, file: str | bytes) -> str:
        filepath = self._get_filepath(file)
        try:
            result = self.__parser.convert(filepath)
            return result.document.export_to_markdown()
        finally:
            if isinstance(file, bytes):
                os.unlink(filepath)
    
    def __create_parser(self):
        return DocumentConverter()

class PDFParser:
    def __init__(self):
        self._parsers: Dict[str, BaseParser] = {
            "docling": DocLing()
        }
    
    def run(self, file: str) -> Dict[str, str]:
        logger.info('Parser: starting..')
        markdown: str = self._to_md(file)
        return self._split_by_chapters(markdown)
    
    def _to_md(self, file: str | bytes) -> str:
        logger.info('Parser: converting PDF to Markdown')
        parser = self._parsers.get('docling')
        return parser.to_md(file)

    def _split_by_chapters(self, markdown_text) -> List[Dict]:
        logger.info('Parser: splitting by chapter')

        chapters = []
        current_title = None
        current_content = []
        count = 0
        
        for line in markdown_text.split('\n'):
            if line.startswith('## '):
                # Save previous chapter if exists
                if current_title:
                    chapters.append({
                        'number': count,
                        'title': current_title,
                        'content': ('\n'.join(current_content)).strip('\n')
                    })
                    current_content = []
                    count += 1
                # Start new chapter
                current_title = line.replace('## ', '').strip()
            elif current_title:
                current_content.append(line)
        
        # Save final chapter
        if current_title:
            chapters.append({
                'number': count,
                'title': current_title,
                'content': ('\n'.join(current_content)).strip('\n')
            })
            
        return chapters