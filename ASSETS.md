# Peachblue.io — Creative Asset Spec

Two asset classes: (A) mock ad creatives, (B) real app screenshots.
Every slot below lists displayed size on desktop and the deliverable size
(2x for retina). PNG preferred; keep masters, we optimize at integration.

## A. Mock ad creatives (replace Fizzli / Sagelle / Trailform SVGs)

Design masters at standard ad sizes; they get scaled down, never up.

| Format | Master size | Used in | Displayed at |
|---|---|---|---|
| Story / vertical (9:16) | 1080 x 1920 | Hero ranked thumbs, Agent Peach spotlight, Intelligence tiles | 36px / 80px / ~110px wide |
| Square feed (1:1) | 1080 x 1080 | Intelligence tiles | ~110px wide |

**Count needed (minimum set):**
- 6 story (9:16) creatives
- 3 square (1:1) creatives
- Across 3 distinct fictional brands (3 creatives per brand), each with its
  own palette so the grids read as a varied ad account

**Design rules for these:**
1. Must survive 36px wide: one focal element, big type (headline legible when
   the image is thumbnail-size), no fine detail.
2. One ad should visibly match the Intelligence panel tags: problem-first
   hook, urgency tone, "Shop now" CTA, minimal layout (that ad gets the
   selected ring next to the tag list).
3. Palette anchors to match existing hue order in the hero ranked list:
   creative 1 warm/coral, creative 2 cool blue/teal, creative 3 soft lilac.
4. No real brand names/lookalike trademarks, no real people unless licensed,
   no performance-metric claims inside the ad (offers like "20% off" fine).
5. Mix layouts: type-led, product-hero, split. Mix light and dark backgrounds
   (at least one dark ad so grids don't look washed).

## B. Real app screenshots

Capture: Chrome at 1280 x 800 window, macOS retina (gives 2560 x 1600 raw),
LIGHT mode (site is light-only), 100% zoom, cursor hidden. Use a demo org or
approved data only; no personal emails visible (log in as a demo user).
Deliver full-window captures; we crop into the browser-chrome frames on-site.

| # | Slot on site | App page to capture | Crop aspect | What must be visible |
|---|---|---|---|---|
| 1 | Hero frame (right of headline) | /agent with a ranked-list answer to "What's winning across all my accounts?" | ~5:4 portrait-ish | Question bubble + 3 ranked creative cards with thumbnails |
| 2 | Agent Peach feature section | /agent spotlight answer ("Why is this creative winning?") | ~5:4 | Spotlight card: image, metrics row, insight bullet |
| 3 | Creative Intelligence section | /history grid with tag filters visible, or /intelligence tag analysis | ~5:4 | Creative grid + visible tags |
| 4 | "Every platform, one brain" | / (Data Hub) with all 4 platform cards connected | ~16:10 | Meta + TikTok + Google + Amazon cards, sync overview rail |
| 5 | Brand Intel section | /brand-intel with a generated brief | ~5:4 | Editorial brief headline + takeaways rail |
| 6 | Reports & pacing section | /reports Pacing tab with several order rows | ~16:10 | Pacing table: budget, pace %, status chips |
| 7 | MCP section | Claude Desktop window with Peachblue MCP tools answering | ~16:10 | Tool-use happening + a marketing answer |
| 8-10 | How-it-works minis (Connect / Analyze / Act) | Data Hub connect card / a creative detail with tags / an agent brief answer | ~4:3, small | One clear element each; these render ~300px wide |

**Priority order if you do them in batches:** 1, 4, 6 (hero + the two most
differentiating sections), then 2, 3, 5, 7, then the minis.

## Delivery
Drop masters in `~/Documents/peachblue-website/assets-raw/` (gitignored is
fine) named like `ad-fizzli-story-1.png`, `shot-hero-agent.png`. I take it
from there: crop, optimize (target < 250KB each), wire into the frames, and
add proper alt text.
