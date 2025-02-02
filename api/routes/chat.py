from fastapi import APIRouter
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class Question(BaseModel):
    text: str

class Response(BaseModel):
    answer: str

router = APIRouter(prefix="/chat", tags=["chat"])

client = OpenAI()

@router.post(path="/", response_model=Response)
async def invoke(q: Question):
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": q.text}
        ]
    )
    return {"answer": completion.choices[0].message.content}