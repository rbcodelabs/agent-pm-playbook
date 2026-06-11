# Troubleshooting Guide

> **Who this is for:** anyone stuck in the curriculum — a command didn't work, a skill won't trigger, an exercise instruction doesn't map to your situation. Each entry has a symptom, what's going wrong, and the fix.

This guide is seeded from two agent-as-learner QA runs and real friction logs. If you hit something not covered here, capture it (what you did, what you expected, what happened) and file it as a doc bug — see [`_testing-the-curriculum.md`](_testing-the-curriculum.md).

---

## Skill invocations

### "Trigger the skill" does nothing / "unknown skill" error

**What's going wrong:** the playbook agents and skills aren't installed, or Claude Code wasn't restarted after install.

**Fix:**
1. Confirm `setup.sh` ran to completion with no red errors (Module 1, Step 1).
2. Restart Claude Code: type `exit` in the session, then `claude` again.
3. Re-run `./setup.sh --force` if a previous partial install left stale symlinks.
4. If errors persist, log the exact command and output — it's a real bug.

### Working without the skill harness (skill can't be invoked at all)

Some exercises say "trigger the skill" — but if you're running a plain Claude session without the playbook skills installed, you can still do the exercise. **The skill enforces structure; without it, you enforce it yourself.** Each module's concept-reading section contains the rules the skill applies. Use those as your checklist and check your own work at each step. The method is in the docs; the skill is a productivity wrapper around it.

---

## Module 2 — Your First OST

### "Trigger the `ost-workflow` skill" — skill isn't responding

See *Skill invocations* above. Manual path: apply the four-layer rules from the concept reading directly in a plain Claude thread. Ask Claude to help you surface customer needs and candidate solutions, then run the health-check table manually against the output.

### Part B health check — I found fewer than 4 of the 5 planted flaws

Open the [facilitator key](sample-data/facilitator-key.md) and compare. The key names the exact check each flaw fails; match that to the health-check table in the concept reading. The most commonly missed flaw is a **company goal masquerading as an opportunity** (e.g., "increase revenue from enterprise accounts" — that's your goal, not a customer need). The tell: can a customer feel this as their problem? If not, it belongs elsewhere.

### "Focus branch" check trivially passes for a solo-founder / single-persona product

If you only have one persona and your tree is still small, the focus-branch check ("is the team working ≤ 2 branches?") passes by default. That's fine — the check is a flag for teams that spread too wide. For a small tree, the more useful question is: **which single opportunity has the most evidence and the clearest path to your outcome?** Work that one first, even if no others are competing.

---

## Module 4 — Experiments & Progressive Investment

### How many people do I need for a concierge test?

The exercise says "~5 trial accounts" — here's the calibration:

| Stage | N | Why |
|---|---|---|
| Exploring / Validating | 3 | Enough to pattern-match; you're checking if the problem is real |
| Testing | 5–7 | Gate-checking whether a specific solution actually works |
| Pre-build commitment | 7–10 | More confidence before committing engineering time |

These are minimums, not targets. If you can recruit more, do. **If you can't recruit even 3**, that's a finding: the cohort may not exist, may not be motivated enough, or needs a different channel. Surface it — don't adjust N down to 1 and call it a concierge test.

### What counts as a "kill condition" for a long-cadence product?

If your product has a monthly cycle (subscriptions, seasonal), a 7-day window makes no sense. Write the kill condition around **the earliest observable intermediate behavior** that predicts the outcome, not the final outcome itself.

*Example: a food subscription box testing a new "build your own box" feature can't wait 30 days for renewal data. Write: "Kill if < 3 of 5 concierge users complete the box-building flow within 5 days of invitation." Completion predicts renewal; waiting for renewal just delays the learning.*

The module already tells you to set a window that matches your cadence — this is how to write the condition when the final metric takes weeks to appear.

---

## Module 6 — Cadences & Health

### "Automate the heartbeat" — how, concretely?

The simplest recipe:

1. In a Claude Threads session inside Obsidian, invoke the `schedule` skill:
   ```
   Set up a weekly recurring agent that runs every Monday at 9am and fires the pm-signal-synthesis skill against [describe your source — e.g., "new Intercom tickets since last Monday"].
   ```
2. The skill creates a CronCreate task in the vault. Once it's running, the Monday morning workflow is: open the synthesis thread, review the clusters, write your ledger entry.

**No Obsidian?** Use a recurring calendar reminder with a saved Claude thread prompt instead. The important thing is a standing commitment — the tool is secondary.

### "Name your participants" — I'm a solo founder with no team

You need at least one other person with **unfiltered exposure to customer signal** — not your synthesis output, but actual customers. Options that count:
- A contractor or designer who joins one interview per month
- A peer founder who reviews your OST every 4–6 weeks
- An engaged customer who is on a standing monthly check-in
- A support VA who reads tickets and surfaces patterns

Even once a quarter is better than never. The risk this prevents: you become the only interpreter of customer signal, and the team (even a team of one) quietly substitutes your beliefs for customers' words.

---

## Capstone

### I don't have a cohort facilitator — who reviews my capstone?

Self-certification is valid. Score yourself against the rubric honestly, keep the scored rubric with your artifacts, and treat a "1" as a "1" — don't round up. The solo-self-review discipline is exactly what the "honest uncertainty" dimension tests: can you be a fair witness to your own work?

If you want external review, options: post to a PM community with the rubric attached, ask a peer PM to score one dimension, or ask a peer founder who knows the company context. Any honest external read is better than none.

### I'm not sure what a complete passing submission looks like

See the **[worked exemplar](sample-data/capstone-exemplar.md)** — a full fictional submission for a B2C product scored against the rubric. Use it as a shape reference, not a template to copy.

### The rubric "passing" bar — 6+ of 8 with no dimension at 0

Quick reminder: each of 4 dimensions scores 0/1/2, max total 8. You need ≥6 with no zeros. A zero in any dimension — even if you score 2 everywhere else — is an automatic re-do on that dimension. The zero dimensions (evidence quality, tree integrity, test minimalism, honest uncertainty) are the load-bearing habits; the rubric is structured so you can't coast on three strong dimensions to cover a fundamentally broken fourth.

### Signal volume — how much is enough?

No strict minimum, but:
- **A single source or a single method → Low confidence ceiling.** You can pass the capstone on thin signals if you're honest about the confidence level, but don't prioritize anything as High on a single interview.
- **Practical floor:** 2 sources or 2 methods. 3–5 interviews + a batch of tickets is solid.
- **The reflection step is your escape hatch for thin evidence.** If you only had 2 interviews, name that in the reflection, calibrate confidence accordingly, and describe what you'd collect next. Honest acknowledgment of thinness is not a deduction — it's the "honest uncertainty" dimension showing up correctly.

---

## Cross-cutting

### A skill step says "spawn the skill" but I don't know how

The general form, from any Claude Code session:
```
Run the <skill-name> skill for [your context].
```
For example: `"Run the pm-signal-synthesis skill on the following three interview transcripts: [paste]."` Skills are invoked by name in natural language — you don't need special syntax if the skill is installed.

If the skill name doesn't register, see *Skill invocations* above.

### I'm on a long-cadence product and everything feels slow

The modules are calibrated for a SaaS product with a daily or weekly feedback cycle. If your product has a monthly or seasonal cadence (subscriptions, event-based, etc.):
- **Module 4** kill conditions: write around early observable behavior, not the final metric (see above).
- **Module 6** cadences: "weekly synthesis" can mean "weekly triage of available signals + a deeper session whenever new signals arrive," not "weekly interview."
- **Capstone** Step 1: signal collection may span 2–3 weeks instead of one. That's fine — the rubric scores quality, not recency.

The operating model doesn't change; the cycle time stretches. Name the stretch in your artifacts wherever it's relevant.

### A "Go deeper" link in the concept reading is broken / returns 404

The playbook docs linked from the concept reading sections live in the parent repo and may not be published publicly. Skip the linked doc and work from the concept summary in the module — those summaries are self-contained enough to do every exercise. Log the broken link as a doc bug.
