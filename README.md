# RhythmRoots Records — Suburban Kid

**Live website:** https://jonfolsetech-ctrl.github.io/RythnmRootsRecords_Suburban-Kid/

A mobile-friendly static website concept for RhythmRoots Records, rooted in Louisiana culture and independent music, featuring the Suburban Kid artist spotlight.

## Website files

- `rhythmroots_records_github/index.html` — website markup
- `rhythmroots_records_github/styles.css` — responsive styling
- `rhythmroots_records_github/script.js` — navigation, footer year, and email-form behavior
- `rhythmroots_records_github/assets/` — logo artwork
- `.github/workflows/deploy-pages.yml` — deploys the repository to GitHub Pages on pushes to `main`

The root `index.html` redirects visitors to the website folder so the repository Pages URL opens the site.

## Run locally

Open `rhythmroots_records_github/index.html` in a browser, or serve the repository with any static file server. No framework build is required for the deployed HTML/CSS/JavaScript site.

## Before announcing the site

1. Replace `YOUR-LABEL-EMAIL@example.com` in `rhythmroots_records_github/script.js` with the official contact email.
2. Add approved artist photos, verified biography details, and real music/release links.
3. Test the website on mobile and desktop.

The contact form currently opens a prefilled email when configured; it is not connected to a server or database. Artist and release cards are concept placeholders until approved details and official links are added.

## Suno music integration

The deployed React/Vite music section in `rhythmroots_records_github/src/Premium.jsx` links directly to the RythmRootsRecords Suno profile:

- Profile: https://suno.com/@rythmnrootsrecords
- First shared track: https://suno.com/s/V3sWCeB1IsMmwA77

Tracks are configured in the `SUNO_TRACKS` array near the top of `Premium.jsx`. Each item can have a verified `title` and `url`; for a verified canonical Suno song UUID, add an `id` to display a Suno-hosted embed player. Do not use the short share code as the embed UUID. Check the embed in a real browser before advertising in-page playback.

This is a **public-link integration**, not an authenticated Suno account connection or an automatic library sync. GitHub Pages is static hosting; authenticated synchronization would require a separately supported backend, authorization and secure server-side credential storage. Never commit Suno credentials to the repository. Only publish or monetize tracks when you hold the required rights and permissions.
