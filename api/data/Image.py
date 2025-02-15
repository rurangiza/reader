from pathlib import Path
from typing import List
from PIL import Image

class ImageDAL:

    IMAGE_UPLOAD_DIR = 'uploads'
    
    @classmethod
    def save_images(cls, images: List[Image.Image]) -> dict[str, str]:
        output_dir = Path(ImageDAL.IMAGE_UPLOAD_DIR) / "images"
        output_dir.mkdir(exist_ok=True)
        image_paths = {}
        for image_name, pil_image in images.items():
            output_path = output_dir / image_name
            pil_image.save(output_path)
            image_paths[image_name] = str(output_path).replace(
                f"{ImageDAL.IMAGE_UPLOAD_DIR}/", ""
            )
        return image_paths