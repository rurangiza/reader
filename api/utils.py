from src.parser import PDFParser
from src.storage import LocalStorage

def convert_pdf_to_html(content: bytes, title: str) -> str:
    """ Converts PDFs to HTML while maintaining structure and images """
    pdfpath = LocalStorage.save(content, title)
    parser = PDFParser()
    text, images = parser.parse(pdfpath)
    LocalStorage.save(text, f"{title}_raw")
    image_paths: dict[str, str] = LocalStorage.save_images(images)
    return replace_html_links(text, image_paths)

def replace_html_links(text: str, image_paths: dict) -> str:
    """ Replace placeholder image text with corresponding links """
    newtext = text
    for image_name, image_path in image_paths.items():
        newtext = newtext.replace(image_name, image_path)
    return newtext
