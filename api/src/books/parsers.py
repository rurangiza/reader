# from io import BytesIO

import re
import os
import tempfile

from abc import ABC, abstractmethod
from typing import List, Callable, Optional
from docling.document_converter import DocumentConverter
from PIL import Image

from marker.models import create_model_dict
from marker.output import text_from_rendered
from marker.config.parser import ConfigParser
from marker.converters.pdf import PdfConverter

from src.logger import logger

FileInput = str | bytes

class BaseParser(ABC):
    @abstractmethod
    def to_html(
        self,
        file: FileInput,
        store_images: Optional[Callable] = None
        ) -> str:
        pass

    @abstractmethod
    def to_text(
        self,
        file: FileInput,
        store_images: Optional[Callable] = None
        ) -> str:
        pass

    def _get_filepath(self, file: FileInput):
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

    def to_html(
        self,
        file: FileInput,
        store_images: Optional[Callable] = None
        ) -> str:
        filepath = self._get_filepath(file)
        try:
            result = self.__parser.convert(filepath)
            styled_html = result.document.export_to_html()
            return self.__remove_styles_from_html(styled_html)
        finally:
            if isinstance(file, bytes):
                os.unlink(filepath)

    def to_text(
        self,
        file: FileInput,
        store_images: Optional[Callable] = None
        ) -> str:
        raise NotImplementedError(
            f"{self.__class__.__name__} parser does not support text conversion"
        )
    
    def __create_parser(self):
        return DocumentConverter()
    
    def __remove_styles_from_html(self, html: str) -> str:
        return re.sub(r'<style.*?>.*?</style>', '', html, flags=re.DOTALL)


class Marker(BaseParser):
    """ Infos: .https://github.com/VikParuchuri/marker """
    def __init__(self):
        self.__html_parser = self.__create_parser("html")
    
    def to_html(
        self,
        file: FileInput,
        store_images: Optional[Callable] = None
        ) -> str:

        filepath = self._get_filepath(file)
        try:
            rendered = self.__html_parser(filepath)
            text, _, images = text_from_rendered(rendered)
            image_paths: dict[str, str] = store_images(images)
            return self.__replace_image_links(text, image_paths)
        finally:
            if isinstance(file, bytes):
                os.unlink(filepath)
    
    def to_text(
        self,
        file: FileInput,
        store_images: Optional[Callable] = None
        ) -> str:
        raise NotImplementedError(
            f"{self.__class__.__name__} parser does not support text conversion"
        )

    def __create_parser(self, output_format):
        config_parser = ConfigParser({
            "output_format": output_format
        })
        return PdfConverter(
            artifact_dict=create_model_dict(),
            renderer=config_parser.get_renderer()
        )

    def __replace_image_links(self,text: str, image_paths: dict) -> str:
        """ Replace placeholder image text with corresponding links """
        newtext = text
        for image_name, image_path in image_paths.items():
            newtext = newtext.replace(image_name, image_path)
        return newtext


class BatchParser(BaseParser):
    def __init__(self):
        self.parsers: List[BaseParser] = [
            Marker(),
            DocLing(),
        ]
    
    def to_html(
        self,
        file: FileInput,
        store_images: Optional[Callable] = None
        ):
        for parser in self.parsers:
            parser.to_html(file, store_images)
    
    def to_text(
        self,
        file: FileInput,
        store_images: Optional[Callable] = None
        ):
        for parser in self.parsers:
            parser.to_text(file, store_images)

class PDFParser:
    def __init__(self):
        self.parser = DocLing
    
    def to_text(self):
        pass