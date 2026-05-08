# Proactive Surfacing

> The skill of identifying and surfacing information the PM didn't ask for but would want to know — calibrated to avoid noise while catching things that would otherwise compound silently.

**Layer:** 4 — Judgment, Escalation & Metacognition
**Companion:** [[Agentic PM — Agent Capability Framework]]

---

## What This Skill Is

Proactive surfacing is what distinguishes an active discovery partner from a sophisticated command-runner. A command-runner executes what it's asked. A discovery partner notices relevant things even when it wasn't asked to look for them — and has a calibrated threshold for when to surface those things vs. when to stay in its lane. Proactive surfacing is that calibration made explicit and operational.

The skill requires the agent to maintain situational awareness across multiple dimensions simultaneously: the current state of the OST (which opportunities are active, which experiments are running, which branches are stalled), the incoming stream of evidence (new interviews, new ticket data, behavioral signals), and the internal consistency of the system (are the experiment designs testing what they claim to test, are opportunity statements still in customer language, do recent results change confidence tags). Against this background state, the agent is continuously running a filter: "Would the PM want to know about this if they saw it? Would they be frustrated if I knew and didn't say anything?"

The threshold for surfacing is not "anything interesting" — that produces noise. It is closer to: "If I had to predict whether the PM's next decision would be affected by this information, is the answer yes?" Examples that pass this threshold: a new cluster from this week's interviews that directly contradicts a high-confidence opportunity on the OST; an experiment that has been running for four weeks with no recorded update; a solution marked "exploring" for three consecutive planning cycles with no linked experiment; a pattern in recent interviews suggesting the team's desired outcome metric may be a proxy that doesn't correlate with what users actually care about. These are things that, left unnoticed, compound — they don't get better on their own.

Proactive surfacing is also about timing. Surfacing a stale experiment during the weekly sync is more useful than surfacing it in the middle of an unrelated synthesis request. Part of the skill is knowing when to surface something immediately (a finding that contradicts the active work in a high-impact way) vs. when to batch it to a regular review moment (a process hygiene issue that's real but not urgent). Mistimed surfacing creates the same noise problem as over-surfacing.

## Why It Matters

The OST is supposed to be a living document — a dynamic representation of the team's current best understanding of the opportunity landscape. In practice, it drifts. Experiments finish but results aren't recorded. Assumptions that were once uncertain get treated as settled over time. New evidence arrives that should update the tree but doesn't because no one explicitly pulled it in. The OST stops being a reliable navigation tool and starts being an artifact of what the team believed several months ago.

Proactive surfacing is the mechanism that keeps the tree alive. The agent is in the best position to notice drift because it has access to the full corpus — it sees when new interview patterns diverge from the existing tree, when experiment timelines have gone stale, when there are orphaned solutions with no linked experiments. The PM sees these things only when they look for them, which means during the active moments they don't notice the slow drift happening in the background.

There is a second reason proactive surfacing matters: it changes the nature of the PM's relationship to the discovery process. A PM who knows the agent is watching for drift and surfacing anomalies can focus their attention on judgment calls and strategic decisions, trusting that the background monitoring is covered. A PM who has to manually audit the OST for drift is doing systems maintenance work that crowds out the higher-judgment work only they can do. The agent's proactive surfacing creates cognitive space for the PM to operate at the level Cagan describes: setting direction, making bets, creating the conditions for the team to discover and deliver.

## What Good Looks Like

**Scenario: The agent is completing a weekly signal synthesis when it notices something not in scope for the request.**

Poor output (no proactive surfacing):
> Weekly synthesis complete. Three new signals this week, all consistent with existing opportunities. No new clusters identified.

The agent noticed that Solution Branch 4 has been in "exploring" status for 11 weeks with no linked experiment — but didn't say anything because it wasn't asked.

**Good output (calibrated proactive surfacing):**
> Weekly synthesis complete. Three new signals this week, all consistent with existing opportunities. No new clusters identified.
>
> **Flagging outside the synthesis scope:** While pulling the recent evidence, I noticed Solution Branch 4 ("Guided onboarding checklist") has been in "exploring" status for 11 weeks with no linked experiment. This has been true for at least the last 3 synthesis cycles. I'm not sure if this is intentional (deprioritized but not removed) or if it's drifted without being noticed. Not escalating this as urgent, but wanted to surface it in case it warrants a status decision. If it should be parked, I can move it to Dead Ideas with a summary note.

The second version stays on task, adds exactly one proactive surface with appropriate framing, and doesn't alarm the PM — it just makes the invisible visible.

**Scenario: A new interview cluster contradicts a high-priority opportunity.**

Poor output:
> Interview synthesis complete. New clusters attached.

Good output:
> Interview synthesis complete. New clusters attached.
>
> **Escalation — contradictory signal on high-priority opportunity:** One of the new clusters needs your attention before you read the rest of the synthesis. Four of the six interviews this week included unprompted mentions that users have developed a workaround for the status visibility problem (the top opportunity on our OST). Three of them said they're using Slack notifications from a third-party integration as their primary status signal, and two said they've stopped expecting the product to provide this natively.
>
> This doesn't invalidate the opportunity — the workaround friction is still real. But it does change the solution space: we may be designing against a problem users have already partially solved. I've tagged the relevant quotes and put this in the synthesis, but wanted to surface it here so you see it before you read the full output. Your call on whether this changes anything before we go into next sprint planning.

## Failure Modes

**Boy-who-cried-wolf surfacing.** The agent surfaces 8 things in every synthesis cycle, most of them minor. The PM habituates to dismissing the proactive flags and stops reading them carefully. When a genuinely important signal comes through, it gets the same casual dismissal as the noise. The threshold for surfacing needs to be high enough that when something is surfaced, it actually warrants attention.

**Surfacing observations without a clear PM action.** "I noticed that interview 7 mentioned a competitor feature" is not a well-formed proactive surface unless it connects to something on the OST or implies a specific decision. Proactive surfacing should always close with: "This matters because [implication] and the decision it implies is [X]." Observations without implications are just clutter.

**Missing slow drift because it doesn't trigger any single alert.** An experiment running 5 weeks without an update might not seem urgent in any individual week. But the agent should be tracking longitudinally — if it notices "this is the third week in a row I've seen no update on this experiment," that's a surface-worthy pattern. Bias toward the single-moment trigger rather than the cumulative drift is a proactive surfacing failure.

**Surfacing things the PM explicitly deprioritized.** If the PM said three weeks ago "we're not focused on enterprise features this quarter," and the agent keeps surfacing enterprise-relevant signals, the agent is not respecting established context. Good proactive surfacing requires memory of the PM's stated priorities — not just pattern-matching on what looks interesting.

**Burying the proactive surface inside a long output.** Putting an important flag in paragraph 4 of a 12-paragraph synthesis output means it's likely to be missed. High-priority proactive surfaces should be prominent and clearly labeled as "outside the scope of this request" so the PM can find them even when skimming.

## How to Evaluate It

**Test 1 — Stale experiment detection.** Give the agent access to an OST with one experiment that has been running for 6 weeks with no recorded result update. Ask it to run a routine synthesis (unrelated to the experiment). Does it surface the stale experiment proactively? Is the surface appropriately calibrated (not alarming, but visible)?

**Test 2 — Contradiction detection and surfacing.** Provide a new interview corpus that contains a signal directly contradicting a high-confidence OST opportunity. Ask for routine interview synthesis. Does the agent surface the contradiction proactively, ahead of the rest of the synthesis? Is the framing specific (here is the signal, here is the opportunity it contradicts, here is the implication)?

**Test 3 — Noise calibration test.** Give the agent access to an OST with many small inconsistencies (minor formatting issues, a few opportunity statements with slightly solution-y language, one experiment with a two-day-old update). Ask it to complete a routine task. Evaluate: does it surface all the inconsistencies (over-surfacing), none of them (under-surfacing), or the one or two with material implications?

**Test 4 — Prior context respect.** Establish with the agent a clear priority statement ("this quarter we're focused on retention, not acquisition"). Then include an acquisition-relevant signal in the next synthesis corpus. Does the agent still surface it as a proactive flag, or does it correctly categorize it as outside the current scope?

**Test 5 — Timing calibration.** Present the agent with a non-urgent process issue (a solution in exploring status for 8 weeks) and an urgent strategic issue (a contradictory signal on the top opportunity). Evaluate: does the agent surface both at the same urgency level (miscalibrated), or does it treat them differently — one as immediate, one as a batch item for the next review cycle?

## How to Develop It

**Build an explicit "watch list" into the agent's operating context.** Define the categories of things worth proactively surfacing: stale experiments (3+ weeks, no update), orphaned solutions (exploring status with no linked experiment for 2+ cycles), incoming signals that contradict high-confidence opportunities, patterns suggesting the desired outcome metric may be a proxy, team process drift. With an explicit watch list, surfacing is systematic rather than dependent on the agent happening to notice something.

**Establish a surfacing threshold rubric.** The test for whether something warrants proactive surfacing: "Would the PM be frustrated to learn that this was visible to the agent and wasn't flagged?" Apply this test explicitly rather than intuitively. If the answer is uncertain, default to surfacing with a low-urgency label rather than staying silent.

**Separate the surface from the main output.** Proactive surfaces should be structurally distinct from the requested output — labeled, positioned consistently, and brief. A template: "[FLAGGED OUTSIDE SCOPE] [what it is] + [why it matters] + [what decision it implies, if any] + [urgency level]." This structure respects the PM's attention and makes it easy to action or dismiss the flag quickly.

**Track surfacing outcomes over time.** When the PM dismisses a proactive surface, note that. When the PM says "glad you caught that," note that. Over time, patterns emerge: the agent is systematically over-surfacing a category that the PM consistently dismisses, or systematically missing a category the PM wishes it had caught. Use this feedback to recalibrate the watch list and threshold.

**Require the agent to run a "what did I not say" check at the end of each output.** Before finalizing any synthesis, the agent scans the full context for things that are relevant and true but not included in the output — and makes an explicit decision about whether each one warrants surfacing. This prevents the "I could see it but it wasn't in my task" failure mode that is the most common cause of missed proactive surfaces.

## Sample Prompts

**Prompt 1 — End-of-synthesis scan:**
> "You've completed the synthesis. Before finalizing, run a scan: (1) Are there any signals in the new evidence that contradict existing OST assumptions? (2) Are there any items on the OST that appear to have drifted (stale experiments, orphaned solutions, opportunity statements in solution language)? (3) Is there anything you noticed that the PM would likely want to know even though they didn't ask? If yes, surface them clearly and briefly at the top of the output with urgency labels. If no, confirm the scan found nothing and proceed."

**Prompt 2 — Watch list activation:**
> "Set up a proactive surfacing watch list for this OST. The list should include: any experiment running more than 3 weeks without a result update, any solution in 'exploring' status without a linked experiment for 2+ planning cycles, any incoming signal that contradicts a high-confidence opportunity, and any pattern suggesting the desired outcome metric may be measuring a proxy. Each time you complete a synthesis or review cycle, run the watch list and report matches at the top of your output."

**Prompt 3 — Threshold calibration:**
> "Here is a list of 8 things I noticed in the last synthesis cycle. Rate each one on a 1-3 scale: 1 = should have been surfaced proactively, 2 = borderline, 3 = correctly not surfaced. For each item rated 1, explain what you would have said if you'd surfaced it. Use this to update your internal threshold for what counts as worth surfacing in this OST."

## Connected Skills

[[Escalation Calibration]] — the overlap between proactive surfacing and escalation: both require knowing when to speak up
[[Longitudinal Pattern Tracking]] — the longitudinal view is what makes slow drift visible and surfaceable
[[Contradiction Detection]] — contradictions are one of the most important categories of things to surface proactively
[[Tree Health Checks]] — systematic tree reviews are the scheduled version of what proactive surfacing does continuously
[[Dead Ideas Tracking]] — surfacing candidates for the dead ideas log is a common proactive output
[[Confidence Tagging]] — surfacing confidence changes is a key proactive surfacing category
[[Epistemic Self-Awareness]] — the meta-skill that calibrates what's worth surfacing vs. what's noise
