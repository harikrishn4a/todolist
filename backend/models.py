from datetime import date

from pydantic import BaseModel, Field, field_validator


def _validate_due_date(value: str | None) -> str | None:
    if value is not None:
        date.fromisoformat(value)
    return value


class TaskCreate(BaseModel):
    title: str = Field(min_length=1)
    due_date: str | None = None

    _validate_due_date = field_validator("due_date")(_validate_due_date)


class TaskUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1)
    completed: bool | None = None
    due_date: str | None = None

    _validate_due_date = field_validator("due_date")(_validate_due_date)


class Task(BaseModel):
    id: int
    title: str
    completed: bool
    created_at: str
    due_date: str | None
