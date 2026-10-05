# peachblue.io: CLAUDE.md

The Peachblue marketing site. Next.js app router, MDX content, deployed by Vercel from `main`. This repository is public on GitHub: never commit secrets, customer data, internal mechanisms, or notes about accounts and machines. Keep this file to structure and rules.

Read `AGENTS.md` first: this Next.js version has breaking changes from what you may expect, and the guides in `node_modules/next/dist/docs/` are the reference.

## What the site does

- `/` long-scroll conversion homepage built around recreations of the real product: hero, then nine numbered sections (how it works, Agent Peach, for creative teams, why Peachblue exists, for performance teams, also in Peachblue, pricing, questions, get started). Also `/pricing`, `/demo` (Cal.com booking embed with the lead form as a fallback; `?intent=agency` variant), `/privacy`, `/terms`, `/mcp`, `/og-square`.
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
- `app/page.tsx`: the homepage, a server component that renders `HomePage` from `components/home/Page.tsx` and nothing else. It exports no metadata: the title, description, canonical, robots setting and JSON-LD come from `app/layout.tsx`. Every word is in the HTML the server sends and nothing waits on JavaScript to become visible.
- `components/home/`: the homepage. `Page.tsx` orders the sections (its comment is the map of the page); one file per section or group (`Hero`, `Sections` for how it works, the essay, the manifesto and the close, `Agent`, `Creative`, `Performance` with `Weekly` and `Platforms`, `Toolkit`, `Pricing`, `Faq`); `content.ts` (the homepage copy as typed data; edit copy there, never inline); `parts.tsx` (the page's system: frame, type scale, rules, section markers, actions, navy bands, stages, and the boxes that scale a product picture to its slot); `theme.ts` (the page's colours as CSS variables, set on the page wrapper); `Figures.tsx` and `Marks.tsx` (small figures and one-colour platform marks). The page's few hand-written CSS rules (`.bp-*`) are at the end of `app/globals.css`.
- `components/product/`: static recreations of the real app, used as the site's pictures. `sample.ts` is the one fictional sample account (Fizzli) every picture draws from; `ui/` holds the app's primitives ported as server components; `frame/` holds `Shot` (the wrapper that applies the product scope `.pb-app`, hides the picture from assistive tech and search snippets, and carries its text alternative), `AppWindow` and `Tile`; one directory per product area. Not every fragment is on a page today; the directory is kept as a library (it holds no recreation of the app's Performance page: see the rule on product pictures). `scripts/lint-tells.mjs` is the style gate for this directory (`node scripts/lint-tells.mjs`).
- `public/ads/`: the sample account's ad creatives. `sm/`, `md/` and `wide/` hold resized WebP copies made by `scripts/make-ad-variants.py`, which cuts the thumbnail and the wide band where `components/product/ui/adFocus.json` says each creative's crop sits; `components/product/ui/adImage.ts` derives a copy's path from the original's. Re-run the script (`python3 scripts/make-ad-variants.py`, needs Pillow) after adding or replacing a creative or changing a focus. A run with nothing changed rewrites every copy byte for byte and leaves `git status` clean; if it does not, the script and the committed copies have drifted (or the image library's version has changed), so look before committing.
- `lib/site.ts`: the single source for `SITE_URL`, `APP_URL`, the self-serve gate and every CTA href and label. Edit CTAs here, never per page.
- `lib/blog.ts`, `lib/docs.ts`, `lib/og-card.tsx`, `mdx-components.tsx`.
- `components/site/` (the nav, the footer, buttons, the demo form, the brand mark), `components/blog/`, `components/docs/`, `components/tools/`.
- `ASSETS.md`: an earlier creative asset spec. It predates the product recreations and the `public/ads` copies; rewrite it before working from it.
- `.claude/skills/write-post`: drafts one article from the manifest and the truth layer. Output is always a draft for a human edit pass; it never sets status to published.

## Rules

- **Claims come from the truth files.** If a fact is not in `product.md`, `competitors.md` or `proof.md`, it does not go on the site. Competitor entries older than 30 days need re-verification before a comparison page is written. `product.md` must be updated when features ship and never ahead of them.
- **Voice** (`truth/voice.md` is the full list): no em dashes, no emojis, sentence-case headlines, answer-first sections, real tables for comparisons, every post has an FAQ, named statistics carry their source inline, American English, concrete over hype.
- **Never expose internals**: no AI provider names, no exact tag counts, no implementation details in public copy.
- **Design, site-wide**: a calm paper page (`pb-bg`), hairlines instead of shadows, no backdrop blur, no animation at rest. Tokens in `app/globals.css` carry the app's values (peach 500 is `#E8724A`, navy is `pb-ink`). Fraunces is the display face (weight axis only, no `opsz` or `SOFT`), upright, in navy; Inter for body; JetBrains Mono for figures.
- **Design, homepage** (`components/home/parts.tsx` and `theme.ts` are the reference):
  - One frame: a 1312px column with 16px gutters on a phone, 32px from `sm`, 64px from `lg`, and two vertical hairlines that run the length of the page. Every section is ruled to it.
  - The page's colours and its three line strengths are all in `theme.ts`: two papers, white, navy, two text greys, and peach with its text cuts. Peach is a fill or a line, never a ground. Navy is a ground only for the product bands and the essay panel.
  - 4px corners on everything. The logo tile and the glow behind the hero card are the only gradients. Under the pointer only colours change.
  - Headings in Fraunces semibold, with at most one phrase of a headline in the accent. The one label style is mono caps at 11px. Numbered sections open with the same strip (index and title between two rules).
  - Three actions: the one peach button (dark label, never light type on peach), the outlined button, and the text link with its arrow.
  - Text a first read can skip sits in native `details` rows (the "More" rows and the six questions), so it is in the HTML and opens without script.
- **Design, inner pages** (pricing, blog, docs, MCP, integrations, tools): the same tokens and faces in the earlier register: narrower columns of their own, section labels in 13px sentence-case peach, 8px to 10px corners, and buttons from `components/site/Button.tsx` (flat peach primary with the navy label, never light type on peach; outline; text link). Bringing a page over to the homepage's system is a deliberate piece of work, not a side effect.
- **One nav.** `components/site/SiteNav.tsx` is the nav on every page, the homepage included: same height, frame, buttons and position everywhere, so nothing moves between pages. Its colours are site tokens (`pb-bg`, `pb-ink`, `pb-rule`, `pb-line`, `pb-paper-2`, `pb-peach-500`), never a page's own variables. Do not give a page its own nav. Its links, labels and hrefs are the site's main internal navigation: restyle freely, do not reword or re-point them. A page passes `current` to mark itself. On the homepage the section links and the logo point at the page the reader is on, so the nav scrolls there itself (`jumpOnHome`); keep that when the links change.
- **Product pictures** are recreations, not screenshots: server components with no handlers, no heading elements and no links, rendered inside `Shot`. They use sample data only; never a customer, client or supplier name. Keep them faithful to the app and keep their numbers consistent with `sample.ts`. A recreation shows what the app shows, never how the app decides it: no score weights, thresholds or status rules that the public docs do not state, in code or in comments, and no path, file or function name from the app's repository. State the outcome for the sample account as data instead of the rule that produced it; a picture that cannot be faithful without such a rule stays out of this repository until the rule is published. Images inside them load lazily; only the hero card's ad is loaded eagerly (`priority` on `AdThumb`).
- **Homepage SEO is frozen by default.** The one `h1` (visually hidden, first in the hero), every section heading, every sentence in `content.ts`, the Agent Peach section's own lines in `Agent.tsx`, every internal link and the section ids (`product`, `platforms`, `pricing`, `faq`, `demo`) carry the page's search value. Restyle and reorder freely; do not reword, drop or re-level them without a deliberate content decision. `app/page.tsx` must not export `metadata` or a robots setting.
- **No design studies in the repo.** The stylesheet is built from every source file, so an unused set of components makes every page's CSS heavier, and a route that is hidden in production still ships if it is committed. Explore outside the repo and bring in only what a page imports.
- **CTAs** always route through `lib/site.ts`. When `NEXT_PUBLIC_SELF_SERVE_LIVE` is not `1`, every trial CTA goes to `/demo`.
- **Bylines**: opinion and strategy posts by Nick; reference and guide posts by Peachblue.
- **Public repo.** No secrets, no `.env*` (gitignored), no internal notes, no customer names beyond what is already published.

## Environment

`NEXT_PUBLIC_APP_URL` (defaults to the production app), `NEXT_PUBLIC_SELF_SERVE_LIVE` (`1` in production), `RESEND_API_KEY`, `RESEND_FROM`, `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` (cookieless web analytics, initialized in `instrumentation-client.ts`; no-ops when the token is unset). Values live in Vercel and a local `.env.local`; only names are recorded here.

## Local development

`npm run dev`. The `.claude/launch.json` entry `peachblue-website` runs it on port 4100. Running `npm run build` while the dev server is up clobbers its `.next` cache; clear it and restart if pages start returning 500.

## Relationship to the app

The app (`app.peachblue.io`) is a separate repository and Vercel project. The site links into it for signup and trial, and the contact form forwards each lead to it. Product claims on the site should describe what the app actually ships today; the truth file lags the August and September 2026 feature waves and needs a refresh before the site claims them.

Legal entity, as shown on the privacy and terms pages: Peachblue Technologies Inc., Ontario, Canada.
