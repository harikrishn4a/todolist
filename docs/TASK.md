# TASK.md — Sprint Contract

## Feature
- ID: feat-006
- Title: Filtering and sorting

## Scope — what will change
- `GET /tasks?filter=all|active|completed` query param
- `GET /tasks?sort=created_at` query param (ascending by creation order)
- Filter buttons (All / Active / Completed) and a sort control in the UI

## Exclusions — what will NOT change
- `sort=due_date` is NOT implemented in this feature — `due_date` doesn't exist until feat-007. Deferred to that feature, which will add the missing piece to the same query-param handling rather than reopening this seam from scratch.
- No pagination, no saved filter presets

## Files expected to change
- tests/test_tasks.py
- backend/routes/tasks.py (list_tasks reads filter/sort query params)
- frontend/src/App.tsx (filter/sort state)
- frontend/src/components/ (filter/sort controls)
- frontend/src/api.ts (listTasks accepts filter/sort)

## Verification standard
- `pytest tests/ -v` — all green
- Manual curl: `?filter=active`, `?filter=completed`, `?sort=created_at`
- `cd frontend && npm run build` — clean

## Acceptance criteria
- `GET /tasks?filter=active` returns only tasks where completed is false
- `GET /tasks?filter=completed` returns only tasks where completed is true
- `GET /tasks?sort=created_at` returns tasks ordered by creation timestamp ascending
- Filter and sort controls are visible and functional in the UI

## Invariants — must remain true throughout
- All feat-001..005 tests stay green
- `GET /tasks` with no query params keeps its current default behavior (all tasks, insertion order)
