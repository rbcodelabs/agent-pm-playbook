# Using Compass with the Playbook

Where each kind of product work lives in Compass and how it links. This is the PM-facing
map; it applies when `pm-config.md` resolves the relevant capabilities to Compass
providers (for example the `compass-full` profile). Structure rules are in
[the Loop](the-loop.md); the exact tool calls are in the
[`compass-workflow` skill](../skills/compass-workflow/SKILL.md). This guide does not
repeat either.

## Where things live

| You have... | Put it in | Link it to |
|---|---|---|
| Opportunity, Outcome, KR, Solution, assumption, Test | The Loop tree | Per [the Loop](the-loop.md) |
| A quote, ticket, metric, or result backing a claim | **Evidence** | The Opportunity, Solution, or assumption it supports (never a KR) |
| Raw user feedback | **Feedback** | An Opportunity |
| Interview or usability study material | **Research study** | Evidence (promote findings); Tests it informed |
| A prototype, mock, or slide deck | **Artifact** | The Solution it demonstrates; the Decision it informs |
| Vision, durable narrative, written rationale | **Doc** | Referenced by URL from the objects it explains |
| A choice needing human approval | **Decision** | The Artifacts and evidence that justify it |
| Work to build a validated Solution | **Roadmap item**, then **Task** | The Solution; the Task to the roadmap item |

## Artifact or Doc?

If it is something you **show or test** (clickable, visual, a deck), it is an Artifact.
If it is **prose that explains**, it is a Doc. Never use a Doc to describe a prototype or
to hold a machine-local path: the prototype would not survive outside the machine that
built it. Publish one self-contained HTML file (or an external link for a hosted
prototype) and link it to its Solution.

## How things connect

- Signals enter as Opportunities or attach as evidence; they never skip the tree.
- An Artifact hangs off the Solution it demonstrates and should name the assumption it
  tests. If it supports a pending Decision, link it there too.
- A Test links back to the research that informed it, and its result feeds the Opportunity
  ([closing the loop](the-loop.md#closing-the-loop)).
- Decisions are requested from a human; agents record outcomes and never self-approve.
- Update Compass as work happens, not at the end of a session.

## See also

- [The Loop](the-loop.md)
- [`compass-workflow` skill](../skills/compass-workflow/SKILL.md): tool calls, statuses, session rules
- [Compass cloud pack](compass-cloud-pack.md)
