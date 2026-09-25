# TASK.md — Sprint Contract

## Feature
- ID: feat-003
- Title: Delete a task

## Scope — what will change
- Add `DELETE /tasks/{id}` FastAPI endpoint
- Return 404 for a non-existent task id
- Add delete control to the React task item

## Exclusions — what will NOT change
- No soft-delete/undo, no bulk delete

## Files expected to change
- tests/test_tasks.py
- backend/routes/tasks.py
- frontend/src/components/TaskItem.tsx
- frontend/src/api.ts (deleteTask)
- frontend/src/App.tsx

## Verification standard
- `pytest tests/ -v` — all green
- Manual curl: DELETE an existing task, DELETE a non-existent task
- `cd frontend && npm run build` — clean

## Acceptance criteria
- DELETE /tasks/{id} returns 204 and the task no longer appears in GET /tasks
- DELETE /tasks/{id} with a non-existent id returns 404
- Task disappears from the UI immediately, no reload

## Invariants — must remain true throughout
- feat-001/feat-002 tests stay green
