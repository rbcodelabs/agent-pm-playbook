# Capstone Worked Exemplar — "Parcel" (B2C Food Subscription)

> **How to use this:** this is a fictional capstone submission from a solo founder on a B2C artisan food subscription app called Parcel. It's scored against the real rubric. Read it to understand the *shape* of a passing submission — what level of detail, honesty, and structure earns a 2 vs. a 1 on each dimension. Don't copy it; your product will produce different content.

---

## About Parcel

Parcel is a monthly artisan food subscription box. Solo founder. ~200 active subscribers. Desired outcome: **raise month-3 retention from 42% to 65%**. No issue tracker — work tracked in Markdown notes. No engineering team; the founder handles the Shopify storefront and a monthly email.

---

## Step 1: Signal batch collected

**Sources:**
- 4 cancellation-survey responses from the past 30 days (Typeform, free-text)
- 6 async voice-note check-ins with subscribers who stayed past month 3 (recruited via email)
- 23 App Store reviews from the past 90 days (exported, filtered for 1–3 star)

**Total:** 3 methods, 3 source types.

---

## Step 2: Signal Ledger entry (synthesis output)

**Date:** 2026-06-09
**Sources:** 4 cancel surveys, 6 async voice interviews, 23 App Store reviews (1–3 star)

### Clusters

**Cluster A — Box feels generic after month 2** *(High confidence)*
Subscribers expected curation to become more personalized over time. It didn't.
- *"By month 3 I felt like I was paying for someone else's taste." — interview 4*
- *"The box stopped surprising me after the first two months." — App Store, 1 star*
- *"I stayed for the novelty, not the food. When the novelty wore off it just felt expensive." — interview 2*
- 4/6 voice interviews raised this unprompted. 14/23 App Store reviews contain a variant of "generic" or "same."
- **Sources:** 2 methods, 6 independent sources. Confidence: **High.**

**Cluster B — Discovery friction: can't find the producers** *(Medium confidence)*
Several subscribers who churned mentioned they wanted to know more about the producers but couldn't find it easily.
- *"I'd have stayed if I felt connected to where the food came from. I tried to find the farms and gave up." — cancel survey 2*
- *"Looked for the story behind the hot sauce. Nothing in the box, nothing in the email." — App Store, 2 star*
- 2/4 cancel surveys, 3/23 App Store reviews. Not raised in voice interviews (not probed directly).
- **Sources:** 2 methods, 5 sources. Confidence: **Medium** (single-probe; not cross-confirmed in interviews; could be a post-hoc rationalization for churn).

**Cluster C — Price/value doubt near renewal** *(Low confidence)*
Two cancel surveys and one App Store review mentioned price, but the language was vague ("not worth it for me now") and appeared alongside Cluster A language in the same responses. May be downstream of perceived genericness rather than a standalone driver.
- **Sources:** 1 method, 3 sources — all alongside Cluster A. Confidence: **Low.** Treating as downstream of A until confirmed independently.

**Contradictions / open questions:**
- One voice interview (subscriber since month 8, still active) said personalization was "not a selling point — I trust the curation." Directly contradicts Cluster A. Could be a retention survivor; could be a segment this product actually serves well. Flagged — needs one more data point before acting.
- Cluster B and C may both be downstream of Cluster A. If the product felt personalized, would discovery friction still matter? Unknown.

**OST update:** Cluster A maps to existing opportunity "Customers struggle to feel like the box is curated for them." Cluster B is new — adding as "Customers struggle to connect with the producers behind what they're eating." Cluster C held as Low / not actioned.

---

## Step 3: OST update (before → after)

**Before:** OST had 5 opportunities, all in Exploring. Focus branch: "Customers struggle to get their first box right" (onboarding gap hypothesis from month 1).

**After:**
- Demoted "first box" opportunity from focus — no signal in this batch; no verbatims in cancel surveys.
- Promoted "Customers struggle to feel the box is curated for them" (Cluster A) to **Validating** — now the highest-evidence branch, 6 independent sources across 2 methods.
- Added "Customers struggle to connect with producers" (Cluster B) at Exploring.
- Added contradiction flag to Cluster A opportunity node: "1 of 6 long-term subscribers explicitly said personalization isn't what keeps them. Investigate segment."

**Focus branch: "Customers struggle to feel the box is curated for them"**
Rationale: highest-evidence, directly connected to month-3 churn (the desired outcome), and addressable without engineering.

---

## Step 4: Experiment brief

**Focus opportunity:** Customers struggle to feel the box is curated for them.
**Stage:** Validating → entering Testing.

**Candidate solutions under this opportunity:**
1. Personalization survey after month 2 ("tell us what to dial up/down")
2. A handwritten card from the founder each month explaining *why* this month's items were chosen
3. A brief "your palate profile" email that tells each subscriber what their past ratings revealed

**Riskiest assumption on solution 2 (handwritten card):**
*That receiving a personal explanation of curation — not actually personalizing the product — is enough to make subscribers feel the box is "for them."*

If the problem is that the box *is* actually generic and a card can't fix that, no communication layer will hold retention. The demand side (do subscribers want to feel seen?) is validated; the riskiest assumption is whether *the feeling* is separable from *actual customization*.

**Chosen test type: Concierge**
Send 5 month-2 subscribers a personal email from the founder this month: one paragraph explaining specifically why this month's box was assembled — what the founder noticed about food trends, why these producers were chosen, and a question about their experience. Measure whether they open month-3 boxes and whether they cancel in month 3.

Why not fake door? Demand isn't the unknown — 4/6 interview subscribers said they wanted the story behind the curation. The unknown is whether *providing* it actually holds retention, so demand-measurement is the wrong test.

Why not A/B? Can't hit statistical significance on 200 subscribers before a meaningful number churn. Concierge answers the behavioral question faster and cheaper.

**Success condition (written pre-test):** ≥4 of 5 concierge subscribers retain into month 4. (Month 4 = first renewal decision post-intervention, at roughly 30 days.)

**Kill condition (written pre-test):** ≤2 of 5 retain into month 4, OR 0 of 5 reply to the founder's question in the email. Either result means the communication layer alone isn't the answer — go back to discovery on whether actual product customization is needed.

**Time window:** 35 days (month-3 renewal window for these 5 subscribers).

---

## Step 5: Investment-gate verdict

**Stage:** entering Testing.
**Gate criteria:**

| Criterion | Score | Notes |
|---|---|---|
| Problem evidence | ✅ Yes | Cluster A: High confidence, 6 independent sources, 2 methods |
| Widespread enough | ✅ Yes | 14/23 App Store reviews, 4/6 interviews — not a niche complaint |
| Solution tested | ⚠️ Partially | Concierge test designed and ready; not yet run |
| Kill condition written | ✅ Yes | Specific numbers, written before results |
| Investment ceiling respected | ✅ Yes | Concierge = 1 email, 1 hour founder time. No build. |

**Verdict: Conditionally Ready.** The gate clears if the concierge test runs and meets success criteria. The partial on "solution tested" is intentional — it's the exact thing the test will answer. Cheapest next action: run the 5-account concierge now, check at day 35.

---

## Reflection

**Where the evidence is thin:**
- Cluster B (producer discovery) rests on 2 methods but only 5 sources and was never probed in voice interviews. I flagged it Low/Medium but didn't act on it. If the concierge test's founder emails include producer context naturally, I may get incidental data on whether it affects replies.
- The contradiction from the month-8 active subscriber is unresolved. It could mean there's a "late-stage" subscriber segment for whom personalization isn't the retention driver — or it could be a survivor-bias artifact. I don't have enough data to tell.

**What I'm still unsure about:**
- Whether retention improvement on 5 concierge accounts is a signal I can act on vs. a fluctuation. I set my N at 5 given the small cohort; I'm aware it's low. If 4/5 retain, I'll run a second wave of 10 before changing the product approach.
- Whether Cluster C (price/value) is truly downstream of Cluster A or an independent driver. I made a judgment call to park it; that call could be wrong.

**What I'd do next:**
- Run the concierge test (35-day window).
- Explicitly probe Cluster B in the next 3 voice interviews — ask directly: "Did you ever try to find out more about the producers? What happened?"
- In month 2, re-interview the month-8 active subscriber to probe whether something other than curation quality is driving their retention.

---

## Rubric self-score

| Dimension | Score | Justification |
|---|---|---|
| **Evidence quality** | **2** | Every cluster carries verbatims, source counts, calibrated confidence. Contradictions named. Nothing prioritized rests on a single source. |
| **Tree integrity** | **2** | One outcome at root; opportunities framed as customer needs; focus branch justified by evidence + outcome connection. Orphan ("first box") demoted with reason. |
| **Test minimalism** | **2** | Riskiest assumption correctly ranked (feeling vs. actual customization). Concierge is cheapest test that answers it — fake door (demand already proven) and A/B (sample too small) explicitly ruled out. Kill condition written pre-test. |
| **Honest uncertainty** | **2** | Three open uncertainties named explicitly. Low-N acknowledged with a plan. Contradiction flagged and not smoothed. Reflection names what's unknown and the cheapest way to learn it. |

**Total: 8/8. No zeros.**

---

> **Note to the reviewer (or self-reviewer):** the score above is what the submission earns — not what the founder *wants* it to earn. The test that earns the 2 on Test Minimalism isn't running a concierge; it's ruling out fake door and A/B with specific, honest reasons and pre-writing the kill condition. The 2 on Honest Uncertainty isn't listing the open questions; it's naming what specific data would close each one and not pretending the N=5 is more than it is.
