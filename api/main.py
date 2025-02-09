
import sys
from pathlib import Path

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from routes import upload, chat

BASE_DIR = Path(__file__).resolve()
sys.path.append(str(BASE_DIR / "src"))

FRONTEND_ORIGIN = "http://localhost:8080"
API_STR = "/api"

origins = [
    FRONTEND_ORIGIN,
]

app = FastAPI(
    title="Reader",
    openapi_url=f"{API_STR}/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter()
api_router.include_router(upload.router)
api_router.include_router(chat.router)

app.include_router(api_router, prefix=API_STR)
