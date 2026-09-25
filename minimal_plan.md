# Todolist App — Feature Plan

## Tech stack
- Backend: FastAPI (Python) + SQLite
- Frontend: React + Vite + TypeScript
- Styling: Tailwind CSS — minimal, whitespace-heavy, markdown-document aesthetic
- Data flow: frontend calls backend via fetch with, CORS enabled on FastAPI
- Testing: pytest + FastAPI as source of truth for backend behavior; TDD (red-green-refactor, vertical slices) for every feature
- Dev setup: two processes — uvicorn for backend, Vite dev server for frontend

## Core features
1. Add a task
2. Edit a task
3. Delete a task
4. Mark a task complete / incomplete
5. Persistence — tasks survive server restarts (SQLite)

## Additional features
6. Filtering/sorting — view all / active / completed; sort by creation order or due date
7. Due dates with overdue highlighting — task has an optional due date; overdue incomplete tasks are visually flagged

## Constraints
- Every backend feature is built test-first: one failing pytest test (at the API/endpoint seam) → minimal implementation → next slice. No bulk test writing up front.
- Tests exercise the public FastAPI endpoints, never internal functions or the DB directly.
- Verify command: pytest must pass before a feature is considered done.
- Refactoring happens after green, not mixed into the red-green cycle.

## Frontend design guidance
- Keep design minimal, with a markdown like layout
- Ultra-Minimalist & Content-Focused. Eliminate unnecessary borders, heavy containers, and cluttered navigation. Let typography and whitespace create the visual hierarchy.
