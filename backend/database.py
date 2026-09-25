import os
import sqlite3

DB_PATH = os.environ.get("TODOLIST_DB_PATH", os.path.join(os.path.dirname(__file__), "..", "tasks.db"))


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    conn = get_connection()
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            completed INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            due_date TEXT
        )
        """
    )
    conn.commit()
    conn.close()
