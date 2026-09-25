---
name: compass-feedback-triage
description: >
  Processes all OPEN feedback items in the Compass workspace and acts fully on each:
  dedup/link to an existing opportunity, create an opportunity (single-source ones tagged
  weak), score it, adjust opportunity status and roadmap priority when the evidence
  warrants, or close noise — then reports what changed. Keeps the OPEN feedback queue
  empty. Use from the product-operations checklist or manually when feedback has piled up.
---

# Compass Feedback Triage

## Autonomy

Follow the [Autonomy Policy](../../Autonomy%20Policy.md): act, then report. Linking,
creating and scoring opportunities, changing statuses (including closing noise), and
adjusting roadmap priority are reversible, so do them and report them. Deleting or
archiving feedback and replying to customers are irreversible; send those through
`human-review-workflow`.

> **Scheduling:** invoke from the feedback-and-research row in
> [scheduled-product-operations](../scheduled-product-operations/SKILL.md), not a separate
> cron. When the OPEN queue is empty, return that to the checklist.

## Setup

1. Read `pm-config.md` and follow `integration-routing`. Resolve `insights` and `ost` to
   Compass, and resolve `review_requests`, `decision_records`, and `notifications` for the
   rare irreversible action. Irreversible requests go to the configured decision provider;
   a recorded decision does not expand this workflow's existing authority boundary or turn
   feedback into implementation permission.
2. Load the `compass` skill for the MCP tool catalog and data model if not already loaded.
3. Resolve the organization and workspace ID from the configured Compass connection; match
   the configured workspace, never an unrelated one by name or list position.

## Processing loop

4. `list_feedback(workspaceId, status: "OPEN")`. If empty, report "queue already empty, no
   action taken" and stop.
5. `list_opportunities(workspaceId)` for dedup context, and `list_okr_cycles` →
   `get_okr_cycle` on the `ACTIVE` cycle for key results to link.

For **each** open feedback item:

a. `get_feedback_item`, then `update_feedback_status(..., "UNDER_REVIEW", note: "Being
   processed by Compass Feedback Triage")`.
b. Judge it:
   - **Type:** bug, feature request, UX friction, performance, or noise. Reclassify with
     `update_feedback_type` if the type looks wrong.
   - **Dedup:** does it closely match an existing opportunity?
   - **Urgency:** weigh `voteCount` with severity, actionability, and OKR relevance. One
     well-argued blocking report can outweigh several lukewarm upvotes; low votes on a new
     item often just mean nobody has seen it yet.
c. Act:

   **Matches an existing opportunity:**
   - `link_feedback_to_opportunity`, then set feedback `PLANNED` ("Linked to existing
     opportunity: [title]").
   - Re-read the opportunity's evidence. If it now meets the bar, move it to `PRIORITIZED`,
     re-score it (`score_opportunity`), and adjust the priority of its existing roadmap
     item through [roadmap-workflow](../roadmap-workflow/SKILL.md). Report the change and why.

   **New and actionable:**
   - `create_opportunity` — clear PM title; description "Customer feedback: [original
     title]. [summary]. Feedback ID: [id]."; status `EXPLORING`; link the best-fitting key
     result. Tag a single-source opportunity `weak` and note what would strengthen it.
   - `link_feedback_to_opportunity`, score it, and set feedback `PLANNED` ("New opportunity
     created: [title]").
   - Intake does not add a solution, solution plan, assumption, or
     roadmap item from a single new signal; that is solution and roadmap work, not intake.
     This does not stop other workflows from generating solutions for an evidence-backed
     opportunity that has none.
   - For a severe bug, promote it to the roadmap directly when `pm-config.md` has a standing
     bug policy covering it; otherwise raise its priority on the existing roadmap and report
     it.

   **Noise, spam, or unclear:** `update_feedback_status(..., "CLOSED", note: "Closed by
   feedback agent: [reason]")`. Closing is a status change; never delete.

Be decisive. When borderline, create a weak opportunity rather than closing: every real
signal should be represented in the OST.

## Report

List: items processed; items linked (with opportunity); opportunities created (with
evidence links and weak tags); statuses, scores, and roadmap priorities changed, each with
a one-line why; items closed as noise; any review requests for irreversible actions; errors
or skips; and any assumptions made.

If the run took action, write the outcome to the resolved `reporting_archive` provider.
`human-review-workflow` persists its own requests and notifications. An empty-queue no-op
creates no report.

## Downstream

Triage feeds signal synthesis, OST maintenance, solution work, and roadmap stewardship.
`compass-resolver` builds only under its own approval rules; triage never starts delivery.
