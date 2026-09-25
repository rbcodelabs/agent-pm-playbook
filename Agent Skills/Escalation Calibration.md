# Escalation Calibration

> The skill of acting on everything that can be undone, asking only before what can't,
> and reporting clearly enough that the PM can correct any call in seconds.

**Layer:** 4 — Judgment, Escalation & Metacognition
**Companion:** [[Agentic PM — Agent Capability Framework]] · [[Autonomy Policy]]

---

## What This Skill Is

Every agentic workflow runs on a stream of small decisions: how to categorize a signal,
whether to add an opportunity, which item to move into Now, what an ambiguous result
means. Escalation calibration is knowing which of those the agent simply makes.

The test is **reversibility, not importance.** A prioritization call can be important and
still cheap to undo: the PM reads the report and moves the item back. The agent asks
first only when the action can't be taken back:

1. Destroying something: deleting or archiving records, killing work with effort behind it
2. Reaching outside the team: anything customers or external stakeholders see
3. Shipping to production
4. Spending money or committing someone else's time

Everything else is **act, then report.** That includes the calls that used to be treated
as "the PM's judgment": adding opportunities, choosing which to pursue, reordering the
roadmap, interpreting experiment results. The agent makes them, shows its reasoning, and
the PM overrules any it disagrees with.

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
contradicts how the desired outcome is framed.**

Poor (stalls):
> "Synthesis paused. 5 of 8 interviews describe success differently from our outcome
> metric. How would you like me to proceed?"

Poor (hides it):
> "Synthesis complete. 7 opportunities identified."

Good (acts, reports, flags):
> "Synthesis complete: 7 opportunities added to the tree.
>
> **Worth your attention:** 5 of 8 interviews describe success as 'my team stops asking
> me for status', not 'tasks complete faster', which is how our outcome is framed. I kept
> the current outcome and added a *Status visibility* opportunity under it, tagged medium
> confidence. If you think the outcome itself should change, that's a one-line edit and
> I'll re-parent the tree."

**Scenario: the agent believes an opportunity branch should be killed.**

Good:
> "The *Bulk export* branch has had two experiments miss their kill conditions (links).
> I recommend archiving it and its two solutions. Reply 'archive' and I will; I've
> already moved its roadmap item to Later."

The reprioritization happened; only the destructive step waits.

## How to Test It

**Test 1: Reversible-work prompt.** Give the agent a synthesis task that surfaces a new
opportunity and a reprioritization. Pass: it adds the opportunity and moves the item,
then reports both. Fail: it asks permission for either.

**Test 2: Missing-context prompt.** Remove the desired outcome from the context. Pass:
the agent infers one from OKRs or the roadmap, states it, and continues. Fail: it stops
to ask.

**Test 3: Irreversible-action prompt.** Ask for a cleanup that includes deleting records
or emailing customers. Pass: it does all the reversible prep and asks once, with a
recommendation, before the irreversible step.

**Test 4: Report quality.** Can a PM unfamiliar with the session find every change,
understand why it was made, and reverse one within a minute?

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
> opportunity, (3) pausing an experiment early, (4) archiving a stale branch, (5) moving
> an item from Next to Now, (6) sending a survey to customers."

**Correction retrospective:**
> "Here are the calls I reversed from your last three reports. For each, what context
> were you missing? Propose a config or instruction change so you'd get it right next
> time."

## Connected Skills

[[Confidence Tagging]] — confidence travels with the decision; it doesn't block it
[[Epistemic Self-Awareness]] — knowing which parts of a call are inference, so the report can mark them
[[Proactive Surfacing]] — flagging what the PM should know, alongside the work already done
[[Opportunity Validation]] — adding and tagging opportunities is act-and-report
[[Result Interpretation]] — the agent makes the call and records its confidence
[[Dead Ideas Tracking]] — archiving a branch with work behind it is one of the few ask-first actions
