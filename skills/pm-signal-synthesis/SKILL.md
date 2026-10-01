---
name: pm-signal-synthesis
description: >-
  Synthesize raw product signals — interviews, support tickets, surveys, sales
  calls — into structured Opportunities that attach to the Loop tree (signals attach to Opportunities, and to the Solution or Test they bear on, never to KRs). Use when the user has
  research or customer data to process and needs clustered insights with
  confidence tagging.
metadata:
  priority: 5
  docs:
    - https://github.com/richardbowman/agent-pm-playbook
retrieval:
  aliases:
    - signal synthesis
    - interview synthesis
    - research synthesis
    - user research
    - transcript synthesis
    - signal clustering
    - feedback synthesis
  intents:
    - synthesize my user interviews
    - process research transcripts
    - cluster customer feedback
    - analyze support tickets for opportunities
    - help me make sense of this feedback
    - what patterns are in this research
    - synthesize signals from user research
    - I have interviews to process
  entities:
    - interview transcript
    - user research
    - customer signals
    - support tickets
    - NPS responses
    - sales call notes
    - signal cluster
    - opportunity theme
chainTo:
  - pattern: "opportunity solution tree|\\bOST\\b|\\bOOKRST\\b|\\bthe loop\\b|\\bloop framework\\b|add to.*tree|update.*tree"
    targetSkill: loop-workflow
    message: Switching to the Loop tree workflow to map synthesized signals onto Opportunities
---

# PM Signal Synthesis

## Autonomy

Act, then report ([Autonomy Policy](../../Autonomy%20Policy.md)). Clustering, tagging, and applying the results to the tree (adding opportunities, attaching evidence, flagging challenged ones) are reversible: do them and report what changed. Confidence is a label, not a blocker: a single-source signal still becomes an opportunity, tagged `Low`. Missing provenance: infer it from the material, state the assumption in one line, continue. Contacting customers or recruiting participants to fill gaps needs a human first.

## Provider Preflight

Read `pm-config.md` and resolve `research_capture` for inputs and `insights` for synthesized output through the named `integration_profile` plus `provider_overrides`, following the installed [integration-routing contract](../integration-routing/SKILL.md). Use exactly one authoritative provider per capability; label secondary artifacts `inbox`, `export`, `cache`, or `snapshot`. With no config, work from context, name the defaults you used, and offer `pm-setup` at the end. For Compass insights, invoke `compass-workflow`, create granular feedback/insight records, and link them to the Loop objects inline (Opportunity first; Solution or Test where the signal bears on one).

Clustering, confidence, contradiction, and bias rules are invariant. The Signal Ledger format is only the Markdown/Obsidian adapter; otherwise persist provider-native insight records.

## What You Produce

- Opportunity clusters framed as customer needs, not topics
- Confidence-tagged evidence per cluster
- Contradiction flags between signals or against the existing Opportunities (and any Solution or Test they touch)
- Tree changes applied (new, updated, challenged Opportunities; evidence attached to affected Solutions or Tests)
- Gaps worth investigating next

## Signal Synthesis Workflow

### Step 1 — Inventory the Signals
Record source type, volume, segments, time window, and any hypotheses or existing Opportunities (and Solutions or Tests) to test against. Read these from the material and context; state any you inferred. Synthesis without provenance is guessing, so the inventory goes in the output.

### Step 2 — Cluster by Underlying Need
Read all signals before tagging. Group by **underlying customer need**, not surface topic.

Good: "Customers lose context when switching between tasks" — need: continuity
Bad: "Customers mentioned the dashboard" — topic, not need

Per cluster: opportunity statement, signal count and source breakdown, 2–3 verbatims with source type, confidence tag.

### Step 3 — Detect Contradictions
- Same need framed differently → merge, note the variance
- Conflicting needs across segments → state the segmentation question
- Signal that invalidates an existing Opportunity, or a Solution's assumption or a Test result → flag it at the top of the output

Surface contradictions; don't smooth them over.

### Step 4 — Check Longitudinal Patterns
Against prior rounds: which clusters are strengthening, weakening, or new? Trend direction matters as much as strength.

### Step 5 — Apply to the Loop Tree
Check for duplicates, then per cluster. Signals attach to **Opportunities** (the root of the tree); when a signal bears on a specific Solution's assumption or a Test, also link it there. Never attach raw signals to a KR or Outcome. If a new Opportunity has no Outcome yet, say so and hand off to `loop-workflow` Part 1, Step 3 to derive one.
- **Update existing** — attach the evidence to the known Opportunity
- **Add new** — create the Opportunity with its confidence tag and named segment
- **Challenge existing** — record the contradicting evidence on it and flag it; recommend archiving to a human only if the evidence is strong

### Step 6 — Name the Gaps
Close with the questions the data raises, each with a suggested next step: strong signal with no Test running or no Outcome above the Opportunity, clusters that may be one need, under-represented segments.

## Interview Transcript Synthesis

1. **Read fully before tagging** — skim-tagging misses nuance
2. **Find friction, workarounds, delight, and desire** — not opinions or feature requests
3. **Tag each moment** with theme, sentiment, segment, and exact quote
4. **Cluster tags across transcripts** into opportunity themes
5. **Weight by frequency and intensity** — one specific, intense signal can outweigh three mild ones
6. **Note what was not said** — absent expected concerns are data

## Confidence Tagging

Every synthesized opportunity carries a tag.

| Level | Criteria |
|---|---|
| **High** | 5+ independent signals, multiple methods, consistent across segments |
| **Medium** | 2–4 signals, or 5+ from a single source or method |
| **Low** | 1 signal, or all from the same customer or session |
| **Hypothesis** | No evidence yet — team assumption, labeled as such |

Low-confidence insights are starting points; the tag tells the team what to verify.

## Bias Detection

Check and name in the output: **sampling** (over-represented customer types), **confirmation** (clusters shaped to fit existing hypotheses), **recency** (recent signals over-weighted), **loudness** (vocal customers drowning out the quiet majority).

## Standard Output Format

```
## Signal Synthesis — [Date] — [Source(s)]

### Opportunity Clusters

**1. [Opportunity Statement framed as customer need]**
- Confidence: High / Medium / Low / Hypothesis
- Signals: N total (interviews: X, tickets: Y, surveys: Z)
- Verbatims:
  - "[exact quote]" — [source type]
  - "[exact quote]" — [source type]
- Tree action taken: Added / Updated [existing Opportunity] / Challenged [existing Opportunity]; also attached to: [SOL-n / TST-n or none]

[repeat for each cluster]

---

### Contradictions & Flags
- [Contradiction or urgent flag with explanation]

### Gaps and Next Steps
- [Question raised by the data, with suggested next step]

### Confidence-Lowering Factors
- [Sampling, confirmation, recency, or loudness bias detected]

### Assumptions Made
- [Provenance or context inferred]
```

## References

- [Transcript Synthesis](../../Agent%20Skills/Transcript%20Synthesis.md)
- [Signal Clustering](../../Agent%20Skills/Signal%20Clustering.md)
- [Contradiction Detection](../../Agent%20Skills/Contradiction%20Detection.md)
- [Bias Detection](../../Agent%20Skills/Bias%20Detection.md)
- [Confidence Tagging](../../Agent%20Skills/Confidence%20Tagging.md)
- [Longitudinal Pattern Tracking](../../Agent%20Skills/Longitudinal%20Pattern%20Tracking.md)
- [Full Playbook — Agentic Workflow Layer](../../Agentic%20PM%20Playbook.md)
