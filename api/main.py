

from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from src.books import router as books
from configs import config

api_router = APIRouter()
api_router.include_router(books.router)

app = FastAPI(
    title=config.app_name,
    openapi_url=f"/{config.app_name}/openapi.json",
)

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
