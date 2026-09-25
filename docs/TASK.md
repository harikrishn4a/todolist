# TASK.md — Sprint Contract

## Feature
- ID: feat-005
- Title: Persistence — tasks survive server restarts

## Scope — what will change
- Add a pytest test that proves persistence across a simulated restart: create a task against one FastAPI lifespan cycle, then start a fresh lifespan cycle against the same DB file and confirm GET /tasks still returns it
- Document the DB file location in docs/ARCHITECTURE.md

## Exclusions — what will NOT change
- No migrations/schema versioning
- No multi-user or networked DB

## Files expected to change
- tests/test_tasks.py (new test, not using the per-test isolated `client` fixture since it needs the *same* DB file across two lifespans)
- docs/ARCHITECTURE.md

## Verification standard
- `pytest tests/ -v` — all green
- Manual: create a task via curl, restart uvicorn, GET /tasks still returns it

## Acceptance criteria
- GET /tasks returns all previously created tasks after the backend process is restarted
- No in-memory-only state; every write goes to SQLite before the response is returned
- DB file location is fixed and documented

## Invariants — must remain true throughout
- All feat-001..004 tests stay green
