# Facilitator Key — ShiftLoop Sample Data

> ⚠️ **Spoilers.** This file is the answer sheet for the Module 2 and Module 3 exercises. **Do the exercises first**, then open this to compare. It's kept in a separate file (not inside `seed-loop.md` or `support-tickets.md`) precisely so you don't read the answers while doing the work.

---

## Seed Loop tree — planted structural flaws (Module 2)

`seed-loop.md` contains **five** planted structural mistakes. A good health check finds at least four.

1. **Solution masquerading as an Opportunity** — *OPP-3, "Build a mobile app for staff."* "Build an app" is a solution, not a customer need. (Check failed: *Opportunity framing*.) The real needs hiding under it are things like *"staff don't submit availability"* (already part of OPP-1, so this is also a duplicate of a need) or *"staff can't easily see when they work."* Reframe to the need; the app is one possible Solution to it, parented by a KR once the need has an Outcome.

2. **Outcome that doesn't trace to its Opportunity (second root / outcome drift)** — *OUT-2, "Reduce monthly churn of paying accounts,"* hung under OPP-1. (Failed: *Outcome clarity*.) OPP-1 is about trial managers getting set up; churn of paying accounts is a different need and a different segment. Its KR and Solutions (loyalty discount, win-back) don't move trial activation at all. Fix: give it its own Opportunity (and its own branch), or retire it. Bonus catch: *SOL-7, "Loyalty discount after 6 months,"* assumes a cause (price) that no signal supports; watch for learners who keep it because it "sounds reasonable."

3. **Orphaned Solution — addresses a different Opportunity than its ancestry** — *SOL-9, "Tips & earnings dashboard,"* parented by OUT-1-KR-1. (Failed: *Solution coverage*.) A real request (see ticket T-16, and Priya raised it), recorded on the tree as OPP-4, but it does not move 7-day activation or address OPP-1. Fix: re-parent it under OPP-4 once that Opportunity earns an Outcome; remove it from the activation branch so it doesn't imply it serves the KR.

4. **Solution attached directly to the Outcome, skipping the KR level** — *SOL-6, "Redesign the onboarding wizard,"* hangs off OUT-1 with no parent KR and no named need. (Failed: *Solution coverage*.) Until it names the KR it moves and the need it addresses, it's a solution in search of a problem. Fix: surface the need (likely *"I don't know where to start / can't find how to publish"* — tickets T-05, T-13), then re-parent it to the KR it would move.

5. **Output-framed Key Result** — *OUT-1-KR-2, "Ship the new import wizard by end of quarter."* (Failed: *KR quality*.) A launch date, not a measured change in behavior; it also has no baseline and zero Solutions under it. Fix: replace it with an outcome measure of the same funnel step (e.g., share of trials that load at least 5 staff within 24 hours, baseline `TBD` plus a task to measure it) and generate at least 3 Solutions for it.

**Healthy branches that should survive the cleanup:** OPP-1, OUT-1, OUT-1-KR-1 and the roster-import and availability Solutions under it (SOL-1 to SOL-5) — the roster-import need has the strongest evidence in the dataset. TST-1 is a well-formed Test: one assumption, success and kill written in advance. **OPP-2 (auto-scheduler trust)** is legitimate but carries a real contradiction (Maria/T-06 distrust vs. Priya/Devon) — a good learner flags it as *contested* and leaves it waiting for its own Outcome, rather than deleting it or blindly attaching its ideas to the activation KR.

**Note the bug, don't treelize it:** the Safari grid bug (T-20) and the expiring password-reset (T-19) are real defects to route to engineering — they are not Opportunities and should not appear on the tree at all.

**Cross-check on Part A:** a good learner-built tree has an Outcome with *no* numbers in it (the 38% → 60% belongs in a KR) and an Opportunity framed as a need, not "increase activation."

---

## Support tickets — planted structure (Module 3)

Rule 7 of the Loop guide applies: signals attach to Opportunities (and to the Solution or Test they bear on), never to KRs.

- **Strongest cluster (high confidence, many sources, both channels + interviews):** roster setup / bulk import friction — T-01, T-02, T-03, T-04, T-11, T-14, T-15, T-21, plus Maria and Devon. This is the cluster that maps to the most leverage on OUT-1-KR-1 (activation); it is the core evidence for OPP-1.
- **Strong cluster:** availability collection from staff — T-07, T-08, T-09, T-17, plus Priya. Note the manager-is-the-bottleneck framing. Also evidence for OPP-1.
- **Medium / contradicted:** auto-scheduler trust — T-06 and T-13 (distrust / can't-see-reasoning) vs. Priya (loves it) and Devon (wants managers to lean on it). A genuine contradiction to flag, not resolve by majority vote. Attaches to OPP-2.
- **Weak / contradicted:** staff mobile app — T-09 and Priya (staff love viewing) vs. T-10 and Devon (won't download). Lower volume; weaker evidence for activation specifically. Attaches to OPP-3 (which needs reframing as a need first).
- **First-run / "where's the button" confusion:** T-05, T-13 — supports a new first-run-orientation Opportunity (the need SOL-6 should be hanging under).
- **Copy-forward / starting-from-blank:** T-12 — small but relevant to "reduce first-session effort."
- **Noise (should NOT become Opportunities):** T-18 (billing), T-19 (password reset — though repeated expiry is a minor real bug), T-20 (Safari bug — real bug, route to engineering, not an Opportunity), T-16 (tips/pay — real request but **off-outcome**; it's the orphan: it belongs on OPP-4, not as SOL-9 under OUT-1-KR-1. Watch for learners attaching it to the activation branch anyway).
- **Duplicate-ish:** T-03 and T-21 are near-duplicates by design — good test of whether the synthesis dedupes or double-counts.

---

## Two contradictions worth getting right

The dataset plants **two** contradictions. The teaching point is to *surface them as segmentation questions*, never to resolve them by majority vote:

1. **Auto-scheduler trust** — reluctant/high-volume managers (Maria, T-06) distrust it; small-team/returning adopters (Priya, Devon) want managers to lean on it. Segmentation question: does trust track team size, manager tenure, or willingness to cede control?
2. **Staff mobile app adoption** — staff love *viewing* shifts (Priya, T-09) but won't *download* / won't enter availability (Devon, T-10). Segmentation question: is the split about the task (passive view vs. active input) or the workforce demographic?
