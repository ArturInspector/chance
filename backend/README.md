# Chance Backend

FastAPI backend for the Chance project - procedural decomposition of life goals.

## Setup

```bash
cd backend
pip install -r requirements.txt
```

## Configuration

Create `.env` file (see `.env.example`):

```
OPENAI_API_KEY=your-key
ANTHROPIC_API_KEY=your-key
DATABASE_URL=sqlite:///./chance.db
```

## Run

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

API docs: http://localhost:8000/docs

## Test

```bash
pytest
```

## API Endpoints

### Goals
- POST `/goals` - Create goal with auto-decomposition
- GET `/goals` - List all goals
- GET `/goals/{id}` - Get goal detail with actions
- PATCH `/goals/{id}` - Update goal
- DELETE `/goals/{id}` - Soft delete goal
- POST `/goals/{id}/decompose` - Regenerate steps
- GET `/goals/{id}/mes` - Get ranked MES (≤5 Minimal Executable Steps)

### Events
- POST `/events` - Log action completion
- GET `/events?goal_id=X` - Get event history
- POST `/events/batch` - Bulk log events

### Stats
- GET `/stats/summary` - MES done 7d, stuck goals, failure reasons
- GET `/stats/parasitic` - Negative-utility procedures
- GET `/stats/prediction` - ML breakpoint forecast

### Health
- GET `/health` - Health check

## Architecture

- **Models**: SQLModel ORM with Goal, Action, CompletionEvent, Breakpoint
- **Services**:
  - `decompose.py` - LLM decomposition with math.md context
  - `mes.py` - Find MES by priority/duration
  - `breakpoints.py` - Detect time/energy/clarity/external patterns
  - `embeddings.py` - OpenAI embeddings for similar goals
- **Routes**: FastAPI routers for goals, events, stats

