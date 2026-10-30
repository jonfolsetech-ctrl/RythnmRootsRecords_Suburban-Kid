import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {createRequire} from 'node:module';
const pages=JSON.parse(await readFile('store/src/config/page-metadata.json','utf8'));
for(const [project,routes,prefix] of [['rhythmroots_records_github',['/'],''],['store',Object.keys(pages),'/store']]){
 const root=resolve(project);const require=createRequire(resolve(root,'package.json'));
 const {build}=await import(resolve(dirname(require.resolve('vite/package.json')),'dist/node/index.js'));
 await build({root,build:{ssr:'src/entry-server.tsx',outDir:'.prerender',emptyOutDir:true,minify:false}});
 try{
  const {render,productPages=[]}=await import(resolve(root,'.prerender/entry-server.js'));
  const template=await readFile(project+'/dist/index.html','utf8');
  if(project==='store')await writeFile(root+'/.prerender/products.json',JSON.stringify(productPages));
  for(const route of [...routes,...productPages.map(p=>p.route)]){
   const suffix=route==='/'?'':route.slice(1)+'/';
   const target='_site'+prefix+'/'+suffix;await mkdir(target,{recursive:true});
   const markup=render('/RythnmRootsRecords_Suburban-Kid'+prefix+(route==='/'?'/':route+'/'));
   if(!markup.includes('<h1'))throw new Error('Missing rendered content: '+route);
   await writeFile(target+'index.html',template.replace('<div id="root"></div>',()=>`<div id="root">${markup}</div>`));
  }
 }finally{/* build output is kept outside the published directory */}
}
