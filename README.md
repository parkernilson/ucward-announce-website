# UC Ward Announcements

UC Ward Announcements is a simple SMS announcement service for the University City Ward (San Diego) of The Church of Jesus Christ of Latter-day Saints. People opt in by scanning a QR code on a printed poster, which opens their messaging app with **JOIN** (or **JOIN <channel>**) filled in, texted to the toll-free number. They can leave a channel with **LEAVE <channel>** and opt out of everything at any time by replying **STOP**.

This repo contains the UC Ward Announcements website, built with SvelteKit, TypeScript, and Tailwind CSS. (The repo, package, and domain still use the old `shout` name; see "Deployment".)

## Development

```sh
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
```

## Quality checks

```sh
npm run check    # type-check
npm run lint     # prettier + eslint
npm run format   # auto-format
```

## Project structure

- `src/routes/+page.svelte` — landing page (how to sign up with the QR code or by texting JOIN, the poster disclosure, the confirmation text, channels, how to opt out)
- `src/routes/privacy/` — privacy policy
- `src/routes/terms/` — terms and conditions
- `src/routes/+layout.svelte` — shared header/footer; `+layout.ts` turns on prerendering, so every page is built to complete static HTML (see "Prerendering")
- `src/lib/config.ts` — site details (brand name and `UC Ward` SMS prefix, ward name, operator's full legal name, toll-free number, contact email, JOIN/LEAVE keywords, channel codes, default channel, last-updated date), plus helpers for the channel prefix (`channelPrefix`), the join text, the QR code payload (`qrPayload`), the tap-to-text link (`smsLink`), the poster disclosure (`posterDisclosure`), and the confirmation text (`joinConfirmation`). Contact info on the site is email-only; never add a personal phone number.

## SMS opt-in flow

1. **QR code poster.** Each printed poster has a QR code plus the disclosure from `posterDisclosure()` in `src/lib/config.ts`. The QR code encodes `qrPayload()`: `SMSTO:+18444933651:JOIN` for the default channel, or `SMSTO:+18444933651:JOIN RS` for a poster for channel `RS`. The channels (`site.channels`) are `ALL` (whole ward: announcements that apply to everyone), `EQ` (Elders Quorum), `RS` (Relief Society), `YM` (Young Men), `YW` (Young Women), `PR` (Primary), and `NR` (Nursery). Scanning it opens the phone's messaging app with the text filled in. People without a poster can text JOIN themselves or tap the `smsLink()` link on the landing page.
2. **JOIN.** Texting **JOIN** subscribes the number to the default channel, **EQ**; **JOIN <channel>** subscribes it to that channel. The backend replies once with `joinConfirmation()`. Nothing is ever sent to a number that hasn't texted JOIN. Requires **two-way SMS** on the number in AWS End User Messaging so incoming texts reach the backend; keep records of when each number joined.
3. **LEAVE <channel>** unsubscribes the number from that channel only. A bare **LEAVE** leaves the default channel.
4. **STOP** unsubscribes the number from every channel. On US toll-free numbers, **STOP** and **START**/**UNSTOP** are handled by the carriers automatically and can't be customized. Configure a **HELP** response in AWS that includes the contact email and the JOIN/LEAVE/STOP keywords.

Outgoing texts about a channel start with that channel, `UC Ward (<channel>):` (announcements are `UC Ward (EQ): <announcement>`). Messages not tied to a channel start with `UC Ward:`. The disclosures say "message frequency varies" (no monthly cap) and "message and data rates may apply".

If you change the opt-in wording, update the printed posters, `config.ts`, the backend messages in `shout-cdk`, and the AWS toll-free registration together.

- `static/` — static assets

## Prerendering

Every page is prerendered (`export const prerender = true` in `src/routes/+layout.ts`, with SSR left on), so `build/index.html`, `privacy.html`, and `terms.html` contain the full page text. Crawlers and the toll-free verification reviewers read the content without running JavaScript; an earlier client-side-only build (`ssr = false`) was rejected as "inaccessible" because its HTML was an empty shell. Keep these pages prerendered with SSR on. A page that can only run in the browser (such as the planned admin dashboard, which uses Amplify) can set `export const ssr = false` in its own `+page.ts` or `+layout.ts` without affecting the public pages.

## Admin dashboard (planned)

A signed-in admin dashboard will let the operator manage channels (each has a short keyword code such as `EQ` or `RS`, used in `JOIN <code>`), see each channel's receivers (phone number, status, join date), remove numbers from a channel, and send announcements to a channel's subscribed receivers. Admins can't add numbers: people only join by texting JOIN. The AWS side (Cognito, API Gateway, Lambdas, DynamoDB) is defined in the sibling `shout-cdk` repo; see its `README.md`.

- **Auth:** Cognito user pool with self-sign-up turned off; admin users are created by hand. Sign-in uses Cognito **managed login** with an app client that has **no client secret**, using the **authorization code flow with PKCE** (scopes `openid`, `email`).
- **Callback / sign-out URLs:** `https://shout.parkernilson.dev/` in production and `http://localhost:5173/` for development (`npm run dev`). Because the callback is the site root, Amplify must be configured in the root layout so the redirect is handled on `/`.
- **Library:** the `aws-amplify` package (not installed yet), configured once with `Amplify.configure()`:
  - `Auth.Cognito`: `userPoolId`, `userPoolClientId`, and `loginWith.oauth` with the Cognito `domain`, `scopes`, `redirectSignIn`/`redirectSignOut` set to the URLs above, and `responseType: 'code'`.
  - `API.REST`: the HTTP API as a named endpoint (`endpoint` = API URL, `region: 'us-west-1'`).
  - Library options (second argument): `API.REST.headers`, an async function that returns `{ Authorization: <access token> }` from `fetchAuthSession()`. This attaches the token to every API call.

  Use `signInWithRedirect()`, `signOut()`, `getCurrentUser()`, and `fetchAuthSession()` from `aws-amplify/auth`, and `get`/`post`/`put`/`del` from `aws-amplify/api` for API calls.

- **API calls:** the dashboard Lambdas sit behind an **API Gateway HTTP API** with a **JWT authorizer** on the user pool. Make all API calls through `aws-amplify/api` so the `headers` function adds the token. Without that function, Amplify tries to sign requests with IAM (Cognito identity pool) credentials, which this setup doesn't use, so the calls would fail. CORS on the API allows `https://shout.parkernilson.dev` (and `http://localhost:5173` for development).
- **Config:** the user pool ID, app client ID, Cognito domain, and API URL come from the `shout-cdk` stack outputs and belong in `src/lib/config.ts`. They are public identifiers, not secrets; never put AWS credentials or secrets in the site.

## Deployment

Uses `@sveltejs/adapter-static`. `npm run build` writes a static site to `build/`: prerendered `index.html`, `privacy.html`, and `terms.html`, plus `404.html` as the SPA fallback.

The site is hosted on **GitHub Pages** at <https://shout.parkernilson.dev> (the domain predates the UC Ward rebrand; moving it means updating `static/CNAME`, `site.url` in `config.ts`, DNS, the Cognito callback URLs and CORS origins in `shout-cdk`, the posters, and the toll-free registration). `.github/workflows/deploy.yml` runs `check`, `lint`, and `build` on every push to `main` (or a manual run) and deploys `build/` with GitHub Actions.

One-time setup:

1. In the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
2. Under **Settings → Pages → Custom domain**, enter `shout.parkernilson.dev` and save (`static/CNAME` holds the same value). Once the certificate is issued, enable **Enforce HTTPS**.
3. At your DNS provider, add a `CNAME` record: `shout` → `parkernilson.github.io`.
4. Optional but recommended: verify `parkernilson.dev` under your GitHub account's **Settings → Pages** to prevent domain takeover.

## AI agents

See `AGENTS.md`. Claude Code users can run `/svelte-task <task>` (defined in `.claude/commands/svelte-task.md`), which requires the [Svelte MCP server](https://svelte.dev/docs/ai/overview).
