# Continuous Feedback Streams

Continuous discovery has two sourcing problems that undermine the habit before synthesis even happens. The first: no warm participant pool for interviews, so recruiting becomes the blocker that kills the cadence. The second: no synthesis rhythm for passive feedback, so in-app signals accumulate without ever becoming insight. Both problems leave signal on the table.

These two problems compound each other. Teams that struggle to recruit interviews try to compensate by collecting more passive feedback. But then they don't analyze that either, because there's no synthesis habit and no one owns it. The result is a growing backlog of unread responses that gives the appearance of listening without producing any learning.

This doc covers both: how to treat passive feedback as a continuous signal stream with a sustainable synthesis cadence, and how to build a participant pool that makes interview recruiting a weekly habit rather than a last-minute scramble.

---

## In-app and Passive Feedback as a Signal Stream

### What Counts as a Feedback Stream

- In-app NPS with open-text follow-up
- CSAT ratings with comment field
- In-app feedback widgets (e.g., "How can we improve this?" prompts)
- App store / marketplace reviews
- Support tickets and chat logs (tagged by theme)
- Sales call notes (structured)

Not all are equal. In-app NPS and feedback widgets give you intent signal but low richness per response. Support tickets and sales call notes give you higher richness but are noisier. Treat them as complementary, not interchangeable.

### Why Drip Synthesis Is Different from Interview Synthesis

| Dimension | Interview synthesis | Drip / passive synthesis |
|---|---|---|
| Richness per signal | High (30-60 min of context) | Low (1-3 sentences typically) |
| Volume | Low (3-5 per session) | High (20-200+ per batch) |
| Scheduled cadence | Yes (you control timing) | No (signals arrive continuously) |
| Verbatim quality | Strong (recorded/transcribed) | Variable (short text, autocorrect) |
| Synthesis approach | Deep-dive per transcript | Bulk clustering across batch |

The core challenge with passive feedback is that individual signals are too thin to act on. Synthesis only becomes useful when you cluster across a batch and look for convergence.

### The Synthesis Cadence

Use a hybrid time-plus-volume trigger. The goal is regularity without over-indexing on volume.

**Weekly triage (10 minutes, every week regardless of volume):**
- Scan for any Critical or High severity signals that need immediate attention
- Flag anything that contradicts an active OST assumption
- Do not do full synthesis — just check for fires

**Full synthesis session (whichever trigger comes first):**
- 20 or more new responses accumulated since the last session
- 2 weeks have elapsed since the last session

For early-stage products with low volume, the 2-week floor prevents indefinite delay. Waiting for volume before synthesizing means products with thin feedback never synthesize at all.

**Monthly:**
- Include stream signals in the trends briefing alongside interview signals
- Compare stream signal patterns against interview findings. Alignment strengthens confidence; divergence is a flag worth investigating

### Logging Stream Signals into the Signal Ledger

Use the same schema as interview signals. See [[Signal Ledger]] for the full field reference. Session type field values for stream signals:

| Session type | What it covers |
|---|---|
| `In-app NPS` | NPS responses with open-text follow-up |
| `In-app feedback` | Widget or prompt responses |
| `Support review` | Batch of support tickets reviewed |
| `App review sweep` | App store / marketplace reviews |
| `Sales call notes` | Structured notes from sales conversations |

Log one ledger entry per synthesis session, not per individual response. The cluster is the unit of logging, not the raw response.

### The Richness Problem and How to Address It

Low-richness signals are hard to cluster and easy to misinterpret. One sentence of feedback gives you almost no context for what the user actually meant. Two approaches help:

**Contextual triggers.** Collect feedback at specific moments in the product flow: after completing a key action, after a first session, after an error. Context-specific feedback is more interpretable than a generic prompt shown on a random page.

**Follow-up prompts.** When a user submits feedback or gives an NPS score, follow up with one open-ended question ("What's the one thing that would make this better?"). This adds richness without adding meaningful friction, and it dramatically improves the signal-to-noise ratio of your batch.

---

## Building and Maintaining a Participant Pool

### Why On-Demand Recruiting Fails

When recruiting happens only when research is needed, the process becomes the blocker. PMs skip interviews not because they don't value them but because assembling participants takes a week and the sprint starts Monday. The fix is decoupling recruiting from research scheduling. You recruit continuously so that when you're ready to run interviews, participants are already warm.

### The Continuous Recruiting Habit

Identify 1-2 potential interview candidates every week from existing touchpoints. This is a standing weekly habit, not a project with a deadline.

Sources to pull from:
- Recent signups, especially those who completed onboarding
- Power users (high session frequency, broad feature usage)
- Churned or at-risk accounts (the most valuable and most neglected source)
- Support ticket authors (they already had a reason to engage with the product)
- In-app feedback respondents (they opted in to improving the product — follow up)
- Third-party research platform panel (for segments you can't reach organically)

### The Pool Itself

A simple CRM or spreadsheet. Fields per participant:

| Field | Notes |
|---|---|
| Name, contact, company / segment | Basic identification |
| Last interviewed date | Enforce re-interview cadence |
| Topics covered | Avoid asking the same person the same question twice |
| Opt-in status and channel | Email, in-app, Slack, etc. |
| Notes on use case or context | Why this person is worth talking to |

**Minimum viable pool size:** 15-20 willing participants across your key segments. Below this, one scheduling conflict leaves you with no interview this week.

**Re-interview cadence:** Don't re-interview the same person within 6 weeks. Fresh participants notice things that habituated users have stopped seeing.

### Converting Feedback Responders to Interview Candidates

In-app feedback respondents are warm leads. They've already demonstrated willingness to engage with the product and with improving it. After each synthesis session, flag any respondents who gave High or Critical severity signals and reach out personally:

> "Thanks for the feedback — would you be open to a 20-minute call to tell us more?"

This is the most efficient recruiting channel for teams that have feedback mechanisms but struggle to fill interview slots. You're not cold-recruiting; you're following up on an existing signal.

### Using a Third-Party Platform Wisely

Research platforms (UserTesting, Respondent, User Interviews, etc.) are valuable for reaching segments you can't access organically. Caveats:

- Panel participants skew toward people who do research professionally. They're more articulate about problems and less representative of passive users.
- Use for: exploring new segments, validating findings with a broader sample, testing with specific demographic criteria.
- Don't use as a substitute for your own participant pool. Your customers know your product in ways panel participants don't.

---

## Connecting Streams to the OST

Both interview signals and passive feedback flow into the same [[Signal Ledger]]. The OST doesn't care about source type. An opportunity is an opportunity whether it surfaced in an interview or across 40 NPS comments.

What matters operationally:

- Tag evidence with source type so you can assess diversity later. An opportunity supported by only one source type is less robust than one that surfaces across multiple streams.
- Calibrate confidence levels for richness. 40 one-sentence NPS comments clustering around the same theme may earn medium confidence, not high. Volume doesn't substitute for depth.

One useful check at each synthesis session: for your top OST opportunities, are you getting corroborating signal from multiple source types? An opportunity that only surfaces in interviews but never in support tickets or NPS may not be as universal as it appears. The inverse is also true — a pattern that shows up in passive feedback but never comes up when you talk to users directly is worth probing in the next interview cycle.

---

See also: [[Signal Ledger]], [[Discovery Health Metrics]], [[Longitudinal Pattern Tracking]], [[Agentic PM Playbook]]
