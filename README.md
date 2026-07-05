# SystemFlow

Automated eCommerce reporting dashboard for GScale Marketing. Built with Next.js 14 (App Router), Tailwind CSS, Recharts, and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

Option A (fastest, no GitHub needed):

```bash
npm install -g vercel
vercel
```

Follow the prompts, then run `vercel --prod` to go live.

Option B (recommended for ongoing work):

1. Push this folder to a GitHub repo.
2. Go to vercel.com, click Add New > Project, and import the repo.
3. Vercel auto-detects Next.js. Click Deploy. Done.

Every push to `main` after that redeploys automatically.

## Project structure

```
app/
  layout.tsx        Shell with sidebar
  page.tsx          Dashboard page
components/         All dashboard sections
lib/data.ts         Mock data layer (swap this for real APIs)
```

## Live data

### Meta Ads (connected)

The Platform Performance "Meta Ads Manager" row and the "Top Performing
Campaigns" table pull live from the Marketing API `insights` endpoint
(`lib/meta.ts`): spend, purchases, ROAS and CPA for the last 7 days, each
with a week-over-week delta, plus per-campaign figures.

Set these environment variables (see `.env.example`):

| Variable | Required | Notes |
| --- | --- | --- |
| `META_ACCESS_TOKEN` | yes | Long-lived System User / Page token with `ads_read`. |
| `META_AD_ACCOUNT_ID` | yes | Ad account id, with or without the `act_` prefix. |
| `META_API_VERSION` | no | Graph API version, defaults to `v21.0`. |

Locally, copy `.env.example` to `.env.local` and fill it in. On Vercel, add
them under Project > Settings > Environment Variables — never commit keys.
If credentials are missing or a call fails, the dashboard falls back to the
mock values in `lib/data.ts` so it still renders.

### Still mock

The remaining rows live in `lib/data.ts`. Keep the exported shapes and
replace the static values with fetches (Server Components or Route Handlers):

- Shopify: Admin GraphQL API (orders, revenue, AOV) plus GA4 Data API (conversion rate)
- Klaviyo: Reporting API (flow revenue, placed orders, CTR)

## Brand tokens

Colors are defined once in `tailwind.config.ts`. The accent is set to the mockup yellow `#FFE14D`. To use the thegoodscale.com butter yellow instead, change `accent` to `#FFFD74`.
