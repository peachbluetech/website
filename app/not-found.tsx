import type { Metadata } from "next";
import { PageHeader } from "@/components/site/kit";
import { Frame, Pill, Rule } from "@/components/site/parts";
import { SitePage } from "@/components/site/SitePage";

export const metadata: Metadata = {
  title: "Page not found",
};

/* The page for an address that is not on the site, and for a route that
   calls notFound(). The same shell as every page: the nav, a split
   header with the way back as the one filled pill, the rule that closes
   the frame, the footer. The framework answers with a 404 and marks the
   page noindex on its own. */
export default function NotFound() {
  return (
    <SitePage>
      <PageHeader
        eyebrow="404"
        title="Page not found."
        leadAt="top"
        lead="This address does not lead anywhere on the site. The page may have moved, or the link may be mistyped."
        actions={
          <>
            <Pill href="/">Back to home</Pill>
            <Pill href="/docs" variant="outline">
              Browse the docs
            </Pill>
          </>
        }
      />
      <Frame>
        <Rule />
      </Frame>
    </SitePage>
  );
}
