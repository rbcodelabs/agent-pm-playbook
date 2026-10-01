# Assumption Decomposition

> For any candidate Solution, mapping the complete set of assumptions that must be true for it to move its parent Key Result — ranked by the risk that each assumption is wrong multiplied by the impact of being wrong, with the riskiest named so it can become the next Test.

**Layer:** 3 — Test & Assumption Reasoning
**Companion:** [[Agentic PM — Agent Capability Framework]]

---

## What This Skill Is

Assumption decomposition is the systematic process of making explicit everything that must be true for a Solution to work — before a single line of code is written or a Test is designed. It is not a brainstorming exercise and it is not a risk register. It is a structured map of the logical dependencies underneath a solution hypothesis. If any one of the mapped assumptions fails, the Solution either fails or must be redesigned.

In the Loop hierarchy (Opportunity → Outcome → Key Result → Solution → Test; see the [Loop structure guide](../guides/the-loop.md)), the Solution is the level this skill operates on. A Solution is parented by exactly one Key Result (`SOL-n` under `OUT-n-KR-n`), and its ancestry also tells the agent which Opportunity it is meant to capture. The assumption map is therefore anchored at both ends: upward to the Key Result the Solution claims to move, and downward to the Tests (`TST-n`) that will try to falsify it. A Solution with no assumptions listed has not been decomposed, and a Solution whose riskiest assumption is not named cannot receive a well-aimed Test.

The process operates across five categories: desirability (do customers want this enough to change their behavior?), usability (can they actually use it as designed, given their context, technical comfort, and time constraints?), feasibility (can the team build it, within realistic constraints of time, data access, technical architecture, and staffing?), viability (does solving this support the business model — does it make money, protect margin, or reduce cost in a way the business can sustain?), and KR connection (even if customers love the Solution and we ship it cleanly, does it actually move the Key Result it is parented by — and does that Key Result in turn evidence the Outcome the team is accountable for?). All five categories need coverage. A map that only covers three of them is not complete.

The output of good assumption decomposition is not a flat list. It is a prioritized map, ordered by risk × impact. Risk is the probability that the assumption is wrong given what we currently know. Impact is the severity of being wrong — specifically, whether being wrong kills the Solution immediately or merely requires adjustment. The top item on the list is always "the assumption that, if wrong, causes us to abandon this solution branch immediately." That is the **riskiest assumption**: it is named explicitly on the Solution record, and it is the assumption the next Test should be scoped to. A Test is scoped to one assumption; the map is what makes that choice deliberate rather than convenient.

In practice, this skill requires the agent to hold the Solution at arm's length and ask adversarially: what is this Solution betting on that we have not yet verified? The agent must be willing to surface uncomfortable assumptions — especially viability and KR-connection assumptions that challenge whether the whole solution branch is worth pursuing. A good decomposition is often the thing that causes a PM to retire a Solution before it wastes a sprint, not after. Because a KR needs at least three meaningfully different candidate Solutions before any is selected, a decomposition that kills one Solution is a normal, healthy result — the sibling Solutions are still there.

## Why It Matters

The most common way product bets fail is not that the team built the wrong thing technically — it is that they never made explicit which assumption they were betting on, so when Test results came back ambiguous, no one could diagnose what went wrong. Was it that customers didn't want it? That the UI was confusing? That the problem was real but didn't connect to the Key Result? Without a prior assumption map, post-mortems are speculative. With one, they are diagnostic, and the Test result can flow up the tree cleanly: Test result → Solution confidence → KR → Outcome → Opportunity status.

Agents left to their own devices will surface the most visible assumption — typically the desirability assumption — and treat it as the only assumption worth testing. This is a structural bias, not a random error. Desirability is the assumption that sounds most like a user research question, and agents trained on general PM content associate "testing assumptions" with "talking to users." But the assumption that kills most Solutions in practice is not "do customers want this" — it is "does this Solution actually move our KR" (KR connection) or "can we sustain this operationally at scale" (viability). Failing to surface those assumptions leads teams to ship things that users love but that do not move the Key Result, and therefore do not advance the Outcome or capture the Opportunity.

The ranked format matters as much as the completeness. A long flat list of assumptions is not actionable — it does not tell a PM what to test first. The ranking forces a judgment call: given everything we know, what are we most uncertain about that would have the most catastrophic consequences if we were wrong? That judgment is what the PM provides. The agent's job is to make sure the full map is in front of them so the judgment is made on complete information, not on whatever came to mind first. The agent does not wait for permission to record the map or name the riskiest assumption; it acts, then reports, and the PM overrides the ranking if they disagree.

## What Good Looks Like

**Poor output (incomplete, unranked):**

> Solution: Add a "save for later" feature to the checkout flow.
> Assumptions:
> — Users want to save items for later.
> — The feature will be discoverable in the checkout flow.

This is two assumptions, both desirability/usability, with no ranking, no riskiest assumption named, no parent KR, and no coverage of viability or KR connection. It tells the PM almost nothing they didn't already know.

---

**Strong output (complete, ranked, adversarial):**

> **SOL-7 — Add a "save for later" feature to the checkout flow.**
> Parent KR: OUT-2-KR-1 — Raise 30-day purchase completion among first-time shoppers from 41% to 50% by end of cycle.
> Opportunity it addresses (via ancestry): OPP-4 — "I'm not ready to commit when I reach checkout, and there's no way to come back to it."
>
> Assumption Map (ranked by risk × impact):
>
> 1. [KR CONNECTION — HIGH KILL RISK] **Riskiest assumption.** Saving items produces purchases within 30 days. If shoppers save items but never return to complete the purchase, this Solution moves no KR. We have no evidence yet that abandonment in our flow is driven by "not ready to buy" vs. "found it cheaper elsewhere" or "friction in payment." Must validate before building.
>
> 2. [DESIRABILITY — MEDIUM KILL RISK] Shoppers who abandon checkout do so because they want to save the item, not because of payment friction, price sensitivity, or distraction. Current exit survey data is ambiguous on this — 34% cite "not ready," but that category is broad.
>
> 3. [USABILITY — MEDIUM KILL RISK] Shoppers will notice and understand the "save for later" affordance during an active checkout session — a high-intent, time-pressured moment. Cognitive load at checkout may cause the feature to be invisible.
>
> 4. [VIABILITY — LOW KILL RISK, HIGH DRAG RISK] Saved carts will require email re-engagement sequences to be effective. We do not currently have triggered email infrastructure. This does not kill the Solution but significantly changes the build scope and requires coordination with another team.
>
> 5. [FEASIBILITY — LOW RISK] Cart persistence across sessions requires auth state. We already have auth; this is a moderate engineering lift, not a blocker.
>
> Recommended first Test (new `TST-` record under SOL-7): scope it to assumption #1. Validate that abandonment in our specific funnel is driven by "want to save" intent before building the feature at all. A fake-door test or exit survey redesign can answer this in two weeks. Success and failure criteria must be written before the Test runs.
>
> Roll-up note: a failed Test on #1 lowers SOL-7 confidence and, if siblings under OUT-2-KR-1 are also weak, flags the KR as lacking a viable path.

---

The annotated risk levels, the kill-risk vs. drag-risk distinction, the named riskiest assumption, and the recommendation all reflect the agent doing synthesis work — not just listing. The PM still decides whether to run the Test and which assumption ranking they agree with.

## Failure Modes

**Desirability tunnel vision.** The agent lists only assumptions about whether users want the feature, ignoring feasibility, viability, and KR connection entirely. Output reads like a user research checklist, not an assumption map.

**Flat lists with no ranking.** The agent surfaces five to eight assumptions in no particular order and never names the riskiest. The PM cannot tell which to test first, and the Test that follows is not tied to a specific assumption. The list is complete but not actionable.

**Assumptions phrased as questions, not propositions.** "Will users find this useful?" is not an assumption — it is a question. An assumption is a falsifiable proposition: "Shoppers who abandon checkout do so because of intent-to-save, not price sensitivity." Questions cannot be ranked, tested, or retired.

**Inflated confidence on easy assumptions.** The agent marks feasibility as "confirmed" because the team has done similar work before, without acknowledging that the specific integration has never been attempted. Easy-sounding assumptions get waved through.

**Missing the KR-connection assumption entirely.** This is the most dangerous failure mode. The agent maps desirability, usability, and feasibility — and implicitly assumes that if the Solution is adopted, the Key Result will move. This assumption is often wrong. A feature can be loved, used, and built cleanly — and move the KR zero.

**Decomposing a Solution that has no parent KR.** The agent builds a thorough map for an idea that was never linked to a Key Result. Without the KR there is nothing to anchor the KR-connection assumption, and the work may be an orphan. The agent should flag the missing parent rather than invent one silently.

**Retrospective assumption mapping.** The agent generates assumptions that match what the team already tested, rather than surfacing what was never tested. This produces a map that looks complete but is actually reverse-engineered from existing work.

## How to Evaluate It

1. **Completeness test.** Give the agent a Solution and its parent KR and count how many of the five assumption categories are represented in the output. A skilled agent should produce at least one assumption per category, with the caveat that some Solutions legitimately have no feasibility risk (rare). Mark down any agent that produces zero viability or KR-connection assumptions.

2. **Ranking coherence test.** After the agent produces a ranked map, ask: "If assumption #3 turned out to be false, what would we do?" A well-reasoned map will have an answer. If the agent's ranking is arbitrary, the answer will not match the ranking.

3. **Riskiest-assumption test.** Ask the agent explicitly: "Which assumption on this map, if wrong, would cause you to recommend retiring this Solution entirely?" If the agent cannot identify one, or identifies a low-stakes assumption, the ranking is wrong. Then check that the Test it proposes is scoped to that one assumption and nothing else.

4. **Adversarial assumption test.** After the agent produces a map, add a constraint: "Assume the feature gets a 4.5/5 star rating from users who use it. Does that validate the Solution?" A skilled agent will point out that user satisfaction does not validate the KR-connection assumption — users can love a feature that does not move the Key Result the team owns.

5. **Viability prompt test.** Give the agent a Solution that is technically feasible and clearly desired by users, but that would require a pricing change or operational cost increase to sustain. See whether the agent surfaces viability on its own, or whether it takes a direct prompt to get there.

## How to Develop It

**Prompt engineering: force category coverage.** Include explicit instructions in the system prompt to produce at least one assumption per category. Use the five category names as literal headers in the output format. Agents that are not forced to fill all five categories will consistently skip viability and KR connection.

**Feedback loop: kill-rate tracking.** When Tests run, track whether the assumption the agent ranked #1 was the assumption that actually determined whether the Solution was retired or advanced. Over time, this tells you whether the ranking logic is calibrated.

**Red-teaming prompts.** After the agent produces an assumption map, prompt it with: "Play devil's advocate. What assumption on this list is most likely to be wrong that you ranked too low?" This forces a second pass that often surfaces the real risk.

**KR-connection forcing function.** Add a mandatory field to the assumption map output: "KR connection assumption (explicit)." Require the agent to complete this field as a non-negotiable part of the output, stated against the specific parent KR with its baseline and target. Agents that are not explicitly required to address this assumption will skip it.

**Train on post-mortems.** Feed the agent examples of real product failures annotated with which assumption was actually wrong. Pattern-matching on post-mortems builds intuition for which assumption categories are most commonly underweighted.

## Sample Prompts

**Prompt 1 — Full decomposition:**
> "Here is our candidate Solution: [description], parented by this Key Result: [KR with baseline and target]. Map every assumption that must be true for this Solution to succeed. Use these five categories: Desirability, Usability, Feasibility, Viability, KR Connection. For each assumption, rate it on two dimensions: (1) probability it is wrong given what we currently know, and (2) whether being wrong would kill this solution branch or merely require adjustment. Then rank the full list by risk × impact, name the riskiest assumption on the Solution record, and propose the one Test we should run first."

**Prompt 2 — Adversarial stress test:**
> "Our team is confident about [Solution]. Assume I am a skeptical VP of Product who just asked 'What are we betting on that we haven't proven yet?' Write the most complete and uncomfortable version of the assumption map — surface the risks the team is most likely to be rationalizing away."

**Prompt 3 — KR connection isolation:**
> "For the Solution we are considering, write the KR-connection assumption in a single falsifiable sentence, naming the parent Key Result. Then explain: (a) what evidence we would need to believe this assumption is likely true, (b) what evidence would suggest it is false, and (c) whether we currently have either."

## Connected Skills

- [[Opportunity Validation]] — validates that the Opportunity is real before assumption mapping a Solution that claims to capture it
- [[Test Minimalism]] — determines how to test the riskiest assumption on the map with the smallest possible Test
- [[Null Hypothesis Awareness]] — ensures the Test of the riskiest assumption is designed so it could actually fail
- [[Result Interpretation]] — reads the outcome of a Test accurately and carries it up to Solution confidence
- [[Evidence Attribution]] — tracks which evidence supports or challenges each mapped assumption, on the Solution or Test it bears on
- [[Confidence Tagging]] — assigns appropriate confidence levels to each assumption based on current evidence
- [[Bias Detection]] — catches when the assumption map is systematically skipping uncomfortable categories
- [[Epistemic Self-Awareness]] — enables the agent to flag when it lacks the domain knowledge to assess feasibility or viability assumptions

The workflow that sequences these steps is the `loop-workflow` skill, which covers all five levels of the Loop tree.
