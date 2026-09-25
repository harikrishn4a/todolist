# TASK.md — Sprint Contract

## Feature
- ID: feat-007
- Title: Due dates with overdue highlighting

## Scope — what will change
- `POST /tasks` accepts optional `due_date` (ISO 8601 `YYYY-MM-DD` string, nullable)
- `PATCH /tasks/{id}` accepts optional `due_date` (same only-provided-fields pattern as title/completed)
- `GET /tasks` response includes `due_date` for every task (null if unset)
- `GET /tasks?sort=due_date` extends the existing order_by branch from feat-006
- Frontend: due date input on the add form, due date displayed on each task, overdue incomplete tasks visually flagged

## Exclusions — what will NOT change
- No due time (date only)
- No reminders/notifications

## Files expected to change
- tests/test_tasks.py
- backend/models.py (due_date on TaskCreate, TaskUpdate, Task)
- backend/database.py (add due_date column)
- backend/routes/tasks.py (create/update/list handle due_date; sort=due_date)
- frontend/src/api.ts (Task.due_date, addTask/updateTask signatures, Sort type)
- frontend/src/components/TaskForm.tsx (date input)
- frontend/src/components/TaskItem.tsx (display due date, overdue style)
- frontend/src/components/FilterBar.tsx (sort option)

## Verification standard
- `pytest tests/ -v` — all green
- Manual curl: POST/PATCH with due_date, invalid format returns 422, sort=due_date
- `cd frontend && npm run build` — clean

## Acceptance criteria
- POST/PATCH accept optional due_date in YYYY-MM-DD; invalid format returns 422
- GET /tasks includes due_date (null if not set) for every task
- Overdue incomplete tasks are visually distinct; tasks with no due date are never flagged as overdue
- Completed overdue tasks are not flagged (only incomplete + past due)

## Invariants — must remain true throughout
- All feat-001..006 tests stay green
- TaskUpdate keeps its only-provided-fields-applied semantics
