import sys
from pathlib import Path

import yaml
from contextlib import asynccontextmanager
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from neo4j import GraphDatabase
from neo4j.exceptions import ServiceUnavailable
import time

from src.books import router as books
from src.chat import router as chat
from src.logger import logger

""" .Configurations """

MAX_RETRIES = 5
RETRY_DELAY = 2

BASE_DIR = Path(__file__).resolve()
sys.path.append(str(BASE_DIR / "src"))
sys.path.append(str(BASE_DIR / "data"))

with open('config.yml', 'r', encoding='utf-8') as f:
    config = yaml.safe_load(f)

ENV = config['APP']['ENVIRONMENT']
URI = config['NEO4J'][f'{ENV}_URI']
USERNAME = config['NEO4J'][f'{ENV}_USERNAME']
PASSWORD = config['NEO4J'][f'{ENV}_PASSWORD']

AUTH = (USERNAME, PASSWORD)

""" Initializations & Setup """

@asynccontextmanager
async def lifespan(application: FastAPI):
    for attempt in range(MAX_RETRIES):
        try:
            application.state.driver = GraphDatabase.driver(URI, auth=AUTH)
            application.state.driver.verify_connectivity()
            break
        except ServiceUnavailable:
            if attempt == MAX_RETRIES - 1:
                raise
            logger.info(f"Neo4j not ready, retrying in {RETRY_DELAY} seconds...")
            time.sleep(RETRY_DELAY)
    yield
    if hasattr(application.state, 'driver'):
        application.state.driver.close()

app = FastAPI(
    title=config['APP']['NAME'],
    openapi_url=f"/{config['APP']['NAME']}/openapi.json",
    lifespan=lifespan
)

api_router = APIRouter()
api_router.include_router(books.router)
api_router.include_router(chat.router)

app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=config['APP']['ORIGINS'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
