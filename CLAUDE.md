# peachblue.io: CLAUDE.md

The Peachblue marketing site. Next.js app router, MDX content, deployed by Vercel from `main`. This repository is public on GitHub: never commit secrets, customer data, internal mechanisms, or notes about accounts and machines. Keep this file to structure and rules.

Read `AGENTS.md` first: this Next.js version has breaking changes from what you may expect, and the guides in `node_modules/next/dist/docs/` are the reference.

## What the site does

- `/` long-scroll conversion homepage, `/pricing`, `/demo` (lead form; `?intent=agency` variant), `/privacy`, `/terms`, `/mcp`, `/og-square`.
- `/blog` and `/blog/[slug]`: manifest-driven articles with FAQ schema, per-post OG images, RSS at `/feed.xml`.
- `/docs` and `/docs/[slug]`: product documentation from a manifest.
- `/integrations/[slug]`: one page per connected platform.
- `/tools/creative-waste`: the interactive creative-waste diagnostic.
- `/llms.txt` and `/llms-full.txt`: generated from the docs and blog manifests so they never go stale.
- Markdown for agents: `middleware.ts` rewrites `/docs/<slug>.md` and `/blog/<slug>.md`, and any request with an `Accept: text/markdown` header, to `/raw/{docs|blog}/{slug}`, which serves the source MDX.
- `/api/contact`: demo and sales inquiries, emailed via Resend and forwarded to the app.

## Layout

- `content/blog/manifest.ts`: every article, planned or published: slug, title, description, type, pillar, keywords, competitors, byline, FAQ, raw-material pointers, status. The single source of planning truth. `content/blog/posts/*.mdx` are the articles.
- `content/blog/truth/`: the claim layer. `voice.md` (style and structure rules), `product.md` (the only source of product claims), `competitors.md` (the only source of competitor facts, with dates), `proof.md` (the only source of statistics). Generated copy may not claim anything that is not in these files.
- `content/docs/manifest.ts` + `content/docs/pages/*.mdx`; `content/integrations/manifest.ts`.
- `lib/site.ts`: the single source for `SITE_URL`, `APP_URL`, the self-serve gate and every CTA href and label. Edit CTAs here, never per page.
- `lib/blog.ts`, `lib/docs.ts`, `lib/og-card.tsx`, `mdx-components.tsx`.
- `components/site/` (nav, footer, demo form, brand mark, platform marks), `components/blog/`, `components/docs/`, `components/tools/`.
- `ASSETS.md`: the creative asset spec (mock ad creatives and app screenshots, sizes and counts).
- `.claude/skills/write-post`: drafts one article from the manifest and the truth layer. Output is always a draft for a human edit pass; it never sets status to published.

## Rules

- **Claims come from the truth files.** If a fact is not in `product.md`, `competitors.md` or `proof.md`, it does not go on the site. Competitor entries older than 30 days need re-verification before a comparison page is written. `product.md` must be updated when features ship and never ahead of them.
- **Voice** (`truth/voice.md` is the full list): no em dashes, no emojis, sentence-case headlines, answer-first sections, real tables for comparisons, every post has an FAQ, named statistics carry their source inline, American English, concrete over hype.
- **Never expose internals**: no AI provider names, no exact tag counts, no implementation details in public copy.
- **Design** mirrors the app's `pb-*` token system. Fraunces is the display face (weight axis only, no `opsz` or `SOFT`); Inter for body; JetBrains Mono for figures. H1s may italicize the final word or two; that is a site pattern, not an app pattern.
- **CTAs** always route through `lib/site.ts`. When `NEXT_PUBLIC_SELF_SERVE_LIVE` is not `1`, every trial CTA goes to `/demo`.
- **Bylines**: opinion and strategy posts by Nick; reference and guide posts by Peachblue.
- **Public repo.** No secrets, no `.env*` (gitignored), no internal notes, no customer names beyond what is already published.

## Environment

`NEXT_PUBLIC_APP_URL` (defaults to the production app), `NEXT_PUBLIC_SELF_SERVE_LIVE` (`1` in production), `RESEND_API_KEY`, `RESEND_FROM`. Values live in Vercel and a local `.env.local`; only names are recorded here.

## Local development

`npm run dev`. The `.claude/launch.json` entry `peachblue-website` runs it on port 4100. Running `npm run build` while the dev server is up clobbers its `.next` cache; clear it and restart if pages start returning 500.

## Relationship to the app

The app (`app.peachblue.io`) is a separate repository and Vercel project. The site links into it for signup and trial, and the contact form forwards each lead to it. Product claims on the site should describe what the app actually ships today; the truth file lags the August and September 2026 feature waves and needs a refresh before the site claims them.

Legal entity, as shown on the privacy and terms pages: Peachblue Technologies Inc., Ontario, Canada.
