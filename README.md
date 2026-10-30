# RhythmRoots Records — Suburban Kid

## Live view

[**Open the Store ↗**](https://jonfolsetech-ctrl.github.io/RhythmRootRecords_Store/) · [**Open the Label ↗**](https://jonfolsetech-ctrl.github.io/RythnmRootsRecords_Suburban-Kid/)

Both sites are hosted on GitHub Pages and can be viewed on mobile or desktop.


A mobile-friendly static website concept for RhythmRoots Records, rooted in Louisiana culture and independent music, featuring the Suburban Kid artist spotlight.

## TypeScript website

The live label is a React + TypeScript application built with Vite and Tailwind CSS.

- `rhythmroots_records_github/src/main.tsx` — browser entry point
- `rhythmroots_records_github/src/App.tsx` — application root
- `rhythmroots_records_github/src/Premium.tsx` — label page and typed track data
- `rhythmroots_records_github/src/brand.css` — shared branding
- `rhythmroots_records_github/vite.config.ts` — build and GitHub Pages base URL
- `.github/workflows/deploy-pages.yml` — builds and deploys on pushes to `main`

## Run locally

```sh
cd rhythmroots_records_github
npm install
npm run dev
```

`npm run typecheck` checks the TypeScript source. `npm run build` runs strict type checking before producing the static site. GitHub Pages serves the compiled output at `/premium/`; the repository root redirects there.

The older standalone HTML/CSS and `script.ts` files are legacy assets, not the deployed React entry point.

## Suno music integration

The deployed React/Vite music section in `rhythmroots_records_github/src/Premium.tsx` links directly to the RythmRootsRecords Suno profile:

- Profile: https://suno.com/@rythmnrootsrecords
- First shared track: https://suno.com/s/V3sWCeB1IsMmwA77

Tracks are configured in the `SUNO_TRACKS` array near the top of `Premium.tsx`. Each item can have a verified `title` and `url`; for a verified canonical Suno song UUID, add an `id` to display a Suno-hosted embed player. Do not use the short share code as the embed UUID. Check the embed in a real browser before advertising in-page playback.

This is a **public-link integration**, not an authenticated Suno account connection or an automatic library sync. GitHub Pages is static hosting; authenticated synchronization would require a separately supported backend, authorization and secure server-side credential storage. Never commit Suno credentials to the repository. Only publish or monetize tracks when you hold the required rights and permissions.
