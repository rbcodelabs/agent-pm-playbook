# Writing requests people can decide

Use this standard for review titles, opening summaries, notifications and reminders in
every provider. Keep the full authorization and evidence record; present the human's
decision before the machinery used to record it.

## First decide whether to ask

Before creating a request, check the current conversation, the exact existing approval,
its scope and limits, and the work already authorized.

- Complete reversible preparation and repairs that existing authority covers.
- Reuse a still-valid approval. A new run, changed storage format or missing local copy
  does not by itself create a new product decision.
- If the approved scope cannot be established after reading the available authoritative
  records, explain the specific uncertainty and what was tried. Do not invent an approval,
  bypass a required gate or broaden authority to avoid bothering the reviewer.
- If renewed confirmation is actually required, state what changed and why the existing
  approval cannot be used. Ask only about the unresolved scope or material change.
  An authorized migration that preserves exact scope and limits does not require another
  product decision.

If no human choice or required confirmation remains, do the authorized work and report
the result. Do not manufacture a review for internal housekeeping.

## Write the decision in the reader's language

The title names a concrete action or choice and the affected product behavior. A reviewer
should understand the request from its title and first paragraph without opening a plan,
reading this playbook or knowing the automation's internal terms.

Start with:

1. **The change:** who will be able to do what, or what problem will be corrected.
2. **The ask and recommendation:** the decision needed, your recommendation and its reason.
3. **Why their input is needed now:** the unresolved tradeoff or specific confirmation
   requirement; for a repeat request, what changed since the earlier answer.
4. **The consequence:** material scope, cost, time, risk or displaced work, and what approval
   permits next. State the stopping point when it matters, such as a tested change awaiting
   release approval.

Keep simple requests to a title and a short paragraph. Add options or a table only for a
real comparison. Use familiar product terms; explain necessary technical terms where they
affect the choice. Do not hide a security change, data loss or release consequence behind
vague language such as "routine cleanup."

Put authority references, source IDs, plan versions and provider bookkeeping in
**Supporting evidence / automation details** after the summary, or in provider metadata
where supported. They must remain exact and available
to the executor. They do not belong in the title or the opening ask.

Provider-fixed response labels stay unchanged. Explain their practical meaning in the body;
do not promise that a tracking-only decision button immediately starts work. Describe the
separately authorized next step accurately.

## Fictional examples

| Situation | Avoid | Prefer |
|---|---|---|
| A team must choose where to invest | "Authorize delivery scope S-17?" | "Build bulk invitations so team admins can invite colleagues together?" |
| Capacity is full | "Resolve admission overflow for candidate Q-17" | "Start bulk invitations now and delay the dashboard redesign?" |
| Earlier scope is unclear | "Resolve approval provenance mismatch" | "Should bulk invitations also include people outside your organization?" |
| A technical decision really needs an expert | "Accept credential migration?" | "Require everyone to sign in again when we replace the login tokens?" |

For the unclear-scope example, the opening might be:

> I found your approval for bulk invitations, but the available records do not establish
> whether it includes external guests. I recommend keeping this release limited to
> colleagues in your organization so we can avoid adding guest-access rules. Should
> external guests be included too? That would require additional access checks and tests
> before the change comes back for release review.

Use this wording only after checking the actual approval and available scope records.
Continue independent work that is clearly covered; ask only about the unresolved part.

## Read-back check before sending

- Can the intended reviewer explain the change, their choice and its consequence after
  reading only the title and opening paragraph?
- Is there a real decision or unavoidable confirmation, with its reason made explicit?
- If asked before, does the request explain what changed and why the old answer is insufficient?
- Are material risks and tradeoffs visible, and internal identifiers confined to details?
- Does the title/body match the exact evidence and authority, including provider behavior?

Rewrite before persisting or notifying if any answer is no. Re-read the saved title and
body too: a clear chat notification does not repair an incomprehensible inbox item.
For existing requests, preserve immutable history and use the provider's supported revision
flow where a wording correction is authorized; do not silently rewrite a recorded decision.
