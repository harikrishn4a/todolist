# TASK.md — Sprint Contract

## Feature
- ID: feat-004
- Title: Mark a task complete / incomplete

## Scope — what will change
- Extend `PATCH /tasks/{id}` to accept an optional `completed` boolean (title becomes optional too, so either field can be sent independently)
- Add checkbox/toggle to the React task item

## Exclusions — what will NOT change
- No completion timestamps, no bulk mark-all-complete

## Files expected to change
- tests/test_tasks.py
- backend/models.py (TaskUpdate: title and completed both optional)
- backend/routes/tasks.py (update_task applies only provided fields)
- frontend/src/components/TaskItem.tsx (checkbox, strikethrough style)
- frontend/src/api.ts (toggleTask)
- frontend/src/App.tsx

## Verification standard
- `pytest tests/ -v` — all green, including existing title-edit tests
- Manual curl: PATCH {"completed": true} and {"completed": false}
- `cd frontend && npm run build` — clean

## Acceptance criteria
- PATCH /tasks/{id} with {"completed": true} returns 200 with completed: true
- PATCH /tasks/{id} with {"completed": false} returns 200 with completed: false
- Completed tasks show strikethrough styling
- Completed state persists (same SQLite row)

## Invariants — must remain true throughout
- feat-001/002/003 tests stay green — editing title alone must not reset completed, and vice versa
