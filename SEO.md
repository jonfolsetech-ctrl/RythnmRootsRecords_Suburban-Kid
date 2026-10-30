# National SEO foundation

The label and store target a U.S. audience around jazz, blues, soul and Southern instrumental music. The site keeps its New Orleans identity and does not claim offices in other cities.

## Publishing

Both apps compile with TypeScript. `scripts/prerender.mjs` renders the same React components used in the browser into static HTML, including catalog and product routes. `scripts/seo-site.mjs` adds titles, descriptions, canonical URLs, social metadata, Organization/WebSite, page and breadcrumb JSON-LD. The existing Google verification tag is preserved.

The single public sitemap is `/sitemap.xml`. The Search Console property already uses this URL. Demo products and cart/contact/legal utility pages remain `noindex,follow`; demo products have no fabricated sales offers or reviews. Genre guides are real linked editorial pages rather than duplicated city/state landing pages.

Run `node scripts/assemble.mjs` after both app builds, then `node scripts/check-seo.mjs`. CI runs these checks before publishing. The check validates visible rendered headings, one canonical per URL, valid JSON-LD, local links/assets and indexing controls.

GitHub Pages project-level robots.txt files do not govern the host. Only `https://jonfolsetech-ctrl.github.io/robots.txt` can do that; the page-level indexing controls and submitted sitemap are authoritative for this project.

## Ongoing work

Use Search Console's Pages and Performance reports to review indexing, impressions and U.S. queries. Improve guides and recordings based on actual visitor needs. Add real releases, approved cover art and license details when available. Only mark products available after official files, purchase links and rights are configured. No ranking or indexing position is guaranteed.
