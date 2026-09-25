# Module 5: The Agent Team

**Time:** 1 day
**Coding required:** None — this module is about *delegation*, not writing code.
**Prerequisite:** [Module 4](module-4-experiments-and-investment.md) — a solution that survived its test. You'll run it from idea into delivery-ready artifacts.
**You will produce:** One solution carried from user story → architect design brief, with a map of every point where the agent stopped and required *your* judgment.

---

## Why this module

This is where Module 0's promise gets concrete: **agents produce the artifacts; you hold the judgment.** The playbook ships six specialized agents, each with a defined role and tools. All follow one rule: act, then report, and ask first only before something irreversible ([Autonomy Policy](../Autonomy%20Policy.md)). Learning the team isn't about memorizing six job descriptions — it's about **calibrating delegation and review**: what to hand off, which reported calls to check, and the few irreversible ones only you approve.

For a non-technical PM this is the most liberating module in the course. You don't need to design a schema or write code — you need to know *which* agent to point at a problem, *what* to tell it, and *where* to step in. The agents are tools; the sequencing and the decisions are the job.

---

## Learning objectives

By the end of this module you will be able to:

- Name the six agents, what each does, and the few irreversible actions each asks you about first.
- Route a piece of work to the right agent (and recognize when you're using the wrong one).
- Write a delegation prompt with enough context that the agent doesn't have to guess.
- Identify the judgment calls an agent made on your behalf, and correct the ones you'd make differently.
- Run a solution from PM → Architect without writing any code yourself.

---

## Concept reading

### The six agents (and the handoff between them)

| Agent | Does | Does and reports | Asks you first |
|---|---|---|---|
| **pm** | Discovery, OST, signal synthesis, user stories, experiment briefs | Synthesis, OST updates and restructuring, prioritization, stories, experiment design and interpretation | Archiving a branch with work behind it; anything customers see; recruiting participants |
| **architect** | System design, ADRs, schema review, tech evaluation | ADRs, design docs, diagrams, schema memos | New tech the team hasn't used; breaking changes to an interface |
| **engineer** | Implements features, fixes bugs, refactors, debugs | Implementation, including reasonable readings of ambiguous specs | Scope materially larger than the spec |
| **qa** | Test strategy, test writing, edge-case hunting | Test plans and tests within the spec | Gaps that suggest the spec itself is wrong |
| **reviewer** | Correctness, security, performance audits (read-only) | A structured review with blocking vs. advisory issues | — (it reports; you and the engineer act) |
| **release-manager** | Triage/merge open PRs, then ship | Merge ordering, CI gating, per-PR rollback calls | Risky merges; release go/no-go |

The default flow: **PM** frames the work → **Architect** designs it → **Engineer** builds it → **QA** and **Reviewer** check it in parallel → **release-manager** ships it. You are the team lead routing between them — not a link in the chain.

### Delegation and escalation calibration

Three buckets, and getting them right *is* the skill:

- **Hand off:** production work — "write user stories for X," "design the data model for Y," "audit the changes in Z." The agent does it and returns an artifact.
- **Review and correct:** judgment calls the agent made and reported — which opportunity to focus on, how strong the evidence is, the riskiest assumption, a tech direction. The agent doesn't wait for you; you read its report critically and change what's wrong.
- **Only you approve:** the irreversible — killing an idea that has work behind it, shipping, putting something in front of customers, spending money or people's time. The agent prepares these and asks once.

A good delegation prompt gives the agent the context it would otherwise infer: the constraint, what's ruled out, the desired outcome. Watch the **assumptions each agent states** — they show you what context to bring next time.

**Go deeper:** [How to Use the Agents](../How%20to%20Use%20the%20Agents.md) (the full per-agent guide: when to spawn, example invocations, what each checks first), the agent definitions in [`agents/`](../agents/), and [Escalation Calibration](../Agent%20Skills/Escalation%20Calibration.md).

---

## Hands-on exercise

> **🎯 Doing this on your own product?** Swap in *your* validated solution from Module 4. The routing and review lessons are product- and domain-agnostic. If your product is non-technical or you have no in-house engineering team, do all five steps — Steps 1–2 (pm → architect) are the highest-value arc, and Steps 3–5 (decision map, reflection) apply equally when a contractor builds. The "only-you-approve" bucket is the same regardless of who builds.

**Setup:** Take the solution that survived its Module 4 test. For ShiftLoop, say the concierge test passed and the winning solution is **org-level roster push** (the owner loads all locations' staff so managers never re-key).

**Steps:**

1. **PM agent — write the stories.** Spawn it: *"Write user stories and acceptance criteria for org-level roster push in ShiftLoop. Desired outcome: lift first-schedule activation from 38% to 60%. Constraint: a manager must reach a publishable roster with zero manual data entry."* Note what it inferred (existing OST? which outcome? discovery phase?).
2. **Read like a PM, not a stenographer.** Review the stories. Which prioritization or scope calls did it make? Change any you disagree with. This is the "review and correct" bucket in action.
3. **Architect agent — design brief.** Spawn it: *"Design how org-level roster push works. Hard constraints: [name yours]. Lay out the options as an ADR; we haven't decided the approach."* Note what *it* assumed (hard constraints? what's ruled out?) and what it flags (new tech / breaking change).
4. **Map the decision points.** List every judgment call made across Steps 1–3, by an agent or by you. Classify each: *hand off / review and correct / only-you-approve.*
5. **Reflect on the judgment.** In one or two sentences: across this whole flow, what did *only you* contribute that no agent could? (Callback to Module 0 — that's your actual job.)

**Deliverable:** the user stories + the architect's design brief/ADR, plus your **decision map** — the list of decision points, each classified into one of the three buckets.

---

## Success criteria

- [ ] You routed each task to the correct agent and can say why the others were wrong for it.
- [ ] Your delegation prompts included the key context (constraint, outcome, what's ruled out), so the agent's stated assumptions were few and right.
- [ ] You produced both artifacts (stories + design brief) without writing implementation code.
- [ ] Your decision map names the real decision points and classifies each as hand off / review and correct / only-you-approve.
- [ ] You can state, in one sentence, the judgment only you provided.

---

## Common failure modes

| Symptom | What's going wrong | Fix |
|---|---|---|
| Wrong agent for the job (asking `engineer` to make a prioritization call) | Role confusion | Match the task to the role table. Decisions about *what/why* are PM/you; *how* is architect/engineer. |
| Rubber-stamping the agent's output | Treating "review" work as "hand off" work | If the artifact encodes a judgment you own (priority, branch, tech direction), read it critically and change it when needed. |
| The agent's stated assumptions keep missing | Thin delegation prompt | Front-load the constraint, the outcome, and what's already ruled out. |
| You started designing the schema yourself | Doing the agent's job, abandoning yours | Hand the design to the architect. Your job is the constraints and the decision, not the diagram. |
| No judgment calls noticed | Not reading for where judgment was exercised | Every report makes calls. Re-read it for the choices and assumptions it states. |
| The agent waits on you for reversible work | Over-cautious setup or prompt | Tell it to act and report; only irreversible actions need you first. |

---

## Next

You've run one full idea-to-design pass with the team. The last piece is turning all of this from a course you took into a habit you keep.

→ **[Module 6: Cadences & Health](module-6-cadences-and-health.md)**
