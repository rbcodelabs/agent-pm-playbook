# Progressive Investment Framework

> How to move from idea to scale with confidence — and how to hold the line when pressure comes from both directions.

**Part of:** [[Agentic PM Playbook]]
**Last updated:** 2026-05-15
**See also:** [[Discovery Health Metrics]], [[PM Tool Integration Guide]], [[Signal Ledger]]

---

## The Problem with "Are We Ready to Build?"

Teams get stuck because they treat build commitment as a single binary decision. You're either ready or you're not. That framing produces two failure modes that look like opposites but come from the same mistake:

**Moving too fast:** A stakeholder pushes for a feature, the team does a few interviews, someone says "users want this," and it goes into the sprint. Six weeks of engineering later, nobody uses it.

**Moving too slow:** A team discovers a real opportunity, ideates good solutions, but can't agree on whether they have "enough" evidence to commit. Discovery work keeps accumulating. Nothing ships.

The fix is replacing the binary question with a progression of smaller questions — each one cheaper and faster to answer than the final build commitment. You never ask "should we build this?" all at once. You ask five smaller questions in sequence, each one building on the last.

---

## The Five Stages

Each stage has a specific question it answers, a minimum evidence threshold to enter it, an investment ceiling that caps what you spend before answering, and a clear exit condition that moves you forward.

| Stage | Question being answered | To enter this stage | Investment ceiling | Exit condition |
|---|---|---|---|---|
| **Exploring** | Is this a real customer problem? | 1 verbatim quote from a real user | Discovery time only. No build. | 2+ independent sources with consistent underlying need |
| **Validating** | Is this problem widespread and worth solving? | 2+ independent sources, customer-voice framing | Discovery time + solution ideation | 3+ solutions explored, riskiest assumption named and ranked |
| **Testing** | Does our proposed solution work? | Riskiest assumption named, kill condition written before the test starts | Cheapest test that answers the question (see experiment types below) | Riskiest assumption passed the test. Kill condition not triggered. |
| **Building** | Does the built thing move the metric? | 1+ validated experiment connected to the active outcome | One focused team, time-boxed sprint | Real usage data showing metric movement (not test data) |
| **Scaling** | Should we invest to grow this? | Metric movement confirmed with real users | Full investment | Metric target reached, or strategic decision to extend the cycle |

The investment ceiling is as important as the evidence threshold. You do not put a sprint team on something that is still in Testing. You do not run a fake door on something that has already been validated by real users. Each stage has a natural boundary on what it is appropriate to spend.

---

## Experiment Types

Testing is the stage teams understand the least, because "run an experiment" usually gets interpreted as "build a feature and measure it." That is the most expensive experiment type. There are five cheaper options that come first.

Listed from cheapest to most expensive. Always use the cheapest experiment that can answer the question.

---

### 0. Copy & Micro-Content Test

**What it is:** The cheapest possible test. You are not validating a solution — you are choosing between two or three concrete wordings, labels, or small UI elements (a headline, a CTA button, an email subject line, an error message, an empty-state illustration). This rung exists because teams routinely treat these decisions as internal debates instead of testable questions.

**What it answers:** Which version of this specific piece of content or element performs better with real users — not whether the underlying feature or flow has value. That question is already settled; this is refinement, not discovery.

**How it works:** Ship the variants to real users with the least ceremony possible. Options in order of preference: (a) a live split on existing traffic if the surface already has volume — no new infrastructure, just swap the string behind a simple randomizer; (b) a five-second preference test with 5-10 real (not internal) users — show each variant, ask which is clearer or more compelling, and why; (c) sequential rollout — ship variant A for a few days, then variant B, and compare the metric that matters (click-through, signup completion, reply rate). Do not convene a meeting. Do not collect internal opinions from the team, design, or leadership as the deciding input — those are inputs to generating candidate variants, never to picking the winner.

**Example:** The team can't agree whether the onboarding CTA should read "Get Started" or "Start Free Trial." Instead of a 30-minute debate, split live traffic 50/50 for three days and measure click-through to the next step.

**Investment:** Hours to a day. No engineering beyond a string swap or a simple randomizer. No recruiting pipeline — real users you already have, not a research panel.

**Watch out for:** This rung is not a substitute for the assumption ladder below. If the disagreement is really about whether the feature itself should exist, or what the feature should do, that is a demand or value assumption — use a fake door or concierge test instead. Copy tests answer "which wording wins," not "does anyone want this."

---

### 1. Fake Door (Smoke Test)

**What it is:** You build the door but not the room. A button, a menu item, a landing page, or a CTA that measures whether users take an action — before the feature exists.

**What it answers:** Is there demand? Will users actually try to use this if it exists?

**How it works:** The user clicks the button or signs up for the feature. Instead of seeing the feature, they see a message: "This is coming soon — you're on the list." You measure click-through rate, sign-up rate, or opt-in rate.

**Example:** You want to know if users would pay for a premium export feature. You add an "Export to PDF" button behind a "Pro" badge on the pricing page. You track how many users click it before building anything.

**Investment:** 1-3 days to set up. No engineering required beyond a simple redirect.

**Watch out for:** A high click-through rate shows demand but not willingness to pay or sustained use. It answers "do people want this?" not "will people use this regularly?"

---

### 2. Concierge

**What it is:** You manually deliver the solution for a small number of users — pretending the technology exists. A human does the work that software would eventually do.

**What it answers:** Does the solution actually work for real users? Are they willing to engage with it repeatedly? Is the core value hypothesis correct?

**How it works:** Recruit 3-8 users. Manually provide the outcome your feature would produce. Watch what they do with it. Observe what breaks.

**Example:** You want to build a weekly AI-generated summary of a user's activity. Before building the AI, you manually write the summary yourself each week for 5 users and email it to them. You watch whether they read it, forward it, or reference it in other work.

**Investment:** 1-2 weeks to design and run. Some PM or team time to deliver the manual service. No engineering.

**Watch out for:** The "concierge effect" — users behave better when a human is delivering something than they would with an automated version. The test validates value, but not at scale.

---

### 3. Prototype Test (Wizard of Oz)

**What it is:** A lo-fi or clickable prototype that simulates the experience. In a Wizard of Oz test, a human operates the system behind the scenes while the user believes it is automated. In a lo-fi prototype test, the user interacts with a static or clickable mockup.

**What it answers:** Does the interaction design work? Can users complete the core task? Does the UX match their mental model?

**How it works:** Build a Figma prototype, a clickable mockup, or a manual simulation. Run 5-8 moderated sessions with users. Watch where they get confused, where they stop, what they say.

**Example:** You want to test a new onboarding flow before rebuilding it. You build a Figma clickable prototype and run 6 video calls where users try to complete onboarding. You watch without intervening. You note every moment of confusion.

**Investment:** 1 week to build the prototype, 1 week to run sessions. Design time, minimal engineering.

**Watch out for:** Users in a test environment are more tolerant than real users. Observed confusion in a prototype test will likely be worse in production, not better.

---

### 4. A/B Test

**What it is:** You build both versions of something and show different versions to different segments of real users simultaneously. You measure which version produces better outcomes.

**What it answers:** Does version A or version B perform better with real users at real scale?

**How it works:** Split your live user base (or a subset) into two groups. Show group A the current experience and group B the new version. Run the test until you reach statistical significance.

**Investment:** 2-4 weeks of engineering to build both versions, 2-6 weeks to run with enough traffic for significance. This is not a cheap test.

**Watch out for:** A/B tests require significant traffic to produce meaningful results. Running an A/B test on low-traffic features produces noise, not signal. If you don't have the volume, use a prototype test instead and accept qualitative results. Also: A/B tests tell you which version wins, not why. Combine with qualitative sessions if you need to understand the mechanism.

---

### 5. Staged Rollout

**What it is:** You have built the feature and are releasing it to increasing percentages of your user base — 5%, 20%, 50%, 100% — while monitoring for unexpected behavior, errors, or metric movement.

**What it answers:** Does this hold up at scale? Are there failure modes that only appear with real users and real data?

**Investment:** Ongoing. This is not a discovery experiment — it is a release strategy. By this stage you have already answered the core product questions.

**Watch out for:** Using staged rollout as a substitute for earlier-stage validation. "We'll learn from the rollout" is not a testing strategy — it means you are committing engineering resources to something you have not validated.

---

## The Transition Gates

### One build approval for opted-in agent delivery

Projects using `build_authorization_policy` consolidate the Testing-to-Building investment,
MVP/design and delivery-capacity decisions into one complete
[build package](skills/build-authorization/SKILL.md). Evidence thresholds still apply; the
agent prepares evidence, design and exact capacity commitment before requesting approval.
One current approval under the standing policy covers admission and implementation through
a tested PR. Separate NEXT, NOW and design approvals are unnecessary for that same scope.
Merge and production release retain separate authority. Projects that have not opted in
continue using the gates below.

These are the specific checkpoints that move you from one stage to the next. Each one is a question that must be answered — not a gut check, not a consensus vote.

### Exploring → Validating

- Do you have 2 or more independent sources with the same underlying customer need?
- Is the opportunity expressed in customer language, not solution language?
- Does it connect to the team's active desired outcome?

If any of these is no: stay in Exploring. Gather more signal.

### Validating → Testing

- Have you considered 3 or more distinct solutions to this opportunity? (Not committed to one — considered.)
- Have you identified the riskiest assumption the solution depends on?
- Have you written a kill condition: the specific result that would make you stop?

The kill condition must exist before the test starts. If it does not exist, the test is not ready to run. "We'll evaluate results when they come in" is not a kill condition.

### Testing → Building

- Did the riskiest assumption pass the test?
- Was the kill condition triggered? (If yes, stop. Archive the solution with the reason. Do not proceed.)
- Is the solution still connected to the team's active desired outcome?
- Has the team agreed on what the MVP is — the smallest version that delivers the core value?

If any of these is no: do not move to Building. Either run another test or archive the solution.

### Building → Scaling

- Do you have real usage data (not test data) showing the solution moves the target metric?
- Have you confirmed no significant failure modes in the live rollout?
- Is the metric movement large enough and consistent enough to justify deeper investment?

"Users like it" is not metric movement. You need the number the team said it would move, moving in the direction you predicted, with enough data to trust the signal.

---

## Holding the Line

Pressure to skip stages comes from two directions and requires two different responses.

### Stakeholder pressure (from above)

Stakeholders pushing to ship before validation are usually solving for speed or visibility, not for user value. The conversation that works is not "we're not ready." It is: redirect to the test that gets them an answer faster than a full build.

**When a stakeholder says "just build it":**

> "We can get an answer in [X days] with a [fake door / concierge / prototype] — that's faster than a sprint and it tells us whether to commit the engineering time. If the test validates it, we move immediately. If it doesn't, we just saved [N] weeks. Want me to design the test?"

**When a stakeholder says "we've been in discovery too long":**

> "We're at [stage]. The specific question we still need to answer is [question]. Once we have that, we move. The test takes [X days]. What would make you comfortable that we've answered it?"

**When a stakeholder says "I already know users want this":**

> "Let's run the fake door to confirm that — it takes three days and if you're right, we have data to back the decision. If there's a wrinkle in the demand signal, better to know now. Either way, we're faster."

---

### Team pressure (from within)

Engineers who want to build are not wrong — they want to do their jobs well and see real things ship. The conversation that works acknowledges that impulse and redirects it toward the smallest real build.

**When an engineer says "let's just build it and see":**

> "What's the riskiest assumption here? If we're wrong about [assumption], how much of what we build becomes wasted work? Let's design the test to be as build-like as possible so you get to ship something real."

**When the team says "the prototype is good enough, let's ship":**

> "The prototype validated the interaction design — that's great, that's what it's for. What we don't know yet is whether real users use it consistently. That's what the MVP is for. Let's scope the MVP to the minimum that answers that question."

**When the team says "we've been testing forever":**

> "Have we written the kill condition yet? Once we agree on what failure looks like, we run the test, read the result, and we're done. The test doesn't end when we feel good — it ends when the condition is met. What should the kill condition be?"

**When the team can't agree on copy, wording, or a small UI element:**

> "This has turned into an internal debate about which version we like best. That's a question real users can answer faster than we can argue about it. Let's ship both to a small slice of traffic for a day or two and let the data pick — that's cheaper than the meeting time we're spending on it now."

---

## How This Maps to Your PM Tool

The stages above map directly to the status workflows in [[PM Tool Integration Guide]].

**JPD + Jira:**

| Stage | JPD Status | Notes |
|---|---|---|
| Exploring | Exploring | Opportunity added, evidence gathering underway |
| Validating | Validating | 2+ sources confirmed, solution ideation begun |
| Testing | Testing | Experiment running. Kill condition logged in Jira experiment issue. |
| Building | Building | Linked to Jira sprint stories |
| Scaling | Shipped + new cycle | Metric confirmed. Begin scaling investment or new OST cycle. |

**Linear + Obsidian:**

| Stage | Linear Status | Notes |
|---|---|---|
| Exploring | Exploring | Opportunity issue created, ledger entries linked |
| Validating | Exploring | Still in Linear Exploring — update OST confidence to Medium |
| Testing | Testing | Experiment issue created as child of solution issue |
| Building | In Progress | Linked sprint stories |
| Scaling | Done | Metric confirmed. Archive or extend. |

---

## The Agent Prompt

Use this at any transition gate to get a structured readiness assessment:

```
Assess whether this opportunity is ready to move from [current stage] to [next stage].

Current stage: [Exploring / Validating / Testing / Building]
Target stage: [Validating / Testing / Building / Scaling]

For the transition, check:
1. Have all the entry conditions for the next stage been met? List each condition and whether it is satisfied.
2. What is the single most important thing that is not yet answered?
3. If we moved to the next stage without resolving that, what is the specific risk?
4. What is the cheapest way to resolve the open question before moving?

OST opportunity: [PASTE]
Signal ledger entries: [PASTE relevant entries]
Current experiment status: [PASTE if in Testing]
```

---

## Connected Docs

- [[Agentic PM Playbook]] — Section 3.5 (Assumption Mapping and Experiment Design)
- [[Discovery Health Metrics]] — evidence quality thresholds that feed into the gate criteria
- [[Signal Ledger]] — the source of signal counts and confidence levels used at each gate
- [[PM Tool Integration Guide]] — status workflow mapping for JPD and Linear
- [[Agentic PM — Agent Capability Framework]] — Test Minimalism and Null Hypothesis Awareness skills
