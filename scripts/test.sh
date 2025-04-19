#!/bin/bash
set -e

# Change to the script directory
cd "$(dirname "$0")"

# Ensure we have the required packages
echo "Installing test dependencies..."
uv pip install pytest pytest-cov

# Run the tests
echo "Running tests..."
uv run python3 -m pytest test/ -v --cov=scholar --cov-report=term-missing

echo "Tests completed successfully!" 