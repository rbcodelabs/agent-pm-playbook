# Agentic PM Playbook

A Claude Code plugin for AI-augmented product management — built on Teresa Torres's
Continuous Discovery Habits and Marty Cagan's outcome-driven thinking. Installs three
coaching skills that activate automatically when you're doing PM work.

## Install

```bash
claude plugins add richardbowman/agent-pm-playbook
```

## Skills

### `agentic-pm` — PM Coach
The top-level coaching skill. Activates when you need product strategy help,
want to think through outcomes vs. output, or need guidance on continuous discovery.
Covers the full playbook: opportunity framing, OST review, solution ideation,
experiment design, weekly synthesis, and quarterly retrospectives.

**Triggers on:** "act as a PM coach", "help me with discovery", "outcomes over output", etc.

### `ost-workflow` — Opportunity Solution Tree
Specialist skill for building, reviewing, and maintaining OSTs. Handles construction
from scratch, tree health checks, opportunity prioritization, and correcting common
structural mistakes.

**Triggers on:** "build an OST", "review my opportunity solution tree", "tree health check", etc.

### `pm-signal-synthesis` — Signal Synthesis
Transforms raw product signals — interviews, support tickets, NPS, sales calls —
into structured, OST-ready opportunity clusters with confidence tagging, contradiction
detection, and bias flagging.

**Triggers on:** "synthesize my user interviews", "cluster this feedback", "process these transcripts", etc.

## Skills Chain

The three skills are wired to hand off to each other automatically:

```
agentic-pm ──── "let's build a tree" ────► ost-workflow
agentic-pm ──── "I have interviews" ──────► pm-signal-synthesis
pm-signal-synthesis ── "update the tree" ► ost-workflow
ost-workflow ── "broader strategy" ───────► agentic-pm
```

## Reference Docs

The `skills/` directory contains the Claude Code SKILL.md files. The knowledge
base they draw from lives alongside them:

- **[Agentic PM Playbook](Agentic%20PM%20Playbook.md)** — Full framework: philosophy, OST operating system, agentic workflow layer, tooling, cadences, prompt library, quality gates
- **[Agent Capability Framework](Agentic%20PM%20%E2%80%94%20Agent%20Capability%20Framework.md)** — Four skill layers and 18 individual agent skills for PM work
- **[Agent Skills/](Agent%20Skills/)** — Deep-dive docs on each of the 18 agent skills

## Philosophy

Outcomes over output. Continuous discovery. OST as the operating system.
Agents as thinking partners, not just executors.

---

*Built by Rick Bowman · [richardbowman](https://github.com/richardbowman)*
