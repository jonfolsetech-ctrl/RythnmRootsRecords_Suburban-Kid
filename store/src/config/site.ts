import {z} from 'zod';
export const site = { name:'RhythmRoots Records', artist:'Suburban Kid', location:'New Orleans, Louisiana', contactEndpoint:'', businessEmail:'', newsletterUrl:'', socials:[] as {label:string;url:string}[] };
// Only HTTPS destinations are enabled. Configure public form endpoints, never secret keys.
export function safeUrl(value?:string):string|undefined { const result=z.url().safeParse(value); if(!result.success)return; try { const u=new URL(result.data); if(u.protocol==='https:'&&!u.username&&!u.password)return u.href; }catch { /* disabled invalid URL */ } }
