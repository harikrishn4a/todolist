# Makefile — standardized commands for agents and humans
#
# PURPOSE: Every common action has a named target here.
# Agents use these instead of remembering raw commands.
# AGENTS.md verification section should reference these targets.
#
# HOW TO ADAPT: Replace the commands inside each target with your
# stack's equivalents. Keep the target names — agents expect them.
# Add stack-specific targets below the standard ones.
#
# REQUIRED TARGETS (keep these, adapt the commands):
#   setup    — install all dependencies from scratch
#   dev      — start development server / watch mode
#   check    — run full verification (build + typecheck + lint + test)
#   test     — run tests only
#   lint     — run linter only
#   clean    — remove build artifacts
#
# OPTIONAL TARGETS (add what your stack needs):
#   build    — compile/bundle for production
#   typecheck — type checking only
#   format   — auto-format code

.PHONY: setup dev check test lint clean build typecheck format dev-backend dev-frontend

## Install all dependencies from scratch
## Agents run this when setting up for the first time
## Installs Python deps (pip) and Node deps (npm) for backend + frontend
setup:
	pip install -r requirements.txt
	cd frontend && npm install

## Start development server or watch mode
## Runs both uvicorn (backend) and Vite (frontend) concurrently
## Use dev-backend or dev-frontend to run each individually
dev:
	make dev-backend & make dev-frontend

## Start FastAPI backend only (uvicorn, port 8000, auto-reload)
dev-backend:
	uvicorn backend.main:app --reload --port 8000

## Start Vite frontend dev server only (port 5173)
dev-frontend:
	cd frontend && npm run dev

## Full verification — build + typecheck + lint + test
## Agents run this before marking any feature done
## This is the canonical "am I done?" command
check:
	cd frontend && npm run typecheck
	cd frontend && npm run lint
	cd frontend && npm run build
	pytest

## Run tests only
## Use when iterating on a specific feature
## Backend: pytest against FastAPI endpoints (TDD, red-green-refactor)
test:
	pytest

## Run linter only
## Use when cleaning up before commit
## Runs ruff (Python backend) and eslint (TypeScript frontend)
lint:
	ruff check .
	cd frontend && npm run lint

## Type checking only
## Remove this target if your stack has no build step
## Runs tsc --noEmit for the React/TypeScript frontend
typecheck:
	cd frontend && npm run typecheck

## Auto-format code
## Remove this target if your stack has no formatter
## Formats Python with ruff and frontend with prettier
format:
	ruff format .
	cd frontend && npm run format

## Compile or bundle for production
## Builds the Vite/React frontend into frontend/dist/
build:
	cd frontend && npm run build

## Remove build artifacts and caches
## Safe to run at any time — does not affect source files
clean:
	rm -rf frontend/dist/ frontend/node_modules/.cache/
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -name "*.pyc" -delete
	rm -rf .pytest_cache/ .ruff_cache/ htmlcov/ .coverage