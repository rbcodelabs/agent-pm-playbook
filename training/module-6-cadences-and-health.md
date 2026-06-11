# Module 6: Cadences & Health

**Time:** Half day
**Coding required:** No.
**Prerequisite:** Modules 0–5. You now know the full loop; this module turns it into a sustained habit.
**You will produce:** The recurring discovery rituals scheduled in your *own* calendar/tooling, plus a baseline read of your Discovery Health Metrics with flag thresholds set.

---

## Why this module

A course you finish and a practice you keep are different things. Continuous discovery lives or dies on a **weekly habit**, and the failure mode is silent: synthesis sessions quietly stop, the ledger goes stale, the OST drifts, and months later it shows up as a bad product decision. This module installs the rhythms that prevent that — and the diagnostics that catch slippage *before* it costs you.

The key reframe: **the habit is the goal, not the metric count.** A PM who runs one solid synthesis session a week for a year learns more than one who does a 40-interview sprint quarterly. You're not optimizing numbers; you're making sure you keep showing up.

---

## Learning objectives

By the end of this module you will be able to:

- Run the four discovery cadences (weekly synthesis, bi-weekly OST pruning, monthly outcome check, continuous passive-feedback triage) and say what each is for.
- Treat passive feedback (tickets, reviews, NPS) as a continuous stream with a sustainable synthesis rhythm — distinct from interview synthesis.
- Read your Discovery Health Metrics across cadence, coverage, and evidence quality, and recognize a flag.
- Set the flag thresholds that tell you the practice is slipping before product decisions suffer.
- Decide who beyond you participates in discovery (cross-functional involvement).

---

## Concept reading

### The four cadences

| Cadence | Frequency | What happens |
|---|---|---|
| **Weekly synthesis** | Every week, no matter what | At least one synthesis session — interview, support review, NPS, reviews, or sales-call notes. One ledger entry. The OST gets touched. This is the heartbeat; if it holds, the rest follows. |
| **Passive-feedback triage** | Continuous / weekly | A 10-minute weekly pass over in-app feedback, tickets, and reviews — bulk-clustered, not deep-dived. Thin signals only become useful in aggregate. |
| **OST pruning** | Bi-weekly | Archive dead solutions (with reasons), merge duplicate opportunities, refresh confidence, demote branches with no recent signal. Keeps the tree honest. |
| **Outcome check** | Monthly | Step back to the root: is the desired outcome still the right one? Is it moving? Should the cycle extend or change? |

> **Interview vs. passive synthesis are different crafts.** Interviews are high-richness, low-volume, scheduled — synthesize deeply, one transcript at a time. Passive feedback is low-richness, high-volume, continuous — synthesize by **bulk clustering across a batch**, looking for convergence. Don't apply the interview method to 200 tickets, or the ticket method to a 45-minute transcript.

### Discovery Health Metrics — diagnostics, not a report card

These answer *"is my habit healthy?"* — not *"am I a good PM?"* Three categories worth watching, each with a flag threshold:

| Category | Metric | Flag when |
|---|---|---|
| **Cadence** (are you showing up?) | Weekly synthesis session; ledger entries; OST updates | Synthesis missed 2+ consecutive weeks; ledger gap >2 weeks; OST untouched 2+ weeks |
| **Coverage** (learning broadly?) | Segment diversity; source-type diversity; unmapped-signal rate | Single segment or single source type for 30+ days; >30% of new signals still unmapped after 2 weeks |
| **Evidence quality** (earned the right to act?) | Sources per prioritized opportunity; verbatim coverage; stale experiments | Any Prioritized opportunity with a single source; paraphrase-only clusters; an experiment Running 4+ weeks with no result |

A flag isn't a failing grade — it's an early warning to fix the practice before it shows up downstream.

### Who else participates

Discovery isn't a solo sport. Decide which engineers, designers, or support folks join interviews or synthesis — even occasionally. Shared exposure to customer signal is what stops the team from quietly reverting to opinion-driven roadmapping the moment you're out of the room.

**Go deeper:** [Discovery Health Metrics](../Discovery%20Health%20Metrics.md) (all four metric categories + targets), [Continuous Feedback Streams](../Continuous%20Feedback%20Streams.md) (passive-feedback streams, drip synthesis, and building a warm interview pool), and the *Cadences* section of the [Agentic PM Playbook](../Agentic%20PM%20Playbook.md).

---

## Hands-on exercise

> **🎯 This module is inherently about *your* practice.** Unlike Modules 2–5, there's no ShiftLoop substitute here — you're scheduling *your* real rituals against *your* product and outcome. If you're still practicing on the sample, schedule the rituals anyway as a dry run, then re-set them on your real product at the capstone.

**Steps:**

1. **Schedule the four cadences** in whatever you actually use (calendar, recurring task, or a scheduled agent). Weekly synthesis is non-negotiable; add bi-weekly OST pruning and a monthly outcome check. Make weekly passive-feedback triage a standing 10-minute slot.
2. **Consider automating the heartbeat.** A recurring agent that fires the weekly-synthesis prompt against your passive-feedback source makes the cadence hold even on a busy week. (This is also how the pilot satisfies its "ran twice unattended" gate.)

   > **Recipe — how to wire it up:** In a Claude Threads session inside Obsidian, invoke the `schedule` skill and tell it: *"Set up a weekly recurring agent that runs every Monday and fires the `pm-signal-synthesis` skill against [describe your passive feedback source — e.g., 'new Intercom tickets since last Monday' or 'App Store reviews from the past 7 days']."* The skill creates a CronCreate task in the vault. Once it's running, your week-0 habit is: open the synthesis thread it created, review the output, write your ledger entry. The agent does the clustering; you hold the judgment.
3. **Baseline your health metrics.** Open the **[Discovery Health Baseline template](sample-data/discovery-health-baseline.md)** and fill it in honestly — when did you last synthesize, how many segments/source types in the last 30 days, any Prioritized opportunity resting on a single source, any stale experiment. Keep the file; its value is in comparing it to a re-run 30–60 days later.
4. **Set your flag thresholds** from the table above, written down where you'll see them — so a slip trips a flag instead of going unnoticed.
5. **Name your participants.** Write down who beyond you will be exposed to customer signal, and how often. *(If you're a solo founder with no team: a contractor you brief on synthesis outputs counts; so does an engaged customer you talk to regularly, a peer founder who reviews your OST, or a designer who joins one synthesis session a month. The goal is that someone besides you has unfiltered exposure to customer signal — even once a quarter is better than never.)*

**Deliverable:** scheduled recurring rituals (show the calendar entries / tasks / agent), a one-page Discovery Health baseline with thresholds set, and a short list of discovery participants.

---

## Success criteria

- [ ] All four cadences exist as real recurring commitments — not intentions. Weekly synthesis is scheduled and protected.
- [ ] You can explain why passive-feedback synthesis uses bulk clustering while interview synthesis goes deep per transcript.
- [ ] You captured an honest Discovery Health baseline and wrote down the flag thresholds.
- [ ] You named at least one non-PM who will be exposed to customer signal.
- [ ] The weekly synthesis ritual is something you could keep for a year, not a sprint you'll abandon.

---

## Common failure modes

| Symptom | What's going wrong | Fix |
|---|---|---|
| "I'll synthesize when I have material" | Cadence treated as event, not habit | Schedule the session regardless of volume. The standing slot *is* the practice; material follows the habit, not the reverse. |
| Deep-diving 200 tickets like transcripts | Wrong synthesis method for the stream | Bulk-cluster passive feedback; reserve deep per-signal synthesis for interviews. |
| Optimizing the metric counts | Mistaking the diagnostic for the goal | The metrics catch slippage; they aren't a score. One consistent session a week beats a burst. |
| OST goes stale between sessions | No pruning cadence | Bi-weekly pruning: archive dead ideas with reasons, refresh confidence, demote signal-less branches. |
| Discovery stays a solo activity | No cross-functional exposure | Bring an engineer/designer/support person into a session. Shared signal is what holds the team to evidence. |
| A metric flagged and nothing happened | Thresholds not written / not watched | Put the thresholds where you'll see them; a flag should trigger a fix, not a shrug. |

---

## Next

You've run every part of the loop on the sample and installed the rhythms. The final step is the real one: run the whole cycle on *your* product, judged against a rubric.

→ **[Capstone: One Full Cycle on Your Real Product](capstone.md)**
