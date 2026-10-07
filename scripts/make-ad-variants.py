#!/usr/bin/env python3
"""Resized WebP variants of the mock ad creatives in public/ads.

For every JPEG or PNG directly under public/ads this writes three files:

  public/ads/sm/<stem>.webp   the square thumbnail, 128 by 128, cut at the
                              creative's "thumb" focus. Covers square slots
                              up to 64px wide on a 2x screen.
  public/ads/md/<stem>.webp   560px wide at the file's own aspect ratio.
                              Covers slots up to 280px wide on a 2x screen.
                              A source narrower than 560px is never enlarged:
                              it is re-encoded at its own size.
  public/ads/wide/<stem>.webp the 16:9 band of the file at its full width
                              (1080 by 608 from a 1080 by 1920 creative),
                              cut at the creative's "wide" focus. For 16:9
                              slots wider than 280px, which show only that
                              band.

Focus. The creatives carry their headline in the top or the bottom third,
so a crop about the centre cuts it in half. Where each crop sits is written
down once, in components/product/ui/adFocus.json: per file stem, a vertical
object-position in percent on the original image for each box shape
("thumb", "tile", "square", "wide"). A missing file or shape means 50, the
centre. This script cuts sm at "thumb" and wide at "wide", the same window
that object-fit: cover with that object-position would show:

  top = focus / 100 * (image height - window height)

The site reads the same table for the md copy ("tile", "square" and "wide"
in CSS), so the two cannot drift. md is the whole image and needs no focus.

The originals stay in place. Re-run from the repo root after adding or
replacing a creative, or after changing a focus:

  python3 scripts/make-ad-variants.py

(or pass the repo's path as the one argument). A run with nothing changed
rewrites every copy byte for byte, so `git status` stays clean; that is the
check that this script and the committed copies still agree. The bytes
depend on the Pillow and libwebp versions: a different version can re-encode
every file without any change to a crop.

Needs Pillow with WebP support. The path convention is the one
components/product/ui/adImage.ts derives, so keep the two in step.
"""
import json
import os
import sys
from PIL import Image

SM_SIDE = 128
MD_WIDTH = 560
WIDE_RATIO = 9 / 16  # height over width
FOCUS_TABLE = os.path.join("components", "product", "ui", "adFocus.json")
SM_QUALITY = 80
MD_QUALITY = 75
WIDE_QUALITY = 75
# A source that is already small is painted enlarged, so it gets a gentler
# quality setting: compression marks would be magnified with it.
NATIVE_QUALITY = 88


def save(im, path, quality):
    im.save(path, "WEBP", quality=quality, method=6)
    return os.path.getsize(path)


def window(im, ratio, focus):
    """The widest box of the given height-over-width ratio that fits the
    image, placed where object-fit: cover with object-position "50% focus%"
    would place it. An image squatter than the box is cut at the sides,
    about the centre."""
    w, h = im.size
    box_h = round(w * ratio)
    if box_h <= h:
        top = round((h - box_h) * focus / 100)
        return im.crop((0, top, w, top + box_h))
    box_w = round(h / ratio)
    left = (w - box_w) // 2
    return im.crop((left, 0, left + box_w, h))


def main(repo):
    ads = os.path.join(repo, "public", "ads")
    with open(os.path.join(repo, FOCUS_TABLE)) as f:
        focus_table = json.load(f)
    os.makedirs(os.path.join(ads, "sm"), exist_ok=True)
    os.makedirs(os.path.join(ads, "md"), exist_ok=True)
    os.makedirs(os.path.join(ads, "wide"), exist_ok=True)
    totals = [0, 0, 0, 0]
    for name in sorted(os.listdir(ads)):
        stem, ext = os.path.splitext(name)
        if ext.lower() not in (".jpg", ".jpeg", ".png"):
            continue
        src = os.path.join(ads, name)
        im = Image.open(src).convert("RGB")
        w, h = im.size

        focus = focus_table.get(stem, {})

        sm = window(im, 1, focus.get("thumb", 50)).resize((SM_SIDE, SM_SIDE), Image.LANCZOS)
        sm_bytes = save(sm, os.path.join(ads, "sm", stem + ".webp"), SM_QUALITY)

        if w > MD_WIDTH:
            md = im.resize((MD_WIDTH, round(h * MD_WIDTH / w)), Image.LANCZOS)
            md_bytes = save(md, os.path.join(ads, "md", stem + ".webp"), MD_QUALITY)
        else:
            md = im
            md_bytes = save(md, os.path.join(ads, "md", stem + ".webp"), NATIVE_QUALITY)

        wide = window(im, WIDE_RATIO, focus.get("wide", 50))
        wide_bytes = save(wide, os.path.join(ads, "wide", stem + ".webp"), WIDE_QUALITY if w > MD_WIDTH else NATIVE_QUALITY)

        orig = os.path.getsize(src)
        totals = [totals[0] + orig, totals[1] + sm_bytes, totals[2] + md_bytes, totals[3] + wide_bytes]
        print(
            f"{name:34} {w}x{h} {orig:7d}  sm {sm.size[0]}x{sm.size[1]} {sm_bytes:5d}"
            f"  md {md.size[0]}x{md.size[1]} {md_bytes:6d}  wide {wide.size[0]}x{wide.size[1]} {wide_bytes:6d}"
        )
    print(f"{'total':34} {'':9} {totals[0]:7d}  sm {'':7} {totals[1]:5d}  md {'':7} {totals[2]:6d}  wide {'':7} {totals[3]:6d}")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else os.getcwd())
