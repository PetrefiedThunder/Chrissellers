# WARP.md

Guidance for WARP (warp.dev) when working in this repository.

## Project Overview

Personal site and portfolio for Christopher Sellers (chrissellers.com). One
statically-rendered page: hero, selected work, career, contact.

**Stack:** Next.js 16 (App Router), React 18, TypeScript, Tailwind CSS, Jest.

**Live at https://chrissellers.vercel.app**, auto-deployed from `main` via
Vercel's GitHub integration (configured dashboard-side, so no `vercel.json` or
`.vercel/` exists in the repo). `chrissellers.com` is NOT connected — it points
at HostGator and returns 403.

## Commands

```bash
npm run dev     # dev server at http://localhost:3000
npm run build   # production build
npm run lint    # eslint (flat config — eslint.config.mjs)
npm test        # content validation tests
```

## Architecture

The whole site is **React Server Components**. There is no `'use client'`
anywhere, no state management, and no client-side data fetching. Content is
rendered into the HTML at build time.

```
app/
├── layout.tsx            # fonts, metadata (reads src/content/profile.ts)
├── page.tsx              # composes the sections
├── opengraph-image.tsx   # social card, generated at build from profile.ts
└── globals.css           # design tokens (light + dark), skip link

src/
├── content/              # ALL copy lives here
│   ├── profile.ts        # name, headline, bio, links
│   ├── work.ts           # projects: `featured` and `other`
│   └── career.ts         # roles, reverse-chronological
└── components/           # Nav, Hero, Work, Career, Contact — layout only
```

## Rules to preserve

1. **Do not introduce client components.** If a change seems to need `'use
   client'`, that is a signal to reconsider the change. The zero-JS property is
   deliberate: this page is opened from LinkedIn links on phones.
2. **Edit copy in `src/content/`, never in JSX.** Components lay out data; they
   do not contain prose.
3. **Do not add animation libraries.** Scroll-reveal animations were tried and
   removed — they made content invisible by default, which risks a blank section
   whenever the animation does not run.
4. **Never claim what the code cannot back.** Project `status` fields say
   "Pre-production" and "Built, not shipped" on purpose. These are accurate, not
   placeholders awaiting better numbers.

## Styling

Semantic tokens in `app/globals.css` as space-separated RGB channels, consumed
via Tailwind with `<alpha-value>` support. Dark mode is `prefers-color-scheme`
only — there is no theme toggle.

Colors are chosen to meet WCAG AA (4.5:1). If you change `--color-sage` or
`--color-slate`, re-check contrast against both `--bg-page` and `--bg-surface`.

## Tests

`__tests__/content.test.ts` validates the content files, not the markup: every
project has a status, descriptions are substantive, links are well-formed. It
does not verify links resolve — see the note in that file.

## Known follow-ups

- `siteUrl` in `src/content/profile.ts` must point at a host that actually
  serves the site; it feeds `metadataBase` and therefore every og:image URL.
- `RegEngine_PRD.md` in the repo root is RegEngine product material that belongs
  in the RegEngine repo, not here.
- The contact CTA uses `hello@chrissellers.com`. That domain's MX points at
  HostGator mail, not the Google Workspace that serves the
  `christophersellers.com` address — worth confirming it is monitored.
