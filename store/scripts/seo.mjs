import {writeFile} from 'node:fs/promises';
import {loadEnv} from 'vite';
const env={...loadEnv('production',process.cwd(),''),...process.env};
let origin='';try{const url=new URL(env.VITE_SITE_URL);if(url.protocol==='https:'&&!url.username&&!url.password&&url.pathname==='/')origin=url.origin;}catch{}
const enabled=env.VITE_ENABLE_INDEXING==='true'&&!!origin;
const routes=['/','/beats','/samples','/music','/licensing','/about','/legal'];
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
await writeFile('dist/robots.txt',enabled?`User-agent: *\nAllow: /\nDisallow: /cart\nDisallow: /contact\nSitemap: ${origin}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n');
await writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${enabled?routes.map(route=>`<url><loc>${escape(origin+route)}</loc></url>`).join(''):''}</urlset>\n`);
console.log(enabled?'SEO files generated for '+origin:'Demo indexing disabled; no unverified domain emitted.');
