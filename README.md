# Agentic Product Team Playbook

A Claude Code plugin for AI-augmented product teams — built on Teresa Torres's
Continuous Discovery Habits and Marty Cagan's outcome-driven thinking. Provides
a full virtual product team: PM, Architect, Engineer, QA, and Code Reviewer, each
as a specialized Claude agent with tailored expertise, tool access, and escalation rules.

## Install

```bash
# Install the plugin (installs PM skills)
claude plugins add richardbowman/agent-pm-playbook

# Install agents (symlinks agent files to ~/.claude/agents/)
git clone https://github.com/richardbowman/agent-pm-playbook
cd agent-pm-playbook
./setup.sh
```

## The Team

Six specialized agents, each with a focused role and explicit escalation rules:

| Agent | Role | Tool Access |
|---|---|---|
| `pm` | Product Manager — discovery, OST, signal synthesis, stories | Read/Write + Obsidian MCP |
| `architect` | Software Architect — system design, ADRs, schema review | Read/Write (docs), Bash (read-only) |
| `engineer` | Senior Engineer — implementation, refactoring, debugging | Full access |
| `qa` | QA Engineer — test strategy, test writing, edge case hunting | Read/Write/Edit (test files) |
| `reviewer` | Code Reviewer — correctness, security, performance audits | Read-only (enforced) |
| `release-manager` | Release Manager — triage and merge open PRs, then ship via Vercel deploy or GitHub release | Full access |

### How Orchestration Works

The main Claude acts as the team lead — it reads each agent's `description` field
to decide when to delegate. Spawn agents explicitly or let Claude route automatically:

```
# Explicit delegation
"Have the architect design the data model for X"
"Have the reviewer audit the changes in src/auth"
"Have QA write tests for the new checkout flow"
"Ship all open PRs for obsidian-claude-threads"

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

## Skills (via `claude plugins add`)

### `release-manager` — Release Manager

Triage all open PRs on a repo, build a safe merge order, execute the merges
one-at-a-time, and ship the result. For Vercel web apps: waits for the deploy
and smoke-tests live URLs. For Obsidian plugins and other distributable apps:
runs the build, bumps the version, and publishes a GitHub release with built
artifacts.

**Triggers on:** "merge and ship open PRs", "ship my plugin", "process open pull requests", "babysit my PRs"

---

### PM Skills

Three skills that activate when you're doing PM work:

### `agentic-pm` — PM Coach
Top-level coaching skill. Covers the full playbook: opportunity framing, OST review,
solution ideation, experiment design, weekly synthesis, and retrospectives.

**Triggers on:** "act as a PM coach", "help me with discovery", "outcomes over output"

### `ost-workflow` — Opportunity Solution Tree
Specialist skill for building, reviewing, and maintaining OSTs. Tree construction,
health checks, opportunity prioritization, structural mistake detection.

**Triggers on:** "build an OST", "review my opportunity solution tree", "tree health check"

### `pm-signal-synthesis` — Signal Synthesis
Transforms raw signals — interviews, support tickets, NPS, sales calls — into
OST-ready opportunity clusters with confidence tagging and contradiction detection.

**Triggers on:** "synthesize my user interviews", "cluster this feedback", "process these transcripts"

### Skills Chain

```
agentic-pm ──── "let's build a tree" ────► ost-workflow
agentic-pm ──── "I have interviews" ──────► pm-signal-synthesis
pm-signal-synthesis ── "update the tree" ► ost-workflow
ost-workflow ── "broader strategy" ───────► agentic-pm
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

Outcomes over output. Continuous discovery. OST as the operating system.
Agents as thinking partners, not just executors. Each team member has a scope,
an escalation rule, and a handoff protocol — not because bureaucracy is good,
but because clarity is what makes autonomous agents safe to trust.

---

*Built by Rick Bowman · [richardbowman](https://github.com/richardbowman)*
