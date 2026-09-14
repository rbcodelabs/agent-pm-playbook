# Future Improvements — Agentic PM Playbook

> Logged improvements identified through systematic review of the playbook, Agent Capability Framework, and Agent Skills library. Organized by priority and area.

---

## ✅ Completed

### How to Use the Agents
**Added:** 2026-05-15
A human-readable guide to all six agents — what each one does, when to invoke it, example natural language invocations, how orchestration and parallel execution work, and the team handoff workflow. Replaces the tool-use-only documentation that previously existed.
**File:** [[How to Use the Agents]]

---

### Signal Ledger Template *(was High Priority #1)*
**Added:** 2026-05-15
Full signal ledger artifact with tool-agnostic schema, copy-paste entry template, severity definitions, week-to-week workflow, and three tool implementations (JPD + Jira, Linear + Obsidian, Markdown-only). Linked from Section 3.2 and from the Longitudinal Pattern Tracking skill doc.
**File:** [[Signal Ledger]]

---

### PM Tool Integration Guide *(new — was implicit gap in Section 4)*
**Added:** 2026-05-15
Full tool mapping for the six OST layers across three stacks. JPD + Jira: Insights as the signal ledger layer, Opportunity/Solution/Test issue types, status workflows, experiment issue template, JPD automation rules, and an explicit Insights vs. Learnings distinction. Linear + Obsidian: layer mapping, OST as source of truth in Obsidian, Linear issue conventions, signal handoff protocol. Markdown-only: file structure, inline status/confidence tagging, weekly 10-minute review. Replaces and greatly expands Section 4 of the main playbook.
**File:** [[PM Tool Integration Guide]]

---

### Discovery Health Metrics *(new)*
**Added:** 2026-05-15
Diagnostic metrics for a healthy discovery practice across four categories: cadence (synthesis frequency, ledger gaps, OST freshness), coverage (segment diversity, source type diversity, opportunity freshness, unmapped signal rate), evidence quality (confidence floor, verbatim coverage, experiment coverage, stale experiment flag), and honesty indicators (kill rate, confidence distribution, solution count per opportunity). Includes a monthly health check agent prompt. Partially addresses High Priority #2 (evidence thresholds for build commitment).
**File:** [[Discovery Health Metrics]]

---

### Continuous Feedback Streams *(new)*
**Added:** 2026-05-15
Covers the two compounding sourcing problems: no warm participant pool and no synthesis rhythm for passive feedback. Drip vs. interview synthesis comparison, hybrid time-plus-volume synthesis trigger (weekly triage, full synthesis at 20+ responses or 2-week floor), signal ledger logging conventions for stream signals, contextual trigger and follow-up prompt techniques for improving richness, continuous recruiting habit, participant pool schema, re-interview cadence, and converting feedback respondents to warm interview candidates.
**File:** [[Continuous Feedback Streams]]

---

## 🔴 High Priority

### ~~1. "When Have We Discovered Enough to Build?" Framework~~ ✅ Done
**Added:** 2026-05-15
Fully resolved by [[Progressive Investment Framework]]. The doc replaces the binary "are we ready to build?" question with a five-stage progressive investment model (Exploring, Validating, Testing, Building, Scaling). Each stage has an explicit question being answered, evidence threshold to enter, investment ceiling, and exit condition. Includes full experiment type vocabulary (fake door, concierge, prototype, A/B, staged rollout) with examples, specific transition gate checklists, and holding-the-line language for both stakeholder pressure and engineer pressure. Includes an agent prompt for gate readiness assessment and full tool status mapping for JPD and Linear.

---

### 2. Opportunity Sizing Prompt Missing from Formal Prompt Library
**Area:** Playbook Section 6
**Gap:** Section 3.3 has a solid opportunity sizing prompt built into the workflow narrative ("How many users experience this? How often? How much does it matter to them?") and references a Reach × Frequency × Importance vs. Risk scorecard. But Section 6 (the Prompt Library) doesn't include an opportunity sizing/prioritization prompt. The prompt library is what practitioners reference day-to-day — the workflow section gets skimmed after the first read.
**Fix:** Add a formal "Opportunity Prioritization" prompt to Section 6 that includes: the Reach × Frequency × Importance framework, the devil's advocate counter-argument technique, and the PM judgment prompt ("What would I need to believe for this to be our top opportunity?").

---

### 3. Cross-Functional Team Discovery Participation
**Area:** Playbook Section 3.2 / Cadences Section 5
**Gap:** Torres is explicit that continuous discovery is a team sport — product trios (PM, designer, engineer) attend interviews together weekly. The playbook treats discovery as entirely PM-led. There's no guidance on how to involve design and engineering in weekly interviews, what their role is, or how to handle it when org structure makes this difficult. This is a real anti-pattern (solo PM discovery) that the playbook currently validates by omission.
**Fix:** Add a brief "Discovery as a Team Practice" sub-section under 3.2 or 5. Cover: why the trio matters, what each role observes for, how to debrief as a trio, and minimum viable version when a full trio isn't possible.

---

### 16. Test-Cost Economics Are Hardcoded to Human-Team Build Costs

**Added:** 2026-09-13 · **Status:** Proposal — not yet doctrine
**Area:** [[Progressive Investment Framework]], [[Test Minimalism]], `skills/investment-gate`, `skills/experiment-workflow`

**Gap:** The Progressive Investment Framework is an arbitrage on a ratio — *cost of information* vs. *cost of building*. The principle is sound. But every rung of the experiment ladder is priced in **absolute human-team time units** rather than as a ratio to build cost, so the ladder is frozen at the prices that held when it was written:

| Where | Hardcoded price |
|---|---|
| `Progressive Investment Framework.md:119` | A/B test — "2-4 weeks of engineering to build both versions... This is not a cheap test." |
| `Progressive Investment Framework.md:15` | The founding trauma — "Six weeks of engineering later, nobody uses it." |
| `investment-gate/SKILL.md:139-146` | Cost column: "1-3 days, no engineering" / "2-4 weeks engineering + run time" |
| `Test Minimalism.md:28` | "A concierge test that fails represents one week of effort... A fully built A/B test that fails represents eight weeks of engineering." |

Had these been written as ratios ("spend no more than ~15% of build cost to buy the answer"), the ladder would self-adjust as build cost fell. Being absolute, it cannot. With AI-assisted delivery the build term has collapsed by roughly an order of magnitude while **research cost has not moved at all** — recruiting, scheduling, moderating and synthesizing 5-8 sessions is human-time-bound and got no cheaper.

The result is a partial inversion of the ladder. Rungs 2-3 (concierge, prototype) are pure human time. Rung 5 (real build) is the one that collapsed. A flagged, instrumented vertical slice can now cost *less* than the prototype study the playbook mandates before it — and yields strictly better signal, because it produces real behavior rather than test-environment behavior the docs already warn is unreliable (`Progressive Investment Framework.md:107`).

**Why agents reproduce this reliably.** It is not drift — it is trained behavior with an eval attached:

- `Test Minimalism.md:68` lists **"Building to test"** as a named failure mode: *"This is backwards. You test demand before you build, not after."*
- `Test Minimalism.md:86` makes it an **evaluation criterion** — an agent scores as *skilled* for refusing a build-first test and redirecting to fake door/concierge/prototype.
- `Test Minimalism.md:96` requires the agent to justify why it is not using the **next-lower rung** before any recommendation — a one-way ratchet downward.
- `experiment-workflow/SKILL.md:251` — prototypes must use "Figma or equivalent, **not production code**."
- `experiment-workflow/SKILL.md:256` — A/B is "a refinement tool, not a discovery tool," explicitly barred from testing demand or value. This is the specific rule that blocks *"ship the real slice to 5% and read the data."*

So when the cheapest available test is "build it," the skill library forbids the agent from proposing it and rewards the refusal.

**Note the playbook's own velocity argument now inverts.** `Test Minimalism.md:26` argues that learning velocity is the core performance variable — six experiments per quarter beats two. Re-run with current prices, that same argument favors building, because building is now often the fastest way to learn. The doc's logic is right; only its inputs are stale.

**The internal contradiction.** `build-authorization` and `compass-resolver` already assume agent delivery through a tested PR under standing policy. The *delivery* layer has been repriced for AI economics; the *investment* layer still bills a build as "one focused team, time-boxed sprint" (`investment-gate/SKILL.md:85`). The two halves of the playbook disagree about what a build costs, and the gates enforce the stale number.

**The correct principle is already in the corpus — but demoted.** Two places ask the right question:

- `experiment-workflow/SKILL.md:200` — *"If this assumption is wrong, how much work do we have to throw away?"*
- `investment-gate/SKILL.md:261-266` — *"If we are wrong about it after building, how much do we rework? ... If the answer is small, that is a reasonable case for accepting the risk and moving."*

Both are cost-of-being-wrong reasoning. But the second is buried in **Pressure Handling** and framed as a *concession to a tired team*, not as a routing rule. The fix is therefore mostly **promotion, not invention**.

**Proposed fix — re-key routing from build cost to cost-of-being-wrong.**

> cost of being wrong = build cost + carrying cost + reversal cost

AI collapsed the first term only. Carrying cost (permanent UX surface, support load, docs, edge cases, the mental-model tax on every future user) and reversal cost (data model, pricing, anything customers form habits around) are untouched. Route on the sum, which is the variable that still discriminates:

| | **Low cost-of-wrong** (reversible, contained surface) | **High cost-of-wrong** (data model, pricing, core mental model) |
|---|---|---|
| **Low demand uncertainty**<br>*(tablestakes, parity, compliance)* | **Just build it.** No discovery gate. Scope/estimate gate only. | Skip demand discovery; keep technical and design de-risking. |
| **High demand uncertainty**<br>*(novel concept)* | **Build the real slice behind a flag and instrument it.** The build *is* the cheapest test. ← *largest current waste* | **Current framework, unchanged.** Still correct. |

Three of the four cells currently receive treatment designed for the fourth.

**This subsumes the separate tablestakes/competitive-parity gap.** The playbook has no concept of tablestakes, parity, Kano-style basic-vs-delighter, or compliance-driven work (verified by search: zero hits across the corpus). The one prioritization aid that does exist — the Reach × Frequency × Importance vs. Risk scorecard at `Agentic PM Playbook.md:149` — *sizes* an opportunity but does not *classify* it by type, so it cannot route different work types to different evidence bars. Progressive Investment is therefore the only rigor engine and its entry conditions are uniform, so "every competitor has SSO and we lose enterprise deals without it" must still produce 2+ independent customer-voice sources to clear `Exploring → Validating`. Competitive and lost-deal evidence is not admissible as-is. The left column of the 2×2 fixes this without a second framework: tablestakes is simply the low-demand-uncertainty case, where *market-expectation evidence* substitutes for discovery interviews and the open question is scope and cost, not demand.

**Per-file edits proposed:**

1. **`Progressive Investment Framework.md`** — add a *Classify before you climb* section ahead of Experiment Types, carrying the 2×2. Restate ladder costs as **ratios to build cost**, keeping absolute figures as a worked example labelled with its assumed build cost. Add a sixth experiment type, **instrumented vertical slice** (real code, flagged, small cohort, kill condition intact), positioned by cost-of-wrong rather than by rung order.
2. **`Agent Skills/Test Minimalism.md`** — split the `:68` failure mode in two: *building to avoid deciding* (still a failure) vs. *building because it is genuinely the cheapest falsification* (now legitimate when cost-of-wrong is low). Rewrite eval `:86` so a skilled agent is one that **prices both options**, rather than one that always redirects away from build. Amend the `:96` ratchet to "justify the rung against cost-of-being-wrong," not "always prefer the next-lower rung."
3. **`skills/investment-gate/SKILL.md`** — add a cost-of-wrong column to the experiment table at `:139`. Promote the `:261-266` reasoning out of Pressure Handling into **Step 2** as a first-class routing question. Add the tablestakes path to `Exploring → Validating` admitting market-expectation evidence.
4. **`skills/experiment-workflow/SKILL.md`** — add `instrumented-slice` to the `experiment_type` enum at `:124` and to the Step 3 mapping table. Narrow `:256` so A/B-as-refinement-only no longer blocks a flagged real slice used for discovery. Promote `:200` from a prompt aside into a required ranking input.

**What deliberately does not change:** kill conditions before the test starts, one assumption per experiment, verbatim data in results, no moving goalposts. None of those are build-cost-dependent, and the cheap-build regime makes kill-condition discipline *more* load-bearing, not less — building faster mainly means accumulating unkilled surface faster. The bottom rung (copy/micro-content tests) also stays exactly as-is.

**Open questions for review:**
- Who assigns cost-of-wrong, and at what point? Self-assessed by the PM invites optimism bias toward "low, just build it."
- Does the carrying-cost term need its own health metric in [[Discovery Health Metrics]] — e.g. shipped-surface-per-validated-outcome — to catch the failure mode this unlocks?
- Should `build_authorization_policy` projects get the 2×2 automatically, given they have already repriced delivery?

---

## 🟡 Medium Priority

### 4. Bi-Weekly and Monthly Cadence Agent Prompts
**Area:** Playbook Section 5
**Gap:** The weekly cadence (Section 5) has an "Agent assist?" column with specific prompt types noted. But the bi-weekly and monthly cadences have no equivalent — they describe activities but give no agent prompts. These are the reflection moments where agent-assisted synthesis could save the most time (OST pruning, outcome check, pattern summary), but practitioners are left without ready-to-use prompts.
**Fix:** Add agent prompt examples for the bi-weekly OST pruning session and the monthly outcome check, following the same format as the weekly prompt library entries.

---

### 5. Evidence Threshold / Confidence Calibration in Main Playbook
**Area:** Playbook Section 3.2 and Quality Gates
**Gap:** The Confidence Tagging agent skill doc is rich and detailed, but the main playbook doesn't surface confidence calibration as a PM practice. When PMs read the playbook, they never encounter a concrete model for how confidence should update with evidence (e.g., 1 source → weak, 2+ independent sources → medium, 3+ with corroborating behavioral data → strong). This lives only in the agent skill layer, which practitioners may never read.
**Fix:** Add a brief confidence framework table to Section 3.2 (the discovery workflow) and reference it in the Quality Gates section. Doesn't need to be as detailed as the skill doc — a single table that shows what "weak / medium / strong" evidence looks like and what you can responsibly do at each level.

---

### 6. Outcome Metric Selection Criteria
**Area:** Playbook Section 3.1
**Gap:** Section 3.1 does well at distinguishing outcome-level metrics from output-level ones (the "Good/Bad" examples are effective). But it doesn't address how to *choose* between candidate metrics. Common PM confusions: leading vs. lagging indicators, proxy metrics and their failure modes, owned vs. shared metrics, north star vs. supporting metric. The agent workflow for outcome definition doesn't give the PM enough to stress-test their choice.
**Fix:** Extend Section 3.1 with a brief "Metric Selection Criteria" sub-section. Key questions: Is this metric ownable by the product team alone? Is it a leading or lagging indicator (and are you comfortable with the lag)? Does moving this metric tell you anything about customer value or only business performance? What's the risk of gaming?

---

### 7. The "Gap" Between Validated Experiments and Build Commitment
**Area:** Playbook Section 3.5
**Gap:** The experiment workflow ends with "results flow back up the tree: invalidated assumptions prune solutions; validated ones earn deeper investment." But what does "deeper investment" mean in practice? How does a PM translate a validated experiment into a build commitment? How do they communicate this decision to stakeholders? What happens when multiple experiments are all positive? The playbook leaves practitioners at the edge of a cliff.
**Fix:** Add a "From Validated to Built" transition note at the end of Section 3.5, connecting back to Section 3.6 (Stakeholder Communication) and the five quality gate questions. Even a short decision checklist ("before moving from validated solution to build commitment, confirm...") would close this gap. Connects to High Priority #1 above — these should be built together.

---

### 8. Bias Detection Integrated Into Discovery Workflow
**Area:** Playbook Section 3.2
**Gap:** Bias Detection is a Layer 4 agent skill with a dedicated doc, but the main playbook's discovery workflow (Section 3.2) never prompts the PM to check for sampling bias before acting on synthesis. A PM following Section 3.2 step-by-step would synthesize interviews and update the OST without ever asking "who is in this corpus and who isn't?" This is exactly the kind of gap that produces biased OSTs in practice.
**Fix:** Add a single "corpus intake check" step to the bulk signal triage workflow in Section 3.2 — something like: "Before treating clusters as actionable, ask: Who is in this corpus? Who is missing? What would a biased corpus look like, and does this one?" Link to the Bias Detection skill for depth.

---

### 9. Customer Segment Handling
**Area:** Playbook Section 2 / OST Layer 2
**Gap:** The playbook treats "the customer" as monolithic. In B2B products especially, admin users and end users have fundamentally different needs and pains — and serving one may actively conflict with serving the other. There's no guidance on how to represent multiple customer segments in the OST or how to handle divergent signals across segments when prioritizing opportunities.
**Fix:** Add a brief note in Section 2 (OST structure) on multi-segment products. At minimum: how to tag opportunities by segment, and what to do when opportunity A is critical for segment 1 but irrelevant to segment 2. A single example would go a long way.

---

### 10. Stakeholder Pushback Handling
**Area:** Playbook Section 7 (Anti-Patterns) / Section 3.6 (Stakeholder Communication)
**Gap:** The "Stakeholder OST" anti-pattern is identified and named (opportunities written as disguised feature requests), but the playbook offers no process for what to do when a stakeholder actively pushes back on the outcome-driven approach. Naming the anti-pattern doesn't equip PMs to handle the political reality of being told "just put it on the roadmap."
**Fix:** Add a short "Navigating Stakeholder Pressure" note to Section 3.6 or Section 7. The key moves: ground the conversation in the shared outcome, offer the stakeholder's idea as a solution hypothesis to be tested rather than dismissed, surface what assumption testing would need to show to prioritize their request.

---

## 🟢 Low Priority / Refinements

### 11. SKILL.md Prompt Library vs. Main Playbook Inconsistency
**Area:** `/skills/agentic-pm/SKILL.md`
**Gap:** The SKILL.md has abbreviated versions of the 6 prompts from Section 6. They're shorter and less actionable than the playbook versions. Over time this will create drift — the skill gets updated but the playbook doesn't (or vice versa). A PM who only uses the skill (not the playbook) gets a lower-quality prompt.
**Fix:** Either: (a) make the SKILL.md prompts identical to the playbook versions, or (b) replace the SKILL.md prompt section with links to the full prompt library and note "use the full versions in the playbook." Option B is easier to maintain.

---

### 12. OST Cycle Exit Criteria
**Area:** Playbook Section 5 / Section 2
**Gap:** The quarterly cadence implies a 3-month OST cycle but never states this explicitly. More importantly, there's no guidance on what makes an OST cycle "done" — is it time-based? outcome-based (metric reached)? Is starting fresh always the right move, or can cycles be extended? PMs entering their third month with no metric movement don't know whether to reset or push.
**Fix:** Add an "Exit Criteria" note to the quarterly cadence or Section 2. Define the conditions under which a cycle ends: outcome reached, outcome determined unreachable, or strategic pivot requiring a new outcome entirely.

---

### 13. Getting Started Checklist Missing Tree Health Check
**Area:** Playbook Section 8
**Gap:** The Getting Started Checklist walks a new PM through the setup steps but doesn't include running a health check on an existing OST (for PMs who aren't starting fresh). A PM joining a team mid-cycle with an existing tree should immediately run a health check — but this isn't mentioned.
**Fix:** Add a conditional item to the checklist: "If joining a team with an existing OST: run the tree health check prompt (bi-weekly habit) before making any changes."

---

### 14. Interview Protocol Reference
**Area:** Playbook Section 3.2
**Gap:** The playbook handles what to do *with* interview transcripts extremely well. But it says nothing about how to conduct the interviews themselves. Torres has a very specific approach (continuous discovery interviews vs. solution validation sessions, no leading questions, habit of asking "tell me about the last time you..."). A PM who doesn't know Torres's approach will feed the agent transcripts from poorly designed interviews and get biased synthesis.
**Fix:** Add a brief "Interview Approach" note to Section 3.2 — not a full interview guide, but enough to distinguish a continuous discovery interview from a usability test or solution validation session. Link to *Continuous Discovery Habits* for depth.

---

### 15. Audience Translation Workflow in Main Playbook
**Area:** Playbook Section 3.6
**Gap:** Audience Translation is a Layer 4 agent skill with a dedicated doc, but the main playbook's stakeholder communication section (3.6) only has two generic prompts (weekly status and roadmap narrative). There's no mention of adapting OST evidence for different audiences — engineering, design, executives — even though this is a frequent PM need.
**Fix:** Add a brief "Audience Translation" note to Section 3.6 linking to the skill, with one example prompt showing how the same OST evidence is framed differently for an executive vs. an engineering team.

---

*Last reviewed: 2026-09-13*
