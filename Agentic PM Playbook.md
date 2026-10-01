# Agentic PM Playbook

> An agent-first approach to product management rooted in continuous discovery, empowered teams, and one integrated goal-to-learning tree: Opportunity → Outcome → Key Result → Solution → Test (Loop).

**Influences:** Marty Cagan (SVPG), Teresa Torres (Continuous Discovery Habits)
**Tooling:** Provider-neutral. Adapters exist for Compass (native discovery + roadmap), Jira Product Discovery, Linear, and Markdown/Obsidian.
**Last updated:** 2026-10-01
**See also:** [[Agentic PM — Agent Capability Framework]] — what skills agents need to develop to do this work well. [The Loop](guides/the-loop.md) — the source of truth for levels, rules, and ID formats.

---

## 1. North Star Philosophy

### The Problem with "Feature Factory" PM
Most product organizations are order-takers: stakeholders bring features, PMs write specs, engineers build. The output is activity, not outcomes. Marty Cagan's core critique: PMs in this mode are *project managers in disguise*, and the teams they lead are never truly empowered.

**Agent-first PM can recreate this trap** — or break it. The risk is that AI amplifies output (more specs, faster) without improving the quality of the problems being solved. The goal of this playbook is the opposite: use agents to get *closer to the truth*, not farther from it.

### The Foundation: Three Pillars

| Pillar | Source | What it means here |
|---|---|---|
| **Outcomes over output** | Cagan | Every work item traces back to a measurable customer-behavior outcome. If it doesn't, it shouldn't exist. |
| **Continuous discovery** | Torres | Weekly touchpoints with customers. Not quarterly research sprints — a permanent, lightweight habit. |
| **One integrated tree** | Torres, extended | A living artifact that maps the path from evidence-backed opportunity → committed outcome → measurable key results → candidate solutions → tests. The Loop tree *is* the strategy. |

### What "Agentic" Means Here
Agents do the work that slows PMs down from being PMs:
- Synthesizing interview transcripts into opportunity signals
- Extracting patterns from support tickets, reviews, NPS
- Generating diverse solution options for consideration
- Mapping riskiest assumptions and drafting test designs
- Writing first drafts of stakeholder updates

**PMs retain judgment:** Which opportunities are real. What outcome matters most. Which solutions are worth testing. What the data actually means. Agents accelerate the cycle; PMs hold the wheel.

---

## 2. The Loop as the Operating System

The playbook used to run two separate artifacts: an OKR cycle for goals and an Opportunity Solution Tree for discovery, joined by a link between a Key Result and a Desired Outcome. That seam is gone. The Loop is **one tree** in which every record has exactly one parent, and every piece of work traces to the opportunity that justified it and to the test that will tell us whether it worked. It is a *thinking tool* that stays alive for the duration of a product initiative.

The full definition (levels, quality gates, structural rules, ID formats) lives in the [Loop guide](guides/the-loop.md). This section summarizes how the playbook uses it.

### Structure

```
OPPORTUNITY  OPP-1  (customer need/pain/desire, with evidence)
└── OUTCOME  OUT-1  (the customer-behavior change we commit to producing)
    ├── KEY RESULT  OUT-1-KR-1  (measurable signal: baseline, target, date)
    │   ├── SOLUTION  SOL-1  (candidate way to move the KR)
    │   │   ├── TEST  TST-1  (cheapest test of the riskiest assumption)
    │   │   └── ROADMAP ITEM  (delivery, only after the investment gate clears)
    │   └── SOLUTION  SOL-2
    │       └── TEST  TST-2
    └── KEY RESULT  OUT-1-KR-2
        └── ...
```

Roadmap Item is not a sixth level: it hangs off a Solution once that Solution has cleared its investment gate (see [Progressive Investment Framework](Progressive%20Investment%20Framework.md)).

### The Five Levels

**Level 1 — Opportunity (the root)**
A bounded, evidence-backed customer need, pain, or desire (or market opening) worth pursuing. Opportunities come from research, not product intuition, and persist across cycles.

Rules:
- Written as a need in the *customer's voice*, never as a feature
- Good: "I lose track of what I was doing when I come back after a few days"
- Bad: "We need a 'resume where you left off' feature"
- Cites evidence (or is tagged `weak`) and names a segment
- An Opportunity may have several Outcomes (different segments or time horizons)

**Level 2 — Outcome**
The qualitative customer-behavior change that capturing the Opportunity requires. One sentence, no numbers, no output ("launch X"). This one object replaces what the legacy model split into an OKR Objective and an OST Desired Outcome.
- Good: "New users come back and finish what they started in their first week"
- Bad: "Ship the onboarding revamp" (output) or "Improve onboarding" (no behavior change)

Each Outcome traces to exactly one Opportunity and has 2–3 Key Results. An Outcome belongs to a cycle.

**Level 3 — Key Result (KR)**
The measurable signal that the Outcome is happening, with baseline, target, and date.
- Good: "Increase 7-day return rate for new users from 34% to 45% by end of cycle"
- Bad: "Launch the resume prompt" (output)

KRs measure outcomes, not outputs; the baseline is recorded (or `TBD` with a task); at most 3 per Outcome. A KR at risk means work the Solutions and Tests harder — it does not mean adding roadmap items.

**Level 4 — Solution**
A candidate way to move a KR, and a hypothesis, not a decision. At this stage breadth matters more than depth.
- Never commit to one Solution before exploring at least 3 for the KR
- Each Solution has exactly one parent KR and states how it addresses the Opportunity
- Assumptions are listed and the riskiest is named
- A Solution with no Test and no cleared investment gate cannot reach the roadmap

**Level 5 — Test**
Each Solution rests on assumptions. A Test is the cheapest experiment on the *riskiest* assumption — the one that, if wrong, kills the Solution.
- Test design: assumption → method → success and failure criteria written *before* running → timeline
- Results flow back up the tree: invalidated assumptions prune Solutions; validated ones earn deeper investment
- A Test is falsifiable, scoped to one assumption, and its result is logged against the KR it informs

### Closing the Loop

A Test is not the end of the chain; its result feeds back into the tree, which is why this is a loop. The full rules are in [Closing the loop](guides/the-loop.md#closing-the-loop):

- **Test fails or is inconclusive:** reopen or re-score its Opportunity, or spawn new Opportunities the result exposed.
- **Test passes:** promote the Solution and update the parent KR.
- **KR stalls or is missed:** re-examine the Outcome (and its Opportunity) before piling on more Solutions.
- **New signal at any step:** it enters as an Opportunity, never as a KR attachment.

### Tree Maintenance Rules
- The tree is a *living document*, updated weekly
- Dead branches (Solutions disproved, Opportunities invalidated) are archived with a reason, not deleted — they're learning
- **One parent each.** A Solution that serves two KRs is split, or the second KR is recorded as a secondary link — never a second parent
- **No orphans.** A KR with no Solution is a coverage gap; a Test not tied to a Solution assumption is not a Test
- **Check-ins move up the tree.** A Test result updates its Solution's confidence; Solution progress and metric readings update the KR; KR movement updates Outcome health; Outcome health updates the Opportunity's status (pursuing / sustained / retired)
- **Evidence flows up, not down.** Attach signals to Opportunities (and to the specific Solution or Test they bear on) — never raw signals to KRs
- **Cycle scope.** A cycle scopes which Outcomes and KRs are active; Opportunities persist; Solutions and Tests carry over until resolved
- New customer signals are triaged against the existing tree first: does this strengthen an existing Opportunity, add a new one, or contradict our current bets?
- The tree should never go more than 2 weeks without a meaningful update

### Skills that cover the tree

Skill ids predate Loop and are unchanged; each now covers Loop levels:

| Skill id | Covers |
|---|---|
| `okr-workflow` | Outcome and Key Result levels, plus cycle scoping and check-ins |
| `ost-workflow` | Tree-wide Loop structure: Opportunity, Solution, Test, and the tree health check |
| `experiment-workflow` | Test design, execution, and result recording |
| `pm-signal-synthesis` | Signals → Opportunities |
| `investment-gate` | Whether a Solution may advance (and reach the roadmap) |
| `roadmap-workflow` | Roadmap Items hanging off cleared Solutions |

---

## 3. The Agentic Workflow Layer

### Overview

Each Loop level has a corresponding agent workflow. The pattern is always:
**Agent synthesizes inputs and updates the tree → reports what changed → PM corrects where judgment differs**

Agents ask first only before irreversible actions ([[Autonomy Policy]]).

---

### 3.1 Opportunity Discovery (Continuous)

**When:** Weekly, ongoing. Opportunity is the root of the tree, so this workflow comes first.

**Sources to feed agents:**
- Customer interview transcripts (weekly)
- Support ticket themes (weekly pull)
- App store / review site feedback (biweekly)
- NPS/CSAT open text (monthly)
- Sales call notes, CS escalations (ad hoc)

**Agent workflow — interview synthesis:**
1. Paste or upload transcript
2. Prompt: *"Extract every customer need, pain, desire, or friction point from this transcript. For each, note: exact quote, context, intensity (high/med/low), and whether it maps to an existing Opportunity in our tree or represents something new."*
3. Agent maps the output to the tree, adds new Opportunity records tagged by confidence, and reports the changes

**Agent workflow — bulk signal triage:**
1. Feed batch of support tickets / reviews
2. Prompt: *"Cluster these by underlying customer problem (not feature request). For each cluster, write a one-sentence opportunity statement in the customer's voice. Estimate frequency and intensity. Flag any that contradict our current Outcomes or Solutions."*
3. Agent adds the clusters as Opportunities (weak ones tagged weak) and reports what changed

**Quality gate:** An Opportunity has cited evidence (or is tagged `weak`), names a segment, and is not a solution in disguise. Aim for 2+ independent evidence sources. Single-source Opportunities are still added, marked `[weak evidence]`, and prioritized for validation.

---

### 3.2 Opportunity Sizing & Prioritization

**When:** Before committing to an Outcome for an Opportunity.

**Agent workflow:**
1. For each candidate Opportunity, prompt: *"Based on what we know, help me estimate: How many users experience this? How often? How much does it matter to them (vs. other problems)? What's the risk that addressing it won't move anything we can measure?"*
2. Agent helps build a simple scorecard (Reach × Frequency × Importance vs. Risk)
3. Agents can also play devil's advocate: *"Make the strongest case that Opportunity B matters more than Opportunity A, based only on the evidence we have."*

**Judgment check:** The scorecard informs the call; it doesn't make it. The agent sets the focus Opportunity and states what it would need to believe for that to be right. The PM challenges that belief if it's wrong.

---

### 3.3 Outcome and Key Result Definition

**When:** Start of a product cycle, when a focus Opportunity is chosen, or when reassessing direction.

**Agent workflow:**
1. Feed in: the focus Opportunity and its evidence, business strategy doc, current metrics, stakeholder asks, previous cycle retrospective
2. Prompt: *"For this Opportunity, draft 1-3 candidate Outcomes: one sentence each, customer-behavior framed, no numbers, no output. For the best one, propose 2-3 Key Results with baseline, target, and date. Flag any stakeholder asks that are outputs rather than outcomes."*
3. Agent recommends one Outcome with its KRs and reasoning; PM refines. Agents stress-test: *"What behaviors would change if we hit these KRs? What wouldn't change? Is each KR a leading or lagging indicator?"*

**Quality gate:** The Outcome is behavior-framed and traces to exactly one Opportunity; it has 2-3 KRs, each outcome-measuring with a baseline (or `TBD` with a task). The team can describe the Outcome without looking at a doc, and can immediately tell you whether any given work item connects to it.

---

### 3.4 Solution Ideation

**When:** After an Outcome's KRs are set, for each KR that needs coverage.

**Agent workflow:**
1. Describe the KR clearly (the signal, baseline, target) along with the Opportunity it serves (customer voice, evidence)
2. Prompt: *"Generate 8-10 possible solutions that could move this KR and address this Opportunity. Include: obvious solutions, analogies from adjacent industries, minimum viable approaches, technology-first ideas, and at least 2 that challenge our assumptions about how the product should work."*
3. Agent eliminates clear non-starters and selects 3-5 to map assumptions for; the team adjusts the selection if needed. Each kept Solution is recorded with exactly one parent KR.
4. Second prompt: *"For each of these solutions, what are the 3 riskiest assumptions that must be true for it to work? Which assumption is most likely to be wrong?"*

**Quality gate:** Each KR has at least 3 meaningfully different candidate Solutions before any is selected. Before moving forward with any Solution, the team has explicitly named and ranked its top 3 assumptions.

---

### 3.5 Assumption Mapping & Test Design

**When:** Before committing build resources to a Solution.

**Agent workflow:**
1. List assumptions from 3.4
2. Prompt: *"For the riskiest assumption, design the cheapest test that would give us meaningful signal within [1-2 weeks]. Include: what we're testing, how we'll test it, what success looks like, what failure looks like, and what we'll do in each case."*
3. Agent designs the Test; PM pressure-tests the success metrics
4. Tests are logged in the tree as children of their Solution, with results recorded against the KR they inform

**Types of tests (smallest to largest):**
- Fake door / smoke test (demand validation)
- Concierge (manual version of the solution)
- Prototype test (wizard of oz or lo-fi)
- A/B test (live with small % of users)
- Staged rollout

**Quality gate:** Every Test is falsifiable, scoped to one assumption, and has success and failure criteria (including a "kill" condition) written before it runs. The kill condition is the result that would cause us to abandon this Solution branch.

---

### 3.6 Check-ins and Stakeholder Communication

**When:** Weekly syncs, roadmap reviews, exec updates.

**Agent workflow:**
- Check-ins run up the tree: Test results update the Solution, Solution progress and metric readings update the KR, KR movement updates Outcome health, and Outcome health updates the Opportunity's status.
- Weekly status: *"Given these tree updates this week [paste summary], draft a 5-sentence PM update that connects our discovery work to our Outcome and KRs. Highlight: what we learned, what changed in the tree, what we're testing next, and any decisions needed from stakeholders."*
- Roadmap narrative: *"Turn this tree [paste] into a roadmap narrative for a non-technical executive audience. Focus on: the Opportunity and Outcome we're chasing, KR movement, the Solution bets we're testing, which Solutions have cleared the investment gate, and our confidence level."*

---

## 4. Tooling Playbook

The shared framework is provider-neutral. Each adapter maps the five levels to whatever native objects exist and must preserve the parent chain and the stable IDs (`OPP-n`, `OUT-n`, `OUT-n-KR-n`, `SOL-n`, `TST-n`). Where a provider cannot represent a level natively, the mapping below is an interim one (a label or custom field), and it does not flatten the hierarchy. See [PM Tool Integration Guide](PM%20Tool%20Integration%20Guide.md) for profiles.

### Jira Product Discovery (Work)

| Loop level | JPD construct | Notes |
|---|---|---|
| Opportunity | **Insights** | The root. Tag `opportunity`. Link evidence (interview notes, tickets) as attachments or linked issues. |
| Outcome | **Goal** (JPD Goals) | One per Opportunity-and-cycle. Written as behavior change; no numbers in the title. |
| Key Result | Goal **target / metric** field (interim) | If the target is not a native object, record each KR (`OUT-n-KR-n`) with baseline, target, and date in a custom field or linked issue. |
| Solution | **Ideas** | JPD Ideas are built for this. Link each Idea to its parent KR (and its Opportunity Insight). Maintain `[exploring]`, `[testing]`, `[validated]`, `[killed]` status. |
| Test | **Jira Issues** (Discovery epic) | Use a test template: Assumption · Test Design · Success and Failure Criteria · Result. Link to parent Idea. |
| Tree map | **JPD Board / Roadmap View** | Use JPD's hierarchy view to visualize Opportunity → Outcome → KR → Idea. Screenshot weekly for async sharing. |

**Useful JPD automations:**
- Auto-tag new Insights from Slack/email integrations (Atlassian Intelligence)
- Flag Ideas with no parent KR (orphaned Solutions — a process smell)
- Flag KRs with fewer than 3 candidate Ideas (coverage gap)
- Weekly digest: "Insights with no linked Outcome after 2 weeks" (stale Opportunities)

---

### Linear (Personal Projects)

Linear doesn't have a native hierarchy for all five levels, so the tree is managed with a combination of Linear + a Markdown tree document.

**Structure:**

```
Linear Project = Product Initiative (maps to one tree)
  Labels: opportunity · outcome · key-result · solution · test · archived
  Statuses: Exploring · Testing · Validated · Killed · Backlog

Issues:
  [opportunity] OPP-1 User loses context after multi-day gap
  [outcome]     OUT-1 New users come back and finish what they started (parent: OPP-1)
  [key-result]  OUT-1-KR-1 7-day return rate 34% -> 45% (parent: OUT-1)
  [solution]    SOL-1 Resume prompt on login (parent: OUT-1-KR-1)
  [test]        TST-1 Fake door: "Pick up where you left off" CTA -> waitlist (parent: SOL-1)
```

**The tree document lives in your vault** at a path set in `pm-config.md` (for example `Product/Trees/[project-name].md`) and is the source of truth for the tree structure. Linear tracks the work; the Markdown document holds the narrative.

**Weekly habit:**
- Update Linear statuses
- Re-render the tree in your vault
- Add new Opportunities as issues before you add Outcomes or Solutions

---

## 5. Cadences

### Weekly (30-45 min total)

| Activity | Time | Agent assist? |
|---|---|---|
| Customer interview or async research review | 30 min | Transcript synthesis |
| Triage new signals against the tree | 10 min | Bulk clustering prompt |
| Update the tree (vault + tool) | 10 min | Draft updated tree narrative |
| Check active Tests — any results? Log them up the tree | 5 min | — |
| Review roadmap capacity | 5 min | Keep validation in Later; propose ranked Next changes with displacement |

### Bi-Weekly (60 min)

- Tree pruning: retire stale/invalidated branches (archive with a reason)
- Solution review: does each KR have 3+ candidates, and are the right assumptions being tested?
- Opportunity re-ranking: has the evidence shifted priorities?
- Agent: *"Given these tree changes over the last 2 weeks, what patterns are emerging? What should we be more or less confident about?"*

### Monthly (90 min)

- KR and Outcome check: are the KRs moving? Is the Outcome actually happening?
- Roadmap alignment: does every Roadmap Item trace through a cleared Solution, its KR, and Outcome to an Opportunity?
- Confidence calibration: what were we wrong about? What surprised us?
- Agent: *"Summarize what we've learned this month. Which Opportunities have we validated? Which Solutions have we killed? Which KRs moved? What's our biggest open uncertainty?"*

### Quarterly

- Outcome and KR reset or reconfirmation (new cycle scoping)
- Full tree retrospective: what would we prune if starting fresh?
- Re-rank Opportunities and kick off Outcomes for the next cycle

For the end-to-end automation design—including asynchronous human review, early-idea
prototype packets, decision routing, and the boundary between roadmap recommendation and
autonomous delivery—see [[Scheduled Product Operating System]].

---

## 6. Agent Prompt Library

A working library of reusable prompts for the most common PM agent tasks, in tree order.

### Interview Synthesis
```
You are a product discovery assistant. I'm going to paste a customer interview transcript.

Extract all customer needs, pains, desires, and friction points. For each:
- Direct quote (verbatim)
- Your interpretation (the underlying need, not just the surface complaint)
- Intensity: High / Medium / Low
- Category: [existing Opportunity ID and name] OR "potential new Opportunity"

Format as a table. Flag anything that contradicts our current assumptions.

Current Opportunities: [paste opportunity list]

Transcript: [paste]
```

### Bulk Signal Triage
```
I'm going to paste [N] support tickets / reviews / NPS comments.

Cluster them by underlying customer problem. For each cluster:
1. A one-sentence opportunity statement in the customer's voice
2. Estimated frequency (how many items reflect this?)
3. Intensity: High / Medium / Low
4. Does this reinforce, contradict, or add to our existing tree? [paste tree]

Don't suggest solutions. Focus only on articulating the problems.
```

### Outcome and KR Drafting
```
I'm a product manager working on the following Opportunity:

Opportunity: [paste opportunity statement and evidence]
Segment: [paste]
Current metrics: [paste]

Draft 1-3 candidate Outcomes. Each is one sentence, framed as a change in customer
behavior, with no numbers and no outputs ("launch X").

For the strongest Outcome, propose 2-3 Key Results. For each KR give: the measurable
signal, baseline (or TBD plus how to get it), target, and date. Flag any KR that is
really an output.
```

### Solution Brainstorm
```
I'm a product manager working on the following:

Opportunity: [paste opportunity statement]
Outcome: [paste outcome]
Key Result to move: [paste KR with baseline, target, date]
What we know about the customer: [paste context]

Generate 8 possible solutions that could move this KR. Include variety:
- The obvious solution
- The "10x better" version
- An analogy from a different industry
- A minimum viable (tiny) version
- A technology-forward version
- At least 2 that challenge how we currently think the product should work

For each solution, write: solution name · one-sentence description · the core bet it makes.
```

### Assumption Mapping
```
For the following solution, identify the 3 riskiest assumptions that must be true for it to succeed.

Solution: [paste]
Parent Key Result: [paste]
Opportunity it addresses: [paste]

For each assumption:
- State the assumption clearly
- Rate the risk: How likely is it to be wrong? (High / Medium / Low)
- Rate the impact: If it's wrong, does it kill the solution? (Fatal / Significant / Minor)
- Suggest the cheapest way to test it in under 2 weeks

Rank by (risk × impact). The top assumption is what we test first.
```

### Test Design
```
I want to test the following assumption before building:

Assumption: [paste]
Solution context: [paste]
Key Result it informs: [paste]

Design the cheapest test that gives meaningful signal in 1-2 weeks.

Include:
- Test type (fake door, concierge, prototype, etc.)
- What exactly we'll do
- Who we're testing with
- What "success" looks like (specific and measurable)
- What "failure" looks like
- What we'll do next in each case (build / kill / iterate)
```

### Weekly PM Update
```
Draft a weekly PM update for async stakeholder communication.

This week's tree changes: [paste]
Active Tests: [paste status]
New insights from customers: [paste]
Key Result status: [paste]

Format:
- 1 sentence: where we are vs. the Outcome and its KRs
- 2-3 bullets: what we learned this week
- 1-2 bullets: what we're testing next
- 1 bullet: any decisions or unblocks needed

Keep it under 150 words. Plain language, no jargon.
```

---

## 7. Quality Gates & Anti-Patterns

### The Five Questions (answer before any build)
1. What Opportunity does this address — and what's the evidence?
2. What Outcome and Key Result does this Solution serve?
3. Have we explored at least 3 Solutions for that KR?
4. What's the riskiest assumption, and have we run a Test on it?
5. What's our kill condition — what result would make us stop?

Agents answer these themselves and show the answers. Where one has no good answer, write the best guess, mark it as the riskiest assumption, and make testing it the next step.

### Anti-Patterns to Watch
| Anti-pattern | What it looks like | Fix |
|---|---|---|
| **Stakeholder tree** | Opportunities written as disguised feature requests | Rewrite every Opportunity in the customer's voice, trace to a quote |
| **Output Outcome** | An Outcome or KR that reads "launch X" | Rewrite as a customer-behavior change and a measurable signal |
| **Solution-first discovery** | Running interviews to validate a pre-decided solution | Start interviews with "tell me about your experience with X" — no leading |
| **Single-source certainty** | One interview treated as a validated branch | Add it, tag it weak, and prioritize finding a second independent source |
| **Orphaned solutions** | Solutions with no parent KR | Find the KR it moves. If you can't, it's a feature request. |
| **Uncovered KR** | A KR with no Solution, or only one favored Solution | Generate at least 3 candidates before selecting any |
| **Roadmap-first at-risk KR** | Adding roadmap items when a KR is at risk | Work the Solutions and Tests harder instead |
| **Zombie tests** | Tests running with no clear success metric | Every Test needs written success, failure, and kill criteria before it starts |
| **Signals on KRs** | Raw customer signals attached to a KR | Attach evidence to the Opportunity (or the Solution/Test it bears on) |
| **Agent hallucination acceptance** | Taking agent synthesis at face value | Always trace agent-identified Opportunities back to actual quotes |

---

## 8. Getting Started Checklist

- [ ] Identify your 3 best existing customer insights — record them as Opportunities (`OPP-n`) with evidence
- [ ] Book a recurring 30-min weekly research slot
- [ ] Pick the top Opportunity and define its Outcome (`OUT-n`) with 2-3 Key Results (`OUT-n-KR-n`) for this cycle
- [ ] Set up the tree document in your vault (or JPD / Linear per tool playbook)
- [ ] For the most important KR, run the solution brainstorm prompt and attach 3+ Solutions (`SOL-n`)
- [ ] Map assumptions on the top 2 Solutions
- [ ] Design your first Test (`TST-n`)

The tree won't be "right" at first. That's fine. The discipline is updating it weekly based on what you're learning. After 4-6 weeks of continuous discovery, it starts to tell you things you didn't know you knew.

---

## Legacy terminology

Earlier versions of this playbook used a separate OKR cycle and Opportunity Solution Tree (OST) joined at a Key Result. Those terms are retired as levels: OKR Objective and OST Desired Outcome are now one Outcome; the OST Opportunity is now the root Opportunity; the OST Experiment is now a Test; Solutions are parented by a KR. Skill ids (`ost-workflow`, `okr-workflow`) keep their old names. See the mapping table and conversion steps in the [Loop guide](guides/the-loop.md#mapping-from-the-legacy-okr--ost-model).

---

*"The goal of product discovery is to quickly separate the good ideas from the bad ideas."* — Marty Cagan

*"When we frame our work as outputs, we close ourselves off to better solutions."* — Teresa Torres
