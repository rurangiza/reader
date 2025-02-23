import json
from pathlib import Path
from typing import List, Literal

class FileDAL:
    FILE_UPLOAD_DIR = 'uploads'

    @staticmethod
    def save(
        content: bytes | str,
        title: str,
        directory: str = "uploads",
        extension: Literal["md", "html", "pdf"] = "pdf",
        ) -> str:
        """ Save files locally """
        # target_dir = Path(FileDAL.FILE_UPLOAD_DIR) / title
        target_dir = Path(directory)
        target_dir.mkdir(parents=True, exist_ok=True)
        
        mode = 'wb' if isinstance(content, bytes) else 'w'

        filepath = target_dir / f'{title}.{extension}'
        
        with open(filepath, mode) as f:
            if isinstance(content, dict):
                content = json.dumps(content)
            f.write(content)
        return str(filepath)