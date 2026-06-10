# Sample Seed OST — ShiftLoop

> A **deliberately flawed** Opportunity Solution Tree for training. It is *not* a model answer — it has planted structural mistakes for Module 2's health-check exercise to catch (and for Module 3 to clean up when mapping in real signals). Do not copy this as a template. The facilitator key at the bottom lists the planted flaws; don't read it until after you've done the health check yourself.

## The tree

**◆ DESIRED OUTCOME**
Increase new-account activation — % of trial accounts that publish their first complete weekly schedule within 7 days of signup — from **38% → 60%** this quarter.

- **○ Opportunity: "Getting my existing team into ShiftLoop takes too long."**
  - △ Solution: Spreadsheet import with automatic column mapping
  - △ Solution: Bulk add / paste-a-list entry
  - △ Solution: Org-level roster push (owner loads all locations' staff at once)

- **○ Opportunity: "I don't trust the auto-scheduler enough to publish what it makes."**
  - △ Solution: Show the reasoning behind each shift placement
  - △ Solution: Guided "review & publish your first schedule" flow

- **○ Opportunity: Build a mobile app for staff**
  - △ Solution: Push notifications for new shifts
  - △ Solution: Shift-swap between staff

- **○ Opportunity: "My staff don't submit their availability, so I'm transcribing it by hand."**
  - △ Solution: Availability reminder nudges to staff
  - △ Solution: One-tap availability quick-entry

- **○ Opportunity: Reduce monthly churn of paying accounts**
  - △ Solution: Loyalty discount after 6 months
  - △ Solution: Win-back email sequence for cancelled accounts

- **○ Opportunity: "My staff keep asking to see their tips and pay in the app."**
  - △ Solution: Tips & earnings dashboard in the staff app

- △ Solution: Redesign the onboarding wizard

---

## Facilitator key — planted flaws

<details>
<summary>Spoiler. Do the health check first, then open this to compare.</summary>

This tree contains five planted structural mistakes. A good Module 2 health check finds at least four.

1. **Solution masquerading as an opportunity** — *"Build a mobile app for staff."* "Build an app" is a solution, not a customer need. The real opportunities hiding under it are things like *"staff don't submit availability"* (already its own branch — so this is also a duplicate of a need) or *"staff can't easily see when they work."* Reframe to the need; the app is one possible solution to it.

2. **Outcome drift / second root** — *"Reduce monthly churn of paying accounts."* This is a *different desired outcome* (retention of paying accounts), not an opportunity under *activation*. Its solutions (loyalty discount, win-back) don't move the 7-day activation number at all. It belongs on a different tree. Classic drift: the tree quietly grows a second outcome.

3. **Orphaned / off-outcome branch** — *"Staff keep asking to see tips and pay."* A real request (see ticket T-16, and Priya raised it), but it does not ladder up to activation. It's an orphan hanging under the wrong root. Keep it in a backlog or a different tree; don't let it sit here implying it serves the outcome.

4. **Solution attached directly to the outcome with no opportunity between** — *"Redesign the onboarding wizard"* hangs straight off the root. What customer problem does it solve? Until that's named, it's a solution in search of an opportunity. The fix is to surface the opportunity (likely *"I don't know where to start / can't find how to publish"* — tickets T-05, T-13) and place the redesign under it.

5. **Outcome drift within a solution / unfounded specificity** — *"Loyalty discount after 6 months"* (under the churn branch) also assumes a cause that no signal supports. Even setting aside flaw #2, none of the evidence points to price as the activation lever. Watch for learners who keep this because it "sounds reasonable."

**Two branches are basically healthy** and should survive the cleanup: the **roster-import** opportunity (strongest evidence in the dataset) and the **availability-submission** opportunity. The **auto-scheduler trust** opportunity is legitimate but carries a real contradiction (Maria/T-06 distrust vs. Priya/Devon) — a good learner flags it as contested rather than deleting or blindly keeping it.

**Note the bug, don't treelize it:** the Safari grid bug (T-20) and the expiring password-reset (T-19) are real defects to route to engineering — they are not opportunities and should not appear on the tree at all.

</details>
