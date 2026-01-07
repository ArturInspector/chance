## Mathematical Formalization of the "Chance" Project
### Procedural Decomposition of Life

---

## 0. Philosophical Foundation

**Key Principle:**

The system doesn't ask "why" and doesn't predict "what will be."
The system asks: **"what exactly are you doing with your hands"** and where this leads.

Everything reduces to five elements:
1. **Action** — physical/cognitive action executed by an agent
2. **Condition** — preconditions for action execution
3. **Duration** — execution time
4. **Repeatability** — frequency/regularity
5. **Completion Fact** — binary outcome (done/not done)

**Lisp Procedural Operations:**
Lisp operates through composition of small procedures, not one huge one.
A person is the same procedural machine, but without explicit procedure specification.

**Project Goal:**
Formalize life procedures, decompose to atomic actions, identify gaps.

---

## 1. Formal Definitions. Introduction.

### 1.1 Atomic Action

**Action A** is called **atomic** if:

```
∀ A: atomic(A) ⟺ 
  (1) A executes in one session without interruptions
  (2) A has a clear completion criterion
  (3) A does not require decomposition for understanding
  (4) A is executed physically or cognitively by an agent
```

**Examples:**
- Atomic: "Write function def hello()", "Run 1km", "Cook eggs in a pan by frying"
- Not atomic: "Learn Python" (requires decomposition), "Become a programmer" (no completion criterion)

### 1.2 Procedure
**Procedure P** — ordered sequence of actions:

```
P = (A₁, A₂, ..., Aₙ)
```

where each Aᵢ is an atomic or composite action.

**Procedure has:**
- **Input**: preconditions (what's needed before start)
- **Output**: postconditions (what we get after)
- **Contract**: P is correct if executing all Aᵢ guarantees postconditions

### 1.3 Goal

**Goal G** — desired state with achievement criterion.
Goal is **optimal** if:
```
∃ P: execute(P) ⟹ achieve(G)  ∧  measurable(G)  ∧  controllable(P)
```
where:
- **measurable(G)**: can objectively verify achievement (see docs/dependency-measure.md)
- **controllable(P)**: agent controls procedure execution

**Examples:**
| Goal | Optimal? | Why |
|------|----------|-----|
| "Learn Python" | ❌ | No completion criterion, not measurable |
| "Learn 3 function patterns for interviews" | ✅ | Measurable, has criterion, controllable |
| "Get a job at Google" | ❌ | Not controllable (depends on external agents) |
| "Prepare resume and pass 10 interviews" | ✅ | Measurable, controllable |

---

## 2. Goal Decomposition into Procedure

### 2.1 Decomposition Algorithm

Given goal G. Build procedure P:

```
function decompose(G):
  if atomic(G):
    return [G]  // G is already atomic
  
  if not measurable(G):
    return error("Goal not measurable, reformulate")
  
  steps = []
  current_state = initial_state()
  
  while not achieved(G, current_state):
    // Find next atomic step
    A = find_next_atomic_step(G, current_state)
    
    if A == null:
      return error("Cannot decompose, goal unreachable")
    
    steps.append(A)
    current_state = apply(A, current_state)
  
  return steps
```

### 2.2 Dependency Graph
Goal G is split into subgoals and actions:

```
G = {G₁, G₂, ..., Gₖ}  // subgoals - intersection points (see parasitic-goals)
Gᵢ = {A₁, A₂, ..., Aₘ}  // atomic actions
```

**Dependency graph** — directed acyclic graph (DAG):

```
Graph = (V, E)

V = Goals ∪ Actions  // vertices: goals and actions
E ⊆ V × V           // edges: dependencies

(u, v) ∈ E  ⟺  v depends on u (u must be executed before v)
```

**Example:**

Goal: "Launch Chance project"

```
Launch project
  ├─ Formalize concept (done)
  ├─ Choose stack (done)
  ├─ Create landing
```

### 2.3 Criteria for Good Decomposition

Decomposition is **correct** if:

```
∀ Gᵢ ∈ decompose(G): 
  (1) atomic(Gᵢ) ∨ decomposable(Gᵢ)  // either atomic or further decomposable
  (2) measurable(Gᵢ)                  // measurable
  (3) ∀ preconditions satisfied       // conditions are satisfiable
  (4) acyclic(dependency_graph)       // graph is acyclic
```

---

## 3. Formalization of Five Elements

### 3.1 Action

```
Action A = {
  id: string,
  description: string,
  type: 'physical' | 'cognitive',
  atomic: boolean
}
```

**Physical action**: "write code by hand", "run", "cook food"

**Cognitive action**: "read chapter", "solve problem", "design architecture"

### 3.2 Condition

```
Condition C = {
  type: 'precondition' | 'postcondition',
  description: string,
  verifiable: boolean,
  controllable: boolean
}
```

**Precondition** — what's needed BEFORE action execution:
- "Have computer", "Have internet access", "Know Python syntax"

**Postcondition** — what we get AFTER:
- "Function written", "Tests pass", "Deployment done"

**Controllable** — can agent ensure condition themselves:
- Controllable: "allocate 1 hour", "open editor"
- Uncontrollable: "get approval from another person", "good weather"



### 3.3 Duration
```
Duration = {
  estimated: number,  // estimated time in minutes
  actual: number,     // actual time
  unit: 'minutes' | 'hours' | 'days'
}
```

Estimation accuracy:

```
accuracy = |estimated - actual| / actual
```

System calibrates estimates over time based on history.

### 3.4 Repeatability
```
Repeatability = {
  frequency: number,       // how often
  period: 'daily' | 'weekly' | 'monthly' | 'once',
  regularity: [0, 1]      // 0 = never repeats, 1 = always on time
}
```

**Regularity** is calculated as:

```
regularity = (completed on time) / (planned)
```

### 3.5 Completion Fact

```
Completion = {
  status: 'done' | 'not_done' | 'partial' | 'blocked',
  timestamp: Date,
  reason_if_not: string
}
```

**Binary outcome**: done / not done — objectively verifiable fact.

---

## 4. Detecting Procedure Gaps

### 4.1 Procedure Gap

**Gap** (breakpoint) — systematic failure to execute an action.

```
Breakpoint B = {
  action: A,
  failure_count: number,
  reasons: [string],
  pattern: 'time' | 'energy' | 'clarity' | 'external'
}
```

### 4.2 Gap Classification

**1. Time Gap**

```
∀ A: time_breakpoint(A) ⟺ duration(A) > available_time
```

Solution: decompose A into smaller steps or allocate more time.

**2. Energy Gap**

```
∀ A: energy_breakpoint(A) ⟺ required_energy(A) > current_energy
```

Solution: simplify A or restore energy (sleep, rest).

**3. Clarity Gap**

```
∀ A: clarity_breakpoint(A) ⟺ not(atomic(A)) ∨ not(measurable(A))
```

Solution: decompose further to atomicity.

**4. External Gap**

```
∀ A: external_breakpoint(A) ⟺ ∃ precondition C: not(controllable(C))
```

Solution: build fallback procedure or accept risk.

### 4.3 Detection Algorithm

```
function detect_breakpoints(history):
  breakpoints = []
  
  for action A in history:
    failures = [entry for entry in history if entry.action == A and entry.status != 'done']
    
    if len(failures) >= threshold:
      reasons = aggregate_reasons(failures)
      pattern = classify_pattern(reasons)
      
      breakpoints.append({
        action: A,
        failure_count: len(failures),
        reasons: reasons,
        pattern: pattern
      })
  
  return breakpoints
```

---

## 5. Minimal Executable Step (MES)

### 5.1 Definition

**Minimal Executable Step (MES)** — atomic action that:

```
∀ A: is_MES(A) ⟺ 
  (1) atomic(A)
  (2) all preconditions satisfied
  (3) controllable(A)
  (4) estimated_duration(A) ≤ threshold  (e.g., 60 min)
  (5) highest_priority(A) among all candidates
```

### 5.2 MES Selection Algorithm

```
function find_MES(graph, current_state):
  // Step 1: find all available actions
  available = [A for A in graph.actions if preconditions_satisfied(A, current_state)]
  
  // Step 2: filter controllable and atomic
  executable = [A for A in available if atomic(A) and controllable(A)]
  
  // Step 3: rank by priority and duration
  ranked = sort(executable, key=lambda A: (priority(A), duration(A)))
  
  // Step 4: select first
  return ranked[0] if len(ranked) > 0 else null
```

### 5.3 MES Properties

**Theorem**: If MES is executed every day, then:

```
lim(t→∞) progress(G, t) → 1
```

provided that graph G is reachable and acyclic.

**Proof** (sketch):

Each executed MES reduces remaining actions by 1.
Graph is finite and acyclic → process terminates.
With regular execution → finite time to achieve G.
Should consider condition - if parasitic goals executed and all beliefs are true.

Observer Problem
∎

---

## 6. Goal Optimality

### 6.1 Optimality Criterion

Goal G is **optimal** if:

```
optimal(G) ⟺ 
  (1) measurable(G)          // measurable
  (2) ∃ P: controllable(P)   // procedure is controllable
  (3) finite(P)              // procedure is finite
  (4) value(G) > cost(P)     // value > costs
```

### 6.2 Transforming Non-Optimal Goals

**Non-optimal**: "Learn Python"

Problems:
- Not measurable (when is it "learned"?)
- No completion criterion
- Procedure not defined

**Transformation**:

```
Learn Python 
  → Why? → For interviews
  → What specifically? → Learn 3 function patterns
  → How to measure? → Solve 10 problems for each pattern
  → How much time? → 2 weeks, 1 hour per day
```

**Optimal**: "Learn 3 function patterns (map, filter, reduce) + solve 10 problems for each in 2 weeks"

### 6.3 Optimization Algorithm

```
function optimize_goal(G):
  if optimal(G):
    return G
  
  // Step 1: clarify criterion
  if not measurable(G):
    G = add_measurable_criterion(G)
  
  // Step 2: decompose to controllable steps
  if not controllable(procedure(G)):
    G = extract_controllable_part(G)
  
  // Step 3: limit horizon
  if not finite(procedure(G)):
    G = set_time_bound(G)
  
  return G
```

---

## 7. Life Procedures: Good and Bad

### 7.1 Procedure Structure

Any activity is a procedure. Even "scrolling TikTok".

```
Procedure: Scrolling TikTok

Preconditions:
  - Have phone
  - Have internet access
  - App installed

Steps:
  1. Take phone
  2. Unlock
  3. Open TikTok
  4. Scroll
  5. [repeat step 4 until interruption]

Postconditions:
  - Time spent: 30–120 min
  - Dopamine: short-term
  - Progress toward goals: 0
```

### 7.2 Procedure Utility Metric

```
utility(P) = value(postconditions(P)) - cost(P)
```

where:
- **value** — result value (progress toward goals, pleasure, health)
- **cost** — costs (time, energy, distraction from other goals)

**TikTok**:
```
utility = 2 (short-term pleasure) - 60 (time) - 10 (distraction) = -68
```

**Learning Python functions**:
```
utility = 50 (progress toward goal) - 60 (time) = -10
```

But considering long-term value:
```
utility_long_term = 50 + 100 (getting job) - 60 = +90
```

### 7.3 Detecting Parasitic Procedures

**Parasitic procedure** — procedure with negative long-term utility that executes regularly.

```
parasitic(P) ⟺ 
  (1) utility_long_term(P) < 0
  (2) frequency(P) > threshold
  (3) not(necessary(P))  // not necessary (food, sleep are necessary)
```

**Detection Algorithm**:

```
function detect_parasitic_procedures(log):
  procedures = aggregate_by_pattern(log)
  
  parasitic = []
  for P in procedures:
    if utility_long_term(P) < 0 and frequency(P) > 3/week:
      parasitic.append(P)
  
  return parasitic
```

---

## 8. Theory of Procedure Composition

### 8.1 Composition

Procedures can be composed:

```
compose(P₁, P₂) = P₃

where postconditions(P₁) ⊆ preconditions(P₂)
```

**Example**:

```
P₁: Write function
  → postcondition: function exists

P₂: Write tests
  → precondition: function exists
  → postcondition: function tested

compose(P₁, P₂) = P₃: Write and test function
```

### 8.2 Parallel Composition

Procedures are independent if they don't share resources:

```
parallel(P₁, P₂) ⟺ 
  resources(P₁) ∩ resources(P₂) = ∅
```

**Example**:
- P₁: Learn Python (resource: morning time, cognitive energy)
- P₂: Run (resource: evening time, physical energy)

Independent → can execute in parallel.

### 8.3 Recursive Composition

A procedure can call itself (recursion).

```
P_recursive(n) = {
  if n == 0: return base_case
  else: return step + P_recursive(n-1)
}
```

**Danger**: infinite recursion → need termination condition.

---

## 9. Mathematical Model of Execution

### 9.1 System State

```
State S = (G_set, A_completed, resources, time)
```

**IMPORTANT!**

where:
- **G_set** — set of current goals
- **A_completed** — completed actions
- **resources** — available resources (time, energy, money)
- **time** — current time

### 9.2 State Transition

```
transition(S, A) → S'

where:
  S' = (G_set', A_completed ∪ {A}, resources - cost(A), time + duration(A))
```

### 9.3 Goal Achievement

Goal G is achieved in state S if:

```
achieved(G, S) ⟺ postconditions(G) ⊆ facts(S)
```

### 9.4 Value Function

```
V(S) = Σ value(G) for G in achieved_goals(S)
```

Optimization problem:

```
maximize V(S_final)
subject to:
  S_0 → S_1 → ... → S_final
  time(S_final) ≤ T
  resources(S_i) ≥ 0  ∀ i
```

---

## 10. Practical Algorithms

### 10.1 Daily Planner

```
function daily_planner(goals, current_state):
  // Step 1: find MES for each goal
  MES_candidates = [find_MES(G, current_state) for G in goals]
  
  // Step 2: estimate available time and energy
  available_time = estimate_available_time()
  available_energy = estimate_energy()
  
  // Step 3: select MES that fit resources
  plan = []
  for MES in MES_candidates:
    if duration(MES) <= available_time and required_energy(MES) <= available_energy:
      plan.append(MES)
      available_time -= duration(MES)
      available_energy -= required_energy(MES)
  
  return plan
```

### 10.2 Stuck Detector

If the same goal doesn't progress for N days in a row:

```
function detect_stuck(goal_log):
  for G in goals:
    progress_history = [entry for entry in goal_log if entry.goal == G]
    
    if len(progress_history) > N and all(entry.status != 'done' for entry in progress_history[-N:]):
      return alert("Goal stuck: " + G.description)
```

### 10.3 Automatic Decomposition (with LLM)

```
function auto_decompose(G, llm):
  if atomic(G):
    return [G]
  
  prompt = f"""
  Goal: {G.description}
  Decompose into atomic steps. Each step must:
  - Be executable in one session
  - Have clear completion criterion
  - Be described in terms of specific actions
  """
  
  steps = llm.generate(prompt)
  
  return steps
```

---

## 11. Applicability Boundaries

### 11.1 What Works

**Procedural approach applies to:**
- Skills (programming, music, sports)
- Projects (creating product, writing book)
- Habits (sleep, nutrition, training)
- Routines (work, study)

**Applicability conditions:**
```
applicable(G) ⟺ 
  (1) measurable(G)
  (2) decomposable(G)
  (3) finite_horizon(G)
```

### 11.2 What Doesn't Work

**Procedural approach does NOT apply to:**
- Goals without criteria ("be happy")
- Strongly dependent on external agents ("get promotion")
- Emergent properties ("find meaning of life")

**But:** even in these cases, can extract controllable part and work with it.

---

## 12. Main Theorem

**Theorem on Procedural Achievability:**

Let G be a goal, P be a procedure, S₀ be initial state.

If:
1. G is measurable and finite
2. P is correctly decomposed to atomic steps
3. All preconditions are controllable by agent
4. Dependency graph is acyclic

Then:

```
∃ T: execute(P, S₀, T) ⟹ achieved(G, S_T)
```

**Proof**:

By conditions (1)-(4):
- G has finite number of steps (from finiteness and decomposition)
- Each step is executable (from controllability of preconditions)
- No cycles (from acyclicity)

Therefore, sequential execution of all steps terminates and leads to G.

∎

---

## 13. Conclusion

**What we can do:**
- Formalize any goal as a procedure graph
- Decompose to atomic executable steps
- Detect gaps and parasitic procedures
- Select minimal executable step each day
- Measure progress objectively

**What we cannot do:**
- Eliminate uncontrollable dependencies
- Guarantee result with external agent participation
- Formalize goals without completion criteria

**Main Conclusion:**

A person suffers not from uncertainty of outcomes,
but from lack of procedures that can be executed without faith in the result.

The "Chance" project provides these procedures.

---

## Notation List

- **A** — action
- **P** — procedure
- **G** — goal
- **S** — system state
- **MES** — minimal executable step
- **DAG** — directed acyclic graph
- **atomic(A)** — atomicity predicate for action
- **measurable(G)** — measurability predicate for goal
- **controllable(P)** — controllability predicate for procedure



