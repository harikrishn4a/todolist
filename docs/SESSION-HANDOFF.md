# SESSION-HANDOFF.md

Overwritten at the end of every session. Agents read this at session start.

## Date
2026-09-25 (Pass 2)

## What was completed
- feat-006 — Filtering and sorting: `GET /tasks?filter=all|active|completed&sort=created_at`, built from an allow-listed WHERE/ORDER BY (never raw-interpolating the query param values — no injection risk). `sort=due_date` was deliberately deferred to feat-007 since `due_date` didn't exist yet. Frontend: new `FilterBar` component; `App.tsx` now holds filter/sort state and refetches from the server after every mutation so the list always reflects the active filter (e.g. checking a task complete removes it from the Active view immediately).
- feat-007 — Due dates with overdue highlighting: `due_date` (nullable ISO 8601 `YYYY-MM-DD`) added to `TaskCreate`/`TaskUpdate`/`Task`, validated via a shared Pydantic `field_validator` using `date.fromisoformat` (invalid format → 422). `sort=due_date` extends feat-006's `order_by` branch with `due_date IS NULL, due_date` (nulls last). Refactored the four duplicated row→`Task` construction blocks into one `_row_to_task` helper since this feature touched all of them. Frontend: date input on the add form, due date display, red overdue styling (incomplete + past due only), "Due date" added to the sort selector.
- Frontend aesthetic pass (after both features): reviewed every component against docs/CONSTRAINTS.md's minimal/markdown rules (no heavy borders, cards, or clutter — typography and whitespace only). Found it was already close; the one real fix was the checkbox rendering with the browser's default blue accent, which broke the otherwise disciplined grayscale + single-red-accent (overdue) palette — changed to `accent-neutral-900`.
- Both features moved through TDD (red before green, one vertical slice at a time, refactor only after green) and were verified end-to-end with a Playwright-driven headless-Chromium screenshot in addition to pytest.

## Verification run
| Command | Result |
|---|---|
| `pytest tests/ -v` | 17 passed |
| `ruff check .` | All checks passed |
| `cd frontend && npm run build` | Clean |
| `cd frontend && npm run typecheck` | Clean |
| `cd frontend && npm run lint` | Clean |
| `bash scripts/init.sh` | Full baseline green |
| Manual Playwright screenshots | Filter buttons (All/Active/Completed) correctly show/hide tasks; sort by Due date orders ascending with no-due-date last; overdue task renders in red vs muted gray for future due dates |

## What is broken or unverified
- Nothing known broken. All 7 features in feature_list.json (feat-001 through feat-007) are `passing`.
- Two intentional, documented gaps (not required by any acceptance criteria or test): `TaskUpdate.due_date` can't be explicitly cleared to null via PATCH (only-provided-fields semantics can't distinguish "not provided" from "set to null"); no UI control to edit an existing task's due date (only settable at creation).

## Next best step
- No feature is currently assigned. All items in feature_list.json are `passing`. If more work is wanted, likely candidates (not yet specified anywhere): clearing a due date via the UI, pagination, saved filter presets — but none of these are in feature_list.json, so confirm with the user before starting anything new rather than inventing scope.

## Must not change
- TDD rule: no implementation code before a failing test exists for that slice
- Tests must exercise public FastAPI endpoints only — never internal functions or the DB directly
- `pytest` must be green before any feature is marked done in docs/PROGRESS.md
- Refactoring occurs only after tests are green, never during the red-green cycle
- Frontend design stays ultra-minimalist: whitespace-heavy, markdown-document aesthetic, no heavy borders or cluttered navigation — confirmed again this session
- Harness markdown files live under `docs/`; AGENTS.md, Makefile, scripts/, and feature_list.json stay at the repo root
- `backend/routes/tasks.py` builds SQL WHERE/ORDER BY clauses from allow-listed literal strings only (never interpolates the raw `filter`/`sort` query param values directly) — any future query param additions must follow the same pattern
- `_row_to_task` in backend/routes/tasks.py is the single place that maps a DB row to a `Task` — new columns should be added there, not by re-duplicating the construction

## Notes for next session
- A stray `.env` file at the repo root contains what looks like a live `ANTHROPIC_API_KEY`. It is gitignored and not tracked by git, and is unrelated to this app's stack — flagged to the user again this session, still untouched. Worth confirming with the user whether it should be removed from the repo directory or the key rotated.
- `docs/prompt.md` and `reflections.md` at the repo root are empty, untracked files not created by this or the prior session — left alone.
- Node on this machine is v18.20.8 (Tailwind v4 / latest create-vite need Node 20+) — used tailwindcss@3 and create-vite@5 instead; noted in case Node gets upgraded later.
