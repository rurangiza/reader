from pydantic import BaseModel, Field

class Response(BaseModel):
    message: str = Field(description="Response message")