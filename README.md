Chance

Goal ≠ Desire
Goal ≠ Meaning
Goal = Candidate for procedural execution

CORE SERVICES INSIDE:
1. landing/ - main concept.
2. app/:
    1. Deliberation phase (goal compiler)
    2. MES Procedures execution (dependency graph, Trello, Task managers integration)
    3. Returns world result. NO BULLSHIT, real results.

Frontend-Backend architecture: docs/products/architecture

**System for execution.**
Human goals are not aspirations.
They are procedures.
When a goal is decomposed into executable steps,
the result follows.

## chance-rosy.vercel.app

## Feature-by-absence

What Chance does **NOT** do, does not respond to "why live", does not say whether the goal is right, does not optimize "happiness", does not heal anxiety, does not motivate
This system does not execute procedures for you.

## Formal System
### 1. Atomic Action (`A`)
An action is atomic if:
1.  It is performed in **one session** without interruptions.
2.  It has a **binary outcome** (done/not done).
3.  It requires **no further thinking** to start (e.g., "Write `def hello()`", not "Code the backend").

### 2. The Procedure (`P`)
A procedure is an ordered sequence `P = (A₁, A₂, ..., Aₙ)` with:
*   **Input**: Preconditions (resources, state).
*   **Output**: Postconditions (measurable result).
*   **Contract**: If `Aᵢ` are executed, `G` is guaranteed.

### 3. Minimal Executable Step (MES)
The system calculates the **MES** for every day: the highest priority atomic action whose preconditions are met *right now*.
`lim(t→∞) progress(G, t) → 1` (Progress inevitably approaches 100% if MES is executed daily).

## Debugging Life

The system treats "failure" as a **Breakpoint** in the code, classified into:
*   **Time Breakpoint**: `duration(A) > available_time`
*   **Energy Breakpoint**: `required_energy(A) > current_energy`
*   **Clarity Breakpoint**: Action is not atomic (vague instructions).
*   **External Breakpoint**: Uncontrollable precondition (waiting for others).

**Parasitic Procedures**:
Loops identified by `utility_long_term(P) < 0` (e.g., doomscrolling). These are "memory leaks" in the agent's resources.

## The Reachability Theorem
We posit a theorem of procedural reachability:

If:
1.  Goal `G` is measurable and finite.
2.  Procedure `P` is decomposed into atomic steps.
3.  All preconditions are **controllable** by the agent.
4.  The dependency graph is **acyclic**.
Then:
`∃ T: execute(P, S₀, T) ⟹ achieved(G, S_T)`
*Executing the procedure inevitably leads to the goal.*
## Documentation

- [Mathematical Formalization](docs/core/math.md) - Core theory and formal definitions
- [Dependency Measure](docs/core/dependency-measure.md) - How to measure goal dependencies
- [Parasitic Goals](docs/core/parasitic-goals.md) - Identifying resource-draining procedures
- [Axioms](docs/core/axioms.md) - Foundational principles

---
*There are no gods. Only procedures?*

