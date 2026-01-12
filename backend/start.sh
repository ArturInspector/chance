#!/bin/bash
cd "$(dirname "$0")"

if [ ! -f .env ]; then
    echo "Creating .env from .env.example"
    cp .env.example .env
    echo "Please edit .env with your API keys"
fi

echo "Starting Chance Backend..."
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

