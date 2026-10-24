# Frontend QA pass

PR: opened by orchestrator

CI status: pending at time of writing

## Result

No confirmed frontend product defects in this pass. Responsive and accessibility defects, if any, are owned by the UX pass and are not duplicated here. This is local verification of the checked-out source, not proof of the deployed website or outbound destinations.

| ID | Severity | Group | Title | Reproduction | Expected versus actual | Evidence | Suggested fix |
| --- | --- | --- | --- | --- | --- | --- | --- |

## Verification

- Added nine component tests in `__tests__/components.qa.test.tsx`; all nine pass. They verify page landmarks and copy, existing fragment destinations, matching hero/footer contact addresses, named and isolated external links, visible project/career content, optional project links/details, text escaping, and an undated education entry without highlights.
- Existing lint, type checks, production build and full-suite coverage belong to the shared root log. During authoring, root typecheck caught missing Jest DOM TypeScript matcher declarations and an unsupported Testing Library option in the new tests; both QA harness errors were corrected and targeted tests passed again. Neither was a product finding.
- Local production browser journeys pass in Chromium **153.0.8010.12**, Firefox **155.0**, and WebKit **26.6**, connected through the orchestrator's existing browser endpoint. Each engine performed the homepage, Work, Career and Contact smoke journey.
- Chromium additionally passed hero CTA navigation, return-to-main navigation, six project cards and six career entries, two syntactically valid contact destinations, safe HTTPS new-tab links, JavaScript-disabled content/navigation, and the local unknown-route HTTP 404.
- Main Chromium journey: **zero console warnings/errors, zero page errors, zero HTTP errors, zero failed requests, zero external requests intercepted**. External links were inspected, never followed; email was never launched or sent.

## Performance sample

Single local Chromium cold-cache sample with requested CDP settings of 4× CPU slowdown, 150 ms latency, 1.6 Mbps download and 0.75 Mbps upload. This is a Lighthouse-style browser-metrics inspection, not a Lighthouse score, repeatability study, mobile device test, or field Core Web Vitals result.

| Metric | Observed |
| --- | ---: |
| First contentful paint | 568 ms |
| Largest contentful paint | 568 ms |
| Cumulative layout shift | 0 |
| Observed long-task time beyond 50 ms per task | 20 ms |
| DOM content loaded | 435 ms |
| Load complete | 1,500 ms |
| Subresource encoded bytes (8 resources) | 207,883 |
| Subresource transferred bytes | 210,283 |

The build uses QA-only local responses containing actual Inter and Space Grotesk font binaries from public packages; production Google CSS/font fetching and exact production font subsets were not exercised. These local figures cannot establish production latency. INP was not measured. The long-task figure is an approximation, not Lighthouse's calibrated TBT metric.

## Evidence and limitations

- [Runtime report](artifacts/frontend/runtime-report.json): exact engine versions, navigation outcomes, destinations, console/network arrays and Resource/Performance API entries.
- [Desktop arrival](artifacts/frontend/desktop-home.png), [desktop contact](artifacts/frontend/desktop-contact.png), [JavaScript-disabled contact](artifacts/frontend/no-js-contact.png). Arrival/contact screenshots were visually inspected; content and navigation were readable at the captured desktop viewport.
- [Targeted component result](artifacts/FE-fe-component-tests-typed.txt), [browser command result](artifacts/FE-fe-browser-gate-rerun.txt), [performance aggregation](artifacts/FE-fe-performance-summary.txt).
- [Repeatable browser script](browser/frontend.mjs) takes isolated QA tools path and localhost base URL; it never launches browsers and blocks non-loopback HTTP requests.

No production URLs, services, credentials, databases, billing, deployment or live email delivery were tested. Browser coverage is a desktop smoke across three engines; physical-device behavior and browser extensions remain untested. Accessibility, keyboard, mobile and 404 recovery are covered separately by the UX pass. No frontend expected-failure tests were necessary because this pass did not reproduce a frontend defect.

## Independent QA harness review

GATE-001 identified that a Firefox/WebKit assertion failure after a successful connection could be mislabeled as an unavailable engine. The QA runner now propagates such failures to an overall failed result and process exit 1. All three engine smokes passed after this correction. A temporary-copy negative control deliberately expected HTTP 201 from Firefox instead of the real HTTP 200: the browser runner exited 1 and wrote outcome `fail`, as required. This was an injected QA harness failure, not a product defect; the source product was unchanged. See [negative-control log](artifacts/FE-fe-browser-gate-negative-control.txt) and [isolated negative-control report](artifacts/frontend-gate-negative/runtime-report.json).
