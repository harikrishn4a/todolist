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
- [ ] Write failing pytest test for POST /tasks endpoint (title required, returns 201 + task JSON)
- [ ] Implement POST /tasks route in FastAPI with SQLite persistence
- [ ] Confirm pytest passes
- [ ] Build React input form that calls POST /tasks via fetch
- [ ] Render new task in the task list on success

**Acceptance criteria:**
- POST /tasks with a valid title returns HTTP 201 and a JSON object with at least `id`, `title`, `completed`, and `created_at`
- POST /tasks with a missing or empty title returns HTTP 422
- Task persists after server restart (stored in SQLite)
- New task appears in the UI without a full page reload

**Out of scope:**
- Due date on creation (covered in Feature 007)
- Bulk task import

**Notes:**
Not yet documented

---

## Feature 002: Edit a Task

**What the user sees:**
Clicking a task title makes it editable in place (or opens an edit field). The user changes the title and confirms; the updated title is saved and displayed.

**Tasks:**
- [ ] Write failing pytest test for PATCH /tasks/{id} endpoint (update title, returns 200 + updated task JSON)
- [ ] Implement PATCH /tasks/{id} route in FastAPI
- [ ] Confirm pytest passes
- [ ] Add inline edit UX to React task item (click to edit, Enter or blur to save)
- [ ] Call PATCH /tasks/{id} via fetch and update local state on success

**Acceptance criteria:**
- PATCH /tasks/{id} with a valid title returns HTTP 200 and updated task JSON
- PATCH /tasks/{id} with a non-existent id returns HTTP 404
- PATCH /tasks/{id} with an empty title returns HTTP 422
- Updated title is reflected immediately in the UI

**Out of scope:**
- Editing due date inline here (covered in Feature 007)
- Undo/redo

**Notes:**
Not yet documented

---

## Feature 003: Delete a Task

**What the user sees:**
Each task has a delete control (button or icon). Clicking it removes the task from the list immediately.

**Tasks:**
- [ ] Write failing pytest test for DELETE /tasks/{id} endpoint (returns 204 on success)
- [ ] Implement DELETE /tasks/{id} route in FastAPI
- [ ] Confirm pytest passes
- [ ] Add delete button to React task item
- [ ] Call DELETE /tasks/{id} via fetch and remove task from local state on success

**Acceptance criteria:**
- DELETE /tasks/{id} returns HTTP 204 and the task no longer appears in GET /tasks
- DELETE /tasks/{id} with a non-existent id returns HTTP 404
- Task disappears from the UI immediately after deletion without a full reload

**Out of scope:**
- Soft delete or trash/recovery
- Bulk delete

**Notes:**
Not yet documented

---

## Feature 004: Mark a Task Complete / Incomplete

**What the user sees:**
Each task has a checkbox or toggle. Clicking it marks the task complete (adds a visual strikethrough or muted style) or incomplete. The state persists.

**Tasks:**
- [ ] Write failing pytest test for PATCH /tasks/{id} toggling `completed` field (returns 200 + updated task JSON)
- [ ] Implement completed toggle in PATCH /tasks/{id} (reuse or extend Feature 002 endpoint)
- [ ] Confirm pytest passes
- [ ] Add checkbox/toggle to React task item
- [ ] Call PATCH /tasks/{id} with `{ completed: true/false }` and update UI state

**Acceptance criteria:**
- PATCH /tasks/{id} with `{ "completed": true }` returns HTTP 200 with `completed: true`
- PATCH /tasks/{id} with `{ "completed": false }` returns HTTP 200 with `completed: false`
- Completed tasks display with a distinct visual style (e.g., strikethrough title)
- Completed state persists after server restart

**Out of scope:**
- Completion timestamps
- Bulk mark-all-complete

**Notes:**
Not yet documented

---

## Feature 005: Persistence — Tasks Survive Server Restarts

**What the user sees:**
Tasks added, edited, or completed remain present and correct after the backend process is restarted.

**Tasks:**
- [ ] Initialise SQLite database and tasks table on FastAPI startup (if not already existing)
- [ ] Ensure all write endpoints (POST, PATCH, DELETE) commit to SQLite
- [ ] Write pytest test that verifies a created task is returned by GET /tasks after a simulated restart (new app instance, same DB file)
- [ ] Confirm pytest passes
- [ ] Document DB file location in docs/ARCHITECTURE.md

**Acceptance criteria:**
- GET /tasks returns all previously created tasks after the uvicorn process is stopped and restarted
- No in-memory-only state; every write goes to SQLite before the response is returned
- DB file location is fixed and documented

**Out of scope:**
- Migrations / schema versioning
- Multi-user or networked DB

**Notes:**
Not yet documented

---

## Feature 006: Filtering and Sorting

**What the user sees:**
Filter controls let the user view All / Active / Completed tasks. Sort controls let the user order tasks by creation date or due date.

**Tasks:**
- [ ] Write failing pytest tests for GET /tasks?filter=all|active|completed
- [ ] Write failing pytest tests for GET /tasks?sort=created_at|due_date
- [ ] Implement filter and sort query parameters in FastAPI GET /tasks
- [ ] Confirm pytest passes
- [ ] Add filter toggle buttons (All / Active / Completed) to React UI
- [ ] Add sort selector to React UI
- [ ] Pass selected filter and sort as query params in fetch call; re-render list

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
Not yet documented

---

## Feature 007: Due Dates with Overdue Highlighting

**What the user sees:**
When adding or editing a task the user can optionally set a due date. Tasks whose due date is in the past and are not yet completed are visually flagged (e.g., red or muted-warning text color) to indicate they are overdue.

**Tasks:**
- [ ] Write failing pytest test for POST /tasks accepting optional `due_date` field (ISO 8601 date string)
- [ ] Write failing pytest test for PATCH /tasks/{id} accepting optional `due_date` field
- [ ] Add `due_date` column to SQLite tasks table; handle nullable
- [ ] Confirm pytest passes
- [ ] Add optional due date input to React add-task form and edit UX
- [ ] Display due date on each task item
- [ ] Apply overdue highlight style when `due_date < today` and `completed === false`

**Acceptance criteria:**
- POST /tasks and PATCH /tasks/{id} accept an optional `due_date` in ISO 8601 format (YYYY-MM-DD); invalid formats return HTTP 422
- GET /tasks response includes `due_date` for every task (null if not set)
- In the UI, overdue incomplete tasks are visually distinct from non-overdue tasks
- Tasks with no due date are never highlighted as overdue

**Out of scope:**
- Due time (time-of-day precision)
- Reminder notifications or emails

**Notes:**
Not yet documented