# Module 0: The Operating Model

**Time:** Half day
**Coding required:** No — do this module *before* you install anything.
**Prerequisite:** None. This is the first thing you do.
**You will produce:** A backward trace from one real feature on your roadmap to the outcome it's supposed to move — and an honest verdict on whether that outcome exists.

---

## Why this module comes first

You could skip straight to installing tools. Please don't. The single most common way this whole system fails is a PM who installs the agents, learns the skills, and then uses them to do **old-style PM faster** — generating more documents, more roadmap features, more output, just with AI doing the typing.

The tools are an accelerant. If you point them at the wrong operating model, they accelerate you in the wrong direction. So Module 0 has no software in it at all. Its only job is to make you slightly uncomfortable about how you work today. That discomfort is the hook for everything that follows.

---

## Learning objectives

By the end of this module you will be able to:

- Name the four shifts that separate agentic PM from traditional PM, and say which one you're weakest on.
- Distinguish an **outcome** (a measurable change in customer behavior) from **output** (a thing you shipped).
- Trace any roadmap item backward to the outcome it's meant to move — and recognize when that chain is broken.
- Explain why discovery is *continuous and weekly*, not a quarterly sprint.
- Describe the PM's real job in this model: holding judgment, not producing artifacts.

---

## Concept reading

### The four shifts

This whole system is one operating model with four shifts. Everything you'll learn maps to one of them.

| From (traditional PM) | To (agentic PM) | What changes day-to-day |
|---|---|---|
| **Output** — roadmap features, things shipped | **Outcomes** — a measurable change in customer behavior, with every work item traced to it | You stop asking "what should we build?" and start asking "what behavior are we trying to change, and what's the evidence we can?" |
| **Quarterly research sprints** | **Continuous weekly discovery** — signals processed the same week they arrive | Research stops being an event you schedule and becomes a habit you keep. A customer call on Tuesday updates your thinking by Friday. |
| **PM as document producer** | **PM as judgment holder** — agents produce artifacts, the PM decides | Your value is no longer the PRD you typed. It's the decision about which opportunity matters, whether the evidence is strong enough, and what to do next. |
| **Binary "ready to build?" gates** | **Progressive Investment** — staged evidence thresholds | "Should we build it?" becomes "what stage is this idea at, and what's the *cheapest* test that would move it to the next stage?" |

### Outcome vs. output — the distinction the whole system rests on

- **Output** is something you produced: a feature, a screen, a release. It's fully within your control. It is *not* evidence that you helped anyone.
- **Outcome** is a change in customer behavior that you can measure: more users completing a task, fewer support tickets of a certain kind, higher week-2 retention. It's only *partly* within your control — which is exactly why it's worth managing toward.

> A feature is a bet that a specific behavior will change. The agentic PM never loses sight of the behavior the bet is on. The traditional PM ships the feature and calls it a win.

The trap: outputs feel like progress because they're visible and shippable. Outcomes feel slippery because they depend on customers, who are not under your control. The discipline of this operating model is to keep your attention on the slippery thing.

### Continuous discovery, not sprint discovery

Traditional research is a project: schedule it, run it, write the report, shelve the report. By the time the report is read, the questions have moved on.

Continuous discovery means you touch customer signal **every week** — an interview, a batch of tickets, a usage anomaly — and you process it the same week. Small, constant, current. This is only sustainable because the tooling makes synthesis cheap (you'll feel this viscerally in Module 3, when 4 hours of synthesis collapses into 20 minutes). But the *habit* is the point; the tooling just removes the excuse.

### The PM as judgment holder

Here's the reframe that unsettles people: **in this model, you produce far fewer documents.** The agents draft the OST, cluster the signals, write the user story, design the test harness. What's left for you?

The decisions. Which opportunity is worth pursuing. Whether the evidence is strong enough to advance. What the riskiest assumption is. When to kill an idea. Whether "the data says X" actually holds up. None of that is artifact production — all of it is judgment. If that feels like *less* work, you're misreading it. It's less typing and far more thinking, and the thinking is the part that was always actually your job.

### Progressive investment, not a single gate

The traditional "are we ready to build?" question is binary and usually answered by whoever is most confident in the room. Progressive Investment replaces it with stages — roughly **Exploring → Validating → Testing → Building → Scaling** — each with an evidence threshold. The question is never "build, yes or no?" It's "what stage is this at, and what is the *cheapest* test that earns the right to advance?" You'll operate this directly in Module 4.

**Go deeper (optional — not needed to do this module):** [Agentic PM Playbook](../Agentic%20PM%20Playbook.md) — the *Philosophy* and *OST as Operating System* sections. The [Progressive Investment Framework](../Progressive%20Investment%20Framework.md) covers the staged-investment model in full; you'll come back to it in Module 4. Everything you need for today's exercise is on this page.

---

## Hands-on exercise: the backward trace

No tools. Just you, one real feature, and an honest pen.

**Setup:** Open your *actual* current roadmap — the real one, for your real product. Pick one item that's planned or in progress. Choose one you feel reasonably good about; the exercise is more revealing when you don't expect it to fail. *(If you don't have a formal roadmap document, write three features you're currently considering on a blank page — that's your input.)*

**Steps:**

1. **Write the output.** State the feature in one line. *"We're building X."*
2. **Climb to the outcome.** Ask: *if this ships and works perfectly, what customer behavior changes, and how would I measure it?* Write the measurable outcome — a behavior plus a number that would move. *Good: "% of new users who complete setup without contacting support." Bad: "users will use the new dashboard" (that's the feature reworded, not a behavior change).*
3. **Climb again to the opportunity.** What customer need, pain, or desire does that behavior change serve? Whose problem is this, in their words? *(If you don't have verbatims yet, write the most plausible paraphrase — and mark that rung **assumed** in Step 5.)*
4. **Climb to the desired outcome.** Does that opportunity ladder up to a business or product outcome your team actually owns? (A quarterly OKR if you have them; an ongoing funnel metric like activation or retention if you don't — both are fine.)
5. **Check the evidence at each rung.** For the outcome and the opportunity, ask: *what evidence do I have that this is real?* Customer signal, data, a quote — or just a hunch? Mark each rung **evidenced** or **assumed**. (Steps 1–4 build the four rungs of the chain; this step just annotates them.)

**Deliverable:** A short written chain — `Output → Outcome → Opportunity → Desired outcome` — with each rung marked *evidenced* or *assumed*. Keep it. You'll recognize this shape again in Module 2: it's an Opportunity Solution Tree, read bottom-up.

---

## Success criteria

- [ ] You produced a four-rung chain for one real feature.
- [ ] The **outcome** rung is a measurable behavior change, not a feeling and not a restatement of the feature.
- [ ] You honestly marked each rung *evidenced* or *assumed* — and there is at least one *assumed* on the page. (If everything is "evidenced," you're grading yourself too generously; re-check rung 5.)
- [ ] You can say, in one sentence, which of the four shifts is hardest for how you work today.

---

## Common failure modes

| Symptom | What's going wrong | Fix |
|---|---|---|
| The "outcome" is just the feature reworded ("users will use the new dashboard") | You restated output as outcome | Force a *number that moves* and a *behavior that changes*. "Use the dashboard" isn't behavior change; "complete setup without contacting support" is. |
| Every rung is marked *evidenced* | You're protecting the feature, not testing it | Be ruthless. "We assume," "we believe," "the team felt" all mean *assumed*. Most roadmap items have at least one assumed rung — finding it is the win, not a failure. |
| You can't get from the feature to any outcome | The chain is genuinely broken — the feature isn't traced to anything | **This is the most valuable result in the module.** You just found output with no outcome behind it. That's exactly what this operating model is built to catch. |
| "This is obvious, I already do this" | You may be conflating *having* outcomes with *tracing every item* to one | Do the exercise anyway, on a real item, with the evidence check. The evidence-marking step is where most experienced PMs find the gap. |

---

## Next

You've felt the gap. Now build the environment that closes it.

→ **[Module 1: Environment Setup](module-1-environment-setup.md)**
