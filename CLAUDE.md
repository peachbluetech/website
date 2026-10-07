# peachblue.io: CLAUDE.md

The Peachblue marketing site. Next.js app router, MDX content, deployed by Vercel from `main`. This repository is public on GitHub: never commit secrets, customer data, internal mechanisms, or notes about accounts and machines. Keep this file to structure and rules.

Read `AGENTS.md` first: this Next.js version has breaking changes from what you may expect, and the guides in `node_modules/next/dist/docs/` are the reference.

## What the site does

- `/` long-scroll conversion homepage built around recreations of the real product: the hero, then the framed sections (how it works, Agent Peach, for creative teams, why Peachblue exists, for performance teams with the weekly report and the platforms, the manifesto, also in Peachblue, pricing, questions, get started). Also `/pricing`, `/demo` (Cal.com booking embed with the lead form as a fallback; `?intent=agency` variant), `/privacy`, `/terms`, `/mcp`, `/og-square`.
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
- `app/layout.tsx`: the root layout. It carries the site's metadata and JSON-LD, loads Inter, Fraunces and JetBrains Mono, and imports the three global stylesheets in this order: `app/globals.css` (Tailwind, the product tokens and utilities, the scaling boxes), then `components/site/system.css` (the design system), then `components/site/kit.css` (the inner-page kit). Fraunces sets the logo's wordmark and the serif lines inside product pictures; JetBrains Mono sets figures inside product pictures and code in running text. Neither sets a heading or a label on a page.
- `app/page.tsx`: the homepage, a server component that renders `HomePage` from `components/home/Page.tsx` and nothing else. It exports no metadata: the title, description, canonical, robots setting and JSON-LD come from `app/layout.tsx`. Every word is in the HTML the server sends and nothing waits on JavaScript to become visible.
- `components/site/`: the design system every page is built from, and the site's chrome. `system.css` (tokens and shared rules), `parts.tsx` (the parts), `kit.css` and `kit.tsx` (the inner-page kit: the page header, the article, running text, tables, lists, the form, the closing bands, the picture panel), `font.ts` (the display face and the one italic), `SitePage.tsx` (the page wrapper), `SiteNav.tsx` with `SiteNavScript.tsx`, `SiteFooter.tsx`. Also `DemoForm.tsx` (the lead form, built from the kit's form parts) and `PeachblueMark.tsx`. See "The design system", "How to build an inner page" and "The pages" below.
- `app/kit/`: the parts sheet, at `/kit` in development. Every part of the inner-page kit once, set with the site's own copy, as a checking page and as working examples. It returns 404 in production, is not indexed, and nothing links to it.
- `components/home/`: the homepage. `Page.tsx` orders the sections and draws the rule between every two (its comment is the map of the page); one file per section, each with its own stylesheet beside it (`Hero`, `HowItWorks`, `Agent`, `Creative`, `Essay`, `Performance` with `Weekly` and `Platforms`, `Manifesto`, `Toolkit`, `Pricing`, `Faq`, `Close`; `Faq` and `Close` are the kit's `FaqBand` and `CtaBand` given the homepage's copy, so the questions and the closing band are one part on every page); `hero/` (the hero picture: `ShowcaseA.tsx` arranges it, `bits.tsx` holds its pieces, `data.ts` reads its words and figures from the sample account); `content.ts` (the homepage copy as typed data; edit copy there, never inline); `Marks.tsx` (one-colour platform marks and the Claude mark); `tags.ts` (the winning ad's tag values in sentence case).
- `components/product/`: static recreations of the real app, used as the site's pictures. `sample.ts` is the one fictional sample account (Fizzli) every picture draws from; `ui/` holds the app's primitives ported as server components; `frame/` holds `Shot` (the wrapper that applies the product scope `.pb-app`, hides the picture from assistive tech and search snippets, and carries its text alternative), `AppWindow` and `Tile`; one directory per product area. Not every fragment is on a page today; the directory is kept as a library (it holds no recreation of the app's Performance page: see the rule on product pictures). `scripts/lint-tells.mjs` is the style gate for this directory (`node scripts/lint-tells.mjs`).
- `public/ads/`: the sample account's ad creatives. `sm/`, `md/`, `wide/` and `hero/` (a lighter whole copy for a page's one large first-screen image) hold resized WebP copies made by `scripts/make-ad-variants.py`, which cuts the thumbnail and the wide band where `components/product/ui/adFocus.json` says each creative's crop sits; `components/product/ui/adImage.ts` derives a copy's path from the original's. Re-run the script (`python3 scripts/make-ad-variants.py`, needs Pillow) after adding or replacing a creative or changing a focus. A run with nothing changed rewrites every copy byte for byte and leaves `git status` clean; if it does not, the script and the committed copies have drifted (or the image library's version has changed), so look before committing.
- `lib/site.ts`: the single source for `SITE_URL`, `APP_URL`, the self-serve gate and every CTA href and label. Edit CTAs here, never per page.
- `lib/blog.ts`, `lib/docs.ts`, `lib/og-card.tsx`.
- `mdx-components.tsx`: the MDX component map. Every element passes through with no class, because the page sets an article's or a doc's body with `Prose`; a table gets a wrapper so it scrolls sideways on a phone.
- `components/blog/`, `components/docs/`, `components/tools/`: the parts of those pages, each with its stylesheet beside it. A page's own rules are in a stylesheet beside the page (`app/pricing/pricing.css`, `app/blog/blog.css`, `app/blog/[slug]/post.css`, `app/docs/docs.css`, `app/integrations/[slug]/integration.css`, `app/mcp/mcp.css`, `app/demo/demo.css`). See "The pages".
- `.claude/skills/write-post`: drafts one article from the manifest and the truth layer. Output is always a draft for a human edit pass; it never sets status to published.

## The design system

One system for every page. One eggshell page (`#fdfcfc`) framed by hairline rails at the container edges and full-bleed rules with a small dot at each crossing; headings in a light grotesque at a few fixed sizes, plain black, left-aligned; Inter at 400 and 500 for everything else; every control a pill; one flat warm grey (taupe) for cards, with 24px corners and no shadow; white raised surfaces with a whisper shadow for product windows and inner cards; dotted separators inside lists; generous space. The product is shown as a sneak peek: a white window cut by a taupe card, or one fragment whole in a white inner card.

Every page is built in it: the homepage from the parts, every other page from the parts and the inner-page kit (see "How to build an inner page"), and all of them inside `SitePage`, which brings the one nav and the one footer. "The pages" lists what each page is made of. Nothing on the site is in another look: no serif headings, no peach or navy text, no cream ground, no bordered cards.

### Where it lives

| File | What it is |
|---|---|
| `components/site/system.css` | The tokens (`--el-*`) and every shared rule (`.el-*`): type, frame, blocks, pills, surfaces, lists, nav, footer, reduced motion. Plain CSS, unlayered. Loaded once for every page by `app/layout.tsx`. |
| `components/site/parts.tsx` | The parts. Everything a section needs is exported from here. |
| `components/site/kit.css` | The inner-page kit's rules (`.el-*`): the page header, the article and its side column, clauses, running text, tables, entry rows, the form, the closing bands, the picture panel. Plain CSS on the tokens of `system.css`, unlayered. Loaded once for every page by `app/layout.tsx`, after `system.css`. |
| `components/site/kit.tsx` | The inner-page kit's parts, made of the parts above. The homepage's questions and closing band are two of them. |
| `components/site/font.ts` | The only file that names a face: the display face, its weight, and the one italic. |
| `components/site/SitePage.tsx` | The page wrapper: the token scope, the two font variables, the nav, `main`, the footer. |
| `components/site/SiteNav.tsx`, `SiteNavScript.tsx`, `SiteFooter.tsx` | The chrome. Their rules are in `system.css`. |
| `<Section>.tsx` and `<Section>.css` beside it | One section of a page and its own rules. Classes are `.el-<section>-...`. |
| `app/<route>/<page>.css` | An inner page's own rules, imported by its `page.tsx`. Classes are `.el-<page>-...`. Only what the parts do not already do. |

### How a page gets it

```tsx
import { Block, Frame, Rule, Shell, SplitHead } from "@/components/site/parts";
import { SitePage } from "@/components/site/SitePage";

export default function Page() {
  return (
    <SitePage current="pricing">
      <Shell as="section">{/* the page's header, outside the frame */}</Shell>
      <Frame>
        <Rule />
        <section>
          <Block top="top" bottom="pad">
            <SplitHead eyebrow="..." title="..." />
          </Block>
        </section>
        <Rule />
      </Frame>
    </SitePage>
  );
}
```

- **The scope.** The tokens live on one class, `.el-page`, the wrapper `SitePage` renders: the tokens, the canvas, the ink, Inter, plus the display face and the italic through the two font variables. Every part, the nav and the footer expect to stand inside it. There is no second scope: a page that wants the parts uses `SitePage`.
- **The nav and the footer.** `SitePage` renders both; pass it `current` (`"pricing"`, `"blog"`, `"docs"` or `"demo"`) to mark the page's link. No page renders `SiteNav` or `SiteFooter` itself.
- **Stylesheets.** `system.css` and `kit.css` are global. A section's or a page's stylesheet is imported by its component and by nothing else. They are ordered as they are imported, so do not let a formatter sort imports, and never rely on file order to win: to adjust a part inside a section, put the section's class in front of it (`.el-agent .el-card--pad { ... }`).

### The frame

- `Shell`: the container. 1304px with the gutter inside it, so content is 1176 wide at 1440, 944 at 1024, 688 at 768, 350 at 390. A page's header and the footer are in the shell and outside the frame.
- `Frame`: the shell with a rail down each edge. A page renders it once, round every section under its header.
- `Rule`: a full-bleed 1px line with a dot at each rail. `marks="ends"` (default), `"halves"` (also over a centre rail), `"thirds"` (also over the two inner rails of three cells), `"quarters"` and `"fifths"` (four and five cells). The page draws the rule above and the rule under every section, so rules are never doubled; a section draws only the rules inside it.
- `Block`: one horizontal slice of a section. `inset` is `"text"` (48px from the rails, 16 on a phone), `"card"` (16, 8 on a phone) or `"none"`. `top` and `bottom` take a named distance, the only vertical distances between slices:

| Name | 768 and up | Under 768 | Used for |
|---|---|---|---|
| `top` | 160 | 120 | rule to eyebrow or heading |
| `pad` | 120 | 80 | under a text-only section; a header's top |
| `band` | 72 | 48 | slim ruled bands |
| `row` | 48 | 32 | ruled cells, split rows |
| `gap` | 40 | 24 | header block to media; a row under cards or cells |
| `s` | 24 | 24 | a "More" row under cards |
| `shelf` | 16 | 16 | media or a disclosure row to the next rule |

- Layout parts: `SplitHead` (the section header: reader label, eyebrow, heading and an optional pill on the left, an optional lead or list on the right; it stacks under 1024), `Side` (a 354 and 724 pair of columns, as the FAQ has; `flip` puts the wide one first), `Cells` and `Cell` (two to five equal columns divided by inner rails, from 1024), `Cards` (a row of two to four cards 16px apart; `split` for two thirds and one third), `Columns` (plain text columns on a 48px gap).
- Breakpoints: 768 (phone type sizes and paddings end) and 1024 (the desktop structure starts). Between them everything is stacked with desktop type.

### Type

Every block of text takes a role from `T`, composed with `cx`: `cx(T.bodySm, TONE.smoke, "el-pretty")`.

| `T.` | Face | Size / line (phone) | For |
|---|---|---|---|
| `display` | display | 48/52 (36/42) | a page's main headline only |
| `heading` | display | 36/42 (30/36) | section headings |
| `headingSm` | display | 32/36 (26/32) | a closing heading |
| `titleLg` | Inter | 24/32 (22/28) | card and row titles, plan names |
| `title` | Inter | 20/27 (18/26) | prices |
| `subhead` | Inter | 18/26 (16/24) | step titles |
| `bodyLg` | Inter | 17/25 (16/24) | questions and answers |
| `body` | Inter | 16/24 | leads, long text |
| `bodySm` | Inter | 15/22 | captions, list rows |
| `ui` | Inter | 14/21 | footer links |
| `caption` | Inter | 13/18 | small print, picture captions |
| `micro` | Inter | 12/16 at 500 | keys inside inner cards, tags |
| `eyebrow` | Inter | 15/22 at 500, smoke | eyebrows, step numbers |

- Tone: `TONE.ink` (default), `TONE.smoke` (secondary text on the canvas), `TONE.earth` (secondary text on taupe; smoke on taupe fails AA). Weight: `MEDIUM` (500). Helpers: `el-tnum`, `el-pretty`, `el-balance`, `el-italic`.
- The display face sets headings at 48, 36 and 32 only (36, 30 and 26 on a phone). Nothing larger. No weight above 500 except the logo's own wordmark. No caps, no mono labels, no serif headings. Italic exists for one kind of line, the risk line under a pair of pills.
- The trim. Every `T` role cuts its text box to the cap top of the first line and the baseline of the last (`.el-t`), and every distance in the system is measured between those edges. Put a `T` class on every block of chrome text. Never on a flex or grid container, never on a clipped one-line string, a pill, a tag or a chip label (use the bare role class there, `"el-body-sm"`), and never on anything inside a product picture.

### Controls, lists, surfaces

- `Pill`: every control. `variant="filled"` (navy, white label) is the one action, at most one per section, and drops its arrow. `variant="outline"` (white with the whisper shadow as its only edge) is the secondary, and is always a link: never that shape for something that does nothing. `size="sm"` is 36px (nav, inside cards); `block` fills its column.
- `PillButton`: the same pill as a `button`, for the few controls that are not links (a form's submit). Never for navigation.
- `TextLink` (ink, smoke under the pointer; `underline` for a link that stands alone in a line of text), `TextButton` (the same as a button, always underlined) and `RowLink` with `ArrowNE` (a row that is one link). `Chevron`, `ArrowNE`, `Check` (the tick of a comparison and of a list of what a plan holds) and the nav's menu strokes are the only drawn glyphs: no icon set.
- `Dotted`: rows on dotted separators. `Disclosure`: a native `details` row, so its content is in the server's HTML and it opens without script. `More`: a disclosure labelled "More" holding dotted rows.
- `Card` (taupe, 24px corners, a 0.5px ring, no shadow; variants `pad`, `wide`, `tile`, `bare`; `tone="navy"` for the one highlighted tile of a set, with everything on it in white), `Window` (white, 16px top corners, always cut by its card's foot), `Inner` (white, 20px corners, the whisper shadow; holds one fragment whole), `Tile` (one ad, with a 1px inner ring), `Tag` (the small outlined tag, not a control).
- Scaling boxes for product pictures: `Fluid` (lays a fragment out at a design width and paints it at the width of its slot, so whatever cuts it cuts it on the same line at every width), `Peek` and `Pic` (a `Fluid` with a `Shot` in it), `Fit` (for lists whose rows hold their height). A frame is never inside a scaled box: only the fragment is scaled. `Keep` holds "7-day" on one line; with `words` it holds every hyphenated word ("per-client"), for a list in a narrow column.

### Rules of the system

1. **Server components.** No handlers and no animation library in a page's sections. Motion is CSS, correct at rest, and off under reduced motion. The client code on the site is short and named: the nav's script (`SiteNavScript`), the pricing page's billing choice, the demo page (the booking embed and the lead form) and the creative-waste diagnostic. Everything else, and every word of those pages that does not change, is in the HTML the server sends.
2. **Plain CSS for the system, no Tailwind utilities in it.** The exceptions are classes the site already has for other reasons: `sr-only`, `pb-logo`, the scaling boxes' own classes, and utility strings inside a picture that is put together from the product's own parts.
3. **Tokens, not literals.** Every colour, radius, shadow and duration is a variable in `system.css`. No hex or rgba in a component or a section stylesheet.
4. **`system.css` is unlayered, so it outranks every Tailwind utility.** Never write an element selector that can reach into a product picture: class selectors on the system's own elements only.
5. **Colour.**
   - Menu, headings and body text are black (`--el-ink`). Secondary text is smoke on the canvas and earth on taupe.
   - Navy (`--el-navy`, the product's navy, `#13214B`) is used only as a fill that is not text: the filled pill (the one action), a highlighted plan tile (white type on it), the share of a data bar, and the essay loop's line. Never navy text.
   - Peach appears only in the logo, in product pictures and in the essay loop. Do not add navy or peach anywhere else.
   - White with the whisper shadow means a raised control or a product surface, never a section background. Taupe is for cards, panels and tiles, never a section band. `--el-focus` is keyboard focus and selection, nothing else.
6. **Lines.** Rails, rules and inner rails are the frame (solid, `--el-rail`). Dotted separators live inside lists. The two are never swapped. The one other line in the chrome is the hairline under a table's rows (`--el-ring`) and under a link in running text (`--el-underline`).
7. **Tone.** No recoloured phrase in any heading. Tone changes only between a title and the line under it, on separate lines.
8. **Pictures.** Existing fragments from `components/product/**`, wrapped in `Shot` with `ground={false}` and a one-sentence label that says "sample account". Never rebuild a fragment by hand and never fake a chart or a diagram in CSS; ad crops go through `AdThumb`. Windows and inner cards turn the app's stone ground white.
9. **No** drop shadows or hover lifts on cards, bordered-card grids, scroll reveals, dark sections, serif headings, mono caps labels, or icon sets. A mono face sets code in running text and nothing else.
10. **Motion** is feedback and continuity only: a pill's ground under the pointer and its press, a plate behind a nav link, a chevron that turns, the phone menu's fade, the nav's line over the first 64px of scroll, the fade at the edge of a table that scrolls sideways (it follows the reader's own scroll), and the one data bar that grows once. One block in `system.css` turns all of it off under `prefers-reduced-motion`.

### How to build an inner page

Every page under the homepage is the same three things: the shell, a header, and sections inside the frame. The parts are in `components/site/parts.tsx` (the base) and `components/site/kit.tsx` (the inner-page kit). The parts sheet at `/kit` (development only) shows every one of them once.

```tsx
import { Article, FaqBand, PageHeader, Prose, SideNav, TrialBand } from "@/components/site/kit";
import { Block, Frame, Pill, Rule } from "@/components/site/parts";
import { SitePage } from "@/components/site/SitePage";

export default function Page() {
  return (
    <SitePage current="blog">
      <PageHeader eyebrow="..." title="..." lead="..." actions={<Pill href="...">...</Pill>} />
      <Frame>
        <Rule />
        <section>
          <Block top="band" bottom="pad">
            <Article sideAt="end" side={<SideNav label="Table of contents" groups={[...]} />}>
              <Prose>{/* the MDX body */}</Prose>
            </Article>
          </Block>
        </section>
        <Rule />
        <FaqBand faq={faq} />
        <Rule />
        <TrialBand />
        <Rule />
      </Frame>
    </SitePage>
  );
}
```

**The shell.** `SitePage` is the wrapper of every page: the token scope, the display face, the nav (pass `current` to mark the page's link), `main` and the footer. JSON-LD scripts and anything else the page renders go inside it. `Frame` draws the rails; the page draws a `Rule` above its first section, between every two, and under the last, and a section draws only the rules inside it.

**The header.** `PageHeader` is the first thing on the page, in the shell and outside the frame, as the homepage's hero is.

- Every inner page's `h1` is `T.display` (48/52; 36/42 on a phone). Hierarchy on a long page comes from the step down to the 32px headings of running text, not from a smaller title.
- A short title (up to about 40 characters) takes `layout="split"`, the default: the title on the left half, the lead on the right half, pills and the risk line under the title. The lead follows the one rule of every split header on the site, the homepage's hero and the section headers included: shorter than the title, it ends on the title's last baseline; taller, it starts level with the title's cap top. A lead that is taller than the title in a header that has a line or pills under the title takes `leadAt="top"` (the policy pages, `/mcp`), so it runs down the right half without pushing them away from the title.
- A long title and a post's title take `layout="stack"`: one column, the title on a measure of 880px, the lead under it in smoke (`T.subhead`), the byline row under that.
- Slots, top to bottom, which is also the order of the HTML: `crumb` or `eyebrow`, `title`, `sub` (one quiet line: a date), `lead` (a string, several strings, or elements carrying `LEAD` or `LEAD_STACK`), `meta` (a `Meta` row), `actions` (pills, the filled one first), `note` (the risk line, in the one italic), then children.
- `inline` drops the shell and the padding for a header that stands inside the body column of an `Article`. A doc uses it, so its side nav does not move from page to page.
- It stands 120px under the nav and 72px over the first rule. `top` and `bottom` take another named distance where a page needs it.

**The kit** (all from `@/components/site/kit`):

| Part | What it is |
|---|---|
| `PageHeader`, `Crumb`, `Meta`, `MetaName`, `Avatar`, `Dot` | The page header and the lines round its title. |
| `Article`, `Sticky`, `SideNav` | A long page: the body in the wide column of the side layout, and a side column (`sideAt="start"` for a doc's nav, `"end"` for a post's table of contents) that rests under the nav while the body scrolls. Under 1024 the side column goes (`narrow="stack"` keeps it). |
| `Clauses`, `Clause` | A document in titled rows (a policy, a method): each heading in the narrow column, resting under the nav while its text scrolls, with dotted separators between rows. |
| `Prose`, `Embed`, `Callout` | Running text: one class (`.el-prose`) that sets MDX and hand-written text alike. `Embed` wraps a component standing in it. `Callout` is a quiet taupe card; a `>` quotation in MDX draws the same way. |
| `DataTable`, `CompareTable`, `CompareCell` | A simple table (a head and rows on hairlines, `numeric` columns set to the right) and the plan comparison (groups, ticks, dashes, figures; the names' column held in place on a phone). A table wider than its column scrolls sideways in its own box, and its last 48px fade out while there is more to the right. |
| `EntryRow` | A row of an index that is one link, in a `Dotted`: an optional `lead` column, the entry, the arrow. |
| `Steps`, `CheckList`, `Stack` | An ordered list on dotted separators; ticked lines; blocks of trimmed text a fixed distance apart (8 to 40) inside a card or a cell. |
| `Badge` | A small filled label. The outlined `Tag` is its sibling. Neither is a control. |
| `Form`, `FormRow`, `Field`, `Input`, `Select`, `Textarea`, `Checkbox`, `Range`, `Segmented`, `SegmentedButton` | The form: white raised controls with the whisper shadow as their only edge, pills for an input and a select, the system's ring on focus, an error as a ring and a sentence. The controls are the elements themselves, so a client component passes its own values and handlers. |
| `FaqBand`, `FaqRows`, `CtaBand`, `TrialBand`, `LinkBand` | The bands that close a page, the homepage included: the questions (`anchor` gives the section an id, `id={null}` leaves the heading without one), the closing call to action, the trial band with its published lines, and a short list of links ("Keep reading"). |
| `PeekPanel`, `PeekBox` | The picture under a page's header, as the homepage's hero has one: a wide taupe panel with one white window of the product cut by its foot, and a quiet caption under it. The panel is a size container; the page's stylesheet says how much of the fragment the window shows at each of the panel's widths (`--el-peek-w`, `--el-peek-h`). It goes in the children of a `PageHeader`. |

Cards (`Card`, `Cards`), tiles (`Card variant="tile"`), ruled cells (`Cells`, `Cell`), dotted rows (`Dotted`), disclosure rows (`Disclosure`), pills and the frames for product pictures (`Window`, `Inner`, `Shot`) are the base parts described above.

**Running text.**

- Put the text's own elements straight inside `Prose`: `h2`, `h3`, `h4`, `p`, `ul`, `ol`, `a`, `strong`, `em`, `code`, `pre`, `blockquote`, `hr`, `img`, `figure`, `table`. An element with no class is styled; an element that carries a class keeps its own look, and so does everything inside a product picture or an `Embed`.
- The measure is 680px. Body is Inter 17/28 in ink (16/26 on a phone). `h2` is the display face at 32/36 (26/32), `h3` is Inter 20/27 at 500, `h4` is 17/28 at 500. Links are ink on a hairline underline. Code and callouts stand on taupe. Pictures have 20px corners. Tables stand on hairlines with tabular figures.
- `mdx-components.tsx` and the `.el-prose` rules belong to the system, not to a page. A page that needs something else in its text adds a part, not a rule.

**Type on an inner page.** The roles are the table under "Type". Where each goes: `T.display` for the `h1`; `T.heading` for a band's `h2`; `T.headingSm` for the closing band's line; `T.titleLg` for the title of a row, a card, a clause or a plan; `T.subhead` for a card's title and a stacked lead; `T.body` for a lead and a band's text; `T.bodySm` for the line under a title (smoke on the canvas, earth on taupe); `T.caption` for small print; `T.eyebrow` for the line above a title.

**Spacing.** The named distances of `Block` are the only vertical distances between slices: `top` 160, `pad` 120, `band` 72, `row` 48, `gap` 40, `s` 24, `shelf` 16 (the table under "The frame" has the phone values). On an inner page: a band of text takes `top="band" bottom="band"`; an article or a document takes `top="band" bottom="pad"`; a full section with its own header takes `top="top" bottom="pad"`; cards and cells take `inset="card"`. Inside a card or a cell, `Stack` sets the distance between blocks of text. Do not write a margin where a named distance or a `Stack` exists.

**Colour.** Rule 5 above, with nothing added for inner pages: text is black, secondary text is smoke on the canvas and earth on taupe, navy is a fill and never text, peach stays in the logo and in product pictures. A ticked box and a range are ink. An error is `--el-error`, on a form field only.

**Adding or changing a page.**

1. The wrapper is `SitePage`. Nothing else renders a nav, a `main` or a footer.
2. The header is a `PageHeader`; the sections are bands inside one `Frame`, a `Rule` between every two.
3. Build each section from the parts. Put what is left over in a stylesheet beside the page, in classes `.el-<page>-...`, on tokens. If a second page needs the same thing, it moves into the kit and both local copies go.
4. A page closes with the kit's bands, each only where the page has it: `FaqBand`, `LinkBand`, and `TrialBand` or a `CtaBand`. An existing page keeps the order it was published in (a post ends on "Keep reading", a platform page on the trial band).
5. On an existing page, leave every word, heading level, link, anchor text, id, title, description, canonical and JSON-LD as it is. A part never writes copy for you: pass the page's own strings.

**Never.**

- Tailwind utilities in a page file where a part exists. A page file reads as parts, not as class strings.
- Navy or peach text, or navy or peach anywhere the colour rule does not name.
- A grid of bordered cards. Cards are flat taupe; a set of equal things is ruled cells or rows on dotted separators.
- Serif headings, a display size other than 48, 36 and 32, a weight above 500, caps, mono labels.
- A drop shadow, a hover lift, a dark band, a section on a taupe or white ground.
- A second nav, footer, button style or prose style. Fix the part instead.
- A chart or a product screen drawn by hand. Pictures come from `components/product/**`, in a `Shot`.

### The pages

Every page, what it is made of, and where its own rules are. All of them are server components inside `SitePage`; the client code is named where there is any.

| Page | Files | What it is |
|---|---|---|
| `/` | `components/home/` | The hero (split header, the hero picture in its taupe panel), then the framed sections; it closes with `FaqBand` and `CtaBand`. |
| `/pricing` | `app/pricing/page.tsx`, `pricing-client.tsx`, `pricing.css`, `plans.ts` | Split header with the billing choice (`Segmented`) under the title; six plans as two rows of three ruled cells, each a taupe tile (the popular one navy), a pill and rows on dotted separators; the comparison (`CompareTable`, its head resting under the nav from 1024); `FaqBand`. The billing choice is the only client code. |
| `/blog` | `app/blog/page.tsx`, `blog.css` | Split header; the newest post as an `EntryRow` on a taupe card, the rest as `EntryRow`s on dotted separators. |
| `/blog/<slug>` | `app/blog/[slug]/page.tsx`, `post.css`, `components/blog/` | Stacked header (crumb, title, description, byline row); `Article` with the MDX in `Prose` and the table of contents in the side column; `FaqBand`, `TrialBand`, `LinkBand`. |
| `/docs` | `app/docs/page.tsx`, `docs.css` | Split header; one band per section, its heading in the narrow column and its pages as `EntryRow`s in the wide one. |
| `/docs/<slug>` | `app/docs/[slug]/page.tsx`, `docs.css`, `components/docs/` | No header outside the frame: the docs navigation in the side column of an `Article` (one line that scrolls sideways under 1024), an inline `PageHeader` and the MDX in `Prose`; `FaqBand`, `TrialBand`. |
| `/integrations/<slug>` | `app/integrations/[slug]/page.tsx`, `picture.tsx`, `integration.css` | Split header with the platform's mark, two pills and the risk line; one product picture (`PeekPanel`); capabilities as ruled cells; "How it works" as `Steps`; `FaqBand`, `LinkBand`, `TrialBand`. |
| `/mcp` | `app/mcp/page.tsx`, `mcp.css` | Split header and one product picture (`PeekPanel`); example questions as dotted rows; three steps as ruled cells; the tool groups as dotted rows; `CtaBand`. |
| `/demo` | `app/demo/page.tsx`, `demo-client.tsx`, `demo.css`, `components/site/DemoForm.tsx` | Split header; the booking service's embed in a white inner card on a taupe card; one band with the lead form (the kit's form parts) behind a text button. A client component. The embed draws itself inside its own frame; its chosen day and its button take the navy token, the one navy fill rule 5 does not name. |
| `/tools/creative-waste` | `app/tools/creative-waste/page.tsx`, `components/tools/` | Split header; the diagnostic on one taupe card (sliders on the taupe, answers in a white inner card, one slim data bar); the method as `Clauses`; `FaqBand`, `TrialBand`. The diagnostic is a client component and is also embedded in one post. |
| `/privacy`, `/terms` | `app/privacy/page.tsx`, `app/terms/page.tsx` | Split header with a back link and the effective date; the document as `Clauses` with `Prose` in each. |
| a missing address | `app/not-found.tsx` | Split header with the way back as two pills, and the rule that closes the frame. Answers with a 404 and is not indexed. |
| `/kit` | `app/kit/` | The parts sheet. Development only. |

## Rules

- **Claims come from the truth files.** If a fact is not in `product.md`, `competitors.md` or `proof.md`, it does not go on the site. Competitor entries older than 30 days need re-verification before a comparison page is written. `product.md` must be updated when features ship and never ahead of them.
- **Voice** (`truth/voice.md` is the full list): no em dashes, no emojis, sentence-case headlines, answer-first sections, real tables for comparisons, every post has an FAQ, named statistics carry their source inline, American English, concrete over hype.
- **Never expose internals**: no AI provider names, no exact tag counts, no implementation details in public copy.
- **Design**: the design system above is the reference for every page, and "How to build an inner page" is how a page is made from it. The `pb` tokens in `app/globals.css` carry the app's values (peach 500 is `#E8724A`, navy is `pb-ink`) for the product recreations, which keep the app's own look inside their pictures. No page reads them outside a picture.
- **One nav, one footer.** `components/site/SiteNav.tsx` and `SiteFooter.tsx` are the chrome of every page, the homepage included: same height, frame, pills and position everywhere, so nothing moves between pages. Do not give a page its own. Their links, labels and hrefs are the site's main internal navigation: restyle freely, do not reword or re-point them. A page passes `current` to mark itself. The nav is a server component with one list of links in the HTML; under 1024 the same list opens as a sheet through the popover attribute. `SiteNavScript` adds the two things markup cannot do: it closes the sheet when one of its links is pressed, and on the homepage it makes the section links and the logo scroll, since they point at the page the reader is already on. Keep both when the links change.
- **Product pictures** are recreations, not screenshots: server components with no handlers, no heading elements and no links, rendered inside `Shot`. They use sample data only; never a customer, client or supplier name. Keep them faithful to the app and keep their numbers consistent with `sample.ts`. A recreation shows what the app shows, never how the app decides it: no score weights, thresholds or status rules that the public docs do not state, in code or in comments, and no path, file or function name from the app's repository. State the outcome for the sample account as data instead of the rule that produced it; a picture that cannot be faithful without such a rule stays out of this repository until the rule is published. Images inside them load lazily; only the hero picture's ad and the four thumbnails of its cut list, which are on the first screen, are loaded eagerly (`priority` on `AdThumb`).
- **SEO is frozen by default, on every page.** On the homepage: the one `h1` (visually hidden, first in the hero), every section heading, every sentence in `content.ts`, the Agent Peach section's own lines in `Agent.tsx`, every internal link and the section ids (`product`, `agent-peach`, `creative-teams`, `performance-teams`, `platforms`, `pricing`, `faq`, `demo`) carry the page's search value. On every other page: its words, its heading levels, its links and their anchor texts, the ids that are link targets, and its title, description, canonical and JSON-LD. Restyle and reorder freely; do not reword, drop or re-level them without a deliberate content decision. `app/page.tsx` must not export `metadata` or a robots setting.
- **No design studies in the repo.** The stylesheet is built from every source file, so an unused set of components makes every page's CSS heavier, and a route that is hidden in production still ships if it is committed. Explore outside the repo and bring in only what a page imports. The parts sheet (`app/kit`) is the one checking page kept beside the system: it shows only parts the pages use, and it goes if it is not kept up to date.
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
