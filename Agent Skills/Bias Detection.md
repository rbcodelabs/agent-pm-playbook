# Bias Detection

> The skill of recognizing when the discovery corpus, synthesis process, or agent's own reasoning is systematically skewed in ways that would distort the opportunity landscape — and flagging it before it compounds downstream.

**Layer:** 4 — Judgment, Escalation & Metacognition
**Companion:** [[Agentic PM — Agent Capability Framework]]

---

## What This Skill Is

Bias detection requires the agent to maintain a model of what's in the evidence base and a simultaneous model of what's missing from it. Most synthesis skills operate on the evidence present; bias detection asks the agent to reason about the evidence that isn't there. This is structurally harder because absence of data doesn't announce itself — the agent has to actively construct a picture of what a representative corpus would look like and compare it to what it actually has.

The skill has three distinct layers. The first is sampling bias: who is in the corpus? If all eight interviews were conducted with users who churned in the last 30 days, the synthesis will over-represent frustrations and under-represent the experience of users who stayed. If all interviews were routed through an inbound support request flow, the corpus captures users who had problems and sought help — it systematically excludes users who had problems and gave up silently, and users who had no problems at all. The agent needs to recognize these sampling patterns and tag the outputs accordingly.

The second layer is process bias: how was the data collected? Leading questions produce different outputs than open-ended ones. Researcher confirmation bias shows up when an interviewer keeps redirecting users back to a topic the team already believes is important. Survey data biases toward users who complete surveys — typically more engaged users or more frustrated ones, rarely the middle. The agent should flag when it recognizes patterns in how evidence was gathered that would systematically shape what evidence it contains.

The third layer is the agent's own synthesis bias. This is the hardest one to catch because it is internal to the agent's reasoning process. Emotionally vivid quotes are easier to cluster around than dry functional statements. Long quotes receive more weight than short ones even when the short ones are more representative. Topics that appear early in an interview corpus may be disproportionately represented in the synthesis because they established the agent's initial framing. Good bias detection means the agent runs a check on its own output: "Am I clustering around the most vivid signals or the most representative ones?"

## Why It Matters

Biased synthesis produces a biased OST. An OST built on interviews with churned users will surface problems as opportunities that may not represent problems for the users who stay — and building solutions to those problems could optimize for the wrong cohort entirely. An OST built on power-user interviews will surface sophistication gaps as opportunities when the real problem for new users may be something much more basic. In both cases, the team pursues real-looking work that moves the wrong lever.

The downstream consequence is that experiments fail, but it's not always obvious why. The team tests a solution to a well-evidenced opportunity, gets a null result, and interprets the null as "solution doesn't work" when the real answer is "opportunity was never real for the users we're measuring." Bias in the discovery corpus contaminates everything that flows from it — clusters, opportunities, solution hypotheses, experiment designs. Catching it at the synthesis stage is exponentially cheaper than catching it at the experiment stage.

There is also a team dynamics dimension. Research is conducted by people with viewpoints, and those viewpoints shape what they look for and how they interpret what they find. An agent that can name the structural reasons why a corpus might be skewed — without attributing fault to any individual researcher — provides the team a way to surface and address bias that doesn't feel like criticism. "The corpus skews toward onboarding-stage users because that's where customer success focuses their attention" is a structural observation, not an accusation.

## What Good Looks Like

**Poor output (no bias detection):**
> Synthesis complete. Top opportunity: users find the export function difficult to locate and use. This pattern appeared in 8 of 10 interviews.

No flag on who those 10 users were, how they were recruited, or what the pattern means relative to the full user population.

**Good output (bias detected and flagged):**
> **Synthesis note — sampling flag before reading clusters:**
>
> This corpus of 10 interviews has a significant sampling skew I want to name before you read the opportunities. 8 of 10 participants were sourced from a support ticket pool ("export not working" tag). This means the corpus over-represents users who (a) wanted to use the export feature, (b) hit a problem serious enough to submit a ticket, and (c) were responsive to a follow-up interview request.
>
> **Implication for synthesis:** The "export function is hard to find and use" cluster (8/10 sessions) is likely to be accurate for this cohort but may overstate the prevalence of the problem in the full user base. Users who never attempt exports, or who found the export easily, are not represented. I'd treat this as strong signal for the specific cohort of export-intenders who hit friction, but I'd want behavioral analytics to validate the cohort size before making this a top-priority opportunity.
>
> **What would correct for this:** One session with a user who regularly exports without issues would tell us whether the friction is in the function itself or in discoverability specifically for new-to-export users.

The second version gives the PM everything they need to weigh the synthesis appropriately.

## Failure Modes

**Bias detection as a boilerplate disclaimer.** The agent adds "note: sample size is small" to every synthesis regardless of whether the sample actually has meaningful skew. This is the hedging version of bias detection — technically present, operationally meaningless. Good bias detection names the specific skew and its specific implication for the synthesis.

**Missing within-corpus bias.** The agent flags that all interviews were with one customer segment but misses that 6 of 8 interviews in that segment were conducted by the same researcher using a script with a specific framing. Corpus bias isn't only about who — it's also about how.

**Flagging bias without recommending a corrective.** "This corpus skews toward power users" is better than nothing, but it leaves the PM without a path forward. Good bias detection includes a minimum viable corrective: what one or two additional data points would most improve coverage?

**Over-correcting for imagined bias.** The agent becomes so attuned to potential sampling skew that it discounts strong evidence from a specific cohort when that cohort is the relevant one. If the team's desired outcome metric is directly about churn, a corpus of churned users is not biased — it is targeted. Bias detection requires knowing which biases matter for the question at hand.

**Missing the agent's own clustering bias.** The agent correctly identifies that the corpus has no power-user representation, but misses that its own synthesis has clustered around the 3 most emotionally vivid quotes rather than the 12 more functionally stated but equally consistent signals. This internal bias produces skewed clusters even from an otherwise representative corpus.

## How to Evaluate It

**Test 1 — Skewed-corpus prompt.** Provide a synthesis corpus that is entirely composed of one-star app reviews. Ask for opportunity synthesis. Evaluate: does the agent flag the channel skew and its implications, or does it synthesize as though this were a representative evidence base?

**Test 2 — Implicit researcher bias prompt.** Provide three interview transcripts where the researcher consistently redirects to a specific topic when the user starts to drift. Ask for synthesis. Does the agent flag the interviewer pattern, or treat all data as equivalent?

**Test 3 — Missing-cohort identification prompt.** Provide an interview corpus and a user segmentation breakdown showing three distinct cohorts. Ask: "Which cohorts are underrepresented in this corpus relative to their size in the user base? What would that absence cause the synthesis to get wrong?" Evaluate the specificity of the response.

**Test 4 — Self-bias audit prompt.** After the agent produces a cluster synthesis, ask it: "Review your own clustering process. Are any of these clusters weighted more heavily because the supporting quotes were more vivid or emotionally striking rather than because they were more representative? If so, which ones?" Evaluate whether the agent can surface honest self-assessment.

**Test 5 — Corrective recommendation quality.** After the agent flags a bias, evaluate the quality of its corrective recommendation. Is it specific (one interview with a user who does X would address Y)? Is it feasible? Does it address the specific bias identified, or is it a generic "do more research" recommendation?

## How to Develop It

**Build a "corpus intake check" into the synthesis workflow.** Before producing any synthesis, the agent runs a structured check on the corpus: source distribution (channel, cohort, researcher), temporal coverage (recency), and method (interview, survey, ticket, behavioral). The intake check output is attached to every synthesis as a preamble. Making this structural ensures bias detection is never skipped.

**Provide segment profiles in context.** Give the agent access to the user segmentation model — what the distinct user cohorts are, their relative sizes, and their different relationships with the product. This allows the agent to compare the corpus against a reference distribution rather than reasoning about bias in the abstract.

**Train on named bias patterns.** Build a vocabulary of common discovery biases into the agent's operating context: survivorship bias (only users who stuck around), selection bias (only users who sought help), confirmation bias (researcher steers toward existing hypotheses), recency bias (last 30 days over-weighted). Named patterns are easier to detect than unnamed ones.

**Run adversarial synthesis prompts.** After the agent produces a synthesis, prompt: "Now argue that this synthesis is wrong because the corpus is biased. What's the strongest case for why these clusters don't reflect the real user population?" This forces the agent into a bias-detection posture even if it didn't apply one initially.

**Establish a "what's missing" prompt as standard.** Every synthesis output should close with: "What types of users or evidence are not represented in this corpus that would most change these findings?" Making this mandatory prevents bias detection from being conditional on whether the agent happened to notice a skew.

## Sample Prompts

**Prompt 1 — Corpus intake check:**
> "Before synthesizing opportunities, run a corpus intake check. Report: (1) the distribution of sources by channel, (2) the distribution of participants by known segment, (3) any patterns in how interviews were conducted that could shape results, (4) what user types or evidence types are absent. Flag any skews that would materially affect the synthesis. Then proceed with synthesis, referencing relevant flags in your cluster confidence tags."

**Prompt 2 — Self-bias audit:**
> "You've completed the opportunity synthesis. Now put on an adversarial hat. Review each cluster and ask: Is this cluster weighted appropriately relative to how representative it is, or did vivid/emotional quotes pull disproportionate weight? Are there any patterns in the raw data that the synthesis underweights? Revise any cluster whose weighting you'd now change, and explain the revision."

**Prompt 3 — Corrective gap analysis:**
> "Given this synthesis and its identified sampling skews, design the minimum viable research corrective. What is the smallest set of additional data points (specific interview cohort, behavioral query, or secondary data pull) that would most improve the bias profile of this corpus? Rank them by impact on synthesis quality."

## Connected Skills

[[Signal Clustering]] — the stage where corpus bias most directly shapes outputs
[[Transcript Synthesis]] — where sampling patterns in the corpus are first encountered
[[Confidence Tagging]] — corpus bias is a primary driver of confidence downgrades
[[Longitudinal Pattern Tracking]] — temporal bias (recent vs. historical signal) is a specific bias type to track
[[Epistemic Self-Awareness]] — detecting the agent's own synthesis bias requires meta-level reasoning
[[Opportunity Validation]] — bias-flagged opportunities need validation before advancing on the OST
[[Contradiction Detection]] — contradictions can be a symptom of corpus bias rather than genuine ambiguity
