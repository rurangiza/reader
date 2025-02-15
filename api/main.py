import sys
from pathlib import Path

import yaml
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from src.books import router as books
from src.chat import router as chat

BASE_DIR = Path(__file__).resolve()
sys.path.append(str(BASE_DIR / "src"))
sys.path.append(str(BASE_DIR / "data"))

with open('config.yml', 'r', encoding='utf-8') as f:
    config = yaml.safe_load(f)

api_router = APIRouter()
api_router.include_router(books.router)
api_router.include_router(chat.router)

app = FastAPI(
    title=config['APP']['NAME'],
    openapi_url=f"/{config['APP']['NAME']}/openapi.json",
)

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=config['APP']['ORIGINS'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
