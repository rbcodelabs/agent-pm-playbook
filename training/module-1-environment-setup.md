# Module 1: Environment Setup

**Time:** Half day
**Coding required:** A little — you'll run a couple of shell commands. No programming.
**Prerequisite:** [Module 0](module-0-operating-model.md). Do the operating-model module first; this one only makes sense once you know what the tools are *for*.
**You will produce:** A working **core** environment — the agents and skills installed, a `pm-config.md`, and a PM thread that responds — plus, optionally, the recommended notes/discovery stack.

---

## Required core vs. recommended stack

There are two layers here, and conflating them is what makes setup feel heavy. Keep them separate:

- **The required core** is just Claude Code + the playbook's agents and skills + a `pm-config.md`. That's the engine. With only this, you can do every exercise in this curriculum.
- **The recommended stack** (Obsidian, an issue tracker, vault bridges) is where the operating model becomes *sustainable* day-to-day. It's worth setting up — but it's **optional**, and a solo or non-technical PM with no issue tracker can skip parts of it and still complete the course.

| Piece | Layer | What it is | Which shift it serves |
|---|---|---|---|
| Claude Code | **Required** | The host you run the agents and skills in | The whole model — this is the engine |
| The agents + PM skills (via `setup.sh`) | **Required** | 6 agents (pm, architect, engineer, qa, reviewer, release-manager) + PM skills (`pm-coach`, `pm-setup`, `ost-workflow`, `pm-signal-synthesis`, `investment-gate`, …) | *PM as judgment holder* — agents produce artifacts, you decide |
| `pm-config.md` (via `pm-setup`) | **Required** | Your config: notes system, tracker (or "none"), current desired outcome | Everything — every skill reads this |
| Obsidian + Claude Threads | Recommended | A notes home with Claude in the loop | *Continuous discovery* — signal and synthesis in one place |
| Issue-tracker integration (Linear / Jira / JPD) | Optional | Work items sync between tracker and notes | *Outcomes* — work items stay traceable. **Skip if you track work in plain notes.** |
| Vault Bridges | Optional | A live link between your product's repo/docs folder and your notes | *Continuous discovery* — product context one search away |

> **This module is also the install smoke test.** You are the canary for every future adopter. Anywhere you hit friction — a command that fails, a name that's wrong, a step that assumes context you don't have — **write it down** (what you did, what you expected, what happened). That friction log is a real deliverable; it's what hardens `setup.sh` and the docs for the public path. Don't push through silently.

---

## Learning objectives

By the end of this module you will be able to:

- Install the playbook's agents and skills and confirm they're active.
- Run `pm-setup` and explain what each field in `pm-config.md` controls.
- Get the `pm-coach` skill to respond as a thinking partner in a thread.
- Decide which optional stack pieces you actually need (and skip the rest without guilt).
- Capture an install-friction log honestly enough that someone else could fix what you hit.

---

## Concept reading

The one idea worth holding: **`pm-config.md` is the routing spine.** Every PM skill resolves each capability to exactly one authoritative provider, plus the current desired outcome. The manifest does not duplicate provider state. You generate or migrate it with `pm-setup`.

**Go deeper:** [README](../README.md) for the project overview, [PM Tool Integration Guide](../PM%20Tool%20Integration%20Guide.md) for tracker-specific setup (Linear, Jira, JPD, or Markdown-only), and [How to Use the Agents](../How%20to%20Use%20the%20Agents.md) for what each agent does.

---

## Hands-on exercise: stand up your environment

Do the **Required core** (Steps 1–4) first and confirm it works. Then do as much of the **Recommended stack** (Step 5) as fits how you actually work. Don't skip the *Verify* line under each step — that line **is** the smoke test.

### Required core

#### Step 0 — Install Claude Code (skip if you already have it)

Claude Code is a separate CLI application — different from claude.ai. If you haven't installed it yet:

1. Follow the install guide at **[docs.anthropic.com/claude-code](https://docs.anthropic.com/en/docs/claude-code)** — it has OS-specific instructions.
2. You also need `git`. Run `git --version` in your terminal to confirm it's there; if not, install it from [git-scm.com](https://git-scm.com).

**Verify:** `claude --version` returns a version number. If you get "command not found," complete the Claude Code install before continuing.

---

#### Step 1 — Install the agents and skills

The reliable path is to clone the repo and run `setup.sh`, which symlinks the agents and skills into `~/.claude/` (symlinks mean repo updates propagate automatically):

```bash
git clone https://github.com/rbcodelabs/agent-pm-playbook
cd agent-pm-playbook
./setup.sh --dry-run   # preview exactly what it will symlink
./setup.sh             # do it
```

`setup.sh` prints a ✓ for each agent and skill it links, then a summary and `Restart Claude Code to pick up the new agents.` Restart Claude Code afterward. (To restart: type `exit` in the session and run `claude` again — or close and reopen the desktop app if you're using one.)

> **Optional alternative — the plugin marketplace.** If you'd rather install via Claude Code's plugin system instead of `setup.sh`, the repo ships a marketplace manifest.
> ⚠️ **Confirm before relying on this:** the exact `claude plugins` subcommand syntax changes between Claude Code versions, and this repo's plugin manifest is currently a subset of what `setup.sh` installs. Until that's reconciled, **`setup.sh` is the install that gives you the full set** (all 6 agents + all PM skills). Treat the marketplace path as advanced/optional and verify it against `claude plugins --help` on your version.

**Verify:** `setup.sh` finished with no red errors and a summary listing the agents and skills. Restart Claude Code, then in a session confirm you can reference the `pm` agent and the `pm-coach` skill without an "unknown skill/agent" error.

#### Step 2 — Run `pm-setup`

First, `cd` into the folder you'll use as your product workspace — an empty folder is fine if you have no existing code repo:

```bash
mkdir my-product-pm   # skip if you already have a project folder
cd my-product-pm
claude                # this opens a Claude Code session in the current directory
```

> **A "Claude Code session"** is a CLI conversation started by running `claude` from inside a folder. The session knows which folder it's in — that's where `pm-config.md` will be written, and it becomes your workspace for the rest of the course.

In the session, invoke the setup skill:

```
Run the pm-setup skill to select an integration profile, configure capability providers, and set my current desired outcome.
```

Answer its questions. Two notes:
- Pick the profile closest to your real stack: full Compass, Compass/Obsidian/Linear, Markdown/Linear, or JPD/Jira. Per-capability overrides handle exceptions.
- For **current desired outcome**, give the measurable behavior change you're managing toward (Module 0 standard), **not** a feature. This is the single most important field — everything downstream inherits it.

**Verify:** `pm-config.md` names a profile and resolves all nine capabilities to exactly one provider. Confirm it created only folders owned by Markdown/Obsidian capabilities; `compass-full` creates no product-state folder tree.

#### Step 3 — Wake up the PM coach

Start a fresh thread and ask a PM question:

```
Help me frame what I learned from a couple of customer conversations this week.
```

**Verify:** the `pm-coach` skill engages as a thinking partner — asking about outcomes and evidence — rather than just answering generically. *(If it answers generically, the usual cause is a missing or empty `pm-config.md` — re-run Step 2.)*

#### Step 4 — Confirm the core is real

Re-read your `pm-config.md` one more time and confirm the `desired outcome` field is a measurable behavior change, not a feature.

**Verify:** you could hand `pm-config.md` to a colleague and they'd know what behavior your product is trying to change.

> ✅ **At this point the required core is done — you can complete the entire curriculum.** Everything below is optional polish.

### Recommended stack (optional)

#### Step 5 — Set up your notes + connections (as needed)

> **Full walkthrough:** the [PM Workspace Setup guide](../guides/pm-workspace-setup.md) covers every step here in detail — one-command vault installer, exact BRAT install paths, how to add secrets, and JIRA/Linear API key setup. If you're doing the full stack, follow that guide and come back here when it's done.

- **Notes home — Obsidian + Claude Threads.** Install Obsidian, then the Claude Threads plugin so Claude can work inside your notes.
  ⚠️ **Confirm:** the exact install channel for the Claude Threads and Vault Bridges plugins (Obsidian community store vs. manual/BRAT install) depends on how they're distributed — check the plugin's own README for the current method rather than assuming the community store.
- **Issue tracker (skip if you use plain notes).** If you use Linear / Jira / JPD, connect it per the [PM Tool Integration Guide](../PM%20Tool%20Integration%20Guide.md). If you track work in Markdown, mark this **N/A** and move on — every exercise in this course works tool-agnostically.
- **Vault Bridges (optional).** Bridge your product's repo *or a plain docs folder* into your notes so product context is searchable. You don't need a code repo — a folder of docs is fine.

**Verify (only the pieces you set up):** you can start a Claude thread inside Obsidian; if you connected a tracker, you can find one real issue from your notes; if you bridged a folder, you can find one real product file from your notes.

**Deliverable:** a working core environment **and** a friction log — a short list of every place a step failed, was unclear, named something wrong, or assumed context you didn't have. (An empty friction log is a valid, great result — but only if you actually hit nothing.)

---

## Success criteria

- [ ] `setup.sh` completed and the agents + PM skills are available after a restart.
- [ ] `pm-config.md` exists and its `desired outcome` is a measurable behavior change (Module-0 standard), not a feature.
- [ ] `pm-coach` responds *as a coach* in a thread — it asks about outcomes/evidence.
- [ ] You made a deliberate decision about each optional stack piece (set up or skipped on purpose) — a skipped tracker with "N/A" recorded counts as done.
- [ ] You produced a friction log (even if it's "no friction").

---

## Common failure modes

| Symptom | What's going wrong | Fix |
|---|---|---|
| `git clone` or `./setup.sh` errors | Tooling missing, or wrong directory | Confirm git and Claude Code are installed; run `setup.sh` from inside the cloned repo; use `--dry-run` to see what it expects. Log the exact error. |
| Skills/agents don't appear ("unknown skill") | Claude Code not restarted, or symlinks skipped | Restart Claude Code. Re-run `./setup.sh --force` if a previous install left stale entries. If it persists, log it with the exact command and output. |
| You tried the `claude plugins` command and the syntax was wrong | Plugin CLI differs by version; repo manifest is a subset | Use the `setup.sh` path — it's the supported full install. Note the discrepancy in your friction log. |
| `pm-coach` answers generically | No `pm-config.md`, or it's empty/stale | Re-run `pm-setup`; the coach anchors to your config. |
| `desired outcome` is a feature ("ship onboarding v2") | Module-0 lesson didn't carry over | Rewrite as a measurable behavior change ("raise day-2 activation from X% to Y%"). Every skill inherits this. |
| You feel blocked because you don't have Linear / a code repo | Treating an optional piece as required | The tracker and vault bridge are optional. Record "N/A" and continue — the core is all the course needs. |
| You "just got it working" but skipped the friction log | Defeats the smoke-test purpose | Reconstruct it now. The next adopter and the public install path depend on what you hit. |

---

## Next

Core's live. Time to build the structure the whole operating model hangs on — your first Opportunity Solution Tree.

→ **[Module 2: Your First OST](module-2-your-first-ost.md)**
