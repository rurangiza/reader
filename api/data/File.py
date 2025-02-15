from pathlib import Path
from typing import List, Literal

class FileDAL:
    FILE_UPLOAD_DIR = 'uploads'

    @staticmethod
    def save(
        content: bytes | str,
        title: str,
        output_format: Literal[".md", ".html", ".pdf"] = ".html"
        ) -> str:
        """ Save files locally """
        # target_dir = Path(FileDAL.FILE_UPLOAD_DIR) / title
        target_dir = Path(FileDAL.FILE_UPLOAD_DIR)
        target_dir.mkdir(exist_ok=True)
        
        if isinstance(content, bytes):
            mode = 'wb'
        else:
            mode = "w"

        filepath = target_dir / f'{title}{output_format}'
        
        with open(filepath, mode) as f:
            f.write(content)
        return str(filepath)