# Agentic PM Playbook

Most PMs are good at shipping features. This playbook is for becoming good at shipping the *right* features — by replacing opinion-driven roadmapping with a lightweight, agent-assisted continuous discovery practice.

It ships three things:

- **A training curriculum** — 7 modules + a capstone that teach the operating model step by step, on a sample product, then on yours
- **A team of Claude agents** — pm, architect, engineer, qa, reviewer, and release-manager, each with a focused role and explicit handoff rules
- **A set of skills** — specialized Claude Code skills for Loop tree work (Opportunity → Outcome → Key Result → Solution → Test), signal synthesis, test design, investment gating, and engineering discipline (design gates, TDD, verification)

Built on Teresa Torres's Continuous Discovery Habits and Marty Cagan's outcome-driven thinking, unified into one hierarchy: **Loop** (Opportunity → Outcome → Key Result → Solution → Test, with Roadmap Items hanging off Solutions that clear the investment gate). See the [Loop guide](guides/the-loop.md).

**Agents act, then report.** Every agent and skill follows one
[Autonomy Policy](Autonomy%20Policy.md): do reversible work without asking and report
what changed. Ask first only before destroying something, reaching outside the team,
shipping to production, or spending money or someone else's time.

**One approval to a tested PR:** the
[Approved Build workflow](skills/build-authorization/SKILL.md) carries exact human scope
approval through one Task-claimed worker to one tested PR. Direct and scheduled work use
the same path. Roadmap admission is separate; merge and production remain separately authorized.

→ **[Scheduled Product Operating System](Scheduled%20Product%20Operating%20System.md)** — working design for turning the full playbook into asynchronous scheduled and event-driven workflows, including human-review packets, early-idea prototypes, decision routing, and safe automation gates.

→ **[Compass cloud capability pack](guides/compass-cloud-pack.md)** — a declarative, skills-only edition for Compass's in-app agent.

---

## Quick start

**Prerequisite:** [Claude Code](https://docs.anthropic.com/en/docs/claude-code) must be installed. Run `claude --version` to confirm.

The playbook installs as a Claude Code plugin (`agentic-pm`) straight from GitHub. No clone or install script is needed. In a Claude Code session:

```
/plugin marketplace add rbcodelabs/agent-pm-playbook
/plugin install agentic-pm@rbcodelabs
```

Or from a terminal:

```bash
claude plugin marketplace add rbcodelabs/agent-pm-playbook
claude plugin install agentic-pm@rbcodelabs
```

Restart Claude Code (or run `/reload-plugins`) so the agents and skills load. Plugin skills are namespaced, for example `agentic-pm:pm-coach`; agents appear as `agentic-pm:pm`.

**Update:** `/plugin marketplace update rbcodelabs` refreshes the catalog from GitHub, then update `agentic-pm` from `/plugin` (or reinstall it). Releases are identified by the `version` in `.claude-plugin/plugin.json`.

### Upgrading from `setup.sh` (symlink installs)

Earlier versions installed by running `setup.sh`, which symlinked each agent and skill into `~/.claude/agents/` and `~/.claude/skills/`. That script has been removed. If you used it, remove the old symlinks after installing the plugin, otherwise you will see each agent and skill twice. List the symlinks that point into a playbook checkout (this only matches symbolic links, never real files or directories):

```bash
find ~/.claude/agents ~/.claude/skills -maxdepth 1 -type l -lname '*agent-pm-playbook*' -print
```

Review the list. If every entry is one you expect, delete exactly those:

```bash
find ~/.claude/agents ~/.claude/skills -maxdepth 1 -type l -lname '*agent-pm-playbook*' -delete
```

If you cloned the repo to a directory with a different name, the pattern will not match; inspect `ls -l ~/.claude/agents ~/.claude/skills` and remove only the links that point at your clone. You can then delete the clone.

### Other hosts (for example Geode agent threads)

The agents are Claude Code plugin agents, so the supported way to get **agents and skills** is the plugin install above, using the same GitHub repository. The skills are ordinary `skills/<name>/SKILL.md` folders, so a host that can add a skill source from a GitHub repository can load the skills without the plugin. Agent definitions (`agents/*.md`) are only registered through the plugin install; a skills-only source does not provide them. Check your host's documentation for what it discovers from a repository.

**Verify your install:**
```bash
# In a Claude Code session, after restarting:
# 1. Confirm agents loaded — reference one by name:
"Have the pm agent review my Loop tree"

# 2. Confirm skills loaded — trigger one:
"Run the pm-setup skill"
```

If you get "unknown skill" or "unknown agent" errors, run `/plugin` and confirm `agentic-pm` is installed and enabled, then restart Claude Code.

**First-time config:** run this in a Claude Code session inside your product's folder:

```
Run the pm-setup skill to select an integration profile, configure provider routing, and set my current focus Opportunity and Outcome.
```

This writes a `pm-config.md` routing manifest that every PM agent and skill reads automatically. Choose `compass-full`, `compass-obsidian-linear`, `markdown-linear`, or `jpd-jira`, then override individual capabilities if needed. Product state stays in its resolved provider.

### Install in Compass

The cloud edition lives at `packs/compass/`. A Compass workspace administrator installs an immutable tuple:

- Public repository: `https://github.com/rbcodelabs/agent-pm-playbook`
- Commit: an exact 40-character commit SHA
- Pack path: `packs/compass`

Installing another commit creates another immutable version that can be selected for an upgrade or rollback. See the [cloud pack guide](guides/compass-cloud-pack.md) for its security and compatibility contract.

---

## New here? Start with the curriculum

The curriculum teaches the operating model first (why), then the tools (how). It uses a shared fictional product for the exercises so you can practice before running it on your own product.

| Module | Title | Time | Produces |
|---|---|---|---|
| **0** | [The Operating Model](training/module-0-operating-model.md) | Half day | A backward trace from a real feature to its (missing) outcome |
| **1** | [Environment Setup](training/module-1-environment-setup.md) | Half day | A working environment + `pm-config.md` |
| **2** | [Your First Loop](training/module-2-your-first-loop.md) | 1 day | A health-checked Loop tree |
| **3** | [Signal Synthesis](training/module-3-signal-synthesis.md) | 1 day | Clustered, evidence-tagged opportunities mapped to the tree |
| **4** | [Tests & Investment](training/module-4-tests-and-investment.md) | 1 day | One assumption decomposed, leanest Test designed, gated |
| **5** | [The Agent Team](training/module-5-the-agent-team.md) | 1 day | One solution run from story → design brief |
| **6** | [Cadences & Health](training/module-6-cadences-and-health.md) | Half day | Recurring rituals scheduled in your own calendar |
| **Capstone** | [One Full Cycle on Your Real Product](training/capstone.md) | 1–2 weeks | A complete discovery loop, scored against a rubric |

→ **[Full curriculum index with prerequisites and sample dataset](training/00-start-here.md)**

---

## Setting up your workspace

If your selected profile uses Obsidian + Claude Threads:

→ **[PM Workspace Setup guide](guides/pm-workspace-setup.md)** — one-command vault installer, adding your Anthropic API key, connecting JIRA or Linear, and Vault Bridges (~30 min)

---

## The agent team

Six specialized agents provided by the `agentic-pm` plugin:

| Agent | Role |
|---|---|
| `pm` | Discovery, tree maintenance, signal synthesis, user stories |
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

## Recurring product operations

Ask: “Install the playbook's product-operations job every weekday at 9 AM in my timezone.”
After resolving your configuration and schedule, the
[scheduled-product-operations skill](skills/scheduled-product-operations/SKILL.md) installs
one job per product. Every run checks feedback, discovery, tests, roadmap, delivery,
outcomes, decisions, reporting, and automation health, then works through one checklist.
Healthy areas remain visible; human decisions and unfinished work include direct links.
Existing multiple-job installations can be consolidated through the same skill.

## Skills

Skills provided by the `agentic-pm` plugin include:

**PM skills**

| Skill | What it does |
|---|---|
| `integration-routing` | Resolves capability providers and validates named profiles/overrides |
| `pm-setup` | Configures profiles, capability providers, connections, and provider-aware scaffolding |
| `scheduled-product-operations` | Installs one recurring job that checks every area, builds one checklist, and executes safe actionable work on every run |
| `human-review-workflow` | Routes asynchronous product decisions, including tracking-only Compass Decisions that stop for human judgment without auto-applying actions |
| `delivery-completion-watcher` | Reconciles merged PRs and verified production delivery back into product, roadmap, and capacity state |
| `pm-coach` | Thinking partner for discovery, tree review, Test design |
| `loop-workflow` | The whole Loop: build and health-check the tree, run Outcome and KR cycles and check-ins, close the loop, and convert legacy OKR/OST data |
| `pm-signal-synthesis` | Turn interviews, tickets, and reviews into tree-ready Opportunity clusters |
| `investment-gate` | Assess readiness against the Progressive Investment ladder |
| `jira-workflow` | Create and update Jira issues from discovery artifacts |
| `agentic-pm` | Full-cycle PM workflow orchestration |
| `release-manager` | Triage, merge, and ship open PRs |

**Engineering discipline skills**

| Skill | What it does |
|---|---|
| `design-before-code` | Pre-implementation design gate — explore context, propose approaches, get approval before any code |
| `test-first` | TDD iron law — RED test required before any production code, with rationalization counters |
| `verify-done` | Verification gate — run the command, read the output, cite evidence before claiming done |
| `architecture-review` | Read-only two-pass audit — architectural risk against the roadmap, then maintainability and code health |

---

## Reference docs

- **[Autonomy Policy](Autonomy%20Policy.md)** — the one rule for when agents act and when they ask
- **[Agentic PM Playbook](Agentic%20PM%20Playbook.md)** — full framework: the Loop operating system, cadences, prompt library, quality gates
- **[The Loop](guides/the-loop.md)** — the five levels, structural rules, and ID formats
- **[Progressive Investment Framework](Progressive%20Investment%20Framework.md)** — the five-stage evidence ladder
- **[Discovery Health Metrics](Discovery%20Health%20Metrics.md)** — four diagnostic categories and flag thresholds
- **[Signal Ledger](Signal%20Ledger.md)** — the synthesis artifact format
- **[Capability Provider Contract](skills/integration-routing/SKILL.md)** — routing invariants, capabilities, and migration behavior
- **[PM Tool Integration Guide](PM%20Tool%20Integration%20Guide.md)** — Compass, Obsidian, Linear, JPD, Jira, and hybrid profiles
- **[Success Metrics guide](guides/success-metrics.md)** — how to know the operating model is actually working at 30/60/90 days
- **[Troubleshooting](training/troubleshooting.md)** — common friction across all modules

---

## Philosophy

Outcomes over output. Continuous discovery. The Loop tree as the operating system. Agents as thinking partners, not just executors.

Agents do the product work, including judgment calls that can be undone: framing, prioritizing, interpreting results. They report each call so the PM can overrule it. What stays with the PM is anything that can't be taken back: killing work, speaking to customers, shipping, and spending.

---

## Want help adopting this with your team?

**[RB Code Labs](https://rbcodelabs.com)** offers facilitated workshops to help product teams adopt this operating model — live, with your real product and real signals. If you want the curriculum accelerated and embedded in your team rather than self-served, get in touch at **rick@rbcodelabs.com**.

---

## Legacy terminology

Earlier versions used a separate OKR cycle and Opportunity Solution Tree (OST). Those are now one Loop tree; Objective and Desired Outcome merged into Outcome, and Experiment is now Test. The former `ost-workflow` and `okr-workflow` skills are merged into `loop-workflow`; `experiment-workflow` still owns Tests. See the [mapping in the Loop guide](guides/the-loop.md#mapping-from-the-legacy-okr--ost-model).
