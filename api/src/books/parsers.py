# from io import BytesIO

import re

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

class BaseParser(ABC):
    @abstractmethod
    def to_html(
        self,
        filepath: str,
        save_images: Optional[Callable[[list[Image.Image]], None]] = None
        ) -> str:
        pass

    @abstractmethod
    def to_markdown(
        self,
        filepath: str,
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
        filepath: str,
        save_images: Optional[Callable[[list[Image.Image]], None]] = None
        ) -> str:
        result = self.__parser.convert(filepath)
        styled_html = result.document.export_to_html()
        return self.__remove_styles_from_html(styled_html)

    def to_markdown(
        self,
        filepath: str,
        save_images: Optional[Callable[[list[Image.Image]], None]] = None
        ) -> str:
        result = self.__parser.convert(filepath)
        return result.document.export_to_markdown()
    
    def __remove_styles_from_html(self, html: str) -> str:
        return re.sub(r'<style.*?>.*?</style>', '', html, flags=re.DOTALL)

class Marker(BaseParser):
    """ Infos: .https://github.com/VikParuchuri/marker """
    def __init__(self):
        self.__html_parser = Marker.__create_parser("html")
        self.__md_parser = Marker.__create_parser("markdown")
    
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
        filepath: str,
        save_images: Optional[Callable[[list[Image.Image]], None]] = None
        ) -> str:
        logger.info("Marker: to_html()")
        rendered = self.__html_parser(filepath)
        text, _, images = text_from_rendered(rendered)
        logger.info("Marker: saving images")
        image_paths: dict[str, str] = save_images(images)
        logger.info("Marker: replacing image links")
        logger.info(image_paths)
        return self.__replace_image_links(text, image_paths)

    def to_markdown(
        self,
        filepath: str,
        save_images: Optional[Callable[[list[Image.Image]], None]] = None
        ) -> str:
        rendered = self.__md_parser(filepath)
        text, _, images = text_from_rendered(rendered)
        image_paths: dict[str, str] = save_images(images)
        return self.__replace_image_links(text, image_paths)

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
        filepath: str,
        save_images: Optional[Callable[[list[Image.Image]], None]] = None
        ):
        for parser in self.parsers:
            parser.to_html(filepath, save_images)
    
    def to_markdown(
        self,
        filepath: str,
        save_images: Optional[Callable[[list[Image.Image]], None]] = None
        ):
        for parser in self.parsers:
            parser.to_markdown(filepath, save_images)
    