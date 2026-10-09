import { Frame, Rule } from "@/components/site/parts";
import { SitePage } from "@/components/site/SitePage";
import { AgentPeach } from "./Agent";
import { Close } from "./Close";
import { Creative } from "./Creative";
import { Essay } from "./Essay";
import { Faq } from "./Faq";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { Logos } from "./Logos";
import { Manifesto } from "./Manifesto";
import { Performance } from "./Performance";
import { Pricing } from "./Pricing";
import { Toolkit } from "./Toolkit";

/* The homepage, top to bottom:

     the site nav (components/site/SiteNav.tsx, the same on every page)
     the hero (the page's one h1 is in it, visually hidden)
     the logo strip                                   Logos.tsx
     ── the frame begins: rails, rules, a dot at every crossing ──
     How it works (#product)                          HowItWorks.tsx
     Agent Peach (#agent-peach)                       Agent.tsx
     For creative teams (#creative-teams)             Creative.tsx
     Why Peachblue exists                             Essay.tsx
     For performance teams (#performance-teams)       Performance.tsx,
        which also renders the weekly report (Weekly.tsx) and the
        platforms row (Platforms.tsx, #platforms) inside its section
     the manifesto                                    Manifesto.tsx
     Also in Peachblue                                Toolkit.tsx
     Pricing (#pricing)                               Pricing.tsx
     Questions (#faq)                                 Faq.tsx
     Get started (#demo)                              Close.tsx
     ── the frame ends ──
     the site footer (components/site/SiteFooter.tsx)

   The rules between sections are drawn here and nowhere else, so no rule
   is ever doubled and each carries the marks of the rails that meet it:
   the rule under How it works closes three ruled cells ("thirds"), the
   rule under the performance group closes a split row ("halves"). A
   section draws only the rules inside it.

   SitePage is the wrapper: the system's tokens, its two font variables,
   the nav, main and the footer. Copy comes from content.ts; the parts
   are components/site/parts.tsx; each section's own rules are in the
   stylesheet beside it. A server component: every word is in the HTML
   the server sends.

   Keep the order of the section imports above: each brings its own
   stylesheet, and the stylesheets are ordered as they are imported. */
export function HomePage() {
  return (
    <SitePage>
      <Hero />
      <Logos />
      <Frame>
        <Rule />
        <HowItWorks />
        <Rule marks="thirds" />
        <AgentPeach />
        <Rule />
        <Creative />
        <Rule />
        <Essay />
        <Rule />
        <Performance />
        <Rule marks="halves" />
        <Manifesto />
        <Rule />
        <Toolkit />
        <Rule />
        <Pricing />
        <Rule />
        <Faq />
        <Rule />
        <Close />
        <Rule />
      </Frame>
    </SitePage>
  );
}
