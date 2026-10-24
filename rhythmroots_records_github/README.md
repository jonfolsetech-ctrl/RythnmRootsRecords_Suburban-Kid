# RhythmRoots Records — GitHub-ready website

Responsive static HTML/CSS site with TypeScript behavior, using the supplied RhythmRoots Records logo and the tagline **From Footsteps to Frequencies**.

## Included
- `index.html` — website sections and SEO metadata
- `styles.css` — responsive black, antique-gold, and ivory brand styling
- `script.ts` — typed mobile navigation, year, and contact-form behavior
- `script.js` — compiled browser script loaded by the page
- `tsconfig.json` — TypeScript compiler configuration
- `assets/rhythmroots-records-logo.png` — provided logo

## Before launch
1. In `script.ts`, replace `YOUR-LABEL-EMAIL@example.com` with the real label inbox, then rebuild.
2. Replace concept release artwork/text with confirmed releases and official links.
3. Add approved artist biographies, photos, social links, and streaming profiles.
4. The contact form is a starter only; it opens an email draft after setup and is not connected to a server.
5. Google Fonts are loaded remotely; system fallback fonts are provided.

## Publish with GitHub Pages
1. Create a repository such as `rhythmroots-records`.
2. Extract this ZIP and upload the **contents** of `rhythmroots_records_github` to the repository root. Ensure `index.html` is at the root.
3. Open repository **Settings → Pages**.
4. Select **Deploy from a branch**, choose branch `main` and folder `/ (root)`, then save.
5. Wait for deployment. GitHub Pages will show the published URL in Settings → Pages.

## Build
Install dependencies and compile the TypeScript source:

```sh
npm install
npm run build
```

The build writes `script.js`, which the static page loads directly. Publish the compiled file with the rest of the site.
