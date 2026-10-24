# QA fix pass — 2026-10-02 findings

Fix execution: 2026-10-03 UTC. Branch: `qa/2026-10-02-fixes`. Baseline: `2a08522`. Local commits only.

## Findings and decisions

Required order was BE-001 (the only Critical); there were no High findings. After that commit passed available checks, optional items were assessed in SUMMARY order: UX-001, BE-002, UX-002. Original findings and sweep evidence remain unchanged.

| Finding ID | Severity | Title | Status | Commit SHA | Proving test (file::name) | Notes or reason deferred |
| --- | --- | --- | --- | --- | --- | --- |
| BE-001 | Critical | Production Next.js dependency matches a Critical next/og RCE advisory | fixed | `93de5d76e74887063245e4c53c2a5a3f5e033ce3` | `__tests__/dependencies.qa.test.ts::BE-001: Next.js next/og security patch > locks a stable release at or above the patched 16.3.6 version`; `__tests__/dependencies.qa.test.ts::BE-001: Next.js next/og security patch > pins the manifest and lockfile to the same Next.js release` | Root cause: Next.js 16.3.3 was locked inside the captured GHSA-vcvr-r3jv-pc5j affected range (`>=16.2.0 <16.3.6`), and manifest allowed it. Exact-pin Next.js and matching eslint-config-next to 16.3.6; npm regenerated the lockfile and related framework/lint entries. Both new tests failed before patching and passed afterward. Real local PNG contract passed. Browser revalidation remains blocked as detailed below. |
| UX-001 | Medium | Enlarged text pushes mobile navigation and contact offscreen | deferred | — | `docs/qa/2026-10-02/browser/ux.mjs::mobile-text200-375: viewport reflow` (existing expected failure, unchanged) | Read-only assessment only. Layout fix needs rendered geometry and enlarged-text validation; local browser startup is denied by the managed macOS sandbox. CSS changes cannot be verified confidently in this session. |
| BE-002 | Medium | Development dependency tree contains known glob-parser denial-of-service advisories | deferred | — | Candidate `__tests__/dependencies.qa.test.ts::BE-002: development glob parser security patches > locks a patched glob parser at %s` was used as a negative control, then discarded with the uncommitted candidate | Selective npm update patched eight brace-expansion copies but left braces 3.0.3. Nine candidate assertions failed before update; eight passed and the braces assertion still failed afterward. Installing braces@3.0.4 in an isolated temporary directory returned ETARGET. No compatible braces patch resolved in this attempt; wider dependency-chain changes or overrides were not proven safe. Restored only our uncommitted candidate lock/test to BE-001, then ran npm ci. No BE-002 changes remain. |
| UX-002 | Low | Not-found page has no in-page recovery and a broken skip link | deferred | — | `docs/qa/2026-10-02/browser/ux.mjs::404 has a valid main skip target and a route home` (existing expected failure, unchanged) | Read-only assessment only. Custom page could be small, but browser focus/recovery behavior and the matching expected-failure conversion cannot be validated with browser startup blocked. |

## Counts

| Severity | Fixed | Partial | Deferred |
| --- | ---: | ---: | ---: |
| Critical | 1 | 0 | 0 |
| High | 0 | 0 | 0 |
| Medium (optional, assessed) | 0 | 0 | 2 |
| Low (optional, assessed) | 0 | 0 | 1 |
| All listed findings | 1 | 0 | 3 |

Critical and High only:

FixCounts: fixed=1 partial=0 deferred=0

## Before and after validation

The relevant baseline is the completed sweep, not its earlier pre-QA 11-test run. See [COVERAGE.md](COVERAGE.md), [SUMMARY.md](SUMMARY.md), and the exact commands/outcomes in [FIX-SESSION-LOG.md](FIX-SESSION-LOG.md).

| Check | Sweep baseline | Fix-pass baseline / negative control | Final retained state |
| --- | --- | --- | --- |
| Full Jest suite | 29 pass / 0 fail / 0 xfail / 0 skip; 3 suites | Reproduced 29/0/0/0 before edits. BE-001 tests separately failed 2/2 on original dependencies. | **31 pass / 0 fail / 0 xfail / 0 skip; 4 suites**, Node 20.19.6 after clean npm ci. |
| Comparable app + src coverage | 100% statements, branches, functions, lines | No production source added or removed | **100%** for all four metrics; 46 instrumented lines, same source patterns. Excludes CSS/framework internals/deployment. |
| Local HTTP/PNG contracts | 14 checked responses; pass | BE-001 post-patch: 14 pass | **14 pass / 0 fail / 0 xfail / 0 skip** after final rebuild, including actual PNG signature and 1200×630 dimensions, HEAD, POST 405, 404/noindex and consistent parallel image reads. |
| Frontend browser journeys | Chromium, Firefox and WebKit passed; no-JS passed | Attempted unchanged runner against the patched loopback server | **BLOCKED before first journey**: Chromium process startup denied by macOS sandbox (`MachPortRendezvousServer`, permission denied 1100). No valid final browser pass/fail assertion counts; the runner failure is environmental. |
| UX browser runner | 21 pass / 0 fail / 2 expected failures / 0 skip | Same Chromium prerequisite blocked | **Not rerun** because the shared browser prerequisite failed. Current UX pass/fail/xfail/skip counts are unknown; both original expected-failure definitions remain unchanged. |
| Production build | PASS, Node 20; local font fixtures | BE-001 post-patch PASS | **PASS**, Next.js 16.3.6 Turbopack on Node 20 after clean install. |
| Typecheck | PASS (`tsc --noEmit`) | BE-001 post-patch PASS | **PASS**, `tsc --noEmit --incremental false` on Node 20. No dedicated typecheck npm script exists. |
| Lint | PASS | BE-001 post-patch PASS | **PASS**, configured ESLint command on Node 20. |
| Dependency advisory check | Captured audit: one Critical production entry; development parser findings | Installed and locked Next16.3.6 confirmed | Offline comparison to captured production advisory has **zero matching entries**. A fresh network audit was not run; network authorization was limited to package/browser installation. BE-002 remains. |
| Independent local review | Sweep gate complete | BE-001 code/lock/test review passed | Retained code reviewed again after candidate rollback; no blocking code findings. |

Build uses the unchanged sweep fixture `font-responses.cjs` and installed public npm font binaries served on loopback. Live Google Fonts behavior remains unverified. Test/coverage/browser artifacts were kept in `/private/tmp/chrissellers-fix-validation`; the committed session log retains results. Original sweep artifacts were not overwritten.

The optional BE-002 candidate produced 39 passing / 1 failing tests and was never committed; it was discarded as a whole, including its new candidate tests. No test was weakened to accept vulnerable dependencies. No regression from a retained fix was observed in completed checks, so no `git revert` was required. No pre-existing Jest/build/type/lint failure was found.

## Remaining risks and handoff

- Final browser and UX execution is blocked by sandbox browser startup; rerun the existing runners in an approved browser-capable environment before release. This is a verification gap, not a claim that browser behavior passed.
- BE-002, UX-001 and UX-002 remain as recorded by the original sweep. The parser advisory is development-only in the captured audit; exploitability was not established.
- Security evidence uses the captured advisory plus installed/locked version proof; no exploit attempt or fresh audit was performed. Future or unrelated advisories are outside this evidence.
- No remote CI, deployment, live links, email delivery or production system was accessed. No migration, environment file, credential, deployment config or secret-scan policy was changed.
- Orchestrator owns review, remote actions and the browser-capable rerun. This pass only created local commits.
