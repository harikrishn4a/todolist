> **Example** — The Template section shows the format; the Example section shows a filled entry. Generate new entries in this format as decisions are made.

# DECISIONS.md

Record every significant architectural or dependency decision here.
Agents read this before making choices that affect the project structure.

## Template

### YYYY-MM-DD: 
- **Decision**: What was decided
- **Reason**: Why this was chosen
- **Rejected alternatives**: What else was considered and why it was rejected
- **Constraints introduced**: Any new rules this decision creates
- **Revisit when**: Conditions under which this should be reconsidered

---

## Example

### 2026-01-15: Use Redis for session caching
- **Decision**: Cache user session data in Redis with 5-minute TTL
- **Reason**: High read frequency on every API call, small data size per session
- **Rejected alternatives**: PostgreSQL materialized view — too costly to maintain under high write frequency
- **Constraints introduced**: Cache must be actively invalidated on write; TTL alone is not sufficient
- **Revisit when**: Session data size grows beyond 10KB per user or write frequency drops significantly

---

## Decisions

### 2026-01-15: Use FastAPI + SQLite for backend
- **Decision**: Backend is built with FastAPI (Python) serving a REST API; SQLite is the persistence layer
- **Reason**: FastAPI provides automatic OpenAPI docs, fast iteration, and pytest integration with the `TestClient` — a tight fit for TDD at the endpoint seam. SQLite requires zero infrastructure, satisfying the goal of tasks surviving server restarts without a separate database process
- **Rejected alternatives**: Flask — less ergonomic for typed request/response models and no built-in async support; PostgreSQL — operational overhead not justified for a single-user todolist; Django — too much convention overhead for a minimal CRUD app
- **Constraints introduced**: All backend tests must exercise public FastAPI endpoints via `TestClient`, never internal functions or the SQLite file directly; SQLite file must be committed to `.gitignore` and never checked in
- **Revisit when**: The app needs multi-user support, concurrent writes at scale, or a hosted deployment where SQLite's single-writer model becomes a bottleneck

---

### 2026-01-15: Use React + Vite + TypeScript for frontend
- **Decision**: Frontend is a React SPA scaffolded with Vite, written in TypeScript
- **Reason**: Vite's dev server starts instantly and supports hot module replacement, keeping the red-green loop fast on the frontend. TypeScript catches shape mismatches between API responses and UI components at compile time
- **Rejected alternatives**: Plain HTML + vanilla JS — no component model, harder to manage task list state; Next.js — server-side rendering is unnecessary overhead for a local dev app with a separate FastAPI backend; Create React App — slower builds, officially unmaintained
- **Constraints introduced**: The frontend and backend run as two separate processes (Vite dev server + uvicorn); CORS must be enabled on FastAPI for all local origins; API calls use `fetch`, not a third-party HTTP client
- **Revisit when**: The project requires SSR, static export, or the backend is merged into a single process

---

### 2026-01-15: Use Tailwind CSS with minimal, whitespace-heavy aesthetic
- **Decision**: Styling is done exclusively with Tailwind CSS utility classes; the visual style is ultra-minimalist — no heavy borders, no card containers, typography and whitespace define hierarchy
- **Reason**: Tailwind eliminates the need for a separate CSS file per component and keeps styles co-located with markup. The markdown-document aesthetic is a stated design constraint and Tailwind's spacing scale makes it easy to enforce consistently
- **Rejected alternatives**: CSS Modules — more boilerplate, separate files; styled-components — runtime overhead, adds a dependency; plain CSS — no design-system constraints, easy to drift from the minimal aesthetic
- **Constraints introduced**: No third-party component libraries (e.g. MUI, Chakra) may be introduced; all UI elements must follow the minimal aesthetic — eliminate borders, shadows, and decorative containers unless there is an explicit reason
- **Revisit when**: A design system or brand refresh is required, or Tailwind's utility-class verbosity becomes a maintenance burden

---

### 2026-01-15: Test-first at the FastAPI endpoint seam only
- **Decision**: Every backend feature begins with one failing pytest test written against the public FastAPI endpoint (via `TestClient`). No test is written against internal functions, service classes, or the SQLite database directly. The red-green-refactor cycle is one vertical slice at a time
- **Reason**: Tests at the endpoint seam survive internal refactors, act as living API documentation, and enforce that the public contract is always the source of truth. Writing tests against internals creates coupling to implementation details that breaks on any restructuring
- **Rejected alternatives**: Unit-testing individual functions — couples tests to implementation, not behavior; writing all tests up front — violates the TDD constraint that only one failing test exists at a time; integration tests that query SQLite directly — bypasses the interface and couples tests to the storage layer
- **Constraints introduced**: `pytest` must pass before any feature is marked done (see `docs/PROGRESS.md`); refactoring only happens after green, never interleaved with red-green; no bulk test writing; seams must be confirmed before writing any test (see `docs/CONSTRAINTS.md`)
- **Revisit when**: A feature requires complex domain logic that genuinely benefits from isolated unit tests, or a frontend testing strategy (e.g. Playwright) is added that covers the endpoint seam from outside