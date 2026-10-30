import {z} from 'zod';
const externalUrl=z.url().refine(value=>{try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password;}catch{return false;}},'Use an HTTPS URL without credentials.');
const assetUrl=z.string().min(1).refine(value=>value.startsWith('/')&&!value.startsWith('//')||externalUrl.safeParse(value).success,'Use a root-relative asset path or HTTPS URL.');
export const licenseSchema=z.object({id:z.string().min(1),title:z.string().min(1),price:z.number().nonnegative().nullable(),formats:z.string(),description:z.string(),purchaseUrl:externalUrl.optional()});
const base={id:z.string().min(1),slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),title:z.string().min(1),description:z.string().min(1),genre:z.enum(['Blues','Jazz','Southern Trap','Fusion']),mood:z.string(),artworkUrl:assetUrl,previewAudioUrl:assetUrl.optional(),price:z.number().nonnegative(),currency:z.literal('USD'),durationSeconds:z.number().positive(),tags:z.array(z.string()),featured:z.boolean(),releaseDate:z.iso.date().optional(),purchaseUrl:externalUrl.optional(),status:z.enum(['demo','available','coming-soon'])};
export const productSchema=z.discriminatedUnion('productType',[
 z.object({...base,productType:z.literal('beat'),bpm:z.number().positive(),musicalKey:z.string().min(1),licenseOptions:z.array(licenseSchema).min(1)}),
 z.object({...base,productType:z.literal('sample'),category:z.string(),soundCount:z.number().int().nonnegative(),format:z.string(),contents:z.array(z.string()),licenseSummary:z.string()}),
 z.object({...base,productType:z.literal('release'),releaseType:z.enum(['Single','EP','Album','Instrumental']),streaming:z.array(z.object({label:z.string(),url:externalUrl.optional()}))})
]);
export const catalogSchema=z.array(productSchema).superRefine((products,ctx)=>{const ids=new Set<string>();const paths=new Set<string>();products.forEach((p,index)=>{const path=`${p.productType}/${p.slug}`;if(ids.has(p.id)||paths.has(path))ctx.addIssue({code:'custom',path:[index],message:'Duplicate product ID or route.'});ids.add(p.id);paths.add(path);})});
