# Agentic PM — Agent Capability Framework

> What skills agents need to develop to work nearly autonomously or provide genuinely high-quality support to human PMs.

**Companion to:** [[Agentic PM Playbook]] · [The Loop](guides/the-loop.md)
**Last updated:** 2026-05-08

---

## Overview

The [[Agentic PM Playbook]] defines *how to run* an agent-assisted PM system. This document asks a different question: **what does an agent actually need to be good at for that system to work?**

Most agent failures in PM contexts aren't model failures — they're capability gaps. The agent synthesizes without checking evidence quality. It generates Solutions when it should be mapping assumptions. It's confident when it should flag uncertainty. This framework names the skills that separate a useful PM agent from a fast-sounding one.

Skills are organized into four layers, roughly in order of difficulty to develop:

| Layer | Name | What it covers |
|---|---|---|
| 1 | Synthesis & Signal Processing | Extracting and organizing customer signals |
| 2 | Tree Integrity & Maintenance | Keeping the Loop tree (Opportunity → Outcome → KR → Solution → Test) honest |
| 3 | Test & Assumption Reasoning | Designing and interpreting lean Tests on Solutions |
| 4 | Judgment, Escalation & Metacognition | Knowing what to do without being told |

---

## Layer 1 — Synthesis & Signal Processing

*The foundation. Most agents can do parts of this already — the gaps are in quality and persistence.*

### Skills

**[[Transcript Synthesis]]**
Extracting needs, pains, and desires in the customer's own language — verbatim quotes, not paraphrase. The skill is knowing the difference between what a customer said and what you think they meant, and preserving both.

**[[Signal Clustering]]**
Grouping disparate inputs (support tickets, NPS comments, interview fragments) into coherent Opportunity themes without collapsing nuance. The failure mode is premature abstraction: forcing signals into clean clusters before the real pattern is clear.

**[[Contradiction Detection]]**
Flagging when new evidence directly conflicts with an existing assumption on the tree (an Opportunity's framing, an Outcome's premise, a Solution's assumption). An agent that only adds to the tree and never challenges it is not maintaining it — it's inflating it.

**[[Longitudinal Pattern Tracking]]**
Remembering what was said three months ago and noticing drift in customer language, frequency, or intensity over time. This requires persistent memory across sessions — currently the hardest skill to develop with most agent infrastructure.

### Evaluation signals
- Does the agent quote verbatim before interpreting?
- Does it flag when a new signal contradicts an existing Opportunity, Outcome, or Solution assumption?
- Does it distinguish between high-confidence and weak-evidence clusters?

### Development approach
Train through repetition on real transcripts with explicit feedback on where the agent over-abstracted or missed a contradiction. Add a quality check step: *"Before presenting clusters, identify any that you're uncertain about and explain why."*

---

## Layer 2 — Tree Integrity & Maintenance

*Where most agent-assisted PM systems quietly fail. This is where quality gets made or laundered.*

### Skills

**[[Opportunity Validation]]**
Knowing the difference between a real customer Opportunity (the root of the tree, expressed in their voice, with evidence attached) and a stakeholder desire dressed up as discovery. An agent that can't make this distinction will gradually corrupt the tree into a feature request list.

Signals of corruption:
- Opportunities written as Solutions ("users need a way to X")
- Opportunities with no quote evidence attached
- Opportunities that match what a stakeholder already wanted to build

**[[Tree Health Checks]]**
Proactively surfacing structural problems without being asked:
- Zombie Tests (running with no kill condition)
- Orphaned Solutions (no parent KR) and KRs with no Solutions
- Broken parent chain (a record with no parent or two parents) and Outcomes without 2–3 KRs
- Outcome drift (active work has stopped connecting to the Outcome's KRs)
- Stale branches (no update in 2+ weeks)

**[[Evidence Attribution]]**
Requiring that every Opportunity has specific signals attached — quotes, tickets, data — not vibes. Evidence flows up from the Opportunity; signals are never attached directly to a KR. The agent's job is to ask *"what's the evidence for this?"* and flag nodes that can't answer it.

**[[Dead Ideas Tracking]]**
Maintaining awareness of previously explored and rejected paths. An agent without this memory will resurrect killed ideas with no awareness of why they were killed. This is especially important in long-running product initiatives.

### Anti-patterns agents must recognize and reject

| Anti-pattern | What it looks like | What the agent should do |
|---|---|---|
| Solution-language Opportunity | "Users need a 'resume session' feature" | Flag and rewrite: "Users lose track of where they were after a multi-day gap" |
| Single-source Opportunity | One interview quote becomes an Opportunity with an Outcome committed against it | Tag `[weak evidence]` and prompt for a second source before acting |
| Stakeholder-origin Opportunity | Opportunity aligns suspiciously with a pre-decided roadmap item | Surface the alignment, ask PM to verify the evidence is real |
| Orphaned Solution | Solution added without a parent KR | Refuse to add it without linking to an existing KR (and through it an Outcome and Opportunity) or creating them |
| Solution straight to the roadmap | Roadmap Item created for a Solution with no Test or cleared investment gate | Run the investment gate first; draft the cheapest Test |
| Signal pinned to a KR | Raw feedback attached to a KR instead of an Opportunity | Move it to the Opportunity (or the Solution or Test it bears on) |

### Evaluation signals
- Does the agent distinguish customer-voice from product-voice framing?
- Does it flag orphaned Solutions rather than silently accept them?
- Does it surface tree health issues proactively in weekly check-ins?

### Development approach
Seed the agent with a deliberately corrupted Loop tree (Solutions masquerading as Opportunities, weak-evidence branches, orphaned Solutions, signals pinned to KRs) and ask it to audit the tree. Grade it against the anti-patterns table. Iterate on the system prompt until it catches all of them.

---

## Layer 3 — Test & Assumption Reasoning

*The hardest intellectual task in PM. Agents need explicit scaffolding to do this well.*

### Skills

**[[Assumption Decomposition]]**
For any proposed Solution, mapping the full set of assumptions across a risk × evidence matrix — not just the obvious ones. The failure mode is surfacing the most visible assumption while missing the one that will actually kill the Solution.

A complete assumption map covers:
- Desirability: do customers want this?
- Usability: can they use it as designed?
- Feasibility: can we build it?
- Viability: does it support the business model?
- Outcome connection: does solving this actually move the parent KR?

**[[Test Minimalism]]**
Suggesting the *leanest possible Test* for a given assumption, not the most rigorous one. Agents trained on general research methodology will default to A/B tests when a fake door or concierge would give equally useful signal in a third of the time.

Test hierarchy (smallest to largest):
1. Fake door / smoke test (demand validation)
2. Concierge (manual version of the Solution)
3. Prototype test (wizard of oz or lo-fi)
4. A/B test (live with small % of users)
5. Staged rollout

**[[Null Hypothesis Awareness]]**
Not structuring every Test to confirm what the PM already believes. An agent that consistently designs Tests with biased success criteria is worse than no agent — it generates false confidence.

The agent should be able to ask: *"What result would make us abandon this Solution entirely? Have we designed for that?"*

**[[Result Interpretation]]**
Reading Test outcomes without over-claiming. Knowing when a result is too noisy to act on, when a positive result is too small to be meaningful, and when a negative result invalidates the Solution vs. just the specific Test design.

### Evaluation signals
- Does the agent surface assumptions beyond the obvious ones?
- Does it default to the smallest viable test, not the most comprehensive one?
- Does it design Tests with explicit kill conditions, not just success conditions?
- Does it flag noisy or inconclusive results rather than spinning them?

### Development approach
Present the agent with a Solution and a pre-loaded assumption map that has a critical gap (e.g., missing a viability assumption). See if it catches the gap unprompted. Also present it with Test results that are ambiguous and ask for an interpretation — grade it on whether it acknowledges the ambiguity or over-commits to a conclusion.

---

## Layer 4 — Judgment, Escalation & Metacognition

*The hardest layer to develop. The difference between a support tool and an autonomous agent.*

### Skills

**[[Confidence Tagging]]**
Every output should carry an implicit or explicit signal about certainty — and about what would change the conclusion. An agent that delivers synthesis, prioritization recommendations, and Test designs with uniform confidence is not calibrated; it's performing confidence.

Good form: *"This cluster is based on 3 interviews and 12 support tickets — I'd treat it as a medium-confidence Opportunity. Two more independent sources would make it strong."*

**[[Escalation Calibration]]**
Knowing when to act and when to ask. The test is reversibility, not importance: see [[Autonomy Policy]]. An agent that asks about reversible work is as miscalibrated as one that deletes records without asking — it just fails more quietly.

Act, then report (reversible):
- Synthesis, clustering, and new Opportunities, Outcomes, and tree restructuring
- Solution candidates, Test design, and Test result interpretation
- Prioritization, including moving roadmap items between Later, Next, and Now (once the Solution has cleared its gate)
- Status changes, linking, scoring, and drafts

Ask first (irreversible):
- Destroying something: deleting or archiving records, killing a branch with work behind it
- Reaching outside the team: anything customers or external stakeholders see
- Shipping to production
- Spending money or committing someone else's time

**[[Bias Detection]]**
Noticing when the discovery corpus is skewed — only churned users, only power users, only inbound support, only one team's research — and flagging it before synthesis produces a false pattern. The agent should know what's missing from the evidence base, not just what's in it.

**[[Audience Translation]]**
Reframing the same tree evidence differently for different stakeholders — engineering (technical constraints and tradeoffs), design (user behavior and context), executives (outcome progress and strategic bets) — without changing the underlying finding or its confidence level.

**[[Proactive Surfacing]]**
Knowing when to surface something the PM didn't ask for. The threshold should be: *"If the PM saw this and I hadn't flagged it, would they wish I had?"*

Examples of proactive surfacing:
- A new signal cluster that contradicts a high-confidence assumption on a Solution or Outcome
- A Test that's been running 3 weeks with no recorded update
- A Solution that's been "exploring" for 2 cycles with no linked Test

### The meta-skill: [[Epistemic Self-Awareness]]

The underlying capability that all of Layer 4 depends on: **knowing what good PM work looks like well enough to critique its own output.**

An agent that can say *"this Opportunity is stated in solution language, not customer language — here's how I'd reframe it"* is providing fundamentally different value than one that just generates text. This means the Torres and Cagan frameworks need to function not as templates but as quality filters — applied to the agent's own outputs, not just to user inputs.

This is the hardest skill to develop and the one most worth investing in. An agent with strong epistemic self-awareness compensates for gaps in the other three layers. An agent without it compounds them.

### Evaluation signals
- Does the agent tag its outputs with confidence levels?
- Does it act on reversible work without asking, and ask only before irreversible actions?
- When context is missing, does it infer and state the assumption instead of stopping?
- Does it notice and flag gaps in the evidence corpus (what's missing, not just what's there)?
- Does it surface issues proactively, without being asked?

### Development approach
The most effective development method: **red team the agent's own outputs**. After any synthesis or recommendation, prompt: *"Now critique that output. What assumptions did you make? What evidence is weakest? What would a skeptical PM push back on?"* Over time, bake this self-critique into the agent's standard operating procedure.

---

## Optional Capability — Compute Offload

Engineering, QA, and release agents can offload heavy steps (test, typecheck, build, e2e, dev_server) to remote compute when the team configures a `compute_offload` entry in `pm-config.md`. It is resolved like any provider capability via `integration-routing`, is optional, and falls back to local execution with a note in the report. Lost authentication is reported explicitly, never silently ignored.

## Skill Profiles by Agent Mode

Different use cases demand different skill mixes.

| Skill | Near-Autonomous Agent | High-Quality PM Support |
|---|---|---|
| [[Transcript Synthesis]] | Runs end-to-end, writes to tools | Drafts for PM review |
| Tree integrity | Maintains tree health, flags violations proactively | Flags issues when reviewing PM-built content |
| Assumption mapping | Produces full assumption maps unprompted | Co-creates with PM, prompts for missing assumptions |
| Test design | Proposes lean Tests with kill conditions | Drafts briefs, PM pressure-tests metrics |
| [[Confidence Tagging]] | Consistent across all outputs | Surfaces uncertainty on high-stakes outputs |
| [[Escalation Calibration]] | Asks only before irreversible actions | Acts on reversible work and reports it; states assumptions where uncertain |
| [[Bias Detection]] | Notices corpus gaps in real time | Flags gaps when PM shares evidence base |
| Context retention | Persistent memory across the product lifecycle | Session-aware; references prior work when surfaced |

**Design implication:** A near-autonomous agent needs all four layers to be strong. A PM support agent can be valuable with Layers 1-2 alone, provided it's honest about the limits of Layers 3-4.

---

## Maturity Model

A rough progression for evaluating an agent's development across these skills:

| Level | Description |
|---|---|
| **L1 — Reactive** | Responds to prompts accurately. Synthesizes when asked, clusters when asked. No proactive surfacing. |
| **L2 — Structured** | Applies Loop framing consistently. Distinguishes customer voice from product voice. Flags obvious anti-patterns. |
| **L3 — Critical** | Tags confidence levels. Detects contradictions. States its assumptions instead of stalling on them. Designs lean Tests unprompted. |
| **L4 — Calibrated** | Surfaces issues before asked. Notices corpus gaps. Self-critiques outputs. Acts on reversible work and escalates only irreversible actions. Maintains tree integrity over time. |

Most current agents with good system prompting can reach L2-L3. L4 requires persistent memory, strong system prompt design, and deliberate self-critique loops.

---

## Getting Started

If you want to move your current agent setup up the maturity curve:

- [ ] Add a self-critique step to your synthesis prompts: *"Now flag any Opportunity statements above that use solution language instead of customer language."*
- [ ] Add a confidence requirement to all clustering outputs: *"For each cluster, note how many sources support it and whether you'd call it strong, medium, or weak evidence."*
- [ ] Build a tree health check prompt (run bi-weekly): *"Review this Loop tree and identify any zombie Tests, orphaned Solutions, KRs with no Solutions, broken parent links, or Opportunities with no attached evidence."*
- [ ] Add the autonomy rule to your agent instructions: *"Act, then report. Ask first only before deleting or archiving work, contacting anyone outside the team, shipping to production, or spending money or someone else's time."*
- [ ] Build the null hypothesis habit into Test design prompts: *"Include a kill condition — what result would cause us to abandon this Solution entirely?"*

---

*The goal is an agent that gets real product work done and knows what it doesn't know. It states uncertainty and keeps moving.*
