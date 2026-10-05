import { HomePage } from "@/components/home/Page";

/* The homepage. A server component: every word is in the HTML the server
   sends, nothing waits on JavaScript to become visible. The sections, the
   copy (components/home/content.ts) and the page's own system live in
   components/home; product pictures are static recreations of the app from
   components/product.

   This file exports no metadata on purpose. The title, description,
   canonical, robots setting and JSON-LD all come from app/layout.tsx; an
   export here would override them for the site's most important URL. */
export default function Home() {
  return <HomePage tone="light" />;
}
