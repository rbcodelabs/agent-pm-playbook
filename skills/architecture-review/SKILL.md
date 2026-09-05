---
name: architecture-review
description: >-
  Evidence-based architecture review of an application — a read-only, multi-pass
  audit that produces decision-ready findings, ADR candidates, and a prioritized
  remediation backlog. Pass A assesses architectural risk against the roadmap;
  Pass B assesses maintainability and code health. Use when asking "can this
  architecture absorb what we plan to build?", "what will be expensive to change?",
  before a major migration or platform extension, or when a system is about to
  take on untrusted input, a new platform, or sync.
metadata:
  priority: 5
  docs:
    - https://github.com/richardbowman/agent-pm-playbook
retrieval:
  aliases:
    - architecture review
    - architecture audit
    - code health review
    - maintainability review
    - tech debt assessment
    - refactor assessment
  intents:
    - review our architecture
    - is this architecture sound
    - what will be expensive to change
    - audit this codebase
    - where is our technical risk
    - should we refactor this
    - can this handle what we want to build next
chainTo:
  - pattern: "ready to build|should we build|worth doing|invest|how much.*effort|commit to this"
    targetSkill: investment-gate
    message: Switching to investment gate to assess whether an accepted finding is ready to become committed work
  - pattern: "roadmap|sequence|next quarter|when should we|schedule this|prioriti"
    targetSkill: roadmap-workflow
    message: Switching to roadmap workflow to sequence accepted findings against existing commitments
  - pattern: "implement|start building|let's fix|do the refactor|write the code"
    targetSkill: design-before-code
    message: Switching to the design gate — a review finding is not an implementation plan
---

# Architecture Review

**This review is READ-ONLY. It changes nothing and commits to nothing.**

A repository dump is not an architecture review. Dumping a codebase into context
biases toward whatever files happen to fit, overweights code smells, and produces
generic best-practice advice. This skill exists to prevent that.

Two passes, different questions:

| Pass | Question | Run it when |
|---|---|---|
| **A — Architecture & Risk** | Can this architecture absorb the next 12 months? | Default. Always run first. |
| **B — Maintainability** | What will be expensive or unsafe to change over two years? | When the concern is code health, velocity, or refactor planning. |

Pass B is only worth running on its own if Pass A already exists.

---

## Operating discipline — every stage, no exceptions

**Read-only.** Do not modify product code, tests, config, roadmap/PM state, or
any external system. Do not open PRs. Do not fix things you notice. Scratch
analysis scripts go in a temp dir and are deleted at the end. Confirm clean VCS
status at start and end; report both.

**Pin the revision.** Put the exact commit in every artifact. Findings without a
revision are worthless three weeks later.

**Verify before you assert.** If you delegate reading to subagents, personally
re-open and confirm every `file:line` before it enters the report. Subagents
produce excellent leads and confident errors in the same paragraph. Keep a
**Verification Log** table listing each load-bearing claim and its verdict.
Anything you could not verify is labelled **UNVERIFIED** — not softened, labelled.

**Correct yourself in public.** If your own earlier reasoning turns out wrong,
write the correction into the artifact with evidence. That record is worth more
than the appearance of consistency.

**Label epistemics.** Separate observed evidence, team-reported context, and
inference. Mark them.

**Proportionality.** Note team size and cadence. A solo maintainer and a
40-person org get different recommendations from identical code. State which you
assumed.

**Declare the model family.** Say which model runs each judgment stage. If the
independent-challenge stage runs on the same family as the primary review, say
plainly that correlated blind spots are **not** controlled for. That is a real
weakening of the method, not a disclaimer.

---

## Step 0 — Frame the review

Establish from the **authoritative planning source** (Compass, Linear, whatever
`pm-config.md` names) — *not* the repo's own docs, which are usually stale:

- what the product is for, who uses it, what the next 12 months demand
- binding constraints and non-goals already decided — **read every ADR before
  proposing anything**
- team size and delivery cadence

Then write **one review question** naming the specific capabilities the
architecture must absorb. Not "is this good architecture."

> Example: *"Can this architecture safely execute untrusted third-party plugins,
> extend to iOS, and add sync over 12 months — without breaking API
> compatibility or risking user data?"*

If the roadmap and the repo's own docs disagree about priorities, the roadmap
wins and the disagreement is itself a finding.

---

# Pass A — Architecture & Risk

## A1 — Evidence dossier

**Deterministic first.** Do not estimate what you can measure:
revision · LOC by area · **run the test suites, don't count files** · typecheck ·
dependency inventory, version drift, audit counts · CI configuration and what it
actually gates · churn hotspots from VCS history · decision records.

**Then parallel read-only agents**, one per area:
1. **Structure & boundaries** — enumerate the full IPC/API/module surface *exhaustively*
2. **Trust boundary** — how third-party or untrusted code executes, and what it reaches
3. **Data layer** — write atomicity, concurrency, conflict handling, migrations, path handling
4. **Testability, dependencies, operability**

Every claim carries `file:line`. Label OBSERVE vs INFER.

## A2 — Architect pass

Give the dossier, verified evidence, and binding constraints to a read-only
architect. Require:

- executive assessment
- **architecture map** — actors, components, data flows, trust boundaries each
  marked **REAL or NOMINAL**, and named invariants each marked upheld/violated
- **at most 10 findings** (long lists reduce signal and invite low-value cleanup)
- 2–3 options with named tradeoffs for every significant decision

## A3 — Independent challenge — DO NOT SKIP

**This is the highest-value stage in the review.** In practice it refutes
findings the primary pass was confident about and originates the most serious
one it missed.

Fresh context, blind to the architect's conclusions. Different model family if
one is available. Four jobs, in order:

1. **Hunt for what a review like this would MISS** — data-loss paths,
   concurrency, partial-failure states, crash/interruption semantics, and
   especially anywhere a **newer code path has stronger guarantees than the
   mature one**.
2. **Argue where the current architecture is already RIGHT** and would be
   actively harmed by "improvement." Weight this equally to job 1.
3. **Pre-emptively refute the obvious findings.** List what any reviewer would
   raise; argue the strongest case each is overstated, already mitigated, or not
   worth acting on; then give an honest verdict.
4. **Judge each roadmap item**: absorbable as-is / bounded change / needs a real
   decision first.

Tell it explicitly: *correct my premises if they're wrong; I would rather be
corrected than agreed with.*

## A4 — Synthesis

Every retained finding uses this schema. **No field omitted.**

| Field | Requirement |
|---|---|
| Finding | A specific condition, not a theme |
| Evidence | `file:line`, config, metric, incident, or stated constraint |
| Consequence | What breaks, slows, or costs more |
| Horizon | Now / 6 months / later |
| Impact + likelihood | With rationale |
| Confidence | Strong / medium / weak, based on evidence quality |
| Recommendation | Smallest viable response |
| Alternatives | ≥1 credible, including "do nothing" where valid |
| Cost + migration risk | Rough size and transition hazards |
| Validation | What would confirm or invalidate this |
| Artifact | ADR / backlog / experiment / monitor-only |

Mark each finding **CONFIRMED / REFUTED / ORIGINATED** by the challenge stage.

**Required sections:**
- **Rubric** scored 1–5: product alignment, boundaries/coupling, data, security,
  reliability, operability, performance, evolvability, testability, dependencies,
  cost, AI-specific. Prose evidence required for any score below 3 or above 4.
- **Refuted findings, with rationale retained** — so a future run doesn't
  resurrect them.
- **What should deliberately NOT change** — specific, generous, evidence-backed.
- **Direct answer to the review question**, broken out per capability, each with
  a verdict.
- Top 3 by impact × effort · 30/60/90 sequence with exit gates · ADR candidates
- **Open questions**, ranked by what would most change the conclusions
- **Self-critique:** What could invalidate this? Which recommendation adds the
  most accidental complexity? What failure mode might I still be missing?

---

# Pass B — Maintainability & Code Health

**Run the measurements BEFORE the reading.** They tell you where to look and stop
you inheriting the file-size prior — which is usually wrong.

## B1 — Deterministic measurement

Write throwaway scripts against the repo's own compiler/AST tooling. Do not
eyeball this.

- **Complexity** — cyclomatic, max nesting, length, parameter count per function.
  Report the **distribution** (median/mean/percentiles), not just the top N. The
  distribution is usually the headline.
- **Functions per file**, and average LOC/function per file. A 3,000-line file of
  400 small functions is a completely different problem from one of 20 large
  ones, with a different fix. Say which you're looking at.
- **Import graph** — cycles, fan-in/fan-out. **Critically distinguish
  value-level cycles (real, runtime) from type-only ones (erased at build).**
  Conflating them manufactures a crisis.
- **Duplication** — token-normalized sliding-window hashing so structural clones
  match despite renaming. Run at two sensitivities and hand-filter the noise
  (import blocks, lookup tables) rather than reporting raw counts.
- **Dead code** — classify: intentional public/API surface · test-only seams ·
  exported-but-internal · genuinely unreferenced. Separate **types** from
  **runtime values**; unused exported types are usually a non-finding. State that
  static analysis does not follow dynamic `import()` and hand-check results.

## B2 — Full reads of the largest and highest-churn files

One agent per file. For each, require:

- structural inventory (every method + LOC)
- **cohesion** — name the distinct responsibilities with line ranges. How many
  subsystems are actually in here?
- **state management** — an explicit state machine, or implicit boolean soup
  spread across closures? Can contradictory states be represented?
- the 3–5 regions most likely to be broken by a newcomer, and the **implicit
  invariant** each maintains
- within-file duplication with line pairs
- abstraction quality — leaky abstractions, boolean traps, >4 params, same
  concept under two names, coordinate/unit confusion
- comment-vs-code drift

Then the distinction that matters most:

> **Classify every major region as (a) required for external compatibility or
> format fidelity, (b) inherent complexity of the domain or framework, or
> (c) accidental.** Cite evidence — a spec line, an ADR, a test name, a
> postmortem comment.

**Only (c) is a candidate for change.** Size justified by (a) or (b) is *earned*
and must be defended, not refactored. Skipping this step turns the review into
"delete the product's reason to exist."

## B3 — Refactor-safety matrix

Cross complexity against **actual** unit-test coverage — which files do tests
*import*, not which files have similarly-named tests.

**Expect this to be inverted:** the most complex file often has the least
in-process coverage, making it the most *dangerous* to refactor rather than the
most urgent. If that holds, say so explicitly — it reverses the naive refactor
order.

Also check what the **test environment structurally forbids**. If unit tests
can't construct a class or touch the DOM, whole subsystems are unreachable by
design — and that constraint, not developer discipline, is the real coverage
ceiling.

## B4 — Output

- **Prioritized findings** ranked by two-year cost × confidence
- **Live defects found by reading.** Expect several — a maintainability lens
  finds bugs a risk lens misses. Verify each personally.
- **Extraction plan in tiers**, sequenced so each step de-risks the next. Every
  item: what moves, the new seam, expected benefit, honest risk. **Prefer moves
  over rewrites.** Where an extraction does *not* fix the underlying problem, say
  so plainly rather than overselling it.
- **What NOT to refactor** — mandatory, and usually the most valuable output.

### Default rejections — argue against these unless evidence overrides

- "Decompose the big file" **as a goal**. Justify every extraction by a *seam*,
  never by size.
- Splitting flat registration blocks — long but CC ~1, scannable, low-risk.
- Breaking cycles that are **type-only**.
- Unifying deliberately-divergent guards whose divergence is documented.
- Simplifying a mechanism introduced after a real incident.
- Decomposing a class whose shape is an external API compatibility contract.

---

## Deliverables

Two durable, cross-linked artifacts (one per pass) at the project's run-notes
path. Each carries: revision · method · **verification log** · findings ·
explicit non-recommendations · confidence and model-family caveat · an
**unchecked disposition table**.

**Nothing is work until a human dispositions it.** Per finding, offer:
**Accept now** · **Validate first** · **Defer** · **Reject (record why)**.

End with **approval gates** — the decisions only the owner can make (funding,
scope, trust posture) — held separate from things that are merely tasks.

If a roadmap item's stated cost looks understated by an order of magnitude, say
so. That reframing is often worth more than any single finding.

---

## Handoff

- Accepted structural findings → `investment-gate` before they become committed work
- Findings that change product sequencing → `roadmap-workflow`
- ADR candidates → the `architect` agent to draft
- Accepted implementation work → `design-before-code`, then `test-first`, then `verify-done`

Do **not** write findings into the roadmap or issue tracker as part of this
review. Disposition comes first; a model labelling something "high severity" is
not a decision.
