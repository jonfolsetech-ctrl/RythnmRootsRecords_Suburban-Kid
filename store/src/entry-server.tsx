import {renderToString} from 'react-dom/server';import {StaticRouter} from 'react-router-dom';import {StoreApp} from './App';
export function render(path:string){return renderToString(<StaticRouter location={path} basename={import.meta.env.BASE_URL}><StoreApp/></StaticRouter>)}

import {catalog} from './lib/catalog';
export const productPages=catalog.filter(p=>p.productType!=='release').map(p=>({route:`/${p.productType==='beat'?'beats':'samples'}/${p.slug}`,title:p.title,description:p.description,status:p.status}));
