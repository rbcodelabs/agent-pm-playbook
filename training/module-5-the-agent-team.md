# Module 5: The Agent Team

**Time:** 1 day
**Coding required:** None — this module is about *delegation*, not writing code.
**Prerequisite:** [Module 4](module-4-experiments-and-investment.md) — a solution that survived its test. You'll run it from idea into delivery-ready artifacts.
**You will produce:** One solution carried from user story → architect design brief, with a map of every point where the agent stopped and required *your* judgment.

---

## Why this module

This is where Module 0's promise gets concrete: **agents produce the artifacts; you hold the judgment.** The playbook ships six specialized agents, each with a defined role, its own tools, and explicit rules about what it decides alone versus what it surfaces to you first. Learning the team isn't about memorizing six job descriptions — it's about **calibrating delegation and escalation**: what to hand off, what to review, and what only you can decide.

For a non-technical PM this is the most liberating module in the course. You don't need to design a schema or write code — you need to know *which* agent to point at a problem, *what* to tell it, and *where* to step in. The agents are tools; the sequencing and the decisions are the job.

---

## Learning objectives

By the end of this module you will be able to:

- Name the six agents, what each does, and what each decides autonomously vs. escalates.
- Route a piece of work to the right agent (and recognize when you're using the wrong one).
- Write a delegation prompt with enough context that the agent doesn't have to guess.
- Identify the escalation points — the moments an agent hands a decision back to you — and make those calls.
- Run a solution from PM → Architect without writing any code yourself.

---

## Concept reading

### The six agents (and the handoff between them)

| Agent | Does | Decides autonomously | Escalates to you |
|---|---|---|---|
| **pm** | Discovery, OST, signal synthesis, user stories, experiment briefs | Synthesis reports, OST updates, first-draft stories/briefs | Prioritization calls, major OST branch decisions |
| **architect** | System design, ADRs, schema review, tech evaluation | ADRs, design docs, diagrams, schema memos | New tech the team hasn't used; breaking changes to an interface |
| **engineer** | Implements features, fixes bugs, refactors, debugs | Implementation against a clear spec | Ambiguous specs; scope it can't fulfill as written |
| **qa** | Test strategy, test writing, edge-case hunting | Test plans and tests within the spec | Gaps that suggest the spec itself is wrong |
| **reviewer** | Correctness, security, performance audits (read-only) | A structured review with blocking vs. advisory issues | — (it reports; you and the engineer act) |
| **release-manager** | Triage/merge open PRs, then ship | Merge ordering, CI gating, per-PR rollback calls | Risky merges; release go/no-go |

The default flow: **PM** frames the work → **Architect** designs it → **Engineer** builds it → **QA** and **Reviewer** check it in parallel → **release-manager** ships it. You are the team lead routing between them — not a link in the chain.

### Delegation and escalation calibration

Three buckets, and getting them right *is* the skill:

- **Hand off:** well-specified production work — "write user stories for X," "design the data model for Y," "audit the changes in Z." The agent does it and returns an artifact.
- **Review:** anything the agent produced that encodes a judgment you own — a prioritization, an OST branch decision, a tech direction. You read it critically; you don't rubber-stamp it.
- **Only you decide:** which opportunity matters, whether the evidence is strong enough, what the riskiest assumption is, when to kill an idea, whether to ship. No agent owns these — they're the judgment from Module 0.

A good delegation prompt gives the agent the context it would otherwise ask for: the constraint, what's already ruled out, what the desired outcome is. Watch what each agent **asks before acting** — that's the doc telling you what context to bring.

**Go deeper:** [How to Use the Agents](../How%20to%20Use%20the%20Agents.md) (the full per-agent guide: when to spawn, example invocations, what each asks first), the agent definitions in [`agents/`](../agents/), and [Escalation Calibration](../Agent%20Skills/Escalation%20Calibration.md).

---

## Hands-on exercise

> **🎯 Doing this on your own product?** Swap in *your* validated solution from Module 4. The routing and escalation lessons are product- and domain-agnostic. If your product is non-technical or you have no in-house engineering team, do all five steps — Steps 1–2 (pm → architect) are the highest-value arc, and Steps 3–5 (escalation map, reflection) apply equally: your escalation points are just handed off to a contractor instead of a salaried engineer. The "only-you-decide" bucket is the same regardless of who builds.

**Setup:** Take the solution that survived its Module 4 test. For ShiftLoop, say the concierge test passed and the winning solution is **org-level roster push** (the owner loads all locations' staff so managers never re-key).

**Steps:**

1. **PM agent — write the stories.** Spawn it: *"Write user stories and acceptance criteria for org-level roster push in ShiftLoop. Desired outcome: lift first-schedule activation from 38% to 60%. Constraint: a manager must reach a publishable roster with zero manual data entry."* Note what it asks before acting (existing OST? which outcome? discovery phase?).
2. **Read like a PM, not a stenographer.** Review the stories. Did it slip in a prioritization or scope call that's *yours*? Flag it. This is the "review" bucket in action.
3. **Architect agent — design brief.** Spawn it: *"Design how org-level roster push works. Hard constraints: [name yours]. Lay out the options as an ADR; we haven't decided the approach."* Note what *it* asks (hard constraints? what's ruled out?) and watch for its escalation trigger (new tech / breaking change).
4. **Map the escalation points.** Write down every moment an agent surfaced a decision back to you across Steps 1–3. For each, classify it: *hand off / review / only-you-decide.*
5. **Reflect on the judgment.** In one or two sentences: across this whole flow, what did *only you* contribute that no agent could? (Callback to Module 0 — that's your actual job.)

**Deliverable:** the user stories + the architect's design brief/ADR, plus your **escalation map** — the list of decision points, each classified into one of the three buckets.

---

## Success criteria

- [ ] You routed each task to the correct agent and can say why the others were wrong for it.
- [ ] Your delegation prompts included the context each agent asks for (constraint, outcome, what's ruled out) — it didn't have to guess.
- [ ] You produced both artifacts (stories + design brief) without writing implementation code.
- [ ] Your escalation map names the real decision points and classifies each as hand off / review / only-you-decide.
- [ ] You can state, in one sentence, the judgment only you provided.

---

## Common failure modes

| Symptom | What's going wrong | Fix |
|---|---|---|
| Wrong agent for the job (asking `engineer` to make a prioritization call) | Role confusion | Match the task to the role table. Decisions about *what/why* are PM/you; *how* is architect/engineer. |
| Rubber-stamping the agent's output | Treating "review" work as "hand off" work | If the artifact encodes a judgment you own (priority, branch, tech direction), read it critically and change it when needed. |
| The agent keeps asking for context | Thin delegation prompt | Front-load the constraint, the outcome, and what's already ruled out. The "what it asks before acting" column tells you what to include. |
| You started designing the schema yourself | Doing the agent's job, abandoning yours | Hand the design to the architect. Your job is the constraints and the decision, not the diagram. |
| No escalation points noticed | Not reading for where judgment is required | If an agent never surfaced a decision, you probably over-specified or under-reviewed. Re-read its output for embedded calls. |

---

## Next

You've run one full idea-to-design pass with the team. The last piece is turning all of this from a course you took into a habit you keep.

→ **[Module 6: Cadences & Health](module-6-cadences-and-health.md)**
