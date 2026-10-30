# RhythmRoots Records

## Live view

[**Open the Store ↗**](https://jonfolsetech-ctrl.github.io/RhythmRootRecords_Store/) · [**Open the Label ↗**](https://jonfolsetech-ctrl.github.io/RythnmRootsRecords_Suburban-Kid/)

Both sites are hosted on GitHub Pages and can be viewed on mobile or desktop.


Complete frontend music storefront for Suburban Kid, using React, TypeScript strict, Vite, Tailwind CSS, React Router, Lucide, React Hook Form and Zod.

## Run

Install Node.js 22.12+ (Node 22 LTS recommended), then:

```sh
npm ci
npm run dev
```

```sh
npm test
npm run build
npm run preview
```

The build is emitted to `dist/`. Deploy its contents to a static host with an SPA fallback: requests for application routes such as `/beats/porchlight` must return `/index.html`. Serve on HTTP(S), not as a file:// document. The app uses root-relative assets and expects hosting at the domain root.

## Included

Home, searchable beat and sample catalogs, individual product pages, music, licensing with FAQs, about, contact, selections and privacy/demo terms, plus useful 404 states. One shared HTML5 audio element persists between routes. Playback, previous/next, seek, repeat, mute, volume, loading and error states are connected to audio events. The player does not autoplay on initial load. Cart selections and volume persist in browser storage; corrupted storage is ignored safely.

All catalog entries and prices are explicitly demo content. Six beat concepts, six sample-pack concepts and one release concept are included. Four locally synthesized 16-second WAV previews are reused across products solely to demonstrate the player. SVG sleeve artwork is original procedural illustration. Catalog art and audio are served locally; optional Google Fonts use external requests with system fallbacks. No official music, artist portrait, sample downloads, streaming profiles, checkout URLs or artist achievements are invented.

## Configure before commercial launch

- `src/config/site.ts`: business email, official social URLs, HTTPS contact endpoint, hosted newsletter destination. `contactEndpoint` supports a Formspree-compatible JSON POST accepting name, email, type, subject, message, reference. Use only a public endpoint; never put secret credentials in frontend files. Test endpoint CORS, spam protection and response behavior with the provider.
- `src/data/beats.ts`: replace demo beats and metadata with authorized products, preview URLs and actual availability.
- `src/data/licensing.ts`: replace illustrative prices and summaries with real offerings. Put a product-specific HTTPS checkout URL on each beat's license option (copy shared tiers per beat before customizing). Never use a generic provider homepage as a checkout destination.
- `src/data/samples.ts`: actual pack counts, formats, contents, rights, preview and product-specific purchase URL.
- `src/data/releases.ts`: actual release types, dates and verified streaming destinations. Missing links remain visibly unconfigured.
- `src/pages/Other.tsx`: replace demo legal text with operator details and applicable privacy/terms; link actual controlling license agreements before selling. Add official biography and imagery when supplied.

To enable live inventory, replace the demo entries and remove or update demo notices intentionally after validating every claim. Demo disclosures are deliberately visible throughout this version. Digital selections are unique per product and tier, so quantity controls are not meaningful. Each configured external checkout opens separately with noopener/noreferrer. Only HTTPS URLs without embedded credentials are enabled. Missing destinations offer a contact inquiry. No internal payment collection exists.

## Contact behavior

The form validates required fields and preserves the draft on errors. With no endpoint it says explicitly that nothing was sent. With an endpoint it reports success only after an HTTP success response and handles failure/timeouts. Contact drafts are not stored locally. Newsletter signup remains an honest integration placeholder until a destination is configured.

## Accessibility and motion

Semantic regions, labeled controls, keyboard focus styles, skip link, reduced-motion overrides, responsive grids and dedicated space for the bottom audio player. Layouts cover 320px through large desktop sizes. Google Fonts use system serif/sans fallbacks when unavailable.

## Tests

Vitest and Testing Library cover combined catalog filters and sorting, unsafe URL rejection, corrupt selection storage, license-aware cart deduplication and pricing, rendered search/reset, and validation without network submission. Run `npm test` and `npm run build` before deployment.

## Architecture and project map

- `src/main.tsx`: application entry, router and error boundary.
- `src/components/Layout.tsx`: shared navigation, mobile menu, footer and route shell.
- `src/components/RouteMetadata.tsx`: per-route and product titles, descriptions, canonical and Open Graph tags.
- `src/components/UI.tsx`: reusable product cards, preview controls, section headings, empty states and external purchase actions.
- `src/pages/`: Home, Catalog, Detail, Contact, and editorial/licensing/cart/legal pages in Other.
- `src/state/Player.tsx`: one persistent HTML5 audio element and shared playback context.
- `src/state/Store.tsx`: reducer-based saved selections with storage recovery.
- `src/lib/catalog.ts`: combined filtering, sorting, pricing and selection recovery.
- `src/lib/productSchema.ts`: runtime Zod validation of discriminated product data, URLs, unique IDs and routes.
- `src/data/`: beats, samples, releases and illustrative license tiers.
- `src/config/`: public business integrations and SEO settings.
- `public/art`, `public/audio`: editable SVG cover art and synthesized WAV demo previews.
- `scripts/seo.mjs`: production robots and sitemap generation.
- `src/styles.css`: Tailwind integration, design tokens and responsive vintage styling.
- `src/app.test.tsx`: catalog, commerce, schema and form behavior tests.

## SEO and deployment

Copy `.env.example` to `.env.local` and supply the actual verified HTTPS root origin in `VITE_SITE_URL`. Leave it empty for local/demo work. Canonical and Open Graph URLs are omitted until a real origin is supplied. Set `VITE_ENABLE_INDEXING=true` only after replacing demo inventory and reviewing business/legal content. Rebuild after changes.

The production build generates `robots.txt` and `sitemap.xml`. Demo mode disallows crawling and emits an empty sitemap, with no fabricated domain. The launch sitemap includes the main editorial/catalog routes and excludes private utility pages. Add verified live product routes to the generator when launching real inventory. Demo products deliberately emit no Product/Offer structured data. Add structured data only after supplying accurate live product status, prices, currency, authorized imagery and actual purchase destinations.

This is a client-rendered SPA: route metadata updates in the browser, but crawlers and social link unfurlers that do not execute JavaScript may see only the generic HTML metadata. For strong product indexing and route-specific social previews, add prerendering or server rendering before launch. SPA fallback hosting is required. `public/_redirects` supplies a Netlify-compatible fallback; configure equivalent rewrites on other hosts.

Typography uses Google Fonts (Playfair Display and DM Sans) with system fallbacks. These remote font requests can be removed or replaced with licensed self-hosted files if preferred; the storefront remains usable without them.

## Manual launch checklist and limits

- Visit every route and unknown product slug; confirm navigation and useful 404 states.
- Test at 320px, tablet, laptop and desktop widths; check player spacing and keyboard focus.
- Try combined catalog search, all filters, empty results, sorting and reset.
- Play, pause, switch, seek, mute, change volume, repeat and navigate while playing; verify failed media behavior with an unavailable preview URL.
- Save different license tiers, refresh, remove entries and clear selections.
- Configure one real purchase link per product/tier; confirm its exact destination and seller terms. Payments, sale confirmation and delivery belong to the external provider.
- Test contact validation, an actual successful provider response, failed requests and timeouts. No actual contact provider is configured or verified in this demo.
- Review all actual audio/artwork permissions and product counts, formats, prices and controlling contracts.
- Supply official release details, approved biography, studio photography, business contact, social accounts and reviewed legal policies.
- Build and run tests after editing configuration. Client-side metadata and generated discovery files do not replace prerendering for strong SEO.
