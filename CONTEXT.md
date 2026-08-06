# CONTEXT.md — Noema Consultora

Single-context domain doc for this repo. Read this before touching the codebase; terms defined here are canonical.

## What this is

Corporate landing site for **Noema**, a market-research consultancy directed by **Carmen Capli** in Asunción, Paraguay (coverage MERCOSUR). It is a single-page marketing site: hero, about, services, interactive diagnostic calculator, case studies, interactive charts (Chart.js), methodology, FAQ, and a contact form wired to a Vercel serverless function.

## Canonical glossary

Use these terms exactly when naming features, issues, or specs.

- **Diagnóstico** — the interactive methodological calculator (`#calculadora`). The "Diagnóstico Express" CTA.
- **Data Insights** — the interactive Chart.js dashboard (`#demostracion`).
- **Estudio** — a market-research engagement; described by sample (`n=...`), technique (cuantitativo/cualitativo), duration, and deliverable.
- **Casos de Éxito** — the case-study cards (`#casos`).
- **Insights** — the strategic findings/recommendations delivered to clients.
- **Contact form** — `#noemaContactForm` → `POST /api/contact`.
- **Crafted bar** — the footer credit line to Exepaginasweb.com.

## Stack

- **Frontend**: semantic HTML5 + vanilla CSS (custom design system, CSS variables) + vanilla ES6 JS.
- **Charts**: Chart.js via CDN (deferred).
- **Backend**: Vercel serverless function `api/contact.js` (ESM, default export handler).
- **Email**: Vercel Analytics script; form email sending is **planned via Resend** (see roadmap) — currently a prototype fallback.
- **Deploy**: Vercel (project `noema`, scope `exedevcentrals-projects`), linked to GitHub repo `ExeDevCentral/noema`.

## Conventions

- CSS uses the `:root` design tokens in `css/styles.css` (navy `#1B2A38`, terracotta `#C88A6E`, sage `#8F9E8B`, ivory `#FAF8F5`). New styles must reuse tokens, not hardcode colors.
- Keep it a zero-build static site: no framework, no bundler, no TS.
- Serverless functions are ESM and named with a default export `handler(req, res)`.
- Commit messages follow Conventional Commits (`feat:`, `perf:`, `fix:`, `chore:`).

## Current state & roadmap

- Live at `noema-ivory.vercel.app` (production). Custom domain and real email sending are **not yet configured**.
- The professionalization roadmap lives in `PROFESSIONAL-PLAN.md` (7 phases: repo/GitHub, domain, email via ImprovMX+Resend, SEO/analytics, security, QA, docs).

## Architecture decisions

Recorded in `docs/adr/`. None recorded yet.
