# Sample Dataset

> **Status: stub.** The full dataset is Build #2 in the [adoption roadmap](../../Agentic%20PM%20Playbook.md). This README defines its shape so Modules 2–4 can reference stable filenames before the content lands. Modules 0 and 1 don't need it.

Modules 2–4 run on one shared fictional product so every learner works from identical material and exercises are repeatable and reviewable. The capstone is where you drop this and run on your *real* product.

## The fictional product

A deliberately **boring and relatable** B2B SaaS — a **team scheduling / shift-planning tool**. Boring on purpose: it's familiar enough that nobody gets lost in the domain, and fictional enough that no one's real product leaks into the exercises.

> Domain not yet final — to be locked when Build #2 starts. If you're authoring Module 2/3/4 before then, write against the filenames below and treat the domain as a variable.

## Planned contents

| File | What it is | Used by |
|---|---|---|
| `product-brief.md` | One-page brief: what the product is, who it's for, the current **desired outcome**, and the state of the business | Module 2 (OST root), Module 1 (a realistic `pm-config.md` example) |
| `interviews/interview-01..03.md` | 3 fake customer interview transcripts, realistically messy — tangents, contradictions, quotable lines | Module 3 (signal synthesis) |
| `support-tickets.md` (or `tickets/`) | ~20 fake support tickets across a few themes, some noise | Module 3 (clustering, contradiction detection) |
| `seed-ost.md` | A partial, deliberately *flawed* OST — solutions masquerading as opportunities, an orphaned branch, some outcome drift | Module 2 (health check practice), Module 3 (mapping signals onto a tree) |

## Design constraints (for whoever builds this)

- **Seed real mistakes into `seed-ost.md`.** The teaching value of Module 2 is detecting structural errors; a clean tree teaches nothing. Plant at least: one solution posing as an opportunity, one orphaned branch, one case of outcome drift.
- **Make the signals contradict.** Module 3 teaches contradiction detection and confidence tagging. The interviews and tickets must disagree in places, and some claims must be weakly vs. strongly supported.
- **Keep it processable in a session.** 3 interviews + ~20 tickets is enough to feel the "4 hours → 20 minutes" collapse without overwhelming a live exercise.
- **One coherent thread.** The product brief's desired outcome, the seed OST's root, and the signals should all be about the *same* product so a learner can carry one artifact from Module 2 through Module 4.
