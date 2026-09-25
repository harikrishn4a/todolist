> **Example** — Replace all `` with real session state. This file is overwritten by the agent at the end of every session.

# SESSION-HANDOFF.md

Overwritten at the end of every session. Agents read this at session start.

## Date
2025-01-31

## What was completed
- Harness artifacts created: AGENTS.md, docs/ARCHITECTURE.md, docs/CONSTRAINTS.md, docs/PROGRESS.md, docs/DECISIONS.md, docs/SESSION-HANDOFF.md, docs/structure.md, Makefile, feature_list.json
- Tech stack confirmed: FastAPI + SQLite backend, React + Vite + TypeScript frontend, Tailwind CSS styling
- Feature plan documented: 7 features across core (1–5) and additional (6–7) categories
- TDD workflow established: red-green-refactor at API/endpoint seam, pytest as source of truth
- Repository layout defined: harness files under docs/, source files not yet scaffolded

## Verification run
| Command | Result |
|---|---|
| `pytest` | not yet run — no backend source exists |
| `uvicorn main:app --reload` | not yet run — backend not scaffolded |
| `npm run dev` (frontend/) | not yet run — frontend not scaffolded |

## What is broken or unverified
- No backend source code exists yet (no `main.py`, no FastAPI app, no SQLite setup)
- No frontend source code exists yet (no Vite project, no React components)
- `pytest` cannot pass because there are no tests and no implementation
- CORS configuration not yet implemented
- Database schema not yet defined or migrated

## Next best step
- Feature: F-001 — Add a task
- Start from: Write one failing pytest test that POST /tasks with `{"title": "Buy milk"}` returns 201 and a JSON body containing `id` and `title`; scaffold the minimal FastAPI app in `backend/main.py` with SQLite via the `sqlite3` stdlib module to make it pass
- Pass when: `pytest backend/tests/test_tasks.py::test_add_task` returns green with no other tests skipped or errored

## Must not change
- TDD rule: no implementation code before a failing test exists for that slice
- Tests must exercise public FastAPI endpoints only — never internal functions or the DB directly
- `pytest` must be green before any feature is marked done in docs/PROGRESS.md
- Refactoring occurs only after tests are green, never during the red-green cycle
- Frontend design stays ultra-minimalist: whitespace-heavy, markdown-document aesthetic, no heavy borders or cluttered navigation
- Harness markdown files live under `docs/`; AGENTS.md, Makefile, scripts/, and feature_list.json stay at the repo root