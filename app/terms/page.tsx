import Link from "next/link";
import { Clause, Clauses, Crumb, LEAD, PageHeader, Prose } from "@/components/site/kit";
import { Block, Frame, Rule } from "@/components/site/parts";
import { SitePage } from "@/components/site/SitePage";

export const metadata = {
  title: "Terms of Service · Peachblue",
  description: "Terms of Service for Peachblue, the creative intelligence platform.",
};

/* The terms of service, built in the design system from the inner-page kit
   (components/site/kit.tsx): the page header (the way back, the h1, the
   effective date, and the opening paragraph as the lead), then the
   document in the frame as clauses: each numbered heading in the narrow
   column, resting under the nav while its text scrolls, and its text as
   running text in the wide one. A server component; every word is in
   the HTML the server sends. The words, the headings and the links are
   the published ones: restyle freely, do not reword. */
export default function TermsPage() {
  return (
    <SitePage>
      <PageHeader
        crumb={<Crumb items={[{ label: <>&larr; Back to home</>, href: "/" }]} />}
        title="Terms of Service"
        sub="Effective date: March 13, 2026 · Peachblue Technologies Inc."
        leadAt="top"
        lead={
          <p className={LEAD}>
            These Terms of Service (&quot;Terms&quot;) govern your access to and use of the peachblue platform and related services (the &quot;Service&quot;) provided by Peachblue Technologies Inc. (&quot;peachblue,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using the Service, you agree to be bound by these Terms.
          </p>
        }
      />
      <Frame>
        <Rule />
        <Block top="band" bottom="pad">
          <Clauses>
            <Clause title="1. Service Description">
              <Prose>
                <p>peachblue is a creative intelligence and ad performance platform that:</p>
                <ul>
                  <li>Connects to advertising platforms via secure, OAuth-based API integrations</li>
                  <li>Syncs creative assets (images, videos, carousels) and performance data (spend, impressions, clicks, CTR, CPC, CPM, ROAS, CPA, conversions) from your ad accounts</li>
                  <li>Provides AI-powered creative analysis, generating structured intelligence tags and actionable insights about your ad creatives</li>
                  <li>Offers a Creative Library for filtering, sorting, and exploring creatives by performance and intelligence tags</li>
                  <li>Includes an AI assistant (Agent Peach) for natural language queries about creative performance</li>
                  <li>Provides brand intelligence monitoring via publicly available Reddit data, with AI-generated editorial briefs and sentiment analysis</li>
                </ul>
                <p>The Service currently integrates with the following advertising platforms:</p>
                <ul>
                  <li><strong>Meta Ads.</strong> Live.</li>
                  <li><strong>TikTok Ads.</strong> Live.</li>
                  <li><strong>Amazon Ads.</strong> In development.</li>
                  <li><strong>Google Ads.</strong> In development.</li>
                </ul>
              </Prose>
            </Clause>
            <Clause title="2. Account Registration">
              <Prose>
                <p>To use the Service, you must create an account and provide accurate, complete information. You are responsible for:</p>
                <ul>
                  <li>Maintaining the security of your account credentials</li>
                  <li>All activity that occurs under your account</li>
                  <li>Ensuring you have proper authorization to connect any ad accounts to the Service</li>
                  <li>Notifying us promptly if you suspect unauthorized access to your account</li>
                </ul>
              </Prose>
            </Clause>
            <Clause title="3. Advertising Platform Data">
              <Prose>
                <p>By connecting your advertising accounts to peachblue, you represent and warrant that:</p>
                <ul>
                  <li>You have the authority and necessary permissions to grant peachblue access to the advertising data in those accounts</li>
                  <li>Your use of peachblue complies with the terms of service of each connected advertising platform, including Meta Platform Terms, Google Ads API Terms of Service, Amazon Ads API License Agreement, and TikTok for Business Commercial Terms</li>
                  <li>You will not use the Service to violate any advertising platform&apos;s policies or applicable laws</li>
                </ul>
                <p>peachblue accesses your advertising data solely as authorized by you and acts as a data processor on your behalf. We use your data only to provide the Service as described in our <Link href="/privacy">Privacy Policy</Link>.</p>
              </Prose>
            </Clause>
            <Clause title="4. Acceptable Use">
              <Prose>
                <p>You agree not to:</p>
                <ul>
                  <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
                  <li>Scrape, crawl, or use automated means to access the Service beyond the intended interface</li>
                  <li>Share your account credentials with unauthorized third parties</li>
                  <li>Use the Service for any unlawful purpose or in violation of any applicable laws or regulations</li>
                  <li>Attempt to gain unauthorized access to the Service, other accounts, or related systems</li>
                  <li>Interfere with or disrupt the integrity or performance of the Service</li>
                </ul>
              </Prose>
            </Clause>
            <Clause title="5. Intellectual Property">
              <Prose>
                <ul>
                  <li><strong>Our platform.</strong> peachblue and its underlying technology, design, and features are the intellectual property of Peachblue Technologies Inc. All rights are reserved.</li>
                  <li><strong>Your data.</strong> You retain all ownership rights to your advertising data, creative assets, and account information. We claim no ownership over your data.</li>
                  <li><strong>AI-generated insights.</strong> Analysis, tags, and insights generated by the Service from your data are provided to you for your use in managing your advertising performance.</li>
                </ul>
              </Prose>
            </Clause>
            <Clause title="6. Service Availability & Disclaimers">
              <Prose>
                <p>The Service is currently in early access (closed alpha). As such:</p>
                <ul>
                  <li>The Service is provided <strong>&quot;as is&quot;</strong> and <strong>&quot;as available&quot;</strong> without warranties of any kind, whether express or implied</li>
                  <li>We do not guarantee uninterrupted or error-free operation</li>
                  <li>AI-generated analysis and insights are provided for informational purposes and should not be the sole basis for business decisions</li>
                  <li>Features, integrations, and functionality may change as the platform evolves</li>
                  <li>We make no guarantees regarding the accuracy of AI-generated tags, scores, or recommendations</li>
                </ul>
              </Prose>
            </Clause>
            <Clause title="7. Limitation of Liability">
              <Prose>
                <p>To the maximum extent permitted by applicable law, Peachblue Technologies Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities, arising from your use of the Service.</p>
                <p>Our total liability for any claim arising from or related to the Service shall not exceed the total fees paid by you to peachblue in the twelve (12) months preceding the claim.</p>
              </Prose>
            </Clause>
            <Clause title="8. Indemnification">
              <Prose>
                <p>You agree to indemnify and hold harmless Peachblue Technologies Inc. and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable legal fees) arising from your use of the Service or violation of these Terms.</p>
              </Prose>
            </Clause>
            <Clause title="9. Termination">
              <Prose>
                <p>Either party may terminate the Service relationship at any time. You may close your account by contacting us at <a href="mailto:nick@peachblue.io">nick@peachblue.io</a>. We may suspend or terminate your access if you violate these Terms or for any other reason with reasonable notice.</p>
                <p>Upon termination, your right to use the Service ceases immediately. We will delete your data within 30 days of account closure, in accordance with our <Link href="/privacy">Privacy Policy</Link>.</p>
              </Prose>
            </Clause>
            <Clause title="10. Governing Law">
              <Prose>
                <p>These Terms are governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to conflict of law principles. Any disputes arising from these Terms shall be resolved in the courts of Ontario, Canada.</p>
              </Prose>
            </Clause>
            <Clause title="11. Changes to These Terms">
              <Prose>
                <p>We may update these Terms from time to time. We will notify you of material changes by posting the updated Terms on our website and updating the effective date. Continued use of the Service after changes constitutes acceptance of the updated Terms.</p>
              </Prose>
            </Clause>
            <Clause title="12. Contact Us">
              <Prose>
                <p>If you have questions about these Terms of Service, please contact us:</p>
                <p><strong>Peachblue Technologies Inc.</strong><br /><a href="mailto:nick@peachblue.io">nick@peachblue.io</a></p>
              </Prose>
            </Clause>
          </Clauses>
        </Block>
        <Rule />
      </Frame>
    </SitePage>
  );
}
