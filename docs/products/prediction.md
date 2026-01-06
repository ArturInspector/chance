# Microservice - Prediction
**Status**: MVP concept  
**Goal**: Show where current executable procedures lead in foreseeable future

---

## Essence

You do something today. Prediction says: "If you keep doing this for N days, here's what you'll get."

Not magic. Not perfect prediction. Simply:
```
current_procedures + time → expected_outcome
```

If today learned nothing, tomorrow 10 hours learned, then week again nothing—obviously this leads nowhere. Prediction makes this obvious visible.

---

## Problem

People poorly see consequences of own actions:
- Actions done today
- Result months/years later
- Connection not obvious

**Example 1**: Write code 30 minutes per day. Will I become programmer in a year?  
**Example 2**: Do 3 sets of push-ups every other day. Will there be effect in 3 months?  
**Example 3**: Learn 5 English words per day. When can I read books?

Prediction answers these questions **before** you spend time.

---

## MVP Implementation

### Input Data

1. **Procedure History**
   - What did last N days
   - Frequency (regularity)
   - Duration (time on task)
   - Quality feedback (if available)

2. **Target Query**
   - "Where will this lead in 3 months?"
   - "Is this enough to achieve X?"

### Process

```
User: current procedures → LLM (Claude/GPT-5) → prediction + confidence
```

LLM receives:
- Pattern of your actions over last 30 days
- Domain knowledge (what's needed to achieve goal)
- Reference data (how much usually required for similar goals)

LLM returns:
```json
{
  "prediction": "In 3 months can write simple scripts",
  "confidence": "low",
  "reasoning": "Regularity low (3 days/week → 5 days/week → 1 day), 
                volume small (30 min/day), but direction correct",
  "gaps": [
    "No practice with real projects",
    "No code review",
    "Theory without application"
  ],
  "recommendations": [
    "Increase frequency to 5 days/week",
    "Add procedure: solve 1 real problem/week"
  ]
}
```

### Key Features

1. **Honesty**  
   If pattern says "this won't work" — say directly.  
   Don't sell illusions.

2. **Concreteness**  
   Not "become better", but "can X, cannot Y".

3. **Calibration**  
   Initially confidence low. Over time (when real outcomes exist) — calibrates on your data.

---

## Where Can Go Wrong

### 1. Determinism (dangerous!)

```
Prediction ≠ guarantee
```

This is **probabilistic estimate**, not plan. World is chaotic (Axiom 10). External factors, black swans, illness, life circumstances — all can break any forecast.

**Risk**: User believes "if I do X, I'll definitely get Y". Disappointment inevitable.
**Protection**: Always show confidence level. If confidence < 50%, explicitly warn.

### 2. Motivational Degradation
```
"Prediction says I won't succeed" → gives up
```

If prediction negative, person may just quit instead of adjusting procedures.

**Risk**: Product demotivates instead of helping.

**Protection**: 
- Always give recommendations (what to change)
- Focus not on "won't work", but on "will work if..."
- Gap analysis: not "bad", but "here's what's missing"

### 3. LLM Overconfidence
LLM may speak confidently even when shouldn't. Hallucinations haven't gone away.

**Risk**: Prediction sounds convincing, but based on model fantasy.

**Protection**:
- Require reasoning from LLM (why thinks so)
- Cross-check with reference data (if available)
- Honest disclaimer: "This is AI estimate, not absolute"

### 4. Ignoring Context
Two people do "30 minutes code per day", but:
- One has 5 years experience
- Other has 0 experience

Results will differ. LLM may not account for your starting point.

**Risk**: Prediction for beginner and expert same.

**Protection**: 
- Request baseline (current level)
- History — not just procedures, but results/feedback

### 5. Parasitic Procedures

Person does procedures that **look** correct, but don't lead to goal.
**Example**: Read programming books 2 hours/day, but don't write code. Prediction may say "progress", but real skill won't be.
**Risk**: Prediction reinforces parasitic behavior.

**Protection**: 
- Analyze procedures through parasitic-goals.md lens
- Check: is there direct feedback from actions?

### 6. Short Observation Horizon
If you have 7 days of data, prediction for year — fantasy.
**Risk**: Extrapolation from small data.
**Protection**:
- Minimum 14-30 days data for serious predictions
- For short periods — only short predictions

---

## Integration

### MVP Flow

```
1. User inputs: "Last 30 days did X, Y, Z"
2. System forms prompt for LLM:
   - List of procedures with frequency
   - Target question
   - Context (starting point, domain)
3. LLM (Claude/GPT-5) generates prediction
4. System shows:
   - Prediction
   - Confidence
   - Gaps
   - Recommendations
5. User can:
   - Accept and adjust procedures
   - Reject and ask alternative
   - Ask deeper questions
```

### Data for Improvement

Over time:
- Collect: prediction → real outcome (after N months)
- Calibration: how accurate LLM is **for you**
- Fine-tuning: if lots of data, can tune model

---

## What Prediction Does NOT Do

1. **Doesn't build skill map**  
   Too complex for MVP. Can add later, but first simple: procedure → outcome.
2. **Doesn't guarantee result**  
   Only probability estimate.
3. **Doesn't replace thinking**  
   LLM is tool, not truth. Critical thinking on your side.
4. **Doesn't predict external factors**  
   Can't know you'll get sick or move in a month.

---

## Why This Is Useful

1. **Early feedback**  
   Learn "this doesn't work" in a week, not a year.
2. **On-the-fly correction**  
   Recommendations allow changing course before too late.
3. **Realistic expectations**  
   "30 minutes/day not enough for X in 3 months" — honest, even if unpleasant.
4. **Motivation through clarity**  
   When clear "if I do THIS, I'll get THIS", easier to stick to plan.

---

## Next Steps (After MVP)

1. **Skill graph**  
   Map of skill dependencies. But complex. Postpone for now.

2. **Real calibration**  
   Collect "prediction vs reality" data, improve accuracy.

3. **Multi-domain predictions**  
   Now one domain (e.g., coding). Later — fitness, languages, career, etc.

4. **Community benchmarks**  
   "80% of people with this pattern had result X". If data available.

---

## Summary

Prediction is honest mirror. It shows where you're **really** going based on what you do **now**. 

Not magic. Not guarantee. Simply: "Here's data, here's pattern, here's likely outcome".

If outcome doesn't please — change pattern. Prediction gives feedback **before** you spend months in vain.

Main rule: **be honest with yourself**. If prediction says "won't work", don't ignore. Ask "what to change?" and act.


