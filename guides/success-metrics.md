# Is the Operating Model Working? — A 30/60/90-Day Guide

> **Who this is for:** PMs who have completed the curriculum (or are mid-capstone) and want to know whether the new operating model is actually taking hold — not just whether the tools are installed.

The Discovery Health Metrics answer "is my discovery practice healthy?" This guide answers the harder question: **"Is the way I work actually changing?"**

The two questions are related but not the same. You can have a healthy ledger and still be roadmap-driven. You can have weekly synthesis sessions and still commit to solutions based on opinion. The operating model is working when the *judgment layer* changes — when the artifacts start making decisions easier and the team starts defaulting to evidence rather than advocacy.

---

## What "working" looks like at each milestone

### 30 days — The habit is installed

You are not yet measuring outcomes from the operating model; you are measuring whether it's running at all.

**Signs it's working:**
- [ ] Weekly synthesis sessions are happening without requiring willpower — they're on the calendar and protected
- [ ] The Signal Ledger has dated entries every 1–2 weeks
- [ ] The OST has been updated based on new signal (not just re-read)
- [ ] `pm-config.md` has a real desired outcome — a measurable behavior change, not a feature
- [ ] At least one thing has been *deprioritized* because it didn't connect to the desired outcome

**Signs it's not working yet:**
- Synthesis sessions are happening but the OST isn't changing
- Everything still feels like it should be built
- The desired outcome in `pm-config.md` is a feature or a vanity metric
- Meetings still run on advocacy ("I think we should...") rather than signal ("users who churned said...")

**What to do if it's not working at 30 days:**
Don't add more tooling. Go back to Module 0 and re-run the backward trace on one recent decision. If you can't trace it to an evidence-backed opportunity, the operating model hasn't replaced the old one yet — they're running in parallel. The question to ask in every planning meeting: *"What customer behavior are we trying to change, and what's the evidence that this solution changes it?"*

---

### 60 days — The artifacts are making decisions

The habit is running. Now the artifacts should be doing real work — carrying context between sessions, enabling you to say no with evidence, and making the team less reliant on the PM to hold all the knowledge.

**Signs it's working:**
- [ ] Someone other than you (engineer, designer, stakeholder) has referred to the OST or ledger to answer a question
- [ ] At least one solution has been killed or de-prioritized based on experiment results or evidence quality
- [ ] The investment-gate assessment has returned "Not Ready" or "Conditionally Ready" on at least one thing — and the team accepted it
- [ ] A disagreement about prioritization was resolved by pointing at the evidence, not by debating opinions
- [ ] Onboarding a new stakeholder to the roadmap takes less time because the OST exists

**Signs it's not working yet:**
- The OST is being maintained but nobody else looks at it
- "Not Ready" gate verdicts are being overridden by roadmap pressure
- The same debates keep recurring because the evidence isn't being trusted

**The 60-day test:** Can someone who wasn't in last week's discovery session get current in under 10 minutes by reading the OST and the last two ledger entries? If not, the artifacts aren't carrying enough context.

---

### 90 days — The outcome is moving (or you know why it isn't)

At 90 days, you should have enough evidence to make a claim about whether the desired outcome is moving — or a clear, evidence-based explanation of why it isn't yet.

**Signs it's working:**
- [ ] You can state the current value of your desired outcome metric and compare it to 90 days ago
- [ ] You know which opportunity you invested in, which test you ran, and what the result was
- [ ] If the metric moved, you have a plausible causal story backed by the experiment results
- [ ] If the metric didn't move, you have a hypothesis about why — and it's grounded in the kill conditions and ledger, not in intuition
- [ ] The OST has been pruned at least twice — dead solutions archived, stale branches deprioritized

**Signs the operating model is running but not driving:**
- The metric is moving but you can't connect it to anything you explicitly tested
- You ran experiments but didn't write kill conditions, so you don't actually know what the results mean
- The OST reflects what the team wants to build, not what the evidence supports

**The 90-day honest question:** *If you had to explain to a skeptical colleague why you made the product decisions you made over the past three months — using only the OST, the Signal Ledger, and the experiment results — could you do it?* If yes, the operating model is working. If you'd have to fill in the gaps with memory and intuition, there are holes.

---

## Leading indicators vs. lagging indicators

The desired outcome metric is a lagging indicator — it reflects product decisions made weeks or months ago. Don't wait for it to evaluate whether the operating model is working. Watch the leading indicators instead:

| Leading indicator | What it tells you |
|---|---|
| Weekly synthesis running consistently | The habit is installed |
| OST updated after each synthesis | Evidence is connecting to structure |
| Kill rate > 0 per quarter | Discovery is honest, not confirmatory |
| Gate verdicts accepted, not overridden | The system is trusted |
| Team refers to artifacts without prompting | Artifacts are doing real work |
| Disagreements resolved by evidence reference | Advocacy culture is changing |

A team with strong leading indicators and a lagging metric that hasn't moved yet is doing the right things — the evidence will follow. A team with a moved metric but weak leading indicators got lucky, or moved it for reasons unrelated to the operating model.

---

## When to recalibrate

Three signals that the operating model needs adjustment (not abandonment):

**1. The desired outcome is wrong.** The monthly outcome check (Module 6) exists for this. If 60 days of discovery keeps surfacing customer needs that don't connect to the stated outcome, the outcome may not be the right one. Reframe it — everything downstream is calibrated to the root, so a wrong root compounds.

**2. The synthesis cadence isn't sustainable.** A cadence you can't maintain is a cadence you'll abandon. If weekly interviews are too heavy, move to bi-weekly interviews + weekly passive-feedback triage. The habit has to fit your actual week, or it won't survive contact with a busy quarter.

**3. The OST has become a report card, not a working tool.** If the tree is being maintained for the appearance of rigor rather than to make decisions, it's stopped doing real work. Signs: branches that haven't moved in 60 days and haven't been archived; solutions that haven't been killed even though experiments ran; everything at Medium confidence indefinitely. A pruning session (archive 3 things) often unblocks this.

---

## Reference

- [Discovery Health Metrics](../Discovery%20Health%20Metrics.md) — the four diagnostic categories and flag thresholds
- [Discovery Health Baseline template](../training/sample-data/discovery-health-baseline.md) — fill this in at 30 and 90 days to track movement
- [Module 6: Cadences & Health](../training/module-6-cadences-and-health.md) — how to install the rhythms
- [Agentic PM Playbook](../Agentic%20PM%20Playbook.md) — the full operating model
