# from io import BytesIO

import re
import os
import tempfile

from functools import cache
from abc import ABC, abstractmethod
from typing import List, Callable, Optional
from docling.document_converter import DocumentConverter
from PIL import Image

from marker.models import create_model_dict
from marker.output import text_from_rendered
from marker.config.parser import ConfigParser
from marker.converters.pdf import PdfConverter

from src.logger import logger

Filepath = str
PDF = bytes

class BaseParser(ABC):
    @abstractmethod
    def to_html(
        self,
        file: Filepath | PDF,
        save_images: Optional[Callable[[list[Image.Image]], None]] = None
        ) -> str:
        pass

class DocLing(BaseParser):
    """ .Infos: https://github.com/DS4SD/docling """
    def __init__(self):
        self.__parser = DocLing.__create_parser()
    
    @classmethod
    @cache
    def __create_parser(cls):
        return DocumentConverter()

    def to_html(
        self,
        file: Filepath | PDF,
        save_images: Optional[Callable[[list[Image.Image]], None]] = None
        ) -> str:

        if isinstance(file, PDF):
            # parser only accepts filepaths
            with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:
                tmp_file.write(file)
                filepath = tmp_file.name
        else: filepath = file

        try:
            result = self.__parser.convert(filepath)
            styled_html = result.document.export_to_html()
            return self.__remove_styles_from_html(styled_html)
        finally:
            if isinstance(file, PDF):
                os.unlink(filepath)
    
    def __remove_styles_from_html(self, html: str) -> str:
        return re.sub(r'<style.*?>.*?</style>', '', html, flags=re.DOTALL)


class Marker(BaseParser):
    """ Infos: .https://github.com/VikParuchuri/marker """
    def __init__(self):
        self.__html_parser = Marker.__create_parser("html")
    
    @classmethod
    @cache
    def __create_parser(cls, output_format):
        config_parser = ConfigParser({
            "output_format": output_format
        })
        return PdfConverter(
            artifact_dict=create_model_dict(),
            renderer=config_parser.get_renderer()
        )
    
    def to_html(
        self,
        file: Filepath | PDF,
        save_images: Optional[Callable[[list[Image.Image]], None]] = None
        ) -> str:

        if isinstance(file, PDF):
            # parser only accepts filepaths
            with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:
                tmp_file.write(file)
                filepath = tmp_file.name
        else: filepath = file

        try:
            rendered = self.__html_parser(filepath)
            text, _, images = text_from_rendered(rendered)
            image_paths: dict[str, str] = save_images(images)
            return self.__replace_image_links(text, image_paths)
        finally:
            if isinstance(file, PDF):
                os.unlink(filepath)

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
        file: Filepath | PDF,
        save_images: Optional[Callable[[list[Image.Image]], None]] = None
        ):
        for parser in self.parsers:
            parser.to_html(file, save_images)

    