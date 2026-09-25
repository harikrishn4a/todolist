# SESSION-HANDOFF.md

Overwritten at the end of every session. Agents read this at session start.

## Date
2026-09-25 (Pass 3 — Verification Audit)

## What was verified
- **All 7 features (feat-001 through feat-007) confirmed passing** via comprehensive audit:
  - feat-001: Add a task (POST /tasks, TaskForm/TaskList)
  - feat-002: Edit a task (PATCH /tasks/{id} with title, click-to-edit UI)
  - feat-003: Delete a task (DELETE /tasks/{id}, hover-revealed delete)
  - feat-004: Mark complete/incomplete (PATCH /tasks/{id} with completed, checkbox + strikethrough)
  - feat-005: Persistence (tasks survive server restart, SQLite real DB file)
  - feat-006: Filtering and sorting (GET /tasks?filter=all|active|completed&sort=created_at, FilterBar UI)
  - feat-007: Due dates with overdue highlighting (optional due_date ISO 8601, red overdue styling, sort=due_date nulls-last)

- **Acceptance criteria audit**: All features meet their documented acceptance criteria:
  - 17/17 pytest tests passing (green)
  - All filter/sort query params tested and working
  - All due_date validation (ISO 8601, nulls, 422 on invalid) tested and working
  - Overdue styling verified via screenshot in prior session (red for past dates, gray for future/none)

- **No implementation drift detected**: Code implementation matches docs/features.md narrative
  - Filter WHERE clause uses allow-listed literals (no injection risk)
  - Sort ORDER BY branch properly extended for due_date (nulls last via `IS NULL` sort key)
  - Pydantic field_validator validates due_date format (422 on invalid)
  - Frontend components (FilterBar, TaskForm, TaskItem) match documented UI behavior

- **Constraints compliance verified**:
  - One feature at a time ✓ (feat-006 and feat-007 in separate commits)
  - TDD workflow (red-green-refactor, vertical slices) ✓
  - Tests at HTTP endpoint seam only (no mocking internals) ✓
  - Minimal/whitespace-heavy UI maintained (checkbox accent-color only fix) ✓
  - All artifacts (docs/PROGRESS.md, docs/features.md, feature_list.json) up-to-date ✓
  - Persistence via SQLite only ✓
  - Two separate processes (uvicorn + Vite) ✓

## Verification run (this session)
| Command | Result |
|---|---|
| `scripts/init.sh` | All checks passed (build, typecheck, lint, tests 17/17) |
| `pytest tests/ -v` | 17 passed |
| `ruff check .` | All checks passed |
| `cd frontend && npm run build` | ✓ 36 modules transformed, built in 388ms |
| `cd frontend && npm run typecheck` | Clean (no errors) |
| `cd frontend && npm run lint` | Clean (no errors) |
| Feature acceptance audit | All 7 features verified against docs/features.md |
| Constraint compliance audit | All rules followed (scope, TDD, testing seam, UI, persistence, etc.) |

## What is broken or unverified
- **Nothing.** All 7 features are `passing` with evidence recorded. 
- Known gaps (intentional, not bugs): TaskUpdate.due_date can't be explicitly cleared to null via PATCH; no UI to edit existing task's due_date (only settable at creation) — neither required by acceptance criteria.
- Untracked files unrelated to the project: `docs/prompt.md`, `reflections.md` (empty, left alone).

## Next best step
- No work is required. All features are complete and passing.
- If more work is wanted: likely candidates (not yet in feature_list.json) would be clearing a due date via UI, pagination, saved filter presets, or recurring tasks — but these should be confirmed by the user first rather than invented.

## Must not change
- TDD rule: no implementation before a failing test exists
- Tests exercise public FastAPI endpoints only (HTTP boundary seam)
- `pytest` must be green before any feature is marked done
- Refactoring occurs only after tests are green
- Frontend stays minimal: whitespace-heavy, markdown-document aesthetic, no heavy borders/clutter
- Harness files under `docs/`, feature_list.json/AGENTS.md/Makefile/scripts/ at repo root
- SQL WHERE/ORDER BY clauses use allow-listed literals only (never raw-interpolate query params)
- `_row_to_task` in backend/routes/tasks.py is the single point where DB rows are mapped to Task objects

## Notes for next session
- All features passing; repository in clean/restartable state
- 9 commits ahead of origin/main (last session) + 0 new commits this session = 9 total
- Session-start protocol fully followed; no blockers or issues found
- .env file at repo root with what looks like a live ANTHROPIC_API_KEY (gitignored, unrelated to this app's stack) — flagged again, still untouched
