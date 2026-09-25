# Project Progress

## Current State
- Latest commit: Frontend design pass — "todo.md" visual identity with Space Mono + bracket-glyph signature
- Test status: 17/17 passing (`pytest tests/ -v`)
- Lint: ruff clean (backend), eslint clean (frontend)
- Frontend: `npm run build` and `npm run typecheck` both clean
- Portfolio-ready: distinctive visual identity, responsive design (desktop + mobile), intentional color/type system

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
- [x] feat-006: Filtering and sorting — GET /tasks?filter=all|active|completed&sort=created_at, FilterBar UI
- [x] feat-007: Due dates with overdue highlighting — optional due_date field, sort=due_date (nulls last), date input, red overdue styling
- [x] Frontend design polish — Space Mono typography, paper/ink/line/mark color tokens, bracket-glyph checkboxes `[ ]`/`[x]` and filters `[All]`, page title `todo.md`, responsive stacking on mobile, revised empty-state copy

## In Progress
- None. All of feat-001 through feat-007 are `passing`, and the frontend design pass is complete.

## Known Issues
- TaskUpdate.due_date can't be explicitly cleared back to null via PATCH (only-provided-fields-applied semantics treat null and "not provided" the same way) — not required by any test/acceptance criteria, so left as-is rather than adding an untested sentinel-based workaround.
- No UI control to edit an existing task's due date (backend PATCH supports it and is tested); only settable at creation time in the UI.

## Next Steps
None currently assigned — all core (feat-001..005) and additional (feat-006, feat-007) features from feature_list.json are passing.
