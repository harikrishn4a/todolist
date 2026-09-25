# AGENTS.md

## What this is
A full-stack todolist web application built with FastAPI (Python) on the backend and React + TypeScript on the frontend. It is designed for individual users who need a clean, distraction-free task manager. The app solves the problem of lightweight task tracking with persistence: tasks survive server restarts via SQLite, support optional due dates with overdue highlighting, and can be filtered and sorted. The UI follows an ultra-minimalist, markdown-document aesthetic using Tailwind CSS — no heavy containers, no cluttered navigation, just typography and whitespace.

## Current stage
Stage 1 — Core CRUD features. Building and verifying Add, Edit, Delete, and Mark Complete/Incomplete task operations via TDD (red-green-refactor, vertical slices). Each slice starts with one failing pytest test at the API/endpoint seam, then receives minimal implementation before the next slice begins.

## Stack
- Python 3.11+ with FastAPI and Uvicorn
- React 18 + TypeScript + Vite; Tailwind CSS for styling
- SQLite for persistence (file-based, no external DB server required)
- pytest + FastAPI TestClient as the test runner and source of truth for backend behavior
- Makefile for dev, test, and build commands; two processes in dev (uvicorn + Vite dev server)

## Repo structure
```
todolist/
  backend/
    main.py          — FastAPI app entry point, CORS config, server startup
    models.py        — SQLAlchemy or raw SQLite models/schema definitions
    routes/          — Endpoint handlers (tasks CRUD, filtering, sorting)
    database.py      — DB connection, table creation, persistence logic
  frontend/
    src/
      components/    — React UI components (TaskList, TaskItem, TaskForm, filters)
      api.ts         — fetch wrappers for all backend endpoints
      App.tsx        — Root component, layout, state management
    vite.config.ts   — Vite dev server config (proxy to backend)
    tailwind.config.js — Tailwind CSS configuration
  tests/
    test_tasks.py    — pytest tests covering all API endpoints (TDD, vertical slices)
  Makefile           — Targets: dev, test, lint, build
  feature_list.json  — Active feature tracking with status and evidence
  docs/
    docs/PROGRESS.md      — Completed, in-progress, and blocked features
    docs/DECISIONS.md     — Architecture and design decision log
    docs/CONSTRAINTS.md   — Hard limits that must never be violated
    docs/SESSION-HANDOFF.md — State left by the previous session
    docs/features.md      — Full feature list with tasks and implementation notes
    docs/ARCHITECTURE.md  — System design and data flow documentation
    docs/structure.md     — Detailed repo structure reference
  AGENTS.md          — Agent entry point (this file)
```

---

## Session start
1. Run `pwd` — confirm you are in the repo root
2. Read this file completely
3. Read `docs/PROGRESS.md` — understand current state
4. Read `docs/SESSION-HANDOFF.md` — see what the last session left
5. Run `git log --oneline -5` — see recent changes
6. Run `scripts/init.sh` — confirm baseline is not broken
7. Read `feature_list.json` — identify the current active feature
8. Pick exactly one unfinished feature. Work only that until verified or blocked.

If baseline verification is failing, repair that first before adding new scope.

## Session end
1. Run full verification (see Verification Commands below)
2. Update `docs/PROGRESS.md` if a feature completed, was added, or got blocked
3. Update `docs/features.md` — check off completed tasks, add implementation notes
4. Update `feature_list.json` — set new status and record evidence
5. Overwrite `docs/SESSION-HANDOFF.md` with this session's state
6. Commit with a descriptive message — leave a clean restart path

## Working rules
- One active feature at a time — never work on two features in parallel
- Before starting a feature, generate a sprint contract and save it to `docs/TASK.md`
- Do not claim completion without runnable verification evidence
- Do not rewrite `docs/PROGRESS.md` to hide unfinished work
- Do not remove or weaken tests to make a task appear complete
- Stay in scope — do not modify files unrelated to the current feature

## Completion gate
A feature moves to `passing` only when ALL of the following are true:
- [ ] Target behavior is implemented
- [ ] All verification commands pass (see below)
- [ ] Tasks checked off in `docs/features.md`
- [ ] Evidence recorded in `feature_list.json`
- [ ] Repository is restartable from `./init.sh`

## Verification commands
```bash
make test
```

Required checks:
```bash
# Run all backend tests (must pass with zero failures before any feature is marked done)
pytest tests/ -v

# Confirm the FastAPI server starts without errors
uvicorn backend.main:app --host 0.0.0.0 --port 8000 &
sleep 2 && curl -s http://localhost:8000/tasks | python3 -m json.tool

# Confirm frontend builds without errors
cd frontend && npm run build
```

## Escalation
- **Architecture decisions**: Check `docs/DECISIONS.md`, then ask the user
- **Unclear requirements**: Check `docs/features.md` for the feature definition, then ask the user
- **Repeated failures**: Mark feature as blocked in `feature_list.json`, flag for human review
- **Scope ambiguity**: Re-read `docs/TASK.md` sprint contract before expanding scope

## Constraints
See `docs/CONSTRAINTS.md` for hard limits that must never be violated.