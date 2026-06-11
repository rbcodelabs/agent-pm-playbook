# Facilitator Key — ShiftLoop Sample Data

> ⚠️ **Spoilers.** This file is the answer sheet for the Module 2 and Module 3 exercises. **Do the exercises first**, then open this to compare. It's kept in a separate file (not inside `seed-ost.md` or `support-tickets.md`) precisely so you don't read the answers while doing the work.

---

## Seed OST — planted structural flaws (Module 2)

`seed-ost.md` contains **five** planted structural mistakes. A good health check finds at least four.

1. **Solution masquerading as an opportunity** — *"Build a mobile app for staff."* "Build an app" is a solution, not a customer need. The real opportunities hiding under it are things like *"staff don't submit availability"* (already its own branch — so this is also a duplicate of a need) or *"staff can't easily see when they work."* Reframe to the need; the app is one possible solution to it.

2. **Outcome drift / second root** — *"Reduce monthly churn of paying accounts."* This is a *different desired outcome* (retention of paying accounts), not an opportunity under *activation*. Its solutions (loyalty discount, win-back) don't move the 7-day activation number at all. It belongs on a different tree. Classic drift: the tree quietly grows a second outcome.

3. **Orphaned / off-outcome branch** — *"Staff keep asking to see tips and pay."* A real request (see ticket T-16, and Priya raised it), but it does not ladder up to activation. It's an orphan hanging under the wrong root. Keep it in a backlog or a different tree; don't let it sit here implying it serves the outcome.

4. **Solution attached directly to the outcome with no opportunity between** — *"Redesign the onboarding wizard"* hangs straight off the root. What customer problem does it solve? Until that's named, it's a solution in search of an opportunity. The fix is to surface the opportunity (likely *"I don't know where to start / can't find how to publish"* — tickets T-05, T-13) and place the redesign under it.

5. **Unfounded specificity / outcome drift within a solution** — *"Loyalty discount after 6 months"* (under the churn branch) assumes a cause that no signal supports. Even setting aside flaw #2, none of the evidence points to price as the activation lever. Watch for learners who keep this because it "sounds reasonable."

**Two branches are basically healthy** and should survive the cleanup: the **roster-import** opportunity (strongest evidence in the dataset) and the **availability-submission** opportunity. The **auto-scheduler trust** opportunity is legitimate but carries a real contradiction (Maria/T-06 distrust vs. Priya/Devon) — a good learner flags it as *contested* rather than deleting or blindly keeping it.

**Note the bug, don't treelize it:** the Safari grid bug (T-20) and the expiring password-reset (T-19) are real defects to route to engineering — they are not opportunities and should not appear on the tree at all.

---

## Support tickets — planted structure (Module 3)

- **Strongest cluster (high confidence, many sources, both channels + interviews):** roster setup / bulk import friction — T-01, T-02, T-03, T-04, T-11, T-14, T-15, T-21, plus Maria and Devon. This is the cluster that maps to the most leverage on the activation outcome.
- **Strong cluster:** availability collection from staff — T-07, T-08, T-09, T-17, plus Priya. Note the manager-is-the-bottleneck framing.
- **Medium / contradicted:** auto-scheduler trust — T-06 and T-13 (distrust / can't-see-reasoning) vs. Priya (loves it) and Devon (wants managers to lean on it). A genuine contradiction to flag, not resolve by majority vote.
- **Weak / contradicted:** staff mobile app — T-09 and Priya (staff love viewing) vs. T-10 and Devon (won't download). Lower volume; weaker evidence for activation specifically.
- **First-run / "where's the button" confusion:** T-05, T-13 — supports an onboarding-orientation opportunity.
- **Copy-forward / starting-from-blank:** T-12 — small but relevant to "reduce first-session effort."
- **Noise (should NOT become opportunities):** T-18 (billing), T-19 (password reset — though repeated expiry is a minor real bug), T-20 (Safari bug — real bug, route to engineering, not an opportunity), T-16 (tips/pay — real request but **off-outcome**; it's the orphan that should not hang under the activation root. Watch for learners attaching it anyway).
- **Duplicate-ish:** T-03 and T-21 are near-duplicates by design — good test of whether the synthesis dedupes or double-counts.

---

## Two contradictions worth getting right

The dataset plants **two** contradictions. The teaching point is to *surface them as segmentation questions*, never to resolve them by majority vote:

1. **Auto-scheduler trust** — reluctant/high-volume managers (Maria, T-06) distrust it; small-team/returning adopters (Priya, Devon) want managers to lean on it. Segmentation question: does trust track team size, manager tenure, or willingness to cede control?
2. **Staff mobile app adoption** — staff love *viewing* shifts (Priya, T-09) but won't *download* / won't enter availability (Devon, T-10). Segmentation question: is the split about the task (passive view vs. active input) or the workforce demographic?
