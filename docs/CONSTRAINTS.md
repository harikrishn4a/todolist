# CONSTRAINTS.md

Hard limits for this repository. Agents MUST follow these without exception.
Use MUST / MUST NOT language only. No ambiguity.

## Scope
- MUST work on exactly one feature at a time
- MUST NOT modify files outside the current feature scope
- MUST NOT refactor unrelated code during a feature implementation
- MUST follow vertical slice delivery: one failing test → minimal implementation → next slice
- MUST NOT write tests in bulk before implementing; one test at a time only

## Verification
- MUST run `pytest` and confirm it passes before marking any backend feature done
- MUST NOT remove or weaken tests to make a task appear complete
- MUST NOT claim completion without runnable evidence
- MUST NOT mark a feature done if any pytest test is failing or skipped to force a pass
- MUST complete refactoring only after tests are green, never during the red-green cycle

## Artifacts
- MUST update `docs/features.md` task checkboxes and notes before ending a session
- MUST update `feature_list.json` status and evidence before ending a session
- MUST NOT rewrite `docs/PROGRESS.md` to hide unfinished work or failed checks
- MUST NOT delete any project file without explicit user instruction
- MUST record any architectural or dependency decision in `docs/DECISIONS.md` before proceeding

## Dependencies
- MUST NOT add new Python or JavaScript dependencies without recording the decision in `docs/DECISIONS.md`
- MUST NOT upgrade existing dependencies mid-feature
- MUST NOT introduce a dependency that bypasses the established stack: FastAPI + SQLite backend, React + Vite + TypeScript frontend, Tailwind CSS styling

## Testing
- MUST write all backend tests at the FastAPI endpoint seam (HTTP request/response boundary) only
- MUST NOT write tests that call internal functions or query the SQLite database directly to verify behavior
- MUST NOT mock internal collaborators or application-owned modules
- MUST only mock at true system boundaries (external APIs, time/randomness) if they arise
- MUST use a test database or in-memory SQLite instance; MUST NOT run tests against a production database
- MUST name tests to describe observable behavior (e.g. `test_user_can_create_task`), not implementation details
- MUST NOT write a test at a new seam without confirming that seam with the user first

## Frontend
- MUST NOT introduce UI components that conflict with the minimal, whitespace-heavy, markdown-document aesthetic
- MUST NOT add heavy borders, cluttered navigation, or decorative containers to the UI
- MUST use Tailwind CSS for all styling; MUST NOT introduce a second CSS framework or component library
- MUST NOT call backend endpoints other than the FastAPI server running via uvicorn

## Backend
- MUST implement all persistence through SQLite; MUST NOT introduce a second database or ORM without a recorded decision
- MUST enable CORS on FastAPI to allow the Vite dev server to reach the backend
- MUST NOT expose internal database row structure directly as API responses without a defined schema (Pydantic model)

## Dev Process
- MUST run the backend with `uvicorn` and the frontend with the Vite dev server as two separate processes
- MUST NOT merge or bundle backend and frontend into a single server process
- MUST follow red-green-refactor strictly: write one failing test, implement the minimum to pass it, refactor only after green