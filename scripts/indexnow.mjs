#!/usr/bin/env node
/**
 * Tell Bing (and the other IndexNow engines) that pages changed, so a new
 * or updated post is crawled within minutes instead of days. Copilot
 * answers from Bing's index, so this is part of being cited there.
 *
 * The key is public by design: IndexNow proves the site owns it by
 * fetching https://peachblue.io/<key>.txt, which lives in public/.
 *
 * Run from the repo root once the deploy is live:
 *   node scripts/indexnow.mjs /blog/some-post /pricing
 *   node scripts/indexnow.mjs --all        (every URL in the live sitemap)
 * Paths or full https://peachblue.io URLs both work. Prints the engine's
 * HTTP status: 200 or 202 means accepted, 403 means the key file is not
 * live yet, 422 means a URL is not on peachblue.io.
 */

const HOST = "peachblue.io";
const KEY = "ea2ee720a74db67f17c3d2bf55a048ca";
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function sitemapUrls() {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

function toUrl(arg) {
  if (arg.startsWith("https://")) return arg;
  return `https://${HOST}${arg.startsWith("/") ? "" : "/"}${arg}`;
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error("Pass paths or URLs to submit, or --all for the whole sitemap.");
  process.exit(1);
}

const urlList = args.includes("--all") ? await sitemapUrls() : args.map(toUrl);
const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow ${res.status} for ${urlList.length} URL${urlList.length === 1 ? "" : "s"}`);
if (res.status !== 200 && res.status !== 202) {
  console.log(await res.text());
  process.exit(1);
}
