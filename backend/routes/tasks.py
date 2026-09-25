from fastapi import APIRouter

from backend.database import get_connection
from backend.models import Task, TaskCreate

router = APIRouter()


@router.post("/tasks", response_model=Task, status_code=201)
def create_task(task: TaskCreate) -> Task:
    conn = get_connection()
    cursor = conn.execute(
        "INSERT INTO tasks (title, completed) VALUES (?, 0)", (task.title,)
    )
    conn.commit()
    row = conn.execute("SELECT * FROM tasks WHERE id = ?", (cursor.lastrowid,)).fetchone()
    conn.close()
    return Task(id=row["id"], title=row["title"], completed=bool(row["completed"]), created_at=row["created_at"])


@router.get("/tasks", response_model=list[Task])
def list_tasks() -> list[Task]:
    conn = get_connection()
    rows = conn.execute("SELECT * FROM tasks ORDER BY id").fetchall()
    conn.close()
    return [
        Task(id=row["id"], title=row["title"], completed=bool(row["completed"]), created_at=row["created_at"])
        for row in rows
    ]
