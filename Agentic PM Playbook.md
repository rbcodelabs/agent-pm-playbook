# Agentic PM Playbook

> An agent-first approach to product management rooted in continuous discovery, empowered teams, and Opportunity Solution Trees.

**Influences:** Marty Cagan (SVPG), Teresa Torres (Continuous Discovery Habits)
**Tooling:** Compass (native discovery + roadmap) · Jira Product Discovery (work) · Linear (personal)
**Last updated:** 2026-06-26
**See also:** [[Agentic PM — Agent Capability Framework]] — what skills agents need to develop to do this work well

---

## 1. North Star Philosophy

### The Problem with "Feature Factory" PM
Most product organizations are order-takers: stakeholders bring features, PMs write specs, engineers build. The output is activity, not outcomes. Marty Cagan's core critique: PMs in this mode are *project managers in disguise*, and the teams they lead are never truly empowered.

**Agent-first PM can recreate this trap** — or break it. The risk is that AI amplifies output (more specs, faster) without improving the quality of the problems being solved. The goal of this playbook is the opposite: use agents to get *closer to the truth*, not farther from it.

### The Foundation: Three Pillars

| Pillar | Source | What it means here |
|---|---|---|
| **Outcomes over output** | Cagan | Every work item traces back to a measurable business/product outcome. If it doesn't, it shouldn't exist. |
| **Continuous discovery** | Torres | Weekly touchpoints with customers. Not quarterly research sprints — a permanent, lightweight habit. |
| **Opportunity Solution Trees** | Torres | A living visual artifact that maps the path from desired outcome → customer opportunities → solutions → experiments. The OST *is* the strategy. |

### What "Agentic" Means Here
Agents do the work that slows PMs down from being PMs:
- Synthesizing interview transcripts into opportunity signals
- Extracting patterns from support tickets, reviews, NPS
- Generating diverse solution options for consideration
- Mapping riskiest assumptions and drafting experiment designs
- Writing first drafts of stakeholder updates

**PMs retain judgment:** What outcome matters most. Which opportunities are real. Which solutions are worth testing. What the data actually means. Agents accelerate the cycle; PMs hold the wheel.

---

## 2. The OST as Operating System

Teresa Torres's Opportunity Solution Tree is not a deliverable — it's a *thinking tool* that stays alive for the duration of a product initiative.

### Structure

```
DESIRED OUTCOME
└── Opportunity A (customer need/pain/desire)
    ├── Sub-opportunity A1
    │   ├── Solution A1a
    │   │   └── Experiment (assumption test)
    │   └── Solution A1b
    │       └── Experiment (assumption test)
    └── Sub-opportunity A2
        └── Solution A2a
└── Opportunity B
    └── ...
```

### The Four Layers

**Layer 1 — Desired Outcome**
A single, specific, measurable product metric the team owns for this cycle. Not a project goal. Not a theme. A metric.
- Good: "Increase 7-day retention for new users from 34% to 45%"
- Bad: "Improve onboarding experience"

One outcome per OST. One active OST per team per cycle. Multiple OSTs can exist; only one should have active discovery work at a time.

**Layer 2 — Opportunities**
Customer needs, pains, or desires that — if addressed — could move the outcome. These come from research, not from product intuition.

Rules:
- Opportunities are expressed in the *customer's voice*, not as solutions
- Good: "I lose track of what I was doing when I come back after a few days"
- Bad: "We need a 'resume where you left off' feature"
- Opportunities are discovered, not invented. They must have evidence.

**Layer 3 — Solutions**
Multiple possible solutions per opportunity. At this stage, breadth matters more than depth.
- Never commit to one solution before exploring at least 3
- Solutions are hypotheses, not decisions
- The OST holds solutions until they've passed assumption testing

**Layer 4 — Experiments**
Each solution has a set of underlying assumptions. Experiments test the *riskiest* assumption first — the one that, if wrong, kills the solution.
- Experiment design: assumption → test → success metric → timeline
- Results flow back up the tree: invalidated assumptions prune solutions; validated ones earn deeper investment

### OST Maintenance Rules
- The OST is a *living document*, updated weekly
- Dead branches (solutions disproved, opportunities invalidated) are archived, not deleted — they're learning
- New customer signals are triaged against the existing tree first: does this strengthen an existing opportunity, add a new one, or contradict our current bets?
- The tree should never go more than 2 weeks without a meaningful update

---

## 3. The Agentic Workflow Layer

### Overview

Each OST layer has a corresponding agent workflow. The pattern is always:
**Agent surfaces options / synthesizes inputs → PM applies judgment → OST gets updated**

---

### 3.1 Outcome Definition

**When:** Start of a product cycle, or when reassessing direction.

**Agent workflow:**
1. Feed in: business strategy doc, current metrics, stakeholder asks, previous cycle retrospective
2. Prompt: *"Synthesize these inputs into 3-5 candidate product outcomes. Each should be specific, measurable, and owned by the product team. Flag any stakeholder asks that are outputs rather than outcomes."*
3. PM selects and refines one outcome. Agents help stress-test: *"What behaviors would change if we hit this outcome? What wouldn't change? Is this a leading or lagging indicator?"*

**Quality gate:** The team can describe the outcome without looking at a doc, and can immediately tell you whether any given work item connects to it.

---

### 3.2 Opportunity Discovery (Continuous)

**When:** Weekly, ongoing.

**Sources to feed agents:**
- Customer interview transcripts (weekly)
- Support ticket themes (weekly pull)
- App store / review site feedback (biweekly)
- NPS/CSAT open text (monthly)
- Sales call notes, CS escalations (ad hoc)

**Agent workflow — interview synthesis:**
1. Paste or upload transcript
2. Prompt: *"Extract every customer need, pain, desire, or friction point from this transcript. For each, note: exact quote, context, intensity (high/med/low), and whether it maps to an existing opportunity in our OST or represents something new."*
3. PM reviews output, maps to OST, adds new branches where warranted

**Agent workflow — bulk signal triage:**
1. Feed batch of support tickets / reviews
2. Prompt: *"Cluster these by underlying customer problem (not feature request). For each cluster, write a one-sentence opportunity statement in the customer's voice. Estimate frequency and intensity. Flag any that contradict our current OST bets."*
3. PM triages: which clusters warrant adding to the OST?

**Quality gate:** Every opportunity node in the OST has at least 2 independent evidence sources. Single-source opportunities are marked `[weak evidence]` and prioritized for validation.

---

### 3.3 Opportunity Sizing & Prioritization

**When:** Before choosing which opportunity to pursue solutions for.

**Agent workflow:**
1. For each candidate opportunity, prompt: *"Based on what we know, help me estimate: How many users experience this? How often? How much does it matter to them (vs. other problems)? What's the risk that addressing it won't move our outcome?"*
2. Agent helps build a simple opportunity scorecard (Reach × Frequency × Importance vs. Risk)
3. Agents can also play devil's advocate: *"Make the strongest case that Opportunity B matters more than Opportunity A, based only on the evidence we have."*

**PM judgment required:** The scorecard is an input, not a decision. PMs must ask: "What would I need to believe for this to be our top opportunity? Do I believe that?"

---

### 3.4 Solution Ideation

**When:** After selecting an opportunity to focus on.

**Agent workflow:**
1. Describe the opportunity clearly (customer voice, evidence, outcome context)
2. Prompt: *"Generate 8-10 possible solutions for this opportunity. Include: obvious solutions, analogies from adjacent industries, minimum viable approaches, technology-first ideas, and at least 2 that challenge our assumptions about how the product should work."*
3. PM + team reviews options, eliminates clear non-starters, selects 3-5 to map assumptions for
4. Second prompt: *"For each of these solutions, what are the 3 riskiest assumptions that must be true for it to work? Which assumption is most likely to be wrong?"*

**Quality gate:** Before moving forward with any solution, the team has explicitly named and ranked its top 3 assumptions.

---

### 3.5 Assumption Mapping & Experiment Design

**When:** Before committing build resources to a solution.

**Agent workflow:**
1. List assumptions from 3.4
2. Prompt: *"For the riskiest assumption, design the cheapest experiment that would give us meaningful signal within [1-2 weeks]. Include: what we're testing, how we'll test it, what success looks like, what failure looks like, and what we'll do in each case."*
3. Agent drafts the experiment brief; PM pressure-tests the success metrics
4. Experiments are logged in the OST as children of their solution node

**Types of experiments (smallest to largest):**
- Fake door / smoke test (demand validation)
- Concierge (manual version of the solution)
- Prototype test (wizard of oz or lo-fi)
- A/B test (live with small % of users)
- Staged rollout

**Quality gate:** Every experiment has a pre-defined "kill" condition — what result would cause us to abandon this solution branch?

---

### 3.6 Stakeholder Communication

**When:** Weekly syncs, roadmap reviews, exec updates.

**Agent workflow:**
- Weekly status: *"Given these OST updates this week [paste summary], draft a 5-sentence PM update that connects our discovery work to our outcome. Highlight: what we learned, what changed on the OST, what we're testing next, and any decisions needed from stakeholders."*
- Roadmap narrative: *"Turn this OST [paste] into a roadmap narrative for a non-technical executive audience. Focus on: the outcome we're chasing, the biggest opportunity we've validated, the solution bets we're testing, and our confidence level."*

---

## 4. Tooling Playbook

### Jira Product Discovery (Work)

| OST Layer | JPD Construct | Notes |
|---|---|---|
| Desired Outcome | **Objective** (JPD Goals) | One active objective per team per cycle. Linked to Jira metrics dashboard if possible. |
| Opportunities | **Insights** | Tag with `opportunity` and OST depth (e.g., `L2-opportunity`, `L3-sub-opportunity`). Link evidence (interview notes, tickets) as attachments or linked issues. |
| Solutions | **Ideas** | JPD Ideas are built for this. Link each Idea to its parent Insight. Maintain `[exploring]`, `[testing]`, `[validated]`, `[killed]` status. |
| Experiments | **Jira Issues** (Discovery epic) | Use an experiment template: Assumption · Test Design · Success Metric · Result. Link to parent Idea. |
| OST Map | **JPD Board / Roadmap View** | Use JPD's hierarchy view to visualize Objective → Insight → Idea. Screenshot weekly for async sharing. |

**Useful JPD automations:**
- Auto-tag new Insights from Slack/email integrations (Atlassian Intelligence)
- Flag Ideas with no linked Insights (orphaned solutions — a process smell)
- Weekly digest: "Insights with no linked Ideas after 2 weeks" (stale opportunities)

---

### Linear (Personal Projects)

Linear doesn't have a native JPD-style hierarchy, so OSTs are managed with a combination of Linear + Obsidian.

**Structure:**

```
Linear Project = Product Initiative (maps to one OST)
  Labels: opportunity · solution · experiment · archived
  Statuses: Exploring · Testing · Validated · Killed · Backlog

Issues:
  [opportunity] User loses context after multi-day gap
  [solution] Resume prompt on login (linked to above)
  [experiment] Fake door: "Pick up where you left off" CTA → waitlist (linked to solution)
```

**OST document lives in Obsidian** at `Personal & Career/Career/OSTs/[project-name].md` and is the source of truth for the tree structure. Linear tracks the work; Obsidian holds the narrative.

**Weekly habit:** 
- Update Linear statuses
- Re-render the OST in Obsidian
- Add new opportunities as issues before you add solutions

---

## 5. Cadences

### Weekly (30-45 min total)

| Activity | Time | Agent assist? |
|---|---|---|
| Customer interview or async research review | 30 min | Transcript synthesis |
| Triage new signals against OST | 10 min | Bulk clustering prompt |
| Update OST (Obsidian + tool) | 10 min | Draft updated OST narrative |
| Check active experiments — any results? | 5 min | — |
| Review roadmap capacity | 5 min | Keep validation in Later; propose ranked Next changes with displacement |

### Bi-Weekly (60 min)

- OST pruning: retire stale/invalidated branches
- Solution review: are the right assumptions being tested?
- Opportunity re-ranking: has the evidence shifted priorities?
- Agent: *"Given these OST changes over the last 2 weeks, what patterns are emerging? What should we be more or less confident about?"*

### Monthly (90 min)

- Outcome check: are we moving the metric?
- Roadmap alignment: does the delivery roadmap still trace to OST opportunities?
- Confidence calibration: what were we wrong about? What surprised us?
- Agent: *"Summarize what we've learned this month. What opportunities have we validated? What solutions have we killed? What's our biggest open uncertainty?"*

### Quarterly

- Outcome reset or reconfirmation
- Full OST retrospective: what would we prune if starting fresh?
- New OST kickoff for next cycle

For the end-to-end automation design—including asynchronous human review, early-idea
prototype packets, decision routing, and the boundary between roadmap recommendation and
autonomous delivery—see [[Scheduled Product Operating System]].

---

## 6. Agent Prompt Library

A working library of reusable prompts for the most common PM agent tasks.

### Interview Synthesis
```
You are a product discovery assistant. I'm going to paste a customer interview transcript.

Extract all customer needs, pains, desires, and friction points. For each:
- Direct quote (verbatim)
- Your interpretation (the underlying need, not just the surface complaint)
- Intensity: High / Medium / Low
- Category: [existing opportunity name] OR "potential new opportunity"

Format as a table. Flag anything that contradicts our current assumptions.

Current OST opportunities: [paste opportunity list]

Transcript: [paste]
```

### Bulk Signal Triage
```
I'm going to paste [N] support tickets / reviews / NPS comments.

Cluster them by underlying customer problem. For each cluster:
1. A one-sentence opportunity statement in the customer's voice
2. Estimated frequency (how many items reflect this?)
3. Intensity: High / Medium / Low
4. Does this reinforce, contradict, or add to our existing OST? [paste OST]

Don't suggest solutions. Focus only on articulating the problems.
```

### Solution Brainstorm
```
I'm a product manager working on the following opportunity:

Opportunity: [paste opportunity statement]
Outcome we're chasing: [paste outcome]
What we know about the customer: [paste context]

Generate 8 possible solutions. Include variety:
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
Opportunity it addresses: [paste]
Outcome we're targeting: [paste]

For each assumption:
- State the assumption clearly
- Rate the risk: How likely is it to be wrong? (High / Medium / Low)
- Rate the impact: If it's wrong, does it kill the solution? (Fatal / Significant / Minor)
- Suggest the cheapest way to test it in under 2 weeks

Rank by (risk × impact). The top assumption is what we test first.
```

### Experiment Design
```
I want to test the following assumption before building:

Assumption: [paste]
Solution context: [paste]
Outcome: [paste]

Design the cheapest experiment that gives meaningful signal in 1-2 weeks.

Include:
- Experiment type (fake door, concierge, prototype, etc.)
- What exactly we'll do
- Who we're testing with
- What "success" looks like (specific and measurable)
- What "failure" looks like
- What we'll do next in each case (build / kill / iterate)
```

### Weekly PM Update
```
Draft a weekly PM update for async stakeholder communication.

This week's OST changes: [paste]
Active experiments: [paste status]
New insights from customers: [paste]
Outcome metric status: [paste]

Format:
- 1 sentence: where we are vs. the outcome
- 2-3 bullets: what we learned this week
- 1-2 bullets: what we're testing next
- 1 bullet: any decisions or unblocks needed

Keep it under 150 words. Plain language, no jargon.
```

---

## 7. Quality Gates & Anti-Patterns

### The Five Questions (ask before any build)
1. What outcome does this serve?
2. What customer opportunity does this address — and what's the evidence?
3. Have we explored at least 3 solutions to this opportunity?
4. What's the riskiest assumption, and have we tested it?
5. What's our kill condition — what result would make us stop?

If you can't answer all five, you're not ready to build.

### Anti-Patterns to Watch
| Anti-pattern | What it looks like | Fix |
|---|---|---|
| **Stakeholder OST** | Opportunities written as disguised feature requests | Rewrite every opportunity in the customer's voice, trace to a quote |
| **Solution-first discovery** | Running interviews to validate a pre-decided solution | Start interviews with "tell me about your experience with X" — no leading |
| **Single-source opportunities** | One interview = new OST branch | Require 2+ independent evidence sources before acting |
| **Orphaned solutions** | Solutions with no parent opportunity | Delete or find the opportunity. If you can't, it's a feature request. |
| **Zombie experiments** | Tests running with no clear success metric | Every experiment needs a written kill/proceed condition before it starts |
| **Agent hallucination acceptance** | Taking agent synthesis at face value | Always trace agent-identified opportunities back to actual quotes |

---

## 8. Getting Started Checklist

- [ ] Define the current desired outcome (one metric, this cycle)
- [ ] Book a recurring 30-min weekly research slot
- [ ] Set up OST document in Obsidian (or JPD / Linear per tool playbook)
- [ ] Identify your 3 best existing customer insights — map them to the OST
- [ ] Pick the top opportunity and run the solution brainstorm prompt
- [ ] Map assumptions on the top 2 solutions
- [ ] Design your first experiment

The OST won't be "right" at first. That's fine. The discipline is updating it weekly based on what you're learning. After 4-6 weeks of continuous discovery, it starts to tell you things you didn't know you knew.

---

*"The goal of product discovery is to quickly separate the good ideas from the bad ideas."* — Marty Cagan

*"When we frame our work as outputs, we close ourselves off to better solutions."* — Teresa Torres
