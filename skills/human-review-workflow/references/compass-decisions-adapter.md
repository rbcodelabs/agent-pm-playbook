# Compass Decisions Adapter

Use this adapter when both `review_requests` and `decision_records` resolve to
`compass_decisions`. It maps the workflow contract to Compass's generic decision tools:

- `request_decision(workspaceId, subjectType, subjectId, question, context, idempotencyKey)`
- `list_decisions(workspaceId, state?, subjectType?, outcome?, reviewerId?, query?, page?, pageSize?)`
- `get_decision(workspaceId, requestId)`

Service actors and workspace members may create and read requests within their workspace.
Only an authenticated human workspace or organization admin may decide in the Compass UI.
The fixed outcomes are **Approve**, **Request changes**, and **Reject**. Rationale is
required for Request changes and Reject and optional for Approve.

## Tracking-only contract

Every option has continuation `NO_ACTION`. A recorded decision never mutates its linked
entity, dispatches work, moves a roadmap item, merges or deploys code, or performs a
destructive action. Approval is evidence of the human's call, not an executable grant and
does not expand an agent's authority.

When a run reaches a genuine human judgment:

1. Build a clear question and concise context, link the closest supported Compass subject,
   and persist one UUID idempotency key for the workflow, subject, and source version.
2. Use `list_decisions` and the run's stored request identity to reuse the existing pending
   request when possible; otherwise call `request_decision` once.
3. Re-read the exact request with `get_decision` and store its request ID and current
   revision identity in run state.
4. Notify through the resolved notification provider, including the Compass deep link when
   available.
5. Return `AWAITING_DECISION` and stop the run.

A later run reads the exact request ID with `get_decision`; it does not infer a response
from notification text or search results. While pending, stop again. Once decided, record
the outcome and immutable revision identity in the run report. Continue only when the
next action is independently permitted by the run's pre-existing authority. Approval does
not auto-apply anything.

For Request changes, use the Compass UI's revised-request flow or create a new request with
a new idempotency key. Always use the explicit request identity and current revision when
checking a response. Never overwrite, reinterpret, or discard prior revisions; preserve
the full history returned by `get_decision`. A stale or superseded revision is not a current
decision.
