import {cp,mkdir,writeFile,rm} from 'node:fs/promises';
await rm('_site',{recursive:true,force:true});
await mkdir('_site',{recursive:true});
await cp('rhythmroots_records_github/dist','_site',{recursive:true});
await cp('store/dist','_site/store',{recursive:true});
await writeFile('_site/.nojekyll','');
const base='/RythnmRootsRecords_Suburban-Kid/';
const redirect=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>RhythmRoots Records</title><meta http-equiv="refresh" content="0;url=${base}"><script>location.replace(${JSON.stringify(base)}+location.search+location.hash)</script></head><body><a href="${base}">Open RhythmRoots Records</a></body></html>`;
for(const path of ['premium','rhythmroots_records_github']){await mkdir(`_site/${path}`,{recursive:true});await writeFile(`_site/${path}/index.html`,redirect);}
// Materialize top-level routes so bookmarked pages return HTTP 200 on Pages.
for(const route of ['beats','samples','music','licensing','about','contact','cart','legal']){
  await mkdir(`_site/store/${route}`,{recursive:true});
  await cp('store/dist/index.html',`_site/store/${route}/index.html`);
}
// Product deep links and unknown store routes retain the application fallback.
await cp('store/dist/index.html','_site/404.html');
await import('./prerender.mjs');
await import('./seo-site.mjs');
