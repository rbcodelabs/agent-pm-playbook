# Agentic Product Team Playbook

A Claude Code plugin for AI-augmented product teams — built on Teresa Torres's Continuous Discovery Habits and Marty Cagan's outcome-driven thinking. Provides a full virtual product team: PM, Architect, Engineer, QA, and Code Reviewer, each as a specialized Claude agent with tailored expertise and escalation rules.

## Install

```bash
# Install the plugin (installs PM skills)
claude plugins add richardbowman/agent-pm-playbook

# Install agents (symlinks agent files to ~/.claude/agents/)
git clone https://github.com/richardbowman/agent-pm-playbook
cd agent-pm-playbook
./setup.sh
```

## Getting Started

After installing, configure your environment before your first session:

```
Run the pm-setup skill to configure your notes system, issue tracker, and current desired outcome.
```

This writes a `pm-config.md` to your project that all PM agents and skills will use automatically. You only need to do this once per project.

Once configured, just start working. The `pm-coach` skill activates whenever you ask a PM question:

```
"Help me frame what I learned from these customer interviews"
"What opportunities might we be missing in our discovery?"
"I need to review the health of my OST"
"Help me design an experiment for this assumption"
```

---

## The Team

Six specialized agents, each with a focused role and explicit escalation rules:

| Agent | Role |
|---|---|
| `pm` | Product Manager — discovery, OST, signal synthesis, stories |
| `architect` | Software Architect — system design, ADRs, schema review |
| `engineer` | Senior Engineer — implementation, refactoring, debugging |
| `qa` | QA Engineer — test strategy, test writing, edge case hunting |
| `reviewer` | Code Reviewer — correctness, security, performance audits |
| `release-manager` | Release Manager — triage and merge open PRs, then ship |

### How Orchestration Works

The main Claude acts as the team lead — it reads each agent's `description` field to decide when to delegate. Spawn agents explicitly or let Claude route automatically:

```
# Explicit delegation
"Have the architect design the data model for X"
"Have the reviewer audit the changes in src/auth"
"Have QA write tests for the new checkout flow"
"Ship all open PRs for my-repo"

# Automatic routing
"Review this PR" → reviewer agent
"Design the caching layer" → architect agent
"Write tests for this feature" → qa agent
"Merge and ship all open PRs" → release-manager agent
```

Agents can run in parallel for independent work:
```
"Have the reviewer check the PR while the qa agent writes tests for the new endpoint"
```

### Team Workflow

```
PM (discovery + opportunity framing)
        ↓
Architect (system design + ADR)
        ↓
Engineer (implementation)
        ↓
QA (test strategy + test writing)     ←── runs in parallel with Reviewer
Reviewer (code review)                ←── runs in parallel with QA
```

---

## Skills

### `pm-setup` — Environment Setup

Configure your PM environment. Run once per project to set up your notes system, issue tracker, and current desired outcome. Writes a `pm-config.md` that all PM agents and skills use automatically.

**Run when:** starting a new project with the playbook, or when your environment changes.

---

### PM Skills

Three skills that activate when you're doing PM work:

### `pm-coach` — PM Thinking Partner

Activates in the current conversation as a thinking partner. Covers the full playbook: opportunity framing, OST review, solution ideation, experiment design, weekly synthesis, and retrospectives. Spawns the `pm` agent when a deliverable needs to be written.

**Triggers on:** "act as a PM coach", "help me with discovery", "outcomes over output", "help me think through this opportunity"

### `ost-workflow` — Opportunity Solution Tree

Specialist skill for building, reviewing, and maintaining OSTs. Tree construction, health checks, opportunity prioritization, structural mistake detection.

**Triggers on:** "build an OST", "review my opportunity solution tree", "tree health check"

### `pm-signal-synthesis` — Signal Synthesis

Transforms raw signals — interviews, support tickets, NPS, sales calls — into OST-ready opportunity clusters with confidence tagging and contradiction detection.

**Triggers on:** "synthesize my user interviews", "cluster this feedback", "process these transcripts"

### Skills Chain

```
pm-coach ──── "let's build a tree" ────► ost-workflow
pm-coach ──── "I have interviews" ─────► pm-signal-synthesis
pm-signal-synthesis ── "update tree" ──► ost-workflow
ost-workflow ── "broader strategy" ────► pm-coach
pm-coach ──── execution needed ────────► pm agent (spawned)
```

---

## Reference Docs

### PM Framework
- **[Agentic PM Playbook](Agentic%20PM%20Playbook.md)** — Full framework: philosophy, OST operating system, agentic workflow layer, tooling, cadences, prompt library, quality gates
- **[Agent Capability Framework](Agentic%20PM%20%E2%80%94%20Agent%20Capability%20Framework.md)** — Four skill layers and 18 individual agent skills for PM work
- **[Agent Skills/](Agent%20Skills/)** — Deep-dive on each of the 18 PM agent skills

### Team Role Profiles
- **[Product Manager](Team%20Role%20Profiles/Product%20Manager.md)**
- **[Software Architect](Team%20Role%20Profiles/Software%20Architect.md)**
- **[Senior Engineer](Team%20Role%20Profiles/Senior%20Engineer.md)**
- **[QA Engineer](Team%20Role%20Profiles/QA%20Engineer.md)**
- **[Code Reviewer](Team%20Role%20Profiles/Code%20Reviewer.md)**

---

## Philosophy

Outcomes over output. Continuous discovery. OST as the operating system. Agents as thinking partners, not just executors. Each team member has a scope, an escalation rule, and a handoff protocol — not because bureaucracy is good, but because clarity is what makes autonomous agents safe to trust.
