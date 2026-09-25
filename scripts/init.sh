#!/bin/bash
# init.sh — standard startup path
#
# PURPOSE: Every agent session starts by running this script.
# It must install dependencies and confirm the baseline is not broken.
# If this script fails, the agent repairs it before doing anything else.
#
# HOW TO ADAPT: Replace the dependency install and verification commands
# with the ones for your actual stack. The structure should stay the same:
# 1. Install dependencies
# 2. Run verify.sh to confirm baseline
# 3. Print next step reminder

set -e

echo "=== Installing dependencies ==="
# Stack: FastAPI (Python) backend + React/Vite/TypeScript frontend
# Reuse Makefile targets where they exist; fall back to direct commands.

# Backend: install Python dependencies
if make -n install-backend > /dev/null 2>&1; then
  make install-backend
else
  pip install -e ".[dev]"
fi

# Frontend: install Node dependencies
if make -n install-frontend > /dev/null 2>&1; then
  make install-frontend
else
  cd frontend && npm install && cd ..
fi

echo ""
echo "=== Running verification ==="
# Always delegate to verify.sh — one canonical verification path
bash "$(dirname "$0")/verify.sh"

echo ""
echo "=== Startup complete ==="
echo "Next: read feature_list.json, pick one unfinished feature, work only that."