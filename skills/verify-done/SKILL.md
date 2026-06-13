---
name: verify-done
description: >-
  Verification gate before declaring any task complete. Run every check, read the
  actual output, cite it, then claim done. No hedging language without evidence.
  Invoke before reporting completion on any implementation task.
metadata:
  priority: 1
retrieval:
  aliases:
    - verify done
    - verify before completing
    - definition of done
    - check before done
    - confirm complete
  intents:
    - I think this is done
    - this should be working
    - ready to report completion
    - let me wrap up
---

# Verify Done

**Before claiming any task is complete, run every verification check and read the actual output.**

Not "it should pass." Not "I believe this is working." Not "the logic looks right."

Run the command. Read the output. Then make the claim.

---

## Why this exists

The most common failure mode in implementation work is declaring done before verifying done. This produces:
- Bugs discovered by the user instead of the implementer
- False confidence that slows down the next person
- Wasted review cycles on code that doesn't actually work

The fix is simple: never claim done without evidence. Evidence means output you have read, not output you expect to see.

---

## Forbidden phrases without evidence

If you are about to say any of the following, stop and run the checks first:

- "This should work"
- "It looks like it's working"
- "I believe the tests pass"
- "This is probably fine"
- "I think this is done"
- "This seems correct"

These are predictions. Verification produces facts. Make the claim with facts.

---

## The checklist (run every item, read every output)

### 1. TypeScript — zero errors

```bash
pnpm tsc --noEmit
```

Expected output: nothing. Any output is a failure. Fix it before proceeding.

### 2. Unit and integration tests — all passing

```bash
pnpm test
```

Read the output. Count the passing tests. Note any skipped tests and confirm they are intentionally skipped. Any failure stops here.

### 3. E2E tests — passing for affected flows

```bash
# Use the e2e-local skill for Playwright
pnpm exec playwright test --grep "<affected flow pattern>"
```

Only required if a user-facing flow was changed. If E2E tests don't exist for the flow, note that gap in the completion report — do not skip this step silently.

### 4. The feature works as specified

Run through the behavior described in the spec (from `design-before-code`) manually or with a targeted check:
- Does the happy path work?
- Does at least one error/edge case behave correctly?
- If there is a UI change, does it render correctly?

### 5. No regressions introduced

```bash
pnpm test  # full suite, not just the new tests
```

If you only ran targeted tests in step 2, run the full suite here. Confirm the count is the same or higher than before your changes.

---

## Completion report format

After all checks pass, report:

```
## Done — [task name]

**TypeScript:** clean (0 errors)
**Tests:** X passing, 0 failing (Y new tests added)
**E2E:** [passed / not applicable — no user-facing flow changed]
**Manual verification:** [what you checked and what you observed]
**Regressions:** none (full suite passed)

**Files changed:**
- [file] — [why]

**Assumptions made:**
- [any interpretation or choice not explicit in the spec]

**Follow-up items:**
- [anything out of scope discovered during implementation]
```

Do not summarize verification you did not perform. If a step was skipped, say so and explain why. The next person reading this report should be able to trust it.

---

## If a check fails

Fix it. Do not declare done with a known failure and a note that "it can be addressed later." A task with a failing check is not done — it is in progress.

The one exception: a pre-existing test failure that existed before your changes, which you have confirmed is unrelated. Document it explicitly in the completion report under "Pre-existing issues (not introduced by this change)."
