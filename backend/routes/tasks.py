import sqlite3

from fastapi import APIRouter, HTTPException

from backend.database import get_connection
from backend.models import Task, TaskCreate, TaskUpdate

router = APIRouter()


def _row_to_task(row: sqlite3.Row) -> Task:
    return Task(
        id=row["id"],
        title=row["title"],
        completed=bool(row["completed"]),
        created_at=row["created_at"],
        due_date=row["due_date"],
    )


@router.post("/tasks", response_model=Task, status_code=201)
def create_task(task: TaskCreate) -> Task:
    conn = get_connection()
    cursor = conn.execute(
        "INSERT INTO tasks (title, completed, due_date) VALUES (?, 0, ?)", (task.title, task.due_date)
    )
    conn.commit()
    row = conn.execute("SELECT * FROM tasks WHERE id = ?", (cursor.lastrowid,)).fetchone()
    conn.close()
    return _row_to_task(row)


@router.get("/tasks", response_model=list[Task])
def list_tasks(filter: str = "all", sort: str = "created_at") -> list[Task]:
    where = ""
    if filter == "active":
        where = "WHERE completed = 0"
    elif filter == "completed":
        where = "WHERE completed = 1"

    if sort == "due_date":
        order_by = "due_date IS NULL, due_date"
    else:
        order_by = "created_at"

    conn = get_connection()
    rows = conn.execute(f"SELECT * FROM tasks {where} ORDER BY {order_by}").fetchall()
    conn.close()
    return [_row_to_task(row) for row in rows]


@router.patch("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task: TaskUpdate) -> Task:
    conn = get_connection()
    row = conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
    if row is None:
        conn.close()
        raise HTTPException(status_code=404, detail="Task not found")

    if task.title is not None:
        conn.execute("UPDATE tasks SET title = ? WHERE id = ?", (task.title, task_id))
    if task.completed is not None:
        conn.execute("UPDATE tasks SET completed = ? WHERE id = ?", (int(task.completed), task_id))
    if task.due_date is not None:
        conn.execute("UPDATE tasks SET due_date = ? WHERE id = ?", (task.due_date, task_id))
    conn.commit()
    row = conn.execute("SELECT * FROM tasks WHERE id = ?", (task_id,)).fetchone()
    conn.close()
    return _row_to_task(row)


@router.delete("/tasks/{task_id}", status_code=204)
def delete_task(task_id: int) -> None:
    conn = get_connection()
    row = conn.execute("SELECT id FROM tasks WHERE id = ?", (task_id,)).fetchone()
    if row is None:
        conn.close()
        raise HTTPException(status_code=404, detail="Task not found")

    conn.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()
