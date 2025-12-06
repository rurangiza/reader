from fastapi import FastAPI
from reader.api import register_routes

from .logging import LogLevels, configure_logging

configure_logging(LogLevels.info)

app = FastAPI()


@app.get("/")
def hello():
    return "Hello, world"


@app.get("/health")
def health_check():
    return "ok"


register_routes(app)
