---
name: design-before-code
description: >-
  Pre-implementation design gate — invoke before writing any code for a new feature
  or significant change. Explores context, surfaces tradeoffs, proposes 2-3 approaches,
  writes a brief spec, and gets approval. No implementation until this gate closes.
metadata:
  priority: 1
retrieval:
  aliases:
    - design before code
    - pre-implementation
    - design gate
    - plan before build
    - implementation design
  intents:
    - I want to build a feature
    - implement this
    - let's start coding
    - help me design this
    - what's the best approach for building
---

# Design Before Code

**This is a hard gate. No implementation starts until this skill completes and the design is approved.**

If you are tempted to skip this because:
- "It's a small change" — small changes with wrong designs still need rework
- "The spec is clear enough" — a clear spec is the output of this process, not a reason to skip it
- "I already know the approach" — then stating it takes 2 minutes and saves the PM from a wrong bet
- "We'll figure it out as we go" — that is the exact pattern this gate prevents

Run it anyway.

---

## Step 0 — Enter native Plan mode

First check for an already approved design in the active instruction or a verified
[build package](../build-authorization/SKILL.md). When it covers the current scope and
approach, this gate is satisfied: record the reference and hand off to implementation.
Do not enter Plan mode or ask for the same approval again. Use the remaining design
workflow only for missing design or a material change requiring a revised package.

If an `EnterPlanMode` tool is available, call it immediately before inspecting
repository files or taking any other task action.

Native Plan mode is mandatory when the requested deliverable is a plan,
technical design, specification, implementation approach, or investigation
intended to lead to a code change. This skill's read-only instructions do not
substitute for entering native Plan mode; use both.

If `EnterPlanMode` is unavailable, state that briefly and continue with this
manual read-only design workflow.

---

## Step 1 — Load context

Before proposing anything, read:
1. The relevant source files for the area being changed
2. Any existing similar implementations in the codebase
3. Any referenced Linear issue, ADR, or design doc

Do not form a recommendation yet. Understand the terrain first.

---

## Step 2 — Clarify the requirement

Ask only what you genuinely can't infer from the brief and the codebase. One question at a time, multiple-choice where possible.

Questions worth asking:
- What does success look like? (what changes for the user)
- Are there hard constraints not visible in the code? (latency, cost, existing API contracts)
- Is there a part of this that has been tried or ruled out already?

Questions not worth asking:
- Questions answered by the codebase itself
- Questions the user already answered in the brief
- Questions that only matter after the approach is chosen

### Use Design mode for visual work

For a new screen, substantial UI change, or unresolved layout, hierarchy, grouping,
or interaction decision, create or revise a reviewable visual prototype before
production implementation. In Geode Agent Threads, call `EnterDesignMode({ brief })`
when available, or use `/design <brief>` in the composer. Reuse an approved artifact
when it already covers the current scope; trivial
copy or styling fixes with a clear expected result do not need a new prototype.

Technical planning uses native Plan mode. Creating the visual artifact requires
file writes, so finish the read-only planning turn and resolve any pending Plan
approval before starting the design turn. Approval to create a prototype authorizes
that artifact work only; production implementation still follows the approved spec.

Geode invocation and lifecycle:

- Submit `/design <brief>` in the current thread's composer to create its first
  artifact or revise the existing one. It can be introduced midway through an
  existing conversation; a new thread is unnecessary. Prefer a settled turn so
  the design brief does not compete with work already in progress.
- Bare `/design` reopens an existing preview without requesting edits. From the
  Agents List or Agent Board, a brief is required to start a new design thread.
- Prefer the `EnterDesignMode` tool when exposed. It creates or reuses the calling
  thread's artifact, opens its preview, and returns paths and design instructions
  for the agent to continue in the same turn. It requires a nonblank brief and
  normal write permission; resolve Plan mode before calling it. Inspect its preview
  outcome rather than assuming the preview opened. If unavailable, give
  the user the exact composer command to submit. A literal slash command sent
  through a generic thread-message tool does not invoke the host command handler;
  do not claim Design mode started without an artifact and preview.
- Design artifacts require a desktop vault with local filesystem access. When
  Geode Design mode is unavailable, state the limitation and use the configured
  prototype provider or another supported reviewable mockup workflow. Do not make
  Geode a requirement for other hosts.

Include the user task, relevant existing design patterns, target viewports, and
the decision to resolve in the brief. Keep the prototype outside production
source and follow the host's artifact contract: local HTML, external CSS and
JavaScript, and local assets, without package installs, servers, or network APIs.
Use realistic synthetic content, check responsive layouts and relevant interaction
states, and present the preview for review. Stop iterating once the visual decision
is approved. Record an identifiable artifact revision or screenshot and the
approved behavior in the implementation spec; prototype approval and visual QA
do not replace production tests or verification in the actual application.

---

## Step 3 — Propose 2-3 approaches

For each approach, state:
- **What it does** (one sentence)
- **Why you'd choose it** (fits constraints, lower risk, faster to ship)
- **What you give up** (tradeoff, not just a downside)

At least one approach should be the simplest viable option. At least one should challenge an assumption in the brief.

Do not recommend a single approach yet. Surface the options first.

---

## Step 4 — Recommend and get approval

State which approach you recommend and why, tied to the stated constraints. Name the riskiest assumption in that approach.

Then stop. Ask: "Does this match what you're thinking, or do you want to adjust before I proceed?"

**Do not write implementation code until you receive approval.**

---

## Step 5 — Write the spec

Once the approach is approved, write a brief spec before coding:

```
## Spec: [Feature Name]

**Approach:** [chosen approach in one sentence]
**Files affected:** [list of files that will change]
**Key decisions:** [any choices baked into this approach]
**Visual reference:** [approved artifact revision/screenshots and behavior, or why not applicable]
**Riskiest assumption:** [what must be true for this to work]
**Out of scope:** [things explicitly not included]
**Done when:** [specific, observable criteria — what can be verified]
```

Save this as a comment in the conversation or as a note if the feature is large enough to warrant it. This is the contract the implementation will be checked against.

---

## Handoff

After approval, hand off to the implementation workflow:
- Invoke the `engineer` agent with the spec, file list, and approved visual reference when applicable
- The engineer uses `test-first` for all new logic
- The engineer uses `verify-done` before reporting completion

If the architect agent has not weighed in and this involves a data model change, new dependency, or public interface change — surface that before proceeding.
