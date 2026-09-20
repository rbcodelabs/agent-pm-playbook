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
- If a repair cannot preserve required approval evidence, record the exact missing
  requirement and what was tried. Do not invent an approval, backdate a version, bypass
  a required gate or broaden authority to avoid bothering the reviewer.
- If renewed confirmation is actually required, state what changed and why the existing
  approval cannot be used. Distinguish an administrative confirmation from a new product
  choice. Do not imply scope changed when only the approval record needs repair.

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

Put package IDs, policy names, hashes, immutable revision/version IDs, idempotency keys,
receipt states and evaluator output in **Supporting evidence / automation details** after
the summary, or in provider metadata where supported. They must remain exact and available
to the executor. They do not belong in the title or the opening ask.

Provider-fixed response labels stay unchanged. Explain their practical meaning in the body;
do not promise that a tracking-only decision button immediately starts work. Describe the
separately authorized next step accurately.

## Fictional examples

| Situation | Avoid | Prefer |
|---|---|---|
| A team must choose where to invest | "Approve package under delivery-policy-v3?" | "Build bulk invitation so team admins can invite colleagues together?" |
| Capacity is full | "Resolve admission overflow for candidate Q-17" | "Start bulk invitations now and delay the dashboard redesign?" |
| An approval record cannot be reused | "Bind scope to immutable revision" | "Confirm the bulk-invitation work you already approved?" |
| A technical decision really needs an expert | "Accept credential migration?" | "Require everyone to sign in again when we replace the login tokens?" |

For the repeat-confirmation example, the opening might be:

> You already approved bulk invitations. The approval system cannot carry that approval
> over to the saved plan, so it needs your confirmation again. The feature, budget and
> deadline are unchanged. I recommend confirming; the team will prepare and test the change,
> then bring it back for release approval.

Use this wording only after verifying those claims and exhausting authorized ways to reuse
the existing approval. It is not a standard excuse to request approval twice.

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
