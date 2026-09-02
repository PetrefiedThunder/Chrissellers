# chrissellers.com

Personal site and portfolio for Christopher Sellers. A single statically-rendered
page: positioning, selected work, career, and contact.

## Design constraints

The site is a credibility surface — the thing linked from LinkedIn, email
signatures, and cold outreach. That drives three rules:

1. **Zero client JavaScript components.** Every component is a React Server
   Component. Content arrives in the HTML, so it survives slow connections,
   crawlers, and link-preview bots. The only JS shipped is the React runtime.
2. **Content lives in `src/content/`, not in JSX.** Copy is edited in three data
   files; components only lay it out.
3. **No claim the code cannot back up.** Every project states its real status —
   including "pre-production" and "built, not shipped."

## Editing content

| File | What it holds |
| --- | --- |
| `src/content/profile.ts` | Name, headline, bio, contact links. Also feeds page metadata and the generated OG image. |
| `src/content/work.ts` | Projects, split into `featured` and `other`. |
| `src/content/career.ts` | Roles, in reverse-chronological order. |

The social preview image (`app/opengraph-image.tsx`) is generated at build time
from `profile.ts` — edit the headline and the card follows.

## Commands

```bash
npm run dev     # local dev server
npm run build   # production build
npm run lint    # eslint (flat config)
npm test        # content validation tests
```

## Tests

`__tests__/content.test.ts` validates the content files rather than the markup:
every project has a status, descriptions are non-trivial, and links are
well-formed. This catches a half-finished content edit before it ships. It does
**not** check that links resolve — see the note in that file for the trade-off.

## Stack

Next.js 16 (App Router) · React 18 · TypeScript · Tailwind CSS · Jest

## Deployment

**This repository is not currently wired to deploy anywhere.** There is no
`vercel.json`, no `.vercel/` link, and CI builds an artifact without publishing
it. `chrissellers.com` currently resolves to HostGator shared hosting
(Apache, `hgns*.hostgator.com` nameservers) and returns HTTP 403.

To publish this site, either point `chrissellers.com` at a Vercel project built
from this repo, or add a deploy step to `.github/workflows/ci.yml`. The site is
fully static, so any static host will serve it.
