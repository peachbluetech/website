import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — peachblue",
  description: "Privacy Policy for peachblue — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-[720px] mx-auto px-6 py-20">
      <Link href="/" className="text-[13px] text-pb-fg-muted hover:text-pb-fg transition-colors mb-8 inline-block">&larr; Back to home</Link>
      <h1 className="font-display text-[clamp(28px,4vw,36px)] font-medium tracking-tight mb-2">Privacy Policy</h1>
      <p className="text-[13.5px] text-pb-fg-muted mb-10">Effective date: March 13, 2026 · Peachblue Technologies Inc.</p>

      <div className="prose-pb">
        <p>Peachblue Technologies Inc. ("peachblue," "we," "us," or "our") operates the peachblue platform, a creative intelligence and ad performance analysis service. This Privacy Policy describes how we collect, use, store, and protect your information when you use our website and platform.</p>

        <h2>1. Information We Collect</h2>

        <h3>Account Information</h3>
        <p>When you create an account, we collect your name, email address, company name, and role. This information is used to set up and manage your account.</p>

        <h3>Advertising Platform Data</h3>
        <p>When you connect your advertising accounts, we access and sync the following data via secure OAuth-based API connections:</p>
        <ul>
          <li><strong>Creative assets.</strong> Images, videos, and carousel content from your ad campaigns</li>
          <li><strong>Performance metrics.</strong> Spend, impressions, clicks, CTR, CPC, CPM, ROAS, CPA, conversions, and days active</li>
          <li><strong>Campaign metadata.</strong> Ad names, ad set details, campaign structure, and status</li>
        </ul>
        <p>We currently support or are developing integrations with the following platforms:</p>
        <ul>
          <li><strong>Meta Ads</strong> (Facebook &amp; Instagram). Live.</li>
          <li><strong>TikTok Ads</strong> (In-feed, TopView, Spark Ads). Live.</li>
          <li><strong>Amazon Ads</strong> (Sponsored Ads, DSP, Connected TV). In development.</li>
          <li><strong>Google Ads</strong> (Search, Shopping, YouTube). In development.</li>
        </ul>

        <h3>Brand Intelligence Data (Reddit)</h3>
        <p>When you use the Brand Intel feature, peachblue collects publicly available data from Reddit for brand monitoring purposes. This includes:</p>
        <ul>
          <li>Public Reddit posts and comments that match keywords you choose to track</li>
          <li>Associated metadata including subreddit names, post titles, comment text, author usernames, scores, and comment counts</li>
          <li>Sentiment labels assigned to each mention via AI analysis</li>
        </ul>
        <p>This public data is processed by AI to generate sentiment analysis, trending topic identification, and competitive intelligence summaries. You choose which keywords to track, and all collected data is scoped to your organization. Reddit data can be deleted upon request alongside all other user data.</p>

        <h3>Usage Data</h3>
        <p>We collect standard usage information such as pages visited, features used, browser type, device type, and IP address to improve the platform experience.</p>

        <h3>Cookies</h3>
        <p>We use minimal cookies for session management and basic analytics. We do not use third-party advertising cookies or tracking pixels.</p>

        <h2>2. How We Use Your Data</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li><strong>Provide the service.</strong> Sync your ad data, run AI-powered creative analysis, generate performance insights, produce creative intelligence tags, and deliver actionable creative briefs.</li>
          <li><strong>AI-powered analysis.</strong> Your creative assets (images and videos) are processed by AI vision models to generate structured intelligence tags covering visual design, copy strategy, hook effectiveness, color palette, pacing, and more. This analysis is performed solely to provide insights back to you as the account owner.</li>
          <li><strong>Improve the platform.</strong> Understand usage patterns to build better features and fix issues.</li>
          <li><strong>Communicate with you.</strong> Send account-related updates, respond to support requests, and share product updates (with your consent).</li>
        </ul>

        <h2>3. How We Handle Ad Platform Data</h2>
        <p>Your advertising data is treated with strict confidentiality:</p>
        <ul>
          <li>We access your ad platform data <strong>only with your explicit authorization</strong> via OAuth</li>
          <li>Your data is used <strong>solely to provide creative intelligence insights to you</strong>, the account owner</li>
          <li>We do <strong>not</strong> use your ad data to train AI models</li>
          <li>We do <strong>not</strong> aggregate your data with other customers' data</li>
          <li>We do <strong>not</strong> sell, rent, or share your advertising data with any third party for their own purposes</li>
          <li>You can disconnect your ad accounts and request deletion of your data at any time</li>
        </ul>
        <p>We comply with the terms of service and data use policies of each advertising platform we integrate with, including the Meta Platform Terms, Google Ads API Terms of Service, Amazon Ads API License Agreement, and TikTok for Business Commercial Terms.</p>

        <h2>4. Data Security</h2>
        <p>We implement comprehensive administrative, physical, and technical safeguards to protect your data, including:</p>
        <ul>
          <li><strong>Encryption.</strong> All data is encrypted in transit (TLS 1.2+) and at rest.</li>
          <li><strong>Access controls.</strong> Role-based access with the principle of least privilege. Only authorized personnel can access customer data.</li>
          <li><strong>Infrastructure.</strong> Hosted on industry-standard, SOC 2-compliant cloud infrastructure.</li>
          <li><strong>Credential security.</strong> OAuth tokens are stored encrypted and are never exposed in logs or client-side code.</li>
          <li><strong>Incident response.</strong> We maintain a documented incident response process and will notify affected users and relevant authorities promptly in accordance with applicable law.</li>
        </ul>

        <h2>5. Third-Party AI Processing</h2>
        <p>To provide creative intelligence and brand monitoring features, certain data is sent to Google&apos;s Gemini API for processing. This includes:</p>
        <ul>
          <li><strong>Creative assets.</strong> Images and videos from your connected ad accounts are sent for visual analysis, creative tagging (format, style, tone, hook type, CTA, etc.), and optical character recognition (OCR) of text in images and videos.</li>
          <li><strong>Ad copy.</strong> Headline and body text from your ads are sent for copy strategy analysis and strategic recommendations.</li>
          <li><strong>Brand mentions.</strong> Public Reddit posts and comments matching your tracked keywords are sent for sentiment analysis, trending topic identification, and competitive intelligence summarization.</li>
        </ul>
        <p>These third-party AI services process data under their respective data processing agreements. Peachblue does not use your ad data to train AI models. Processing is performed on-demand and data is not retained by the AI provider beyond the scope of each individual processing request.</p>

        <h2>6. Data Sharing</h2>
        <p>We do not sell your personal information or advertising data. We may share limited data with:</p>
        <ul>
          <li><strong>Infrastructure providers.</strong> Cloud hosting, database, and AI processing services that help us operate the platform, bound by confidentiality agreements and used solely to provide our service.</li>
          <li><strong>Legal requirements.</strong> If required by law, regulation, or legal process.</li>
        </ul>

        <h2>7. Data Retention &amp; Deletion</h2>
        <p>We retain your data for as long as your account is active and as needed to provide the service. If you close your account or request deletion, we will delete your data within 30 days, except where retention is required by law. Disconnecting an ad platform will stop new data syncs; previously synced data will be deleted upon request.</p>

        <h3>Meta Data Deletion Callbacks</h3>
        <p>When you deauthorize the Peachblue app from your Meta (Facebook) account settings, Meta sends an automated data deletion request to Peachblue. Upon receiving this request, Peachblue will:</p>
        <ul>
          <li>Delete all stored OAuth tokens associated with your Meta connection</li>
          <li>Queue deletion of all synced ad performance data, creative assets, and analysis results linked to your Meta ad accounts</li>
          <li>Complete deletion within 30 days of the request</li>
          <li>Provide a confirmation code and status tracking URL to Meta for your records</li>
        </ul>
        <p>You can also request data deletion at any time by contacting <a href="mailto:nick@peachblue.io" className="underline">nick@peachblue.io</a>.</p>

        <h2>8. Your Rights</h2>
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul>
          <li><strong>Access</strong> your personal data we hold</li>
          <li><strong>Correct</strong> inaccurate or incomplete data</li>
          <li><strong>Delete</strong> your data (right to erasure)</li>
          <li><strong>Export</strong> your data in a portable format</li>
          <li><strong>Withdraw consent</strong> for data processing</li>
          <li><strong>Object</strong> to certain types of processing</li>
        </ul>
        <p>We comply with applicable privacy legislation, including Canada&apos;s Personal Information Protection and Electronic Documents Act (PIPEDA). For users in the European Economic Area, we comply with the General Data Protection Regulation (GDPR). For users in California, we comply with the California Consumer Privacy Act (CCPA).</p>
        <p>To exercise any of these rights, contact us at <strong><a href="mailto:nick@peachblue.io" className="underline">nick@peachblue.io</a></strong>.</p>

        <h2>9. Children&apos;s Privacy</h2>
        <p>peachblue is a business-to-business service and is not directed at children under 16. We do not knowingly collect personal information from children.</p>

        <h2>10. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on our website and updating the effective date. Continued use of the platform after changes constitutes acceptance of the updated policy.</p>

        <h2>11. Contact Us</h2>
        <p>If you have questions about this Privacy Policy or how we handle your data, please contact us:</p>
        <p><strong>Peachblue Technologies Inc.</strong><br /><a href="mailto:nick@peachblue.io" className="underline">nick@peachblue.io</a></p>
      </div>
    </div>
  );
}
