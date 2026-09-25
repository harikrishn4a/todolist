# STRUCTURE.md

How artifacts are organised in this repository.

```
project/
├── AGENTS.md                  # Entry point: project overview, commands, constraints reference
├── Makefile                   # Standardized commands: setup, test, lint, check
├── feature_list.json          # Machine-readable feature tracker — agent maintains status + evidence
├── scripts/                   # Repository automation scripts
└── docs/
    ├── structure.md           # This file: how artifacts are organised
    ├── docs/CONSTRAINTS.md         # Hard limits — MUST / MUST NOT language only
    ├── docs/ARCHITECTURE.md        # Module map, layer responsibilities, key dependencies
    ├── docs/DECISIONS.md           # Design decision log with rationale
    ├── docs/PROGRESS.md            # Human-maintained project state: done, in-progress, blocked
    ├── docs/SESSION-HANDOFF.md     # Agent-written end-of-session state, overwritten each session
    ├── docs/TASK.md                # Sprint contract for current active feature, agent-generated
    ├── docs/features.md            # Feature definitions and task breakdown — human seeds, agent maintains
    ├── docs/QUALITY.md             # Live quality snapshot per domain and layer — agent updates
    └── QUALITY-DOCUMENT.md    # Grading scale reference (stable, rarely changes)
```

## Ownership

| File | Human | Agent |
|---|---|---|
| AGENTS.md | author, update when conventions change | read only |
| docs/CONSTRAINTS.md | author, update when limits change | read only |
| docs/ARCHITECTURE.md | author | read, add notes |
| docs/DECISIONS.md | review | append new decisions |
| docs/PROGRESS.md | author, update milestones | update status each session |
| docs/SESSION-HANDOFF.md | read at session start | overwrite at session end |
| docs/TASK.md | review, approve scope | generate before each feature |
| docs/features.md | seed initial definitions | check off tasks, add notes |
| feature_list.json | — | full ownership, status + evidence |
| docs/QUALITY.md | review | update each session |
| docs/QUALITY-DOCUMENT.md | author | read only |
| Makefile | author, update when commands change | read only |
| scripts/ | author | read only |