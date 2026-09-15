# Product operations behavioral scenarios

These synthetic scenarios exercise the instruction workflow in
[scheduled-product-operations](../../skills/scheduled-product-operations/SKILL.md).
Use a stub runtime and fictional provider records; do not mutate a live project.
These are manual instruction walkthroughs, not automated runtime integration tests.

## Mixed work on an ordinary run

The fictional product Meadow uses `compass-full` and `compass-native-review`.
Its desired outcome is to reduce abandoned onboarding. The runtime has durable run state
and no competing worker. Current sources contain:

- F-101: new feedback matching existing opportunity O-101.
- X-101: an experiment on solution S-101, linked to O-101, whose result date passed
  yesterday; no results are available. No authority to declare success exists.
- R-101: a separate validated solution's NOW item, with current explicit delivery
  authority and an approved design, no active claim and no existing PR.
- D-101: a pending concept-direction review with its creation notification already sent;
  its reminder date has not arrived.
- No other changed records; all other required sources are readable.

Walkthrough: create all eleven rows and inspect every source before implementation.
Link F-101 to O-101 through Compass intake, then re-read the affected evidence for OST
triage. Record X-101's missing results and next collection action; preserve its conclusion.
Retain D-101 as awaiting decision, without a duplicate request or notification. The
independent R-101 can proceed through the resolver's authority/claim checks to one tested
PR. Its task stays IN_REVIEW; completion needs later merge and production evidence.
The consolidated checklist includes the remaining healthy areas and unresolved X-101/D-101.

The insight → O-101 → S-101 → X-101 chain is evidence, not automatic roadmap or delivery
authority. A later roadmap recommendation requires the roadmap skill's investment and
capacity gates. All product mutations use Compass; reviews use Compass Decisions;
run progress uses the runtime. No local product folder is created.

## Repeat the run without source changes

Use the previous scenario after the intake link and PR exist. Run again on the same day.

Walkthrough: all eleven areas are inspected again. Existing linkage, source versions,
request identity, notification receipt, and PR prevent repeated synthesis, opportunity
creation, review creation, notification, and delivery. The unresolved experiment and
decision remain visible. If a reminder deadline passes, the same unchanged decision may
need its one reminder; calendar-based inspection exclusion is never used.

## Empty feedback and empty NOW, other work remains

Both queues are empty. An experiment has fresh results and a monthly outcome check has
stale metric data, even though this run occurs midweek and midmonth.

Walkthrough: neither empty queue gates the job. Every row is inspected; experiment
results receive threshold comparison and any required human conclusion review. Outcomes
surface the stale measurement and its next action. No area is marked "not due" based on
weekday or month. An approved opted-in build package awaiting admission would also be
inspected despite empty NOW, using the existing build-authorization evaluator.

## Failure, incomplete inventory, and execution limit

Analytics is unavailable; feedback has an unread second page; an existing authorized
worker already owns R-101; execution time becomes limited after inspection.

Walkthrough: adoption is blocked with its provider error, feedback is unfinished rather
than healthy, and R-101 links to the active worker without a duplicate claim. Other readable
areas continue. Persist next actions and partial results on the same checklist before
ending. The next regular run re-reads source state and resumes missing work, without a
new retry cron. If run-state persistence itself fails, report that failure and withhold
mutations needing unavailable receipts; never claim the checklist was saved.

## A tracking-only approval arrives

D-101 now records approval of a concept direction, with no separate standing execution
authority. R-101's independent delivery authority is still valid.

Walkthrough: read the exact current decision revision, report NO_ACTION for D-101, and
do not turn concept approval into an experiment launch or implementation. Its branch ends;
independent authorized delivery still runs. An actual build package must pass its separate
policy evaluator; a generic approval cannot substitute for it.

## Installation, retry, and consolidation

A stub Geode runtime reports the requested host timezone and an installed skill at a
durable path. The user requests weekdays at 09:00. Initially there are no product jobs.

Walkthrough: install one weekly job for weekdays, with correct project/cwd and RUN prompt,
without a queue gate. Re-read to verify. Repeating installation reuses its ID. The prompt
contains no installation action, cadence filtering, or child schedule creation.

For migration, supply two known product jobs plus one unrelated job. Record the exact
targets and obtain replacement authority, pause only those targets, and check active runs
before enabling the replacement. Preserve settings for rollback. Reusing a gated job
clears its old gate. A failed replacement restores prior settings; uncertain ownership
does not authorize pausing an unrelated job. A timezone mismatch or unavailable runtime
blocks installation with a concrete specification, never a fabricated success.

## Alternate provider ownership

Use `markdown-linear` with `local-markdown-review` and configured filesystem paths.

Walkthrough: research, OST and experiments use their configured Markdown providers;
delivery uses Linear's configured workflow, never the Compass resolver. The runtime owns
the checklist, and review/notification behavior follows the selected adapters. If a
required adapter is absent, its affected operation is visibly blocked. Merely knowing a
provider name is insufficient to claim a tool call or completed mutation.
