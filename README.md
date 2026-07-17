# BetterAlaminosCity.org

A volunteer-run civic-tech guide to Alaminos City, Pangasinan government services. Not an official website of the Alaminos City government — see the in-app About page for details.

## Tech Stack

React 19 + TypeScript, React Router v8 (Framework Mode, static prerendering), Tailwind CSS v4 + [@bettergov/kapwa](https://github.com/bettergovph/kapwa), i18next (English/Filipino), Vitest + Testing Library.

## Development

```bash
npm install
npm run dev        # start the dev server
npm test           # run the test suite
npm run typecheck  # react-router typegen + tsc
npm run build      # static production build (build/client/)
```

This project's `.npmrc` sets `legacy-peer-deps=true` — required because `typescript@^7` is ahead of some dependencies' declared peer ranges.

## Deployment

Deploys to Vercel as a static site (`vercel.json` points at `build/client/`) — no Node server at runtime.
