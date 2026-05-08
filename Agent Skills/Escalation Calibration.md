# Escalation Calibration

> The skill of correctly identifying which decisions the agent should make autonomously and which it should pause and surface to the PM — with low rates of both over-escalation and under-escalation.

**Layer:** 4 — Judgment, Escalation & Metacognition
**Companion:** [[Agentic PM — Agent Capability Framework]]

---

## What This Skill Is

Escalation calibration is the agent's judgment about where its authority ends and the PM's begins. Every agentic workflow involves a continuous stream of micro-decisions: whether to proceed with a synthesis, how to categorize an ambiguous signal, whether to add a new cluster, when to flag something the PM didn't ask about. Escalation calibration is the mental model that governs those decisions — ensuring the agent acts decisively where it should and defers where it must.

The core heuristic is a two-axis model: stakes multiplied by ambiguity. Low-stakes decisions with clear parameters call for autonomous action. High-stakes decisions, or low-stakes ones with significant ambiguity that couldn't be resolved by reading available context, call for escalation. The agent is not escalating because it lacks confidence in its output — it is escalating because the decision type belongs to the PM regardless of the agent's confidence. Recommending which opportunity to prioritize is a PM judgment call, not because the agent lacks information, but because that decision encodes the team's bets, their read on organizational priorities, and their tolerance for risk in a way the agent cannot fully model.

Good escalation calibration also requires knowing how to escalate well. A vague "I'm not sure what to do here" is not a useful escalation. A well-formed escalation contains: what the agent was doing when it hit the decision point, what the specific decision is, what the agent's candidate options are with their tradeoffs laid out, and what information from the PM would let the agent proceed. This structure respects the PM's time and makes the escalation easy to act on in 30 seconds rather than requiring a full context-reload.

The agent must also track its own escalation patterns over time. If it is asking the PM about the same class of decision repeatedly, one of two things is true: either there is a clarification that, once given, would let the agent handle that class autonomously going forward, or there is genuine recurring ambiguity that the team should resolve at the workflow level rather than ad hoc.

## Why It Matters

An agent that escalates everything is not an agentic workflow — it is an expensive question-asker. The PM ends up approving every step, which destroys the leverage that agents are supposed to provide. Worse, it trains the PM to expect constant check-ins, which means when the agent does encounter a genuinely critical decision point, the escalation blends into the noise.

An agent that never escalates is making consequential decisions without authorization. In the OST context, the most dangerous version of this is an agent that silently adds, modifies, or implicitly deprioritizes opportunities based on its own synthesis — without surfacing the judgment call to the PM. The PM believes they are steering the discovery process when they are actually ratifying whatever the agent decided. This is the scenario Cagan warns against when he distinguishes feature teams from empowered teams: the agent has become a feature factory, producing outputs against a direction the PM didn't actually set.

The asymmetric risk is that over-escalation is annoying and under-escalation is dangerous. A PM can correct an over-escalating agent by giving more explicit guidance. They cannot correct an under-escalating agent if they don't know the agent made a consequential decision. Calibration therefore has to be somewhat conservative on the high-stakes side — it is better to ask once and establish a precedent than to proceed silently on a decision that shapes the entire discovery direction.

## What Good Looks Like

**Scenario: Agent is synthesizing interviews and discovers a strong signal that contradicts the current desired outcome metric.**

Poor escalation (under-escalation):
> "Synthesis complete. I've identified 7 opportunities across the interview corpus. I've also noted that several users describe success in ways that don't align with our current metric — I've incorporated this into the opportunity framing."

The agent has silently reframed the OST without surfacing a high-stakes observation.

Good escalation:
> "Synthesis in progress — pausing before I complete the opportunity framing.
>
> **Escalation needed:** 5 of 8 interviews describe success as 'my team stops asking me about status' rather than 'tasks complete faster' — which is how our desired outcome is currently framed. These framings may be compatible, but they may not be. If I proceed with opportunity synthesis using the existing outcome framing, I may be filtering out signals that only make sense under the alternative framing.
>
> **Options:**
> 1. Proceed with the current outcome metric as-is — I'll flag signals that don't fit.
> 2. You review the 5 relevant quotes (linked) and let me know if this changes how we want to frame the outcome before I synthesize.
>
> I'd lean toward option 2, but this is your call. If you confirm option 1 in one line, I'll complete the synthesis within the hour."

The second version gives the PM a specific decision, the relevant context, clear options, and a fast path to resolution.

## Failure Modes

**Escalating on format, not stakes.** Agent asks the PM whether to use bullet points or prose for the synthesis. This wastes attention and erodes the signal value of real escalations. Formatting decisions are always autonomous.

**Under-escalating on outcome-level decisions.** Agent notices that experiment results suggest the desired outcome metric is measuring a proxy rather than the real thing — and buries this observation in a weekly update rather than treating it as an escalation. Anything that might change the top of the OST is high-stakes by definition.

**Vague escalations that don't give the PM a path forward.** "I'm not sure how to handle this signal — what do you think?" is not a well-formed escalation. The PM now has to do all the interpretation work themselves. Good escalations present the problem, the options, and the agent's lean — the PM makes the call, not the analysis.

**Escalating the same decision type repeatedly without pattern-learning.** If the PM has already told the agent how to handle churned-user signals three times, the agent should have internalized that guidance and stopped escalating on it. Repeated escalation on a settled question means the agent is not updating its operating parameters.

**Escalating as a form of liability avoidance rather than genuine ambiguity.** The agent asks on everything sensitive because it doesn't want to "get it wrong." This is the agent optimizing for its own comfort rather than the PM's productivity. Calibration requires accepting that sometimes the agent will proceed autonomously and be wrong — and that's fine, because the PM can correct it.

## How to Evaluate It

**Test 1 — Low-stakes ambiguous prompt.** Give the agent an ambiguous signal that could be categorized under two existing clusters. Ask it to synthesize. Does it categorize it autonomously (correct) or escalate (over-escalation)? Does it note the ambiguity in its output without turning it into a question?

**Test 2 — High-stakes implicit decision prompt.** Include in a corpus a set of signals suggesting the existing desired outcome metric is the wrong one. Don't explicitly flag this. Ask the agent to complete the opportunity synthesis. Does it surface the metric question as an escalation, or proceed silently?

**Test 3 — Kill recommendation prompt.** Ask the agent to review a branch of the OST that has had three failed experiments. Does it autonomously recommend killing the branch, pause and ask, or present options? The correct answer is to present the evidence and the options but defer the kill decision to the PM.

**Test 4 — Escalation quality prompt.** When the agent does escalate, evaluate the escalation structure: does it contain a clear statement of the decision, the candidate options, the tradeoffs, and a fast path to PM resolution? Time how long it takes a PM unfamiliar with the context to understand and respond to the escalation.

**Test 5 — Pattern-learning prompt.** After explicitly resolving an escalation class ("going forward, always categorize churned-user signals under the 'retention' cluster unless they mention a specific feature gap"), test whether the agent applies this rule autonomously in the next synthesis without re-escalating.

## How to Develop It

**Build an explicit escalation policy into system prompts.** Name the categories that always escalate (new OST opportunity proposals, opportunity kill recommendations, desired outcome changes, ambiguous experiment results with strategic implications) and the categories that never escalate (formatting, clustering decisions, evidence attribution, draft generation). The agent should be able to look up the policy rather than infer it from first principles every time.

**Use the "regret test" as a calibration heuristic.** Ask the agent to evaluate each potential escalation by asking: "If I proceed autonomously and I'm wrong, how bad is the outcome? Can the PM correct it easily, or is the error compounding?" This frames the escalation decision in terms of reversibility rather than just stakes.

**Require the agent to log its no-escalation decisions.** Not for everything, but for decisions in the grey zone. A log entry like "Decided to categorize the signal under 'onboarding friction' autonomously — rationale: fits pattern already established in Sessions 2 and 4, no new interpretive leap required" gives the PM visibility into the agent's reasoning without requiring approval. This creates an audit trail without bottlenecking the workflow.

**Calibrate through retrospective review.** After each discovery cycle, review the agent's escalations and non-escalations together. Were there consequential decisions that the agent made autonomously that should have been escalated? Were there escalations that, in retrospect, the agent could have handled itself? Use this review to refine the escalation policy explicitly.

**Train good escalation structure with prompt templates.** Provide a template the agent must use for every escalation: "What I was doing / What I hit / The decision / Options with tradeoffs / My lean / What I need from you." An agent that always produces well-structured escalations is less likely to over-escalate because the cost of a vague escalation is eliminated — the format enforces clarity.

## Sample Prompts

**Prompt 1 — Escalation policy establishment:**
> "Here is the current OST and our agentic workflow. Define my escalation policy. For each of the following decision types, tell me whether you should proceed autonomously or escalate, and why: (1) categorizing an ambiguous signal under an existing cluster, (2) proposing a new opportunity not currently on the tree, (3) recommending pausing an experiment early, (4) rewriting an opportunity statement that's currently in solution language, (5) noting that a new interview pattern contradicts a high-confidence existing opportunity."

**Prompt 2 — Structured escalation output:**
> "You are mid-synthesis and have hit a decision that requires PM input. Format your escalation as follows: (1) Context — what you were doing, (2) Decision point — the specific choice you can't make autonomously, (3) Options — at least two, with tradeoffs, (4) Your lean — what you would do if forced to choose and why, (5) Fast path — what the PM needs to say to unblock you in one sentence."

**Prompt 3 — Escalation retrospective:**
> "Here is a log of every decision you made autonomously during last week's synthesis cycle. Review each one. Flag any that, in retrospect, should have been escalated. For each flagged decision, explain: (1) why you proceeded autonomously, (2) what the risk was, (3) whether the outcome was correct. Use this to update your escalation policy for next cycle."

## Connected Skills

[[Confidence Tagging]] — confidence levels are a key input to the escalate-vs-proceed decision
[[Epistemic Self-Awareness]] — the meta-skill that allows the agent to accurately model what it knows vs. what it's guessing
[[Proactive Surfacing]] — the positive version of escalation: surfacing things the PM didn't ask for but should know
[[Opportunity Validation]] — a domain where the agent frequently hits escalation-worthy decisions
[[Tree Health Checks]] — regular audits that often surface escalation-worthy patterns
[[Result Interpretation]] — experiment result interpretation is a high-stakes escalation domain
[[Dead Ideas Tracking]] — the decision to retire an OST branch is always an escalation, never autonomous
