# QA sweep summary — 2026-10-02

PR: opened by orchestrator

CI status: pending at time of writing

The PR line above is the required orchestrator handoff marker. This agent did not commit, push, open a PR, query remote CI, deploy, or contact production. All QA additions are uncommitted on `qa/2026-10-02-sweep`; no PR URL exists in this local handoff.

Counts: Critical=1 High=0 Medium=2 Low=1

| Group | Critical | High | Medium | Low | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| Backend / static delivery and dependency review | 1 | 0 | 1 | 0 | 2 |
| Frontend | 0 | 0 | 0 | 0 | 0 |
| UX | 0 | 0 | 1 | 1 | 2 |
| Total | 1 | 0 | 2 | 1 | 4 |

## Top five risks and next-fix order

There are **four confirmed findings**. The fifth item is a clearly identified verification gap, not an invented finding.

1. **BE-001 — Critical:** Installed Next.js 16.3.3 matches a Critical `next/og` remote-code-execution advisory; this application uses `ImageResponse`. Upgrade to a supported patched release at least 16.3.6, review advisory conditions, and rerun the audit/PNG/build/browser checks. Severity follows the registry; remote exploitability was not demonstrated.
2. **UX-001 — Medium:** At a 375px viewport with 200% root text preference, navigation and the contact address run offscreen into a 612px-wide document. Allow constrained navigation and long text to wrap, then repeat both narrow-viewport and text-size checks.
3. **BE-002 — Medium:** Development glob parsers have denial-of-service advisories. Update compatible dependency chains and rerun tooling. The audit's 40 High package entries are dependency propagation, not 40 independent application vulnerabilities.
4. **UX-002 — Low:** The 404 page's only link points to a missing main region and offers no Home recovery. Add an accessible custom not-found page.
5. **Verification gap:** External project links, email delivery and deployed canonical URLs were deliberately not contacted. Their availability remains unknown and should be checked only in a separately authorized live pass.

## Evidence and outcome

- Three separately logged passes: [Backend](BE-LOG.md), [Frontend](FE-LOG.md), [UX](UX-LOG.md). [Combined UTC session log](SESSION-LOG.md) records every command and failed attempt; [plan](PLAN.md) documents risk ranking, charters, chosen methods and exclusions.
- **29/29 Jest tests pass**, including 18 added metadata/component tests. Comparable app+src line coverage rose from **8.69% to 100%** across 46 instrumented lines. This excludes CSS, framework behavior and deployment; see [coverage details](COVERAGE.md).
- **Production Turbopack build, TypeScript and lint pass locally.** Build-time font responses use real public npm font binaries served on localhost. Default external-font build behavior was not exercised. Tooling attempts and corrections are retained in the logs.
- **CI-major runtime check also passes on Node 20.19.6:** all 29 tests, lint, TypeScript and the default Turbopack production build. The initial run used Node 26.7.0. This is local macOS/arm64 proof, not the remote Linux CI job. [Node 20 tests](artifacts/ROOT-node20-tests.txt), [lint](artifacts/ROOT-node20-lint.txt), [types](artifacts/ROOT-node20-types.txt), [build](artifacts/ROOT-node20-build.txt).
- **14 local HTTP responses checked**, including a real 1200×630 PNG, unsupported method 405 and unknown-path 404/noindex. [PNG evidence](artifacts/BE-opengraph.png), [contract report](artifacts/BE-local-contracts.json).
- **Chromium, Firefox and WebKit smokes pass**. Chromium no-JS navigation and ordinary runtime checks pass with zero console/network errors or external requests. [Browser report](artifacts/frontend/runtime-report.json).
- Single cold-cache, throttled localhost performance sample: FCP/LCP **568ms**, CLS **0**. These are lab observations, not a Lighthouse score or field-performance claim; [Frontend report](FE-FINDINGS.md) gives conditions and limitations.
- **Ten axe scans found zero measured WCAG violations**, while manual keyboard/semantics/layout review found the two UX issues. One enlarged-mobile contrast rule remains incomplete. Known defects are explicit expected failures in the UX runner, preserving green checks without hiding them. [UX evidence](UX-FINDINGS.md).
- Independent review found and corrected one **QA harness** defect: connected cross-browser smoke failures could be mislabeled unavailable. A deliberate assertion-failure negative control now produces exit 1. This is not counted as a pre-existing product finding.
- **Independent gate review is complete with no unresolved QA-addition issue.** It also strengthened the 404 runner assertions; final UX results are **21 passed, 2 expected failures**. [Gate review](GATE-REVIEW.md).
- Redacted local Gitleaks scans found no leaks in `app/`, `src/`, the tests, or the QA evidence directory. No allowlist, baseline or ignore file was edited. This supplements, and does not replace, the orchestrator's final scan.

## Changes and limits

Added only two Jest test files plus QA documents, runners, font-response test fixture, screenshots and reports under this directory. **No product behavior fixes, dependency/lockfile changes, CI edits, environment files, migrations or deployment changes.** Browser/axe/font/Node tools are installed outside the repository for this sweep; no new product dependency was added.

Unverified: deployed behavior and hosting settings, third-party link availability, email delivery, native screen-reader speech, physical devices, complete WCAG conformance, field performance/INP, exploitability of the advisory and load capacity. Application APIs/auth/database testing is inapplicable to this static portfolio. Full details, exact reproductions and suggested fixes are in [FINDINGS.md](FINDINGS.md).

The orchestrator's next step is to review this QA-only diff, perform its secret scan, commit/push this branch, open the single draft PR and record hosted CI results. No merge or deployment is authorized.

Fix pass: see FIXES.md
