import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve()
sys.path.append(str(BASE_DIR / "src"))
sys.path.append(str(BASE_DIR / "data"))

FRONTEND_ORIGIN = "http://localhost:8080"

class config:
    origins = [
        FRONTEND_ORIGIN,
    ]
    app_name = "reader"

