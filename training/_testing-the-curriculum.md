# Testing the Curriculum (Agent-as-Learner QA)

> Maintainer doc — not part of the learner path. This is how we QA the training modules *before* a real adopter hits them, and the log of test runs we've done. Underscore-prefixed so it sorts with `_module-template.md` and stays out of the learner sequence.

## Why this exists

The author of a module is the worst person to test it. They unconsciously fill every gap from context the doc never states — so a module that *feels* complete can still be unfollowable by someone who only has the file. The roadmap calls this out directly: the "can someone else learn this from the docs alone" signal is otherwise deferred until a real pilot PM joins.

The **agent-as-learner** harness closes that gap cheaply: spawn a fresh agent that sees **only one module file** plus a **brand-new product it has never seen**, tell it to do the exercise for real, and have it report both the artifact it produced *and* every place the doc failed it. A fresh agent with no playbook context is a far more honest "naive learner" than the author. It costs minutes and needs no human pilot.

## The method

1. **Invent a fresh theoretical product** — *not* ShiftLoop. ShiftLoop is the curriculum's own sample, so its answer keys are baked into the modules; testing on it just confirms the answer key. Pick a product with a **different shape** to stress generalization (e.g., ShiftLoop is B2B multi-persona, so test with a B2C single-persona product — that surfaces every place the modules assume a buyer/user split or an issue tracker).
2. **One agent per module.** Each agent reads **only** its module file (and any file the module *explicitly* tells a learner to open). It must not read the rest of the playbook, the skills, or other modules' answer keys.
3. **Make it do the exercise for real** on the new product, then check itself against the module's own Success criteria.
4. **Require a structured report:** (A) the artifact, compactly; (B) a **friction log** — every unclear/missing/assumed/hard-coded-to-the-sample spot, each with a suggested fix; (C) a **generalization gap** note — does the module tell a learner what to do on their *own* product?; (D) a one-word **verdict**: Clean / Minor friction / Blocked.
5. **Respect dependencies.** Modules that consume a prior module's artifact must be fed that artifact. Run independent modules in parallel; chain the dependent ones. (Module 0, 1, 2 are independent; Module 3 needs Module 2's OST.)
6. **Synthesize and fix.** Collect verdicts, cluster the cross-cutting findings (they matter more than any single-module nit), apply fixes, and — ideally — re-run the harness against the fixed modules to confirm closure.

### Reusable agent prompt (template)

```
You are a product manager going through a training curriculum for the first time.
You are testing whether this ONE module can be followed by a learner who has only
this module file and their own product. Do NOT read other training files, skills,
or playbook docs except those the module explicitly tells you to open.

READ ONLY: <absolute path to the module file>

YOUR PRODUCT: <a fresh fictional product, different in shape from ShiftLoop —
include persona(s), the desired outcome, and whatever context the exercise needs>
<for chained modules, paste the prior module's artifact here>

DO THE MODULE FOR REAL: follow the instructions literally, produce the deliverable
for YOUR product, and check yourself against the module's Success criteria.

THEN REPORT (<~500 words):
A) Artifact — what you produced, compactly.
B) Friction log — every place the module was unclear, assumed context you don't
   have, gave an unfollowable instruction, or was hard-coded to the sample product.
   Each with the fix.
C) Generalization gap — does the module tell a learner what to do on their OWN
   product vs. the sample? What's missing for the real-product / capstone path?
D) Verdict — Clean / Minor friction / Blocked, one sentence why.
```

Use the `general-purpose` agent type. For a doc that can't be executed (e.g., the
install module), instruct the agent to perform a **doc audit** instead — walk each
step as if executing it and judge whether it's unambiguous, complete, and verifiable.

## What a run produces

- **A pass/fail read on every module** before adopters hit it.
- **A friction log** that is the raw material for the Build #4 troubleshooting guide — i.e., you can seed the troubleshooting guide without waiting for a human pilot.
- **Repo-level bug findings** that fall outside `training/` (logged below for a separate change).

---

## Run log

### Run 1 — 2026-06-10 — product: "Strum" (B2C, single-persona guitar-learning app)

Tested Modules 0–3 (the Phase-1 curriculum). Chose a B2C single-persona product specifically to stress the modules' ShiftLoop-shaped (B2B, manager/buyer/staff, issue-tracker) assumptions.

| Module | Verdict | Headline finding |
|---|---|---|
| 0 — Operating Model | Clean (minor) | Self-contained; two day-one "go deeper" links unfollowable; "accountable this quarter" assumes OKRs. |
| 1 — Environment Setup | **Blocked** | Plugin names with no install steps; tracker-sync requirement unsatisfiable for a notes-only solo PM and not marked optional. |
| 2 — Your First OST | Minor friction | Method generalized cleanly; all exercise scaffolding hard-coded to ShiftLoop; facilitator key sat in the exercise file. |
| 3 — Signal Synthesis | Minor friction | Method transferred; exercise read as a guided tour of the answer key; Severity used but never defined; no worked ledger example. |

**Cross-cutting findings → all fixed in commit `b0b69c9`:**
1. No "bring your own product" path — Modules 2 & 3 baked ShiftLoop into the steps and success criteria. → BYO sidebars + templatized language + abstract success criteria.
2. B2B/multi-persona/tracker assumptions leaked through. → Module 1 split into required core vs. optional stack; persona language templatized.
3. Module 1 install gaps (the only Blocker). → `setup.sh` made the primary verified path; marketplace path flagged.
4. Module 3 Severity table + worked ledger example added; confidence-vs-intensity override; flexible contradiction count.
5. Facilitator keys split out of the exercise files into `sample-data/facilitator-key.md`.

**The method validated itself:** the concepts generalized to a totally different product with no help; only setup/scaffolding broke — exactly the class of problem a fresh-eyes test is designed to catch. The Module 2 agent independently caught all 5 planted seed-OST flaws with no false positives, confirming that exercise works.

**Not yet re-tested:** the fixed modules have not been put back through the harness. Recommended before the public-polish pass (Build #7).

---

### Run 2 — 2026-06-10 — product: "Parcel" (B2C, single-persona artisan food subscription app)

Full-curriculum pass: Modules 0–6 + capstone. Chose a B2C single-persona solo-founder product to stress both B2B assumptions (carried from ShiftLoop) and team-participation assumptions. Each module ran as a fresh agent with only its module file; chained modules were fed their predecessor's artifact.

| Module | Verdict | Headline finding |
|---|---|---|
| 0 — Operating Model | Minor friction | No fallback for teams with no formal roadmap; no verbatim fallback in Step 3 for pre-evidence PMs. |
| 1 — Environment Setup | **Blocked** | Claude Code install step still absent (Step 0); clone URL uses `richardbowman` not `rbcodelabs`; "Claude session" undefined; no project directory context for pm-setup. |
| 2 — Your First OST | Minor friction | Skill trigger assumes harness running (no fallback); ShiftLoop manager/staff example has no B2C parallel; Part B "focus" check trivially passes for solo founder. |
| 3 — Signal Synthesis | Minor friction | Delight signals (positive confirmations) have no handling recipe; BYO sidebar doesn't say to skip skill invocation on manual path. |
| 4 — Experiments & Investment | Minor friction | Kill-condition time-horizon not calibrated to monthly/long-cadence products; no N-sizing guidance for small B2C concierge cohorts. |
| 5 — The Agent Team | Minor friction | Example delegation prompt hard-coded to ShiftLoop B2B; solo/contractor escalation path not covered for Steps 3–5. |
| 6 — Cadences & Health | Minor friction | "Name your participants" fails for true solo founders; "automate the heartbeat" vague without a link to a recipe. |
| Capstone | Minor friction → trending Blocked (self-directed) | No signal volume floor; rubric unclear that it scores test **design** not whether test ran; Test Minimalism 1/2 boundary hard to self-score. |

**Cross-cutting findings:**

1. **M1 still Blocked after Run 1 rewrite** — the Run 1 fix addressed plugin names and optional-stack framing correctly, but missed the Claude Code install step and the wrong org in the clone URL. Both re-found in Run 2. Fixed in this commit.
2. **Solo-founder participation gap** persists across M5, M6, and Capstone. The modules give a non-technical escape hatch but not a solo-founder escape hatch for cross-functional exposure. Fixed in M5 BYO note and M6 Step 5.
3. **Skill invocation assumes live tooling** — across M2, M3, M4, M5, "trigger the skill / spawn it" steps have no manual fallback. Fixed in M3 BYO callout; others documented for Build #4.
4. **Monthly/long-cadence products underserved in M4** — the kill condition examples use days; monthly cycles need explicit guidance. Fixed in M4 Step 5.
5. **Capstone is not reliably self-assessable** on Test Minimalism and "signal volume floor" without fixes. Fixed in this commit.

**All Run 2 findings fixed in commit (see next commit SHA after this one).**

**Still open for Build #4 (troubleshooting guide):**
- M2: Skill trigger fallback for non-harness users (add a "manual path" note to Step 1)
- M4: N-sizing guidance for small-cohort concierge tests
- M6: "Automate the heartbeat" — link to a concrete recipe
- Capstone: No exemplar / worked submission; "certified" implies a reviewer but none named for solo path

---

## Repo-level bugs found (outside `training/` — fix separately)

These surfaced during Run 1 but live outside the training folder, so they're parked here rather than fixed in the curriculum branch:

- **`README.md`** — install command `claude plugins add richardbowman/agent-pm-playbook` appears wrong/outdated, and it uses the `richardbowman` org while the active remote is `rbcodelabs`.
- **`.claude-plugin/plugin.json`** — stale vs. the repo: `name` is `agentic-product-team` while `marketplace.json` calls the plugin `agentic-pm`; it lists only 3 skills and 5 agents, missing several skills and the `release-manager` agent that `setup.sh` actually installs.
