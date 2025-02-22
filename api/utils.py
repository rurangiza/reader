import yaml

from contextlib import asynccontextmanager
from fastapi import FastAPI

from neo4j import GraphDatabase
from neo4j.exceptions import ServiceUnavailable

from src.logger import logger
from src.books.parsers import PDFParser
import time

MAX_RETRIES = 5
RETRY_DELAY = 3

with open('config.yml', 'r', encoding='utf-8') as f:
    config = yaml.safe_load(f)

if not config:
    raise Exception("Configuration: no config.yml found")

ENV = config['APP']['ENVIRONMENT']
URI = config['NEO4J'][f'{ENV}_URI']
USERNAME = config['NEO4J'][f'{ENV}_USERNAME']
PASSWORD = config['NEO4J'][f'{ENV}_PASSWORD']
AUTH = (USERNAME, PASSWORD)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # init_neo4j_driver(app)

    app.state.parser = PDFParser()

    yield
    if hasattr(app.state, 'driver'):
        app.state.driver.close()

def init_neo4j_driver(app):
    logger.info("Initializing the Neo4J driver")
    for attempt in range(MAX_RETRIES):
        try:
            app.state.driver = GraphDatabase.driver(URI, auth=AUTH)
            app.state.driver.verify_connectivity()
            break
        except ServiceUnavailable:
            if attempt == MAX_RETRIES - 1:
                raise Exception("Neo4J: max retries reached.")
            logger.info("Neo4j not ready, retrying in %s seconds...", RETRY_DELAY)
            time.sleep(RETRY_DELAY)
    logger.info("Initializing the parser")