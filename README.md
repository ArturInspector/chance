# Chance

**System for what?**

This project explores a hypothesis: **Human goals are not vague aspirations but state transitions in a dependency graph.** The failure to achieve them is usually not due to "lack of motivation" but due to **incorrect procedural decomposition**.
If a goal can be decomposed into atomic, controllable steps, and those steps are executed, the result is mathematically inevitable.

That's enough.
## chance-rosy.vercel.app

## Core Philosophy
System asks **"What exactly are you doing with your hands?"**.
We treat life procedures like Lisp programs: a composition of small, atomic operations rather than one monolithic "effort".

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

- [Mathematical Formalization](docs-ru/core/math.md) - Core theory and formal definitions
- [Dependency Measure](docs-ru/core/dependency-measure.md) - How to measure goal dependencies
- [Parasitic Goals](docs-ru/core/parasitic-goals.md) - Identifying resource-draining procedures
- [Axioms](docs-ru/core/axioms.md) - Foundational principles

---
*There are no gods. Only procedures?*

