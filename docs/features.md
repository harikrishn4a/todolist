> **Example** — Replace all `` with real feature content. Add one `---` block per feature; the agent fills in Notes as work progresses.

# FEATURES.md

Maintained by both human and agent.
- Human: writes initial feature definitions and acceptance criteria
- Agent: refines task breakdowns, checks off completed tasks, adds notes as work progresses

Status tracking lives in `feature_list.json`. This file is the narrative spec.

---

## Feature 001: Add a Task

**What the user sees:**
A text input field (and submit button or Enter key) lets the user type a task title and add it to the list. The new task appears immediately in the list without a page reload.

**Tasks:**
- [x] Write failing pytest test for POST /tasks endpoint (title required, returns 201 + task JSON)
- [x] Implement POST /tasks route in FastAPI with SQLite persistence
- [x] Confirm pytest passes
- [x] Build React input form that calls POST /tasks via fetch
- [x] Render new task in the task list on success

**Acceptance criteria:**
- POST /tasks with a valid title returns HTTP 201 and a JSON object with at least `id`, `title`, `completed`, and `created_at`
- POST /tasks with a missing or empty title returns HTTP 422
- Task persists after server restart (stored in SQLite)
- New task appears in the UI without a full page reload

**Out of scope:**
- Due date on creation (covered in Feature 007)
- Bulk task import

**Notes:**
Implemented via TDD: one failing pytest test at the POST /tasks seam (tests/test_tasks.py::test_user_can_add_a_task), then minimal FastAPI + SQLite implementation to green. GET /tasks was added alongside since the test verifies persistence through the public interface rather than querying SQLite directly. Frontend: TaskForm + TaskList components, api.ts fetch wrappers, wired into App.tsx. Verified end-to-end with curl and a Playwright-driven browser screenshot (frontend/dev server + backend both running).

---

## Feature 002: Edit a Task

**What the user sees:**
Clicking a task title makes it editable in place (or opens an edit field). The user changes the title and confirms; the updated title is saved and displayed.

**Tasks:**
- [x] Write failing pytest test for PATCH /tasks/{id} endpoint (update title, returns 200 + updated task JSON)
- [x] Implement PATCH /tasks/{id} route in FastAPI
- [x] Confirm pytest passes
- [x] Add inline edit UX to React task item (click to edit, Enter or blur to save)
- [x] Call PATCH /tasks/{id} via fetch and update local state on success

**Acceptance criteria:**
- PATCH /tasks/{id} with a valid title returns HTTP 200 and updated task JSON
- PATCH /tasks/{id} with a non-existent id returns HTTP 404
- PATCH /tasks/{id} with an empty title returns HTTP 422
- Updated title is reflected immediately in the UI

**Out of scope:**
- Editing due date inline here (covered in Feature 007)
- Undo/redo

**Notes:**
Implemented via TDD in three vertical slices at the PATCH /tasks/{id} seam: (1) valid title updates and returns 200, (2) non-existent id returns 404, (3) empty title returns 422 (Pydantic Field min_length=1). Frontend: click-to-edit on TaskItem, commits on Enter or blur, no-ops if unchanged or empty. Verified end-to-end with a Playwright-driven browser screenshot.

---

## Feature 003: Delete a Task

**What the user sees:**
Each task has a delete control (button or icon). Clicking it removes the task from the list immediately.

**Tasks:**
- [x] Write failing pytest test for DELETE /tasks/{id} endpoint (returns 204 on success)
- [x] Implement DELETE /tasks/{id} route in FastAPI
- [x] Confirm pytest passes
- [x] Add delete button to React task item
- [x] Call DELETE /tasks/{id} via fetch and remove task from local state on success

**Acceptance criteria:**
- DELETE /tasks/{id} returns HTTP 204 and the task no longer appears in GET /tasks
- DELETE /tasks/{id} with a non-existent id returns HTTP 404
- Task disappears from the UI immediately after deletion without a full reload

**Out of scope:**
- Soft delete or trash/recovery
- Bulk delete

**Notes:**
Implemented via TDD in two vertical slices at the DELETE /tasks/{id} seam: (1) deleting an existing task returns 204 and it's gone from GET /tasks, (2) deleting a non-existent id returns 404. Frontend: hover-revealed "×" delete control on TaskItem (kept subtle per the minimalist aesthetic), api.ts deleteTask, App.tsx filters local state. Verified end-to-end with a Playwright-driven browser screenshot.

---

## Feature 004: Mark a Task Complete / Incomplete

**What the user sees:**
Each task has a checkbox or toggle. Clicking it marks the task complete (adds a visual strikethrough or muted style) or incomplete. The state persists.

**Tasks:**
- [x] Write failing pytest test for PATCH /tasks/{id} toggling `completed` field (returns 200 + updated task JSON)
- [x] Implement completed toggle in PATCH /tasks/{id} (reuse or extend Feature 002 endpoint)
- [x] Confirm pytest passes
- [x] Add checkbox/toggle to React task item
- [x] Call PATCH /tasks/{id} with `{ completed: true/false }` and update UI state

**Acceptance criteria:**
- PATCH /tasks/{id} with `{ "completed": true }` returns HTTP 200 with `completed: true`
- PATCH /tasks/{id} with `{ "completed": false }` returns HTTP 200 with `completed: false`
- Completed tasks display with a distinct visual style (e.g., strikethrough title)
- Completed state persists after server restart

**Out of scope:**
- Completion timestamps
- Bulk mark-all-complete

**Notes:**
Implemented via TDD by extending the existing PATCH /tasks/{id} seam rather than a new route: TaskUpdate now has both `title` and `completed` optional, and update_task only touches columns that were actually provided (so editing title alone never resets completed, and vice versa — the invariant from feat-002/003 held throughout). Second slice (mark incomplete) was already green from the first slice's generalized implementation, which confirmed the design rather than requiring new code. Frontend: checkbox + strikethrough/muted styling on TaskItem. Verified end-to-end with a Playwright-driven browser screenshot.

---

## Feature 005: Persistence — Tasks Survive Server Restarts

**What the user sees:**
Tasks added, edited, or completed remain present and correct after the backend process is restarted.

**Tasks:**
- [x] Initialise SQLite database and tasks table on FastAPI startup (if not already existing)
- [x] Ensure all write endpoints (POST, PATCH, DELETE) commit to SQLite
- [x] Write pytest test that verifies a created task is returned by GET /tasks after a simulated restart (new app instance, same DB file)
- [x] Confirm pytest passes
- [x] Document DB file location in docs/ARCHITECTURE.md

**Acceptance criteria:**
- GET /tasks returns all previously created tasks after the uvicorn process is stopped and restarted
- No in-memory-only state; every write goes to SQLite before the response is returned
- DB file location is fixed and documented

**Out of scope:**
- Migrations / schema versioning
- Multi-user or networked DB

**Notes:**
Persistence across restarts was already correct by construction since feat-001 (backend/database.py connects to a real on-disk `tasks.db` file via sqlite3, never `:memory:`, and every route commits before returning). This feature's actual work was proving it: a pytest test that runs two separate `TestClient(app)` lifespan cycles against the same DB file and confirms a task created in the first is visible in the second, plus documenting `DB_PATH` in docs/ARCHITECTURE.md. Also manually verified with a real `uvicorn` process kill + restart via curl.

---

## Feature 006: Filtering and Sorting

**What the user sees:**
Filter controls let the user view All / Active / Completed tasks. Sort controls let the user order tasks by creation date or due date.

**Tasks:**
- [x] Write failing pytest tests for GET /tasks?filter=all|active|completed
- [x] Write failing/confirming pytest test for GET /tasks?sort=created_at (sort=due_date deferred to Feature 007 — no due_date column exists yet)
- [x] Implement filter and sort query parameters in FastAPI GET /tasks
- [x] Confirm pytest passes
- [x] Add filter toggle buttons (All / Active / Completed) to React UI
- [x] Add sort selector to React UI (currently one option; Feature 007 adds "Due date")
- [x] Pass selected filter and sort as query params in fetch call; re-render list

**Acceptance criteria:**
- GET /tasks?filter=active returns only tasks where `completed` is false
- GET /tasks?filter=completed returns only tasks where `completed` is true
- GET /tasks?sort=created_at returns tasks ordered by creation timestamp ascending
- GET /tasks?sort=due_date returns tasks ordered by due date ascending (nulls last)
- Filter and sort controls are visible and functional in the UI

**Out of scope:**
- Saved/named filter presets
- Pagination

**Notes:**
Implemented via TDD: two vertical slices for filter=active/completed (WHERE clause built from an allow-list, never raw string interpolation of the query param), then a third slice for sort=created_at that confirmed already-correct behavior (id and created_at always agree in this schema, same pattern as the feat-005 persistence test). sort=due_date is explicitly deferred to Feature 007, which will extend the same order_by branch. Frontend: new FilterBar component; App.tsx now holds filter/sort state and refetches from the server after every mutation so the list always reflects the active filter/sort rather than relying on stale local splicing.

---

## Feature 007: Due Dates with Overdue Highlighting

**What the user sees:**
When adding or editing a task the user can optionally set a due date. Tasks whose due date is in the past and are not yet completed are visually flagged (e.g., red or muted-warning text color) to indicate they are overdue.

**Tasks:**
- [x] Write failing pytest test for POST /tasks accepting optional `due_date` field (ISO 8601 date string)
- [x] Write failing pytest test for PATCH /tasks/{id} accepting optional `due_date` field
- [x] Add `due_date` column to SQLite tasks table; handle nullable
- [x] Confirm pytest passes
- [x] Add optional due date input to React add-task form (edit UX for changing due_date on an *existing* task is backend-only — PATCH /tasks/{id} supports it and is tested, but no UI control was added for it; not required by the acceptance criteria below)
- [x] Display due date on each task item
- [x] Apply overdue highlight style when `due_date < today` and `completed === false`

**Acceptance criteria:**
- POST /tasks and PATCH /tasks/{id} accept an optional `due_date` in ISO 8601 format (YYYY-MM-DD); invalid formats return HTTP 422
- GET /tasks response includes `due_date` for every task (null if not set)
- In the UI, overdue incomplete tasks are visually distinct from non-overdue tasks
- Tasks with no due date are never highlighted as overdue

**Out of scope:**
- Due time (time-of-day precision)
- Reminder notifications or emails

**Notes:**
Implemented via TDD in five vertical slices at POST/PATCH/GET /tasks: (1) due_date null by default, (2) due_date persists when provided, (3) invalid format returns 422 (Pydantic field_validator using date.fromisoformat), (4) PATCH sets due_date on an existing task, (5) sort=due_date orders ascending with nulls last, extending feat-006's order_by branch. Refactored the four duplicated row->Task construction blocks into a `_row_to_task` helper since this feature touched all of them. Frontend: date input on the add form, due date display + red overdue styling on TaskItem (incomplete and past due only), "Due date" added to the sort selector. No UI was added to edit an existing task's due date (backend supports it, not required by the acceptance criteria).