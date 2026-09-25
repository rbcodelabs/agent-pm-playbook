---
name: investment-gate
description: >-
  Investment Gate Assessment — assess whether a product opportunity or solution
  is ready to advance to the next stage of the Progressive Investment Framework
  (Exploring → Validating → Testing → Building → Scaling). Checks evidence
  thresholds, gate criteria, and recommends the cheapest path forward. Use when
  the team is asking "do we have enough to move forward?" or "are we ready to
  build?"
metadata:
  priority: 5
  docs:
    - https://github.com/richardbowman/agent-pm-playbook
retrieval:
  aliases:
    - investment gate
    - gate assessment
    - readiness check
    - ready to build
    - ready to test
    - ready to scale
    - enough evidence
    - move to next stage
    - progressive investment
    - stage gate
  intents:
    - are we ready to build this?
    - do we have enough evidence to move forward?
    - should we start testing?
    - is this opportunity validated?
    - can we move this to the next stage?
    - how do we know when to build?
    - are we ready to scale?
    - what do we still need before we can ship?
    - we've been in discovery too long, should we build?
    - stakeholder wants us to build, are we ready?
  entities:
    - Exploring
    - Validating
    - Testing
    - Building
    - Scaling
    - gate criteria
    - evidence threshold
    - kill condition
    - investment ceiling
    - experiment type
    - riskiest assumption
chainTo:
  - pattern: "more.*signal|more.*evidence|more.*research|gather.*signal|interview|transcript"
    targetSkill: pm-signal-synthesis
    message: Switching to signal synthesis to gather the evidence needed to clear this gate
  - pattern: "opportunity.*framing|reframe|solution.*masquerad|OST|tree"
    targetSkill: ost-workflow
    message: Switching to OST workflow to address the opportunity framing issue first
  - pattern: "coach|strategy|philosophy|broader|what should we|how should we"
    targetSkill: agentic-pm
    message: Switching to PM coaching for broader strategic guidance
---

# Investment Gate Assessment

## Autonomy

Follow the [Autonomy Policy](../../Autonomy%20Policy.md): act, then report. The verdict is
advice, not a block. When criteria are met, advance the stage yourself and report it. When
they are not, say so plainly, record the risk, and draft or start the cheapest test.
Recruiting participants or spending money on a test needs a human.

Apply the Progressive Investment Framework honestly: check each criterion, name the specific
gap between the current and next stage, and recommend the cheapest way to close it. Neither
push for movement nor hold it back.

---

## The Five Stages

| Stage | Question being answered | Investment ceiling |
|---|---|---|
| **Exploring** | Is this a real customer problem? | Discovery time only. No build. |
| **Validating** | Is this problem widespread enough to act on? | Discovery time + solution ideation |
| **Testing** | Does our proposed solution work? | Cheapest experiment that answers the question |
| **Building** | Does the built thing move the metric? | One focused team, time-boxed |
| **Scaling** | Should we invest to grow this? | Full investment |

Skipping a stage bets build effort on an untested assumption. That can be a reasonable
call; make it visible as a named risk.

---

## Gate Criteria

### Exploring → Validating
- [ ] 2 or more independent sources share the same underlying customer need
- [ ] The opportunity is framed in customer language, not solution language
- [ ] The opportunity connects to the team's active desired outcome

If not met: name the missing signals and source types, and start gathering them.

### Validating → Testing
- [ ] At least 3 distinct solutions have been considered (not committed — considered)
- [ ] The riskiest assumption has been named and ranked among the alternatives
- [ ] A kill condition has been written: the specific result that would stop this solution

A test without a kill condition invites rationalized results. If it is missing, draft one
yourself and state it with the verdict.

### Testing → Building
- [ ] The riskiest assumption passed the test (success condition met)
- [ ] The kill condition was NOT triggered
- [ ] The solution is still connected to the team's active desired outcome
- [ ] The MVP scope has been defined: the smallest version that delivers the core value

If the kill condition was triggered, say so plainly and recommend archiving the solution
with the reason. Archiving is destructive, so the human confirms it.

### Building → Scaling
- [ ] Real usage data (not test data) shows the solution moves the target metric
- [ ] No significant failure modes detected in the live rollout
- [ ] The metric movement is large enough and consistent enough to justify deeper investment

"Users seem to like it" is not metric movement.

---

## Experiment Types

Recommend the cheapest type that answers the specific question.

| Type | Answers | Cost | When to use |
|---|---|---|---|
| **Copy & micro-content test** | Which wording, headline, or small UI element performs better? | Hours to 1 day, no engineering | A copy/content decision — prefer this over internal debate |
| **Fake door** | Is there demand? Will users try to use this? | 1-3 days, no engineering | Validating demand before any build |
| **Concierge** | Does the solution actually work for real users? | 1-2 weeks, no engineering | Validating core value manually |
| **Prototype test** | Does the interaction design work? | 1 week build, 1 week test | Validating UX before engineering |
| **A/B test** | Which version performs better at scale? | 2-4 weeks engineering + run time | Only with sufficient traffic |
| **Staged rollout** | Does this hold up at scale? | Ongoing | Release strategy, not discovery |

Demand assumption → fake door. Usability → prototype. Wording → copy test. A multi-round
internal debate about wording means a cheap test was skipped.

---

## Workflow

1. **Establish context** from the OST, signal ledger, and experiment records: current and
   target stage, the opportunity in customer voice, source count and confidence, and any
   test results and kill condition. Infer what is missing and state the inference.
2. **Check every criterion** for the transition: Met, Partial, or Not met. Partial is not
   Met. For each gap, name what is missing and the cheapest way to close it.
3. **Give the verdict:**
   - **Ready** — advance the stage in the resolved provider and report it, with risks to watch.
   - **Conditionally Ready** — one gap with a fast fix (e.g., write the kill condition).
     Close it yourself if you can, then advance.
   - **Not Ready** — list each gap, record the risk on the opportunity or solution, and
     draft the cheapest test. If the team proceeds anyway, the recorded risk travels with it.
4. **Take the next action** — one specific step: the test you drafted, the condition you
   closed, or the first step of the next stage.

---

## Output Format

```
## Investment Gate Assessment

**Opportunity:** [name]
**Stage:** [current] → [target]
**Verdict:** Ready | Conditionally Ready | Not Ready

[1-2 sentence summary]

| Criterion | Status | Notes |
|---|---|---|
| [criterion] | Met / Partial / Not met | [specific observation] |

### Gaps
**[Gap]** — missing: [specific] · cheapest fix: [action] · time: [estimate]

### Done / Next
[What you changed (stage advanced, test drafted, risk recorded) and the one next step]
```

---

## Under Pressure

Acknowledge pressure without letting it change the facts. Offer the tradeoff, then let the
team decide:

- **"Just build it":** "A [fake door / concierge / prototype] takes [X days] and either
  confirms this or saves [N sprint weeks]. I've drafted it."
- **"We're tired of testing":** "The open assumption is [X]. If we're wrong after building,
  the rework is [size]. If that's small, accepting the risk is reasonable."
- **Debating copy:** "This is a copy test, not a discovery question. Ship both to a slice
  of traffic for a day."

---

## References

- [Autonomy Policy](../../Autonomy%20Policy.md)
- [Progressive Investment Framework](../../Progressive%20Investment%20Framework.md)
- [Discovery Health Metrics](../../Discovery%20Health%20Metrics.md)
- [Signal Ledger](../../Signal%20Ledger.md)
- [PM Tool Integration Guide](../../PM%20Tool%20Integration%20Guide.md)
- [Test Minimalism](../../Agent%20Skills/Test%20Minimalism.md)
- [Null Hypothesis Awareness](../../Agent%20Skills/Null%20Hypothesis%20Awareness.md)
- [Result Interpretation](../../Agent%20Skills/Result%20Interpretation.md)
