import {readFile,access} from 'node:fs/promises';
import assert from 'node:assert/strict';
const base='https://jonfolsetech-ctrl.github.io/RythnmRootsRecords_Suburban-Kid/';
const xml=await readFile('_site/sitemap.xml','utf8');
const urls=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
const products=JSON.parse(await readFile('store/.prerender/products.json','utf8'));
const pages=JSON.parse(await readFile('store/src/config/page-metadata.json','utf8'));
const expected=[base,...Object.keys(pages).filter(route=>!['/cart','/contact','/legal'].includes(route)).map(route=>base+'store/'+(route==='/'?'':route.slice(1)+'/')),...products.filter(p=>p.status==='available').map(p=>base+'store'+p.route+'/')];
assert.deepEqual([...urls].sort(),expected.sort());assert.equal(new Set(urls).size,urls.length);
for(const url of urls){
 assert.ok(url.startsWith(base));const suffix=url.slice(base.length);const html=await readFile('_site/'+suffix+'index.html','utf8');
 assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,url+' must have one visible H1');
 assert.ok(html.includes('<div id="root"><'),url+' must contain rendered content');
 assert.equal((html.match(/rel="canonical"/g)||[]).length,1);assert.ok(html.includes(`rel="canonical" href="${url}"`));
 assert.ok(!html.includes('noindex'));assert.ok(html.includes('google-site-verification')===!suffix);
 for(const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/g))JSON.parse(match[1]);
 for(const match of html.matchAll(/(?:src|href)="(\/RythnmRootsRecords_Suburban-Kid\/[^"#?]*)"/g)){
  const relative=match[1].replace('/RythnmRootsRecords_Suburban-Kid/','');
  if(relative.includes('://'))continue;
  const file='_site/'+relative;try{await access(file)}catch{await access(file.replace(/\/$/,'')+'/index.html')}
 }
}
for(const path of ['404.html','store/cart/index.html','store/contact/index.html','store/legal/index.html'])assert.ok((await readFile('_site/'+path,'utf8')).includes('noindex,follow'));
for(const p of products){const html=await readFile('_site/store'+p.route+'/index.html','utf8');assert.ok(html.includes('<h1'));if(p.status!=='available'){assert.ok(html.includes('noindex,follow'));assert.ok(!urls.includes(base+'store'+p.route+'/'));}}
console.log(`SEO checks passed: ${urls.length} rendered, indexable pages; canonicals, H1s, JSON-LD, internal assets/links and noindex controls.`);
