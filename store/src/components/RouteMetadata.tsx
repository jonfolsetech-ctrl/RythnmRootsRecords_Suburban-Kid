import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import pageMetadata from '../config/page-metadata.json';
import {catalog} from '../lib/catalog';
import {indexingEnabled,publicOrigin} from '../config/seo';
const pages:Record<string,string[]>=pageMetadata;
function meta(key:string,value:string,property=false){const attribute=property?'property':'name';let node=document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);if(!node){node=document.createElement('meta');node.setAttribute(attribute,key);document.head.append(node)}node.content=value;}
export function RouteMetadata(){const {pathname:rawPathname}=useLocation();const pathname=rawPathname.replace(/\/+$/,'')||'/';useEffect(()=>{
 const product=catalog.find(p=>`/${p.productType==='beat'?'beats':'samples'}/${p.slug}`===pathname&&p.productType!=='release');
 const [title,description]=product?[`${product.title} · Demo ${product.productType}`,product.description]:pages[pathname]??['Page not found','This page is not in the RhythmRoots Records collection.'];
 const fullTitle=`${title} | RhythmRoots Records`;document.title=fullTitle;meta('description',description);meta('og:title',fullTitle,true);meta('og:description',description,true);meta('og:type','website',true);meta('og:site_name','RhythmRoots Records',true);meta('twitter:card','summary');
 meta('robots',indexingEnabled&&(!!pages[pathname]||product?.status==='available')&&!['/cart','/contact','/legal'].includes(pathname)?'index,follow':'noindex,follow');
 let canonical=document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
 if(publicOrigin){if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.append(canonical)}const url=publicOrigin+(pathname==='/'?'/':pathname+'/');canonical.href=url;meta('og:url',url,true);meta('og:image','https://jonfolsetech-ctrl.github.io/RythnmRootsRecords_Suburban-Kid/rhythmroots-records-logo.png',true)}else{canonical?.remove();document.head.querySelector('meta[property="og:url"]')?.remove();}
 // Demo products deliberately emit no Product/Offer structured data.
 },[pathname]);return null;}
