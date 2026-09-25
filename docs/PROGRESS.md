# Project Progress

## Current State
- Latest commit: feat-005: Persistence — tasks survive server restarts
- Test status: 9/9 passing (`pytest tests/ -v`)
- Lint: ruff clean (backend), eslint clean (frontend)
- Frontend: `npm run build` and `npm run typecheck` both clean

## Completed
- [x] Feature plan defined (docs/PROGRESS.md, AGENTS.md, docs/ARCHITECTURE.md scaffolded)
- [x] Tech stack decided: FastAPI + SQLite backend, React + Vite + TypeScript frontend, Tailwind CSS
- [x] TDD workflow established: red-green-refactor at API/endpoint seam, pytest as source of truth
- [x] Core feature list finalised (5 core + 2 additional features)
- [x] Repository layout defined: harness files under docs/, AGENTS.md and Makefile at root
- [x] Project scaffolding: FastAPI backend (CORS, SQLite connection helper) + Vite/React/TS frontend with Tailwind
- [x] feat-001: Add a task — POST/GET /tasks, TaskForm/TaskList UI
- [x] feat-002: Edit a task — PATCH /tasks/{id} (title), click-to-edit UI
- [x] feat-003: Delete a task — DELETE /tasks/{id}, hover-revealed delete control
- [x] feat-004: Mark a task complete/incomplete — PATCH /tasks/{id} (completed), checkbox + strikethrough UI
- [x] feat-005: Persistence — tasks survive server restarts (proven with a two-lifespan pytest test + manual uvicorn restart)

## In Progress
- None. All of feat-001 through feat-005 are `passing`. Session stopped here per instruction — feat-006 (filtering/sorting) and feat-007 (due dates) not started.

## Known Issues
- None known. All verification commands pass; see docs/SESSION-HANDOFF.md for exact evidence.

## Next Steps
1. feat-006: Filtering and sorting — GET /tasks?filter=... and ?sort=... query params, plus UI controls
2. feat-007: Due dates with overdue highlighting — optional due_date field, date input, overdue styling
