import { STRATEGIC_TAGS, VISUAL_TAGS, labelForValue } from "@/components/product/library/data";

/* What Peachblue read from the sample account's winning ad, as the
   homepage prints it (the hero picture and the second step of How it
   works). The values are the product's own tags for that ad
   (components/product/library/data.ts); nothing is typed here. */
const TAGS = new Map<string, string | boolean>([...STRATEGIC_TAGS, ...VISUAL_TAGS]);

/* The product prints a tag value in Title Case; the page sets it in
   sentence case, like every other line on it. */
const sentence = (value: string) => {
  const s = labelForValue(value).toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
};

/** The product's value for one of the winning ad's tags, in sentence case. */
export const tagValue = (key: string) => sentence(String(TAGS.get(key) ?? ""));
