# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary audience is people evaluating the author's frontend craft (recruiters, clients, peers) who open the app as a portfolio piece. They browse it the way a crypto-curious visitor would: glance at the market, open a coin, skim headlines. Visual ambition is the top priority, but every number must be real, live data.

## Product Purpose

CryptoZone is a live cryptocurrency market tracker: global market stats, a ranked coin market, per-coin detail with price history, and a crypto news feed. Success means a visitor understands the market at a glance and is impressed by how it feels to explore.

## Capabilities and Constraints

- Frontend-only React + Vite + TypeScript SPA, Tailwind, Redux Toolkit Query; deployed on Vercel with SPA rewrites.
- Market data: Coinranking API via RapidAPI (`VITE_RAPIDAPI_KEY`): coins list (with stats, sparklines), coin detail, price history by period (3h–5y).
- News: CryptoCompare news API (`VITE_CRYPTOCOMPAREAPI`).
- No backend, no accounts. Per-visitor state (watchlist, theme) lives in localStorage.
- Confirmed feature set: sortable market table with sparklines, watchlist, global ⌘K quick search, richer coin page (interactive chart, period stats, supply, links). Further quality-of-life additions are delegated to the designer.

## Brand Commitments

Name is "CryptoZone" (normalize the old "CryptOzone" spelling). No logo or other brand assets exist.

## Evidence on Hand

All data is live from the APIs above. There are no testimonials, users, or claims; do not invent any. Nothing on the site is financial advice.

## Product Principles

- Real data, presented with conviction: numbers are the hero.
- Glanceable first, explorable second.
- Every screen should feel crafted enough to stand as a portfolio exhibit.
- Fast and resilient: loading, empty, and error states are designed, not afterthoughts.

## Accessibility & Inclusion

WCAG AA contrast; gains/losses must not rely on color alone (sign and arrow accompany color); respect reduced motion.
