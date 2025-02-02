from fastapi import FastAPI, APIRouter
from routes import upload, chat

api_router = APIRouter()
api_router.include_router(upload.router)
api_router.include_router(chat.router)


API_STR = "/api"
app = FastAPI(
    title="Reader",
    openapi_url=f"{API_STR}/openapi.json",
)
app.include_router(api_router, prefix=API_STR)