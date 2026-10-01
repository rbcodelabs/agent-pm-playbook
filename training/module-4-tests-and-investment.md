# Module 4: Tests & Progressive Investment

**Time:** 1 day
**Coding required:** No.
**Prerequisite:** [Module 3](module-3-signal-synthesis.md) — an evidenced Loop tree with a clear focus branch. You'll work a candidate Solution under the focus KR.
**You will produce:** A focus Solution's riskiest assumption decomposed, the *cheapest* Test (`TST-n`) that could falsify it (with a kill condition written **before** the test), and an investment-gate verdict telling you what stage you're at and what clears the next gate.

---

## Why this module

By now you have an evidenced tree and a focus branch: an Opportunity, its Outcome, a KR, and candidate Solutions. The trap right here is the one the whole playbook is built to prevent: a confident PM says "the evidence is strong, let's build it," and six weeks of engineering later nobody uses the thing. Progressive Investment replaces the single, binary *"are we ready to build?"* with a staircase of cheaper questions — and this module teaches you to climb it one cheap step at a time, never betting build resources on an untested assumption.

The discipline has two halves: **decompose** (find the one assumption that, if wrong, sinks the idea) and **test minimally** (run the cheapest Test that could prove you wrong). The kill condition — written before you look at any results — is what keeps you honest.

---

## Learning objectives

By the end of this module you will be able to:

- Place a Solution (and the Opportunity behind it) on the five-stage ladder (Exploring → Validating → Testing → Building → Scaling) and name its investment ceiling.
- Decompose a solution into assumptions and rank the **riskiest** one.
- Choose the **cheapest Test type** that answers the specific question being asked.
- Write a **kill condition** and a success condition *before* running anything.
- Use the `investment-gate` skill to get an honest Ready / Not Ready / Conditionally Ready verdict and the cheapest next action.

---

## Concept reading

### The five stages — and the ceiling on each

You never ask "should we build this?" all at once. You ask five smaller questions in order, each cheaper than the final build commitment. The **investment ceiling** matters as much as the evidence threshold: it caps what you're allowed to spend before answering the stage's question.

| Stage | Question it answers | Investment ceiling |
|---|---|---|
| **Exploring** | Is this a real customer problem? | Discovery time only. No build. |
| **Validating** | Is this problem widespread enough to act on? | Discovery time + solution ideation |
| **Testing** | Does our proposed solution work? | The *cheapest* Test that answers the question |
| **Building** | Does the built thing move the metric? | One focused team, time-boxed |
| **Scaling** | Should we invest to grow this? | Full investment |

Skipping a stage means betting build resources on an assumption that hasn't been tested. Moving too slow — accumulating "more evidence" forever — is the same mistake wearing the opposite mask.

### Test minimalism — the four Test types, cheapest first

"Run a test" usually gets misread as "build the feature and measure it." That's the *most expensive* option. Three cheaper ones come first. In the Loop tree, each of these is a **Test** (`TST-n`), parented by exactly one Solution and scoped to one assumption; its result is logged against the KR it informs. **Always use the cheapest test that can answer the question.**

| Type | Answers | Cost |
|---|---|---|
| **Fake door** | Is there demand? Will users try it? | 1–3 days, no engineering |
| **Concierge** | Does the solution actually work, done manually for a few users? | 1–2 weeks, no engineering |
| **Prototype test** | Does the interaction design work? Can users complete the task? | ~1 week build + 1 week test |
| **A/B test** | Which version wins at scale? | 2–4 weeks eng + run time |

Match the test to the riskiest assumption. If the assumption is about *demand*, a fake door answers it — never run an A/B test on a question a concierge could answer.

### The kill condition is a hard gate

Before a test starts, write the specific result that would **stop** this solution. A team that hasn't written its kill condition isn't ready to test — it's ready to *rationalize results*. "Users seemed to like it" is not a result. A number crossing a line you set in advance is.

**Go deeper:** [`investment-gate` skill](../skills/investment-gate/SKILL.md) (the full gate criteria + output format), [Progressive Investment Framework](../Progressive%20Investment%20Framework.md) (the five stages and Test types in depth), the [Loop guide](../guides/the-loop.md) (where Tests sit in the tree), [Assumption Decomposition](../Agent%20Skills/Assumption%20Decomposition.md), and [Test Minimalism](../Agent%20Skills/Test%20Minimalism.md).

---

## Hands-on exercise

> **🎯 Doing this on your own product?** The exercise uses ShiftLoop's focus branch so everyone practices on the same material. To run it on your real product, swap in *your* focus Opportunity, Outcome, KR and candidate Solutions from Module 3. The method — decompose, pick the cheapest test, write the kill condition, run the gate — is identical; only the inputs change. Where a step names ShiftLoop's roster-import example, treat it as the worked answer for the sample and substitute your own.

**Setup:** Open your Module 2/3 tree and pick the **focus branch**. For ShiftLoop that's `OPP-1` (getting the existing team and availability into the tool — roster-import friction is the highest-evidence part), through `OUT-1` and `OUT-1-KR-1` (7-day activation 38% → 60%), with candidate Solutions like `SOL-1` spreadsheet auto-import and `SOL-3` org-level roster push. Pick one Solution to test.

**Steps:**

1. **Locate the stage.** Using the five stages, where is this Opportunity right now? (ShiftLoop roster-import has 5+ independent signals across methods → it's cleared Exploring and Validating; it's entering **Testing** — the question is now "does our proposed Solution actually move `OUT-1-KR-1`, i.e. get them to a published schedule?")
2. **Decompose the Solution into assumptions.** Pick one candidate Solution (here `SOL-1`) and list what must be true for it to work. For "spreadsheet auto-import": that managers *have* a spreadsheet, that import *removes the thing that makes them quit*, that they then *publish* rather than stalling somewhere else.
3. **Rank the riskiest assumption** — the one that, if false, sinks the Solution. (Here: *removing import friction actually gets a manager to a published schedule* — demand is already evidenced; the risk is that the blocker isn't really import, or that they stall at the next step.)
4. **Pick the cheapest Test that answers it.** Don't build. A **concierge** Test (`TST-1`) fits: manually import the staff list for ~5 trial accounts and watch whether they publish. (A fake door answers demand — but demand is already proven here, so it's the wrong Test.)

   > **N-sizing for small cohorts:** "~5 accounts" is calibrated for a Testing-stage concierge Test on a product with existing users. If you're at Exploring or Validating, or recruiting is hard, **3 is enough** to pattern-match — you're not computing statistical significance, you're checking whether the problem is real. Raise to 7–10 when gate-checking a build commitment. If you can't recruit even 3 willing participants, treat that as a finding: a concierge Test that can't recruit is evidence the cohort doesn't exist, isn't motivated enough, or needs a different channel to reach. Surface it rather than adjusting your N down to 1.
5. **Write success and kill conditions — before running.** e.g., *Success: ≥3 of 5 concierge accounts publish a first schedule within 7 days. Kill: ≤1 of 5 publishes (the blocker isn't import — go back to discovery on `OPP-1`).* **Set your time window to match your product's natural cadence** — a B2B daily-use tool might measure in days; a monthly subscription or seasonal product needs a window of weeks or months. If your product's feedback cycle is long, a 30-day window checking an intermediate behavior (e.g., "used the thing once") beats a 90-day window checking retention. State the window alongside the condition.
6. **Run the gate.** Trigger the skill: *"Run an investment-gate assessment on this Solution."* Give it the stage, the Opportunity + evidence, the KR it moves, and your Test design. Read the verdict (Ready / Not Ready / Conditionally Ready), the per-criterion table, and the single cheapest next action.

**Deliverable:** a one-page Test brief — Solution and parent KR, riskiest assumption, chosen Test type + why, success + kill conditions — and the investment-gate verdict with its next action.

---

## Success criteria

- [ ] You named the Solution's (and its Opportunity's) **current stage** and its investment ceiling.
- [ ] You ranked a single **riskiest assumption**, and it's genuinely the load-bearing one (if it's false, the Solution fails).
- [ ] Your Test has exactly one parent Solution, and you know which KR its result will inform.
- [ ] You chose the **cheapest** Test type that answers *that* assumption — and can say why a cheaper one wouldn't and a pricier one is overkill.
- [ ] You wrote a **kill condition** as a specific number/line, *before* any results.
- [ ] The `investment-gate` verdict is honest — if a criterion is "Partially," you did not round it up to "Yes."

---

## Common failure modes

| Symptom | What's going wrong | Fix |
|---|---|---|
| "Evidence is strong, let's just build it" | Skipping Testing; betting build resources on an untested assumption | Name the riskiest assumption and the cheapest test first. Strong Opportunity evidence ≠ a tested Solution. |
| The test is "build it and measure" | Reached for the most expensive Test | Walk the four types cheapest-first. Ask what *specific* question you're answering; usually a fake door or concierge answers it. |
| Riskiest assumption is actually a safe one | Decomposed but mis-ranked | Ask: "which of these, if false, kills the solution?" Demand that's already evidenced isn't the risk. |
| No kill condition, or a vague one | Set up to rationalize results | Write a number/line in advance. "Like it" isn't a result; "≤1 of 5 published" is. |
| Gate verdict rounds "Partially" up to "Ready" | Pressure to move forward | The gate's job is honesty. A partial is a gap — name it and take the cheapest action to close it. |
| Stuck accumulating "more evidence" | Moving too slow — the opposite failure | The ladder cuts both ways. If you've cleared the gate, the next action is to *advance*, not gather more. |

---

## Next

You've validated (or killed) a Solution cheaply. When one survives, it's ready to become real work — handed to the agent team while you hold the judgment.

→ **[Module 5: The Agent Team](module-5-the-agent-team.md)**
