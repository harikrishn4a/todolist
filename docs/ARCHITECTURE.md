> **Example** — Shows a module-level boundary document. Generate one per architectural layer in the actual project.

# TDD Skill Layer

Responsibilities:
- Define and enforce the red → green → refactor loop
- Specify what constitutes a good test (behavior-focused, seam-anchored)
- Provide mocking guidelines scoped to system boundaries only
- Supply concrete good/bad test examples as reference for agent decisions
- Align test naming and interface vocabulary with project domain language (via CONTEXT.md)

Must NOT:
- Test implementation details or internal collaborators
- Write tests at unconfirmed seams (seams must be agreed before any test is written)
- Mock classes or modules the project itself owns and controls
- Assert on call counts, call order, or private methods
- Restate implementation logic as expected values (tautological tests)

Use the public interface boundary (seam) instead.

---

# Skill Entry Layer

Responsibilities:
- Route agent invocations to the correct skill file via `SKILL.md`
- Declare skill metadata (`name`, `description`, trigger conditions)
- Instruct the agent to read `CONTEXT.md` before writing tests so vocabulary matches domain language
- Delegate to sub-documents (`tests.md`, `mocking.md`) for detailed rules

Must NOT:
- Duplicate detailed rules already owned by `tests.md` or `mocking.md`
- Override ADRs in the area being touched

Use `docs/DECISIONS.md` for ADR references.

---

# Test Specification Layer (`tests.md`)

Responsibilities:
- Define characteristics of good integration-style tests
- Enumerate red flags that identify bad (implementation-coupled) tests
- Provide canonical TypeScript examples for both good and bad patterns
- Enforce the rule: verify behavior through the public interface, not via database or internal side-effects

Must NOT:
- Describe mocking strategy (owned by `mocking.md`)
- Prescribe loop mechanics (owned by `SKILL.md`)

Use the public API seam — e.g. `getUser(id)` — rather than raw DB queries to verify outcomes.

---

# Mocking Boundary Layer (`mocking.md`)

Responsibilities:
- Define which system boundaries warrant mocks (external APIs, time/randomness, filesystem, external databases)
- Enforce dependency injection as the primary design pattern for mockability
- Mandate SDK-style interfaces (one function per external operation) over generic fetchers
- Explain why SDK-style mocks require no conditional logic in test setup

Must NOT:
- Mock internal collaborators, own classes, or anything the project controls
- Use a single generic `fetch(endpoint, options)` style interface where mocking requires conditional branching

Use dependency injection — pass external dependencies in rather than constructing them internally.

---

# Persistence (feat-005)

The SQLite database file lives at `<repo root>/tasks.db` (see
`backend/database.py:DB_PATH`), overridable via the `TODOLIST_DB_PATH`
env var. It is a real on-disk file, not `:memory:`, so every write
made through `get_connection()` survives the FastAPI process exiting
and restarting — `init_db()` runs `CREATE TABLE IF NOT EXISTS` on
startup, so re-running it against an existing file is a no-op that
doesn't touch existing rows. `tasks.db` is gitignored and never
checked in. Tests point `DB_PATH` at an isolated temp file per test
(see `tests/conftest.py`) so they never touch the dev DB.