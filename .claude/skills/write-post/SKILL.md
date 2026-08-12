---
name: write-post
description: Draft a blog post from the manifest and truth layer. Use when asked to write, draft, or generate a blog article for peachblue.io, e.g. "/write-post motion-alternatives". Takes the target slug as the argument.
---

# write-post: manifest-driven article generator

Drafts one article for the Peachblue blog. The output is a DRAFT for Nick to
edit, never a finished post. Do not set the manifest status to "published";
set it to "draft" and say clearly that the post needs an edit pass.

## Inputs (read all of these first, every time)

1. `content/blog/manifest.ts` — find the entry whose `slug` matches the
   argument. If no argument was given, list entries with status "planned"
   ordered by priority and ask which to write. The entry gives you: title,
   h1/h1Accent, description, type, pillar, keywords, competitors, byline,
   faq, rawMaterial.
2. `content/blog/truth/voice.md` — style and claim rules. These are hard
   constraints; re-read them before writing, especially: no em-dashes, no
   emojis, answer-first sections, the Amazon DSP and MCP claim phrasings,
   CTA rules.
3. `content/blog/truth/product.md` — the only source for product claims.
4. `content/blog/truth/competitors.md` — the only source for competitor
   facts. If the article names competitors and their entries are more than
   30 days old, STOP and tell Nick the pricing needs re-verification before
   this article can be drafted.
5. `content/blog/truth/proof.md` — the only source for statistics. Never
   invent a number.
6. Any `rawMaterial` pointers on the manifest entry. If raw material says
   "needs Nick's take," ask for it before drafting rather than inventing a
   founder opinion.

## Templates by article type

Pick the structure from the entry's `type`:

- **alternatives** — opening: what changed / why people are looking (answer
  first). Disclosure line if Peachblue is included. "What did you use X
  for" segmentation. At-a-glance comparison table with price-verification
  date. One section per tool: what it is, honest strengths, gaps, "Choose
  X if". Closing "how to decide" list keyed to use cases.
- **vs** — disclosure first if we compete. Verdict paragraph up top (who
  should pick which, in two sentences). Dimension-by-dimension comparison
  with a table. Honest concessions in both directions. "Who should pick
  [A]" / "Who should pick [B]" sections.
- **guide** — the title question answered in the first two sentences. Then
  mechanics (math, worked examples, real numbers), diagnosis/how-to
  sections with question-phrased H2s, and a practice/workflow section.
  Product mention only where the workflow genuinely meets the product.
- **glossary** — definition in the first sentence. Formula. Worked example.
  Benchmark discussion (cite disagreement per proof.md if benchmarks
  conflict). How to measure it in practice. Related metrics.
- **template** — what the template contains and why each column exists,
  the table structure inline, how to use it, when to graduate to tooling.
- **essay** — Nick's voice, first person. The skill only outlines these
  from rawMaterial and asks Nick for the substance; do not generate founder
  war stories.

## Output rules

- Write to `content/blog/posts/<slug>.mdx`. Body only: no frontmatter, no
  H1 (the layout renders h1 from the manifest), start with the opening
  paragraph. H2s via `##`, tables via GFM pipes.
- Do NOT include an FAQ section in the MDX; FAQs live in the manifest and
  the layout renders them. If the manifest entry's `faq` array is empty,
  draft 3-6 FAQ entries and add them to the manifest entry (q + 2-4
  sentence a, answer-first).
- Internal links: the pillar hub when it exists, at least two published
  sibling posts (check manifest statuses), and /pricing at least once
  (twice for alternatives/vs). Never link planned/unpublished slugs.
- CTAs: never write CTA copy in the body; the layout appends the TrialCta.
  A contextual in-body link to /pricing is fine.
- Length: guides 1,200-1,800 words; alternatives/vs 1,200-1,600; glossary
  600-1,000; template 600-900.
- After writing: update the manifest entry status to "draft", run
  `npm run build` to confirm nothing broke, and summarize for Nick what
  needs his judgment (claims to verify, places needing his voice, any
  screenshots to add).
