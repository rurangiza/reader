# from io import BytesIO

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
    
    def parse(self, filepath) -> str:
        """ Converts PDF to text or Markdown """
        rendered = self.parser(filepath)
        text, _, images = text_from_rendered(rendered)
        return text, images