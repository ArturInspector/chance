# Goal Clarity Problem

## Formulation

**Main Statement:**

Most goals are formulated unclearly. Unclarity makes it impossible to build a correct plan and measure progress.

```
∀ G (goal): 
  if not clear(G) 
  then impossible(plan(G)) ∧ impossible(measure(G))
```

## Types of Unclarity

### 1. Lack of Completion Criterion

```
unclear_completion(G) ⟺ ∄ criterion(G): done(G)
```

**Examples:**

| Goal | Problem |
|------|---------|
| "Learn Python" | When is it considered learned? |
| "Become better" | How is "better" measured? |
| "Exercise" | How much? How often? How long? |

### 2. Unmeasurable Result

```
unmeasurable(G) ⟺ ∄ function f: measure(G) → ℝ
```

**Examples:**

| Goal | Why Unmeasurable |
|------|------------------|
| "Be happy" | No objective happiness metric |
| "Improve health" | Too general, many parameters |
| "Develop" | Direction not defined |

### 3. Means-End Confusion

```
confusion(G) ⟺ G describes process, not result
```

**Examples:**

"Read books" — is this means or goal?
- If goal is knowledge, need to measure what's learned, not what's read
- If goal is reading process itself, why?

### 4. Dependence on External Agents

```
uncontrollable(G) ⟺ achieve(G) requires actions of other agents
```

**Examples:**

| Goal | Dependency |
|------|------------|
| "Get job at Google" | Google's decision |
| "Find partner" | Another person's decision |
| "Become popular" | Audience's decision |

## Mathematical Formalization of Unclarity

### 1. Clarity Measure

```
clarity(G) = measurable(G) × controllable(G) × atomic(G)
```

where each component ∈ [0, 1].

**Fully clear goal:**

```
clarity(G) = 1 ⟺ 
  (1) ∃ objective criterion: done(G)
  (2) ∃ procedure P: controllable(P) ∧ execute(P) ⟹ achieve(G)
  (3) G doesn't require further decomposition for understanding
```

**Fully unclear:**

```
clarity(G) = 0 ⟺ no criterion ∨ no control ∨ requires decomposition
```

### 2. Clarity Gradient

```
clarity_gradient(G) = ∂clarity(G) / ∂refinement
```

If gradient > 0, goal can be refined.
If gradient = 0, goal already maximally clear or not refinable.

### 3. Plannability Threshold

```
plannable(G) ⟺ clarity(G) > threshold (usually 0.7)
```

Below threshold — impossible to build correct plan.

## Goal Clarification Algorithm

```
function clarify(G):
  // Step 1: Measurability check
  if not measurable(G):
    G = add_criterion(G)
    Prompt: "How to verify goal is achieved?"
  
  // Step 2: Controllability check
  if not controllable(G):
    G = extract_controllable_part(G)
    Prompt: "What part can you control yourself?"
  
  // Step 3: Atomicity check
  if not atomic(G) and not decomposable(G):
    return error("Goal too abstract, decompose")
  
  // Step 4: Finiteness check
  if not finite(G):
    G = set_time_bound(G)
    Prompt: "What deadline for achievement?"
  
  return G
```

## Transformation Examples

### Example 1: "Learn Python"

```
Initial: "Learn Python"
  clarity = 0.1 (unmeasurable, no criterion)

Step 1: Why?
  → For programming job

Step 2: What specifically needed for job?
  → Ability to solve typical tasks

Step 3: What tasks?
  → CRUD, REST API, database work

Step 4: Criterion?
  → Implement 3 projects: ToDo API, Blog API, E-commerce API

Final: "Implement 3 REST API projects with CRUD and DB in 2 months"
  clarity = 0.9 (measurable, controllable, finite)
```

### Example 2: "Be Healthy"

```
Initial: "Be healthy"
  clarity = 0.0 (unmeasurable, no criterion)

Step 1: What does healthy mean?
  → Good tests, normal weight, physical form

Step 2: Which parameter to choose?
  → Start with weight (measurable)

Step 3: What weight goal?
  → Reduce from 95 to 85 kg

Step 4: What deadline?
  → 5 months (2 kg/month safely)

Step 5: How to control?
  → Calorie deficit + training

Final: "Reduce weight from 95 to 85 kg in 5 months via 300 kcal/day deficit + 3 workouts/week"
  clarity = 0.95 (measurable, controllable, finite)
```

### Example 3: "Get Job at Google"

```
Initial: "Get job at Google"
  clarity = 0.2 (not controllable)

Step 1: What can you control?
  → Interview preparation, sending resume

Step 2: Extract controllable part
  → "Prepare for interviews at top companies"

Step 3: What does prepare mean?
  → Solve 150 LeetCode problems, study system design

Step 4: Readiness criterion?
  → Successfully pass 3 mock interviews

Final: "Solve 150 LeetCode problems + pass 3 successful mock interviews in 3 months"
  clarity = 0.85 (measurable, controllable)
```

## Goal Evolution Problem

### 1. Goals Change Over Time

```
G(t) ≠ G(t + Δt)
```

What seemed important at start may lose meaning.

**Example:**

```
t=0: "Become Senior developer"
t=6 months: "Work on interesting projects" (realized title not important)
```

### 2. Uncertainty Resolution

Unclear goals can be **temporarily useful** for exploration:

```
explore(G_unclear) → discover(G_clear)
```

**Strategy:**

```
if clarity(G) < 0.3:
  // Too unclear for planning
  // But can explore direction
  execute(small_experiment(G))
  G' = refine(G, experiment result)
```

### 3. Balance of Clarity and Flexibility

Too rigid goal → loss of adaptability

```
optimal_clarity ∈ [0.7, 0.9]
```

Clear enough for planning, but flexible for adjustment.

## Practical Consequences

### 1. Clarification Procedure Mandatory

```
∀ G: before(plan(G)) → execute(clarify(G))
```

Without clarification, plan will be incomplete (see Plan Correctness Problem).

### 2. Iterative Clarification

```
G₀ → clarify → G₁ → execute(small_step) → refine → G₂ → ...
```

Don't try to clarify perfectly first time.

### 3. Separation by Horizon

```
Short-term goal (1-3 months): clarity → 0.9
Mid-term goal (6-12 months): clarity → 0.7
Long-term goal (1+ year): clarity → 0.5
```

The further the horizon, the lower acceptable clarity.

## Conclusion

**Goal unclarity is the main source of failures.**

"Chance" system requires:
1. Explicit clarification of each goal before planning
2. Extraction of controllable part from uncontrollable goals
3. Addition of measurable criteria
4. Iterative refinement during execution

```
clear_goal = foundation(successful_execution)
```

Without goal clarity, there is no plan. Without plan, there is no progress.

---

**References:**
- `docs/core/math.md` — goal optimality criteria
- `docs/core/dependency-measure.md` — measurement methods
- `docs/problems/plan-correctness-problem.md` — why plan requires clarity


