# SESSION-HANDOFF.md

Overwritten at the end of every session. Agents read this at session start.

## Date
2026-09-25

## What was completed
- Scaffolded the project from scratch (no backend/frontend existed at session start):
  - Backend: FastAPI app (`backend/main.py`, lifespan-based startup), SQLite connection helper (`backend/database.py`), `requirements.txt`
  - Frontend: Vite + React + TypeScript (`frontend/`, created with `create-vite@5` — Node 18 on this machine is too old for the latest `create-vite`), Tailwind CSS v3 (v4 requires Node 20+, not available here)
- feat-001 — Add a task: `POST /tasks` + `GET /tasks`, TaskForm/TaskList components
- feat-002 — Edit a task: `PATCH /tasks/{id}` (title), click-to-edit TaskItem
- feat-003 — Delete a task: `DELETE /tasks/{id}`, hover-revealed delete control
- feat-004 — Mark complete/incomplete: extended the same `PATCH /tasks/{id}` (title and completed both optional on `TaskUpdate`, only provided fields written), checkbox + strikethrough UI
- feat-005 — Persistence: already correct by construction (real on-disk sqlite3 file since feat-001); added a pytest test proving it across two simulated lifespans, documented `DB_PATH` in docs/ARCHITECTURE.md, and manually verified with a real `uvicorn` kill + restart
- All five features moved through TDD (red before green, one vertical slice at a time) and were verified end-to-end with a Playwright-driven headless-Chromium screenshot in addition to pytest

## Verification run
| Command | Result |
|---|---|
| `pytest tests/ -v` | 9 passed |
| `ruff check .` | All checks passed |
| `cd frontend && npm run build` | Clean |
| `cd frontend && npm run typecheck` | Clean |
| `cd frontend && npm run lint` | Clean |
| `bash scripts/init.sh` | Full baseline green (setup + build + typecheck + lint + test) |
| Manual uvicorn restart | Task created before kill was still present after restart |

## What is broken or unverified
- Nothing known broken. feat-006 (filtering/sorting) and feat-007 (due dates) are `not_started` — out of scope for this session per instruction.
- Node on this machine is v18.20.8 — Tailwind v4 and the latest `create-vite`/eslint/etc. require Node 20+. Used compatible older versions (`create-vite@5`, `tailwindcss@3`) instead; this works but if Node is upgraded later, nothing forces a migration — just noting it's not on the latest major versions.

## Next best step
- Feature: feat-006 — Filtering and sorting
- Start from: confirm the seam with the user first if anything is ambiguous (query params on GET /tasks are already specified in docs/features.md — `?filter=all|active|completed`, `?sort=created_at|due_date` — but due_date sorting depends on feat-007 not yet existing, so that combination may need clarification), then write one failing pytest test at a time (e.g. `GET /tasks?filter=active` returns only incomplete tasks)
- Pass when: all filter/sort pytest tests green, UI filter/sort controls wired up, `make check` clean

## Must not change
- TDD rule: no implementation code before a failing test exists for that slice
- Tests must exercise public FastAPI endpoints only — never internal functions or the DB directly
- `pytest` must be green before any feature is marked done in docs/PROGRESS.md
- Refactoring occurs only after tests are green, never during the red-green cycle
- Frontend design stays ultra-minimalist: whitespace-heavy, markdown-document aesthetic, no heavy borders or cluttered navigation
- Harness markdown files live under `docs/`; AGENTS.md, Makefile, scripts/, and feature_list.json stay at the repo root
- `backend/models.py` `TaskUpdate` has both `title` and `completed` as optional fields with only-provided-fields-applied semantics in `update_task` — feat-006/007 additions (e.g. `due_date`) should follow the same pattern rather than requiring all fields on every PATCH

## Notes for next session
- A stray `.env` file at the repo root contains what looks like a live `ANTHROPIC_API_KEY`. It is gitignored and not tracked by git, and is unrelated to this app's stack (nothing in the code references it) — flagged to the user this session but left untouched. Worth confirming with the user whether it should be removed from the repo directory or the key rotated.
- `docs/prompt.md` and `reflections.md` at the repo root are empty, untracked files not created by this session — left alone.
