import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { AgentPeach } from "./Agent";
import { CreativeTeams } from "./Creative";
import { Faq } from "./Faq";
import { Hero } from "./Hero";
import { PerformanceTeams } from "./Performance";
import { PricingTeaser } from "./Pricing";
import { Essay, FinalCta, FooterGround, HowItWorks, Manifesto } from "./Sections";
import { themeStyle, type Tone } from "./theme";
import { Toolkit } from "./Toolkit";

/* The homepage, top to bottom:

     the site nav (components/site/SiteNav.tsx, the same on every page)
     the hero (the page's one h1 is in it, visually hidden; the visible
        headline is an h2)
     01 How it works (#product)
     02 Agent Peach (Agent.tsx, #agent-peach): two ways to chat, with
        Agent Peach in Peachblue or in Claude over MCP, and one question
        answered side by side in both
     03 For creative teams (Creative.tsx, #creative-teams): Next Creative
        Brief
     04 Why Peachblue exists (the essay)
     05 For performance teams (Performance.tsx, #performance-teams):
        Creative Economics, the weekly report (Weekly.tsx), platforms
        (Platforms.tsx, #platforms)
     the manifesto
     06 Also in Peachblue (Toolkit.tsx)
     07 Pricing (Pricing.tsx, #pricing)
     08 Questions (Faq.tsx, #faq)
     09 Get started (#demo)
     the site footer

   Copy comes from content.ts; the shared system (frame, type, rules,
   actions, stages, bands) is parts.tsx; the page's colours are theme.ts.
   `tone` picks the set of CSS variables the wrapper carries; light is the
   tone that ships. The page's own CSS rules (.bp-*) are in
   app/globals.css.
   A server component: every word is in the HTML the server sends. */
export function HomePage({ tone = "light" }: { tone?: Tone }) {
  return (
    <div data-tone={tone} style={themeStyle(tone)} className="min-h-screen overflow-x-clip bg-[var(--mn-paper)] text-pb-fg">
      <SiteNav />
      <main>
        <Hero />
        <HowItWorks />
        <AgentPeach />
        <CreativeTeams />
        <Essay />
        <PerformanceTeams />
        <Manifesto />
        <Toolkit />
        <PricingTeaser />
        <Faq />
        <FinalCta />
      </main>
      <FooterGround>
        <SiteFooter />
      </FooterGround>
    </div>
  );
}
