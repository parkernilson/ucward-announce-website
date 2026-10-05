# AGENTS.md

Guidance for AI agents working in this repo.

## Project

UC Ward Announcements is a simple SMS announcement service for the University City Ward (San Diego) of The Church of Jesus Christ of Latter-day Saints. People opt in by scanning a QR code on a printed poster that opens their messaging app with `JOIN` texted to the toll-free number, and opt out with STOP (two-way SMS on AWS). There is a single subscriber list with no channels. Every text starts with `UC Ward:`. This repo is its SvelteKit website (Svelte 5, TypeScript, Tailwind CSS 4). Every page is **prerendered to full static HTML** (`prerender = true`, SSR on) so crawlers and toll-free reviewers can read it, built with `adapter-static`, and deployed to GitHub Pages (custom domain `shout.parkernilson.dev`, kept from the old "Shout" name) by `.github/workflows/deploy.yml` on every push to `main`. Pages: landing (`/`), `/privacy`, `/terms`. Shared details (brand, ward, toll-free number, contact email, JOIN keyword, QR payload, tap-to-text link, poster disclosure, confirmation text) live in `src/lib/config.ts`; see "SMS opt-in flow" in `README.md`. A Cognito-authenticated admin dashboard is planned (managed login, authorization code + PKCE via `aws-amplify/auth`, API calls via `aws-amplify/api` with an `Authorization` header set in `Amplify.configure`, callback `https://shout.parkernilson.dev/` and `http://localhost:5173/`, calling an API Gateway HTTP API with a JWT authorizer); see "Admin dashboard" in `README.md`. Its AWS backend is in the sibling `shout-cdk` repo. See `README.md` for commands and structure.

## Rules

- **Keep docs current.** Whenever you make a change, update `AGENTS.md`, `README.md`, and any other relevant documentation in the same change so they reflect the new state of the project.
- Keep things simple; this is a small project.
- Before finishing, run `npm run check` and `npm run lint` (use `npm run format` to fix formatting).
- The site is branded **UC Ward Announcements**, and every SMS message is prefixed `UC Ward:`. Keep the footer line "UC Ward Announcements is operated by Parker Todd Nilson" (`site.name` / `site.operator`); it links the operator's legal name to the brand.
- Keep the public pages (`/`, `/privacy`, `/terms`) prerendered with SSR on. Don't set `ssr = false` in the root layout; a browser-only page (e.g. the dashboard) sets it in its own route. After building, the page text must be present in `build/*.html`.
- Never remove or obscure the STOP opt-out instructions; clear opt-in/opt-out wording is required for SMS compliance.
- The dashboard is a public browser client: never put client secrets or AWS credentials in the site. The Cognito IDs, domain, and API URL are public config in `src/lib/config.ts`. Keep auth changes (callback URLs, CORS origins, API routes) in sync with `shout-cdk`, and update both repos' docs.
- The landing page, privacy policy, and terms back the AWS toll-free number verification. Keep the required disclosures: the opt-in method (the poster's QR code, the note that it appears on posters at the ward building, and "text JOIN to <number>" with the number visible), the poster disclosure naming the program, "message frequency may vary", "message and data rates may apply", HELP/STOP instructions, links to the privacy policy and terms, contact info, and the statement that mobile/opt-in data is not shared with third parties for marketing. The poster disclosure and confirmation text must match the printed posters, `shout-cdk`'s messages, and the toll-free registration.

# Tools

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available Svelte MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.
