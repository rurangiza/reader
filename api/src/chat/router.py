import yaml

from fastapi import APIRouter, HTTPException

from fastapi import APIRouter
from pydantic import BaseModel
from openai import OpenAI

from src.logger import logger

from src.chat.schemas import (ChatRequest, ChatResponse)

with open('config.yml', 'r', encoding='utf-8') as f:
    config = yaml.safe_load(f)

client = OpenAI(api_key=config['OPENAI']['KEY'])

router = APIRouter(prefix="/chat", tags=["chat"])

@router.post(path="/", response_model=ChatResponse)
async def invoke(request: ChatRequest):
    logger.info("Chat: Query = %s", request.query)
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": request.query}
        ]
    )
    return {"response": completion.choices[0].message.content}