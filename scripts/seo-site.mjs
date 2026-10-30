import {readFile,writeFile,mkdir} from 'node:fs/promises';
const base='https://jonfolsetech-ctrl.github.io/RythnmRootsRecords_Suburban-Kid/';
const image=base+'rhythmroots-records-logo.png';
const pages=JSON.parse(await readFile('store/src/config/page-metadata.json','utf8'));
const escape=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const graph={'@context':'https://schema.org','@graph':[{'@type':'Organization','@id':base+'#organization',name:'RhythmRoots Records',url:base,logo:image,description:'Independent music and instrumental inspiration rooted in New Orleans.',areaServed:{'@type':'Country',name:'United States'},sameAs:['https://suno.com/@rythmnrootsrecords']},{'@type':'WebSite','@id':base+'#website',url:base,name:'RhythmRoots Records',inLanguage:'en-US',publisher:{'@id':base+'#organization'}}]};
const urls=[];
async function metadata(file,url,title,description,index=true){
 let html=await readFile(file,'utf8');
 html=html.replace(/<title>[\s\S]*?<\/title>/,'').replace(/<meta\b[^>]*(?:name="(?:description|robots|twitter:[^"]*)"|property="og:[^"]*")[^>]*>/g,'').replace(/<link\b[^>]*rel="canonical"[^>]*>/g,'');
 const breadcrumb=[{'@type':'ListItem',position:1,name:'RhythmRoots Records',item:base}];
 if(url!==base)breadcrumb.push({'@type':'ListItem',position:2,name:'Instrumental store',item:base+'store/'});
 if(url!==base&&url!==base+'store/')breadcrumb.push({'@type':'ListItem',position:3,name:title.split(' | ')[0],item:url});
 const pageGraph={'@context':'https://schema.org','@graph':[{'@type':url.includes('/instrumentals/')?'Article':'WebPage','@id':url+'#page',url,name:title,headline:title,author:{'@id':base+'#organization'},description,inLanguage:'en-US',isPartOf:{'@id':base+'#website'},publisher:{'@id':base+'#organization'}}, {'@type':'BreadcrumbList',itemListElement:breadcrumb}]};
 const tags=`<title>${escape(title)}</title><meta name="description" content="${escape(description)}"><meta name="robots" content="${index?'index,follow,max-image-preview:large':'noindex,follow'}"><link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:site_name" content="RhythmRoots Records"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${image}"><meta property="og:locale" content="en_US"><meta name="twitter:card" content="summary"><meta name="twitter:title" content="${escape(title)}"><meta name="twitter:description" content="${escape(description)}"><meta name="twitter:image" content="${image}"><script id="site-structured-data" type="application/ld+json">${JSON.stringify(graph).replaceAll('<','\\u003c')}</script><script id="page-structured-data" type="application/ld+json">${JSON.stringify(pageGraph).replaceAll('<','\\u003c')}</script>`;
 html=html.replace('</head>',tags+'</head>');await writeFile(file,html);if(index)urls.push(url);
}
await metadata('_site/index.html',base,'Jazz, Blues & Soul Instrumentals | RhythmRoots Records','Independent music and instrumentals for artists across the United States. Explore jazz, blues, soul and Southern trap from New Orleans with RhythmRoots Records.');
for(const [route,[title,description]] of Object.entries(pages)){
 const suffix=route==='/'?'':route.slice(1)+'/';
 const file=`_site/store/${suffix}index.html`;
 await metadata(file,base+'store/'+suffix,title+' | RhythmRoots Records',description,!['/cart','/contact','/legal'].includes(route));
}
const products=JSON.parse(await readFile('store/.prerender/products.json','utf8'));
for(const product of products){const suffix=product.route.slice(1)+'/';await metadata('_site/store/'+suffix+'index.html',base+'store/'+suffix,product.title+' | RhythmRoots Records',product.description,product.status==='available');}
// Unknown pages and demo product fallbacks stay out of search results.
await metadata('_site/404.html',base+'store/','Page not found | RhythmRoots Records','Explore the RhythmRoots Records instrumental demo catalog.',false);
const sitemap=`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url=>`<url><loc>${escape(url)}</loc></url>`).join('')}</urlset>`;
await writeFile('_site/sitemap.xml',sitemap);
await writeFile('_site/store/sitemap.xml',sitemap);
// GitHub Pages serves robots.txt only at the account domain root. Supply a project file
// for portability; sitemap URLs and page-level robots metadata work independently.
const robots=`User-agent: *\nAllow: /RythnmRootsRecords_Suburban-Kid/\nSitemap: ${base}sitemap.xml\n`;
await writeFile('_site/robots.txt',robots);await writeFile('_site/store/robots.txt',robots);
