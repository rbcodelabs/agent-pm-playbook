# Agentic PM Training — Start Here

This curriculum turns the Agentic PM Playbook from a pile of docs into a teachable system. By the end you will run product discovery in a fundamentally different way: outcomes traced to every work item, signals synthesized the same week they arrive, and a team of agents doing the production work while you hold the judgment.

> **The one thing to internalize first:** this is not a course on "how to use plugins." It is a course on a new operating model. The tooling exists to make that operating model cheap enough to sustain. If you learn the tools without the model, you will just do old-style PM faster — and miss the point.

---

## Before you start: build your desk

If you haven't set up Obsidian + Claude Threads yet, do that first. The **[PM Workspace Setup guide](../guides/pm-workspace-setup.md)** walks you through the one-command vault installer, adding your Anthropic API key as a secret, connecting JIRA or Linear, and Vault Bridges — everything you'll need for this curriculum. (~30 minutes, tool-first, no philosophy.)

Come back here when your workspace is live.

---

## Who this is for

- **PMs adopting the playbook on a real product.** Work through the modules in order on the sample dataset, then run the capstone on your own product.
- **Facilitators running a cohort.** Each module is a session. The exercises are designed to be done live so you can fix friction on the spot.
- **Self-serve / public adopters.** Every module is written to assume zero prior context. If something assumes knowledge you don't have, that's a bug — log it (see *Troubleshooting* below).

You do **not** need to be technical. Modules 0–4 and 6 require no coding. Module 5 is about *delegating* technical work to agents, not doing it yourself.

---

## The operating model in one table

| From (traditional PM) | To (agentic PM) |
|---|---|
| Output and roadmap features | Outcomes, with every work item traced to a measurable result |
| Quarterly research sprints | Continuous weekly discovery; signals processed the same week |
| PM as document producer | PM as judgment holder; agents produce artifacts, PM decides |
| Binary "ready to build?" gates | Progressive Investment: staged evidence thresholds |

Everything in this curriculum serves one of these four shifts.

---

## The learning path

Work the modules in order. Each builds on the artifact the previous one produced — by Module 4 you are operating on a single thread of work (one outcome → one OST → real signals → one tested assumption).

| Module | Title | Time | Coding? | Produces |
|---|---|---|---|---|
| **0** | [The Operating Model](module-0-operating-model.md) | Half day | No | A backward trace from a real feature to its (missing) outcome |
| **1** | [Environment Setup](module-1-environment-setup.md) | Half day | A little | A working environment + `pm-config.md` |
| **2** | [Your First OST](module-2-your-first-ost.md) | 1 day | No | A health-checked Opportunity Solution Tree |
| **3** | [Signal Synthesis](module-3-signal-synthesis.md) | 1 day | No | Clustered, evidence-tagged opportunities mapped to the OST |
| **4** | [Experiments & Progressive Investment](module-4-experiments-and-investment.md) | 1 day | No | One assumption decomposed, leanest test designed, gated |
| **5** | [The Agent Team](module-5-the-agent-team.md) | 1 day | Delegation only | One solution run from story → design brief |
| **6** | [Cadences & Health](module-6-cadences-and-health.md) | Half day | No | Recurring rituals scheduled in your own calendar |
| **Capstone** | [One Full Cycle on Your Real Product](capstone.md) | 1–2 weeks async | Depends | A complete discovery loop, reviewed against a rubric |

> The full curriculum — Modules 0–6 and the capstone — is written and linked above. Work them in order; each builds on the artifact the previous one produced.

---

## How each module is structured

Every module follows the same template (see [`_module-template.md`](_module-template.md)):

1. **Learning objectives** — 3–5 things you'll be able to do afterward.
2. **Concept reading** — a one-page distillation, with a link to the deeper playbook doc. You should never have to read the 25KB master doc on day one.
3. **Hands-on exercise** — done on a provided [sample dataset](sample-data/) (a fake product, fake interviews, fake tickets) so everyone works from the same material.
4. **Success criteria** — how you know you did it right.
5. **Common failure modes** — the mistakes people actually make, seeded from real use.

---

## The sample dataset

Modules 2–4 operate on a shared fictional product so the exercises are concrete and repeatable. See [`sample-data/`](sample-data/) for the product brief, interview transcripts, support tickets, and a seed OST. (The fictional product is deliberately boring and relatable — a B2B SaaS scheduling tool — so nobody's real product leaks into the exercises.)

The capstone is the moment you drop the sample data and run the whole loop on *your* product.

---

## If you get stuck

- **Concept unclear?** Each module links its source playbook doc. Read that section, then come back.
- **Tool won't cooperate?** Module 1 is also the install smoke test. Friction there is a real bug — capture it (what you did, what you expected, what happened) so it can be fixed in `setup.sh` or the docs.
- **Exercise feels wrong?** Re-read the *Success criteria* and *Common failure modes* before assuming you're off track. Most "this feels wrong" moments are the intended discomfort of the new operating model.
- **Something specific breaking?** The **[Troubleshooting Guide](troubleshooting.md)** covers common failure modes across all modules — skill invocation fallbacks, N-sizing for small cohorts, heartbeat automation, and capstone self-scoring.
- **Capstone coming up and want to see a full submission?** The **[worked exemplar](sample-data/capstone-exemplar.md)** is a complete fictional capstone scored against the rubric.

---

## Ready?

Start with **[Module 0: The Operating Model](module-0-operating-model.md)**. Do it before you install anything. The point of Module 0 is to make you slightly uncomfortable about how you work today — that discomfort is what makes the rest of the curriculum stick.
