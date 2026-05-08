# Audience Translation

> The skill of reframing the same finding, evidence, or OST state for different stakeholder audiences — shifting vocabulary, emphasis, and implied decision without altering the underlying finding or its confidence level.

**Layer:** 4 — Judgment, Escalation & Metacognition
**Companion:** [[Agentic PM — Agent Capability Framework]]

---

## What This Skill Is

Audience translation is the practice of taking a single accurate finding and rendering it in the format, vocabulary, and decision frame that is most useful to a specific audience — without changing what the finding actually says. It is distinct from dumbing down (which loses precision) and distinct from copy-pasting the same output everywhere (which loses utility). The finding stays the same; the presentation serves the reader's actual context.

In a PM workflow, the same evidence surfaces across multiple stakeholder conversations. An opportunity synthesized from twelve user interviews needs to be communicated to: the PM (who needs the full evidence with confidence tags), engineering (who needs to understand user context and feasibility constraints), design (who needs behavioral detail and edge cases), and leadership (who needs outcome-level framing and strategic confidence). Each of these audiences brings a different prior context, a different set of decisions they need to make, and a different vocabulary for talking about product work. An agent that can translate between these frames removes a significant PM burden — the labor of re-presenting the same information four different ways.

The skill requires the agent to model each audience's working context accurately. For engineering, the relevant question is usually feasibility and scope: what is the user trying to do, what technical constraints are implicated, and is the opportunity describing a UI problem or a data/infrastructure problem? For design, the relevant question is behavioral: when does the user encounter this problem, what are they trying to accomplish, and what edge cases does the opportunity imply? For executives, the relevant question is strategic: what outcome does this advance, how confident are we, and what are we betting on? Each of these requires a different emphasis, not a different truth.

Good translation also requires knowing when to translate vs. when to hold. Some findings are so nuanced that translating them into executive language without losing the nuance is not possible — the correct answer there is to flag that to the PM rather than produce an oversimplified executive summary. Translation serves communication; it does not paper over complexity that needs to be communicated.

## Why It Matters

The failure to translate effectively has two distinct consequences. The first is wasted conversation: the PM presents opportunity evidence to an engineering lead using customer-research vocabulary, the engineering lead doesn't engage with it in the way the PM hoped, and the conversation produces no useful input on feasibility or technical framing. The PM concludes "engineering doesn't care about discovery" when the real problem is that the translation didn't happen. Research that doesn't reach the people who need it might as well not have been done.

The second consequence is distortion through informal translation. If the agent doesn't translate, the PM will — imperfectly, under time pressure, in the middle of a different conversation. Informal translation tends toward oversimplification because the PM is not holding the full evidence base in memory. "Users hate the export function" is what comes out under time pressure when the finding was actually "users who attempt exports in the first two weeks of onboarding have a 40% higher support ticket rate, concentrated in the step where they need to choose a file format." The second finding implies a specific design intervention; the first implies a vague direction. Good agent-produced translation prevents the informal compression that loses precision.

In the Cagan framework, translation also serves the empowered team dynamic. Engineering and design are meant to be discovery partners, not execution resources. They can only play that partner role if they understand the opportunity evidence in terms that connect to their own expertise. An engineer who understands that users are confused about file format selection can immediately bring knowledge about the format options, what metadata is exposed, and what constraints exist. That input might change the solution direction. But that conversation only happens if the translation worked.

## What Good Looks Like

**Source finding (PM-level):**
> Opportunity: Users who attempt their first export within the first 14 days of onboarding have a materially worse experience than users who attempt it later — driven by confusion at the file format selection step, which offers seven options with no guidance on which to choose. Evidence: 6 interviews, 23 support tickets (Q1), 12% higher churn rate for this cohort vs. baseline. Confidence: Medium-High.

**Engineering translation:**
> For context on the export scope: user research shows the file format selection step is the primary friction point for new users attempting their first export. The seven format options have no in-context guidance or recommended defaults. This may be solvable in UI copy alone, or it may implicate the format selection logic if we want to offer smart defaults based on the user's connected integrations. Worth scoping both paths — happy to share the raw interview quotes on what specifically confuses users at this step.

**Design translation:**
> User context for the export flow: new users (first 14 days) consistently stall at the format selection step. They're typically trying to share a report with a stakeholder who isn't in the product — so their mental model is "I just want to send this as something they can open." The seven format options without guidance force them to make a technical decision they don't have context for. Edge case worth designing for: users who have multiple stakeholders with different format preferences. We have 3 interview quotes with specific behavioral detail I can share.

**Executive translation:**
> We've identified a churn signal tied to the export experience for new users. Users who try to export in their first two weeks are churning at 12% higher than baseline — we've traced it to a specific friction point in the format selection step. This is a medium-confidence finding (6 interviews + ticket data + cohort analysis). If validated, a fix here has high leverage because it's early in the retention window. We're designing an experiment to test whether guided format selection meaningfully changes this cohort's retention rate.

Each version is accurate. Each version emphasizes what matters to that specific audience and implies the decisions they need to make — without changing the underlying finding.

## Failure Modes

**Dumbing down for executives.** The executive version loses the confidence level, the cohort specificity, and the mechanism — leaving only "users have export problems." The executive now has a vague direction rather than a calibrated bet. This is worse than no translation because it creates false confidence in an imprecise finding.

**Using PM/discovery jargon untranslated.** Presenting an "opportunity statement" and "OST branch" to an engineering lead who doesn't share that vocabulary. The vocabulary signals the audience should engage in a specific way they may not know how to do. Translation requires leaving the shared PM vocabulary behind, not just attaching it to a different audience.

**Translating the finding but not the implied decision.** Good translation doesn't just present the evidence differently — it adjusts what decision or input the audience is being asked to make. Showing an engineer the opportunity without an invitation to weigh in on technical feasibility misses the point of the translation. Each audience version should close with what the agent (or PM) needs from that audience.

**Producing different confidence levels for different audiences.** Telling design the finding is "strongly evidenced" while telling engineering it's "still exploratory" because the agent thinks engineering will be more conservative. This is dishonest translation. Confidence is a property of the finding, not of who is hearing about it.

**Failing to flag when a finding can't be well-translated without losing critical nuance.** Some findings are genuinely complex — they require understanding the confidence mechanism, the sampling caveats, and the competing interpretations. An agent that compresses these into an executive soundbite without flagging the loss is creating a worse problem than not translating at all. The right move is to produce the translation and add: "Note to PM: this translation loses [specific nuance] — you may want to add a caveat in the executive conversation."

## How to Evaluate It

**Test 1 — Multi-audience rendering.** Give the agent a detailed opportunity brief. Ask it to produce translations for engineering, design, and executive audiences. Evaluate: does each version preserve the finding's accuracy and confidence level? Does each version emphasize what matters to that audience? Does each version close with a clear implied ask or decision?

**Test 2 — Accuracy preservation check.** Produce three audience-translated versions of the same finding and then ask: "Would any of these translations cause the audience to make a decision that the full PM-level evidence would not support?" This tests whether the translations have introduced distortions.

**Test 3 — Jargon audit.** Take the engineering translation and check it for PM/discovery jargon (opportunity, OST, desired outcome, signal clustering). If any remain, ask the agent to remove them without losing precision. This evaluates whether the agent is truly translating or just relabeling.

**Test 4 — Non-translatable finding prompt.** Give the agent a finding with significant nuance (e.g., a contradictory signal cluster where two interpretations are plausible). Ask for an executive translation. Does the agent produce the translation and flag the lost nuance, or does it silently oversimplify?

**Test 5 — Reverse translation.** Show the agent an executive-translated version of a finding and ask it to reconstruct what the PM-level evidence probably looked like. This tests whether the translations are truly lossless in the relevant direction or whether they've introduced irreversible compression.

## How to Develop It

**Build audience profiles into the agent's context.** Define, once, what each stakeholder audience cares about, what vocabulary they use, and what decisions they make in the product development process. These profiles become the translation reference. Engineering: feasibility, technical scope, architectural implications. Design: behavioral context, edge cases, user mental models. Executives: outcome progress, confidence in bets, risk posture. With explicit profiles, translation is systematic rather than intuitive.

**Use a translation template structure.** Each translated version should follow a consistent structure for that audience, making translation mechanical once the audience profile is defined: [finding in audience vocabulary] + [evidence in audience-relevant terms] + [what this implies for the audience's work] + [what the PM needs from this audience]. Templates prevent the agent from leaving out the implied ask.

**Train on before/after pairs.** Build a library of PM-level findings paired with well-executed audience translations. Use these as few-shot examples in prompts to calibrate the quality bar. Include examples of bad translations (too simplified, too jargon-heavy, confidence-altered) as negative cases.

**Require a "confidence preservation check" as the final translation step.** After producing each audience translation, the agent runs: "Does this translation preserve the original finding's confidence level accurately? Is there any wording that implies more or less certainty than the evidence supports?" This makes confidence integrity a structural output rather than an incidental one.

**Evaluate translations with real stakeholders periodically.** The best calibration signal is whether engineering, design, and executive audiences find the translated outputs useful — whether they produce the right kind of engagement. Build a lightweight feedback loop where the PM notes, after using a translated output in a stakeholder conversation, whether it worked. This creates real-world calibration data.

## Sample Prompts

**Prompt 1 — Multi-audience translation request:**
> "Here is the full PM-level brief for the top opportunity on our OST. Produce three versions of this brief: one for an engineering lead (focused on technical context and implied feasibility questions), one for a design lead (focused on user behavior, context, and edge cases), and one for a VP-level executive (focused on outcome progress, confidence, and strategic bet). Each version should preserve the finding's accuracy and close with the input or decision you're looking for from that audience."

**Prompt 2 — Translation integrity check:**
> "Review these three audience translations of the same finding. For each one: (1) identify any place where the translation has changed the confidence level, either up or down, (2) identify any PM/discovery jargon that wasn't translated, (3) identify whether the implied ask at the end is appropriate for that audience. Revise any translations that fail the check."

**Prompt 3 — Non-translatable finding handling:**
> "Here is a finding that has significant internal ambiguity — two plausible interpretations with different strategic implications. Produce an executive translation that is as useful as possible, and then add a 'translation note' to me (the PM) flagging specifically what was lost in the translation and what I should add verbally when I present this finding in the executive conversation."

## Connected Skills

[[Epistemic Self-Awareness]] — recognizing when a finding cannot be translated without losing critical nuance
[[Confidence Tagging]] — confidence levels are a property of the finding that must survive translation
[[Opportunity Validation]] — validated opportunities are the primary candidates for multi-audience translation
[[Escalation Calibration]] — knowing when a finding is too complex to translate without PM involvement
[[Proactive Surfacing]] — sometimes the right translation is surfacing something unprompted to the right audience at the right moment
[[Result Interpretation]] — experiment results often need to be translated for non-PM audiences who care about the outcome
