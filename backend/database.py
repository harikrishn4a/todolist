import os
import sqlite3

DB_PATH = os.environ.get("TODOLIST_DB_PATH", os.path.join(os.path.dirname(__file__), "..", "tasks.db"))


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn
