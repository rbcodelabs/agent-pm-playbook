# Module 2: Your First Loop

**Time:** 1 day
**Coding required:** No.
**Prerequisite:** [Module 1](module-1-environment-setup.md) (working environment) and a product brief — the [ShiftLoop sample brief](sample-data/product-brief.md) for practice, or your own product's brief if you're going straight to the real thing (see the *bring-your-own-product* note below).
**You will produce:** A Loop tree for ShiftLoop — one Opportunity, the Outcome it justifies, that Outcome's Key Results, and candidate Solutions with a Test — plus a health check that catches the planted flaws in the provided seed tree.

---

## Why this module

In Module 0 you traced one feature backward to an outcome. A **Loop tree** is that trace, scaled up and made permanent: **O**pportunity → **O**utcome → **K**ey **R**esult → **S**olution → **T**est. Every piece of product work traces upward to the customer need that justified it and downward to the test that will tell you whether it worked. It is the *operating system* of agentic PM — the single artifact every other activity reads from and writes to. Signals attach to it (Module 3), Tests hang off it (Module 4), and roadmap items that don't trace to it don't get built.

Get the structure right and everything downstream stays honest. Get it wrong — a solution smuggled in as an opportunity, an outcome that quietly serves a different need, a Key Result that is really a launch date — and every decision built on it inherits the error. So this module is as much about *detecting bad structure* as building good structure.

The canonical definition lives in the [Loop guide](../guides/the-loop.md). This module teaches you to use it.

---

## Learning objectives

By the end of this module you will be able to:

- Start from an **Opportunity** framed as a customer need, and recognize a solution wearing an opportunity's clothing.
- Derive the **Outcome** (a behavior change, no numbers) the Opportunity requires, and 2–3 measurable **Key Results** for it.
- Generate ≥3 meaningfully different **Solutions** under a KR and design a **Test** for the riskiest assumption of one.
- Use the `ost-workflow` skill to build and extend the tree.
- Run a **tree health check** and name which of the seven checks a tree fails.
- Pick a focus branch using evidence-weighted prioritization instead of gut feel.

---

## Concept reading

### The five levels

```
Opportunity   (a bounded, evidence-backed customer need — the root)
  └── Outcome   (the customer-behavior change we commit to; no numbers)
        └── Key Result  (measurable signal the outcome is happening; baseline → target → date)
              └── Solution  (≥3 candidate ways to move the KR)
                    └── Test  (cheapest test on one Solution assumption)
```

The IDs you'll see in the sample data: `OPP-n`, `OUT-n`, `OUT-n-KR-n`, `SOL-n`, `TST-n`.

### The rules that are non-negotiable

- **One parent each.** Outcome → Opportunity, KR → Outcome, Solution → KR, Test → Solution. A Solution that serves two KRs is split, or the second KR is recorded as a secondary link — never a second parent.
- **Opportunities are customer-centric, never company-centric.** "Managers struggle to get their team loaded" is an opportunity. "Increase conversion" is your goal, not their need.
- **Solutions never sit at the opportunity layer.** If a node names a thing you'd build ("mobile app," "redesign the wizard"), it's a Solution. Reframe it to the need it serves, then put the build under a KR.
- **The Outcome is behavior, not a number.** The numbers live in the KRs. An Outcome that contains "from 38% to 60%" has smuggled a KR into the wrong level.
- **KRs measure outcomes, not output.** "Ship the import wizard by March" is a delivery date, not a result.
- **Fan-out.** An Outcome has 2–3 KRs; a KR needs ≥3 candidate Solutions before any is chosen; a Solution needs ≥1 Test before it is built.
- **Every Test targets one specific assumption inside one specific Solution.** (You'll do this in Module 4.)

### Frame opportunities like this

> "Customers struggle to **[X]** when **[context]**" — or — "Customers need **[X]** but currently **[workaround/gap]**."

For ShiftLoop: *"Managers struggle to get their existing team and their staff's availability into the tool quickly, because both already live in spreadsheets and text messages they have to re-enter by hand."* That's a need with context — not a feature.

### The health check (memorize this table)

| Check | Red flag |
|---|---|
| Opportunity framing | A node at the opportunity level sounds like a solution or a company goal |
| Outcome clarity | Outcome contains numbers or is output-framed; or it doesn't trace to exactly one Opportunity |
| KR quality | A KR is an output ("ship X"), lacks a baseline, or an Outcome has more than 3 |
| Solution coverage | A KR has fewer than 3 candidate Solutions; or a Solution isn't parented by a KR |
| Test coverage | A Solution is being built with no Test, or no Tests closed in the last 2 weeks |
| Evidence | Opportunities with no attributed research |
| Focus & dead ideas | Team is actively working 3+ Outcomes at once; abandoned paths still shown as active instead of archived |

**3+ red flags = the tree needs a reset before any new work.**

**Go deeper:** the [Loop guide](../guides/the-loop.md), the [`ost-workflow` skill](../skills/ost-workflow/SKILL.md) (the full build + health-check + prioritization procedure), [Agentic PM Playbook](../Agentic%20PM%20Playbook.md), and [Tree Health Checks](../Agent%20Skills/Tree%20Health%20Checks.md).

---

## Hands-on exercise

Two parts: **build** a clean tree, then **diagnose** a broken one. The diagnosis half is where the skill of reading structure actually develops.

> **🎯 Doing this on your own product?** The exercise below is written around the ShiftLoop sample so everyone practices on the same material. To run it on your real product instead, make three swaps: **(1)** open *your* product brief instead of ShiftLoop's; **(2)** use *your* current goal from `pm-config.md` as the source for your Outcome and KRs instead of `38% → 60%`; **(3)** draw opportunities from *your* personas — however many you have. A single-persona B2C product has no "buyer/user split," so all opportunities come from your one user; that's expected, not a gap. Part B (the seed-tree health check) stays the same — it's a shared diagnostic drill. Note that a tree you build on your own product here won't line up with the ShiftLoop signals in Module 3; that's fine — Module 3 has its own bring-your-own-signals note.

### Part A — Build a tree from the brief (≈ 45 min)

**Setup:** Open the [product brief](sample-data/product-brief.md). Do *not* open the seed tree or the signals yet — build from the brief alone so Part B and Module 3 have something to react to.

**Steps:**

1. In a thread, trigger the skill: *"Build a Loop tree for `<product>`. Start from the opportunity; the current goal is in the product brief."* *(Sample run: "Build a Loop tree for ShiftLoop…")*

   > **No `ost-workflow` skill?** If you're working without the skill active, apply the five-level structure directly: describe your product and goal in a plain Claude thread, then ask it to help you surface customer needs (Opportunities) and walk down to Outcome, KRs, Solutions and a Test. The skill enforces good structure automatically — without it, *you're* the enforcer. Re-read the rules and the health-check table above and check your own work at each step.
2. **Start from needs, not the goal.** Surface **at least 5 candidate Opportunities**, each framed as a customer need with context. Pull them from your personas — for ShiftLoop that's managers, the buyer, and staff; for a single-persona product it's all from that one user. Resist writing solutions.
3. **Pick the root Opportunity** for this cycle (the best-bounded, best-evidenced one that your current goal depends on) and give it an ID: `OPP-1`.
4. **Derive the Outcome.** Write one sentence, behavior-framed, no numbers: what must customers do differently if you capture `OPP-1`? (For ShiftLoop: trial managers publish a complete first schedule in their first week.) Give it `OUT-1`.
5. **Write 2–3 KRs** with baseline, target, and date (`OUT-1-KR-1`, …). Your brief's activation figure becomes the headline KR here. Add a leading KR for an earlier funnel step. If a baseline is unknown, write `TBD` and create a task to measure it.
6. **Generate ≥3 meaningfully different Solutions** under your focus KR (the skill will push for a spread from incremental to transformative). Don't evaluate them yet. Each states which KR it moves and which need in the Opportunity it addresses.
7. **Name the riskiest assumption** of one Solution and write one Test (`TST-1`) to falsify it — just the assumption and a one-line test idea; Module 4 does the full design.
8. Save the tree where your notes live (per `pm-config.md`).

**Deliverable:** a saved Loop tree — ≥5 need-framed candidate Opportunities, one root Opportunity carrying an Outcome, 2–3 KRs, ≥3 Solutions under the focus KR, and one Test.

### Part B — Health-check the seed tree (≈ 45 min)

**Setup:** Now open the [seed Loop tree](sample-data/seed-loop.md). It is **deliberately broken**. Do *not* open the [facilitator key](sample-data/facilitator-key.md) yet.

**Steps:**

1. Ask the skill to run a **tree health check** on the seed tree against the seven checks.
2. Write down every structural flaw you (and the skill) find: which check it fails and why. There are **five planted flaws**; aim to catch at least four.
3. For each flaw, write the *fix* — not just "this is wrong" but "reframe it to X," "re-parent it to Y," or "move it to a different tree."
4. *Then* open the [facilitator key](sample-data/facilitator-key.md) and compare. Note anything you missed and, more importantly, anything you flagged that the key didn't — false positives teach too.
5. Finally, turn the check on **your own** Part A tree. Does it have any of the same problems?

**Deliverable:** a health-check report on the seed tree — flaws found, the check each fails, and the fix — plus a one-line verdict on your own tree.

---

## Success criteria

- [ ] Your tree starts at an Opportunity framed as a customer need, and its Outcome is a behavior change with no numbers in it.
- [ ] The measurable targets live in 2–3 KRs, each with a baseline (or `TBD` plus a task), target, and date — none are output ("ship X").
- [ ] You have **≥5 candidate Opportunities**, every one framed as a need (no solutions at the opportunity level).
- [ ] Your focus KR has ≥3 candidate Solutions, each with exactly one parent, and the riskiest assumption of one has a Test.
- [ ] On the seed tree you found **≥4 of the 5 planted flaws**, naming the failing check and a fix for each.
- [ ] You can state which single Opportunity is your **focus branch** and why (evidence + outcome-connection + now-ability).

---

## Common failure modes

| Symptom | What's going wrong | Fix |
|---|---|---|
| A node names something you'd build ("mobile app," "redesign onboarding") at the opportunity level | Solution in the opportunity layer | Ask: *what customer need does this solve?* Put the need at the opportunity level; the build goes underneath a KR. |
| The Outcome says "from 38% to 60%" | KR smuggled into the Outcome | Strip the numbers from the Outcome; put them in a KR with baseline, target and date. |
| The tree quietly grows a second Outcome for a different need ("...and reduce churn") | Outcome doesn't trace to its Opportunity | Give it its own Opportunity (and tree branch). Churn of paying accounts is a different need — nothing under it moves trial activation. |
| A Solution hanging straight off the Outcome | Missing KR level | Name which KR it moves and re-parent it there. If it moves none, it isn't ready to be on this tree. |
| A Solution that doesn't address the Opportunity above it | Orphan / outcome drift | If it doesn't serve this branch's Opportunity, it doesn't belong here. Backlog it under its own Opportunity. |
| A KR reads "Ship X by <date>" | Output dressed as a result | Ask what customer behavior shipping X is supposed to change; measure that instead. |
| Every Opportunity is unsupported | Evidence red flag | That's fine *today* — Module 3 attaches the signals. But notice which branches are pure assumption. |
| You "resolved" a contradiction by deleting one side | Smoothing over real conflict | Contested Opportunities are legitimate — flag them as contested, don't pick a winner by vote. (More in Module 3.) |
| Working three Outcomes at once | No focus | Use evidence-weighted scoring to pick one focus branch. Breadth without a focus is a red flag. |

---

## Next

You have a tree, but most of it is assumption. Time to feed it real customer signal — and watch four hours of synthesis collapse into twenty minutes.

→ **[Module 3: Signal Synthesis](module-3-signal-synthesis.md)**
