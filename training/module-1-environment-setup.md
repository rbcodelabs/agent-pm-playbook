# Module 1: Environment Setup

**Time:** Half day
**Coding required:** A little — you'll run a couple of shell commands. No programming.
**Prerequisite:** [Module 0](module-0-operating-model.md). Do the operating-model module first; this one only makes sense once you know what the tools are *for*.
**You will produce:** A working environment with a `pm-config.md`, a PM thread that responds, your issue tracker syncing, and your product folder bridged into your notes.

---

## What you're setting up, and why each piece exists

This module is plumbing, but every piece maps to a shift from Module 0. Keep the *why* in view or it's just a checklist.

| Piece | What it is | Which shift it serves |
|---|---|---|
| **Claude Code + the playbook plugin** | The agents and PM skills (`pm-coach`, `ost-workflow`, `pm-signal-synthesis`, `pm-setup`, `investment-gate`) | The whole model — this is the engine |
| **The 6 agents** (via `setup.sh`) | pm, architect, engineer, qa, reviewer, release-manager | *PM as judgment holder* — agents produce artifacts, you decide |
| **Obsidian + Claude Threads** | Where you think, with Claude in the loop on your notes | *Continuous discovery* — signal and synthesis live in one place |
| **Issue-tracker integration** (Linear / Jira / JPD) | Work items sync between your tracker and your notes | *Outcomes* — every work item stays traceable to its outcome |
| **Vault Bridges** | A live link between your product's repo/folder and your notes | *Continuous discovery* — product context is one search away |
| **`pm-config.md`** (via `pm-setup`) | Your environment's config: notes system, tracker, current desired outcome | Everything — every skill reads this so it knows your context |

> **This module is also the install smoke test.** You are the canary for every future adopter. Anywhere you hit friction — a command that fails, a step that assumes knowledge you don't have, a doc that's wrong — **write it down** (what you did, what you expected, what happened). That friction log is a real deliverable; it's what hardens `setup.sh` and the README for the public path. Don't push through silently.

---

## Learning objectives

By the end of this module you will be able to:

- Install the playbook plugin and agents, and confirm both are active.
- Run `pm-setup` and explain what each field in the resulting `pm-config.md` controls.
- Start a thread and get the `pm-coach` skill to respond as a thinking partner.
- Confirm your issue tracker and product folder are connected to your notes.
- Capture an install-friction log honestly enough that someone else could fix what you hit.

---

## Concept reading

There isn't much concept here — it's setup. The one idea worth holding: **`pm-config.md` is the spine.** Every PM skill and agent reads it to learn your notes system, your issue tracker, and your *current desired outcome*. If a skill ever behaves like it doesn't know your context, the first thing to check is whether `pm-config.md` exists and is current. You generate it once per project with `pm-setup`, and you update it whenever your desired outcome changes (which, in this model, is rarely — outcomes are stickier than features).

**Go deeper:** [README](../README.md) for the canonical install, [PM Tool Integration Guide](../PM%20Tool%20Integration%20Guide.md) for tracker-specific setup (Linear, Jira, JPD, or Markdown-only), and [How to Use the Agents](../How%20to%20Use%20the%20Agents.md) for what each agent does once it's installed.

---

## Hands-on exercise: stand up your environment

Work top to bottom. Don't skip the verification line under each step — that line *is* the smoke test.

### Step 1 — Install the plugin and agents

```bash
# Install the plugin (installs the PM skills)
claude plugins add richardbowman/agent-pm-playbook

# Install the agents (symlinks agent files into ~/.claude/agents/)
git clone https://github.com/richardbowman/agent-pm-playbook
cd agent-pm-playbook
./setup.sh
```

> Tip: run `./setup.sh --dry-run` first to preview exactly what it will symlink before it touches `~/.claude/`.

**Verify:** `setup.sh` reports the agents and skills it installed, with no red errors. In a Claude session you can reference the `pm` agent and the `pm-coach` skill without "unknown skill/agent" errors.

### Step 2 — Set up your notes + threads (Obsidian)

Install Obsidian, then the **Claude Threads** plugin (so Claude can work inside your notes), your **issue-tracker integration** (Linear, or see the integration guide for Jira/JPD), and **Vault Bridges** (to link your product folder into the vault).

**Verify:** Obsidian opens; you can start a Claude thread from inside it.

### Step 3 — Run `pm-setup`

In a thread, invoke the setup skill:

```
Run the pm-setup skill to configure my notes system, issue tracker, and current desired outcome.
```

Answer its questions: where your notes live, which tracker you use, and — importantly — the **current desired outcome** for this product. (Reach back to Module 0: this is the measurable behavior change you're managing toward, not a feature.)

**Verify:** a `pm-config.md` file now exists in your project, and its fields match what you entered.

### Step 4 — Wake up the PM coach

Start a fresh thread and ask a PM question:

```
Help me frame what I learned from a couple of customer conversations this week.
```

**Verify:** the `pm-coach` skill engages as a thinking partner — asking about outcomes and evidence — rather than just answering generically.

### Step 5 — Confirm the connections

- **Tracker:** confirm an issue from your tracker is visible/syncable in your notes (per the integration guide for your tool).
- **Bridge:** confirm your product's folder (repo or docs) is bridged into the vault and searchable.

**Verify:** you can find a real issue and a real product file from inside your notes without leaving Obsidian.

**Deliverable:** a working environment **and** a friction log — a short list of every place a step failed, was unclear, or assumed context you didn't have. (An empty friction log is a valid, great result — but only if you actually hit nothing.)

---

## Success criteria

- [ ] `setup.sh` completed and the 6 agents + PM skills are available.
- [ ] `pm-config.md` exists and its `desired outcome` field is a measurable behavior change (Module-0 standard), not a feature.
- [ ] `pm-coach` responds *as a coach* in a thread — it asks about outcomes/evidence, it doesn't just answer.
- [ ] Your issue tracker syncs and your product folder bridges into the vault — you found one real item of each from inside your notes.
- [ ] You produced a friction log (even if it's "no friction").

---

## Common failure modes

| Symptom | What's going wrong | Fix |
|---|---|---|
| `claude plugins add` or `setup.sh` errors | Tooling not installed, or wrong directory | Confirm Claude Code is installed and current; run `setup.sh` from inside the cloned repo; try `--dry-run` to see what it expects. Log the exact error. |
| Skills don't trigger ("unknown skill") | Plugin installed but session can't see it | Restart the session; confirm the plugin shows as enabled. If it persists, this is a real install bug — log it with the exact command. |
| `pm-coach` answers generically instead of coaching | No `pm-config.md`, or it's empty/stale | Re-run `pm-setup`. The coach leans on your config for context; without it, it can't anchor to your outcome. |
| `desired outcome` is a feature ("ship the new onboarding") | Module-0 lesson didn't carry over | Rewrite it as a measurable behavior change ("raise day-2 activation from X% to Y%"). Every downstream skill inherits this framing. |
| You "just got it working" but skipped the friction log | Understandable, but it defeats the smoke-test purpose | Reconstruct it from memory now. The next adopter — and the public install path — depends on what you hit. |
| Tracker won't sync | Tool-specific auth/config gap | Follow the [PM Tool Integration Guide](../PM%20Tool%20Integration%20Guide.md) section for your tracker; if Markdown-only, note that and move on — modules work tool-agnostically. |

---

## Next

Environment's live. Time to build the structure the whole operating model hangs on — your first Opportunity Solution Tree, on the shared sample product.

→ **[Module 2: Your First OST](module-2-your-first-ost.md)**
