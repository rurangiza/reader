from pathlib import Path

from PIL import Image

class LocalStorage:

    UPLOAD_DIR = 'uploads'

    def __init__(self):
        pass

    @staticmethod
    def save(content: bytes | str, title: str) -> str:
        """ Save files locally """
        target_dir = Path(LocalStorage.UPLOAD_DIR)
        target_dir.mkdir(exist_ok=True)
        
        if isinstance(content, bytes):
            suffix = ".pdf"
            mode = 'wb'
        else:
            suffix = ".html"
            mode = "w"

        file_path = Path(LocalStorage.UPLOAD_DIR) / f'{title}{suffix}'
        
        with open(file_path, mode) as f:
            f.write(content)
        return str(file_path)
    
    @staticmethod
    def save_images(images: Image) -> dict[str, str]:
        output_dir = Path(LocalStorage.UPLOAD_DIR) / "images"
        output_dir.mkdir(exist_ok=True)
        image_paths = {}
        for image_name, pil_image in images.items():
            output_path = output_dir / image_name
            pil_image.save(output_path)
            # remove upload dir in path since image links are relative
            # to the html file that needs them
            image_paths[image_name] = str(output_path).replace(
                f"{LocalStorage.UPLOAD_DIR}/", ""
            )
        return image_paths
