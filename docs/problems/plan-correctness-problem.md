# Plan Correctness Problem

## Formulation

**Main Statement:**

Any plan cannot be predicted completely initially. Plan correctness is determined only post-factum.

```
∀ P (plan), ∀ G (goal):
  correct(P, G) can only be established after execute(P)
```

## A Priori Unverifiability Problem

### 1. Plan Hypothesis

When building plan P to achieve goal G, we formulate hypothesis:

```
hypothesis(P, G): execute(P) ⟹ achieve(G)
```

But this hypothesis is **unverifiable before execution**.

### 2. Hidden Conditions

Plan built on explicit preconditions:

```
P = (A₁, A₂, ..., Aₙ)
preconditions(P) = {C₁, C₂, ..., Cₖ}
```

But hidden conditions exist:

```
hidden_conditions(P) = {H₁, H₂, ..., Hₘ}
```

discovered only during execution. Or worse—**AFTER** execution!

**Example:**
Goal: increase muscle mass by 5%
Plan:
- A₁: train 3 times per week
- A₂: consume 2g protein per kg weight
- A₃: sleep 8 hours

Explicit preconditions: time, gym access, nutrition budget

Hidden conditions (discovered post-factum):
- H₁: testosterone level normal
- H₂: no chronic stress
- H₃: correct exercise technique
- H₄: sufficient micronutrient intake

### 3. Knowledge Incompleteness

```
knowledge_at_start(P) ⊂ knowledge_required(P)
```

Knowledge gap:

```
gap(P) = knowledge_required(P) \ knowledge_at_start(P)
```

This gap is **ineliminable a priori**.

## Iterative Verification

### 1. Planning Cycle

```
function iterative_planning(G):
  P = initial_plan(G)
  
  loop:
    result = execute(P)
    
    if achieve(G):
      return success(P)
    
    // Failure analysis
    missing = analyze_gap(P, result, G)
    
    // Plan update
    P' = update_plan(P, missing)
    
    if not feasible(P'):
      return failure("Goal unreachable with current resources")
    
    P = P'
```

### 2. Correctness Metric

Plan correctness determined only by result:

```
correctness(P, G) = {
  1.0  if achieve(G) after execute(P)
  0.0  if not achieve(G)
  ∈ (0, 1)  if partial achievement
}
```

**Before execution:**
```
expected_correctness(P, G) = belief(agent, P, G)
```

This is subjective estimate, not correctness.

### 3. Belief Calibration
```
function calibrate_beliefs(history):
  for (P, G, result) in history:
    expected = belief(agent, P, G)
    actual = correctness(P, G)
    
    error = |expected - actual|
    
    update_belief_model(error)
```

Over time agent learns to predict better, but complete certainty doesn't exist.

## Formal Boundary

**Theorem on Planning Incompleteness:**

```
∄ algorithm plan(G): 
  ∀ G: correctness(plan(G), G) = 1.0 (a priori)
```

**Proof:**

Suppose such algorithm `plan(G)` exists.

Consider goal G: "increase muscle mass by 5%"
For correctness = 1.0 guarantee, plan must account for:
- All organism biochemical processes
- All environmental factors
- All future events

This requires:
1. Complete knowledge of organism state (impossible, see Observer Problem)
2. Future prediction (impossible due to system chaos)

Therefore, algorithm doesn't exist.
∎

## Practical Consequences

### 1. Accepting Uncertainty

Plan P is a **hypothesis**, not a **guarantee**.

```
P = hypothesis(G, current_knowledge)
```

### 2. Feedback Loop Mandatory
```
execute(P) → measure(result) → update(P) → execute(P')
```

Without feedback, system is blind to hidden conditions.

### 3. Minimizing Feedback Cycle

Faster hypothesis check, faster plan update:

```
optimal_cycle_time = min(time(execute(P)) + time(measure(result)))
```

Hence: decomposition into small steps with frequent checks better than one big plan.

## Strategy for Working with Problem

### 1. Phase Separation

```
Phase 1: Build initial plan (based on current knowledge)
Phase 2: Execute minimal step
Phase 3: Measure result
Phase 4: Update plan (if needed)
Phase 5: Repeat
```

### 2. Explicit Assumption Statement

```
Plan P:
  Assumptions:
    - A₁: testosterone normal
    - A₂: no chronic diseases
    - A₃: technique correct
  
  Actions: [...]
  
  Verification:
    - After 2 weeks: check mass
    - If not growing → check assumptions
```

### 3. Built-in Checkpoints

```
P = (A₁, CHECK₁, A₂, CHECK₂, ..., Aₙ)
```

where `CHECKᵢ` — checkpoint for intermediate result verification.

## Conclusion

**Plan correctness is unknowable a priori.**

```
wisdom ≠ "know correct plan"
wisdom = "quickly update incorrect plan"
```

---

References:
- `docs/problems/observer-problem.md` — why measurement is subjective
- `docs/core/math.md` — decomposition and planning algorithms


