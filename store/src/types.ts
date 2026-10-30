export type Genre = 'Blues' | 'Jazz' | 'Southern Trap' | 'Fusion';
export interface License { id:string; title:string; price:number|null; formats:string; description:string; purchaseUrl?:string }
interface Base { id:string; slug:string; title:string; description:string; genre:Genre; mood:string; artworkUrl:string; previewAudioUrl?:string; price:number; currency:'USD'; durationSeconds:number; tags:string[]; featured:boolean; releaseDate?:string; purchaseUrl?:string; status:'demo'|'available'|'coming-soon' }
export interface Beat extends Base { productType:'beat'; bpm:number; musicalKey:string; licenseOptions:License[] }
export interface Sample extends Base { productType:'sample'; category:string; soundCount:number; format:string; contents:string[]; licenseSummary:string }
export interface Release extends Base { productType:'release'; releaseType:'Single'|'EP'|'Album'|'Instrumental'; streaming: {label:string;url?:string}[] }
export type Product=Beat|Sample|Release;
export interface Selection {productId:string;licenseId?:string}
