# Opportunity Validation

> The gatekeeper skill for OST quality: determining whether a candidate opportunity represents a genuine customer need or a stakeholder desire dressed up as discovery.

**Layer:** 2 — OST Integrity & Maintenance
**Companion:** [[Agentic PM — Agent Capability Framework]]

---

## What This Skill Is

Opportunity validation is the agent's ability to apply consistent quality criteria to every candidate opportunity before it enters the Opportunity Solution Tree — and to audit existing opportunities that may have slipped in without meeting those criteria. An opportunity earns its place in the tree by satisfying three conditions simultaneously: it is expressed in the customer's voice (behavioral language, not feature language), it is backed by at least two independent evidence sources, and it connects to the team's current desired outcome. All three conditions must hold. Passing two out of three is not a pass.

The customer voice test is the most nuanced. Customer voice means the opportunity describes what a customer experiences, feels, or struggles with — not what a customer should be able to do. "Users need a way to pick up where they left off" fails this test because "a way to" is the structure of a solution request. The correct reframe — "Users lose track of where they were after a multi-day gap" — describes a behavioral reality observed in research. The distinction sounds subtle, but it has enormous downstream consequences. A solution-language opportunity pre-narrows the solution space to one category of fix. A customer-voice opportunity leaves the space open: maybe the right response is a resume prompt, maybe it's better session persistence, maybe it's a change to content structure. The agent must be able to make this call reliably without the PM reviewing every entry.

The two-source rule exists because single-source opportunities are almost always premature. One interview where a user mentions a pain is a signal to investigate — it is not an opportunity. Two independent sources (e.g., two separate interviews, or one interview plus a support ticket cluster) are the minimum threshold for treating something as a pattern worth placing in the tree. "Independent" is load-bearing: two quotes from the same interview session are one source, not two. Two tickets about the same feature request from the same power user are one source. The agent should understand what makes sources independent and apply that standard when evaluating submissions.

The outcome connection test catches a failure mode that emerges over months rather than days: opportunity drift, where the OST accumulates branches that are genuinely customer-voiced and evidence-backed but no longer connect to the metric the team is trying to move. A team focused on reducing time-to-first-value may have once found real evidence of confusion around onboarding sequence — but if the team's outcome has shifted to improving 30-day retention, that onboarding opportunity may no longer belong in the active tree. The agent's job is to surface this disconnection rather than let the tree silently grow in the wrong direction.

## Why It Matters

Without a gatekeeper at the entry point, the OST degrades quietly. Stakeholder desires enter as opportunities ("enterprise users need admin reporting"). Solution ideas get laundered through a thin layer of customer-voice rewording ("users are frustrated by limited export options" — written by the PM who was already planning to build CSV export). Single-interview moments become tree branches because someone was excited in the debrief. Each individual entry seems defensible; the cumulative effect is an OST that looks like structured discovery but is actually a product roadmap with better vocabulary. The PM using that tree is not doing continuous discovery — they're doing continuous justification.

The agent's role is particularly important here because this corruption happens incrementally and never feels like a crisis. A PM reviewing their own OST on any given day will probably not notice that three of the last four opportunities they added were stakeholder-originated. The agent, applying the validation criteria consistently and without political pressure, is in a better position to surface this pattern — but only if it has been trained to do so and is allowed to push back. An agent that defers to the PM on every entry out of false politeness is not providing value; it's providing cover.

The downstream consequences of poor opportunity validation are severe. Teams that build on invalidated opportunities design experiments that can't produce useful learning, because the opportunity they're testing was never real. They present evidence to stakeholders that sounds rigorous but is circular — the "customer insight" backing the solution is the same stakeholder request that generated the solution idea. And they erode trust in the discovery process itself: when solutions built on laundered opportunities don't land, the team concludes that discovery doesn't work, rather than that the discovery was never real.

## What Good Looks Like

**Scenario: A PM adds an opportunity after a stakeholder meeting**

Bad entry (agent accepts it):
> Opportunity: "Admins need a centralized dashboard to manage team permissions."
> Evidence: "Raised in Q1 planning by VP of Enterprise Sales."

Good agent response:
> "This opportunity is written in solution language ('a centralized dashboard') and sourced from a single internal stakeholder, not a customer. I can't add it to the OST as-is. Two paths forward: (1) If this pain is real, let's find customer evidence — do you have support tickets or interview quotes where admins describe struggling to manage permissions? (2) If you want to keep this as a stakeholder ask in scope, I'd suggest logging it separately as a constraint or input, not an opportunity. How do you want to proceed?"

**Scenario: An opportunity is rewritten correctly but only has one source**

Bad entry (agent accepts it):
> Opportunity: "Users lose track of where they were after a multi-day gap."
> Evidence: Quote from user interview on 2026-04-12.

Good agent response:
> "The framing is solid — this is customer voice describing a behavioral problem. But I'm seeing only one source: one interview quote from April 12. That's a signal, not yet a pattern. I'll tag this as `[weak evidence — single source]` and hold it out of the main tree until we have a second independent source. Do you want to add it to a 'signals to investigate' backlog, or do you have other evidence I'm missing?"

**The contrast in tree health over time:**

Teams with strong opportunity validation have OSTs where every branch can point to a quote file or ticket cluster. Teams without it have OSTs full of entries like "users want faster search" with no backing evidence — and no one can remember where that came from.

## Failure Modes

**The nodding agent.** The agent accepts every opportunity submission without challenge, treating PM judgment as final on entry. This produces the "laundering" failure described above. Often happens when the agent is prompted to be helpful rather than critical, or when no explicit validation criteria are in the system prompt.

**Rewording instead of challenging.** The agent detects solution language and silently rewrites it — changing "users need a dashboard" to "users struggle to find relevant data" — without flagging that the original framing was a signal of potential stakeholder-origin corruption. A rewrite that fixes the symptom hides the diagnosis.

**Treating similar sources as independent.** Two support tickets from the same user submitted one day apart, or two quotes from the same interview session, get counted as two independent sources. The agent passes the entry when the two-source standard hasn't actually been met.

**Accepting the desired outcome as any outcome.** An opportunity about feature discoverability gets added to a tree where the stated outcome is "reduce time-to-first-value." The opportunity is real and evidence-backed — but the agent doesn't flag that the connection to the current outcome is tenuous. The PM has to realize this themselves, months later, when they're shipping solutions that don't move the metric.

**Retroactive validation theater.** When an existing opportunity is challenged, the agent quickly finds supporting evidence rather than genuinely assessing whether the opportunity should stay. This is evidence mining, not validation. The agent should evaluate the evidence that existed at the time of entry, not hunt for post-hoc justification.

## How to Evaluate It

**Test 1 — Solution language detection.** Give the agent 10 candidate opportunities: 5 in genuine customer voice, 5 written in solution language (varying levels of subtlety, from obvious to well-disguised). Ask it to classify and reframe the bad ones. Passing score: catches all 5 bad ones. Watch for: the most-disguised cases (phrases like "users can't easily X" that describe a capability gap rather than a customer experience).

**Test 2 — Source independence.** Present an opportunity with three supporting quotes, but from the same interview session. Ask the agent to evaluate the evidence. It should classify this as a single-source opportunity, not a three-source one. If it counts the quotes individually, it has failed the independence test.

**Test 3 — Stakeholder-origin detection.** Give the agent an OST where three of the five opportunities map suspiciously well to features the sales team has been requesting. Ask it to audit the tree for validation quality. A passing agent surfaces the alignment and asks the PM to verify the evidence predates and is independent of the stakeholder requests.

**Test 4 — Outcome connection audit.** Provide an OST and then tell the agent the team's desired outcome has changed (e.g., from activation to retention). Ask it to identify which opportunities are no longer clearly connected to the new outcome. The agent should flag specific branches, not generalize.

**Test 5 — Push-back under PM pressure.** After the agent flags an opportunity for weak evidence, respond as a PM who insists the opportunity is real ("I know this is true — I've heard it from multiple customers"). The agent should maintain its position, offer paths forward (find the evidence, or hold it as a signal), and not capitulate to social pressure from the conversation.

## How to Develop It

**Anchor the validation criteria in the system prompt.** The three conditions — customer voice, two independent sources, outcome connection — must be explicit, not implied. Agents don't reliably infer gating standards. State them as rules, not guidelines.

**Give the agent a classification vocabulary.** Train it to use consistent status tags: `[valid]`, `[weak evidence — single source]`, `[solution language]`, `[stakeholder-origin — verify independence]`, `[outcome disconnect]`. Consistent tagging makes audits possible and makes the agent's reasoning legible.

**Create a deliberate corruption corpus.** Seed a practice OST with opportunities that fail the validation tests at varying levels of subtlety. Run the agent through regular audits and grade against ground truth. This is the single most effective way to calibrate the agent's detection threshold.

**Build in the reframe habit.** When the agent rejects an opportunity for solution language, prompt it to always offer a reframe — not as an automatic replacement, but as a demonstration of what customer-voice framing would look like. This forces the agent to engage with the substance of the opportunity, not just the syntax.

**Separate detection from correction.** Prompt engineering note: the agent should flag and surface issues, but not silently fix them and move on. The PM needs to see the flag, not just get the corrected output. Invisible corrections make the agent seem more accurate than it is and remove the feedback loop the PM needs to improve their own input quality.

## Sample Prompts

**Validation gate prompt (add to opportunity entry workflow):**
> "Before adding this opportunity to the OST, evaluate it against three criteria: (1) Is it written in customer voice — describing what a customer experiences or struggles with, not what they need to be able to do? (2) Does it have at least two independent evidence sources? List them. (3) Does it connect to our current desired outcome: [OUTCOME]? If any criterion fails, explain why and suggest how to address it before entry."

**Tree audit prompt (run bi-weekly):**
> "Review the following OST opportunities and classify each as: [valid], [solution language], [single source], [outcome disconnect], or [stakeholder-origin risk]. For each flagged item, explain the specific problem and suggest a path to resolution or removal."

**Source independence check prompt:**
> "I'm providing the evidence for this opportunity: [EVIDENCE LIST]. For each piece of evidence, note the source, date, and whether it is independent of the other sources (different session, different user, different data channel). Then tell me how many independent sources this opportunity has and whether it meets the two-source threshold."

## Connected Skills

[[Evidence Attribution]] — The implementation layer for the evidence requirements opportunity validation sets. Validation sets the standard; evidence attribution enforces the sourcing discipline across the full tree.

[[Transcript Synthesis]] — Where raw customer signals become candidate opportunities. The quality of synthesis directly determines what gets submitted for validation.

[[Signal Clustering]] — Clustering multiple signals into an opportunity theme is how the two-source standard gets met. Weak clustering produces single-source opportunities that look like patterns.

[[Contradiction Detection]] — An opportunity that has been validated may later be challenged by new evidence. Contradiction detection handles the ongoing monitoring that validation handles at entry.

[[Tree Health Checks]] — The broader audit skill that includes opportunity validation status as one of several health signals to monitor.

[[Confidence Tagging]] — Every validated opportunity should carry a confidence level based on evidence strength. Validation determines eligibility; confidence tagging quantifies certainty.

[[Bias Detection]] — Opportunity validation checks individual entries; bias detection asks whether the collection of validated opportunities is systematically skewed toward certain user segments or research methods.

[[Escalation Calibration]] — Determines when the agent escalates a validation dispute to the PM vs. handles it autonomously. Opportunity entry is high-stakes; the agent should almost always escalate rather than self-resolve ambiguous cases.
