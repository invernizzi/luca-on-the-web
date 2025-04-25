#!/bin/bash
set -e

# Change to the script directory
cd "$(dirname "$0")"

# Run the tests
echo "Running tests..."
uv run python3 -m pytest test/ -v --cov=scholar --cov-report=term-missing

echo "Tests completed successfully!" 