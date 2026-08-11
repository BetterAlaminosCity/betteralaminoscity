# Product

## Register

product

## Users

Residents of Alaminos City, Pangasinan (and prospective visitors/investors) looking up government
services, contact info for officials, and public data like budgets and demographics. Volunteer
civic-tech context, not an official government product. Users include older residents and people
on low-end phones with slow connections — this is a public-info lookup tool, not a dashboard for
power users.

## Product Purpose

A guide to Alaminos City government services: office directories, officials' contact info,
service requirements/processing steps (from the Citizen's Charter), and open civic data
(budget/fiscal transparency, population/demographics). Success looks like a resident finding the
answer they came for (a phone number, a requirement list, a population figure) quickly and
trusting that it's accurate and current.

## Brand Personality

Trustworthy, clear, official. Plain-language, no marketing flourish. Data is presented as fact,
sourced and dated (every data page cites `source` + `lastUpdated`). Calm and civic, not corporate-
SaaS.

## Anti-references

Not a SaaS dashboard. Not a campaign/political site. Avoid hero-metric gradient cards, glassy
stat tiles, or anything that reads as a pitch rather than a public record.

## Design Principles

- **Consistency over novelty**: every page should read as part of the same system
  (`@bettergov/kapwa` tokens, shared `PageHeader`/`DataSourceNote` components). A page that skips
  the system (raw `<table>`, no tokens) reads as broken, not as a fresh take.
- **Cite the source, always**: every data-derived figure traces back to a dated source via
  `DataSourceNote` — never bare numbers.
- **Legible at a glance, on any device**: short scan paths, real contrast, large-enough type,
  since the audience skews toward less tech-savvy users on small screens.
- **Plain civic tone**: no jargon, no growth-hacking UI patterns (fake urgency, upsells, hero
  metrics for their own sake).

## Accessibility & Inclusion

WCAG 2.1 AA baseline: sufficient color contrast via kapwa's tinted-neutral tokens, keyboard
navigability, readable base type sizes, no motion-dependent information.
