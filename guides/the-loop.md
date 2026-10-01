# The Loop — the playbook's single goal-to-learning hierarchy

**The Loop** (Opportunity → Outcome → KR → Solution → Test → back to Opportunity; technical
expansion: OOKRST) replaces the separate OKR → OST pair with **one integrated tree that
closes on itself**. Every piece of product work traces to the opportunity that justified it
and to the test that will tell us whether it worked, and every Test result flows back up
the tree and into the Opportunities, so what we learn decides what we pursue next.

> **Previously called the OOKRST structure.** Earlier versions of the playbook used that
> name (file `guides/ookrst-structure.md`). The five objects and the one-parent rule are
> unchanged; the Loop adds the explicit feedback rules in [Closing the loop](#closing-the-loop).

```
Opportunity   — a bounded, evidence-backed customer need or market opening worth pursuing
  └── Outcome   — the change in customer behavior we commit to producing (the "O" of an OKR)
        └── Key Result (KR)   — the measurable signal that the outcome is happening
              └── Solution   — a candidate way to move the KR
                    ├── Test   — the cheapest experiment that could falsify the solution's riskiest assumption
                    └── Roadmap Item   — delivery, admitted only after the Solution clears its investment gate
```

A Test is not the end of the chain. Its result feeds back up the tree and into Opportunities (see
[Closing the loop](#closing-the-loop)), which is why this is a loop and not a one-way funnel.

## Levels

| Level | What it is | Quality gate | Replaces |
|---|---|---|---|
| **Opportunity** | A customer need, pain, or desire (or market opening) with cited evidence and a clear segment. Written as a need, never a feature. | Has evidence (or is tagged `weak`); names a segment; is not a solution in disguise. | OST "Opportunity" — but now the *root*, not a middle layer |
| **Outcome** | The qualitative, customer-behavior change that capturing the opportunity requires. One sentence, no numbers, no output ("launch X"). | Behavior-framed; traces to exactly one Opportunity; has 2–3 KRs. | OKR Objective + OST "Desired Outcome" (now a single object) |
| **Key Result** | Measurable signal with baseline, target, and date. | Outcome-measuring (not output); baseline recorded or `TBD` with a task; at most 3 per Outcome. | OKR Key Result |
| **Solution** | One of ≥3 meaningfully different ways to move a KR. States which KR it moves and how it addresses the Opportunity. | Linked to exactly one parent KR; assumptions listed; riskiest assumption named. | OST "Solution" (now parented by a KR instead of an Opportunity) |
| **Test** | A minimum experiment on one Solution assumption, with success and failure criteria written before running. | Falsifiable; scoped to one assumption; result logged against the KR it informs. | OST "Experiment" |

## Structural rules

1. **One parent each.** Every record has exactly one parent: Outcome → Opportunity, KR → Outcome, Solution → KR, Test → Solution. A Solution that serves two KRs is split, or the second KR is recorded as a secondary link, never as a second parent.
2. **Fan-out.** An Opportunity may have several Outcomes (different segments or time horizons); an Outcome has 2–3 KRs; a KR needs ≥3 candidate Solutions before any is selected; a Solution has ≥1 Test before it is built.
3. **No orphans.** A KR with no Solution is a coverage gap. A Solution with no Test and no clearing investment gate cannot reach the roadmap. A Test not tied to a Solution assumption is not a Test.
4. **Cycle scope.** A cycle (e.g., a quarter) scopes which Outcomes and KRs are active. Opportunities persist across cycles; Outcomes and KRs belong to a cycle; Solutions and Tests carry over until resolved.
5. **At-risk KR means work the Solutions and Tests harder**, not add roadmap items.
6. **Check-ins move up the tree, and the loop closes.** A Test result updates its Solution's confidence; Solution progress and metric readings update the KR; KR movement updates Outcome health; Outcome health updates the Opportunity's status (pursuing / sustained / retired).
7. **Evidence flows up, not down.** Signals attach to Opportunities (and, when specific, to the Solution or Test they bear on). Do not attach raw signals to KRs.
8. **Archive, don't delete.** Retire branches with a reason so dead ideas keep teaching.

## Closing the loop

The five levels are the structure; the feedback rules are what make it a loop. Apply them
every time a Test concludes, a check-in lands, or new evidence arrives, and say which rule
you applied.

| Trigger | Feedback |
|---|---|
| **Test fails or is inconclusive** | Record what it taught. Then do one of: reopen the parent Opportunity for re-framing; re-score the Opportunity (its evidence or size changed); or spawn new Opportunities the result exposed. The Solution is killed, iterated, or re-tested, never silently left running. |
| **Test passes** | Promote the Solution (confidence up; it may now clear its investment gate) and update the parent KR's evidence line and status. |
| **KR stalls or is missed** | Go back and re-examine the Outcome: is it still the right behavior change, is the KR measuring it, is the Opportunity still real? Work the existing Solutions and Tests harder first (rule 5), but do not keep optimizing a KR whose Outcome no longer holds. |
| **New signal at any step** | An interview, ticket, metric surprise, or Test side-finding enters as an **Opportunity** (or attaches to an existing one). It is never attached to a KR and never skips the tree. |
| **Outcome health changes** | Update the Opportunity's status (pursuing / sustained / retired), which decides whether the next cycle opens new Outcomes under it. |

The loop: Opportunity → Outcome → KR → Solution → Test → (result) → Opportunity. Archive
rather than delete (rule 8) so dead branches keep teaching.

## Mapping from the legacy OKR → OST model

| Legacy term | Loop term |
|---|---|
| OKR Objective | Outcome |
| OST Desired Outcome | Outcome (same object — no longer a separate root linked to a KR) |
| Key Result | Key Result |
| OST Opportunity (under the Desired Outcome) | Opportunity (now the parent of the Outcome) |
| OST Solution (under an Opportunity) | Solution (now under a KR; still records the Opportunity it addresses via its ancestry) |
| OST Experiment | Test |
| "OST health check" | Tree health check (all five levels) |

When existing data uses the legacy shape, convert deliberately: each legacy Desired Outcome
becomes an Outcome; each Opportunity under it becomes a candidate Opportunity parent of that
Outcome (merge duplicates with a one-line rationale); Solutions re-parent to the KR the
Opportunity most directly moves; Experiments become Tests.

## Provider neutrality

This guide is provider-neutral. Adapters (Markdown/Obsidian, Compass, Linear, Jira, …) map
the five levels to whatever native objects exist and must preserve the parent chain and the
stable IDs. Where a provider cannot yet represent a level natively, the adapter states the
interim mapping (for example a label or custom field) and does not silently flatten the
hierarchy. Markdown identifiers: `OPP-n`, `OUT-n`, `OUT-n-KR-n`, `SOL-n`, `TST-n`.

## Related

- [Progressive Investment Framework](../Progressive%20Investment%20Framework.md) — gates a Solution's advance
- [Autonomy Policy](../Autonomy%20Policy.md)
