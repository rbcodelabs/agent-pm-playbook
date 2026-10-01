# Opportunity Validation

> The gatekeeper skill for tree quality at its root: determining whether a candidate Opportunity represents a genuine customer need or a stakeholder desire dressed up as discovery.

**Layer:** 2 — Tree Integrity & Maintenance
**Companion:** [[Agentic PM — Agent Capability Framework]]
**Structure:** `guides/ookrst-structure.md`. The Opportunity (`OPP-n`) is the root of the tree. Outcomes, KRs, Solutions and Tests all trace back to one.

---

## What This Skill Is

Opportunity validation is the agent's ability to apply consistent quality criteria to every candidate Opportunity before it becomes the root of a branch, and to audit existing Opportunities that may have slipped in without meeting those criteria. In the OOKRST model the Opportunity is the top of the hierarchy: a bounded, evidence-backed customer need or market opening worth pursuing. Everything beneath it (the Outcome the team commits to, the KRs that measure it, the Solutions that move them, the Tests that check the Solutions) inherits its legitimacy from this one record. If the root is a stakeholder wish, the whole branch is.

An Opportunity earns its place in the tree by satisfying three conditions together: it is a need and not a feature (expressed in the customer's voice, in behavioral language), it names a segment (whose need this is), and it is backed by evidence, at least two independent sources, or tagged `weak` until it has them. Passing two out of three is not a pass. A `weak` Opportunity may be recorded so the signal isn't lost, but the tag is visible, the evidence gap is a task, and no Outcome should be committed against it until the second independent source arrives.

The need-not-feature test is the most nuanced. Customer voice means the Opportunity describes what a customer experiences, feels, or struggles with, not what a customer should be able to do. "Users need a way to pick up where they left off" fails this test because "a way to" is the structure of a solution request. The correct reframe, "Users lose track of where they were after a multi-day gap," describes a behavioral reality observed in research. The distinction sounds subtle, but it has enormous downstream consequences. A solution-language Opportunity pre-narrows the Solution space to one category of fix. A need-framed Opportunity leaves the space open: maybe the right response is a resume prompt, maybe it's better session persistence, maybe it's a change to content structure. This matters doubly here because a KR needs at least three meaningfully different candidate Solutions, and a feature disguised as an Opportunity produces one. The agent must be able to make this call reliably without the PM reviewing every entry.

The segment test asks who. "Users lose track of where they were" is weaker than "returning users after a gap of a week or more lose track of where they were." A named segment makes the Opportunity testable, makes evidence independence checkable (are these the same kind of customer?), and lets the later Outcome be written as a behavior change for someone specific. An Opportunity that applies to everyone usually describes no one.

The two-source rule exists because single-source Opportunities are almost always premature. One interview where a user mentions a pain is a signal to investigate. It is not yet a pattern. Two independent sources (e.g., two separate interviews, or one interview plus a support ticket cluster) are the minimum threshold for treating something as a pattern worth building an Outcome on. "Independent" is load-bearing: two quotes from the same interview session are one source, not two. Two tickets about the same feature request from the same power user are one source. The agent should understand what makes sources independent and apply that standard when evaluating submissions.

Evidence attaches to the Opportunity, and, when it bears on one specifically, to the Solution or Test it relates to. It never attaches to a KR. A KR is a measurable signal; it carries a baseline, a target and a date. The reasons the need is real belong to the root.

Because the Opportunity is the root, the check that used to run at entry against a standing goal now runs the other way. Instead of asking "does this connect to the current goal?", the agent asks whether the Outcome beneath an Opportunity still answers it. That is opportunity-to-Outcome fit, and it is where drift gets caught: the Opportunity is genuine and evidence-backed, but the Outcome or KRs hanging under it have wandered to something else, or the need itself has faded and the Opportunity should move from `pursuing` toward `sustained` or `retired`. Opportunity status follows what happens below it. Outcomes that are being achieved and held keep an Opportunity `sustained`; evidence that the need no longer exists, or that no Outcome worth committing to remains, retires it, with a reason.

## Why It Matters

Without a gatekeeper at the root, the tree degrades quietly. Stakeholder desires enter as Opportunities ("enterprise users need admin reporting"). Solution ideas get laundered through a thin layer of customer-voice rewording ("users are frustrated by limited export options," written by the PM who was already planning to build CSV export). Single-interview moments become tree branches because someone was excited in the debrief. Each individual entry seems defensible; the cumulative effect is a tree that looks like structured discovery but is actually a product roadmap with better vocabulary. The PM using that tree is not doing continuous discovery. They're doing continuous justification.

The agent's role is particularly important here because this corruption happens incrementally and never feels like a crisis. A PM reviewing their own tree on any given day will probably not notice that three of the last four Opportunities they added were stakeholder-originated. The agent, applying the validation criteria consistently and without political pressure, is in a better position to surface this pattern, but only if it has been trained to do so and is allowed to push back. An agent that defers to the PM on every entry out of false politeness is not providing value. It's providing cover.

The downstream consequences of poor Opportunity validation are severe. Teams that commit Outcomes to unvalidated Opportunities set KRs that measure nothing the customer cares about, and design Tests that can't produce useful learning, because the need they are testing against was never real. They present evidence to stakeholders that sounds rigorous but is circular: the "customer insight" backing the Solution is the same stakeholder request that generated the Solution idea. And they erode trust in the discovery process itself. When Solutions built on laundered Opportunities don't land, the team concludes that discovery doesn't work, rather than that the discovery was never real.

## What Good Looks Like

**Scenario: A PM adds an Opportunity after a stakeholder meeting**

Bad entry (agent accepts it):
> Opportunity: "Admins need a centralized dashboard to manage team permissions."
> Evidence: "Raised in Q1 planning by the head of sales."

Good agent response:
> "This is written in solution language ('a centralized dashboard'), names no segment, and is sourced from a single internal stakeholder, not a customer. So I've done two things. I logged the dashboard as a stakeholder input, not an Opportunity. I also added a reframed Opportunity, `OPP-6` 'Admins at multi-team accounts struggle to see and change who has access across teams', tagged `[stakeholder-origin — verify independence]` and `weak`. I searched support tickets and found 2 that fit, now linked to the Opportunity, so it's medium confidence and ready for an Outcome once you confirm the segment. If this doesn't match what Sales meant, tell me and I'll adjust."

**Scenario: An Opportunity is rewritten correctly but only has one source**

Bad entry (agent accepts it):
> Opportunity: "Users lose track of where they were after a multi-day gap."
> Evidence: Quote from user interview on 2026-04-12.

Good agent response:
> "The framing is solid: this is customer voice describing a behavioral problem, and I've named the segment as returning users after a gap of a week or more. But I'm seeing only one source: one interview quote from April 12. That's a signal, not yet a pattern. I've recorded it as `OPP-3` tagged `[weak evidence — single source]`, added a question on multi-day gaps to next week's interview guide, and held off proposing an Outcome. A second independent source would make it medium."

**The contrast in tree health over time:**

Teams with strong Opportunity validation have trees where every root can point to a quote file or ticket cluster. Teams without it have trees full of entries like "users want faster search" with no backing evidence, and no one can remember where that came from.

## Failure Modes

**The nodding agent.** The agent accepts every Opportunity submission without challenge, treating PM judgment as final on entry. This produces the "laundering" failure described above. Often happens when the agent is prompted to be helpful rather than critical, or when no explicit validation criteria are in the system prompt.

**Rewording instead of challenging.** The agent detects solution language and silently rewrites it, changing "users need a dashboard" to "users struggle to find relevant data," without flagging that the original framing was a signal of potential stakeholder-origin corruption. A rewrite that fixes the symptom hides the diagnosis.

**Treating similar sources as independent.** Two support tickets from the same user submitted one day apart, or two quotes from the same interview session, get counted as two independent sources. The agent passes the entry when the two-source standard hasn't actually been met.

**Letting a weak Opportunity carry an Outcome.** A single-source Opportunity gets tagged `weak`, and then an Outcome and three KRs get written under it the same afternoon. The tag is cosmetic. A weak root should be driving evidence-gathering, not commitments.

**Missing the segment.** The Opportunity is in customer voice and has two sources, but it applies to "users" in general. The agent passes it, and the Outcome written below can't be specific about whose behavior should change.

**Ignoring fit between Opportunity and Outcome.** An Opportunity about feature discoverability sits above an Outcome about 30-day retention. The Opportunity is real and evidence-backed, but the agent doesn't flag that the Outcome no longer answers it. The PM has to realize this themselves, months later, when they're shipping Solutions that don't relieve the need.

**Evidence parked on KRs.** The agent accepts customer quotes pasted onto a KR as if they supported the Opportunity. The signal is real but sits where nothing that decides the Opportunity's status will read it. Move it to the Opportunity.

**Retroactive validation theater.** When an existing Opportunity is challenged, the agent quickly finds supporting evidence rather than genuinely assessing whether the Opportunity should stay. This is evidence mining, not validation. The agent should evaluate the evidence that existed at the time of entry, not hunt for post-hoc justification.

## How to Evaluate It

**Test 1 — Solution language detection.** Give the agent 10 candidate Opportunities: 5 in genuine customer voice, 5 written in solution language (varying levels of subtlety, from obvious to well-disguised). Ask it to classify and reframe the bad ones. Passing score: catches all 5 bad ones. Watch for: the most-disguised cases (phrases like "users can't easily X" that describe a capability gap rather than a customer experience).

**Test 2 — Source independence.** Present an Opportunity with three supporting quotes, but from the same interview session. Ask the agent to evaluate the evidence. It should classify this as a single-source Opportunity, not a three-source one. If it counts the quotes individually, it has failed the independence test.

**Test 3 — Stakeholder-origin detection.** Give the agent a tree where three of the five Opportunities map suspiciously well to features the sales team has been requesting. Ask it to audit the tree for validation quality. A passing agent surfaces the alignment and asks the PM to verify the evidence predates and is independent of the stakeholder requests.

**Test 4 — Opportunity-to-Outcome fit audit.** Provide a tree and then tell the agent that an Outcome has been rewritten (e.g., from activation behavior to retention behavior). Ask it which Opportunities no longer clearly ground their Outcomes and which Outcomes now sit under a need they don't answer. The agent should flag specific records, not generalize.

**Test 5 — Push-back under PM pressure.** After the agent flags an Opportunity for weak evidence, respond as a PM who insists the need is real ("I know this is true; I've heard it from multiple customers"). The agent should maintain its position, offer paths forward (find the evidence, or hold it as `weak`), and not capitulate to social pressure from the conversation.

**Test 6 — Segment and placement.** Submit a well-voiced Opportunity with no segment, plus customer quotes attached to a KR. The agent should ask for or propose the segment and move the quotes to the Opportunity.

## How to Develop It

**Anchor the validation criteria in the system prompt.** The three conditions (need not feature, named segment, two independent sources or tagged `weak`) must be explicit, not implied. Agents don't reliably infer gating standards. State them as rules, not guidelines.

**Give the agent a classification vocabulary.** Train it to use consistent status tags: `[valid]`, `[weak evidence — single source]`, `[solution language]`, `[no segment]`, `[stakeholder-origin — verify independence]`, `[outcome fit — verify]`. Consistent tagging makes audits possible and makes the agent's reasoning legible.

**Create a deliberate corruption corpus.** Seed a practice tree with Opportunities that fail the validation tests at varying levels of subtlety. Run the agent through regular audits and grade against ground truth. This is the single most effective way to calibrate the agent's detection threshold.

**Build in the reframe habit.** When the agent rejects an Opportunity for solution language, prompt it to always offer a reframe, not as an automatic replacement, but as a demonstration of what customer-voice framing would look like. This forces the agent to engage with the substance of the Opportunity, not just the syntax.

**Separate detection from correction.** Prompt engineering note: the agent should flag and surface issues, but not silently fix them and move on. The PM needs to see the flag, not just get the corrected output. Invisible corrections make the agent seem more accurate than it is and remove the feedback loop the PM needs to improve their own input quality.

## Sample Prompts

**Validation gate prompt (add to Opportunity entry workflow):**
> "Before recording this Opportunity, evaluate it against three criteria: (1) Is it a need, written in customer voice, describing what a customer experiences or struggles with, not what they need to be able to do? (2) Does it name the segment it applies to? (3) Does it have at least two independent evidence sources? List them. If not, tag it `weak` and state what would upgrade it. If any criterion fails, explain why and suggest how to address it. Do not propose an Outcome against a `weak` Opportunity."

**Tree audit prompt (run bi-weekly):**
> "Review the following Opportunities and the Outcomes beneath them. Classify each Opportunity as: [valid], [solution language], [no segment], [single source], or [stakeholder-origin risk]. For each Outcome, say whether it still answers its parent Opportunity. For each flagged item, explain the specific problem and suggest a path to resolution, a status change (pursuing, sustained, retired), or archive with a reason."

**Source independence check prompt:**
> "I'm providing the evidence for this Opportunity: [EVIDENCE LIST]. For each piece of evidence, note the source, date, and whether it is independent of the other sources (different session, different user, different data channel). Then tell me how many independent sources this Opportunity has and whether it meets the two-source threshold."

## Connected Skills

[[Evidence Attribution]] — The implementation layer for the evidence requirements Opportunity validation sets. Validation sets the standard; evidence attribution enforces the sourcing discipline across the full tree, including keeping signals on Opportunities and off KRs.

[[Transcript Synthesis]] — Where raw customer signals become candidate Opportunities. The quality of synthesis directly determines what gets submitted for validation.

[[Signal Clustering]] — Clustering multiple signals into an Opportunity theme is how the two-source standard gets met. Weak clustering produces single-source Opportunities that look like patterns.

[[Contradiction Detection]] — A validated Opportunity may later be challenged by new evidence. Contradiction detection handles the ongoing monitoring that validation handles at entry.

[[Tree Health Checks]] — The broader audit skill that includes Opportunity validation status, weak-evidence follow-through and Outcome fit as health signals to monitor.

[[Confidence Tagging]] — Every validated Opportunity should carry a confidence level based on evidence strength. Validation determines eligibility; confidence tagging quantifies certainty.

[[Bias Detection]] — Opportunity validation checks individual entries; bias detection asks whether the collection of validated Opportunities is systematically skewed toward certain user segments or research methods.

[[Escalation Calibration]] — Opportunity entry is reversible, so the agent resolves ambiguous cases itself: it reframes, tags confidence, records the Opportunity, and reports the call so the PM can correct it.
