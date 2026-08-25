#!/usr/bin/env bash
set -euo pipefail

claude -p --dangerously-skip-permissions --model claude-haiku-4-5-20251001 "Run the health check"
