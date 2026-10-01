# Sample Product Brief — ShiftLoop

> Fictional product for the Agentic PM training. Everything here is invented. Use it as the shared context for Modules 2–4. It's also a worked example of what a real `pm-config.md` Outcome and headline Key Result should look like (see Module 1).

## What it is

**ShiftLoop** is a B2B SaaS scheduling tool for teams that run on shifts — restaurants, retail stores, urgent-care clinics, warehouses. A floor or shift manager builds a weekly staff schedule, publishes it, and the staff see their shifts on their phones. ShiftLoop can auto-generate a draft schedule from staff availability, role coverage rules, and labor-budget targets, which the manager then edits and publishes.

## Who uses it

- **Primary user (the one who has to activate):** the **shift manager** at a single location with 20–200 hourly staff. Often non-technical, time-poor, building the schedule in stolen minutes between shifts. Today most of them schedule in spreadsheets, a whiteboard, or a previous tool they've outgrown.
- **Buyer / economic decision-maker:** the **operations director or owner**. Cares about labor cost, compliance, and turnover — not about the scheduling UI.
- **End viewer:** the **hourly staff member**, who mostly wants to know "when do I work next, and can I swap a shift."

## Where the business is

ShiftLoop sells a 14-day free trial that converts to a paid monthly plan per location. Trials are self-serve: a manager signs up, is supposed to set up their team and publish a first schedule, and then (ideally) keeps scheduling in ShiftLoop every week.

The problem: **most trials never get to a published schedule.** Sales and onboarding both report that accounts which publish a first real schedule almost always convert and stick; accounts that don't, churn silently. Activation is the bottleneck, and right now it leaks badly.

## The current goal, in OOKRST terms

The team's goal is stated as a metric:

> **Increase new-account activation — the percentage of trial accounts that publish their first complete weekly schedule within 7 days of signup — from 38% to 60% by the end of the quarter.**

In the OOKRST structure ([guide](../../guides/ookrst-structure.md)) that sentence splits into two levels. The **Outcome** is the behavior change, with no numbers: *trial managers publish a complete first weekly schedule within their first week* (`OUT-1`). The **Key Result** is the measurement: *7-day activation from 38% → 60% by end of quarter* (`OUT-1-KR-1`). It has a baseline, a target and a date — a measurable change in customer behavior, not a feature, not "make onboarding better." (Carry this back to Module 0.) What the tree starts *from* is the customer need behind the goal, which you derive yourself in Module 2.

### What "activated" means precisely

A trial account is **activated** when it has, within 7 days of signup: (a) added at least 5 staff to the roster, and (b) published one schedule covering at least 5 shifts for a real upcoming week. Drafts that are never published do not count.

## Constraints worth knowing

- Managers are time-poor and often abandon mid-setup; every extra step in the first session costs activation.
- Staff data already exists somewhere — almost always a spreadsheet or the previous scheduling tool.
- The buyer and the user are different people with different definitions of "good," which shows up in the signals.
- Some users distrust automation and want manual control; others want the tool to "just do it." Both are real and they pull in opposite directions.

## How to use this brief

- **Module 2:** start from the need behind this goal and build the tree downward (Opportunity → Outcome → KRs → Solutions → a Test) from the brief alone, then later cross-check against the signals.
- **Module 3:** synthesize the [interviews](interviews/) and [support tickets](support-tickets.md) into opportunity clusters, and attach them to the Opportunities on your Module 2 tree.
- **Module 4:** pick a candidate Solution under the focus KR, decompose its riskiest assumption, and design the cheapest Test.
