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

*Last reviewed: 2026-05-15*
