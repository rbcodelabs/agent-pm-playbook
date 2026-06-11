# Module 2: Your First OST

**Time:** 1 day
**Coding required:** No.
**Prerequisite:** [Module 1](module-1-environment-setup.md) (working environment) and a product brief — the [ShiftLoop sample brief](sample-data/product-brief.md) for practice, or your own product's brief if you're going straight to the real thing (see the *bring-your-own-product* note below).
**You will produce:** An Opportunity Solution Tree rooted in ShiftLoop's activation outcome, plus a health check that catches the planted flaws in the provided seed tree.

---

## Why this module

In Module 0 you traced one feature backward to an outcome. An **Opportunity Solution Tree** is that trace, scaled up and made permanent: one outcome at the root, the customer needs (opportunities) that block it, and the solutions you might build under each. It is the *operating system* of agentic PM — the single artifact every other activity reads from and writes to. Signals map onto it (Module 3), experiments hang off it (Module 4), and roadmap items that don't trace to it don't get built.

Get the structure right and everything downstream stays honest. Get it wrong — a solution smuggled in as an opportunity, two outcomes fighting at the root — and every decision built on it inherits the error. So this module is as much about *detecting bad structure* as building good structure.

---

## Learning objectives

By the end of this module you will be able to:

- Root a tree in a single, measurable, behavior-based desired outcome.
- Frame opportunities as **customer needs**, and recognize a solution wearing an opportunity's clothing.
- Use the `ost-workflow` skill to build and extend a tree.
- Run a **tree health check** and name which of the seven checks a tree fails.
- Pick a focus branch using evidence-weighted prioritization instead of gut feel.

---

## Concept reading

### The four layers

An OST has exactly four layers, all rooted in **one** desired outcome:

```
Desired Outcome  (exactly 1 — a measurable change in customer behavior)
  └── Opportunity (N — unmet customer needs, pains, desires)
        └── Solution (N — ways to address the opportunity)
              └── Experiment (N — a test of one assumption inside one solution)
```

### The rules that are non-negotiable

- **One tree = one desired outcome.** Two outcomes means two trees. A second outcome creeping in at the opportunity layer is the most common way trees rot.
- **Opportunities are customer-centric, never company-centric.** "Customers struggle to get their team loaded" is an opportunity. "Increase conversion" is your goal, not their need.
- **Solutions never sit at the opportunity layer.** If a branch names a thing you'd build ("mobile app," "redesign the wizard"), it's a solution. Reframe it to the need it serves, then put the build under that need.
- **Every experiment tests a specific assumption inside a specific solution.** (You'll do this in Module 4.)

### Frame opportunities like this

> "Customers struggle to **[X]** when **[context]**" — or — "Customers need **[X]** but currently **[workaround/gap]**."

For ShiftLoop: *"Managers struggle to get their existing team into the tool quickly, because their staff list already lives in a spreadsheet they have to re-enter by hand."* That's a need with context — not a feature.

### The health check (memorize this table)

| Check | Red flag |
|---|---|
| Outcome clarity | Root is output-framed, vague, or unmeasurable |
| Opportunity framing | A branch sounds like a solution or a company goal |
| Coverage | Fewer than ~5 distinct opportunities |
| Evidence | Most opportunities have no attributed research |
| Focus | Team is actively working 3+ branches at once |
| Experiment velocity | No experiments closed in the last 2 weeks |
| Dead ideas | Abandoned paths still shown as active instead of archived |

**3+ red flags = the tree needs a reset before any new work.**

**Go deeper:** [`ost-workflow` skill](../skills/ost-workflow/SKILL.md) (the full build + health-check + prioritization procedure), [Agentic PM Playbook — OST as Operating System](../Agentic%20PM%20Playbook.md), and [Tree Health Checks](../Agent%20Skills/Tree%20Health%20Checks.md).

---

## Hands-on exercise

Two parts: **build** a clean tree, then **diagnose** a broken one. The diagnosis half is where the skill of reading structure actually develops.

> **🎯 Doing this on your own product?** The exercise below is written around the ShiftLoop sample so everyone practices on the same material. To run it on your real product instead, make three swaps: **(1)** open *your* product brief instead of ShiftLoop's; **(2)** use *your* desired outcome as the root (the one in your `pm-config.md`) instead of `38% → 60%`; **(3)** draw opportunities from *your* personas — however many you have. A single-persona B2C product has no "buyer/user split," so all opportunities come from your one user; that's expected, not a gap. Part B (the seed-OST health check) stays the same — it's a shared diagnostic drill. Note that a tree you build on your own product here won't line up with the ShiftLoop signals in Module 3; that's fine — Module 3 has its own bring-your-own-signals note.

### Part A — Build a tree from the brief (≈ 45 min)

**Setup:** Open the [product brief](sample-data/product-brief.md). Do *not* open the seed OST or the signals yet — build from the brief alone so Part B and Module 3 have something to react to.

**Steps:**

1. In a thread, trigger the skill: *"Build an OST for `<product>`. The desired outcome is in the product brief."* *(Sample run: "Build an OST for ShiftLoop…")*

   > **No `ost-workflow` skill?** If you're working without the skill active, apply the four-layer structure directly: describe your product and desired outcome in a plain Claude thread, then ask it to help you surface customer needs (opportunities) and candidate solutions. The skill enforces good structure automatically — without it, *you're* the enforcer. Re-read the four-layer rules and the health-check table above and check your own work at each step.
2. Confirm the **root** with the skill: it must be your activation/desired outcome (for ShiftLoop, 38% → 60%), behavior-based and measurable. If you phrase it as a feature, let the skill reframe you — that's the lesson.
3. Surface **at least 5 opportunities**, each framed as a customer need with context. Pull them from your personas — for ShiftLoop that's managers, the buyer, and staff; for a single-persona product it's all from that one user. Resist writing solutions.
4. Under your two strongest opportunities, generate **3 solution directions each** (the skill will push for at least three, spanning incremental to transformative). Don't evaluate them yet.
5. Save the tree where your notes live (per `pm-config.md`).

**Deliverable:** a saved OST — one outcome, ≥5 need-framed opportunities, solutions under the top two.

### Part B — Health-check the seed tree (≈ 45 min)

**Setup:** Now open the [seed OST](sample-data/seed-ost.md). It is **deliberately broken**. Do *not* open the [facilitator key](sample-data/facilitator-key.md) yet.

**Steps:**

1. Ask the skill to run a **tree health check** on the seed OST against the seven checks.
2. Write down every structural flaw you (and the skill) find: which check it fails and why. There are **five planted flaws**; aim to catch at least four.
3. For each flaw, write the *fix* — not just "this is wrong" but "reframe it to X" or "move it to a different tree."
4. *Then* open the [facilitator key](sample-data/facilitator-key.md) and compare. Note anything you missed and, more importantly, anything you flagged that the key didn't — false positives teach too.
5. Finally, turn the check on **your own** Part A tree. Does it have any of the same problems?

**Deliverable:** a health-check report on the seed OST — flaws found, the check each fails, and the fix — plus a one-line verdict on your own tree.

---

## Success criteria

- [ ] Your tree's root is a measurable behavior change, not a feature or a metric you control directly.
- [ ] You have **≥5 opportunities**, every one framed as a customer need (no solutions at the opportunity layer).
- [ ] Your top two opportunities each have ≥3 candidate solutions.
- [ ] On the seed OST you found **≥4 of the 5 planted flaws**, naming the failing check and a fix for each.
- [ ] You can state which single opportunity is your **focus branch** and why (evidence + outcome-connection + now-ability).

---

## Common failure modes

| Symptom | What's going wrong | Fix |
|---|---|---|
| A branch names something you'd build ("mobile app," "redesign onboarding") | Solution in the opportunity layer | Ask: *what customer need does this solve?* Put the need at the opportunity layer; the build goes underneath. |
| The tree quietly grows a second root ("...and reduce churn") | Multiple outcomes in one tree | Split it. Churn is a different outcome → a different tree. Nothing under it moves *activation*. |
| A branch that doesn't ladder up to the outcome | Orphan / outcome drift | If it doesn't serve the root outcome, it doesn't belong on this tree. Backlog it elsewhere. |
| A solution hanging straight off the root | Missing opportunity layer | Name the customer problem it addresses and insert it between root and solution. |
| Every opportunity is unsupported | Evidence red flag | That's fine *today* — Module 3 attaches the signals. But notice which branches are pure assumption. |
| You "resolved" a contradiction by deleting one side | Smoothing over real conflict | Contested opportunities are legitimate — flag them as contested, don't pick a winner by vote. (More in Module 3.) |
| Working three branches at once | No focus | Use evidence-weighted scoring to pick one focus branch. Breadth without a focus is a red flag. |

---

## Next

You have a tree, but most of it is assumption. Time to feed it real customer signal — and watch four hours of synthesis collapse into twenty minutes.

→ **[Module 3: Signal Synthesis](module-3-signal-synthesis.md)**
