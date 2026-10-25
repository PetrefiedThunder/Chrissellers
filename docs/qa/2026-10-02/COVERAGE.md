# Coverage and test inventory

PR: opened by orchestrator

CI status: pending at time of writing

## Comparable before and after

The baseline ran before either new test file existed. Both instrumented runs use the same Jest command, `--runInBand`, and explicit `collectCoverageFrom` patterns covering **both `src/**/*.{ts,tsx}` and `app/**/*.{ts,tsx}`**. No coverage config or production source was changed. The existing Jest config includes only `src`; that legacy view is also shown below. Percentages are instrumented execution, not overall product assurance.

| Scope / metric | Before | After | Denominator |
| --- | ---: | ---: | ---: |
| App + src statements | 14.81% (8) | 100% (54) | 54 |
| App + src branches | 0% (0) | 100% (5) | 5 |
| App + src functions | 0% (0) | 100% (18) | 18 |
| App + src lines | 8.69% (4) | 100% (46) | 46 |
| Legacy src statements | 26.67% (8) | 100% (30) | 30 |
| Legacy src branches | 0% (0) | 100% (5) | 5 |
| Legacy src functions | 0% (0) | 100% (15) | 15 |
| Legacy src lines | 15.38% (4) | 100% (26) | 26 |

Raw comparable reports: before summary (artifact removed from repo), before detailed counters (artifact removed from repo), after summary (artifact removed from repo), after detailed counters (artifact removed from repo). Execution logs: baseline (artifact removed from repo), final (artifact removed from repo).

## Added checks

| Layer | Before | Final result / purpose |
| --- | --- | --- |
| Jest | 1 suite, 11 tests | 3 suites, **29 tests passed**, no skipped or expected-failure unit tests. |
| Backend metadata unit contracts | None | 9 added: metadata identity/base, five real public URL parses, language/skip structure, image descriptors, renderer input. |
| Frontend component contracts | None | 9 added: complete page, anchor targets, contact consistency, external-link safety, visible content, absent optional content, default link label, text escaping, undated education. |
| Backend local HTTP | None in repo | **14 responses checked**: HTML/metadata, GET/HEAD PNG, real PNG signature/dimensions, image POST 405, no reflected markup, unknown paths/noindex, five consistent parallel image reads. |
| Browser flows | None in repo | Chromium full journey + no-JS + 404; Firefox and WebKit navigation smokes. Actual browser versions in report (artifact removed from repo). |
| UX/browser | None in repo | Nine homepage scenarios and one 404 axe scan; keyboard/ARIA/reflow checks, with `UX-001` and `UX-002` explicitly recorded as expected failures. See [UX pass](UX-FINDINGS.md) for latest check count. |
| Static/supply chain | Existing lint/CI | Local lint/types/build; production/full npm audits; local redacted secret checks. Independent QA harness review and negative control. |

The 100% figures are attainable because this is a small static application with only five instrumented branches. They **exclude CSS, layout correctness, framework internals, package security, deployed infrastructure, external destinations and truth of content claims**. Tests use alternate fixture content to exercise optional project/career rendering. Google font imports and `ImageResponse` are mocked in metadata unit tests; real local production HTML and PNG checks supply separate integration evidence.

## Remaining gaps

- No production requests, live link resolution or email delivery, per scope. Canonical-domain availability and actual deployed behavior are not verified.
- No native screen-reader speech, physical devices, real mobile pinch zoom, or full WCAG certification. CSS root font-size simulation is explicitly distinguished from browser zoom. One axe contrast check is incomplete in the enlarged mobile scenario.
- No field Core Web Vitals, INP, sustained load, long-running reliability or stress tests. The single controlled localhost performance sample is diagnostic only.
- Live Google Fonts response/version behavior was replaced with public npm font fixtures; no Google network call was needed.
- No exploit test for the Critical framework advisory; the package match and usage are verified, remote reachability is not.
- Auth, permissions, persistence, mutation idempotency/replay, business concurrency, OpenAPI and API fuzzing do not apply to the checked-out product. This is not a claim about framework internals.
- Remote CI remains pending; local evidence does not establish hosted CI or deployment success.

## Runtime compatibility readback

The original and coverage runs used Node 26.7.0. A final local check on **Node 20.19.6**, matching the CI's Node major, passed all 29 tests, lint, TypeScript and the default production build. This narrows the runtime gap but does not verify CI's Linux environment or a remote workflow run. See `artifacts/ROOT-node20-{tests,lint,types,build}.txt`.
