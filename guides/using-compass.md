# Using Compass with the Playbook

A practical walkthrough of where each piece of product work lives in Compass and how to
link it. Use it with [the Loop](the-loop.md) (the structure) and the `compass-workflow`
skill (the agent's call reference). This guide applies when your `pm-config.md`
resolves the relevant capabilities to Compass providers (for example the `compass-full`
profile with `prototype_artifacts: compass_artifacts`).

Tool names below are the Compass MCP tools. Discover the catalog your server exposes
rather than assuming every name; if one is missing, report that capability as blocked
instead of redirecting the write to Markdown.

## Where things live

| You have... | Put it in | Link it to |
|---|---|---|
| A customer problem worth pursuing | **Opportunity** (`create_opportunity`) | The Outcome / KR it serves |
| A quote, ticket, metric, or result backing the problem | **Evidence** (`add_evidence`) | The Opportunity, Solution, or Assumption it supports |
| Raw feedback from users | **Feedback** (`create_feedback`) | `link_feedback_to_opportunity` |
| Interview or usability study material | **Research study** | Evidence via `promote_research_finding_to_evidence`; Tests via `link_entities` |
| A candidate way to solve it | **Solution** (`add_solution`) | Its Opportunity (parent) and Key Result |
| Your riskiest belief about a Solution | **Assumption** (`add_assumption`) | The Solution |
| A cheap experiment on that assumption | **Test** (`create_experiment`) | The Assumption |
| A clickable prototype, mock, or slide deck | **Artifact** (`create_artifact`) | `link_artifact_to_solution`; `link_artifact_to_decision` if it informs a decision |
| Vision, durable narrative, ADRs | **Doc** (`write_doc`) | Referenced from the above by URL |
| A choice needing human approval | **Decision** (`request_decision`) | Artifacts that justify it |
| Work to build the Solution | **Roadmap item** then **Task** | The validated Solution (`link_task`) |

Rule of thumb: if it is a *thing you test or show*, it is an Artifact. If it is *prose
that explains*, it is a Doc. Never use a Doc to describe a prototype or to hold a
machine-local path.

## One problem, end to end

Fictional example: a scheduling app where users abandon onboarding.

1. **Capture the problem.** `create_opportunity` ("New users abandon onboarding before
   connecting a calendar"), with the KR it serves. Start at EXPLORING.
2. **Back it with evidence.** `add_evidence` for each signal, with `sourceType`
   (`interview`, `feedback`, `support_ticket`, `experiment_result`, `analytics`), an
   excerpt, and a `sourceUrl`. Promote raw feedback with `link_feedback_to_opportunity`.
   Move the Opportunity to VALIDATING, then PRIORITIZED once the evidence bar is met.
3. **Add three or more Solutions.** `add_solution` for each, then narrow.
4. **Name the riskiest assumption** on the leading Solution with `add_assumption`.
5. **Build a prototype and save it.** See the next section.
6. **Design the Test.** `create_experiment` against the assumption, with a written kill
   condition, in DESIGNING; move to RUNNING only once the kill condition exists. Link a
   study that informed it with `link_entities` (`EXPERIMENT_INFORMED_BY_STUDY`).
7. **Record results.** `log_experiment_result`, then `conclude_experiment` (PROCEED,
   KILL, ITERATE, or NOT_PURSUED with a reason). Compass updates the assumption.
8. **Route decisions to a human.** `request_decision` with the Artifact linked. Agents
   record outcomes; they never self-approve.
9. **Admit to the roadmap and deliver.** `promote_to_roadmap` (LATER by default; NEXT and
   NOW need their own review), then `create_task` and `link_task`.

Update Compass as each step happens, not in a batch at the end.

## Saving and linking a prototype

1. Produce **one self-contained HTML file** (inline styles, scripts, and assets) so it
   survives outside the machine that built it. Maximum upload is 2 MiB.
2. `prepare_artifact_upload` with the exact filename (ending `.html`) and byte size.
   Upload the file with the returned token. Prefer this over pasting HTML inline.
3. `create_artifact` with `sourceType: HTML_UPLOAD`, the `uploadReceipt`, a clear title,
   and a description that says which assumption it tests. Use `kind: SLIDE_DECK` for
   decks. For a hosted prototype, use `EXTERNAL_LINK` with the URL instead.
4. `link_artifact_to_solution` for the Solution it demonstrates; add
   `link_artifact_to_decision` when it supports a pending decision.
5. Re-read with `get_artifact` and confirm the link and revision. For revisions use
   `update_artifact` (a new version of the same Artifact, not a second Artifact).
   `archive_artifact` when it is superseded.

## Checklist before ending a session

- Every touched item has an accurate status.
- Every active Opportunity has evidence and at least one non-killed Solution.
- Every prototype is an Artifact linked to its Solution, not a path in a note.
- Every Test has a Solution assumption and a kill condition.
- Decisions awaiting approval are requested, not assumed.

## See also

- [The Loop](the-loop.md)
- [Compass cloud pack](compass-cloud-pack.md)
- `skills/compass-workflow/SKILL.md`
- `skills/human-review-workflow/SKILL.md`
