# STARTUP.md

## Start commands
| Action | Command |
|---|---|
| Install dependencies | `make setup` |
| Start dev server | `make dev` |
| Run tests | `make test` |
| Full verification | `make check` |

## Current state
- Dependencies: Not yet installed
- Tests: Not yet passing (no tests written)
- Lint: Not yet configured

## Project structure
```
.
├── AGENTS.md
├── Makefile
├── feature_list.json
├── scripts/
├── docs/
│   ├── startup.md
│   ├── docs/PROGRESS.md
│   ├── docs/ARCHITECTURE.md
│   ├── docs/CONSTRAINTS.md
│   ├── docs/DECISIONS.md
│   ├── docs/SESSION-HANDOFF.md
│   └── docs/structure.md
├── backend/
│   ├── main.py
│   └── ...
└── frontend/
    ├── index.html
    ├── vite.config.ts
    ├── tsconfig.json
    ├── tailwind.config.js
    └── src/
        └── ...
```