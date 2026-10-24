# QA plan — 2026-10-02

PR: opened by orchestrator

CI status: pending at time of writing

## Scope and repository map

Confirmed checkout: `/Users/sellers/Projects/qa-sweep-2026-10-02/Chrissellers`; branch `qa/2026-10-02-sweep`; initial HEAD `0632a6b`; origin `PetrefiedThunder/Chrissellers`. Initial worktree clean; no repository-local AGENTS.md found. User-supplied instructions apply. Timebox: 60–90 minutes. UTC logging crosses into October 3 while the requested report date remains October 2.

Single public Next.js 16 / React 18 page. `app/page.tsx` composes five server components in `src/components/`; three typed files in `src/content/` supply copy. `app/layout.tsx` defines metadata and Google build-time fonts; `app/opengraph-image.tsx` renders PNG metadata. `app/globals.css` and `tailwind.config.cjs` define styles. Jest currently tests content only. CI runs npm install, lint, Jest coverage, then build. No application API, persistent state, auth, database, OpenAPI schema, or SDK is present.

## Risk ranking

Scores use impact (1–5) × likelihood (1–5), before execution; scores prioritize effort, not finding severity.

| Rank | Area | Impact | Likelihood | Score | Reason |
| --- | --- | --- | --- | --- | --- |
| 1 | Build/install and public page availability | 5 | 4 | 20 | A single route is the entire product; framework and remote font dependencies can prevent delivery. |
| 2 | Mobile/contact/navigation usability | 4 | 4 | 16 | Long text, sticky navigation, and an email-only conversion path are central to visitors. |
| 3 | Accessibility and keyboard access | 4 | 3 | 12 | Portfolio content must remain reachable without pointer input and at narrow widths. |
| 4 | Social metadata/image and credibility copy | 4 | 3 | 12 | Shared links and claims are the site's stated purpose. |
| 5 | Supply-chain and public server surface | 4 | 3 | 12 | Framework exposure exists even without app-owned APIs. |
| 6 | Performance, no-JS and dark mode | 3 | 3 | 9 | Readability and first content delivery matter on constrained devices. |

## Three separate QA passes

1. **Backend QA → server/build/content-contract lens** (`BE-LOG.md`): existing suite with baseline coverage; production rendering and PNG/metadata checks; deterministic content/URL boundary cases; dependency audit from the public package registry; static OWASP API applicability matrix. Auth, idempotency, concurrency, database and API-contract fuzzing are inapplicable to this static, read-only application. Favor exact rendering contracts over inventing an API or adding a fuzzing dependency without a parser target. Charter BE-X1 (20 minutes): try to break delivery, preview generation and invalid-route handling using local requests only.
2. **Frontend QA** (`FE-LOG.md`): lint/type/build, component tests, browser journeys against localhost, console/network evidence, no-JS rendering, responsive viewports and browser Resource/Performance APIs for a Lighthouse-style performance pass. Production build preferred; local development server fallback documented if build unavailable. Attempt Chromium/Firefox/WebKit through the provided remote browser endpoint only. Charter FE-X1 (20 minutes): navigate from arrival to work, career and contact; inspect resource failures, invalid routes and reduced connectivity. Test pyramid: many cheap content/component assertions; a small number of real page flow checks.
3. **UX QA** (`UX-LOG.md`): axe WCAG 2.2 AA subset, keyboard/focus and accessibility semantics, Nielsen's ten heuristics, mobile/desktop, light/dark, 320px reflow, reduced motion and 200% text sizing, plus screenshots. Inspect loading/empty/error applicability for a static page and its 404. Charter UX-X1 (20 minutes): evaluate whether a first-time visitor using keyboard or mobile can understand the work and reach contact. Automated axe does not certify full WCAG conformance; native screen-reader speech requires separate validation.

Each lane has separate ownership and artifacts. Shared setup and aggregate verification are recorded in ROOT-LOG.md; SESSION-LOG.md is the combined timestamped command index. Added tests must preserve product behavior and mark reproduced defects expected-failure or skipped with finding IDs. Baseline and final coverage use identical denominators; report the legacy `src` scope and a broader app-inclusive scope if feasible.

## Boundaries

No product edits, commits, pushes, PR commands, deploys, production URLs, third-party credentialed APIs, databases, credentials or billing. Do not read environment/credential files. External links are checked syntactically and intercepted in browser tests; destination availability and email delivery remain unverified. Public npm metadata/package downloads are allowed. Browser contexts deny non-loopback requests. No direct browser launch/install. Google font fetches are outside the permitted network scope: build will use test-only local font response mocks if needed, clearly limiting font-fidelity evidence. No CI, migration, deploy or secret-baseline changes. CodeRabbit cloud review is excluded because it would transmit code to a third-party API; use an independent local reviewer instead. The orchestrator handles secret scanning, commit/push, and the single draft PR.

## Reproducibility and execution readback

The default Turbopack production build ultimately passed with a QA-only Google CSS response fixture and actual Inter/Space Grotesk variable font binaries served from localhost. Initial fixture errors (Proxy export handling and an absolute file URL unsupported by Turbopack) and transient type errors in new test files are recorded as repaired QA harness problems, not product defects. The temporary webpack attempt compiled but stopped on the metadata test's then-unfixed type error; the final successful build used the normal Turbopack path.

Runtime tool versions: initial Node 26.7.0/npm 11.19.0; additional Node 20.19.6 for CI-major compatibility; Next 16.3.3/React 18.3.1 from the unchanged lockfile; Playwright 1.63.0; axe-core 4.13.0; `@fontsource-variable/inter` and `@fontsource-variable/space-grotesk` 5.3.0. The latter four tools are installed in `/private/tmp/chrissellers-qa-20261002-tools`, outside product dependencies. No browser download/launch was performed.

For a maintainer or orchestrator repeating the sweep, the complete actual commands are in SESSION-LOG.md. The essential sequence is:

1. Install the checked-in lockfile (`npm ci`), with a writable temporary npm cache if required. Install the exact QA tool versions above in an isolated directory. Keep the existing `PW_TEST_CONNECT_WS_ENDPOINT`; do not launch a browser in this sandbox.
2. Serve that directory's `node_modules` with a loopback-only static server (this sweep used port 3977). Supply `QA_FONT_ORIGIN=http://127.0.0.1:3977` and an absolute `NEXT_FONT_GOOGLE_MOCKED_RESPONSES` path to `font-responses.cjs`, then build. `QA_TOOLS_NODE_MODULES` can override the fixture's tool directory for the webpack/local-file path.
3. Start the built Next application bound to `127.0.0.1` (this sweep used port 3017). All four processes—font fixture server, build, app server and test runners—are local.
4. Run Jest with both quoted coverage globs from COVERAGE.md; run `local-contracts.mjs` with the loopback base URL; run `browser/frontend.mjs` and `browser/ux.mjs` with the isolated tools directory and loopback URL. Use `run_logged.py GROUP unique-label command ...` for durable UTC command/outcome logs.
5. Review expected-failure UX records, raw audit JSON and screenshots; repeat lint/type checks. Browser and HTTP scripts are intentionally **not wired into the existing CI workflow** because CI changes and remote browser provisioning are outside this sweep. Existing CI will pick up the two new Jest files automatically.

No property-based framework was added: the site has no request parser, mutable business state or custom algorithm for which generated inputs would add useful coverage beyond the exercised optional-content boundaries and platform-URL contracts. Automated results are paired with exploratory source, screenshot and accessibility-semantics review.
