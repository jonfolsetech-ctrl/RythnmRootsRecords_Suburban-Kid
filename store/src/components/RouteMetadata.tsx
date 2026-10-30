import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {catalog} from '../lib/catalog';
import {indexingEnabled,publicOrigin} from '../config/seo';
const pages:Record<string,[string,string]>={
 '/':['Southern roots. Modern rhythm.','Explore the RhythmRoots Records demo storefront: beats, soulful samples, music and licensing inspired by New Orleans.'],
 '/beats':['Beat store','Search and filter Blues, Jazz, Southern Trap and Fusion beat concepts. Preview demo audio and explore illustrative license options.'],
 '/samples':['Sample marketplace','Explore demo sample packs, drum kits, instrument loops and one-shots, with transparent example contents and prices.'],
 '/music':['Music & releases','Discover the listening experience for Suburban Kid. Release concepts and synthesized previews are clearly identified as demos.'],
 '/licensing':['Music licensing','Compare illustrative Basic, Premium, Trackout and Exclusive licensing options and inquire about a custom agreement.'],
 '/about':['Our story','Meet the creative direction behind RhythmRoots Records and Suburban Kid: New Orleans roots, blues feeling, jazz color and Southern trap.'],
 '/contact':['Contact & collaborations','Prepare an inquiry about custom beats, music licensing, production or collaboration with RhythmRoots Records.'],
 '/cart':['Saved selections','Review your saved beat licenses and sample packs. Purchases complete individually through configured external providers.'],
 '/legal':['Privacy & demo terms','Read the RhythmRoots Records demonstration privacy and terms placeholders, browser storage information and licensing limitations.']
};
function meta(key:string,value:string,property=false){const attribute=property?'property':'name';let node=document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);if(!node){node=document.createElement('meta');node.setAttribute(attribute,key);document.head.append(node)}node.content=value;}
export function RouteMetadata(){const {pathname:rawPathname}=useLocation();const pathname=rawPathname.replace(/\/+$/,'')||'/';useEffect(()=>{
 const product=catalog.find(p=>`/${p.productType==='beat'?'beats':'samples'}/${p.slug}`===pathname&&p.productType!=='release');
 const [title,description]=product?[`${product.title} · Demo ${product.productType}`,product.description]:pages[pathname]??['Page not found','This page is not in the RhythmRoots Records collection.'];
 const fullTitle=`${title} | RhythmRoots Records`;document.title=fullTitle;meta('description',description);meta('og:title',fullTitle,true);meta('og:description',description,true);meta('og:type','website',true);meta('og:site_name','RhythmRoots Records',true);meta('twitter:card','summary');
 meta('robots',indexingEnabled&&(!!pages[pathname]||product?.status==='available')&&pathname!=='/cart'&&pathname!=='/contact'?'index,follow':'noindex,follow');
 let canonical=document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
 if(publicOrigin){if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.append(canonical)}canonical.href=publicOrigin+pathname;meta('og:url',publicOrigin+pathname,true);meta('og:image',publicOrigin+'/art/cover-0.svg',true)}else{canonical?.remove();document.head.querySelector('meta[property="og:url"]')?.remove();}
 // Demo products deliberately emit no Product/Offer structured data.
 },[pathname]);return null;}
