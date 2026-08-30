# Obsidian and Markdown Review Adapter

Read this only when `review_requests` or `decision_records` resolves to `obsidian` or
`markdown`.

## Connection requirements

`pm-config.md` must provide a review root owned by the selected provider. Do not assume a
vault, home-directory, or product path.

Under the configured root, use:

```text
Pending/
Decided/
Applied/
Superseded/
Expired/
Decisions/
```

Review notes are labeled `inbox`. Decision files are immutable records, not inbox copies.

## Create

1. Generate the stable review ID and idempotency key.
2. Search all status folders for that idempotency key. Reuse a match.
3. Copy `assets/review-request-template.md` and fill every required field.
4. Use the exact review ID as the filename: `REV-YYYYMMDD-NNN.md`.
5. Write to `Pending/`, re-read the file, and return its Obsidian or filesystem deep link.

## Capture a response

The reviewer sets exactly one `decision` frontmatter value and adds `decision_note` when
required. The adapter must reject multiple or unknown choices. Moving the note is not the
decision; the structured field is.

After validating the response, move or rewrite the note into `Decided/` using a
recoverable operation. Preserve its review ID and idempotency key.

## Apply

1. Search `Decisions/` by review ID and idempotency key.
2. If an applied decision exists, return a no-op.
3. Create the immutable decision record before changing product state.
4. Apply the continuation through the authoritative product provider.
5. Add result IDs and application status to the decision record. Do not rewrite decision,
   rationale, reviewer, or source version.
6. Move the review receipt to `Applied/`.

If cross-provider application fails, keep the review in `Decided/` and mark the decision
record `failed` with a retryable error. Never ask the reviewer to decide again unless the
source version changed.

## Notification links

Prefer an `obsidian://open` deep link only when the configured reviewer uses that vault.
Otherwise return the provider's configured link or an absolute file link supported by the
notification channel. Do not construct a vault name by guessing.
