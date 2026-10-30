// Set VITE_SITE_URL to the verified public origin before deployment.
import {safeUrl} from './site';
const configuredUrl=safeUrl(import.meta.env.VITE_SITE_URL);
export const publicOrigin=configuredUrl&&new URL(configuredUrl).pathname==='/'?new URL(configuredUrl).origin:undefined;
export const indexingEnabled=import.meta.env.VITE_ENABLE_INDEXING==='true'&&!!publicOrigin;
