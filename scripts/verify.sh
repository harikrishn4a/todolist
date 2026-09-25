#!/usr/bin/env bash
# verify.sh — full verification path
#
# PURPOSE: Agents run this before marking any feature done.
# All checks must pass. If any fail, the feature is not complete.
# This script is also called by init.sh at session start.
#
# HOW TO ADAPT: Replace each section with your stack's equivalent commands.
# Keep the section structure (build → typecheck → lint → test) — the order
# matters because faster/cheaper checks should fail before slower ones.
#
# Stack: FastAPI (Python) + SQLite backend, React + Vite + TypeScript frontend
# Package manager: make (Makefile targets) + pip (backend) + npm (frontend)
# Test runner: pytest (backend)
# Lint: ruff (backend), eslint (frontend)
# Typecheck: mypy or pyright (backend), tsc (frontend)

set -e

echo "=== Build ==="
# Build the frontend (TypeScript → JS via Vite)
make build-frontend

echo "=== Type check ==="
# Typecheck the frontend TypeScript
make typecheck-frontend

echo "=== Lint ==="
# Lint backend Python with ruff, lint frontend with eslint
make lint

echo "=== Tests ==="
# Run backend pytest suite — this is the source of truth per minimal_plan.md
make test

echo ""
echo "=== All checks passed ==="