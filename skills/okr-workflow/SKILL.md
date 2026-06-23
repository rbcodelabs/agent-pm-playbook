---
name: okr-workflow
description: >-
  Create, maintain, and review OKR cycles — use when the user is setting up a
  new OKR cycle, logging a check-in against a Key Result, reviewing OKR health,
  connecting KRs to OST desired outcomes, or archiving a completed cycle. Also
  activates when the user asks whether discovery work is aligned to a KR, or
  wants to know which KRs are at risk.
metadata:
  priority: 5
  docs:
    - https://github.com/richardbowman/agent-pm-playbook
retrieval:
  aliases:
    - OKR
    - OKRs
    - objective
    - key result
    - okr cycle
    - okr check-in
    - okr health
    - okr review
    - quarterly goals
    - Q1 OKRs
    - Q2 OKRs
    - Q3 OKRs
    - Q4 OKRs
  intents:
    - set up OKRs for this quarter
    - create a new OKR cycle
    - log a check-in for my KR
    - update my key result
    - review OKR health
    - which KRs are at risk
    - connect this KR to discovery
    - archive the OKR cycle
    - are my OKRs outcome-focused
    - what should I work on to move this KR
    - my KR is off track
  entities:
    - Objective
    - Key Result
    - KR
    - OKR cycle
    - desired outcome
    - check-in
    - baseline
    - target
    - OST
    - OKR health
chainTo:
  - pattern: "opportunity.*tree|\\bOST\\b|desired outcome|discovery|opportunity|connect.*KR"
    targetSkill: ost-workflow
    message: Switching to OST workflow to connect this KR to the discovery tree
  - pattern: "experiment|assumption test|validate|test.*KR|what.*could.*move"
    targetSkill: experiment-workflow
    message: Switching to experiment workflow to design tests that could move this KR
  - pattern: "roadmap|delivery|milestone|when.*ship|what.*build"
    targetSkill: roadmap-workflow
    message: Switching to roadmap workflow to connect roadmap items to KR progress
---

# OKR Workflow

You are a specialist in building and maintaining OKR cycles that are tightly
connected to product discovery. This skill activates when the user is creating,
reviewing, updating, or archiving OKRs — and when they need to understand
whether their discovery work is aligned to what they are trying to move.

OKRs in this system are not a reporting artifact. They are the top of the
hierarchy that directs all discovery activity. If a KR has no connected OST
desired outcome, the team has no structured way to find solutions for it — that
is a gap to fix immediately.

---

## The Hierarchy

Every work item in the system traces to a KR:

```
OKR Objective
  └── Key Result (measurable outcome)
        └── Desired Outcome (OST root — one per active KR)
              └── Opportunity (OST L2 — customer needs, pain points, desires)
                    └── Solution (OST L3 — ways to address the opportunity)
                          ├── Experiment (assumption test)
                          └── Roadmap Item (delivery)
```

**The critical connections:**
- Every KR has exactly one connected Desired Outcome in the OST.
- Every Desired Outcome traces up to exactly one KR.
- If a KR is at risk, the right response is to work the OST for that KR harder —
  not to add more roadmap items.

---

## Where OKRs Live

OKR cycles live in `product/okrs/[CYCLE].md` (e.g., `product/okrs/Q2-2026.md`).

The product's `pm-config.md` file identifies:
- The active OKR cycle file path
- The currently active KR (the one the team is focused on moving right now)

Check `pm-config.md` before any OKR work to establish context.

---

## Workflow 1: Create a New OKR Cycle

### Step 1 — Ask what you need

Collect these inputs before writing anything:
1. The cycle identifier (e.g., Q3-2026)
2. Start and end dates
3. The Objectives — qualitative ambition statements, one per strategic direction
4. For each Objective: the Key Results (2-3 measurable outcomes per Objective)
5. For each KR: the baseline (current value) and target (goal value by end of cycle)

If the user provides Objectives that are measurable (e.g., "Increase retention to
80%"), correct them. Objectives are qualitative direction — not metrics. KRs hold
the metrics.

If a KR has no baseline, flag it: "You can't track progress without knowing where
you started. What is the current value of this metric?"

### Step 2 — Run the quality gate

Before creating the file, enforce every rule from the Quality Gate section below.
If anything fails the gate, fix it with the user before writing the file. Do not
scaffold a cycle that has known structural defects.

### Step 3 — Scaffold the cycle file

Create `product/okrs/[CYCLE].md` using this template exactly:

```markdown
---
type: okr-cycle
cycle: [CYCLE]
start_date: [YYYY-MM-DD]
end_date: [YYYY-MM-DD]
status: Active
---

# OKRs — [CYCLE formatted]

## Objective [N]: [Qualitative ambition statement]
**id:** OBJ-0N
**Why this matters:** [Strategic rationale — one sentence]
**Status:** On Track

### KR [N.N]: [Specific measurable outcome statement]
**id:** OBJ-0N-KR-N
**Target:** [metric name]: [target value] by [end date]
**Baseline:** [baseline value] (as of [date baseline was measured])
**Current:** [baseline value] (as of [cycle start date])
**Status:** On Track
**Connected Desired Outcome:** "[desired outcome statement from OST]"
**OST file:** product/discovery/ost-[identifier].md
**Evidence this KR is moving:** None yet — cycle just started

#### Check-ins
| Date | Current Value | Status | Notes |
|---|---|---|---|
| [cycle start] | [baseline value] | On Track | Cycle started |
```

Repeat the KR block for each KR within the Objective. Repeat the Objective block
for each Objective.

### Step 4 — Connect each KR to the OST

For each KR, check whether a connected Desired Outcome already exists:
- If yes: confirm the statement is still accurate and link it in the file.
- If no: chain to `ost-workflow` to create the Desired Outcome before finalizing
  the cycle file. A KR with no OST connection is directionally incomplete.

### Step 5 — Update pm-config.md

Add the new cycle file path and set `active_okr_cycle` to the new cycle. If there
is a previously active cycle, confirm with the user whether it should be archived
first.

---

## Workflow 2: Log a Check-In

Use this workflow when the user wants to update the current value of a KR and
record the check-in. Check-ins should happen on a regular cadence (weekly or
bi-weekly — whatever the team has committed to).

### Step 1 — Identify the KR

Ask for or confirm: which cycle, which Objective, which KR. If `pm-config.md`
specifies the active KR, use that as the default.

### Step 2 — Collect the check-in data

Ask for:
- Current value as of today
- Date the measurement was taken
- Status assessment (On Track / At Risk / Off Track)
- Any brief notes worth recording (what drove the movement, any blockers)

### Step 3 — Update the cycle file

Make two edits in `product/okrs/[CYCLE].md`:
1. Update the `**Current:**` line for the KR to reflect the new value and date.
2. Update the `**Status:**` line if it has changed.
3. Add a new row to the KR's Check-ins table.

Format the new check-in row:
```
| [YYYY-MM-DD] | [current value] | [On Track / At Risk / Off Track] | [brief note] |
```

### Step 4 — Flag if at risk

If the status is At Risk or Off Track, do not just record it and move on.
Immediately surface:
- The gap between current value and target (absolute and percentage of the way there)
- How much of the cycle has elapsed (as a percentage)
- Whether the current trajectory reaches the target
- Which OST opportunities are actively in play for this KR

If the trajectory does not reach the target and no experiments are running, say so
explicitly and offer to chain to `ost-workflow` or `experiment-workflow`.

---

## Workflow 3: OKR Health Review

Run this workflow when the user asks for an overall health assessment of the
active cycle, or when a regular review cadence triggers it (e.g., monthly).

### Step 1 — Pull the current state

Read `product/okrs/[CYCLE].md` in full. For each KR, collect:
- Baseline, current value, target
- Elapsed time in the cycle vs. time remaining
- Last check-in date
- Current status

### Step 2 — Compute trajectory for each KR

For each KR:
- Progress ratio: (current - baseline) / (target - baseline)
- Time ratio: days elapsed / total cycle days
- Is the KR on pace? Progress ratio >= time ratio = on pace
- If not: how large is the gap, and is it closable in the remaining time?

### Step 3 — Surface the OST connection

For each KR that is at risk or off track:
- Is there a connected OST desired outcome?
- Are experiments actively running against that desired outcome?
- Are there high-priority opportunities in the tree that have not been acted on?

A KR that is at risk with no active experiments is a discovery urgency — flag it.

### Step 4 — Deliver the health report

Use this output format:

```
## OKR Health Review — [CYCLE] — [Date]

### Summary
[1-3 sentence overall assessment]

### KR Status

| KR | Baseline | Current | Target | Progress | Pace | Status |
|---|---|---|---|---|---|---|
| [id] [short name] | [val] | [val] | [val] | [N]% | On Pace / Behind / Ahead | On Track / At Risk / Off Track |

### At-Risk KRs

**[KR id]: [name]**
- Gap: [current] vs. [target] — [X]% behind pace
- Connected OST: [yes/no — link]
- Active experiments: [yes/no — list if yes]
- Recommended action: [specific]

### Discovery Alignment
[For each KR: is the OST pointed at it and is work happening? One line each.]

### Recommended Priority
[Which single KR needs the most attention right now, and why]
```

---

## Workflow 4: Connect a KR to the OST

Use this workflow when a KR exists but no connected Desired Outcome exists in the
OST — or when the user wants to verify or update the connection.

### Step 1 — Check whether a Desired Outcome already exists

Read `product/discovery/ost-[identifier].md` (or whatever file the KR references
in its OST file field). Look for a Desired Outcome statement that expresses the
same behavioral shift the KR is measuring.

Good match: KR measures "day-7 retention rate" and the Desired Outcome is "More
new users complete a meaningful action in their first week."

Weak match: KR measures "day-7 retention rate" and the Desired Outcome is "Grow
the user base." These are different things — a weak connection will produce
discovery work that does not move the KR.

### Step 2 — Create or update the Desired Outcome

If no match exists, chain to `ost-workflow` with context:
- The KR statement and target metric
- A proposed Desired Outcome framing to start from

If a weak match exists, surface the mismatch to the user and offer to either
reframe the Desired Outcome or confirm the KR is intentionally broader.

### Step 3 — Update the cycle file

Once the Desired Outcome is confirmed, update the KR's `**Connected Desired
Outcome:**` and `**OST file:**` fields in the cycle file.

---

## Workflow 5: Archive a Cycle

Run this workflow when a cycle ends or when the user explicitly closes out a cycle.

### Step 1 — Complete all check-ins

Ensure every KR has a final check-in recorded with the actual end-of-cycle value.
If the user does not have final values, ask for them before proceeding.

### Step 2 — Write the cycle summary

Add a `## Cycle Summary` section at the top of the cycle file (after the
frontmatter, before Objective 1):

```markdown
## Cycle Summary — [CYCLE]

**Final status:** Completed | Completed with exceptions | Abandoned
**Overall assessment:** [2-4 sentences: what was achieved, what fell short, key learnings]

### KR Outcomes
| KR | Baseline | Final | Target | Outcome |
|---|---|---|---|---|
| [id] [name] | [val] | [val] | [val] | Achieved / Missed / Partially Achieved |

### What we learned
- [Key insight from the cycle — about the metrics, the market, or the team's capacity]
- [Repeat as needed]

### What to carry forward
- [Any KRs to continue or strengthen in the next cycle]
- [Any opportunities that proved important and should anchor the next cycle's OSTs]
```

### Step 3 — Update the frontmatter

Change `status: Active` to `status: Completed` in the cycle file frontmatter.

### Step 4 — Update pm-config.md

Clear or update `active_okr_cycle` to reflect that this cycle is closed. If the
next cycle already exists, point to it.

---

## Quality Gate for OKR Cycles

Run every check before finalizing a new cycle. Do not let a cycle go active with
known defects — they compound over time.

### Structural checks

| Check | Rule | Failure signal |
|---|---|---|
| Objective count | At most 3 Objectives per cycle | More than 3 = losing focus |
| KR count | 2-3 KRs per Objective | 1 = not enough accountability; 4+ = too complex |
| Total KR count | At most 9 KRs in a cycle | More than 9 = team cannot hold them all in working memory |
| Objective framing | Each Objective is qualitative and directional | Contains a number, a date, or a deliverable |
| KR framing | Each KR is a measurable outcome, not an output | Mentions shipping, launching, building, or delivering |
| Baseline present | Every KR has a baseline value | No baseline = cannot track progress |
| Target present | Every KR has a specific target value and date | Vague targets like "improve" or "increase" |
| OST connection | Every KR has a connected Desired Outcome | Missing link = no discovery direction |

### Framing checks

**Objectives must be qualitative.** If it contains a number, it belongs in a KR,
not an Objective. Reframe: "Achieve 80% day-7 retention" should be the Objective
"Build a product that keeps new users coming back" with a KR for the retention metric.

**KRs must measure outcomes, not outputs.** Run this test: if the KR can be
achieved without any change in customer behavior, it is an output KR.

- Output KR (reject): "Ship the onboarding redesign by May 1"
- Outcome KR (accept): "Increase the percentage of new users who complete their
  first meaningful action within 7 days from 34% to 55%"

**KRs need a baseline.** "Increase NPS to 50" is unmeasurable if you do not know
that NPS is currently 32. Always establish the baseline before committing to the target.

---

## Anti-Patterns to Call Out Immediately

These patterns undermine OKRs as a direction-setting tool. Call them out explicitly
when you see them — do not soften the feedback.

**Output KRs disguised as outcome KRs**
"Launch X by Y date" is a milestone, not a KR. It is 100% within the team's
control and tells you nothing about whether customers got value. Reframe it: "What
change in customer behavior do we expect after launching X?"

**KRs with no OST connection**
This means the team has a stated goal but no structured way to discover how to
reach it. The OST exists precisely to solve this. Connect the KR before the cycle
starts, or the discovery work will be directionless.

**Objective inflation**
More than 3 Objectives means the team is not making strategic trade-offs — they
are listing everything important. Push back: "If you could only move one of these
this quarter, which would it be? Start there."

**Missing baselines**
"Increase retention" with no current baseline is an unmeasurable aspiration. The
first check-in will expose this. Establishing baselines is not optional — it is
the minimum viable measurement setup.

**Vanity KRs**
KRs that are easy to hit but do not reflect real progress. Signs: the KR was
already mostly achieved at cycle start, the target is below the current trajectory,
or the KR measures activity rather than outcome (e.g., "run 10 user interviews"
is a task, not a KR).

**KRs the team cannot influence**
If the metric is primarily driven by external factors (macroeconomic conditions,
competitor actions), it is a poor KR — the team cannot take directional action on
it. Surface the dependency explicitly.

---

## Bridging OKRs to Discovery

When a KR is at risk or off track, the correct response is not to add more
roadmap items — it is to look at the OST for that KR and ask:

1. Are the right opportunities in the tree? Is there new signal that should update
   the tree?
2. Are experiments running? If not, why? Start one immediately.
3. Are we working the highest-priority branch, or are we spreading effort?

Use this as a handoff prompt when chaining to `ost-workflow`:

> "KR [id] is [at risk / off track]. The connected Desired Outcome is '[statement]'.
> Let's review the OST for this outcome and identify which opportunities should be
> getting attention right now to move the KR before end of cycle."

When the user asks what experiments could move a KR, chain to `experiment-workflow`
with:

> "KR [id] target is [target]. Current is [value]. What experiments could close
> that gap? Let's identify the riskiest assumption about how to move this metric
> and design a test for it."

---

## References

- [Full Playbook — OKR Layer](../../Agentic%20PM%20Playbook.md)
- [OST Workflow](../ost-workflow/SKILL.md)
- [Investment Gate](../investment-gate/SKILL.md)
- [PM Setup](../pm-setup/SKILL.md)
