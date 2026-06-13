---
name: test-first
description: >-
  TDD discipline for new features and bug fixes. Write a failing test before any
  production code. RED then GREEN then REFACTOR. Invoke at the start of any
  implementation or bug fix task.
metadata:
  priority: 1
retrieval:
  aliases:
    - test first
    - test driven development
    - TDD
    - write tests first
    - red green refactor
  intents:
    - implement this feature
    - fix this bug
    - write the code for
    - build this
---

# Test First

**The iron law: no production code without a failing test that requires it.**

This is not a preference. It is not "when there's time." It applies to every feature, every bug fix, every non-trivial function. The only exception is code that cannot be tested (infrastructure glue, one-line config) — and that exception must be stated explicitly, not assumed.

---

## Common rationalizations — and why they fail

| Rationalization | Why it fails |
|---|---|
| "The logic is too simple to need a test" | Simple logic is the easiest to test. If it's not worth testing, it's not worth writing. |
| "I need to understand the shape of the solution first" | You discover the shape by writing the test. That's the point. |
| "I'll add tests after" | After means never, or tests that only confirm what you built rather than what was needed. |
| "This is just a refactor" | Refactors need tests most of all — they're how you verify behavior didn't change. |
| "Tests would take longer than the feature" | Tests that take longer than the feature are testing the wrong thing at the wrong level. |
| "The existing codebase doesn't have tests for this area" | That makes a test more valuable, not less. |

If you find yourself thinking any of these, treat it as a signal to slow down — not a reason to proceed.

---

## The cycle

### RED — Write a failing test first

1. Write a test that describes the behavior you want
2. Run it. Confirm it fails for the right reason (not because of a syntax error or import problem — because the behavior doesn't exist yet)
3. Read the failure message. It should be specific and point at exactly what's missing

A test that passes before you write any production code is not a test — it's a formality. Delete it and write a real one.

### GREEN — Write the minimum code to make it pass

Write only what the test requires. Not the full implementation. Not the defensive cases you think you'll need. The minimum to make this test green.

Run the test. Confirm it passes. If other tests break, fix them before moving on.

### REFACTOR — Clean up without changing behavior

Now that the test is green, clean the implementation:
- Remove duplication
- Improve naming
- Extract functions that are doing two things

Run the tests after every refactor step. If they go red, you changed behavior — undo the last change.

---

## Bug fixes: reproducing test first

For bug fixes, the cycle starts before you look at the fix:

1. Write a test that reproduces the bug as the user experiences it
2. Run it. Confirm it fails
3. Now look at the code and find the fix
4. Fix it. Confirm the test passes
5. Check adjacent cases — does the fix hold for similar inputs?

**Do not look at the fix before writing the test.** If you read the code first, you will write a test that confirms the fix rather than one that proves the bug existed. These are not the same thing.

---

## Code written before a test

If you wrote production code before a test exists for it:

**Delete it. Start with the test.**

Do not "write the test for it now." The discipline is what the discipline is. Code written before a test was written to satisfy a hypothesis, not a requirement. The test you write afterward will confirm the hypothesis rather than validate the requirement. That is not TDD — it is TDD-flavored guessing.

---

## What counts as a test

- Unit test for a function or module in isolation
- Integration test for a contract between components
- E2E test for a user-facing flow

All three are valid at the right level. Choose the level that gives the fastest, most specific signal for the behavior under test. Do not write an E2E test for something a unit test would catch in 10ms.

---

## When done

Before marking any task complete, confirm:
- The test was written before the production code
- The test failed before the fix
- The test passes after the fix
- Related tests still pass

Then run `verify-done`.
