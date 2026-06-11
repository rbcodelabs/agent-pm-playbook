# Agentic PM Playbook

Most PMs are good at shipping features. This playbook is for becoming good at shipping the *right* features — by replacing opinion-driven roadmapping with a lightweight, agent-assisted continuous discovery practice.

It ships three things:

- **A training curriculum** — 7 modules + a capstone that teach the operating model step by step, on a sample product, then on yours
- **A team of Claude agents** — pm, architect, engineer, qa, reviewer, and release-manager, each with a focused role and explicit handoff rules
- **A set of PM skills** — specialized Claude Code skills for OST work, signal synthesis, experiment design, and investment gating

Built on Teresa Torres's Continuous Discovery Habits and Marty Cagan's outcome-driven thinking.

---

## Quick start

**Prerequisite:** [Claude Code](https://docs.anthropic.com/en/docs/claude-code) must be installed. Run `claude --version` to confirm.

```bash
git clone https://github.com/rbcodelabs/agent-pm-playbook
cd agent-pm-playbook
./setup.sh --dry-run   # preview what will be installed
./setup.sh             # install agents + skills into ~/.claude/
```

Restart Claude Code after setup finishes (`exit`, then `claude` again).

**Verify your install:**
```bash
# In a Claude Code session, after restarting:
# 1. Confirm agents loaded — reference one by name:
"Have the pm agent review my OST"

# 2. Confirm skills loaded — trigger one:
"Run the pm-setup skill"
```

If you get "unknown skill" or "unknown agent" errors, re-run `./setup.sh --force` and restart again.

**First-time config:** run this in a Claude Code session inside your product's folder:

```
Run the pm-setup skill to configure my notes system, issue tracker, and current desired outcome.
```

This writes a `pm-config.md` that every PM agent and skill reads automatically. Do it once per project.

---

## New here? Start with the curriculum

The curriculum teaches the operating model first (why), then the tools (how). It uses a shared fictional product for the exercises so you can practice before running it on your own product.

| Module | Title | Time | Produces |
|---|---|---|---|
| **0** | [The Operating Model](training/module-0-operating-model.md) | Half day | A backward trace from a real feature to its (missing) outcome |
| **1** | [Environment Setup](training/module-1-environment-setup.md) | Half day | A working environment + `pm-config.md` |
| **2** | [Your First OST](training/module-2-your-first-ost.md) | 1 day | A health-checked Opportunity Solution Tree |
| **3** | [Signal Synthesis](training/module-3-signal-synthesis.md) | 1 day | Clustered, evidence-tagged opportunities mapped to the OST |
| **4** | [Experiments & Investment](training/module-4-experiments-and-investment.md) | 1 day | One assumption decomposed, leanest test designed, gated |
| **5** | [The Agent Team](training/module-5-the-agent-team.md) | 1 day | One solution run from story → design brief |
| **6** | [Cadences & Health](training/module-6-cadences-and-health.md) | Half day | Recurring rituals scheduled in your own calendar |
| **Capstone** | [One Full Cycle on Your Real Product](training/capstone.md) | 1–2 weeks | A complete discovery loop, scored against a rubric |

→ **[Full curriculum index with prerequisites and sample dataset](training/00-start-here.md)**

---

## Setting up your workspace

If you want Obsidian + Claude Threads as your notes home (recommended for sustained use):

→ **[PM Workspace Setup guide](guides/pm-workspace-setup.md)** — one-command vault installer, adding your Anthropic API key, connecting JIRA or Linear, and Vault Bridges (~30 min)

---

## The agent team

Six specialized agents installed by `setup.sh`:

| Agent | Role |
|---|---|
| `pm` | Discovery, OST maintenance, signal synthesis, user stories |
| `architect` | System design, ADRs, schema review |
| `engineer` | Implementation, refactoring, debugging |
| `qa` | Test strategy, test writing, edge case hunting |
| `reviewer` | Correctness, security, and performance audits |
| `release-manager` | Triage and merge open PRs, then ship |

Delegate explicitly or let Claude route automatically:

```
"Have the architect design the data model for this feature"
"Have the reviewer audit the changes in src/auth"
"Merge and ship all open PRs for my-repo"
```

---

## The PM skills

Eight skills installed by `setup.sh`:

| Skill | What it does |
|---|---|
| `pm-setup` | One-time config — writes `pm-config.md` for your project |
| `pm-coach` | Thinking partner for discovery, OST review, experiment design |
| `ost-workflow` | Build, extend, and health-check an Opportunity Solution Tree |
| `pm-signal-synthesis` | Turn interviews, tickets, and reviews into OST-ready clusters |
| `investment-gate` | Assess readiness against the Progressive Investment ladder |
| `jira-workflow` | Create and update Jira issues from discovery artifacts |
| `agentic-pm` | Full-cycle PM workflow orchestration |
| `release-manager` | Triage, merge, and ship open PRs |

---

## Reference docs

- **[Agentic PM Playbook](Agentic%20PM%20Playbook.md)** — full framework: OST operating system, cadences, prompt library, quality gates
- **[Progressive Investment Framework](Progressive%20Investment%20Framework.md)** — the five-stage evidence ladder
- **[Discovery Health Metrics](Discovery%20Health%20Metrics.md)** — four diagnostic categories and flag thresholds
- **[Signal Ledger](Signal%20Ledger.md)** — the synthesis artifact format
- **[PM Tool Integration Guide](PM%20Tool%20Integration%20Guide.md)** — Linear, Jira, JPD, and Markdown-only setup
- **[Success Metrics guide](guides/success-metrics.md)** — how to know the operating model is actually working at 30/60/90 days
- **[Troubleshooting](training/troubleshooting.md)** — common friction across all modules

---

## Philosophy

Outcomes over output. Continuous discovery. OST as the operating system. Agents as thinking partners, not just executors.

The system is designed so the PM holds the judgment and agents do the production work — synthesis, structuring, story writing, code review. What can't be delegated: deciding what's true, what matters, and what to kill.

---

## Want help adopting this with your team?

**[RB Code Labs](https://rbcodelabs.com)** offers facilitated workshops to help product teams adopt this operating model — live, with your real product and real signals. If you want the curriculum accelerated and embedded in your team rather than self-served, get in touch at **rick@rbcodelabs.com**.
