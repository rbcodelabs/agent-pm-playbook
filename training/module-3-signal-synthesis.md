# Module 3: Signal Synthesis

**Time:** 1 day
**Coding required:** No.
**Prerequisite:** [Module 2](module-2-your-first-ost.md) (your ShiftLoop OST) and the [sample signals](sample-data/) — 3 interviews + 21 support tickets.
**You will produce:** Confidence-tagged opportunity clusters with verbatims and contradiction flags, mapped onto your Module 2 tree, and captured as one Signal Ledger entry.

---

## Why this is the module that converts people

This is where the new operating model stops being a diagram and hits you in the gut. You are going to take 3 messy interview transcripts and 21 support tickets — a corpus that is *hours* of careful manual synthesis — and turn it into structured, evidence-tagged, OST-ready opportunity clusters in about twenty minutes, with **better** evidence attribution than you'd do by hand. The "4 hours → 20 minutes" collapse is the visceral proof that continuous weekly discovery is actually sustainable. That's the whole bet of the playbook, and you feel it here.

But the speed is not the point — the *judgment* is. The skill produces clusters; **you** decide which are real, which contradict, what's noise, and what maps to the tree. This module trains that judgment against a dataset with deliberate traps.

---

## Learning objectives

By the end of this module you will be able to:

- Cluster signals by **underlying customer need**, not by surface topic.
- Attach a **confidence tag** and representative **verbatims** to every cluster.
- Detect and *surface* contradictions instead of smoothing them into a false consensus.
- Map each cluster to the OST as **add new / update existing / challenge existing** — and reject signals that don't belong on the tree at all.
- Record a Signal Ledger entry so this session is comparable to future ones.
- Spot the four synthesis biases (sampling, confirmation, recency, loudness) in your own output.

---

## Concept reading

### Cluster by need, not topic

The single most important move in synthesis:

- **Good cluster (a need):** *"Managers can't get their existing team into the tool without re-keying it by hand."*
- **Bad cluster (a topic):** *"People mentioned import."*

A topic is where the word appeared. A need is what the customer was trying to accomplish and couldn't. Read **all** the signals before you tag anything — first-pass tagging on a skim misses the nuance.

### Confidence tagging — never present a cluster without one

| Level | Criteria |
|---|---|
| **High** | 5+ independent signals, multiple methods (e.g., interviews *and* tickets), consistent across segments |
| **Medium** | 2–4 signals, or 5+ all from one source/method |
| **Low** | 1 signal, or all from the same customer/session |
| **Hypothesis** | No evidence yet — an explicitly labeled team assumption |

Low confidence isn't worthless — it's a starting point that tells the team what to verify next. Mislabeling low as high is how teams build on sand.

**Count is the floor, not the ceiling.** The table keys off raw signal *count*, but **intensity and method-diversity can promote a cluster.** A small corpus (say 3–4 signals) that shows up *across two methods* (an interview **and** tickets) and is consistent can earn **High** even though the count alone says Medium — note the reason. Conversely, five mild mentions from one source stay Medium. When you promote on intensity, say so explicitly in the cluster.

### Contradictions are signal, not noise

When two credible signals disagree, **do not resolve it by majority vote.** A contradiction usually means you're looking at *two different segments with two different needs*. Surface it and name the segmentation question. (ShiftLoop has two planted contradictions waiting for you — find them.)

### Weight by intensity, not just frequency

One passionate, specific, unprompted signal can outweigh three mild mentions. "I gave up and went back to my spreadsheet" is worth more than five "would be nice if..."s.

### The Signal Ledger

Every synthesis session produces one dated **ledger entry** — the memory layer that makes longitudinal pattern tracking possible. A pain mentioned twice in January, five times in February, nine in March is telling you something you can only see across time. Schema consistency is the whole value — an entry format you only follow sometimes is barely better than nothing.

**Per-cluster fields:** opportunity theme · 2–3 verbatims · source identifiers · **severity** · OST mapping · confidence. Plus a session header (date, session type, sources, segment).

**Severity** is *not* the same as confidence. Confidence is *how sure you are the signal is real*; severity is *how much it hurts the customer*:

| Severity | What it means |
|---|---|
| **Low** | Minor friction, hedged language, no behavioral impact |
| **Medium** | Recurring frustration, affects workflow, no workaround yet |
| **High** | Blocker, workaround adopted, mentioned unprompted |
| **Critical** | Churn risk, escalation, customers switching tools |

**Worked example — one ledger entry (so you can copy the shape):**

```
Date: 2026-06-10 | Session: Support review | Product: ShiftLoop
Sources: 3 interviews (SMB managers) + 21 support tickets | Segment: shift managers
Outcome: First-schedule activation 38% → 60%

C1  Roster import friction        | "adding them one by one will take forever" (T-01); "I gave up and went
                                     back to my spreadsheet" (Maria) | src T-01,02,03,04,11,14,15,21 + Maria,Devon
                                   | Severity High | OST: roster-import opp (update) | Confidence High
C2  Staff don't submit availability| "I'm chasing eighteen college kids over text" (Priya); "reminder emails
                                     would save hours" (T-17) | src T-07,08,09,17 + Priya | Severity High
                                   | OST: availability opp (update) | Confidence Medium
C3  Auto-scheduler trust [CONTESTED]| "I don't trust a robot" (Maria) vs "love it, it's why I stayed" (Priya)
                                   | src T-06,13 + Maria,Priya,Devon | Severity Medium | OST: trust opp (update,
                                     flag contradiction) | Confidence Medium | Seg-Q: trust vs team size?
OFF-TREE: T-20 Safari bug (defect→eng); T-16 tips/pay (orphan→backlog); T-18 billing (→support)
Bias: ticket-heavy method skew noted; C2 availability lacks buyer-segment representation
```

**Go deeper:** [`pm-signal-synthesis` skill](../skills/pm-signal-synthesis/SKILL.md) (full workflow + the standard output format), [Signal Ledger](../Signal%20Ledger.md) (the schema and severity definitions), [Confidence Tagging](../Agent%20Skills/Confidence%20Tagging.md), [Contradiction Detection](../Agent%20Skills/Contradiction%20Detection.md), and [Bias Detection](../Agent%20Skills/Bias%20Detection.md).

---

## Hands-on exercise

> **🎯 Doing this on your own signals?** The exercise uses the ShiftLoop corpus so everyone practices on the same material. To run it on your real product: use *your* OST (from Module 2 on your product) and *your* signals (a batch of real interviews, tickets, reviews, or sales notes) in place of the ShiftLoop files. The **method is identical**; only the inputs change. Where a step below names a specific ShiftLoop finding ("the two planted contradictions," "billing/Safari/tips are the noise"), treat that as the *worked answer for the sample* — your job on your own data is to find *your* clusters, *your* contradictions (could be zero, one, or several), and *your* noise. Don't force your data to match ShiftLoop's shape. **For Step 2:** if you're working on your own signals without the skill active, skip the skill invocation — apply the conceptual steps (cluster by need, tag confidence, hunt contradictions, map to tree) directly against your corpus.

**Setup:** Have your Module 2 OST open, plus the three interviews ([Maria](sample-data/interviews/interview-01-maria.md), [Devon](sample-data/interviews/interview-02-devon.md), [Priya](sample-data/interviews/interview-03-priya.md)) and the [21 support tickets](sample-data/support-tickets.md). **Do not open the [facilitator key](sample-data/facilitator-key.md)** until after you finish — it's the answer sheet.

**Steps:**

1. **Time yourself.** Note the clock. (You'll want the before/after number; it's the proof.)
2. In a thread, trigger the skill: *"Synthesize these ShiftLoop signals into OST-ready opportunity clusters."* Give it the inventory it asks for — source types, volume (3 interviews + 21 tickets), segments, time window.
3. Let it produce **clusters by need**, each with a confidence tag, source counts, and 2–3 verbatims. Read critically — does each cluster name a *need* or just a *topic*?
4. **Hunt the contradictions yourself** before reading the output's flags, and name the segmentation question behind each. *(The ShiftLoop sample has exactly two — auto-scheduler trust, and staff-app adoption. On your own data there may be zero, one, or several; find however many are actually there, don't manufacture two.)*
5. **Map to your tree.** For each cluster decide: *add new*, *update existing* (strengthen an opportunity already on your Module 2 tree), or *challenge existing*. Critically — decide what does **not** go on the tree: noise (billing, the Safari bug, the password-reset bug) and the off-outcome **orphan** (the tips/pay request). Check for near-duplicate tickets so you don't double-count. Also handle **delight signals** — positive quotes confirming something works (e.g., "the producer story made me buy more") are *not* opportunities; they're solution-direction evidence. Add a note on the relevant solution node and keep them off the opportunity layer.
6. **Run the bias check.** Is any segment overrepresented? Are you weighting the loudest tickets? Name any bias in the output.
7. **Write the Signal Ledger entry** using the schema: date, session type, sources, then per cluster (theme, verbatims, source IDs, severity, OST mapping, confidence).
8. Stop the clock. Compare to your honest estimate of doing this by hand.

**Deliverable:** a synthesis output (clusters + contradictions + bias notes), an updated OST, and one Signal Ledger entry — plus your before/after time.

---

## Success criteria

- [ ] Every cluster is a **customer need**, not a topic, and carries a **confidence tag** with verbatims and source counts.
- [ ] Every contradiction in your corpus is **surfaced as contested**, with the segmentation question named — not resolved by majority. *(In the ShiftLoop sample that's two: auto-scheduler trust and staff-app adoption.)*
- [ ] Confidence is **calibrated to evidence**: your strongest, multi-method, cross-segment cluster lands High; thin or single-source clusters land lower, and contradicted ones are flagged. *(ShiftLoop: roster-import = High; staff-app = lower + contradicted.)*
- [ ] **Noise and off-outcome orphans are kept off the tree** — defects route to engineering, billing/pricing routes to support, and requests that don't ladder to the outcome go to a backlog. *(ShiftLoop: Safari bug + password reset = defects; billing = support; tips/pay = orphan.)*
- [ ] Near-duplicate tickets are deduped, not double-counted.
- [ ] You wrote a schema-complete **Signal Ledger** entry.
- [ ] You can state your before/after synthesis time.

---

## Common failure modes

| Symptom | What's going wrong | Fix |
|---|---|---|
| Clusters are named "Import," "App," "Scheduler" | Clustering by topic, not need | Re-ask: what was the customer *trying to do* and couldn't? Name that. |
| The auto-scheduler contradiction got "resolved" to one answer | Majority-vote thinking | Two segments, two needs. Surface it; name the segmentation question (reluctant high-volume manager vs. small-team adopter). |
| The tips/pay request became an opportunity on the tree | Off-outcome orphan attached anyway | It's real but doesn't ladder to *activation*. Keep it in a backlog or a different tree. |
| Billing / Safari / password tickets clustered as opportunities | Noise treated as signal | Billing is a question; the Safari and reset bugs are defects → route to engineering, not the tree. |
| The two near-duplicate "60 employees, one at a time" tickets counted as two needs | Double-counting inflates confidence | Dedupe with rationale before tagging confidence. |
| Everything tagged High confidence | Confidence inflation | Apply the table strictly. A single-source cluster is Low even if it's loud. |
| Staff-app pain rated High off Priya's enthusiasm | Loudness/recency bias | One vivid voice ≠ strong evidence. It's contradicted and low-volume → lower confidence, name the bias. |
| No ledger entry written | Skipped the memory layer | Without it there's no longitudinal trend later. Write the entry every session, same schema. |

---

## Next

You now have an evidenced tree with a clear focus branch. Next you take its riskiest assumption and design the cheapest possible test — and decide how much to invest before building anything.

→ **[Module 4: Experiments & Progressive Investment](module-4-experiments-and-investment.md)**
