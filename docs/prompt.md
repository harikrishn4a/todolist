# Archive folder storing initial prompt for judging.

Follow the session-start protocol in AGENTS.md exactly, in order. This is
the first session — there's no scaffolding yet, so before picking a
feature, scaffold the backend (FastAPI app, SQLite, CORS enabled) and
frontend (Vite + React + TypeScript + Tailwind) skeletons matching the
repo structure documented in AGENTS.md.

Then work feat-001 through feat-005 from feature_list.json, in priority
order, one at a time — do not start the next until the current one clears
the completion gate in AGENTS.md. Use the tdd skill for every feature:
confirm the seam (the FastAPI endpoint) with me before writing any test if
it's not obvious from docs/features.md, red before green, one slice at a
time, refactor only after green.

Update feature_list.json and docs/features.md as each feature passes.
Stop after feat-005 is green (or sooner if you hit a real blocker) and
give me a summary — don't continue into filtering/sorting or due dates.