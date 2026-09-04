---
name: compass-feedback-triage
description: >
  Processes all OPEN feedback items in the Compass workspace and takes real product
  actions on each: dedup/link to an existing opportunity, create an EXPLORING opportunity,
  route evidence-backed focus decisions for human review, or close noise. Keeps the OPEN
  feedback queue empty without turning a single signal into an autonomous build commitment.
  Use for the scheduled Compass Feedback Triage job or manually when feedback has piled up.
---

# Compass Feedback Triage

> **Scheduling:** each workspace runs this via a daily `<Workspace> Feedback Triage`
> `CronCreate` job. Schedule it before synthesis and opportunity-review flows; delivery is
> independent and acts only on already-approved `NOW` work. Every triage cron MUST carry a
> deterministic `gateCommand` so an empty OPEN queue never spawns a wasted model turn:
> query `list_feedback` (`status: "OPEN"`) via the Compass MCP endpoint and `exit 1` (skip)
> when it returns `No feedback found`, else `exit 0` (fire). Use `gateFailOpen: true`,
> `gateTimeoutSeconds: 90`. Use the same MCP `curl`/`jq` call shape documented in the
> `compass-resolver` scheduling section, substituting the single feedback query, and verify
> both the empty and non-empty branches.

## Setup

1. Read `pm-config.md`. Resolve `insights` and `ost` to Compass and resolve
   `review_requests`, `decision_records`, and `notifications` before creating a review.
   Follow `integration-routing`; do not assume Obsidian or Geode.
   Route ambiguous focus, investment, and scope judgment through the configured decision provider.
   A recorded decision does not expand this intake workflow's existing authority
   boundary or turn feedback into implementation permission.
2. Invoke the `compass` skill for the MCP tool catalog and data model if not already loaded.
3. `list_workspaces(orgSlug: "rbcodelabs")` → get the workspaceId for the workspace named
   "Compass" (slug `compass`).

## Processing loop

4. `list_feedback(workspaceId, status: "OPEN")` — if empty, report "queue already empty,
   no action taken" and stop. Do not fabricate work.
5. `list_opportunities(workspaceId)` for dedup/linking context.
6. `list_okr_cycles(workspaceId)` → find the `ACTIVE` cycle, then `get_okr_cycle(cycleId)`
   for its objectives/key results (for linking new opportunities to OKRs).

For **each** open feedback item:

a. `get_feedback_item(feedbackId)` for full details.
b. `update_feedback_status(feedbackId, status: "UNDER_REVIEW", note: "Being processed by
   Compass Feedback Triage")`.
c. Reason about it:
   - **Type:** bug report, feature request, UX friction, performance issue, or
     unclear/noise? (`update_feedback_type` can reclassify BUG vs IDEA if the current type
     looks wrong. Bugs follow the configured severity/standing-approval policy; ideas
     follow the Opportunity → evidence → human focus decision → Solution flow.)
   - **Dedup:** does it closely match an existing opportunity?
   - **Urgency:** weigh `voteCount` as one signal among several, never as a gate. A high
     vote count is meaningful demand evidence, but a single well-argued blocking or severe
     report can outweigh several lukewarm upvotes, and low votes on a brand-new item often
     just mean nobody has seen it yet. Judge urgency on the whole picture: vote count,
     severity, how clearly actionable it is, and OKR relevance.
d. Act:

   **Matches an existing opportunity:**
   - `link_feedback_to_opportunity(feedbackId, opportunityId)`
   - `update_feedback_status(feedbackId, status: "PLANNED", note: "Linked to existing
     opportunity: [title]")`
   - Re-read the opportunity and its linked evidence. If this signal causes it to meet the
     evidence bar for `PRIORITIZED`, update the opportunity status and invoke
     `human-review-workflow` to create an opportunity-focus request. End this branch
     `AWAITING_DECISION`; do not add a solution or roadmap item.

   **New and actionable (bug, feature, UX friction, performance):**
   - `create_opportunity` — title synthesized in clear PM phrasing; description:
     "Customer feedback: [original title]. [description summary]. [submitter if
     available]. Feedback ID: [id]."; status `EXPLORING`; link to the most relevant OKR
     key result if one fits.
   - `link_feedback_to_opportunity` to connect the original feedback to the new opportunity.
   - Leave it `EXPLORING`. Intake does not add a solution, solution plan, assumption, or
     roadmap item from a single new signal. The next synthesis pass may add corroborating
     evidence and earn an opportunity-focus review.
   - For a bug, use direct roadmap promotion only when an explicit standing policy in
     `pm-config.md` covers its severity, scope, and rollback path. Otherwise route an
     expedited bug-investment review through `human-review-workflow`.
   - `update_feedback_status(feedbackId, status: "PLANNED", note: "New opportunity
     created: [opportunity title]")`.

   **Noise, spam, or unclear:**
   - `update_feedback_status(feedbackId, status: "CLOSED", note: "Closed by feedback
     agent: [brief reason]")`.

Be decisive. If feedback is borderline, lean toward creating an opportunity rather than
closing — the goal is an empty OPEN queue with every real signal represented in the OST.

## Report

After processing all items, report:
- Total items processed.
- Items linked to existing opportunities (list them).
- New EXPLORING opportunities created (list them with evidence links).
- Human-review requests created (review ID, decision, due date, and direct link).
- Items closed as noise (list them).
- Any items skipped or that errored.

If this run took real action, write its outcome to the resolved `reporting_archive`
provider. Human-review requests and notifications are persisted by
`human-review-workflow`; do not duplicate them into a hardcoded vault or channel. A pure
empty-queue no-op creates no report.

## Downstream handoff

This skill is evidence intake, not implementation prioritization. It feeds signal
synthesis, OST maintenance, and asynchronous focus reviews. After a human selects an
opportunity, the solution studio prepares alternative concepts for another review; after
experiments and the investment gate, the roadmap steward may request a `NOW` commitment.
`compass-resolver` acts only after that approval is recorded on an existing `NOW` item.
