# from io import BytesIO

from PyPDF2 import PdfReader

from src.books.utils import LocalStorage

from typing import Dict

from marker.models import create_model_dict
from marker.output import text_from_rendered
from marker.config.parser import ConfigParser
from marker.converters.pdf import PdfConverter

from functools import cache

class PDFParser:
    def __init__(self, output_format: str = "html"):
        self.parser = PDFParser.__create_parser(output_format)
    
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
    
    def __parse(self, filepath) -> str:
        """ Converts PDF to text or Markdown """
        rendered = self.parser(filepath)
        text, _, images = text_from_rendered(rendered)
        return text, images

    def ingest(self, content: bytes, title: str) -> str:
        """ Converts PDFs to HTML while maintaining structure and images """
        title: Dict[str, str] = self.__normalize_title(title)
        pdfpath = LocalStorage.save(content, title['normalized'])
        text, images = self.__parse(pdfpath)
        LocalStorage.save(text, f"{title['normalized']}_raw")
        image_paths: dict[str, str] = LocalStorage.save_images(images)
        return self.__replace_html_links(text, image_paths)

    def __replace_html_links(self,text: str, image_paths: dict) -> str:
        """ Replace placeholder image text with corresponding links """
        newtext = text
        for image_name, image_path in image_paths.items():
            newtext = newtext.replace(image_name, image_path)
        return newtext

    def __normalize_title(self, file: str | bytes):
        reader = PdfReader(file)
        meta = reader.metadata
        title, author, year = [
            str(meta.title),
            str(meta.author),
            str(meta.creation_date.year)
        ]
        if (title and author and year):
            return {
                "original": title,
                "normalized": f"{title}-{author}({year})".lower().replace(" ", "_")
        }
    
