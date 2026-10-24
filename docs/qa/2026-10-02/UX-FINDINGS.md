# UX QA pass

PR: opened by orchestrator

CI status: pending at time of writing

## Results

Two verified UX findings: **Medium=1, Low=1**. No Critical or High findings. Product code was not changed. Browser checks run against the local production build at `http://127.0.0.1:3017`, with all non-loopback requests denied. No external requests were attempted.

| ID | Severity | Group | Title | Exact reproduction | Expected vs actual | Evidence | Suggested fix |
| --- | --- | --- | --- | --- | --- | --- | --- |
| UX-001 | Medium | UX | Enlarged text pushes mobile navigation and contact offscreen | Open `/` at a 375×900 CSS-pixel viewport; set `html { font-size: 200% !important; }` (32px root, simulating a larger default text preference); inspect navigation, then scroll to Contact. | Expected: central navigation and contact text remain readable without horizontal panning. Actual: document expands to 612px; Career begins at x=379.06, Contact at x=508.52 (right=612.48), and the email extends from x=48 to x=612.38. Headline words and project links also extend beyond the viewport. This is a verified usability issue under the specified text-preference simulation, not an asserted WCAG conformance failure: ordinary 320px reflow and desktop 1280px/200% both pass. | `src/components/Nav.tsx:14`, `src/components/Nav.tsx:19`, `src/components/Contact.tsx:16`, `src/components/Work.tsx:59`; [geometry/report](artifacts/ux/ux-report.json), `mobile-text200-375`; [header](artifacts/ux/mobile-text200-375-viewport.png), [contact](artifacts/ux/mobile-text200-375-contact.png). Runner records expected-failure `UX-001`. | Let navigation wrap at constrained widths; allow long contact/website text to wrap; preserve usable content width when root text size increases. Recheck both viewport reflow and enlarged text before shipping. |
| UX-002 | Low | UX | Not-found page has no in-page recovery and a broken skip link | Open `/qa-missing-page` directly. Inspect links; press Tab, then Enter on “Skip to main content.” | Expected: the skip link targets a main region, and the error page offers a Home link. Actual: HTTP 404 is correct, but the only link is `#main`; no such target/main landmark exists, activation leaves focus on the link, and there is no route home within the page. A visitor must use the address bar or browser history. This is an error-recovery/semantic usability finding, not an axe WCAG failure. | Shared skip link `app/layout.tsx:44`; main region is only in `app/page.tsx:11`; [404 screenshot](artifacts/ux/404-page.png), [report](artifacts/ux/ux-report.json) `errorPage.links`, `afterSkip`, and ARIA snapshot. Runner records expected-failure `UX-002`. | Add a small custom not-found page with `<main id="main">`, a clear message, and a keyboard-accessible Home link. |

## Executed checks and boundaries

- **axe-core 4.13.0**, Chromium 153: WCAG `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa` tags; zero violations across nine homepage scenarios plus the 404. The normal scenarios each passed 21 applicable rules; the 404 passed 18. Axe cannot establish complete WCAG 2.2 AA conformance.
- Scenarios: light/dark desktop 1440px; light tablet 768px; light mobile 375px; light/dark mobile 320px; root text size 200% at 1280px and 375px; reduced-motion preference at 375px. Normal reflow stayed inside every viewport. The mobile 200% scenario had one **incomplete** color-contrast rule covering ten nodes because text was obscured/overflowing; this is manual-review debt, not a measured contrast violation.
- Inspected screenshots for normal 320px header/contact, 200% mobile header/contact, dark desktop, visible skip-link focus and the 404. All screenshots and full-page captures are in [artifacts/ux](artifacts/ux/).
- Keyboard inspection traversed all 13 links in DOM order; every focus indicator was visible with a 2px outline after the skip-link entrance transition completed. Activating the homepage skip link then pressing Tab reached the main “Get in touch” link, bypassing navigation. No trap or obscured focused control was observed in the normal desktop flow. Pointer/email activation was not needed for this pass.
- ARIA snapshot verified one main landmark, a labelled Primary navigation landmark, a contentinfo footer, an h1→h2→h3→h4 hierarchy, descriptive link names and decorative icons. This is semantics inspection, **not native screen-reader speech testing**. VoiceOver/NVDA output and actual mobile assistive technology remain untested.
- `prefers-reduced-motion: reduce` retained complete readable content; the only authored motion is the 0.2s skip-link entrance. No animation-heavy flow exists. No formal vestibular-motion assessment was performed.
- This page has static server-rendered content, no form, async data query or interactive collection. Application loading, empty-list, validation and submission states are **not applicable**. The real not-found route was exercised. External link destinations and mail delivery remain intentionally untested.
- Fonts came from the root-controlled local fixture using public npm Inter/Space Grotesk variable font files, then self-hosted in the production build. Google CDN font-fetch behavior and exact CDN font-version fidelity were not tested.

The repeatable runner is [browser/ux.mjs](browser/ux.mjs). Final execution records **21 passed checks and 2 explicit expected-failure records** (`UX-001`, `UX-002`), exit 0. Unexpected reflow failures in other scenarios, axe violations, missing keyboard focus and skip-navigation regressions remain hard failures.

## Nielsen heuristic review

| Heuristic | Observed result |
| --- | --- |
| Visibility of system status | Explicit live/pre-production/dormant/prototype project labels are readable; no asynchronous state is present. |
| Match with the real world | Work, Career and Contact labels communicate their destinations; technical terminology matches the portfolio audience. External claims were not validated. |
| User control and freedom | Anchor navigation and browser history work; error-page recovery is weak (UX-002). No destructive action or modal exists. |
| Consistency and standards | Heading, link and CTA treatments are consistent across the three primary sections. |
| Error prevention | No user-input/submission workflow to validate; the contact address is shown visibly for copying. |
| Recognition rather than recall | Sticky section links and visible section headings keep destinations available; enlarged mobile text weakens this (UX-001). |
| Flexibility and efficiency | Functional homepage skip link and in-page navigation support keyboard users; normal focus indicators are visible. |
| Aesthetic and minimalist design | Text-first layout has clear heading hierarchy and no decorative motion; long content remains readable at standard tested sizes. |
| Help users recognize/recover from errors | 404 message explains the missing page but supplies no next step (UX-002). |
| Help and documentation | Contact path is explicit; no complex workflow warrants separate help content. |

## Exploratory charter record

**UX-X1**, 20-minute maximum: determine whether a first-time visitor using keyboard or mobile can understand the work and reach contact. Source preparation and execution commands are timestamped in [UX-LOG.md](UX-LOG.md). Initial browser run identified enlarged-text overflow and 404 recovery; a follow-up eliminated a false lead caused by measuring the skip link before its 0.2s animation ended, then recorded explicit expected failures. Final browser session after gate review: **2026-10-03T01:31:25.554Z–2026-10-03T01:31:36.380Z**. Gate follow-up added hard HTTP-404 and 404 axe assertions, plus an explicit valid skip-target requirement for UX-002. Manual screenshot/semantics analysis occurred before the gate follow-up rerun, within the charter timebox; the rerun regenerated screenshots with unchanged finding measurements. No production systems, native assistive readers or live external services were used.
