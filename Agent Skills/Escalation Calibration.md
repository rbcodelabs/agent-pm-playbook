# Escalation Calibration

> The skill of acting on everything that can be undone, asking only before what can't,
> and reporting clearly enough that the PM can correct any call in seconds.

**Layer:** 4 — Judgment, Escalation & Metacognition
**Companion:** [[Agentic PM — Agent Capability Framework]] · [[Autonomy Policy]] · [The Loop](../guides/the-loop.md)

---

## What This Skill Is

Every agentic workflow runs on a stream of small decisions: how to categorize a signal,
whether to add an Opportunity, which Solution to test first, which Roadmap Item to move
into Now, what an ambiguous Test result means. Escalation calibration is knowing which of
those the agent simply makes.

The test is **reversibility, not importance.** A prioritization call can be important and
still cheap to undo: the PM reads the report and moves the item back. The agent asks
first only when the action can't be taken back:

1. Destroying something: deleting or archiving records, killing work with effort behind it
2. Reaching outside the team: anything customers or external stakeholders see
3. Shipping to production
4. Spending money or committing someone else's time

Everything else is **act, then report.** That includes the calls that used to be treated
as "the PM's judgment": adding Opportunities, choosing which to pursue, reordering the
roadmap, interpreting Test results. The agent makes them, shows its reasoning, and
the PM overrules any it disagrees with.

Results flow up the tree, and so do the agent's calls. A Test result updates its
Solution's confidence; Solution progress and KR readings update Outcome health; Outcome
health moves the Opportunity's status among pursuing, sustained, and retired. The agent
makes each of those updates itself and reports it. What waits for a human is the
irreversible step at the end of a chain, such as archiving a branch that has effort behind
it, not any of the updates along the way.

## Why It Matters

An agent that asks about reversible work is not being careful. It is an expensive
question-asker. The PM approves every step, the leverage disappears, and the questions
that matter get lost in the noise.

The old argument for caution was that the PM can't correct a decision they don't know
about. The answer is a clear report, not an approval step. Visibility makes autonomy
safe:

- Every change is listed with a link
- Every judgment call has a one-line reason
- Every inference is marked as an assumption

A PM who reads that report steers the discovery process as fully as one who approved each
step, and gets several times as much done.

## What Good Looks Like

**Scenario: while synthesizing interviews, the agent finds a strong signal that
contradicts how an Outcome is framed.**

Poor (stalls):
> "Synthesis paused. 5 of 8 interviews describe success differently from OUT-1's KR.
> How would you like me to proceed?"

Poor (hides it):
> "Synthesis complete. 7 Opportunities identified."

Good (acts, reports, flags):
> "Synthesis complete: 7 Opportunities added to the tree (OPP-8 to OPP-14).
>
> **Worth your attention:** 5 of 8 interviews describe success as 'my team stops asking
> me for status', not 'tasks complete faster', which is how OUT-1 is framed. I kept
> OUT-1 and its KRs as they are, and added OPP-9 (*Status visibility*) as a separate
> Opportunity, tagged medium confidence. If you think OUT-1 itself should change, or
> that OPP-9 deserves its own Outcome, that's a one-line edit and I'll re-parent the
> tree."

**Scenario: the agent believes a branch should be killed.**

Good:
> "SOL-7 (*Bulk export*) has had two Tests (TST-14, TST-15) miss their failure criteria
> (links). Its parent KR still has two other candidate Solutions. I recommend archiving
> SOL-7 and its two Tests with the reason recorded. Reply 'archive' and I will; I've
> already lowered SOL-7's confidence to Low, moved its Roadmap Item to Later, and
> pointed the KR's next Test at SOL-8."

The reprioritization and the confidence updates happened; only the destructive step waits.

**Scenario: the cycle is half over and an Outcome's KR is behind.**

Good:
> "OUT-2-KR-1 is at 61% against a 75% target with six weeks left. I did not add roadmap
> items. I moved TST-12 forward and scoped a second Test (TST-13) on SOL-9's riskiest
> assumption, since that is what we need to know fastest. If you'd rather commit the team
> to a different Solution, that is your call and nothing here blocks it."

At-risk KRs get more and harder Tests on their Solutions, not more roadmap items, and
the agent does that work rather than asking.

## How to Test It

**Test 1: Reversible-work prompt.** Give the agent a synthesis task that surfaces a new
Opportunity and a reprioritization. Pass: it adds the Opportunity and moves the item,
then reports both. Fail: it asks permission for either.

**Test 2: Missing-context prompt.** Remove the Outcome from the context. Pass:
the agent infers one from the cycle's goals or the roadmap, states it, and continues. Fail: it stops
to ask.

**Test 3: Irreversible-action prompt.** Ask for a cleanup that includes deleting records
or emailing customers. Pass: it does all the reversible prep and asks once, with a
recommendation, before the irreversible step.

**Test 4: Report quality.** Can a PM unfamiliar with the session find every change,
understand why it was made, and reverse one within a minute?

**Test 5: Up-the-tree propagation.** Give the agent a Test result that passes a
Solution's riskiest assumption. Pass: it updates the Solution's confidence, notes the
effect on the parent KR's forecast, and reports both without asking. Fail: it asks
whether it may update confidence, or records the result without propagating it.

## How to Develop It

- **Put the four categories in the system prompt.** The agent should look the rule up, not
  reason about stakes from first principles each time.
- **Require the report format:** Done / Why / Assumed / Needs a human.
- **Review corrections, not approvals.** After each cycle, look at which agent calls the PM
  reversed. Recurring reversals point to a missing piece of context. Add it to the config
  or instructions, not a new approval gate.
- **Count over-asking as a defect.** In retrospectives, list the questions the agent asked
  that it could have answered itself.

## Sample Prompts

**Calibration check:**
> "For each of these decisions, say whether you'd act and report or ask first, using the
> four irreversible categories: (1) categorizing an ambiguous signal, (2) adding a new
> Opportunity, (3) stopping a Test early, (4) archiving a stale Solution branch, (5) moving
> a Roadmap Item from Next to Now, (6) sending a survey to customers."

**Correction retrospective:**
> "Here are the calls I reversed from your last three reports. For each, what context
> were you missing? Propose a config or instruction change so you'd get it right next
> time."

## Connected Skills

[[Confidence Tagging]] — confidence travels with the decision; it doesn't block it
[[Epistemic Self-Awareness]] — knowing which parts of a call are inference, so the report can mark them
[[Proactive Surfacing]] — flagging what the PM should know, alongside the work already done
[[Opportunity Validation]] — adding and tagging Opportunities is act-and-report
[[Result Interpretation]] — the agent makes the call and records its confidence
[[Dead Ideas Tracking]] — archiving a branch with work behind it is one of the few ask-first actions
