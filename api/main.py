
from fastapi import FastAPI, APIRouter
from routes import upload, chat
from fastapi.middleware.cors import CORSMiddleware

api_router = APIRouter()
api_router.include_router(upload.router)
api_router.include_router(chat.router)

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

app.include_router(api_router, prefix=API_STR)
