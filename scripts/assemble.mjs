import {cp,mkdir,writeFile} from 'node:fs/promises';
await mkdir('_site',{recursive:true});
await cp('rhythmroots_records_github/dist','_site',{recursive:true});
await cp('store/dist','_site/store',{recursive:true});
await writeFile('_site/.nojekyll','');
const base='/RythnmRootsRecords_Suburban-Kid/';
const redirect=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>RhythmRoots Records</title><meta http-equiv="refresh" content="0;url=${base}"><script>location.replace(${JSON.stringify(base)}+location.search+location.hash)</script></head><body><a href="${base}">Open RhythmRoots Records</a></body></html>`;
for(const path of ['premium','rhythmroots_records_github']){await mkdir(`_site/${path}`,{recursive:true});await writeFile(`_site/${path}/index.html`,redirect);}
// GitHub Pages serves this shell for direct visits to nested store routes.
await cp('store/dist/index.html','_site/404.html');
