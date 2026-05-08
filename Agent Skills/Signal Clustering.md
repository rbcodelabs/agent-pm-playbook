# Signal Clustering

> The skill of grouping disparate customer signals — from interviews, support tickets, NPS comments, app reviews — into coherent opportunity themes without collapsing nuance or forcing premature abstraction.

**Layer:** 1 — Synthesis & Signal Processing
**Companion:** [[Agentic PM — Agent Capability Framework]]

---

## What This Skill Is

Signal clustering is what happens between raw synthesis and the Opportunity Solution Tree. Individual signals — a quote from an interview, a support ticket pattern, a recurring NPS comment — are not themselves opportunities. An opportunity is a theme: a need or pain that appears across multiple independent sources with enough consistency to warrant investigation. Clustering is the process of building those themes from the signal corpus, and it is harder than it looks.

The challenge is that clustering requires holding ambiguity actively, not resolving it prematurely. When an agent reads twenty support tickets and five interview fragments, it is under structural pressure — from the prompt, from the task framing, from the nature of language models — to produce clean categories. But real customer signals are messy. The same underlying need shows up in five different framings. Two signals look similar on the surface but reflect different root causes. Some signals don't belong anywhere yet and need to be held open. A good clustering process results in a set of candidate opportunities where the agent can say: "These seven signals seem to be pointing at the same underlying need." A bad one results in a set of labels that the signals were sorted into, whether or not they fit.

The output of good signal clustering is not just categories — it is opportunity statements written in customer voice. The difference matters. "Dashboard performance" is a category label. "I can't rely on the dashboard when I'm presenting to my manager because it loads too slowly to trust" is an opportunity statement in customer voice. The first could mean anything. The second tells you who is affected, in what context, and what the stakes are. Writing opportunity statements in customer voice forces the agent to stay close to what customers actually said rather than retreating into product or engineering abstractions.

Clustering also requires explicit handling of signals that don't fit. A well-structured clustering output includes not just the clusters themselves but a "doesn't fit" or "holding" category — signals that are real and potentially important but haven't yet accumulated enough mass to form a coherent theme. Premature closure on a cluster means these orphaned signals get forced into the nearest category, destroying the information they carry. The agent's job is to maintain the integrity of the unmapped pile, not minimize it.

Finally, good clustering is calibrated about evidence weight. A cluster built from fifteen independent support tickets carries different confidence than a cluster built from two interview quotes. A cluster where all signals come from the same user type carries different implications than one where the signals come from across the customer population. The clustering output should surface these differences explicitly, not flatten them.

## Why It Matters

Without clustering, a PM has a pile of signals — potentially hundreds across a quarter of discovery. Clustering is what makes that pile navigable and actionable. But the value of clustering depends entirely on whether it preserves the integrity of the signal or destroys it. Poor clustering is one of the most common ways that PM systems drift from customer reality: the signals were real, the clustering was wrong, and the opportunities in the OST reflect the agent's abstractions rather than what customers said.

The specific failure mode that matters most is over-fitting to the existing OST. When an agent knows the current opportunity tree before it clusters new signals, it has a strong pull toward sorting signals into existing categories. This is efficient but epistemically dangerous. It means the OST can never surprise you — new signals always confirm the existing structure because they've been forced to fit it. A well-functioning clustering process should occasionally produce a cluster that doesn't map to any existing OST branch, because that's how you find the opportunities you haven't been looking at.

Clustering also has a direct effect on prioritization. If the clusters are wrong — if two different underlying needs have been collapsed into one opportunity because the surface language was similar — then the apparent frequency of that opportunity is inflated. When the PM prioritizes based on frequency, they're acting on an artifact of the clustering process, not a real signal about customer impact. Getting clustering right is not just about intellectual cleanliness; it has downstream effects on what gets built.

## What Good Looks Like

**Weak clustering output:**

> **Cluster: Search Problems**
> Multiple customers mentioned issues with search. This is a significant pain point affecting user efficiency. Recommended priority: high.

Problems: No verbatim quotes. No customer voice. No indication of how many signals, from what sources, or what the specific complaints were. "Issues with search" could mean a dozen different things. The priority recommendation is unsupported and premature.

**Strong clustering output:**

> **Candidate Opportunity: Search doesn't return useful results when I know exactly what I'm looking for**
>
> *Signals (6 sources):*
> - Interview, User A: "I type the exact name of the file and it gives me everything except that." [Interview, 2026-04-12]
> - Support ticket #4421: "Search is useless — I have to scroll through everything manually." [2026-04-03]
> - NPS comment, Detractor: "Finding anything is a nightmare. I've given up on search entirely." [2026-03-28]
> - Interview, User B: "The search works fine for general stuff but if I need something specific I just can't trust it." [2026-04-18]
> - App review, 2 stars: "Search needs to be fixed. It never finds what I need." [2026-04-01]
> - Support ticket #4389: "Expected search to work like [competitor]. It doesn't come close." [2026-03-30]
>
> *Pattern:* The consistent thread is precision failure — customers who know what they want can't retrieve it. General browsing is less affected. The competitor reference suggests a mental model gap as well as a functional one.
>
> *Confidence:* Medium-strong. 6 independent sources across 3 signal types. All from users who use search intentionally, not just incidentally. No signals from users who primarily browse.
>
> *Doesn't fit this cluster:*
> - Support ticket #4456: "The search is too slow." [Speed is a different need — holding separately]
> - Interview, User C: "I don't really use search, I just scroll." [Relevant to navigation, not search quality]
>
> *OST mapping:* No current opportunity covers search precision specifically. Existing "navigation friction" opportunity is adjacent but distinct — that opportunity covers users who browse; this covers users who query. Recommend treating as a new candidate opportunity pending PM review.

The strong version gives the PM the evidence they need to evaluate the cluster themselves, explicitly distinguishes what fits from what doesn't, and flags the OST implication without asserting it as decided.

## Failure Modes

**Over-fitting to the existing OST.** The agent sorts every new signal into an existing category because the categories are already in its context. Novel signals that should create new branches instead get absorbed into the nearest existing one. The OST stops learning.

**Premature abstraction.** The agent collapses three or four distinct complaints into one "usability" or "friction" cluster because they share a general character. The cluster label is technically accurate but too abstract to act on. When the PM tries to design an experiment, there's no specific enough opportunity to test against.

**Ignoring the "doesn't fit" pile.** The agent presents clean clusters with no unmapped signals, implying that everything has been categorized. In reality, signals that resisted categorization were silently absorbed into the nearest cluster or dropped. The PM doesn't know what's been hidden.

**False frequency inflation.** The agent groups all search-related complaints into one cluster and reports "14 signals." But six of those signals are about speed, four are about precision, and four are about search scope — three different needs. The cluster count is inflated relative to the actual pattern, leading the PM to overweight it in prioritization.

**Inverting the process.** The agent starts with the OST categories and finds signals to fill them, rather than starting with signals and letting clusters emerge. This is confirmation activity, not discovery. The output will always confirm the existing structure.

**Customer voice loss.** Cluster opportunity statements are written in product language ("improve search relevance") rather than customer language ("I can't find things I'm looking for when I know exactly what I need"). The opportunity sounds like a feature spec rather than a customer need.

**Source conflation.** The agent mixes signals from fundamentally different customer segments — power users and casual users, churned customers and active customers, enterprise and SMB — without flagging the distinction. A pattern that's true for one segment may be the opposite for another.

## How to Evaluate It

**Test 1 — Novel signal detection.** Give the agent a signal corpus that contains a clear pattern not represented in the current OST. Check whether the agent (a) forces the signals into an existing OST category, (b) flags the signals as unmapped, or (c) proposes a new candidate opportunity. Only (b) or (c) is acceptable. If the agent consistently maps everything to existing categories, it's over-fitting.

**Test 2 — Cluster splitting.** Give the agent a corpus where two distinct underlying needs use similar surface language (e.g., "I can't find things" — where some users mean search precision and others mean navigation structure). Check whether the agent produces one cluster or two, and whether the distinguishing signals are identified. A weak agent collapses them; a strong one splits them and explains why.

**Test 3 — Source diversity assessment.** Give the agent a corpus where all signals come from the same user type or channel (e.g., all support tickets from enterprise accounts). Check whether the agent flags the corpus composition as a limitation on the conclusions, or whether it presents the clusters as if they represent the full customer population.

**Test 4 — Customer voice test.** Ask the agent to write the opportunity statement for each cluster. Check whether the statement is written in customer voice ("I struggle to X when Y happens because Z") or product voice ("users have difficulty with X"). If it's product voice, the clustering has drifted from the signal.

**Test 5 — Evidence count audit.** Ask the agent to list the exact signals supporting each cluster. Check whether the count matches what's in the corpus, or whether signals have been double-counted, dropped, or conflated across clusters.

## How to Develop It

**Separate the clustering step from the OST context.** Run an initial clustering pass without showing the agent the current OST. Let clusters emerge from the signals first. Then, in a second pass, compare the emergent clusters to the existing OST and make mapping decisions. This prevents the existing structure from contaminating the clustering.

**Require an "orphan" output.** Make it a hard structural requirement: every clustering output must include a section for signals that don't fit any cluster. Label it explicitly ("Unmapped / holding for pattern development"). If the agent consistently produces an empty orphan pile, it's probably forcing signals into clusters.

**Define cluster validity criteria explicitly.** In the system prompt: "A valid cluster requires at least 2 independent sources and a customer-voice opportunity statement. A single-source cluster should be tagged as 'candidate — awaiting corroboration,' not presented as a confirmed opportunity." Concrete criteria reduce the agent's latitude to call weak patterns confirmed themes.

**Practice cluster splitting.** Present the agent with intentionally ambiguous corpora — signals that seem related but aren't. Ask it to cluster them, then ask it to check whether any cluster should be split. Giving the agent an explicit split-check step builds the habit of interrogating its own cluster boundaries.

**Build a feedback loop on false clusters.** When clusters don't survive PM review — when the PM says "these don't actually go together" — treat that as training data. Collect the failures, identify the pattern (usually premature abstraction or surface-language matching), and update the clustering prompt to add a check for that specific failure mode.

## Sample Prompts

**Clustering prompt:**

```
You are clustering customer signals for a product team using Opportunity Solution Trees.

Your job:
1. Read all signals in the corpus below.
2. Group signals that appear to reflect the same underlying customer need or pain — not just similar surface language. Two complaints that use the same word but reflect different contexts are NOT the same cluster.
3. For each cluster, write an opportunity statement in customer voice: "I struggle to [do X] when [Y context] because [Z reason]." Do not use product language.
4. List the specific signals — with verbatim quotes where available — that support each cluster.
5. Create an UNMAPPED section for signals that don't fit any cluster clearly. Do not force them.
6. For each cluster, assess confidence: Strong (3+ independent sources, multiple signal types), Medium (2 sources or 1 with corroborating data), Weak (single source or ambiguous fit).

Do NOT consult the existing OST in this first pass. Let clusters emerge from the signals.

Signal corpus: [PASTE SIGNALS HERE]
```

**OST mapping prompt (second pass):**

```
You have produced the following candidate clusters from a fresh signal corpus. Now compare them to the current OST.

For each candidate cluster:
1. Does it map cleanly to an existing opportunity? If so, which one, and does the new signal strengthen or complicate it?
2. Is it adjacent to an existing opportunity but distinct enough to warrant a separate branch?
3. Does it represent a gap — something the OST doesn't currently address?
4. Does it contradict an existing OST assumption?

Do not force mappings. If a cluster doesn't map cleanly, say so.

Candidate clusters: [FROM CLUSTERING PASS]
Current OST: [PASTE OST]
```

**Cluster challenge prompt:**

```
Review the clusters you just produced. For each cluster:
- Should it be split? Are there signals in it that might reflect different underlying needs despite similar surface language?
- Is the opportunity statement written in customer voice, or does it drift toward product language?
- Are there any signals in the cluster that you're less confident belong there?
- What additional signals would make this cluster stronger?

Flag your three weakest cluster memberships — the individual signal-to-cluster assignments you're least confident in.
```

## Connected Skills

[[Transcript Synthesis]] — Synthesis produces the individual signals that clustering aggregates. The quality of clustering is bounded by the quality of synthesis.

[[Contradiction Detection]] — Clustering can reveal when a new signal cluster conflicts with an existing OST opportunity; this should trigger the contradiction detection skill.

[[Longitudinal Pattern Tracking]] — Clustering results dated and tagged become the input for tracking how opportunity themes strengthen, weaken, or shift over time.

[[Opportunity Validation]] — Clustering produces candidate opportunities; validation is the process of evaluating whether they meet the bar for OST inclusion.

[[Evidence Attribution]] — Each cluster should have a clear evidence map; attribution makes the cluster's support legible to the OST.

[[Bias Detection]] — Clustering is where corpus composition bias becomes consequential — if all signals are from one segment, cluster confidence should reflect that.

[[Confidence Tagging]] — Cluster-level confidence is one of the most important places this skill is exercised.
