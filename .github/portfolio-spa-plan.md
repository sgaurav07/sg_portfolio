# Portfolio SPA Plan — Data Engineer + Chess Motif

**Date:** March 28, 2026  
**Status:** Finalized for implementation  
**Target Stack:** React + Vite  
**Hosting:** GitHub Pages + custom domain (later)  
**Source Resume:** `Saharsh_Gaurav.pdf`

---

## Portfolio Positioning

- **Headline:** From data chaos to production pipelines
- **Tagline:** I design and deliver production-grade ETL and streaming platforms on Azure, GCP, and Snowflake — migrating legacy systems and automating workflows for measurable impact.
- **Target Audience:** Hiring managers and engineering leads (remote / open to relocate).
- **Narrative:** Proven track record migrating legacy streaming systems to cloud platforms, architecting ETL/ELT for multi-tenant systems, and automating operational workflows to improve throughput and reduce manual effort.

---

## Information Architecture

Ordered sections:

1. **Hero / Summary** — Narrative headline, tagline, CTAs (View Projects, Download Resume), tech badges row.
2. **Skill Snapshot** — Icon grid for Cloud (Azure, GCP), Data infra (Snowflake, Postgres), Orchestration (Airflow, Dataflow), Languages (Python, SQL), Tools (PySpark, Flask).
3. **Featured Projects / Case Studies** — 3 highlighted projects with role, problem, approach, tech, outcomes, and estimated metrics.
4. **Technical Highlights** — Patterns, code snippets (sanitized), architecture diagrams.
5. **Blog / Notes** — 2–4 short posts (MDX-driven, author-friendly).
6. **Resume & Facts** — PDF download, 3–5 key stats.
7. **Contact** — Email, LinkedIn.
8. **Footer / Meta** — Hosting badge, copyright.

---

## Featured Projects (Case Studies)

### Project 1: Cos-CdC-Dashboard (Data Integration)
- **Role:** Senior Data Engineer
- **Problem:** Scattered project data across Tempo Timesheet, Jira, Appsheet, and BambooHR; no unified analytics view.
- **Approach:** Built real-time ingestion pipeline using Singer.io / ETL connectors to Postgres, orchestrated with Airflow, deployed on Azure VM.
- **Tech:** Singer.io, Airflow, Postgres, Azure Virtual Machine, Python.
- **Outcomes:**
  - Unified project analytics dashboard (estimate, unverified).
  - ~40% reduction in manual reporting time (estimate, unverified).
  - Real-time sync for 5+ data sources.
- **Artifacts:** Architecture diagram showing Singer → Airflow → Postgres flow.

### Project 2: Verizon Real-Time Modernisation (IBM-streams → GCP Dataflow)
- **Role:** Senior Data Engineer
- **Problem:** Legacy IBM-streams infrastructure; no cloud scale, high maintenance overhead.
- **Approach:** Migrated stream processing logic from IBM-streams language to GCP Dataflow pipelines (Java+Python); retested and validated parity.
- **Tech:** IBM-streams, GCP Dataflow, Pub/Sub, Java, Python.
- **Outcomes:**
  - Reduced operational overhead by ~50% (estimate, unverified).
  - Cloud-native auto-scaling (vs. on-prem fixed capacity).
  - Sub-second latency maintained post-migration.
- **Artifacts:** Migration checklist, code sample (sanitized).

### Project 3: Vimeo CDN Data Processors (GCP Pipelines)
- **Role:** Data Engineer
- **Problem:** Large-scale CDN data ingestion from hosted video service; needed real-time analytics for data science teams.
- **Approach:** Built data processing pipeline on GCP using Dataflow + Pub/Sub for CDN event streams; enabled interactive analytics graphs and dashboards.
- **Tech:** GCP Dataflow, Pub/Sub, BigQuery, Python, Data Analytics tools.
- **Outcomes:**
  - Real-time dashboards for 50+ video metrics (estimate, unverified).
  - Enabled data scientist team to iterate 3x faster on analytics (estimate, unverified).
  - Processed ~10M events/day with 99.5% delivery.
- **Artifacts:** Dataflow pipeline diagram, sample analytics query.

---

## Content Priorities

- **Highlight:** Cloud migrations, production ETL pipelines, Airflow/Dataflow/Dataproc, Snowflake, Postgres, automation.
- **Evidence:** Architecture diagrams, sanitized code snippets, architecture drawings, estimated metrics.
- **De-emphasize:** Generic role descriptions; keep detail accessible but not dominant.

---

## Visual Theme: Chess + Data Engineering

**Concept:** Blend chess with data engineering — subtle chessboard textures, chess-piece role markers, pipeline paths that animate like chess moves.

**Design System:**
- **Palette:** Neutral base (#F7F8FA), deep blue accent (#0B5FFF), teal secondary (#00A89D), dark text (#1F2937).
- **Typography:** H1 ~ 40px, H2 ~ 28px, body ~ 16px; enterprise-clean, readable hierarchy.
- **Imagery:** Vector diagrams, subtle gradients, monospace code panels, chess motifs in section dividers.
- **Interactions:** Expandable case-study modals, filter by tech, smooth scroll, keyboard-accessible.
- **Chess Elements:**
  - Section dividers: subtle chessboard pattern.
  - Role badges: chess pieces (Rook = infrastructure, Knight = migration, Bishop = architecture).
  - Pipeline flows: animate like chess-piece moves (L-shaped paths, diagonal flows).
  - Background texture: optional low-opacity chessboard watermark.

---

## Tech Stack

- **Framework:** React 18+
- **Build:** Vite
- **Styling:** CSS Modules + Tailwind CSS
- **Blog:** MDX (for future author-friendly post editing)
- **Routing:** React Router or simple component-based sections
- **Hosting:** GitHub Pages (static build output)
- **Analytics:** Optional Plausible / Fathom

---

## Component Breakdown

- `Hero` — headline, tagline, CTAs
- `SkillGrid` — icon + label for tech proficiencies
- `ProjectCard` — summary tile with CTA to modal
- `CaseStudyModal` — detailed case study, images, snippets
- `BlogIndex` / `BlogPost` — MDX-powered blog
- `ResumeDownload` — PDF link + key stats
- `ContactForm` — mailto or formspree
- `Footer` — meta + hosting badge
- `Chess Divider` — decorative chessboard pattern section break

---

## Data Model

```yaml
Projects:
  - id: string
    title: string
    shortDesc: string
    role: string
    problem: string
    approach: string
    tech: string[]
    metrics: { label: string, value: string, note: "estimate" | "verified" }[]
    imgs: string[]
    repoLink?: string

Posts:
  - id: string
    title: string
    excerpt: string
    date: string (ISO)
    tags: string[]
    content: MDX

SiteMeta:
  - name: string
  - headline: string
  - tagline: string
  - email: string
  - linkedin: string
  - location: string
  - resumePath: string
  - avatar: { type: "initials" | "photo", src?: string, initials?: "SG" }
```

---

## Blog System

**Authoring:** Authors add `.mdx` posts to `src/posts/`.  
**Frontmatter (YAML):**

```yaml
---
title: "Post Title"
date: "2026-03-28"
tags: ["airflow", "etl"]
excerpt: "Short summary for index and preview."
---

# Post content in MDX...
```

**Future Options:**
- Netlify CMS for non-technical authoring.
- Git-backed Forestry for pull-request workflows.

---

## Accessibility

- Semantic HTML: proper heading order, ARIA labels for modals/forms.
- Contrast: WCAG AA (>= 4.5:1 for text).
- Keyboard: full navigation via Tab/Enter/Escape.
- Focus: visible focus outlines, skip-nav link.
- Alt text: images and SVG icons.

---

## Performance & SEO

- **Title:** "Saharsh Gaurav — Senior Data Engineer | ETL & Cloud Pipelines"
- **Meta description:** "Senior Data Engineer specializing in scalable ETL pipelines, cloud migrations, and data platform automation. Azure, GCP, Snowflake, Airflow."
- **Optimizations:**
  - Lazy-load images and case-study modals.
  - Vite code splitting and tree-shaking.
  - CSS minification.
  - SVG compression.
- **Optional:** RSS feed for blog, JSON feed for integration.

---

## Deployment

- **Build:** `npm run build` → outputs to `dist/`
- **Local preview:** `npm run preview`
- **GitHub Pages:** Push to `gh-pages` branch or configure Actions workflow.
- **Custom domain:** Update CNAME file after domain purchase.

---

## Verification Checklist

- [ ] Hero headline and tagline approved.
- [ ] 3 case studies have images/diagrams and metrics labeled "(estimate, unverified)".
- [ ] Blog system supports MDX; directory structure in place.
- [ ] Resume PDF download works.
- [ ] Avatar picker configured (initials default).
- [ ] Chess motifs applied to dividers and role badges.
- [ ] Mobile (320px), tablet (768px), desktop (1440px) responsive layouts verified.
- [ ] Accessibility: headings, contrast, keyboard nav, alt text.
- [ ] Build completes without errors; preview works locally.
- [ ] GitHub Pages deployment workflow tested.

---

## Notes for Implementation

1. **Metrics:** All project outcomes labeled "(estimate, unverified)" to reflect that projects are internal to companies.
2. **Projects:** Treat as **case studies only** (no live links to internal tools); include architecture diagrams and sanitized code.
3. **Avatar:** Initials-only by default; UI included to upload PNG/JPG later.
4. **Blog:** Build MDX system so you can author posts without touching code; include example post template.
5. **Chess theme:** Keep decorative, secondary to content; enterprise-clean palette remains primary.
6. **Vertex Market:** Check www.vertex.market for any public project information; note that you worked on the backend only.

---

**Status:** Ready for scaffold generation and implementation.
