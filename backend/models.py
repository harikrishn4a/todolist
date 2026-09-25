from pydantic import BaseModel, Field


class TaskCreate(BaseModel):
    title: str = Field(min_length=1)


class Task(BaseModel):
    id: int
    title: str
    completed: bool
    created_at: str
